// SR3 Matrix Programming Rules
// Source: Matrix (SR3 supplement), pp. 76–81

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
  { id: 'none',        label: 'None (default)',     bugMod: 0,   otherEffect: null },
  { id: 'hololisp',   label: 'HoloLISP',            bugMod: 0,   otherEffect: null },
  { id: 'machodev',   label: 'MachoDev',            bugMod: +4,  otherEffect: '−1 to program\'s effective rating' },
  { id: 'mct_iconix', label: 'MCT Iconix 7',        bugMod: +2,  otherEffect: '−1 to Computer (Programming) Test TN' },
  { id: 'metacomm',   label: 'Metacomm',            bugMod: 0,   otherEffect: null },
  { id: 'novatech',   label: 'Novatech VRDrive 3',  bugMod: -1,  bugModNote: '−1 per option', otherEffect: null },
  { id: 'oblong',     label: 'Oblong',              bugMod: -3,  otherEffect: '−2 to Computer (Programming) Test TN' },
  { id: 'renraku',    label: 'Renraku Teng',        bugMod: -5,  otherEffect: 'Base time ×2' },
];

// ── Bug Test (optional rule, Matrix p.81) ────────────────────────────────────
// Open Test using Computer (Programming); bugs appear on every occurrence (n-th use)
// TN modifiers stacked on top of base skill open test

export function bugTestTN(programRating, programSkill, options, teamMembers, usedMainframe, reducedTime, languageId) {
  let tn = 0;
  // Program difficulty: −(Rating + 2, round up) — already rounded since integer
  tn -= (programRating + 2);
  // Less than half skill: no additional modifier listed (threshold check for GM)
  // Options: −(options + 2, round up)
  if (options > 0) tn -= (options + 2);
  // Team programming: −(members + 2, round up)
  if (teamMembers > 1) tn -= (teamMembers + 2);
  // Used mainframe: +2
  if (usedMainframe) tn += 2;
  // Reduced base time: +3
  if (reducedTime) tn += 3;
  // Language modifier
  const lang = ProgrammingLanguages.find(l => l.id === languageId);
  if (lang && lang.bugMod) {
    if (lang.id === 'novatech') tn += lang.bugMod * options; // -1 per option
    else tn += lang.bugMod;
  }
  return tn;
}

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
