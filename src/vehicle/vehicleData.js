import { parseDat } from './parseDat';
import rawDat from '../data/SR2/Rigger2.dat?raw';

const { chassis, engines, mods } = parseDat(rawDat);

/** All chassis types */
export const CHASSIS = chassis;

/** All engine records — group by chassis name for easy lookup */
export const ENGINES_BY_CHASSIS = engines.reduce((acc, eng) => {
  const key = eng.chassisName;
  if (!acc[key]) acc[key] = [];
  acc[key].push(eng);
  return acc;
}, {});

/** All modification records */
export const MODS = mods;

/** Unique vehicle type categories for filtering */
export const VEHICLE_CATEGORIES = [
  { label: 'Bikes',       filter: c => c.typeMask & 16 },
  { label: 'Cars & Vans', filter: c => (c.typeMask & 1) && !(c.typeMask & 16) && !(c.typeMask & 32) },
  { label: 'Transports',  filter: c => c.typeMask & 32 },
  { label: 'Watercraft',  filter: c => c.typeMask & 2 },
  { label: 'Hovercraft',  filter: c => c.typeMask & 4 },
  { label: 'Aircraft',    filter: c => (c.typeMask & 8) && !(c.typeMask & 64) && !(c.typeMask & 128) },
  { label: 'Helicopters', filter: c => c.typeMask & 64 },
  { label: 'Vector Thrust', filter: c => c.typeMask & 128 },
  { label: 'Drones',      filter: c => c.pilot === 1 || c.pilot === 2 },
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
