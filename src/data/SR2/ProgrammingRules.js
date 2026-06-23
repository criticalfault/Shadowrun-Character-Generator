// SR2 Programming Rules — Virtual Realities 2.0
// Sources: VR2 pp. 101–104, 161

// ── Utilities Table (VR2 p.161) ───────────────────────────────────────────────
// type: 'operational' | 'defensive' | 'offensive' | 'special'
// availableOptions: option ids that can be applied to this utility
export const SR2Utilities = [
  { id: 'analyze',      label: 'Analyze',      type: 'operational', mult: 3,  systemOps: 'Analyze IC/Icon/Security, Locate IC',    availableOptions: [] },
  { id: 'armor',        label: 'Armor',        type: 'defensive',   mult: 3,  systemOps: null,                                     availableOptions: ['optimization'] },
  { id: 'attack_l',     label: 'Attack-L',     type: 'offensive',   mult: 2,  systemOps: null,                                     availableOptions: ['area','chaser','dinab','limit','one_shot','optimization','penetration','skulk','targeting'] },
  { id: 'attack_m',     label: 'Attack-M',     type: 'offensive',   mult: 3,  systemOps: null,                                     availableOptions: ['area','chaser','dinab','limit','one_shot','optimization','penetration','skulk','targeting'] },
  { id: 'attack_s',     label: 'Attack-S',     type: 'offensive',   mult: 4,  systemOps: null,                                     availableOptions: ['area','chaser','dinab','limit','one_shot','optimization','penetration','skulk','targeting'] },
  { id: 'attack_d',     label: 'Attack-D',     type: 'offensive',   mult: 5,  systemOps: null,                                     availableOptions: ['area','chaser','dinab','limit','one_shot','optimization','penetration','skulk','targeting'] },
  { id: 'black_hammer', label: 'Black Hammer', type: 'offensive',   mult: 20, systemOps: null,                                     availableOptions: ['one_shot','optimization','targeting'] },
  { id: 'browse',       label: 'Browse',       type: 'operational', mult: 1,  systemOps: 'Locate Access Node/File/Slave',          availableOptions: [] },
  { id: 'camo',         label: 'Camo',         type: 'defensive',   mult: 3,  systemOps: null,                                     availableOptions: ['one_shot','optimization'] },
  { id: 'cloak',        label: 'Cloak',        type: 'defensive',   mult: 3,  systemOps: null,                                     availableOptions: ['one_shot','optimization'] },
  { id: 'commlink',     label: 'Commlink',     type: 'operational', mult: 1,  systemOps: 'Retrain, Tap Comcall',                   availableOptions: [] },
  { id: 'compressor',   label: 'Compressor',   type: 'special',     mult: 2,  systemOps: null,                                     availableOptions: [] },
  { id: 'crash',        label: 'Crash',        type: 'operational', mult: 3,  systemOps: 'Crash Application/Host',                 availableOptions: [] },
  { id: 'defuse',       label: 'Defuse',       type: 'defensive',   mult: 2,  systemOps: null,                                     availableOptions: [] },
  { id: 'deception',    label: 'Deception',    type: 'operational', mult: 2,  systemOps: 'Graceful Logoff/Logon',                  availableOptions: [] },
  { id: 'decrypt',      label: 'Decrypt',      type: 'operational', mult: 1,  systemOps: 'Decrypt Access/File/Slave',              availableOptions: [] },
  { id: 'disinfect',    label: 'Disinfect',    type: 'operational', mult: 2,  systemOps: 'Disinfect',                              availableOptions: [] },
  { id: 'evaluate',     label: 'Evaluate',     type: 'operational', mult: 2,  systemOps: 'Locate Paydata',                         availableOptions: [] },
  { id: 'hog',          label: 'Hog',          type: 'offensive',   mult: 3,  systemOps: null,                                     availableOptions: ['dinab','one_shot','optimization','targeting'] },
  { id: 'killjoy',      label: 'Killjoy',      type: 'offensive',   mult: 10, systemOps: null,                                     availableOptions: ['one_shot','optimization','targeting'] },
  { id: 'lock_on',      label: 'Lock-on',      type: 'defensive',   mult: 3,  systemOps: null,                                     availableOptions: ['one_shot','optimization'] },
  { id: 'medic',        label: 'Medic',        type: 'defensive',   mult: 4,  systemOps: null,                                     availableOptions: ['dinab','optimization'] },
  { id: 'mirrors',      label: 'Mirrors',      type: 'operational', mult: 3,  systemOps: 'Decoy',                                  availableOptions: [] },
  { id: 'poison',       label: 'Poison',       type: 'offensive',   mult: 3,  systemOps: null,                                     availableOptions: ['area','dinab','one_shot','optimization','targeting'] },
  { id: 'read_write',   label: 'Read/Write',   type: 'operational', mult: 2,  systemOps: 'Download/Upload Data, Edit File',        availableOptions: [] },
  { id: 'relocate',     label: 'Relocate',     type: 'operational', mult: 2,  systemOps: null,                                     availableOptions: [] },
  { id: 'restore',      label: 'Restore',      type: 'defensive',   mult: 3,  systemOps: null,                                     availableOptions: ['dinab','one_shot','optimization'] },
  { id: 'restrict',     label: 'Restrict',     type: 'offensive',   mult: 3,  systemOps: null,                                     availableOptions: ['area','dinab','one_shot','optimization','targeting'] },
  { id: 'reveal',       label: 'Reveal',       type: 'offensive',   mult: 3,  systemOps: null,                                     availableOptions: ['area','dinab','one_shot','optimization','targeting'] },
  { id: 'scanner',      label: 'Scanner',      type: 'operational', mult: 3,  systemOps: 'Locate Decker/Frame',                   availableOptions: [] },
  { id: 'shield',       label: 'Shield',       type: 'defensive',   mult: 4,  systemOps: null,                                     availableOptions: ['optimization'] },
  { id: 'sleaze',       label: 'Sleaze',       type: 'special',     mult: 3,  systemOps: null,                                     availableOptions: [] },
  { id: 'slow',         label: 'Slow',         type: 'offensive',   mult: 4,  systemOps: null,                                     availableOptions: ['area','dinab','one_shot','optimization','targeting'] },
  { id: 'spoof',        label: 'Spoof',        type: 'operational', mult: 3,  systemOps: 'Command/Edit/Monitor Slave',             availableOptions: [] },
  { id: 'steamroller',  label: 'Steamroller',  type: 'offensive',   mult: 3,  systemOps: null,                                     availableOptions: ['dinab','one_shot','optimization','targeting'] },
  { id: 'track',        label: 'Track',        type: 'special',     mult: 8,  systemOps: null,                                     availableOptions: [] },
  { id: 'validate',     label: 'Validate',     type: 'operational', mult: 4,  systemOps: 'Dump Log, Validate Passcode',            availableOptions: [] },
];

// ── Utility Options (VR2 pp.103–104) ─────────────────────────────────────────
// ratingMod: numeric modifier to rating (or 'special' / 'per_rating')
// actualSizeMod: multiplier applied to actual size (0.5 = ×0.5 = half)
// designSizeMod: multiplier applied to design size (2.0 = double)
// notes: plain-English rule summary
export const SR2UtilityOptions = [
  {
    id: 'area',
    label: 'Area',
    ratingMod: 'per_area_rating',
    actualSizeMod: null,
    designSizeMod: null,
    notes: '+Area Rating to program rating. Targets = area rating. Each additional target beyond the first raises TN by 2 for that target. Personas and IC programs carrying Armor gain +2 to effective Armor Rating when attacked by Area utilities.',
  },
  {
    id: 'chaser',
    label: 'Chaser',
    ratingMod: 1,
    actualSizeMod: null,
    designSizeMod: null,
    notes: 'Negates the +2 TN penalty for attacking IC programs with the Shift defensive utility. Adds +2 TN against targets using Shield. Cannot be combined with Penetration.',
  },
  {
    id: 'dinab',
    label: 'DINAB',
    ratingMod: 'per_dinab_rating',
    actualSizeMod: null,
    designSizeMod: null,
    notes: '"Decker in a box." +DINAB Rating. The decker may spend a Free Action and two Simple Actions to run all DINAB-equipped utilities simultaneously. Degrades 1 Rating Point each time it fails a test. Crashes on all-1s. Requires Swap Memory operation to reload.',
  },
  {
    id: 'limit',
    label: 'Limit',
    ratingMod: -1,
    actualSizeMod: null,
    designSizeMod: null,
    notes: '−1 to rating. Restricts utility to a single target type (deckers, IC, frames, or SKs). Useless against any other target type. Also reduces actual size (since rating is lower).',
  },
  {
    id: 'one_shot',
    label: 'One-Shot',
    ratingMod: 'special',
    actualSizeMod: 0.25,
    designSizeMod: 1.5,
    notes: 'Single use — utility vanishes after executing once. Decker must reload it with a Swap Memory operation to use again. Actual size ×0.25 (−75%). Design size ×1.5 (+50%). A Tar Baby/Tar Pit IC trashes all copies of a one-shot program in active memory.',
  },
  {
    id: 'optimization',
    label: 'Optimization',
    ratingMod: 'special',
    actualSizeMod: 0.5,
    designSizeMod: 2.0,
    notes: 'Reduces actual size by 50% (×0.5). Increases design size by 100% (×2). Reduces memory footprint at the cost of longer programming time.',
  },
  {
    id: 'penetration',
    label: 'Penetration',
    ratingMod: 1,
    actualSizeMod: null,
    designSizeMod: null,
    notes: '+1 to rating. Defeats the Shield defensive utility. Against IC programs with the Shift defensive utility, suffers a +2 TN penalty. Cannot be combined with Chaser.',
  },
  {
    id: 'sensitive',
    label: 'Sensitive',
    ratingMod: 'special',
    actualSizeMod: 0.25,
    designSizeMod: 1.5,
    notes: 'Makes utility effective only on one manufacturer\'s mainframes. Requires in-depth knowledge of the Matrix architecture of different computer systems. Actual size ×0.25 (−75%). Design size ×1.5 (+50%).',
  },
  {
    id: 'skulk',
    label: 'Skulk',
    ratingMod: 'per_stealth_rating',
    actualSizeMod: null,
    designSizeMod: null,
    notes: '+Stealth Rating. When used to crash an IC program, reduces or eliminates additions to the security tally. Reduce the resulting security tally increase by the Skulk Rating.',
  },
  {
    id: 'squeeze',
    label: 'Squeeze',
    ratingMod: 1,
    actualSizeMod: 0.5,
    designSizeMod: null,
    notes: '+1 to rating. Self-compressed program. Actual size ×0.5 for upload/memory purposes. Cannot be used until decompressed (Complex Action to decompress; no test required). If uploaded while squeezed using the Compressor utility, actual size is ×0.25 (−75%) total and design size is only increased by the Squeeze modifier.',
  },
  {
    id: 'targeting',
    label: 'Targeting',
    ratingMod: 2,
    actualSizeMod: null,
    designSizeMod: null,
    notes: '+2 to rating. Provides −2 target-number modifier for attacks made with targeting-equipped combat utilities.',
  },
];

// ── Program Size (VR2 p.101) ──────────────────────────────────────────────────
// Size = Rating² × Multiplier (in Mp)
export function sr2ProgramSize(rating, multiplier) {
  return rating * rating * multiplier;
}

// Pre-calculated size table (ratings 1–14, multipliers 1–10)
export function sr2SizeTable() {
  const rows = [];
  for (let r = 1; r <= 14; r++) {
    const cols = {};
    for (let m = 1; m <= 10; m++) {
      cols[m] = r * r * m;
    }
    rows.push({ rating: r, ...cols });
  }
  return rows;
}

// ── Programming Rules (VR2 pp.101–102) ───────────────────────────────────────

// Maximum program rating (VR2 p.101)
// Deck/frame core programs: skill × 1.5 (round down)
// All other programs: = skill rating
export function sr2MaxRating(skill, isDeckOrFrame = false) {
  if (isDeckOrFrame) return Math.floor(skill * 1.5);
  return skill;
}

// Base time in days = program size × 2 (VR2 p.102)
export function sr2BaseTimeDays(sizeMp) {
  return sizeMp * 2;
}

// Task period in days = base time ÷ successes (VR2 p.101)
export function sr2TaskPeriod(baseTimeDays, successes) {
  if (!successes || successes < 1) return baseTimeDays;
  return Math.ceil(baseTimeDays / successes);
}

// Programming TN = program rating (VR2 p.101)
// Test: Computer Skill (or Software concentration / Matrix Programming specialization)
export function sr2ProgrammingTN(rating) {
  return rating;
}

// ── Programming Tools (VR2 p.102) ────────────────────────────────────────────
export const SR2ProgrammingTools = [
  {
    id: 'personal_computer',
    label: 'Personal Computer',
    taskBonus: 0,
    costNote: '20¥/Mp of memory required',
    notes: 'Minimum setup needed. Memory must equal or exceed program size. Miniature decks cost more (VR2 p.259, SRII).',
  },
  {
    id: 'double_memory',
    label: 'Double Required Memory',
    taskBonus: 1,
    costNote: '20¥/Mp of memory (double)',
    notes: '+1 task bonus. Computer has at least double the required memory for the program.',
  },
  {
    id: 'programming_kit',
    label: 'Programming Kit',
    taskBonus: 1,
    costNote: '1,500¥',
    notes: 'Basic tool suite installed in personal computer. +1 task bonus. Cannot be used on a mainframe.',
  },
  {
    id: 'programming_shop',
    label: 'Programming Shop',
    taskBonus: 2,
    costNote: '15,000¥',
    notes: 'More elaborate package. +2 task bonus. Doubles memory in personal computer. If computer already has doubled memory, quadruples it and gives +3 total bonus (−1 for doubled memory, +2 for shop).',
  },
  {
    id: 'mainframe_host',
    label: 'Mainframe Host (access)',
    taskBonus: 4,
    costNote: '100¥ × Security Value per day (5,000,000¥ to purchase)',
    notes: '+4 task bonus. Mainframe\'s Security Value must be at least half the rating of the program. Cost per day = Security Value × 100¥. Companies have very active security — Validate Passcode counterfeit risk.',
  },
  {
    id: 'mainframe_suite',
    label: 'Mainframe + Programming Suite',
    taskBonus: 5,
    costNote: '100¥ × Security Value per day (300,000¥ suite to purchase)',
    notes: '+5 task bonus. Programming suite on mainframe adds +1 to the mainframe host bonus. Suite costs 300,000¥ and is useless without a mainframe. Programming time: Security Value × 200¥/day.',
  },
];

// ── Design Size with Options ──────────────────────────────────────────────────
// Options affect actual size and/or design size independently.
// Apply all rating modifiers first, then percentage size changes sequentially.
// VR2 p.103: "When layering multiple options on a single program, apply any changes
// to the program's rating before calculating any percentage changes in its size."

export function sr2CalcEffectiveRating(baseRating, selectedOptions) {
  let rating = baseRating;
  selectedOptions.forEach(opt => {
    const def = SR2UtilityOptions.find(o => o.id === opt.id);
    if (!def) return;
    if (typeof def.ratingMod === 'number') rating += def.ratingMod;
    if (def.id === 'area' && opt.areaRating)   rating += opt.areaRating;
    if (def.id === 'dinab' && opt.dinabRating)  rating += opt.dinabRating;
    if (def.id === 'skulk' && opt.skulkRating)  rating += opt.skulkRating;
  });
  return Math.max(1, rating);
}

export function sr2CalcActualSize(baseRating, multiplier, selectedOptions) {
  const effectiveRating = sr2CalcEffectiveRating(baseRating, selectedOptions);
  let size = effectiveRating * effectiveRating * multiplier;
  // Apply sequential percentage changes to actual size
  selectedOptions.forEach(opt => {
    const def = SR2UtilityOptions.find(o => o.id === opt.id);
    if (!def || def.actualSizeMod == null) return;
    size = size * def.actualSizeMod;
  });
  return Math.round(size);
}

export function sr2CalcDesignSize(baseRating, multiplier, selectedOptions) {
  const effectiveRating = sr2CalcEffectiveRating(baseRating, selectedOptions);
  let size = effectiveRating * effectiveRating * multiplier;
  // Apply sequential percentage changes to design size
  selectedOptions.forEach(opt => {
    const def = SR2UtilityOptions.find(o => o.id === opt.id);
    if (!def || def.designSizeMod == null) return;
    size = size * def.designSizeMod;
  });
  return Math.round(size);
}

// ── Programming Teams (VR2 p.102) ────────────────────────────────────────────
// Max team size = highest Computer Skill ÷ 2 (round down)
// Max program rating = 1 + highest Computer Skill
// Average all skills (round up) for Computer Test
// Sum all task bonuses, divide by number of programmers = team's task bonus
// Each day a team member works reduces task period by 1 day

export function sr2MaxTeamSize(highestSkill) {
  return Math.floor(highestSkill / 2);
}

export function sr2MaxTeamRating(highestSkill) {
  return 1 + highestSkill;
}

export function sr2TeamTaskBonus(toolBonuses) {
  // toolBonuses: array of task bonuses per member
  const total = toolBonuses.reduce((a, b) => a + b, 0);
  return Math.floor(total / toolBonuses.length);
}

// ── Command Sets (VR2 p.105) ──────────────────────────────────────────────────
// Design size: 1D6 × 20 Mp
// Upload: decker must perform a successful Control Test to load the program
// Host scores successes against Subsystem Tests; sum ÷ 24 = hours the command
// set will continue running undetected. If host scores no successes: 48 hrs.
export const SR2_COMMAND_SET_DESIGN_SIZES = [20, 40, 60, 80, 100, 120]; // 1D6 × 20 Mp

export function sr2CommandSetBaseTime(designSizeMp) {
  return designSizeMp * 2; // days, same formula as other programs
}

// ── Frames (VR2 pp.105–106) ──────────────────────────────────────────────────
// Frame Core: Rating² × Frame Core Multiplier
// Dumb frame multiplier: 2  |  Smart frame multiplier: 3
// Max Core Rating: Computer Skill × 1.5 (round down) — same as deck/frame rule
// Options available: DINAB, Optimization, Squeeze only
// Attributes (Bod, Evasion, Masking, Sensor): combined may not exceed Core Rating; any can be 0
// Core Rating used in place of MPCP for any test requiring MPCP
// Smart Frame Reaction = Core Rating

export const SR2FrameTypes = [
  {
    id: 'dumb',
    label: 'Dumb Frame',
    coreMult: 2,
    hasDINABRequired: false,
    hasInitiative: false,
    notes: 'Linked to decker\'s persona; only exists as long as controlling decker is active on the host. Executes programs on a Simple Action command. Cannot repeat an action — a second attack requires a second command. Logs off if decker logs off. May include DINAB option (optional), which can trigger one program per given action.',
  },
  {
    id: 'smart',
    label: 'Smart Frame',
    coreMult: 3,
    hasDINABRequired: true,
    hasInitiative: true,
    notes: 'Capable of independent existence in the Matrix. Must be programmed with DINAB option (rating = Computer Skill). Decker gives a Free Action order, then frame acts on its own. Has own Reaction (= Core Rating) and Initiative (1D6 + Init dice from Core Rating Points). DINAB rating cannot exceed programmer\'s Computer Skill.',
  },
];

// Frame Core actual size (always dumb or smart multiplier, no options change this directly)
export function sr2FrameCoreSize(coreRating, frameType) {
  const ft = SR2FrameTypes.find(t => t.id === frameType) ?? SR2FrameTypes[0];
  return coreRating * coreRating * ft.coreMult;
}

// Smart Frame Initiative allocation
// Programmer allocates Core Rating Points at programming time; each point = +1 Init die
// Unmodified smart frame rolls 1D6 for Initiative; remaining Core Rating Points go to attributes
export function sr2FrameInitDice(initPoints) {
  return 1 + initPoints; // base 1D6 + allocated points
}

// Frame Loading (VR2 p.106)
// Loading Rating = combined program ratings ÷ 2 (round down)
// Loading size = Loading Rating² (Mp)
// Loading base time = Loading size × 2 (days)
// Computer Test vs average rating of programs being loaded
export function sr2LoadingRating(programRatings) {
  const total = programRatings.reduce((a, b) => a + b, 0);
  return Math.floor(total / 2);
}
export function sr2LoadingSize(loadingRating) {
  return loadingRating * loadingRating;
}
export function sr2LoadingBaseTime(loadingRating) {
  return sr2LoadingSize(loadingRating) * 2;
}
export function sr2AvgProgramRating(programRatings) {
  if (!programRatings.length) return 0;
  return Math.ceil(programRatings.reduce((a, b) => a + b, 0) / programRatings.length);
}

// Actual size of a frame = frame core size + actual size of all loaded programs + options
export function sr2FrameTotalSize(coreSizeMp, programSizes) {
  return coreSizeMp + programSizes.reduce((a, b) => a + b, 0);
}

// ── Upgrading Programs (VR2 p.107) ───────────────────────────────────────────
// Can upgrade any program except command sets (must have source code)
// Base time = base time for new rating from scratch − base time for current rating from scratch
// TN = rating of upgraded program
// Task period = upgrade base time ÷ Computer Test successes
export function sr2UpgradeBaseTime(newRating, oldRating, multiplier) {
  const newSize  = sr2ProgramSize(newRating, multiplier);
  const oldSize  = sr2ProgramSize(oldRating, multiplier);
  const newBase  = sr2BaseTimeDays(newSize);
  const oldBase  = sr2BaseTimeDays(oldSize);
  return Math.max(1, newBase - oldBase);
}

// ── Buying Programs — Program Prices Table (VR2 p.107) ───────────────────────
// Price = size × price multiplier; option ratings do not affect price
// Availability: Etiquette (Matrix) skill test
export const SR2ProgramPriceTiers = [
  { ratingMin: 1,  ratingMax: 3,        priceMult: 100,   avail: '2/7 days',   streetIndex: 1   },
  { ratingMin: 4,  ratingMax: 6,        priceMult: 200,   avail: '4/7 days',   streetIndex: 1.5 },
  { ratingMin: 7,  ratingMax: 9,        priceMult: 500,   avail: '8/14 days',  streetIndex: 2   },
  { ratingMin: 10, ratingMax: Infinity, priceMult: 1000,  avail: '16/30 days', streetIndex: 3   },
];

export function sr2ProgramPrice(rating, sizeMp) {
  const tier = SR2ProgramPriceTiers.find(t => rating >= t.ratingMin && rating <= t.ratingMax);
  if (!tier) return null;
  return { price: sizeMp * tier.priceMult, avail: tier.avail, streetIndex: tier.streetIndex };
}

export function sr2ProgramPriceTier(rating) {
  return SR2ProgramPriceTiers.find(t => rating >= t.ratingMin && rating <= t.ratingMax);
}
