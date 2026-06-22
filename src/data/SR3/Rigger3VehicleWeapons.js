// Rigger 3 Vehicle Weapons — pp.154-155
// Weapons designed for vehicle mounts. All are Illegal-K unless noted.

export const VehicleWeapons = [
  { name: 'ANDREWS',          ammo: 50,     mode: 'SA/BF', damage: '9LN',              weightKg: 1200, availability: '—',          cost: '600,000¥', streetIndex: null, legality: 'I-K' },
  { name: 'Firelance Laser',  ammo: 40,     mode: 'SS',    damage: '15S',              weightKg:   48, availability: '—',          cost: '300,000¥', streetIndex: null, legality: 'I-K' },
  { name: 'Harpoon Gun',      ammo: 1,      mode: 'SS',    damage: 'As harpoon',       weightKg:   20, availability: '3/24 hrs',   cost:   '6,500¥', streetIndex: 2,    legality: '2P-D' },
  { name: 'Light Naval Gun',  ammo: 500,    mode: 'SA',    damage: '8LN',              weightKg:  250, availability: '—',          cost: '225,000¥', streetIndex: null, legality: 'I-K' },
  { name: 'Medium Naval Gun', ammo: 500,    mode: 'SS',    damage: '11MN',             weightKg:  600, availability: '—',          cost: '475,000¥', streetIndex: null, legality: 'I-K' },
  { name: 'Piranha Launcher', ammo: 8,      mode: 'SS',    damage: 'As rocket/missile',weightKg:  120, availability: '16/21 days', cost:  '15,000¥', streetIndex: 3,    legality: 'I-K' },
  { name: 'Relámpago',        ammo: 'Belt', mode: 'SS',    damage: '8MN',              weightKg:  770, availability: '—',          cost: '620,000¥', streetIndex: null, legality: 'I-K' },
  { name: 'Vaporizer',        ammo: 'Belt', mode: 'SS',    damage: '15MN',             weightKg: 1540, availability: '—',          cost:'1,000,000¥', streetIndex: null, legality: 'I-K' },
  { name: 'Vengeance MMG',    ammo: 'Belt', mode: 'FA',    damage: '9S',               weightKg:   30, availability: '18/28 days', cost:  '50,000¥', streetIndex: 3.5,  legality: 'I-K' },
  { name: 'Vanquisher HMG',   ammo: 'Belt', mode: 'FA',    damage: '10S',              weightKg:   45, availability: '18/28 days', cost:  '75,000¥', streetIndex: 3.5,  legality: 'I-K' },
  { name: 'Vigilant Cannon',  ammo: 'Belt', mode: 'SS/FA', damage: '18D',              weightKg:   90, availability: '20/45 days', cost:  '90,000¥', streetIndex: 5,    legality: 'I-K' },
  { name: 'Victory Cannon',   ammo: 'Belt', mode: 'SS/FA', damage: '20D',              weightKg:  105, availability: '20/45 days', cost: '125,000¥', streetIndex: 5,    legality: 'I-K' },
  { name: 'Xicohtencatl',     ammo: 'Belt', mode: 'SS',    damage: '6LN',              weightKg:  135, availability: '—',          cost: '135,000¥', streetIndex: null, legality: 'I-K' },
];

// ── PIRANHA ROCKETS ───────────────────────────────────────────────────────────
export const PiranhaRockets = [
  { type: 'Armor-Piercing', intelligence: null, damage: '16D', blast: '-8/m',    scatter: '2D6', weightKg: 4,   availability: '12/21 days', cost: '3,000¥', streetIndex: 2.5, legality: 'I-K' },
  { type: 'High Explosive', intelligence: null, damage: '12D', blast: '-1/m',    scatter: '2D6', weightKg: 2.5, availability: '12/21 days', cost: '2,500¥', streetIndex: 2.5, legality: 'I-K' },
  { type: 'Ink-Dispensing', intelligence: null, damage: 'Special', blast: '25m', scatter: '2D6', weightKg: 2.5, availability: '12/21 days', cost: '4,000¥', streetIndex: 2.5, legality: 'I-K' },
];

// ── PIRANHA MISSILES ──────────────────────────────────────────────────────────
export const PiranhaMissiles = [
  { type: 'Armor-Piercing', intelligence: 4, damage: '16D', blast: '-8/m',    scatter: '2D6', weightKg: 4.25, availability: '16/21 days', cost: '7,500¥', streetIndex: 3.5, legality: 'I-K' },
  { type: 'High Explosive', intelligence: 4, damage: '12D', blast: '-1/m',    scatter: '2D6', weightKg: 2.75, availability: '16/21 days', cost: '5,000¥', streetIndex: 3.5, legality: 'I-K' },
  { type: 'Ink-Dispensing', intelligence: 4, damage: 'Special', blast: '25m', scatter: '2D6', weightKg: 2.75, availability: '16/21 days', cost: '4,000¥', streetIndex: 3.5, legality: 'I-K' },
];

// ── AMMUNITION ────────────────────────────────────────────────────────────────
// Cost and weight are per 10 rounds unless otherwise noted.
export const VehicleWeaponAmmo = [
  { weapon: 'Harpoon Gun',    type: 'Normal Harpoon',         damage: '12D',       weightKg: 20,  availability: '1/6 hrs',    cost:     '250¥', streetIndex: 1,    legality: 'As weapon' },
  { weapon: 'Harpoon Gun',    type: 'Explosive Head Harpoon', damage: '16D',       weightKg: 20,  availability: '3/12 hrs',   cost:   '2,000¥', streetIndex: 2,    legality: 'As weapon' },
  { weapon: 'Light Naval Gun',  type: 'Light Naval Shells',   damage: 'As weapon', weightKg: 250, availability: '—',          cost:     '800¥', streetIndex: null, legality: 'As weapon' },
  { weapon: 'Medium Naval Gun', type: 'Medium Naval Shells',  damage: 'As weapon', weightKg: 750, availability: '—',          cost:   '1,500¥', streetIndex: null, legality: 'As weapon' },
  { weapon: 'Xicohtencatl',   type: 'Light Railgun Ammo',     damage: 'As weapon', weightKg: 20,  availability: '10/7 days',  cost:     '150¥', streetIndex: null, legality: 'As weapon' },
  { weapon: 'Relámpago',      type: 'Med. Railgun Ammo',      damage: 'As weapon', weightKg: 100, availability: '12/14 days', cost:     '800¥', streetIndex: null, legality: 'As weapon' },
  { weapon: 'Vaporizer',      type: 'Heavy Railgun Ammo',     damage: 'As weapon', weightKg: 300, availability: '14/21 days', cost:   '2,500¥', streetIndex: null, legality: 'As weapon' },
];

// ── COMBINED EXPORT ───────────────────────────────────────────────────────────
const Rigger3VehicleWeapons = {
  vehicleWeapons: VehicleWeapons,
  piranhaRockets: PiranhaRockets,
  piranhaMissiles: PiranhaMissiles,
  vehicleWeaponAmmo: VehicleWeaponAmmo,
};

export default Rigger3VehicleWeapons;
