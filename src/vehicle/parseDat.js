/**
 * Parser for The Shop's .dat vehicle definition format.
 * Produces { chassis[], engines[], mods[] } suitable for the vehicle designer.
 *
 * Record types:
 *   1 = chassis   2 = engine   3 = modification
 */

// ── helpers ──────────────────────────────────────────────────────────────────

function csvParse(line) {
  const tokens = [];
  let cur = '';
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuote = !inQuote;
    } else if (ch === ',' && !inQuote) {
      tokens.push(cur.trim());
      cur = '';
    } else {
      cur += ch;
    }
  }
  tokens.push(cur.trim());
  return tokens;
}

function coerce(v) {
  if (v === '' || v === '-1') return v === '-1' ? -1 : '';
  const n = Number(v);
  return isNaN(n) ? v : n;
}

// ── vehicle type bitmask decoder ─────────────────────────────────────────────
// 1=ground 2=water 4=hover 8=air 16=bike 32=transport 64=helicopter 128=vectorThrust

function decodeVehicleType(mask) {
  const types = [];
  if (mask & 1)   types.push('ground');
  if (mask & 2)   types.push('water');
  if (mask & 4)   types.push('hover');
  if (mask & 8)   types.push('air');
  if (mask & 16)  types.push('bike');
  if (mask & 32)  types.push('transport');
  if (mask & 64)  types.push('helicopter');
  if (mask & 128) types.push('vectorThrust');
  return types;
}

// ── record parsers ────────────────────────────────────────────────────────────

function parseChassis(t) {
  // 1, typeMask, name, handling, offRoad, body, armour, cf, cfMax,
  //    autonav, pilot, sensor, seating, entry, setupTime, tol, other, cost
  const typeMask = parseInt(t[1]) || 0;
  return {
    type: 'chassis',
    typeMask,
    vehicleTypes: decodeVehicleType(typeMask),
    name:        t[2],
    handling:    coerce(t[3]),
    offRoad:     coerce(t[4]),
    body:        coerce(t[5]),
    armour:      coerce(t[6]),
    cf:          coerce(t[7]),
    cfMax:       coerce(t[8]),
    autonav:     coerce(t[9]),
    pilot:       coerce(t[10]),
    sensor:      coerce(t[11]),
    seating:     t[12],
    entry:       t[13],
    setupTime:   coerce(t[14]),
    tol:         t[15],
    other:       t[16],
    cost:        coerce(t[17]),
  };
}

function parseEngine(t) {
  // 2, chassisName, engineName, speed, speedMax, accel, accelMax,
  //    load, loadMax, sig, economy, economyMax, fuel, cost
  return {
    type:        'engine',
    chassisName: t[1],
    name:        t[2],
    speed:       coerce(t[3]),
    speedMax:    coerce(t[4]),
    accel:       coerce(t[5]),
    accelMax:    coerce(t[6]),
    load:        coerce(t[7]),
    loadMax:     coerce(t[8]),
    sig:         coerce(t[9]),
    economy:     coerce(t[10]),
    economyMax:  coerce(t[11]),
    fuel:        coerce(t[12]),
    cost:        coerce(t[13]),
  };
}

// Modification categories
const MOD_CATEGORIES = {
  1: 'Design Options',
  2: 'Engine Customization',
  3: 'Control Systems',
  4: 'Protective Systems',
  5: 'Signature',
  6: 'Weapon Mounts',
  7: 'Electronics',
  8: 'Accessories',
};

function parseMod(t) {
  // 3, priority, name, markup, ?, defaultLevel, levelLabel, limitExpr, effectExpr
  const priority = parseInt(t[1]) || 1;
  return {
    type:        'mod',
    category:    MOD_CATEGORIES[priority] ?? `Category ${priority}`,
    priority,
    name:        t[2],
    markup:      coerce(t[3]),
    defaultLevel: coerce(t[5]),
    levelLabel:  t[6] || 'Level',
    limitExpr:   t[7] || '',
    effectExpr:  t[8] || '',
  };
}

// ── main parser ───────────────────────────────────────────────────────────────

export function parseDat(text) {
  const chassis = [];
  const engines = [];
  const mods    = [];

  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;

    const tokens = csvParse(line);
    const recType = parseInt(tokens[0]);

    if (recType === 1) chassis.push(parseChassis(tokens));
    else if (recType === 2) engines.push(parseEngine(tokens));
    else if (recType === 3) mods.push(parseMod(tokens));
  }

  return { chassis, engines, mods };
}
