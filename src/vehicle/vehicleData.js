import sr2 from '../data/SR2/Rigger2.json';

// SR3 data — will be added when Rigger3 data is sourced
const sr3 = null;

export function getVehicleData(edition = 'SR2') {
  const data = edition === 'SR3' ? sr3 : sr2;
  return data ?? sr2; // fall back to SR2 if SR3 not yet available
}

export function hasEditionData(edition) {
  if (edition === 'SR3') return sr3 !== null;
  return true;
}

// ── convenience exports (default to SR2) ─────────────────────────────────────

export const CHASSIS = sr2.chassis;
export const ENGINES_BY_CHASSIS = sr2.engines.reduce((acc, eng) => {
  if (!acc[eng.chassisName]) acc[eng.chassisName] = [];
  acc[eng.chassisName].push(eng);
  return acc;
}, {});
export const MODS = sr2.mods;

/** Vehicle type categories for tab filtering */
export const VEHICLE_CATEGORIES = [
  { label: 'Bikes',         filter: c => c.typeMask & 16 },
  { label: 'Cars & Vans',   filter: c => (c.typeMask & 1) && !(c.typeMask & 16) && !(c.typeMask & 32) },
  { label: 'Transports',    filter: c => c.typeMask & 32 },
  { label: 'Watercraft',    filter: c => c.typeMask & 2 },
  { label: 'Hovercraft',    filter: c => c.typeMask & 4 },
  { label: 'Aircraft',      filter: c => (c.typeMask & 8) && !(c.typeMask & 64) && !(c.typeMask & 128) },
  { label: 'Helicopters',   filter: c => c.typeMask & 64 },
  { label: 'Vector Thrust', filter: c => c.typeMask & 128 },
  { label: 'Drones',        filter: c => c.pilot === 1 || c.pilot === 2 },
];

/** Mod categories in display order */
export const MOD_CATEGORIES = [
  'Design Options',
  'Engine Customization',
  'Control Systems',
  'Protective Systems',
  'Signature',
  'Weapon Mounts',
  'Electronics',
  'Accessories',
];
