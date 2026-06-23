// SR3 Matrix Cyberterminal Construction Rules
// Source: Matrix (SR3 supplement), Chapter 4: Cyberterminal Construction (pp. 54–63)
//
// SR3 uses flat 35¥ × Rating² formulas — completely different from VR2's PF system.
// Costs below are CONSTRUCTION costs (parts only) except where noted as retail.

// ── Component Cost Formulas ───────────────────────────────────────────────────

export const ComponentCosts = {
  // MPCP: 35¥ × MPCP²
  mpcp: (mpcp) => 35 * mpcp * mpcp,

  // Persona chip (Bod, Evasion, Masking, Sensor): 35¥ × Rating²  (each, same formula)
  persona: (rating) => 35 * rating * rating,

  // ASIST Interface
  asistHot:  (mpcp) => 25 * mpcp * mpcp + 1250,   // 25¥ × MPCP² + 1,250¥ ASIST Processor Unit
  asistCool: (mpcp) => 25 * mpcp + 1250,            // 25¥ × MPCP  + 1,250¥ ASIST Processor Unit

  // Hardening: 35¥ × Hardening²
  hardening: (rating) => 35 * rating * rating,

  // ICCM Biofeedback Filter: 35¥ × MPCP + 1,000¥ bio-monitor
  iccmFilter: (mpcp) => 35 * mpcp + 1000,

  // Icon Chip: 35¥ × Rating² (rating 1 icon ships free with MPCP)
  iconChip: (rating) => 35 * rating * rating,

  // I/O Speed — retail purchase price from mat.170: 35¥ per MePS (max = MPCP × 100 MePS)
  // Construction parts: 35¥ × (speed ÷ 10, round up)
  ioSpeedRetail:       (mePS) => 35 * mePS,
  ioSpeedConstruction: (mePS) => 35 * Math.ceil(mePS / 10),

  // Active Memory — retail from mat.170: 7.5¥/Mp
  activeMemory: (mp) => Math.round(mp * 7.5),

  // Storage Memory — retail from mat.170: 6¥/Mp
  storageMemory: (mp) => mp * 6,

  // RAS Override: 1,000¥ (unit) + 35¥ × MPCP (connections)
  rasOverride: (mpcp) => 1000 + 35 * mpcp,

  // Reality Filter (SR3-only): 70¥ × MPCP; max rating = MPCP
  realityFilter: (mpcp) => 70 * mpcp,

  // Response Increase: 135¥ × RI rating
  responseIncrease: (ri) => 135 * ri,

  // Matrix Interface: 35¥ + fiberoptic cable (standard 5m = 5¥)
  matrixInterface: () => 40,

  // Maser Interface: 3,000¥ fixed
  maserInterface: () => 3000,

  // Ports (FUPs): 235¥ each
  ports: (count) => 235 * count,

  // Hitcher Jack (mat.169 / sr3.304): 250¥ each
  hitcherJack: () => 250,
};

// ── Design Constraints ────────────────────────────────────────────────────────

// Combined persona ratings (Bod + Evasion + Masking + Sensor) ≤ MPCP × 3
export function personaRatingLimit(mpcp) { return mpcp * 3; }

// Response Increase max = floor(MPCP ÷ 4), hard cap of 3
// MPCP 3 or below → 0 RI allowed
export function responseIncreaseMax(mpcp) { return Math.min(Math.floor(mpcp / 4), 3); }

// I/O Speed must be multiples of 10; max = MPCP × 100 MePS
export function ioSpeedMax(mpcp) { return mpcp * 100; }
export function roundIoSpeed(v)  { return Math.round(v / 10) * 10; }

// Reality Filter max rating = MPCP
export function realityFilterMax(mpcp) { return mpcp; }

// ── Optical Chip Encoders (SR3 Matrix version) ────────────────────────────────

export const OpticalChipEncoders = [
  { name: 'Sony Encoder I',    rating: 0, cost: 500,   availability: '4/24 hrs',  streetIndex: 1   },
  { name: 'Cross Cooker 1000', rating: 1, cost: 1000,  availability: '4/3 hrs',   streetIndex: 1   },
  { name: 'Novatech Burner',   rating: 2, cost: 2700,  availability: '6/24 hrs',  streetIndex: 1   },
  { name: 'Transys T-1000',    rating: 3, cost: 3400,  availability: '8/24 hrs',  streetIndex: 1.5 },
  { name: 'Sony Encoder II',   rating: 4, cost: 6000,  availability: '8/72 hrs',  streetIndex: 1.5 },
  { name: 'Novatech Novahot',  rating: 5, cost: 7500,  availability: '10/72 hrs', streetIndex: 2   },
  { name: 'Hitachi RM-Ax',     rating: 6, cost: 9500,  availability: '10/7 days', streetIndex: 2   },
  { name: 'Cross Angelic',     rating: 7, cost: 12000, availability: '10/7 days', streetIndex: 2   },
  { name: 'Transys Quantum I', rating: 8, cost: 15000, availability: '10/1 mo',   streetIndex: 3   },
];

// ── Casings (SR3) ─────────────────────────────────────────────────────────────

export const Casings = [
  { name: 'No casing',                                  barrierRating: 0,  cost: 0    },
  { name: 'Standard (Barrier 3)',                        barrierRating: 3,  cost: 100  },
  { name: 'Reinforced (Barrier 6)',                      barrierRating: 6,  cost: 1600 },
  { name: 'Heavy Duty (Barrier 10)',                     barrierRating: 10, cost: 3600 },
  { name: 'Higher Barrier',                              barrierRating: null, costNote: '500¥ per extra Barrier point above 10' },
];

// ── Transmission Device Table ─────────────────────────────────────────────────

export const TransmissionDevices = [
  { name: 'Cellular',  costFormula: 'Rating × 500¥',   availability: 'Rating/24 hrs',  streetIndex: 1,   legality: 'Legal' },
  { name: 'Laser',     cost: 2500,                      availability: '8/1 wks',        streetIndex: 1,   legality: 'Legal' },
  { name: 'Microwave', cost: 5000,                      availability: '14/3 wks',       streetIndex: 2,   legality: '8P-U'  },
  { name: 'Radio',     costFormula: 'Rating × 250¥',   availability: 'Rating/12 hrs',  streetIndex: 0.5, legality: 'Legal' },
  { name: 'Satellite', costFormula: 'Rating × 1,000¥', availability: 'Rating/3 days',  streetIndex: 2,   legality: '6P-U'  },
];

// ── Construction Tasks ────────────────────────────────────────────────────────
// Design → Software → Cook → Install (not all components require all stages)

export const ConstructionTasks = {
  mpcp: {
    label: 'MPCP',
    design: { modifier: 'TN = actual MPCP rating' },
    software: { ratingBasis: 'MPCP rating', multiplier: 8 },
    cook: { required: true },
    install: {
      time: 'MPCP rating in hours',
      test: 'Computer B/R (MPCP Rating)',
      parts: ['35¥ × MPCP rating²'],
      tools: ['Microtronics shop'],
    },
  },

  persona: {
    label: 'Persona Chip (Bod / Evasion / Masking / Sensor)',
    design: { modifier: '0 (Bod/Sensor), +1 (Masking/Evasion); +1 more if SASS with Masking' },
    software: { ratingBasis: 'Program rating', multiplier: '3 (Bod/Evasion) or 2 (Masking/Sensor)' },
    cook: { required: true },
    install: {
      time: '1 hour',
      test: 'Computer B/R (Program Rating)',
      parts: ['35¥ × Program rating²'],
      tools: ['Microtronics kit'],
    },
  },

  asistHot: {
    label: 'Hot ASIST Interface',
    design: { modifier: '+2' },
    software: { ratingBasis: 'MPCP rating', multiplier: 4 },
    cook: { required: true },
    install: {
      time: 'MPCP rating in days',
      test: 'Computer B/R (MPCP Rating)',
      parts: ['25¥ × (MPCP rating²)', 'ASIST Processor Unit (1,250¥)'],
      tools: ['Microtronics kit'],
    },
  },

  asistCool: {
    label: 'Cold ASIST Interface',
    design: { modifier: '+2' },
    software: { ratingBasis: 'MPCP rating', multiplier: 2 },
    cook: { required: true },
    install: {
      time: 'MPCP rating in days',
      test: 'Computer B/R (MPCP Rating)',
      parts: ['25¥ × MPCP rating', 'ASIST Processor Unit (1,250¥)'],
      tools: ['Microtronics kit'],
    },
  },

  activeMemory: {
    label: 'Active Memory',
    design: null,
    software: null,
    cook: null,
    install: {
      time: 'Memory Size ÷ 200 hours (round up)',
      test: 'Computer B/R (4)',
      parts: ['OMC @ (memory size × 2)', '1.5¥ × memory size (misc parts)'],
      tools: ['Microtronics Kit'],
    },
  },

  storageMemory: {
    label: 'Storage Memory',
    design: null,
    software: null,
    cook: null,
    install: {
      time: 'Memory Size ÷ 200 hours (round up)',
      test: 'Computer B/R (4)',
      parts: ['OMC @ memory size', '0.5¥ × memory size (misc parts)'],
      tools: ['Microtronics Kit'],
    },
  },

  hardening: {
    label: 'Hardening',
    design: { modifier: '+3' },
    software: { ratingBasis: 'Hardening rating', multiplier: 8 },
    cook: { required: true },
    install: {
      time: '(MPCP rating × Hardening rating) days',
      test: 'Computer B/R (MPCP Rating)',
      parts: ['35¥ × (Hardening rating²)'],
      tools: ['Microtronics shop'],
    },
  },

  iccmFilter: {
    label: 'ICCM Biofeedback Filter',
    design: { modifier: '+1' },
    software: { ratingBasis: 'MPCP rating', multiplier: 4 },
    cook: { required: true },
    install: {
      time: '(MPCP rating × 2) days',
      test: 'Computer B/R (4) AND Computer (Cybernetics) (MPCP Rating)',
      parts: ['35¥ × MPCP rating', 'Bio-monitor (1,000¥ — SR3 p.303)'],
      tools: ['Microtronics shop'],
    },
  },

  iconChip: {
    label: 'Icon Chip',
    design: { modifier: 'None' },
    software: { ratingBasis: 'Icon rating', multiplier: 2 },
    cook: { required: true },
    install: {
      time: '1 hour',
      test: 'Computer B/R (Icon Rating)',
      parts: ['35¥ × Icon rating²'],
      tools: ['Microtronics kit'],
    },
  },

  ioSpeed: {
    label: 'I/O Speed',
    design: { modifier: 'None' },
    software: null,
    cook: null,
    install: {
      time: 'I/O Speed ÷ 100 hours (round up)',
      test: 'Computer B/R (I/O Speed ÷ 100, round up)',
      parts: ['35¥ × (I/O Speed ÷ 10, round up)'],
      tools: ['Microtronics kit'],
    },
  },

  rasOverride: {
    label: 'RAS Override',
    design: { modifier: 'None' },
    software: null,
    cook: null,
    install: {
      time: 'MPCP rating in hours',
      test: 'Computer B/R (4)',
      parts: ['RAS override unit (1,000¥)', '35¥ × MPCP rating (connections)'],
      tools: ['Microtronics kit'],
    },
  },

  realityFilter: {
    label: 'Reality Filter',
    design: { modifier: '+2' },
    software: { ratingBasis: 'MPCP rating', multiplier: 10 },
    cook: { required: true },
    install: {
      time: 'MPCP rating in days',
      test: 'Computer B/R (MPCP Rating) AND Computer (Cybernetics) (MPCP Rating)',
      parts: ['70¥ × MPCP rating'],
      tools: ['Microtronics shop', 'Biotech kit'],
    },
  },

  responseIncrease: {
    label: 'Response Increase',
    design: { modifier: '+1' },
    software: { ratingBasis: 'MPCP rating', multiplier: 'Response Increase × 2' },
    cook: { required: true },
    install: {
      time: '(MPCP rating + Response Increase rating) hours',
      test: 'Computer B/R (Response Increase × 2)',
      parts: ['135¥ × Response Increase rating'],
      tools: ['Microtronics shop'],
    },
  },

  matrixInterface: {
    label: 'Matrix Interface',
    design: null,
    software: null,
    cook: null,
    install: {
      time: '1 hour',
      test: 'Computer B/R (4)',
      parts: ['35¥', 'Fiberoptic cable (1¥/m)'],
      tools: ['Microtronics kit'],
    },
  },

  maserInterface: {
    label: 'Maser Interface',
    design: { modifier: '+0' },
    software: null,
    cook: null,
    install: {
      time: 'MPCP rating + 4 hours',
      test: 'Computer B/R (MPCP Rating) + Electronics B/R (4)',
      parts: ['3,000¥'],
      tools: ['Microtronics Kit'],
    },
  },

  ports: {
    label: 'Additional Ports (FUPs)',
    design: null,
    software: null,
    cook: null,
    install: {
      time: '1 hour',
      test: 'Computer B/R (4) + Electronics B/R (4) [wired] or Electronics B/R (Device Rating) [wireless]',
      parts: ['235¥ per port'],
      tools: ['Microtronics kit'],
    },
  },
};

// ── Full Design Cost Calculator ───────────────────────────────────────────────

export function calcDeckCost(design) {
  const {
    mpcp = 0,
    bod = 0, evasion = 0, masking = 0, sensor = 0,
    asistType = 'hot',
    activeMemoryMp = 0,
    storageMemoryMp = 0,
    hardening = 0,
    iccmFilter = false,
    iconRating = 1,
    ioSpeedMePS = 0,
    rasOverride = false,
    realityFilter = false,
    responseIncrease = 0,
    matrixInterface = true,
    maserInterface = false,
    additionalPorts = 0,
    casing = 0,
    hitcherJacks = 0,
    displayScreen = false,
    vrKit = false,
    keyboard = false,
  } = design;

  const c = ComponentCosts;
  const items = [];
  const add = (label, cost) => { if (cost > 0) items.push({ label, cost }); };

  add('MPCP', c.mpcp(mpcp));

  if (bod > 0)     add(`Bod (${bod})`,         c.persona(bod));
  if (evasion > 0) add(`Evasion (${evasion})`, c.persona(evasion));
  if (masking > 0) add(`Masking (${masking})`, c.persona(masking));
  if (sensor > 0)  add(`Sensor (${sensor})`,   c.persona(sensor));
  // Icon rating 1 is included free with MPCP
  if (iconRating > 1) add(`Icon Chip (${iconRating})`, c.iconChip(iconRating));

  if (asistType === 'hot')  add('ASIST Interface (Hot)',  c.asistHot(mpcp));
  if (asistType === 'cold') add('ASIST Interface (Cold)', c.asistCool(mpcp));

  if (activeMemoryMp > 0)    add(`Active Memory (${activeMemoryMp} Mp)`,  c.activeMemory(activeMemoryMp));
  if (storageMemoryMp > 0)   add(`Storage Memory (${storageMemoryMp} Mp)`, c.storageMemory(storageMemoryMp));
  if (hardening > 0)         add(`Hardening (${hardening})`,               c.hardening(hardening));
  if (iccmFilter)            add('ICCM Biofeedback Filter',                c.iccmFilter(mpcp));
  if (ioSpeedMePS > 0)       add(`I/O Speed (${ioSpeedMePS} MePS)`,       c.ioSpeedRetail(ioSpeedMePS));
  if (rasOverride)           add('RAS Override',                            c.rasOverride(mpcp));
  if (realityFilter)         add('Reality Filter',                          c.realityFilter(mpcp));
  if (responseIncrease > 0)  add(`Response Increase (${responseIncrease})`, c.responseIncrease(responseIncrease));
  if (matrixInterface)       add('Matrix Interface (5m cable)',              c.matrixInterface());
  if (maserInterface)        add('Maser Interface',                          c.maserInterface());
  if (additionalPorts > 0)   add(`Additional Ports (×${additionalPorts})`,  c.ports(additionalPorts));

  const casingEntry = Casings[casing];
  if (casingEntry?.cost > 0) add(`Casing (${casingEntry.name})`, casingEntry.cost);
  if (hitcherJacks > 0)  add(`Hitcher Jacks (×${hitcherJacks})`, 250 * hitcherJacks);
  if (displayScreen)     add('Display Screen / Vidscreen', 100);
  if (vrKit)             add('VR Kit', 250);
  if (keyboard)          add('Keyboard', 50);

  const total = items.reduce((s, i) => s + i.cost, 0);
  return { items, total };
}
