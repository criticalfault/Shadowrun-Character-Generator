/**
 * Expression evaluator for The Shop's vehicle modification language.
 *
 * Operator precedence (low → high):
 *   assignment  =  +=  -=  *=  /=
 *   logical     &&  ||
 *   comparison  <  <=  ==  >=  >  !=
 *   conditional ?  <<  >>
 *   additive    +  -  &  |
 *   multiplicative  *  /
 *   power       ^
 *   array       :
 *   unary / primary
 *
 * Variables live in four namespaces:
 *   vehicle stats  (Handling, Speed, Cost, CF, …)
 *   Global.*       persistent across statements
 *   Local.*        per-expression temporaries
 *   Chassis.*      read-only snapshot of base chassis
 *   Engine.*       read-only snapshot of chosen engine
 *
 * String wildcards:  'Electric*'  matches via glob (only * supported)
 */

// ── tokeniser ─────────────────────────────────────────────────────────────────

const TT = {
  NUM: 'NUM', STR: 'STR', ID: 'ID', OP: 'OP', DOT: 'DOT',
  SEMI: 'SEMI', EOF: 'EOF',
};

function tokenise(src) {
  const tokens = [];
  let i = 0;
  while (i < src.length) {
    // whitespace
    if (/\s/.test(src[i])) { i++; continue; }

    // numbers (including floats)
    if (/[0-9]/.test(src[i]) || (src[i] === '.' && /[0-9]/.test(src[i + 1]))) {
      let s = '';
      while (i < src.length && /[0-9.]/.test(src[i])) s += src[i++];
      tokens.push({ t: TT.NUM, v: parseFloat(s) });
      continue;
    }

    // strings  'foo*'
    if (src[i] === "'") {
      i++;
      let s = '';
      while (i < src.length && src[i] !== "'") s += src[i++];
      i++; // closing '
      tokens.push({ t: TT.STR, v: s });
      continue;
    }

    // identifiers / keywords
    if (/[A-Za-z_]/.test(src[i])) {
      let s = '';
      while (i < src.length && /[A-Za-z0-9_]/.test(src[i])) s += src[i++];
      tokens.push({ t: TT.ID, v: s });
      continue;
    }

    // dot (namespace separator)
    if (src[i] === '.') { tokens.push({ t: TT.DOT, v: '.' }); i++; continue; }

    // semicolon
    if (src[i] === ';') { tokens.push({ t: TT.SEMI, v: ';' }); i++; continue; }

    // two-char operators
    const two = src.slice(i, i + 2);
    if (['+=', '-=', '*=', '/=', ':=', '<=', '>=', '==', '!=', '<<', '>>', '&&', '||'].includes(two)) {
      tokens.push({ t: TT.OP, v: two }); i += 2; continue;
    }

    // single-char operators
    const one = src[i];
    if ('=+-*/^<>?:&|!'.includes(one)) {
      tokens.push({ t: TT.OP, v: one }); i++; continue;
    }

    i++; // skip unknown
  }
  tokens.push({ t: TT.EOF, v: '' });
  return tokens;
}

// ── glob match ────────────────────────────────────────────────────────────────

function globMatch(pattern, str) {
  if (typeof str !== 'string') return false;
  const re = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$', 'i');
  return re.test(str);
}

// ── parser / evaluator ────────────────────────────────────────────────────────

class Evaluator {
  constructor(ctx) {
    this.ctx = ctx; // { stats, chassis, engine, global, local }
  }

  run(src) {
    if (!src || src === '-1') return undefined;
    this.tokens = tokenise(src);
    this.pos = 0;
    while (this.peek().t !== TT.EOF) {
      this.parseStatement();
      while (this.peek().t === TT.SEMI) this.consume();
    }
  }

  /** Evaluate and return a value (used for limit expressions). */
  eval(src) {
    if (!src || src === '-1') return true;
    this.tokens = tokenise(src);
    this.pos = 0;
    let last;
    while (this.peek().t !== TT.EOF) {
      last = this.parseStatement();
      while (this.peek().t === TT.SEMI) this.consume();
    }
    return last;
  }

  peek() { return this.tokens[this.pos] || { t: TT.EOF, v: '' }; }
  consume() { return this.tokens[this.pos++] || { t: TT.EOF, v: '' }; }

  match(t, v) {
    const tok = this.peek();
    if (tok.t === t && (v === undefined || tok.v === v)) { this.consume(); return true; }
    return false;
  }

  expect(t, v) {
    const tok = this.consume();
    if (tok.t !== t || (v !== undefined && tok.v !== v))
      throw new Error(`Expected ${t}=${v}, got ${tok.t}=${tok.v}`);
    return tok;
  }

  // ── statement ──────────────────────────────────────────────────────────────
  parseStatement() {
    return this.parseAssignment();
  }

  // ── assignment  =  +=  -=  *=  /= ────────────────────────────────────────
  parseAssignment() {
    const left = this.parseLogical();

    const op = this.peek();
    if (op.t === TT.OP && ['=', '+=', '-=', '*=', '/='].includes(op.v)) {
      this.consume();
      const right = this.parseLogical();

      if (typeof left !== 'object' || !left.__ref) return right; // can't assign

      const cur = this.getVar(left.__ref);
      let val;
      if (op.v === '=')  val = right;
      else if (op.v === '+=') val = (cur ?? 0) + right;
      else if (op.v === '-=') val = (cur ?? 0) - right;
      else if (op.v === '*=') val = (cur ?? 0) * right;
      else if (op.v === '/=') val = (cur ?? 0) / right;
      this.setVar(left.__ref, val);
      return val;
    }

    return left;
  }

  // ── logical  &&  || ───────────────────────────────────────────────────────
  parseLogical() {
    let v = this.parseComparison();
    while (this.peek().t === TT.OP && ['&&', '||'].includes(this.peek().v)) {
      const op = this.consume().v;
      const r = this.parseComparison();
      v = op === '&&' ? (v && r) : (v || r);
    }
    return v;
  }

  // ── comparison ────────────────────────────────────────────────────────────
  parseComparison() {
    let v = this.parseConditional();
    while (this.peek().t === TT.OP && ['<', '<=', '==', '>=', '>', '!='].includes(this.peek().v)) {
      const op = this.consume().v;
      const r = this.parseConditional();

      // handle wildcard strings
      let result;
      if (typeof r === 'string' && r.includes('*')) {
        result = op === '==' ? globMatch(r, v) : !globMatch(r, v);
      } else {
        if (op === '<')  result = v < r;
        else if (op === '<=') result = v <= r;
        else if (op === '==') result = v === r;
        else if (op === '>=') result = v >= r;
        else if (op === '>')  result = v > r;
        else if (op === '!=') result = v !== r;
      }
      this.ctx.global['test'] = result ? 1 : 0;
      v = result;
    }
    return v;
  }

  // ── conditional  ?  <<  >> ────────────────────────────────────────────────
  parseConditional() {
    let v = this.parseAdditive();
    while (this.peek().t === TT.OP && ['?', '<<', '>>'].includes(this.peek().v)) {
      const op = this.consume().v;
      const r = this.parseAdditive();
      if (op === '?')  v = this.ctx.global['test'] ? v : r;
      else if (op === '<<') v = Math.min(Number(v), Number(r));
      else if (op === '>>') v = Math.max(Number(v), Number(r));
    }
    return v;
  }

  // ── additive  +  -  &  | ──────────────────────────────────────────────────
  parseAdditive() {
    let v = this.parseMultiplicative();
    while (this.peek().t === TT.OP && ['+', '-', '&', '|'].includes(this.peek().v)) {
      const op = this.consume().v;
      const r = this.parseMultiplicative();
      if (op === '+') v = Number(v) + Number(r);
      else if (op === '-') v = Number(v) - Number(r);
      else if (op === '&') v = (Number(v) & Number(r));
      else if (op === '|') v = (Number(v) | Number(r));
    }
    return v;
  }

  // ── multiplicative  *  / ──────────────────────────────────────────────────
  parseMultiplicative() {
    let v = this.parsePower();
    while (this.peek().t === TT.OP && ['*', '/'].includes(this.peek().v)) {
      const op = this.consume().v;
      const r = this.parsePower();
      v = op === '*' ? Number(v) * Number(r) : Number(v) / Number(r);
    }
    return v;
  }

  // ── power  ^ ──────────────────────────────────────────────────────────────
  parsePower() {
    let v = this.parseArray();
    if (this.peek().t === TT.OP && this.peek().v === '^') {
      this.consume();
      const r = this.parsePower(); // right-associative
      v = Math.pow(Number(v), Number(r));
    }
    return v;
  }

  // ── array lookup  x : y1 y2 y3 ───────────────────────────────────────────
  parseArray() {
    let v = this.parseUnary();
    if (this.peek().t === TT.OP && this.peek().v === ':') {
      this.consume();
      const items = [];
      // collect values until ; or end or non-value token
      while (this.peek().t !== TT.SEMI && this.peek().t !== TT.EOF) {
        const tok = this.peek();
        // stop if we hit an operator that isn't a number/string/id start
        if (tok.t === TT.OP && !'-'.includes(tok.v)) break;
        items.push(this.parseUnary());
      }
      const idx = Math.max(1, Math.min(items.length, Math.round(Number(v))));
      v = items[idx - 1] ?? items[items.length - 1] ?? 0;
    }
    return v;
  }

  // ── unary  - ──────────────────────────────────────────────────────────────
  parseUnary() {
    if (this.peek().t === TT.OP && this.peek().v === '-') {
      this.consume();
      return -Number(this.parsePrimary());
    }
    return this.parsePrimary();
  }

  // ── primary ───────────────────────────────────────────────────────────────
  parsePrimary() {
    const tok = this.peek();

    // number literal
    if (tok.t === TT.NUM) { this.consume(); return tok.v; }

    // string literal
    if (tok.t === TT.STR) { this.consume(); return tok.v; }

    // identifier (possibly namespaced: Global.X  Chassis.X  etc.)
    if (tok.t === TT.ID) {
      this.consume();
      if (this.peek().t === TT.DOT) {
        this.consume();
        const prop = this.expect(TT.ID).v;
        const ref = { ns: tok.v.toLowerCase(), key: prop };
        const val = this.getVar(ref);
        return { __ref: ref, valueOf() { return val ?? 0; }, value: val ?? 0, _val: val };
      }
      const ref = { ns: 'stats', key: tok.v };
      const val = this.getVar(ref);
      return { __ref: ref, valueOf() { return Number(val) || 0; }, value: val, _val: val };
    }

    this.consume(); // skip unknown
    return 0;
  }

  // ── variable access ───────────────────────────────────────────────────────

  getVar({ ns, key }) {
    if (ns === 'stats')   return this.ctx.stats[key] ?? 0;
    if (ns === 'global')  return this.ctx.global[key] ?? 0;
    if (ns === 'local')   return this.ctx.local[key] ?? 0;
    if (ns === 'chassis') return this.ctx.chassis[key.toLowerCase()] ?? this.ctx.chassis[key] ?? 0;
    if (ns === 'engine')  return this.ctx.engine[key.toLowerCase()] ?? this.ctx.engine[key] ?? 0;
    return 0;
  }

  setVar({ ns, key }, val) {
    if (ns === 'stats')  { this.ctx.stats[key] = val; return; }
    if (ns === 'global') { this.ctx.global[key] = val; return; }
    if (ns === 'local')  { this.ctx.local[key] = val; return; }
    // chassis / engine are read-only
  }
}

// ── public API ────────────────────────────────────────────────────────────────

/**
 * Build the mutable vehicle stats object from a chassis + engine selection.
 */
export function buildVehicleStats(chassis, engine) {
  return {
    // from chassis
    Handling:   chassis.handling,
    OffRoad:    chassis.offRoad,
    Body:       chassis.body,
    Armour:     chassis.armour,
    CF:         chassis.cf,
    CFMax:      chassis.cfMax,
    CFUsed:     0,
    Autonav:    chassis.autonav,
    Pilot:      chassis.pilot,
    Sensor:     chassis.sensor,
    Sig:        3,   // default signature (chassis doesn't include it)
    Security:   0,
    Military:   0,
    Cost:       chassis.cost,
    // from engine
    Speed:      engine.speed,
    SpeedMax:   engine.speedMax,
    Accel:      engine.accel,
    AccelMax:   engine.accelMax,
    Load:       engine.load,
    LoadMax:    engine.loadMax,
    LoadUsed:   0,
    Economy:    engine.economy,
    EconomyMax: engine.economyMax,
    Fuel:       engine.fuel,
    // chassis cost already added above; add engine cost
    _engineCost: engine.cost,
  };
}

/**
 * Return true if a mod is within its limits given current vehicle state.
 */
export function checkLimit(mod, stats, chassis, engine, globals, level = 1) {
  if (!mod.limitExpr || mod.limitExpr === '-1') return true;
  try {
    const ctx = {
      stats: { ...stats, Level: level },
      chassis: buildChassisCtx(chassis),
      engine: buildEngineCtx(engine),
      global: { ...globals },
      local: {},
    };
    const ev = new Evaluator(ctx);
    const result = ev.eval(mod.limitExpr);
    // A bare comparison leaves a boolean; a stat-check statement returns the stat value
    if (result === false) return false;
    if (result === 0 && typeof result === 'number') return false;
    return true;
  } catch {
    return true; // optimistic fallback
  }
}

/**
 * Apply a mod's effect to a copy of stats, return { stats, globals }.
 */
export function applyMod(mod, stats, chassis, engine, globals, level = 1) {
  if (!mod.effectExpr || mod.effectExpr === '-1') return { stats, globals };
  try {
    const newStats   = { ...stats };
    const newGlobals = { ...globals };
    const ctx = {
      stats:   newStats,
      chassis: buildChassisCtx(chassis),
      engine:  buildEngineCtx(engine),
      global:  newGlobals,
      local:   {},
    };
    ctx.stats.Level = level;
    const ev = new Evaluator(ctx);
    ev.run(mod.effectExpr);
    return { stats: newStats, globals: newGlobals };
  } catch (e) {
    console.warn('[vehicle] applyMod error:', mod.name, e.message);
    return { stats, globals };
  }
}

function buildChassisCtx(chassis) {
  return {
    chassisname: chassis.name,
    chassistype: chassis.typeMask,
    handling:    chassis.handling,
    offroad:     chassis.offRoad,
    body:        chassis.body,
    armour:      chassis.armour,
    cf:          chassis.cf,
    cfmax:       chassis.cfMax,
    cost:        chassis.cost,
    pilot:       chassis.pilot,
    sensor:      chassis.sensor,
    // capitalised aliases too
    ChassisName: chassis.name,
    ChassisType: chassis.typeMask,
    Handling:    chassis.handling,
    OffRoad:     chassis.offRoad,
    Body:        chassis.body,
    Cost:        chassis.cost,
  };
}

function buildEngineCtx(engine) {
  return {
    enginename:  engine.name,
    speed:       engine.speed,
    speedmax:    engine.speedMax,
    accel:       engine.accel,
    accelmax:    engine.accelMax,
    load:        engine.load,
    loadmax:     engine.loadMax,
    economy:     engine.economy,
    economymax:  engine.economyMax,
    fuel:        engine.fuel,
    cost:        engine.cost,
    // capitalised aliases
    EngineName:  engine.name,
    Speed:       engine.speed,
    SpeedMax:    engine.speedMax,
    Accel:       engine.accel,
    AccelMax:    engine.accelMax,
    Load:        engine.load,
    LoadMax:     engine.loadMax,
    Economy:     engine.economy,
    EconomyMax:  engine.economyMax,
    Fuel:        engine.fuel,
    Cost:        engine.cost,
  };
}
