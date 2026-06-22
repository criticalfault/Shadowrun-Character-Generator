// Virtual Realities 2.0 — Cyberdeck Design Rules
// "Decks À La Carte" — VR2 pp. (Deck Component Prices / Deck Construction Materials)

// ── Program Factor (PF) Table ─────────────────────────────────────────────────
// PF is the multiplier used in component price formulas.
// The PF Basis specifies which rating to look up (MPCP or Program Rating).

export const PFTable = [
  { ratingMin: 1, ratingMax: 3,        pf: 100  },
  { ratingMin: 4, ratingMax: 6,        pf: 200  },
  { ratingMin: 7, ratingMax: 9,        pf: 500  },
  { ratingMin: 10, ratingMax: Infinity, pf: 1000 },
];

export function getPF(rating) {
  const row = PFTable.find(r => rating >= r.ratingMin && rating <= r.ratingMax);
  return row ? row.pf : 100;
}

// ── Component Cost Formulas ───────────────────────────────────────────────────
// All costs in nuyen. All formulas taken directly from VR2 Deck Component Prices Table.

export const ComponentFormulas = {
  // PERSONAWARE — PF Basis: MPCP
  mpcp: (mpcp) => {
    const pf = getPF(mpcp);
    return Math.round(mpcp * mpcp * (8 * pf + 195));
  },

  // Bod or Evasion — PF Basis: Program Rating
  bodOrEvasion: (rating) => {
    const pf = getPF(rating);
    return Math.round(rating * rating * (3 * pf + 95));
  },

  // Masking or Sensor — PF Basis: Program Rating
  maskingOrSensor: (rating) => {
    const pf = getPF(rating);
    return Math.round(rating * rating * (2 * pf + 75));
  },

  // Memory — flat per Mp
  activeMemory:  (mp) => Math.round(mp * 7.5),
  storageMemory: (mp) => mp * 6,

  // ASIST Interface — PF Basis: MPCP
  asistHot: (mpcp) => {
    const pf = getPF(mpcp);
    return Math.round(mpcp * mpcp * (pf * 2 + 40) + mpcp * 50);
  },
  asistCool: (mpcp) => {
    const pf = getPF(mpcp);
    return Math.round(mpcp * mpcp * (pf * 20) + mpcp * 25);
  },

  // Hardening — PF Basis: Hardening rating
  hardening: (hardening) => {
    const pf = getPF(hardening);
    return Math.round(hardening * hardening * (pf * 8 + 160) + hardening * 70);
  },

  // ICCM Biofeedback Filter — PF Basis: MPCP
  iccmFilter: (mpcp) => {
    const pf = getPF(mpcp);
    return Math.round(mpcp * mpcp * (pf * 4 + 115) + 5000);
  },

  // I/O Speed — flat per MePS
  ioSpeed: (mePS) => mePS * 30,

  // Response Increase — PF Basis: MPCP
  responseIncrease: (mpcp, response) => {
    const pf = getPF(mpcp);
    return Math.round((mpcp * mpcp * response) * (pf + 80) + response * 105);
  },

  // Satlink Interface — PF Basis: MPCP
  satlinkInterface: (mpcp) => {
    const pf = getPF(mpcp);
    return Math.round(mpcp * mpcp * (pf * 2 + 40) + mpcp * 35);
  },
};

// ── Casings ───────────────────────────────────────────────────────────────────
export const Casings = [
  { name: 'Basic (Impact 1)',                        impact: 1, ballistic: 0, cost: 0    },
  { name: 'Level 1 (Impact 2, Ballistic 1)',         impact: 2, ballistic: 1, cost: 500  },
  { name: 'Level 2 (Impact 3, Ballistic 2)',         impact: 3, ballistic: 2, cost: 2000 },
  { name: 'Level 3 (Impact 4, Ballistic 3)',         impact: 4, ballistic: 3, cost: 5000 },
];

// ── Hardwired Components (flat cost) ─────────────────────────────────────────
export const HardwiredComponents = [
  { name: 'Hitcher Jack',           cost: 250,  perUnit: true,  buildTimeHours: 48,  targetNumber: '# jacks + 1' },
  { name: 'Vidscreen',              cost: 100,  perUnit: false, buildTimeHours: 12,  targetNumber: 4             },
];

// Offline Storage: 50¥ + 0.5¥ per Mp
export function offlineStorageCost(mp) {
  return Math.round(50 + 0.5 * mp);
}

// ── Optical Chip Encoders (construction tool) ─────────────────────────────────
export const OpticalChipEncoders = [
  { name: 'Sony Encoder I',   deviceRating: 0, taskBonus:  0, cost: 1200,  availability: '4/24 hrs',  streetIndex: 1   },
  { name: 'Fuchi OCE/500',    deviceRating: 1, taskBonus:  0, cost: 2700,  availability: '6/24 hrs',  streetIndex: 1   },
  { name: 'Sony Encoder II',  deviceRating: 2, taskBonus: +1, cost: 6000,  availability: '8/72 hrs',  streetIndex: 1.5 },
  { name: 'Hitachi RM-AX',    deviceRating: 3, taskBonus: +2, cost: 9500,  availability: '10/7 days', streetIndex: 2   },
];

// ── Deck Construction Tools ───────────────────────────────────────────────────
export const ConstructionTools = [
  { name: 'Cybernetics Kit',       cost: 1500,    availability: '5/48 hrs',   streetIndex: 2    },
  { name: 'Cybernetics Shop',      cost: 15000,   availability: '8/72 hrs',   streetIndex: 3    },
  { name: 'Cybernetics Facility',  cost: 300000,  availability: '14/7 days',  streetIndex: 4    },
  { name: 'Microtronics Kit',      cost: 1500,    availability: '5/48 hrs',   streetIndex: 2    },
  { name: 'Microtronics Shop',     cost: 15000,   availability: '8/72 hrs',   streetIndex: 3    },
  { name: 'Microtronics Facility', cost: 300000,  availability: '14/7 days',  streetIndex: 4    },
  { name: 'Personal Computer',     costNote: '20¥ per Mp of memory', availability: 'Always', streetIndex: 0.75 },
];

// ── Raw Parts ─────────────────────────────────────────────────────────────────
export const Parts = {
  chips: [
    { name: 'Optical Code Chip (OCC)',  costPerMp: 20  },
    { name: 'Optical Memory Chip (OMC)', costPerMp: 5  },
    { name: 'Cranial OCC',              costPerMp: 200 },
    { name: 'Cranial OMC',              costPerMp: 50  },
  ],
  circuitry: [
    { name: 'Processor Logic Circuitry (PLC)', costPerRating: 25  },
    { name: 'Data Transport Circuitry (DTC)',  costPerRating: 10  },
    { name: 'Cranial PLC',                    costPerRating: 250 },
    { name: 'Cranial DTC',                    costPerRating: 100 },
  ],
};

// ── Program Prices ────────────────────────────────────────────────────────────
export const ProgramPrices = [
  { ratingMin: 1,  ratingMax: 3,        costPerSize: 100,  availability: '2/7 days',   streetIndex: 1   },
  { ratingMin: 4,  ratingMax: 6,        costPerSize: 200,  availability: '4/7 days',   streetIndex: 1.5 },
  { ratingMin: 7,  ratingMax: 9,        costPerSize: 500,  availability: '8/14 days',  streetIndex: 2   },
  { ratingMin: 10, ratingMax: Infinity, costPerSize: 1000, availability: '16/30 days', streetIndex: 3   },
];

export function getProgramPrice(rating) {
  return ProgramPrices.find(r => rating >= r.ratingMin && rating <= r.ratingMax) ?? ProgramPrices[0];
}

// ── Package Discount ──────────────────────────────────────────────────────────
// 10% discount when ordering a complete deck (MPCP + persona chips + ASIST + optional features).
export const PACKAGE_DISCOUNT = 0.10;

// ── Satlink Dish Prices ───────────────────────────────────────────────────────
// ── Design Rules / Constraints ────────────────────────────────────────────────

// Combined persona program ratings (Bod + Evasion + Masking + Sensor) ≤ MPCP × 3
export function personaRatingLimit(mpcp) { return mpcp * 3; }

// Response Increase max = floor(MPCP / 4), absolute cap of 5
export function responseIncreaseMax(mpcp) { return Math.min(Math.floor(mpcp / 4), 5); }

// I/O Speed must be multiples of 10; max = Sensor × MPCP × 10 Mp
export function ioSpeedMax(mpcp, sensor) { return sensor > 0 ? sensor * mpcp * 10 : null; }
export function roundIoSpeed(v) { return Math.round(v / 10) * 10; }

// ── Construction Tasks ────────────────────────────────────────────────────────
// For each component: softwareTask, cookTask, installationTask.
// programSize = Rating × Multiplier (used to calculate OCC cost at build time).
// Tasks are used at the table, not at purchase — for reference only in designer.

export const ConstructionTasks = {
  mpcp: {
    label: 'MPCP',
    software: { ratingBasis: 'MPCP Rating', multiplier: 8 },
    cook: {
      time: 'MPCP Rating × 3 days',
      test: 'Computer B/R (MPCP Rating)',
      parts: ['OCC @ program size'],
      tools: ['Personal Computer (Memory: MPCP program size)', 'Microtronics Shop', 'Optical-Chip Encoder'],
    },
    install: {
      time: 'MPCP Rating × 2 days',
      test: 'Computer B/R (MPCP Rating)',
      parts: ['PLC @ MPCP Rating²', 'DTC @ MPCP Rating²'],
      tools: ['Microtronics Shop'],
    },
  },

  bodOrEvasion: {
    label: 'Bod / Evasion',
    software: { ratingBasis: 'Program Rating', multiplier: 3 },
    cook: {
      time: 'Program Rating × 3 days',
      test: 'Computer B/R (Program Rating)',
      parts: ['OCC @ program size'],
      tools: ['Personal Computer (Memory: persona program size)', 'Microtronics Shop', 'Optical-Chip Encoder'],
    },
    install: {
      time: 'Program Rating × 2 days',
      test: 'Computer B/R (Program Rating)',
      parts: ['PLC @ Program Rating²', 'DTC @ Program Rating²'],
      tools: ['Microtronics Kit'],
    },
  },

  maskingOrSensor: {
    label: 'Masking / Sensor',
    software: { ratingBasis: 'Program Rating', multiplier: 2 },
    cook: {
      time: 'Program Rating × 3 days',
      test: 'Computer B/R (Program Rating)',
      parts: ['OCC @ program size'],
      tools: ['Personal Computer (Memory: persona program size)', 'Microtronics Shop', 'Optical-Chip Encoder'],
    },
    install: {
      time: 'Program Rating × 2 days',
      test: 'Computer B/R (Program Rating)',
      parts: ['PLC @ Program Rating²', 'DTC @ Program Rating²'],
      tools: ['Microtronics Kit'],
    },
  },

  asistHot: {
    label: 'ASIST Interface (Hot Deck)',
    software: { ratingBasis: 'MPCP Rating', multiplier: 2 },
    cook: {
      time: 'MPCP Rating × 1 day',
      test: 'Computer B/R (MPCP Rating)',
      parts: ['OCC @ program size'],
      tools: ['Personal Computer (Memory: MPCP program size)', 'Microtronics Kit', 'Optical-Chip Encoder'],
    },
    install: {
      time: 'MPCP Rating × 1 day',
      test: 'Computer B/R (MPCP Rating)',
      parts: ['PLC @ MPCP Rating × 2', 'ASIST Processor Unit (1,250¥)'],
      tools: ['Microtronics Kit'],
    },
  },

  asistCool: {
    label: 'ASIST Interface (Cool Deck)',
    software: { ratingBasis: 'MPCP Rating', multiplier: 1 },
    cook: {
      time: 'MPCP Rating × 1 day',
      test: 'Computer B/R (MPCP Rating)',
      parts: ['OCC @ program size'],
      tools: ['Personal Computer (Memory: MPCP program size)', 'Microtronics Kit', 'Optical-Chip Encoder'],
    },
    install: {
      time: 'MPCP Rating × 1 day',
      test: 'Computer B/R (MPCP Rating)',
      parts: ['PLC @ MPCP Rating × 1', 'ASIST Processor Unit (1,250¥)'],
      tools: ['Microtronics Kit'],
    },
  },

  activeMemory: {
    label: 'Active Memory',
    software: null,
    cook: null,
    install: {
      time: 'Memory Size ÷ 100 days (round up)',
      test: 'Computer B/R (Memory Size ÷ 100, round up)',
      parts: ['OMC @ memory size (Mp)', 'PLC @ memory size ÷ 10 (round up)'],
      tools: ['Microtronics Kit'],
    },
  },

  storageMemory: {
    label: 'Storage Memory',
    software: null,
    cook: null,
    install: {
      time: 'Memory Size ÷ 100 days (round up)',
      test: 'Computer B/R (Memory Size ÷ 100, round up)',
      parts: ['OMC @ memory size (Mp)', 'DTC @ memory size ÷ 10 (round up)'],
      tools: ['Microtronics Kit'],
    },
  },

  hardening: {
    label: 'Hardening',
    software: { ratingBasis: 'Hardening Rating', multiplier: 8 },
    cook: {
      time: 'MPCP × Hardening Rating × 1 day',
      test: 'Computer B/R (MPCP Rating)',
      parts: ['OCC @ Hardening program size'],
      tools: ['Personal Computer (Memory: Hardening program size)', 'Microtronics Shop', 'Optical-Chip Encoder'],
    },
    install: {
      time: 'MPCP Rating × Hardening Rating × 2 days',
      test: 'Computer B/R (MPCP Rating)',
      parts: ['PLC @ Hardening Rating × 2', 'DTC @ Hardening Rating × 2'],
      tools: ['Microtronics Shop'],
    },
  },

  iccmFilter: {
    label: 'ICCM Biofeedback Filter',
    software: { ratingBasis: 'MPCP Rating', multiplier: 4 },
    cook: {
      time: 'MPCP Rating × 2 days',
      test: 'Avg. Computer B/R and Biotech (MPCP Rating)',
      parts: ['OCC @ ICCM program size'],
      tools: ['Personal Computer (Memory: ICCM program size)', 'Microtronics Shop', 'Optical-Chip Encoder'],
    },
    install: {
      time: 'MPCP Rating × 2 days',
      test: 'Avg. Computer B/R and Biotech (MPCP Rating)',
      parts: ['PLC @ MPCP Rating²', 'DTC @ MPCP Rating²', 'Bioscanner (5,000¥)'],
      tools: ['Microtronics Shop'],
    },
  },

  ioSpeed: {
    label: 'I/O Speed',
    software: null,
    cook: null,
    install: {
      time: 'I/O Speed ÷ 20 days (round up)',
      test: 'Computer B/R (I/O Speed ÷ 100, round up)',
      parts: ['PLC @ I/O Speed ÷ 20 (round up)', 'DTC @ I/O Speed ÷ 10 (round up)'],
      tools: ['Microtronics Kit'],
    },
  },

  responseIncrease: {
    label: 'Response Increase',
    software: { ratingBasis: 'MPCP Rating', multiplier: 'Response Increase × 2' },
    cook: {
      time: 'MPCP Rating × Response Increase × 1 day',
      test: 'Computer B/R (Response Increase × 2)',
      parts: ['OCC @ program size'],
      tools: ['Personal Computer (Memory: Response Increase program size)', 'Microtronics Shop', 'Optical-Chip Encoder'],
    },
    install: {
      time: '(MPCP Rating + Response Increase) × 1 day',
      test: 'Computer B/R (Response Increase × 2)',
      parts: ['PLC @ Response Rating × 3', 'DTC @ Response Rating × 3'],
      tools: ['Microtronics Shop'],
    },
  },

  satlinkInterface: {
    label: 'Satlink Interface',
    software: { ratingBasis: 'MPCP Rating', multiplier: 2 },
    cook: {
      time: 'MPCP Rating × 1 day',
      test: 'Computer B/R (MPCP Rating)',
      parts: ['OCC @ MPCP'],
      tools: ['Personal Computer (Memory: MPCP program size)', 'Microtronics Shop', 'Optical-Chip Encoder'],
    },
    install: {
      time: 'MPCP Rating × 1 day',
      test: 'Computer B/R (MPCP Rating)',
      parts: ['PLC @ MPCP', 'DTC @ MPCP'],
      tools: ['Microtronics Shop'],
    },
  },
};

export const SatlinkDishes = [
  { name: '50-cm portable',   cost: 800  },
  { name: '1 meter portable', cost: 1200 },
  { name: '3 meter fixed',    cost: 900  },
  { name: 'Cable',            costNote: '10¥/meter' },
  { name: 'Temp Dish Electronics', cost: 1000 },
  { name: 'Temp Dish Webbing',     cost: 5    },
  { name: 'Temp Dish Spray (1 use)', cost: 1  },
];

// ── Full design cost calculator ───────────────────────────────────────────────
// Pass a design object and get back an itemized breakdown + total.

export function calcDeckCost(design) {
  const {
    mpcp = 0,
    bod = 0,
    evasion = 0,
    masking = 0,
    sensor = 0,
    asistType = 'hot',   // 'hot' | 'cool' | 'none'
    activeMemoryMp = 0,
    storageMemoryMp = 0,
    hardening = 0,
    iccmFilter = false,
    ioSpeedMePS = 0,
    responseIncrease = 0,
    satlinkInterface = false,
    casing = 0,          // index into Casings
    hitckerJacks = 0,
    offlineStorageMp = 0,
    vidscreen = false,
    packageDiscount = false,
  } = design;

  const f = ComponentFormulas;
  const items = [];

  const add = (label, cost) => { if (cost > 0) items.push({ label, cost }); };

  add('MPCP',                    f.mpcp(mpcp));
  if (bod > 0)     add(`Bod (${bod})`,         f.bodOrEvasion(bod));
  if (evasion > 0) add(`Evasion (${evasion})`, f.bodOrEvasion(evasion));
  if (masking > 0) add(`Masking (${masking})`, f.maskingOrSensor(masking));
  if (sensor > 0)  add(`Sensor (${sensor})`,   f.maskingOrSensor(sensor));

  if (asistType === 'hot')  add('ASIST Interface (Hot)',  f.asistHot(mpcp));
  if (asistType === 'cool') add('ASIST Interface (Cool)', f.asistCool(mpcp));

  if (activeMemoryMp > 0)  add(`Active Memory (${activeMemoryMp} Mp)`,  f.activeMemory(activeMemoryMp));
  if (storageMemoryMp > 0) add(`Storage Memory (${storageMemoryMp} Mp)`, f.storageMemory(storageMemoryMp));
  if (hardening > 0)       add(`Hardening (${hardening})`,               f.hardening(hardening));
  if (iccmFilter)          add('ICCM Biofeedback Filter',                f.iccmFilter(mpcp));
  if (ioSpeedMePS > 0)     add(`I/O Speed (${ioSpeedMePS} MePS)`,       f.ioSpeed(ioSpeedMePS));
  if (responseIncrease > 0) add(`Response Increase (${responseIncrease})`, f.responseIncrease(mpcp, responseIncrease));
  if (satlinkInterface)    add('Satlink Interface',                       f.satlinkInterface(mpcp));

  const casingEntry = Casings[casing];
  if (casingEntry?.cost > 0) add(`Casing (${casingEntry.name})`, casingEntry.cost);
  if (hitckerJacks > 0)      add(`Hitcher Jacks (×${hitckerJacks})`, 250 * hitckerJacks);
  if (offlineStorageMp > 0)  add(`Offline Storage (${offlineStorageMp} Mp)`, offlineStorageCost(offlineStorageMp));
  if (vidscreen)             add('Vidscreen', 100);

  const subtotal = items.reduce((s, i) => s + i.cost, 0);
  const discount = packageDiscount ? Math.round(subtotal * PACKAGE_DISCOUNT) : 0;
  const total = subtotal - discount;

  return { items, subtotal, discount, total };
}
