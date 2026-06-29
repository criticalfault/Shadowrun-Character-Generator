// SR3 Matrix Programming Rules
// Source: Matrix (SR3 supplement), pp. 76–86

// ── Program Size ──────────────────────────────────────────────────────────────
// Size (Mp) = Rating² × Multiplier
export function programSize(rating, multiplier) {
  return rating * rating * multiplier;
}

// ── Max Program Rating ────────────────────────────────────────────────────────
// Cannot exceed Computer (Programming) skill.
// Persona programs: may not exceed skill × 1.5 (round down).
export function maxProgramRating(skill, isPersona = false) {
  if (isPersona) return Math.floor(skill * 1.5);
  return skill;
}

// ── Programming Suite Size Table (p.79) ──────────────────────────────────────
// Suite size = Rating² × 15
export function suiteSizeMp(rating) {
  return rating * rating * 15;
}

// Max complementary dice from suite = suite rating, capped by Computer (Programming) skill
export function suiteCompDice(suiteRating, skill) {
  return Math.min(suiteRating, skill);
}

// ── Base Programming Time ─────────────────────────────────────────────────────
// Base time (days) = program size (Mp)
// Each programming day = 8 hours of work
export function baseTimeDays(sizeMp) { return sizeMp; }
export function baseTimeHours(sizeMp) { return sizeMp * 8; }

// ── Task Period ───────────────────────────────────────────────────────────────
// Task period (days) = base time ÷ successes on Computer (Programming) Test
// Round: standard SR rounding (use ceiling for safety)
export function taskPeriodDays(basedays, successes) {
  if (!successes || successes < 1) return null;
  return Math.ceil(basedays / successes);
}
export function taskPeriodHours(days) { return days * 8; }

// ── Programming TN Modifiers (Matrix p.79) ───────────────────────────────────
// Base TN = unmodified program rating (do not apply option cost modifiers)
// Then apply modifiers below.

export const ProgrammingModifiers = [
  { id: 'doubleMem',   label: 'Computer has double the required memory',   mod: -2 },
  { id: 'noPlan',      label: 'No program plan prepared',                  mod: +2 },
  { id: 'mainBlue',    label: 'Mainframe — Blue host',                     mod: -1 },
  { id: 'mainGreen',   label: 'Mainframe — Green host',                    mod: -2 },
  { id: 'mainOrange',  label: 'Mainframe — Orange host',                   mod: -3 },
  { id: 'mainRed',     label: 'Mainframe — Red host',                      mod: -4 },
];

// Program plan successes each subtract 1 from TN (not listed in table but stated in text)
// Plan success modifier: -1 per success

// ── Program Plan ──────────────────────────────────────────────────────────────
// Plan creation time (hours) = (rating + options) × multiplier
// Plan size (Mp) = program size + 10
// Plan TN = 4 + plan modifiers

export function planTimeHours(rating, options, multiplier) {
  return (rating + options) * multiplier;
}
export function planSizeMp(programSizeMp) {
  return programSizeMp + 10;
}

export const PlanModifiers = [
  { range: '1–4',  label: 'Program rating 1–4',  mod: -1 },
  { range: '5–9',  label: 'Program rating 5–9',  mod:  0 },
  { range: '10+',  label: 'Program rating 10+',  mod: +1 },
];
// Each option adds +1 to plan TN
export function planTN(rating, options) {
  let base = 4;
  if (rating <= 4)      base += -1;
  else if (rating >= 10) base += +1;
  base += options; // +1 per option
  return base;
}

// ── Programming Languages (optional rule, Matrix p.81) ────────────────────────
export const ProgrammingLanguages = [
  { id: 'none',        label: 'None (default)',     bugMod: 0,   otherEffect: null,                                          description: null },
  { id: 'hololisp',   label: 'HoloLISP',            bugMod:  0,  otherEffect: null,                                          description: 'No mechanical effects.' },
  { id: 'intermod',   label: 'InterMod',             bugMod: +4,  otherEffect: '−1 to program\'s effective rating',           description: 'Bug TN +4 · Effective program rating −1' },
  { id: 'matcomdev',  label: 'MatComDev',            bugMod: +2,  otherEffect: '+1 to Computer (Programming) Test TN',        description: 'Bug TN +2 · Programming TN +1' },
  { id: 'mct_iconix', label: 'MCT Iconix 7',        bugMod: -1,  bugModNote: '−1 per option', otherEffect: '−1 to Computer (Programming) Test TN', description: 'Bug TN −1 per option · Programming TN −1' },
  { id: 'metacomm',   label: 'Metacomm',            bugMod: -3,  otherEffect: '−2 to Computer (Programming) Test TN',        description: 'Bug TN −3 · Programming TN −2' },
  { id: 'novatech',   label: 'Novatech VRDrive 3',  bugMod: +1,  otherEffect: '+2 when using Glitch Table',                  description: 'Bug TN +1 · +2 when using Glitch Table' },
  { id: 'oblong',     label: 'Oblong',              bugMod: +3,  otherEffect: '+2 to Computer (Programming) Test TN',        description: 'Bug TN +3 · Programming TN +2' },
  { id: 'renraku',    label: 'Renraku Teng',        bugMod: -5,  otherEffect: 'Base time ÷ 2',                               description: 'Bug TN −5 · Base programming time ÷ 2' },
];

// ── Bug Test (optional rule, Matrix p.81) ────────────────────────────────────
// Open Test using Computer (Programming); bugs appear on every occurrence (n-th use)
// TN modifiers stacked on top of base skill open test

export function bugTestTN(programRating, programSkill, options, teamMembers, usedMainframe, reducedTime, languageId) {
  let tn = 0;
  // Program difficulty: −(Rating ÷ 2, round up)
  tn -= Math.ceil(programRating / 2);
  // Options: −(options ÷ 2, round up)
  if (options > 0) tn -= Math.ceil(options / 2);
  // Team programming: −(members ÷ 2, round up)
  if (teamMembers > 1) tn -= Math.ceil(teamMembers / 2);
  // Used mainframe: +2
  if (usedMainframe) tn += 2;
  // Reduced base time: +3
  if (reducedTime) tn += 3;
  // Language modifier
  const lang = ProgrammingLanguages.find(l => l.id === languageId);
  if (lang && lang.bugMod) {
    if (lang.id === 'mct_iconix') tn += lang.bugMod * options; // −1 per option
    else tn += lang.bugMod;
  }
  return tn;
}

// ── Program Options (Matrix pp. 82–86) ───────────────────────────────────────
// IMPORTANT: Option design rating modifiers do NOT change the Programming TN.
// TN = base program rating (unmodified). Options only affect:
//   - Design rating → design size → programming time
//   - Actual size (only for One-Shot, Optimization, Squeeze, Sensitive)
//
// designRatingMod: flat modifier to design rating
// designRatingModPerPoint: per point of option rating (for rated options like stealth, area)
// hasOptionRating: true if option has its own rating (stealth-4, area-3, etc.)
// actualSizeMult: multiplier applied to actual size (default 1.0)
// designSizeMult: multiplier applied to design size AFTER rating-based calc (default 1.0)
// availableFor: 'utility' | 'ic' | 'both'

export const ProgramOptions = [
  // ── Utility Options ──────────────────────────────────────────────────────
  {
    id: 'adaptive',
    label: 'Adaptive',
    availableFor: 'utility',
    designRatingMod: 2,
    hasOptionRating: false,
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: 'Utility can run at any rating up to its base rating. Common for utilities used on variable cyberterminals.',
  },
  {
    id: 'area',
    label: 'Area',
    availableFor: 'utility',
    designRatingMod: 0,
    designRatingModPerPoint: 1,
    hasOptionRating: true,
    optionRatingLabel: 'Area Rating',
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: 'Engages multiple targets in the same system (all targets must be in the same system). TN +2 per target beyond the area option rating. Armor utility protects against area rating.',
  },
  {
    id: 'bug_ridden',
    label: 'Bug-Ridden (Optional)',
    availableFor: 'utility',
    designRatingMod: 0,
    hasOptionRating: false,
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: 'Only used with optional bug rules. Bug-ridden utility has a relatively frequent bug Occurrence factor — subtract the bug-ridden rating from 12.',
  },
  {
    id: 'chaser',
    label: 'Chaser',
    availableFor: 'utility',
    designRatingMod: 1,
    hasOptionRating: false,
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: 'Negates the +2 TN penalty for attacks against IC with the Shift option. Adds an additional +2 TN penalty to attacks against IC with the Shield option. Cannot be combined with Penetration.',
  },
  {
    id: 'crashguard',
    label: 'Crashguard',
    availableFor: 'utility',
    designRatingMod: 0,
    designRatingModPerPoint: 1,
    hasOptionRating: true,
    optionRatingLabel: 'Crashguard Rating',
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: 'Makes utility more resistant to crash attempts. Apply −1 modifier to Opposed Test for each point of Crashguard rating when tar baby/tar pit IC attacks. Only works in active memory.',
  },
  {
    id: 'dinab',
    label: 'DINAB',
    availableFor: 'utility',
    designRatingMod: 2,
    designRatingModPerPoint: 1,
    hasOptionRating: true,
    optionRatingLabel: 'DINAB Rating',
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: 'Gives the utility a built-in Computer skill equal to the DINAB rating. User spends a Free Action to activate; utility then runs itself. DINAB loses 1 rating point every time it fails a test.',
  },
  {
    id: 'limit',
    label: 'Limit',
    availableFor: 'utility',
    designRatingMod: -1,
    hasOptionRating: false,
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: 'Restricts utility to a single type of target (personas, IC programs, frames, or SKs). Useless against any other target type.',
  },
  {
    id: 'noise',
    label: 'Noise',
    availableFor: 'utility',
    designRatingMod: 0,
    designRatingModPerPoint: -1,
    hasOptionRating: true,
    optionRatingLabel: 'Noise Rating',
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: "Operational utility; doesn't use direct brute-force measures. Character's Detection Factor is lowered by the noise rating for System Tests in which this utility is used.",
  },
  {
    id: 'one_shot',
    label: 'One-Shot',
    availableFor: 'utility',
    designRatingMod: 0,
    hasOptionRating: false,
    actualSizeMult: 0.25,   // reduces actual size by 75%
    designSizeMult: 1.5,    // increases design size by 50%
    notes: 'Single-use: after execution it vanishes. Must be reloaded with Swap Memory. Reduces ACTUAL size by 75%; increases DESIGN size by 50%. Tar baby/tar pit wipes out ALL copies in active memory.',
  },
  {
    id: 'optimization',
    label: 'Optimization',
    availableFor: 'both',
    designRatingMod: 0,
    hasOptionRating: false,
    actualSizeMult: 0.5,   // reduces actual size by 50%
    designSizeMult: 2.0,   // increases design size by 100%
    notes: 'Reduces ACTUAL size by 50%; increases DESIGN size by 100%.',
  },
  {
    id: 'penetration',
    label: 'Penetration',
    availableFor: 'utility',
    designRatingMod: 1,
    hasOptionRating: false,
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: 'Defeats the Shield IC option — utility does not receive the +2 TN modifier against IC programs with Shield. Against IC with Shift, must add +4 to TN. Cannot be combined with Chaser.',
  },
  {
    id: 'selective',
    label: 'Selective',
    availableFor: 'utility',
    designRatingMod: 1,
    hasOptionRating: false,
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: "When used against a target icon, checks if the icon uses a special passkey. If the icon bears the passkey, the program won't work against that icon and targets it as normal.",
  },
  {
    id: 'sensitive',
    label: 'Sensitive',
    availableFor: 'both',
    designRatingMod: 0,
    hasOptionRating: false,
    actualSizeMult: 0.5,   // reduces both actual and design size by 50%
    designSizeMult: 0.5,
    notes: 'Makes program effective only on systems of a particular type (manufacturer, language, or iconography). For Programming Test: use average of Computer (Programming) skill and relevant Knowledge skill. Reduces BOTH actual and design size by 50%.',
  },
  {
    id: 'sneak',
    label: 'Sneak',
    availableFor: 'utility',
    designRatingMod: 0,
    designRatingModPerPoint: 2,
    hasOptionRating: true,
    optionRatingLabel: 'Sneak Rating',
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: 'Each point of Sneak rating adds +1 to the user\'s Detection Factor when making a System Test with this utility.',
  },
  {
    id: 'squeeze',
    label: 'Squeeze',
    availableFor: 'utility',
    designRatingMod: 1,
    hasOptionRating: false,
    actualSizeMult: 0.5,   // reduces actual size by 50% (for uploading purposes)
    designSizeMult: 1,
    notes: 'Self-compressed program. Actual size reduced by 50% for upload/storage. Cannot be used until decompressed (Complex Action). If also Optimized, must decompress twice. Design size modifier affects design size only.',
  },
  {
    id: 'stealth',
    label: 'Stealth',
    availableFor: 'utility',
    designRatingMod: 0,
    designRatingModPerPoint: 1,
    hasOptionRating: true,
    optionRatingLabel: 'Stealth Rating',
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: 'Reduces security tally additions caused by crashing IC programs. When a decker uses this utility to crash an IC, reduce the resulting security tally increase by the stealth rating.',
  },
  {
    id: 'targeting',
    label: 'Targeting',
    availableFor: 'utility',
    designRatingMod: 2,
    hasOptionRating: false,
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: 'Offensive utility zeros in on target weaknesses. Gives a −2 TN modifier for attacks in cybercombat.',
  },

  // ── IC Options ───────────────────────────────────────────────────────────
  {
    id: 'ic_armor',
    label: 'Armor',
    availableFor: 'ic',
    designRatingMod: 2,
    hasOptionRating: false,
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: 'Reduces the Power of any attack against the IC by 2. If attacked by a utility with the Area option, armor rating is increased by 2.',
  },
  {
    id: 'ic_cascading',
    label: 'Cascading IC',
    availableFor: 'ic',
    designRatingMod: 3,
    hasOptionRating: false,
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: 'Each missed attack or failed damage increases Security Value by 1 and Attack Test value by 1 (cumulative). Resets when IC defeats a target. Maximum increase by host color: Blue=1, Green=25%/2, Orange=50%/3, Red=100%/4.',
  },
  {
    id: 'ic_expert_defense',
    label: 'Expert Defense',
    availableFor: 'ic',
    designRatingMod: 1,
    hasOptionRating: false,
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: 'Each point adds 1 die to Damage Resistance Tests but removes 1 die from Attack Tests. Maximum Expert Defense rating: 3. Incompatible with Expert Offense.',
  },
  {
    id: 'ic_expert_offense',
    label: 'Expert Offense',
    availableFor: 'ic',
    designRatingMod: 1,
    hasOptionRating: false,
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: "Each point adds 1 die to the IC's Security Value for Attack Tests but removes 1 die from Damage Resistance Tests. Maximum Expert Offense rating: 3. Incompatible with Expert Defense.",
  },
  {
    id: 'ic_party_cluster',
    label: 'Party Cluster',
    availableFor: 'ic',
    designRatingMod: 3,
    hasOptionRating: false,
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: 'IC coordinates with similar IC pieces attacking in tandem. Activated together on the same trigger. Total ratings of party IC in a cluster cannot exceed Security Value × 2.',
  },
  {
    id: 'ic_shield',
    label: 'Shield',
    availableFor: 'ic',
    designRatingMod: 2,
    hasOptionRating: false,
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: 'Adds +2 TN modifier to all tests to hit the protected IC in cybercombat. Extra-effective with Chaser (automatic, no penalty). With Shift, attacking utility must add +4 TN instead of +2.',
  },
  {
    id: 'ic_shift',
    label: 'Shift',
    availableFor: 'ic',
    designRatingMod: 2,
    hasOptionRating: false,
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: 'Constantly relocates memory space and system addresses. Adds +2 TN modifier to all tests to hit the IC. Defeated automatically by Chaser. With Penetration, must add +4 TN instead of +2.',
  },
  {
    id: 'ic_trap',
    label: 'Trap',
    availableFor: 'ic',
    designRatingMod: 0,
    designRatingModPerPoint: 1,
    hasOptionRating: true,
    optionRatingLabel: 'Number of linked IC programs',
    actualSizeMult: 1,
    designSizeMult: 1,
    notes: 'Triggers one or more other pieces of IC (usually gray or black IC) when this IC is destroyed in cybercombat.',
  },
];

// ── Design Size / Actual Size with Options ────────────────────────────────────
// Design size = design_rating² × multiplier × designSizeMult modifiers
// Actual size = base_rating² × multiplier × actualSizeMult modifiers
// TN for programming = base program rating (NOT affected by options)

export function calcDesignRating(baseRating, selectedOptions) {
  // selectedOptions: Array of { id, optionRating }
  let dr = baseRating;
  for (const sel of selectedOptions) {
    const opt = ProgramOptions.find(o => o.id === sel.id);
    if (!opt) continue;
    dr += (opt.designRatingMod ?? 0);
    if (opt.designRatingModPerPoint && sel.optionRating > 0) {
      dr += opt.designRatingModPerPoint * sel.optionRating;
    }
  }
  return Math.max(1, dr);
}

export function calcDesignSize(baseRating, multiplier, selectedOptions) {
  const dr = calcDesignRating(baseRating, selectedOptions);
  let size = dr * dr * multiplier;
  for (const sel of selectedOptions) {
    const opt = ProgramOptions.find(o => o.id === sel.id);
    if (!opt) continue;
    if (opt.designSizeMult && opt.designSizeMult !== 1) size *= opt.designSizeMult;
  }
  return Math.round(size);
}

export function calcActualSize(baseRating, multiplier, selectedOptions) {
  let size = baseRating * baseRating * multiplier;
  for (const sel of selectedOptions) {
    const opt = ProgramOptions.find(o => o.id === sel.id);
    if (!opt) continue;
    if (opt.actualSizeMult && opt.actualSizeMult !== 1) size *= opt.actualSizeMult;
  }
  return Math.round(size);
}

// ── IC Program Size Multipliers (Matrix IC Size Multipliers Table) ────────────
export const ICPrograms = [
  { id: 'black_cerebropathic', label: 'Black — Cerebropathic', sizeMult: 16 },
  { id: 'black_lethal',        label: 'Black — Lethal',        sizeMult: 25 },
  { id: 'black_nonlethal',     label: 'Black — Non-lethal',    sizeMult: 12 },
  { id: 'black_psychotropic',  label: 'Black — Psychotropic',  sizeMult: 20 },
  { id: 'blaster',             label: 'Blaster',               sizeMult: 10 },
  { id: 'crippler',            label: 'Crippler',              sizeMult:  6 },
  { id: 'data_bomb',           label: 'Data Bomb',             sizeMult:  5 },
  { id: 'killer',              label: 'Killer',                sizeMult:  8 },
  { id: 'pavlov',              label: 'Pavlov',                sizeMult:  4 },
  { id: 'probe',               label: 'Probe',                 sizeMult:  3 },
  { id: 'ripper',              label: 'Ripper',                sizeMult:  8 },
  { id: 'scout',               label: 'Scout',                 sizeMult:  5 },
  { id: 'scramble',            label: 'Scramble',              sizeMult:  3 },
  { id: 'sparky',              label: 'Sparky',                sizeMult: 12 },
  { id: 'tar_baby',            label: 'Tar Baby',              sizeMult:  5 },
  { id: 'tar_pit',             label: 'Tar Pit',               sizeMult:  7 },
  { id: 'trace',               label: 'Trace',                 sizeMult: 10 },
];

// ── Frames & Agents (Matrix pp. 88–91) ────────────────────────────────────────
export const FrameAgentTypes = [
  {
    id: 'dumb', label: 'Dumb Frame', sizeMult: 3,
    personaPointsMult: 1, framePointsMult: 2,
    hasPilot: false, maxInitBonusDice: 0, hasPersona: true, isIC: false,
    notes: 'Max rating = Computer×2. No Pilot rating or Initiative bonus dice. Persona Points = core rating.',
  },
  {
    id: 'smart', label: 'Smart Frame', sizeMult: 6,
    personaPointsMult: 1, framePointsMult: 4,
    hasPilot: true, maxInitBonusDice: 4, hasPersona: true, isIC: false,
    notes: 'Max rating = Computer×1.5 (round down). Pilot rating and up to 4D6 Initiative bonus allowed. Persona Points = core rating.',
  },
  {
    id: 'agent', label: 'Agent', sizeMult: 10,
    personaPointsMult: 2, framePointsMult: 6,
    hasPilot: true, maxInitBonusDice: 5, hasPersona: true, isIC: false,
    notes: 'Max rating = Computer (Programming) skill. Persona Points = core rating × 2. Up to 5D6 Initiative bonus.',
  },
  {
    id: 'ic_construct', label: 'IC Construct', sizeMult: 3,
    personaPointsMult: 0, framePointsMult: 0,
    hasPilot: false, maxInitBonusDice: 0, hasPersona: false, isIC: true,
    notes: 'Max rating = Computer×2. No persona attributes, pilot rating, or frame points. IC Payload = rating×2. Hacking Pool = host Security Code.',
  },
];

export function maxFrameRating(skill, typeId) {
  if (typeId === 'smart') return Math.floor(skill * 1.5);
  if (typeId === 'agent') return skill;
  return skill * 2;
}
export function framePersonaPoints(rating, typeId) {
  const t = FrameAgentTypes.find(f => f.id === typeId);
  return t ? rating * t.personaPointsMult : 0;
}
export function frameFramePoints(rating, typeId) {
  const t = FrameAgentTypes.find(f => f.id === typeId);
  return t ? rating * t.framePointsMult : 0;
}

// ── Worm Types (Matrix pp. 92–93) ─────────────────────────────────────────────
// Only Optimization and Selective options allowed for worms.
export const WormTypes = [
  { id: 'crashworm', label: 'Crashworm', sizeMult: 2, notes: 'Causes utilities to error on activation; infected utility rolls on Glitch Table.' },
  { id: 'dataworm',  label: 'Dataworm',  sizeMult: 3, notes: 'Logs all cyberterminal activity and transmits a report to the originator.' },
  { id: 'deathworm', label: 'Deathworm', sizeMult: 2, notes: 'All persona tests suffer +TN = deathworm rating ÷ 2 (round down).' },
  { id: 'spawnworm', label: 'Spawnworm', sizeMult: 2, notes: 'Drains active memory; reduces highest-rated active utility by 1 rating per success each Combat Turn.' },
  { id: 'ringworm',  label: 'Ringworm',  sizeMult: 2, notes: 'Alters cyberterminal icon coding (minor flickering to drastic icon replacement).' },
  { id: 'tapeworm',  label: 'Tapeworm',  sizeMult: 2, notes: 'Corrupts downloaded files immediately and renders them irretrievable.' },
];

// ── Upgrading ─────────────────────────────────────────────────────────────────
// Base upgrade time = time to write from scratch, minus current version base time
// Minimum upgrade time = 25% of time to write from scratch
// New size = new rating² × multiplier (option adds to size as well)
export function upgradeBaseTimeDays(newRating, multiplier, oldRating) {
  const newSize  = programSize(newRating, multiplier);
  const oldSize  = programSize(oldRating, multiplier);
  const scratch  = baseTimeDays(newSize);
  const current  = baseTimeDays(oldSize);
  const minimum  = Math.ceil(scratch * 0.25);
  return Math.max(scratch - current, minimum);
}
