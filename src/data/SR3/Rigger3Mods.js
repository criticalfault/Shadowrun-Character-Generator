// Rigger 3 Vehicle Design Options — extracted from pp.115-119
// dpCost, cfConsumed, loadReduction may be strings (formulas) or numbers.
// null means not applicable / free / GM discretion.

// ── FUEL TANK CAPACITY TABLE (p.115) ─────────────────────────────────────────

export const FuelTankCapacity = {
  // Per increment of capacity added
  electricBatteryFuelCell: { capacityIncrease: '5 PF',   dpCost: 2,  cfConsumed: null,         loadReduction: '1 kg per 5 PF' },
  electricBatteryBody0:    { capacityIncrease: '1 PF',   dpCost: 20, cfConsumed: null,          loadReduction: '0.2 kg per PF', note: 'Body 0 vehicles only' },
  methane:                 { capacityIncrease: '5 bars', dpCost: 2,  cfConsumed: '0.5 CF',      loadReduction: null },
  gasDiesel:               { capacityIncrease: '1 liter',dpCost: 2,  cfConsumed: '1 CF/50 liters', loadReduction: null },
  jet:                     { capacityIncrease: '10 liters', dpCost: 1, cfConsumed: '1 CF/50 liters', loadReduction: null },
};

// ── FUNCTIONAL IMPROVEMENTS (pp.115-116) ─────────────────────────────────────

export const FunctionalImprovements = [

  {
    name: 'Acceleration Increase',
    category: 'Functional Improvements',
    dpCost: '25 per +1 Acceleration',
    dpCostPerUnit: 25,
    unit: '+1 Acceleration',
    cfConsumed: null,
    loadReduction: null,
    maxImprovement: 'As listed in power plant description',
  },

  {
    name: 'Depth Enhancement',
    category: 'Functional Improvements',
    dpCost: '2 per 10 meters of additional Depth',
    dpCostPerUnit: 2,
    unit: '10 meters depth',
    cfConsumed: null,
    loadReduction: 'Hull Factor × (Body or Hull rating) × 2 kg per 10 meters',
    maxImprovement: 'As listed in chassis description',
    note: 'Submarines only. Non-sub vehicles modified for underwater use have starting Depth = (Body × 10) + 100 meters. Drones triple that. Non-sub max Depth = starting Depth × 2.',
  },

  {
    name: 'Extra Entry Points',
    category: 'Functional Improvements',
    dpCost: '0',
    dpCostPerUnit: 0,
    unit: null,
    cfConsumed: null,
    loadReduction: null,
    maxImprovement: 'Body ÷ 2 (round up); hull vehicles: Hull rating × 2',
    note: 'Adds, subtracts, or changes entry point types. GM discretion on unusual arrangements.',
  },

  {
    name: 'Load Increase',
    category: 'Functional Improvements',
    dpCost: 'Body 0: 1 per +1 kg; Body 1+: 1 per +10 kg',
    dpCostBody0: 1,        // per kg
    dpCostBody1Plus: 1,    // per 10 kg
    cfConsumed: null,
    loadReduction: null,
    maxImprovement: 'As listed in power plant description',
    note: 'Subtract total Load Reductions from all design options to get final Load rating.',
  },

  {
    name: 'Signature Improvement',
    category: 'Functional Improvements',
    dpCost: '(Levels)⁴ × 200',
    cfConsumed: null,
    loadReduction: null,
    maxImprovement: "Gamemaster's discretion",
    note: 'Achieved by using alternative non-metallic materials and re-designing cross-section and exhaust emissions.',
  },

  {
    name: 'Speed Increase',
    category: 'Functional Improvements',
    dpCost: '2 per +1 Speed',
    dpCostPerUnit: 2,
    unit: '+1 Speed',
    cfConsumed: null,
    loadReduction: null,
    maxImprovement: 'As listed in power plant description',
    note: 'Stall speeds of fixed-wing aircraft cannot be changed with this option.',
  },

];

// ── DESIGN ENHANCEMENTS (pp.116-118) ─────────────────────────────────────────

export const DesignEnhancements = [

  {
    name: 'Airlock',
    category: 'Design Enhancements',
    dpCost: '500',
    dpCostFixed: 500,
    cfConsumed: '40 CF per lock + 40 CF per person capacity',
    loadReduction: '1,000 kg',
    maxImprovement: null,
    note: 'Available to submarines and any vehicle with the EnviroSeal™ system.',
  },

  {
    name: 'Auxiliary Engine',
    category: 'Design Enhancements',
    dpCost: 'Power plant cost of secondary power plant type',
    cfConsumed: '(Body + 1) × 2 or (Hull + Hull Factor) × 2',
    loadReduction: '10% of maximum Load value',
    maxImprovement: null,
    note: 'Speed and Accel are half normal listed values. Only one auxiliary engine active at a time. Body 0 vehicles cannot carry auxiliary engines.',
  },

  {
    name: 'Ballast Tanks',
    category: 'Design Enhancements',
    dpCost: '(Body)² × 10',
    cfConsumed: '(Body)² × 2',
    loadReduction: '(Body)² × 25 kg',
    maxImprovement: null,
    note: 'Allows non-sub chassis to change depth underwater. Not available for boats or ships. Requires EnviroSeal engine seal modification.',
  },

  {
    name: 'Ducted Waterjet Drive',
    category: 'Design Enhancements',
    dpCost: '5,000 × Hull Factor',
    cfConsumed: '4 × Hull Factor',
    loadReduction: '3 × Hull Factor kg',
    maxImprovement: null,
    note: 'Submarines only. Increases Sonar Signature by +2 when engaged. Speed drops to 20 meters per turn when engaged. Reduces cavitation at speeds above Speed rating.',
  },

  {
    name: 'Electromagnetic Ducted Waterjet (EMD) Drive',
    category: 'Design Enhancements',
    dpCost: '(Body)² × 100',
    cfConsumed: '(Body - 1) CF',
    loadReduction: 'Half the Starting Load value for power plant',
    maxImprovement: null,
    note: 'Submarines with nuclear plants only. Sonar Signature +2 when engaged; Speed does not drop. Reduces MAD signature by 3. Increases vulnerability to MADs.',
  },

  {
    name: 'Fin Drive',
    category: 'Design Enhancements',
    dpCost: '50',
    dpCostFixed: 50,
    cfConsumed: '8',
    loadReduction: null,
    maxImprovement: null,
    note: 'Boats and submarines with Body 4 or less only. Increases Speed and Acceleration starting and maximum values by 25%. Vehicle cannot also take Smart Materials option.',
  },

  {
    name: 'Hybrid Engine',
    category: 'Design Enhancements',
    dpCost: '25% of power plant cost',
    cfConsumed: '6',
    loadReduction: 'Half the starting Load value',
    maxImprovement: null,
    note: 'Ground vehicles and small watercraft only. Available for methane, gasoline, or diesel power plants. Sig +1; Economy and Acceleration (start and max) doubled.',
  },

  {
    name: 'Hydrofoil Capability',
    category: 'Design Enhancements',
    dpCost: '50',
    dpCostFixed: 50,
    cfConsumed: '8',
    loadReduction: null,
    maxImprovement: null,
    note: 'All boats except skiffs. When hydrofoil engaged: Speed and Accel +25% (rounded down), Handling +2, Sig +1.',
  },

  {
    name: 'Improved Takeoff/Landing Profile',
    category: 'Design Enhancements',
    dpCost: 'STOL: 250 | VSTOL: 400',
    dpCostSTOL: 250,
    dpCostVSTOL: 400,
    cfConsumed: null,
    loadReduction: null,
    maxImprovement: null,
    note: 'Fixed-wing aircraft only. Does not consume CF or reduce Load. See Runway Distances Table p.68.',
  },

  {
    name: 'Removed Manual Controls',
    category: 'Design Enhancements',
    dpCost: '50',
    dpCostFixed: 50,
    cfConsumed: null,
    loadReduction: null,
    maxImprovement: null,
    note: 'Vehicle lacks pedals, steering wheels, shifting levers, joysticks etc. Requires datajack port (p.128) or rigger adaptation (p.130) to pilot manually. Load +10 kg; CF +2.',
  },

  {
    name: 'Setup/Breakdown Time',
    category: 'Design Enhancements',
    dpCost: 'Body × 5',
    dpCostPerMinuteReduction: 'Body × 5',
    cfConsumed: 'See text (reduces max CF by half)',
    loadReduction: null,
    maxImprovement: 'Half the base Setup/Breakdown Time (rounded down)',
    note: 'Drones with Body 3 or less and other vehicles with Body 2 or less only. Base time = (Body × 2) + 1 minutes. Each additional (5 × Body) DP reduces time by 1 minute.',
  },

  {
    name: 'Smart Materials',
    category: 'Design Enhancements',
    dpCost: '100',
    dpCostFixed: 100,
    cfConsumed: null,
    loadReduction: null,
    maxImprovement: null,
    note: 'Manufacturer design option only. Reduces Handling by 1 and adds +1 modifier on Stress Tests. Increases Speed, Accel, and Load by 15%. Helicopters: Sig +1. Street Index +1.',
  },

  {
    name: 'Special Machinery',
    category: 'Design Enhancements',
    dpCost: '0',
    dpCostFixed: 0,
    cfConsumed: "GM discretion (recommended: Body × 2 CF)",
    loadReduction: "GM discretion (recommended: 25 kg per CF consumed)",
    maxImprovement: "GM discretion; CF cannot exceed Body × CF multiplier",
    note: 'Catch-all for unique, unusual, or highly specialized equipment not found on other vehicles.',
  },

  {
    name: 'Special Storage Area',
    category: 'Design Enhancements',
    dpCost: '1–9 CF: 3 pts | 10–99 CF: 6 pts | 100–999 CF: 9 pts | 1,000+ CF: 12 pts',
    dpCostTiers: [
      { min: 1,    max: 9,    dp: 3 },
      { min: 10,   max: 99,   dp: 6 },
      { min: 100,  max: 999,  dp: 9 },
      { min: 1000, max: null, dp: 12 },
    ],
    cfConsumed: '10% of designated CF (rounded up)',
    loadReduction: '1 kg per 10 CF of special storage',
    maxImprovement: 'CF available in vehicle',
    note: 'Examples: refrigeration units, bulk liquid tanks, high/low-pressure chambers. Once placed, location cannot be changed.',
  },

  {
    name: 'Structural Agility',
    category: 'Design Enhancements',
    dpCost: 'Body × 150 per level (plus drive-by-wire modification)',
    cfConsumed: null,
    loadReduction: null,
    maxImprovement: 'Number of levels purchased in drive-by-wire modification',
    note: 'Requires drive-by-wire system added during design. Gives driver/rigger +1 Reaction per level. Cannot be added during customization.',
  },

  {
    name: 'Tailhook System',
    category: 'Design Enhancements',
    dpCost: '10% of chassis cost',
    cfConsumed: '1 CF per 2 Body',
    loadReduction: 'Body × 125 kg',
    maxImprovement: null,
    note: 'Aircraft only. Allows use of catapults and arrestor hooks for carrier operations.',
  },

];

// ── PEOPLE SPACE REQUIREMENTS TABLE (p.120) ──────────────────────────────────

export const PeopleSpaceRequirements = [
  { type: 'Computer/Electronics',    cf: '108 CF per technician',               load: '200 kg per person' },
  { type: 'Weapons',                 cf: '512 CF per weaponsmith',              load: '250 kg per person' },
  { type: 'Enchanting Magic',        cf: '500 CF + 64 CF per magician',         load: '250 kg per person' },
  { type: 'Medical',                 cf: '162 CF per patient',                  load: '200 kg per patient + 150 kg per medical attendant' },
  { type: 'Miscellaneous',           cf: '800 CF minimum',                      load: '200 kg per person + weight of object being worked' },
  { type: 'Ritual Conjuring/Sorcery',cf: '500 CF + 64 CF per magician',         load: '100 kg per person' },
  { type: 'Vehicles — Body 0',       cf: '162 CF per mechanic',                 load: '200 kg per person' },
  { type: 'Vehicles — Ground/Water', cf: '(45 × Body³) per vehicle',            load: 'See Body Table (maximum value)' },
  { type: 'Vehicles — Fixed Wing',   cf: '(125 × Body³) per vehicle',           load: 'See Body Table (maximum value)' },
  { type: 'Vehicles — Other Aircraft',cf: '(64 × Body³) per vehicle',           load: 'See Body Table (maximum value)' },
];

// ── FACILITIES (pp.119+) ──────────────────────────────────────────────────────

export const Facilities = [

  {
    name: 'Flight Deck',
    category: 'Facilities',
    dpCost: '(Deck Length in meters) × (Body or Hull Factor)',
    dpCostCatapultArrestor: '+ (Body × 2) or (Hull Factor × 2)',
    dpCostAngledDeck: '+10% of deck cost',
    cfConsumed: '0 CF base',
    cfConsumedCatapultArrestor: '(Body × 2) or (Hull Factor × 2) CF',
    loadReduction: '0 kg base',
    loadReductionCatapultArrestor: '(Body × 10) kg or (Hull Factor × 10) kg',
    loadReductionAngledDeck: '(Deck Length × 20) kg or 20 × (Deck Length + Hull Factor) kg',
    maxImprovement: null,
    note: 'Rated by deck length. Aircraft must use takeoff/landing profile matching deck length. Catapult/Arrestor Wire: pilot gets −2 on Vehicle Tests when taking off or landing. Angled Deck: −1 modifier instead.',
  },

  {
    name: 'Living Amenities — Basic',
    category: 'Facilities',
    dpCost: '40 per person',
    dpCostPerPerson: 40,
    cfConsumed: '12 CF per person (People Space: 150 CF + 6 CF per person)',
    loadReduction: '100 kg per person (People Space: 150 kg per person)',
    lifestyle: 'Low',
    maxImprovement: null,
    note: 'Folding bunks, portable toilets, mini-refrigerators. Supplies cost 10% of lifestyle monthly cost.',
  },

  {
    name: 'Living Amenities — Improved',
    category: 'Facilities',
    dpCost: '50 base + 40 per person',
    dpCostBase: 50,
    dpCostPerPerson: 40,
    cfConsumed: '12 CF per person (People Space: 150 CF + 6 CF per person)',
    loadReduction: '100 kg per person (People Space: 150 kg per person)',
    lifestyle: 'Middle',
    maxImprovement: null,
    note: 'Middle lifestyle equivalent.',
  },

  {
    name: 'Living Amenities — High',
    category: 'Facilities',
    dpCost: '100 base + 40 per person',
    dpCostBase: 100,
    dpCostPerPerson: 40,
    cfConsumed: '12 CF per person (People Space: 150 CF + 6 CF per person)',
    loadReduction: '100 kg per person (People Space: 150 kg per person)',
    lifestyle: 'High or Luxury',
    maxImprovement: null,
    note: 'High or Luxury lifestyle equivalent.',
  },

  {
    name: 'Living Amenities — Partial',
    category: 'Facilities',
    dpCost: 'Half the cost of comparable lifestyle for one person',
    cfConsumed: '12 CF per person (no People Space requirement)',
    loadReduction: '100 kg per person',
    lifestyle: 'Partial',
    maxImprovement: null,
    note: 'Small utilities that do not call for a full lifestyle. One additional set required per 50 people.',
  },

  {
    name: 'Work Shop',
    category: 'Facilities',
    dpCost: 'Nuyen cost of shop (in DP)',
    cfConsumed: '52 CF',
    loadReduction: '250 kg',
    maxImprovement: null,
    note: 'Provides a work space for shop-sized tools. See Tools, p.288 SR3.',
  },

  {
    name: 'Facility',
    category: 'Facilities',
    dpCost: '250 + nuyen cost of facility (in DP)',
    dpCostBase: 250,
    cfConsumed: '500 CF (vehicle facility) / 200 CF (computer or electronics facility) / 300 CF (all others)',
    loadReduction: '1,000 kg',
    maxImprovement: null,
    note: 'Full facility-grade workspace. People Space requirements depend on type of work (see People Space Requirements table).',
  },

];

// ── ROBOT OPTIONS (pp.120-121) ────────────────────────────────────────────────

export const RobotOptions = [

  {
    name: 'Fuzzy Logic Augmentation',
    category: 'Robot Options',
    dpCost: 'Adaptation Pool × 100 per level',
    cfConsumed: null,
    loadReduction: null,
    maxImprovement: "Robot's Pilot rating",
    note: 'Robots only — must also purchase Robotic-Pilot Advanced Programming. Each level adds two dice to Pilot rating when making Comprehension Tests (p.157 SR3).',
  },

  {
    name: 'Improved Neural Network Algorithms',
    category: 'Robot Options',
    dpCost: 'Pilot rating² × 25 per level',
    cfConsumed: null,
    loadReduction: null,
    maxImprovement: "Robot's Pilot rating",
    note: 'Robots only. Each level adds one die to Adaptation Pool.',
  },

  {
    name: 'Multi-Object Manipulation',
    category: 'Robot Options',
    dpCost: 'Adaptation Pool × 100 per level',
    cfConsumed: null,
    loadReduction: null,
    maxImprovement: "Robot's Adaptation Pool",
    note: 'Robots only — requires BattleTac IVIS Receiver Module (p.142). Each level adds one die to any IVIS Pool created. At least one die from the IVIS Pool must result from the IVIS Test.',
  },

  {
    name: 'Robotic-Pilot Advanced Programming',
    category: 'Robot Options',
    dpCost: 'Pilot Rating³ × 50',
    cfConsumed: null,
    loadReduction: null,
    maxImprovement: 'Pilot 5',
    note: 'Robots only. Not compatible with drone-pilot programming — a drone can have one or the other but not both. Provides Adaptation Pool equal to Pilot rating.',
  },

  {
    name: 'Robotic Reflexes',
    category: 'Robot Options',
    dpCost: '100 per level',
    dpCostPerLevel: 100,
    cfConsumed: null,
    loadReduction: null,
    maxImprovement: '3',
    note: 'Robots only. Each level provides an extra Initiative die when the robot is acting under its own control (not being rigged).',
  },

];

// ── ENGINE MODIFICATIONS (pp.125-126) ────────────────────────────────────────
// Each entry has design: {} and customization: {} specs where both apply.

export const EngineModifications = [

  {
    name: 'Engine Customization',
    category: 'Engine Modifications',
    design: {
      dpCost: '25% of power plant DP cost (level 1); 50% per level (levels 2+)',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: 'Speed, Accel, or Load × 1.75 (rounded up)',
    },
    customization: {
      partsCost: '5% of vehicle list cost per level',
      partsAvailability: '8/14 days (2)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '40 hrs per level',
      skillTest: 'Appropriate Vehicle B/R',
      targetNumber: 'Ground/watercraft: levels+2 | Drones/hovercraft: levels+3 | Aircraft: levels+4 | Electric aircraft: levels+5',
      maxImprovement: 'Speed, Accel, or Load × 1.5',
    },
    note: 'Each level raises Speed +30, Accel +2, or Load +(Body × 50) kg — each stat raised separately. Bypasses performance safeguards; risk of engine failure (Build/Repair Test, target 6, failure adds permanent Stress Points).',
  },

  {
    name: 'GridLink™ Power',
    category: 'Engine Modifications',
    design: {
      dpCost: '2',
      cfConsumed: '1',
      loadReduction: null,
      maxImprovement: null,
    },
    customization: {
      partsCost: '600¥',
      partsAvailability: '3/96 hrs (1)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '16 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      targetNumber: null,
      maxImprovement: null,
    },
    note: 'Ground vehicles only. Not motorcycles. Draws power from magnetic induction coils in city roadways. Provides Body × 25 PF per hour under clear skies when SunCell panels are on trailers (tractors).',
  },

  {
    name: 'Nitrous Oxide Injectors',
    category: 'Engine Modifications',
    design: {
      dpCost: '55 per level',
      cfConsumed: '1.5',
      loadReduction: '15 kg',
      maxImprovement: '6',
    },
    customization: {
      partsCost: '3,500¥/level (levels 1–3); 7,000¥/level (levels 4–5)',
      partsAvailability: '4/48 hrs (1)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '(Level + 47) hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      targetNumber: null,
      maxImprovement: '5',
      cfConsumed: '2',
      loadReduction: '15 kg',
    },
    note: 'Diesel or gasoline power plants only. Holds up to 20 charges in pressurized cylinder. In combat, driver may use as bonus dice equal to level on Accelerating/Braking tests. Can also multiply Speed × 2.5 temporarily (vehicle decelerates by Accel each turn after until standard Speed).',
  },

  {
    name: 'SunCell Power',
    category: 'Engine Modifications',
    design: {
      dpCost: '5',
      cfConsumed: '1',
      loadReduction: null,
      maxImprovement: null,
    },
    customization: {
      partsCost: '500¥',
      partsAvailability: '3/72 hrs (1)',
      equipmentRequired: 'Vehicle shop',
      baseTime: '8 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      targetNumber: null,
      maxImprovement: null,
    },
    note: 'Ground vehicles only (not motorcycles). Electric-engine compatible. Externally mounted solar cells provide Body × 25 PF per hour under clear skies; halved in cloudy weather; zero at night or heavily overcast.',
  },

  {
    name: 'Turbocharging / Superconductive Drive',
    category: 'Engine Modifications',
    design: {
      dpCost: '75% of power plant DP cost per level',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: 'Original max Speed × 1.25 (always improvable by 1)',
    },
    customization: {
      partsCost: '10% of vehicle list cost per level',
      partsAvailability: '6/12 days (1.5)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '8 hrs per level',
      skillTest: 'Appropriate Vehicle B/R',
      targetNumber: 'Ground/watercraft: levels+2 | Drones/hovercraft: levels+3 | Electric aircraft: levels+4',
      maxImprovement: 'Speed × 1.5',
    },
    note: 'Methane, gas, diesel, or electric engines only. Aircraft (except electric) cannot be turbocharged. Each level: Speed +15, Accel +1, Sig −1, Economy −5%.',
  },

];

// ── CONTROL-SYSTEM MODIFICATIONS (pp.127-128) ─────────────────────────────────

export const ControlSystemModifications = [

  {
    name: 'Adjusted Controls',
    category: 'Control-System Modifications',
    design: {
      dpCost: 'Dwarf: 25 | Troll: 35 | Other: 30',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    customization: {
      partsCost: 'Dwarf: 2,500¥ | Troll: 3,500¥ | Other: 3,000¥',
      partsAvailability: '3/72 hrs (1)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '40 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      targetNumber: null,
      maxImprovement: null,
    },
    note: 'Adjusts controls for dwarfs, trolls, or metahumans with disabilities. Standard controls give dwarfs/trolls +3 target modifiers on all driving tests. Adjusted controls are incompatible between species.',
  },

  {
    name: 'Advanced Drone Pilot',
    category: 'Control-System Modifications',
    design: {
      dpCostByRating: { 1: 0, 2: 50, 3: 250, 4: 1250, 5: 5000 },
      dpCost: 'Rating 1: 0 | Rating 2: 50 | Rating 3: 250 | Rating 4: 1,250 | Rating 5: 5,000',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: 'Pilot 5',
    },
    customization: {
      partsCostByRating: { 1: 0, 2: 5000, 3: 25000, 4: 500000, 5: 2500000 },
      partsCost: 'Rating 1: 0¥ | Rating 2: 5,000¥ | Rating 3: 25,000¥ | Rating 4: 500,000¥ | Rating 5: 2,500,000¥',
      partsAvailability: 'Rating 2–3: 6/14 days (2) | Rating 4: 10/35 days (4) | Rating 5: 14/70 days (—)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '64 hrs',
      skillTest: 'Computer B/R',
      targetNumber: '8 – Handling Rating (on-road Handling for ground vehicles)',
      maxImprovement: 'Pilot 5',
    },
    note: 'Drones only (semi-autonomous robots, see p.44). Also grants Adaptation Pool equal to Pilot rating. Incompatible with drone-pilot programming.',
  },

  {
    name: 'Autonavigation System',
    category: 'Control-System Modifications',
    design: {
      dpCostByRating: { 1: 5, 2: 10, 3: 50, 4: 150 },
      dpCost: 'Rating 1: 5 | Rating 2: 10 | Rating 3: 50 | Rating 4: 150',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: 'Rating 4',
    },
    customization: {
      partsCostByRating: { 1: 500, 2: 1000, 3: 5000, 4: 15000 },
      partsCost: 'Rating 1: 500¥ | Rating 2: 1,000¥ | Rating 3: 5,000¥ | Rating 4: 15,000¥',
      partsAvailability: 'Rating 1: 2/96 hrs (1) | Rating 2: 3/6 days (1) | Rating 3: 4/8 days (1.5) | Rating 4: 6/14 days (2)',
      equipmentRequired: 'Vehicle facility',
      baseTimeByRating: { 1: '16 hrs', 2: '32 hrs', 3: '40 hrs', 4: '48 hrs' },
      baseTime: 'Rating 1: 16 hrs | Rating 2: 32 hrs | Rating 3: 40 hrs | Rating 4: 48 hrs',
      skillTest: 'Appropriate Vehicle B/R',
      targetNumber: '8 – Handling Rating (on-road Handling)',
      maxImprovement: 'Rating 9',
      cfConsumed: '2',
      loadReduction: '30 kg',
    },
    note: 'Also provides extra dice on standard Driving Tests equal to rating. Rating 2+ can control vehicle without driver input (self-driving). Rating 1 cannot control vehicle autonomously.',
  },

  {
    name: 'Contingency Maneuver Controls (CMCs)',
    category: 'Control-System Modifications',
    design: {
      dpCost: '35/rating (Ratings 1–3) | 75/rating (Ratings 4–6) | 150/rating (Ratings 7–9)',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: '9',
    },
    customization: {
      partsCost: '2,500¥/rating (Ratings 1–3) | 5,000¥/rating (Ratings 4–6) | 10,000¥/rating (Ratings 7–9)',
      partsAvailability: '6/14 days (2)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '80 hrs',
      skillTest: 'Appropriate Vehicle B/R',
      targetNumber: '10 – Handling Rating (on-road Handling)',
      maxImprovement: '9',
      cfConsumed: '2',
      loadReduction: '25 kg',
    },
    note: 'Redundant wiring, secondary circuit breakers, and backup systems. CMC rating ignores damage modifiers from that many boxes of vehicle damage (Light/Moderate damage). Above that level all damage/initiative modifiers apply. Destroyed at Deadly damage. Does not compensate for Physical/Mental damage to riggers.',
  },

  {
    name: 'Datajack Port',
    category: 'Control-System Modifications',
    design: {
      dpCost: '25',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    customization: {
      partsCost: '2,500¥ (5,000¥ for motorcycles)',
      partsAvailability: '3/72 hrs (1.5)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '56 hrs (112 hrs for motorcycles)',
      skillTest: 'Appropriate Vehicle B/R (4)',
      targetNumber: null,
      maxImprovement: null,
    },
    note: 'Allows any character with a datajack to plug in and control the vehicle via virtual dashboard. Increases Reaction by 1 when controlling without rigger adaptation or vehicle-control rig cyberware. Unnecessary if vehicle already has rigger adaptation.',
  },

];

// ── CONTROL-SYSTEM MODIFICATIONS CONT. (pp.129-130) ──────────────────────────

export const ControlSystemModifications2 = [

  {
    name: 'Drive-by-Wire Systems',
    category: 'Control-System Modifications',
    design: {
      dpCost: "Chassis' Design Point cost × 1.75 per level",
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: '−3 to Handling (levels 1, 2, or 3)',
    },
    customization: {
      partsCost: "Vehicle's original cost × 1.25 per level",
      partsAvailability: '8/16 days (2.5)',
      equipmentRequired: 'Vehicle facility',
      baseTime: 'Body × 160 hrs',
      skillTest: 'Appropriate Vehicle B/R (10 – On-Road Handling), Computer (4), Electronics (4)',
      targetNumber: null,
      maxImprovement: '−3 to Handling',
    },
    note: 'Available at levels 1, 2, and 3. Each level reduces Handling by 1 and provides a one-time increase to Accel, Speed, and Load (multiply desired rating by 10% per level — not cumulative). Multiplier can be split across ratings. Required for Structural Agility.',
  },

  {
    name: 'Improved Control Surfaces',
    category: 'Control-System Modifications',
    design: {
      dpCost: "Chassis' Design Point cost × 1.4 per increment",
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: '−2 to Handling Rating',
    },
    customization: {
      partsCost: "Vehicle's original cost × 1.15 per increment",
      partsAvailability: '6/12 days (2)',
      equipmentRequired: 'Vehicle facility',
      baseTime: 'Level × 40 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      targetNumber: null,
      maxImprovement: '−2 to Handling',
    },
    note: 'Watercraft only. Improves rudder and other control surfaces. Cannot be used with drive-by-wire systems. May not reduce Handling by more than 2 below chassis original.',
  },

  {
    name: 'Improved Suspension',
    category: 'Control-System Modifications',
    design: {
      dpCost: "Chassis' Design Point cost × 1.25 per level",
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: '−2 to Handling Rating',
    },
    customization: {
      partsCost: "Vehicle's original cost × 1.1 per level",
      partsAvailability: '6/12 days (2)',
      equipmentRequired: 'Vehicle facility',
      baseTime: 'Level × 40 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      targetNumber: null,
      maxImprovement: '−2 to Handling',
    },
    note: 'Wheeled ground vehicles only. Each level reduces on-road Handling by 1. Motorcycles: reduces both on-road and off-road equally. Cannot be used with drive-by-wire systems. May not reduce Handling by more than 2 below chassis original.',
  },

  {
    name: 'Motorbike Gyro-Stabilization Gear',
    category: 'Control-System Modifications',
    design: {
      dpCost: "Chassis' Design Point cost × 1.25",
      cfConsumed: null,
      loadReduction: '5 kg',
      maxImprovement: null,
    },
    customization: {
      partsCost: "Vehicle's original cost × 1.25",
      partsAvailability: '6/10 days (1.5)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '48 hrs',
      skillTest: 'Bike B/R (5)',
      targetNumber: null,
      maxImprovement: null,
      loadReduction: '5 kg',
    },
    note: 'Motorcycles only. Package of gyroscopic balancing systems. Required for remote control of motorcycles by autonav 2+ and motorcycles with remote-control adaptation (p.130).',
  },

  {
    name: 'Off-Road Suspension',
    category: 'Control-System Modifications',
    offRoadSuspensionEconomyTable: [
      { vehicle: 'Cars, Vans, SUVs, Light Trucks', economyMultiplier: 0.85 },
      { vehicle: 'Motorcycles',                   economyMultiplier: 0.7  },
      { vehicle: 'Transports',                    economyMultiplier: 0.6  },
    ],
    design: {
      dpCost: "Chassis' Design Point cost × 1.5 per 1-point Handling change",
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: '+2/−2 to Handling',
    },
    customization: {
      partsCost: 'Cars (excl. Med/Heavy Transports & Tractors): cost × 0.35 per point | Bikes: cost × 0.2 per point | Med/Heavy Transports & Tractors: cost × 1.50 per point',
      partsAvailability: '6/12 days (2)',
      equipmentRequired: 'Vehicle facility',
      baseTime: 'Level × 40 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      targetNumber: null,
      maxImprovement: '+2/−2 Handling',
    },
    note: 'Wheeled ground vehicles only. Each level changes off-road Handling by −1 and on-road Handling by +1 (or vice versa — cannot raise or lower either by more than 2). Reduces Speed by 15 regardless of levels. Economy also reduced (see Off-Road Suspension Table). Compatible with improved-suspension modification.',
  },

  {
    name: 'Remote-Control Interfaces',
    category: 'Control-System Modifications',
    design: {
      dpCost: '25 × Body',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    customization: {
      partsCost: '2,500¥ × Body',
      partsAvailability: '4/72 days (2)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '16 hrs',
      skillTest: 'Appropriate Vehicle B/R (4), Electronics B/R (4)',
      targetNumber: null,
      maxImprovement: null,
    },
    note: 'Enables vehicle to receive and transmit data to/from a remote-control network for rigger control. Gives vehicle a Pilot rating of 1 (improvable with Advanced Drone Pilot). Not needed for drones (automatically equipped). Vehicle must also have sensors rated 1+ (p.148).',
  },

  {
    name: 'Rigger Adaptation',
    category: 'Control-System Modifications',
    design: {
      dpCost: '35',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    customization: {
      partsCost: '2,800¥',
      partsAvailability: '4/7 days (2)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '40 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      targetNumber: null,
      maxImprovement: null,
      cfConsumed: '1',
      loadReduction: '10 kg',
    },
    note: '"Black box" that translates machine code to neurological stimuli and vice versa. Includes a datajack port (see p.128). A character with vehicle-control rig cyberware gets full Reaction and Initiative increases from the cyberware when controlling via rigger adaptation.',
  },

  {
    name: 'Secondary Controls',
    category: 'Control-System Modifications',
    design: {
      dpCost: '5',
      cfConsumed: '1',
      loadReduction: null,
      maxImprovement: null,
    },
    customization: {
      partsCost: '400¥',
      partsAvailability: '3/72 hrs (1)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '40 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      targetNumber: null,
      maxImprovement: null,
      cfConsumed: '2',
    },
    note: 'Not available for motorcycles. Duplicates basic steering and speed-control functions of primary controls. Co-pilot controls on aircraft are typical examples.',
  },

];

// ── PROTECTIVE SYSTEM MODIFICATIONS (pp.131-133+) ────────────────────────────

export const ProtectiveSystemModifications = [

  {
    name: 'Ablative Armor',
    category: 'Protective System Modifications',
    design: null, // customization only
    customization: {
      partsCost: null,
      partsAvailability: null,
      equipmentRequired: null,
      baseTime: '6 hrs (no Skill Test)',
      targetNumber: null,
      maxImprovement: "Vehicle's Body",
      cfConsumed: null,
      loadReduction: 'Body × 100 kg',
    },
    note: 'Customization only — not a design option. Each level adds Armor Rating × 2, up to vehicle Body maximum. Not available for aircraft; not concealable. If hit by weapon Power > 3× total modified Armor, reduce ablative level by 1. Does not stage down damage code.',
  },

  {
    name: 'Advanced Passenger Protection Systems (APPS™)',
    category: 'Protective System Modifications',
    design: {
      dpCost: '30 per seat',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    customization: {
      partsCost: '2,500¥ per seat',
      partsAvailability: '3/6 days (1)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '40 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      targetNumber: null,
      maxImprovement: null,
      cfConsumed: '1',
    },
    note: 'Not for motorcycles. Secured seats, impact-activated air bags, interior body panel reinforcement. Reduces Power of crash damage by half. Exiting vehicle after crash requires Strength (5) Test.',
  },

  {
    name: 'Armor (Vehicle)',
    category: 'Protective System Modifications',
    design: {
      dpCost: '50 per Armor Point',
      cfConsumed: null,
      loadReduction: '(Body² × 5) kg per Armor Point',
      maxImprovement: null,
    },
    customization: {
      partsCost: '1,250¥ per Armor Point',
      partsAvailability: '6/12 days (2.5)',
      equipmentRequired: 'Vehicle facility',
      baseTime: 'Armor value × 8 hrs',
      skillTest: 'Appropriate Vehicle B/R',
      targetNumber: 'Desired Armor rating ÷ 3',
      maxImprovement: null,
      loadReduction: '(Body² × 5) kg per Armor Point',
    },
    note: 'Body 0 vehicles cannot carry vehicle armor. Every 6 Armor points increases Handling by 1.',
  },

  {
    name: 'Armor (Personal)',
    category: 'Protective System Modifications',
    design: {
      dpCost: '5 per Armor Point',
      cfConsumed: null,
      loadReduction: '(Body × 2) kg per Armor Point',
      maxImprovement: 'Body × 2',
    },
    customization: {
      partsCost: '400¥ per Armor Point',
      partsAvailability: '7/10 days (1.5)',
      equipmentRequired: 'Vehicle facility',
      baseTime: 'Armor value × 6 hrs',
      skillTest: 'Appropriate Vehicle B/R',
      targetNumber: 'Desired Armor rating ÷ 3 (rounded up)',
      maxImprovement: 'Body × 2',
      loadReduction: '(Body × 3) kg per Armor Point',
    },
    note: 'Advanced ceramics and Kevlar body panels. Ballistic armor, not impact. Same effect on vehicle-scale weaponry as personal body armor. Does not hinder vehicle performance.',
  },

  {
    name: 'Bulwark',
    category: 'Protective System Modifications',
    design: {
      dpCost: '(Hull Factor × 100) per Bulwark Point',
      cfConsumed: null,
      loadReduction: '(Hull Factor × 500) kg per Bulwark Point',
      maxImprovement: null,
    },
    customization: {
      partsCost: 'Hull Factor × 12,500¥ per Bulwark Point',
      partsAvailability: '6/24 days (2.5)',
      equipmentRequired: 'Ship facility',
      baseTime: 'Bulwark value × 16 days',
      skillTest: 'Appropriate Vehicle B/R',
      targetNumber: 'Desired Bulwark rating ÷ 3',
      maxImprovement: null,
      cfConsumed: '10 CF per Bulwark Point',
      loadReduction: '(Hull Factor × 500) kg per Bulwark Point',
    },
    note: 'Ships and large hull vehicles only. Like standard vehicle armor but on a larger scale. Each Bulwark point reduces naval damage Power by 1 and negates attacks if Power < Bulwark rating. Every 6 Bulwark points increases Handling by 1.',
  },

  {
    name: 'Concealed Armor',
    category: 'Protective System Modifications',
    design: {
      dpCost: '50 per level',
      cfConsumed: '2 CF per Armor Point',
      loadReduction: '(Body² × 5) kg per Armor Point',
      maxImprovement: null,
    },
    customization: {
      partsCost: '2,000¥ per Armor Point',
      partsAvailability: '8/21 days (3.5)',
      equipmentRequired: 'Vehicle facility',
      baseTime: 'Armor value × 8 hrs',
      skillTest: 'Appropriate Vehicle B/R',
      targetNumber: 'Desired Armor rating ÷ 3 (rounded up)',
      maxImprovement: null,
      cfConsumed: '3 CF per Armor Point',
      loadReduction: '(Body² × 5) kg per Armor Point',
    },
    note: 'Hidden in interior spaces. Detecting it requires a Perception Test (TN = 9 – (Armor rating ÷ 3 [round down])). Incompatible with standard vehicle armor.',
  },

  {
    name: 'Crash Cages',
    category: 'Protective System Modifications',
    design: {
      dpCost: '40',
      cfConsumed: null,
      loadReduction: '10 kg',
      maxImprovement: null,
    },
    customization: {
      partsCost: '3,500¥',
      partsAvailability: '4/96 hrs (2)',
      equipmentRequired: 'Vehicle shop',
      baseTime: '16 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      targetNumber: null,
      maxImprovement: null,
      cfConsumed: '2',
      loadReduction: '25 kg',
    },
    note: 'Not for motorcycles. Padded, hydraulically cushioned seating. Gives each occupant +6 dice on Damage Resistance Tests in a crash.',
  },

  {
    name: 'EnviroSeal™ System',
    category: 'Protective System Modifications',
    design: {
      dpCostGasSeal: 'Body × 3',
      dpCostWaterSeal: 'Body × 10',
      dpCostEngineSeal: 'Body × 15',
      dpCostCabinOverpressurization: 'Body × 75',
      dpCost: 'Gas Seal: Body×3 | Water Seal: Body×10 | Engine Seal: Body×15 | Cabin Over-pressurization: Body×75',
      cfConsumed: '0 (1 CF with cabin over-pressurization)',
      loadReduction: '0 (10 kg with cabin over-pressurization)',
      maxImprovement: null,
    },
    customization: {
      partsCostGasSeal: 'Body × 250¥',
      partsCostWaterSeal: 'Body × 750¥',
      partsCostEngineSeal: 'Body × 1,000¥',
      partsCostCabinOverpressurization: 'Body × 5,000¥',
      partsCost: 'Gas Seal: Body×250¥ | Water Seal: Body×750¥ | Engine Seal: Body×1,000¥ | Cabin Over-pressurization: Body×5,000¥',
      partsAvailability: '8/14 days (2.5)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '12 hrs',
      skillTest: 'Appropriate Vehicle B/R (3)',
      targetNumber: null,
      maxImprovement: null,
      cfConsumed: '1 (2 CF with cabin over-pressurization)',
      loadReduction: '0 (15 kg with cabin over-pressurization)',
    },
    note: 'Not for motorcycles or vehicles with "open" entry points. Provides gas-tight (or watertight) seals. Opening any window/door/hatch breaks the seal. Internal combustion engines (methane, gas, diesel, jet) still need air from surface. Cabin over-pressurization keeps external contaminants out — does not work underwater or if vehicle sustains Moderate or greater damage.',
  },

  {
    name: 'Life-Support Systems',
    category: 'Protective System Modifications',
    design: {
      dpCost: '5 + 1 per man-hour of support',
      cfConsumed: '1 CF per 10 man-hrs',
      loadReduction: '25 kg per 10 man-hrs',
      maxImprovement: null,
    },
    customization: {
      partsCost: '500¥ + 100¥ per man-hour',
      partsAvailability: '8/14 days (2.5)',
      equipmentRequired: 'Vehicle shop',
      baseTime: '8 hrs',
      skillTest: 'Appropriate Vehicle B/R (3)',
      targetNumber: null,
      maxImprovement: null,
      cfConsumed: '1 CF per 10 man-hrs',
      loadReduction: '25 kg per 10 man-hrs',
    },
    note: 'Provides oxygen and basic climate control inside sealed cabin/cockpit. Each CF of life-support = 10 man-hours of support (10 hrs for 1 person, 5 hrs for 2, etc.).',
  },

  {
    name: 'Roll Bars',
    category: 'Protective System Modifications',
    design: {
      dpCost: '0',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    customization: {
      partsCost: '2,000¥',
      partsAvailability: '3/72 hrs (1)',
      equipmentRequired: 'Vehicle shop',
      baseTime: '24 hrs',
      skillTest: 'Appropriate Vehicle B/R (3)',
      targetNumber: null,
      maxImprovement: null,
    },
    note: 'Adds rigidity for rag-top vehicles. Prevents doubling of Damage Resistance penalty in rollovers. Hard-top: adds 3 dice to any character\'s Damage Resistance Test after a crash. Also required for installing certain vehicle weapon mounts on civilian vehicles (see Vehicle Weapon Mounts, p.135).',
  },

  {
    name: 'Smart Armor Systems (SAS)',
    category: 'Protective System Modifications',
    design: {
      dpCost: '250',
      cfConsumed: '2',
      loadReduction: 'Body × 50 kg per Armor Point',
      maxImprovement: null,
    },
    customization: {
      partsCost: '20,000¥ (installment); Body × 500¥ (replacement cells)',
      partsAvailability: '10/28 days (—)',
      equipmentRequired: 'Vehicle facility',
      baseTime: 'Body rating × 40 hrs',
      skillTest: 'Demolitions B/R (4), Computer (4), Electronics (4)',
      targetNumber: null,
      maxImprovement: null,
      cfConsumed: '3 CF per Armor Point',
      loadReduction: 'Body × 50 kg per Armor Point',
    },
    note: 'Not for vehicles with Body 4 or less. Cannot be concealed. Only vehicles with Armor 1+ can use. Military-grade if installed during design. Small hexagonal explosive cells (~5cm × 10cm). Each "hit": roll 2D6, total 3+ = SAS activates, reduces Damage Level by 1 (D→S→M→L). In addition to normal vehicle armor reduction (net −2 Damage Levels vs bullets). Expended cells can be replaced (repair TN becomes 3 for next attack). 3 successful skill tests required for customization install.',
  },

];

// ── SIGNATURE MODIFICATIONS (pp.134-135) ─────────────────────────────────────

export const SignatureModifications = [

  {
    name: 'Active Thermal Masking',
    category: 'Signature Modifications',
    design: {
      dpCost: 'Level 1: Engine Customization cost × 2; each additional level: multiply by an additional ×0.25',
      cfConsumed: '3',
      loadReduction: '100 kg',
      maxImprovement: '+2 Signature or Engine Customization level (whichever is lower)',
    },
    customization: {
      partsCost: 'Level 1: Engine Customization cost × 2; each additional level: multiply by an additional ×0.25',
      partsAvailability: '8/21 days (2)',
      equipmentRequired: 'Vehicle facility',
      baseTime: 'Level × 8 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      targetNumber: null,
      maxImprovement: '+2 Signature or Engine Customization level (whichever is lower)',
      cfConsumed: '3',
      loadReduction: '100 kg',
    },
    note: 'Standard motorcycles and customized gasoline, methane, diesel, and jet engines only. One level of active masking per level of Engine Customization. Each level raises Signature by 1. When active: vehicle loses 15 meters/turn to Speed per masking level; cannot exceed adjusted Speed. System runs (60 – [masking × 5]) minutes. Exceeding duration: 1 Stress Point per minute + Stress Test. Can switch off early.',
  },

  {
    name: 'Noisemaker Dispenser',
    category: 'Signature Modifications',
    design: {
      dpCost: '350',
      cfConsumed: '16 CF + 8 CF per noisemaker',
      loadReduction: '150 kg + 25 kg per noisemaker',
      maxImprovement: null,
    },
    customization: {
      partsCost: '350,000¥',
      partsAvailability: '8/21 days (4.5)',
      equipmentRequired: 'Ship facility',
      baseTime: '48 hrs',
      skillTest: 'Submarine B/R (4)',
      targetNumber: null,
      maxImprovement: null,
      cfConsumed: '16 CF + 8 CF per noisemaker',
      loadReduction: '150 kg + 25 kg per noisemaker',
    },
    note: 'Ships, subs, or boats only. Perforated canister of assorted chemicals creates a frothing mass of gas bubbles confusing sonar and torpedoes. When released: +3 modifier to all TNs to detect or target the vessel for current Combat Turn and the next two turns.',
  },

  {
    name: 'Radar-Absorbent Materials (RAM)',
    category: 'Signature Modifications',
    design: {
      dpCost: '(Levels)³ × 50',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: '+3 Signature',
    },
    customization: {
      partsCost: '(Levels)³ × 25,000¥',
      partsAvailability: '18/30 days (NA)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '12 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      targetNumber: null,
      maxImprovement: '+3 Signature',
    },
    note: 'Special coatings and enamels that absorb radar signals and convert them to heat or small magnetic fields. Military-grade Street Index. Each level increases Signature by 1 vs radar, up to +3 maximum.',
  },

  {
    name: 'Thermal Baffles',
    category: 'Signature Modifications',
    design: {
      dpCost: '75 per +1 Signature increase',
      cfConsumed: null,
      loadReduction: 'Body × 50 kg per +1 increase',
      maxImprovement: '+2 Signature or limited by weight vs Load rating',
    },
    customization: {
      partsCost: 'Ground Vehicles: Body×5,000¥ | Motorcycles: Body×6,000¥ | Trucks & Fixed-Wing: Body×7,500¥ | Tractors & Helicopters: Body×10,000¥ | Hovercraft: Body×3,750¥ | Watercraft & Zeppelins: Body×2,500¥ (per +1 Signature)',
      partsAvailability: '6/14 days (2)',
      equipmentRequired: 'Vehicle facility',
      baseTime: 'Level × 8 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      targetNumber: null,
      maxImprovement: '+2 Signature or limited by weight vs Load rating',
      cfConsumed: '3 CF per +1 increase',
      loadReduction: 'Body × 50 kg per +1 increase',
    },
    note: 'Gasoline, methane, diesel, and jet engines only. Heat-blocking and absorbing materials reduce thermal signature. Track thermal masking rating separately — serves as positive modifier on Perception Tests involving non-thermographic detection.',
  },

];

// ── VEHICLE WEAPON MOUNTS (pp.135-138) ───────────────────────────────────────

export const VehicleWeaponMounts = [

  {
    name: 'Ammunition Bins',
    category: 'Vehicle Weapon Mounts',
    design: {
      dpCost: '0',
      cfConsumedByWeapon: {
        'LMGs, Rifles and Smaller': '0.2 CF per 2,000 rounds',
        'MMGs and HMGs':            '0.2 CF per 200 rounds',
        'Grenade Launchers and Assault Cannons': '0.2 CF per 20 rounds',
      },
      cfConsumed: 'LMGs/Rifles/Smaller: 0.2 CF/2,000 rds | MMGs/HMGs: 0.2 CF/200 rds | GL/AC: 0.2 CF/20 rds',
      loadReduction: null,
      maxImprovement: 'GM discretion (recommended 2 CF per mount)',
    },
    customization: {
      partsCost: '50¥ per 0.2 CF allotted',
      partsAvailability: 'As associated weapon mount',
      equipmentRequired: 'Vehicle facility',
      baseTime: '12 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      targetNumber: null,
      maxImprovement: 'GM discretion (recommended 2 CF per mount)',
      cfConsumed: 'Same as design',
      loadReduction: '1 kg per weapon mount',
    },
    note: 'Fixed mounts and turrets assumed to hold ammo equal to twice the weapon\'s Ammo rating. Additional bins needed for more. Weight of ammo counts against Load as cargo. Accept only belted ammunition.',
  },

  {
    name: 'Fixed Mount — External Hardpoint',
    category: 'Vehicle Weapon Mounts',
    design: { dpCost: '25', cfConsumed: '1', loadReduction: '10 kg', maxImprovement: null },
    customization: { partsCost: '2,000¥', partsAvailability: '6/7 days (2)', equipmentRequired: 'Vehicle facility', baseTime: '24 hrs', skillTest: 'Appropriate Vehicle B/R (4)', cfConsumed: '2', loadReduction: '10 kg', maxImprovement: null },
    note: 'Weapon permanently affixed; fires in fixed arc (no more than 5° either side). Faces forward or rear. External: easily seen; decreases Signature by 1. Protected by vehicle armor. Half recoil modifiers before applying compensation accessories.',
  },

  {
    name: 'Fixed Mount — External Firmpoint',
    category: 'Vehicle Weapon Mounts',
    design: { dpCost: '10', cfConsumed: '0.5', loadReduction: '10 kg', maxImprovement: null },
    customization: { partsCost: '750¥', partsAvailability: '6/7 days (2)', equipmentRequired: 'Vehicle facility', baseTime: '24 hrs', skillTest: 'Appropriate Vehicle B/R (4)', cfConsumed: '1', loadReduction: '10 kg', maxImprovement: null },
    note: 'For lighter weapons. External: decreases Signature by 1. Side-facing mount adds weapon\'s recoil to on-road Handling; driver must make Driving Test against increased Handling or Crash.',
  },

  {
    name: 'Fixed Mount — Internal Hardpoint',
    category: 'Vehicle Weapon Mounts',
    design: { dpCost: '35', cfConsumed: '4', loadReduction: '10 kg', maxImprovement: null },
    customization: { partsCost: '3,000¥', partsAvailability: '6/7 days (2)', equipmentRequired: 'Vehicle facility', baseTime: '24 hrs', skillTest: 'Appropriate Vehicle B/R (4)', cfConsumed: '7', loadReduction: '10 kg', maxImprovement: null },
    note: 'Protected by vehicle armor. Does not decrease Signature. Observer can spot with Perception (4) but won\'t immediately know its purpose. While armed: Signature −1. Stowing/extending requires Complex Action.',
  },

  {
    name: 'Fixed Mount — Internal Firmpoint',
    category: 'Vehicle Weapon Mounts',
    design: { dpCost: '20', cfConsumed: '3', loadReduction: '10 kg', maxImprovement: null },
    customization: { partsCost: '1,500¥', partsAvailability: '6/7 days (2)', equipmentRequired: 'Vehicle facility', baseTime: '24 hrs', skillTest: 'Appropriate Vehicle B/R (4)', cfConsumed: '5', loadReduction: '10 kg', maxImprovement: null },
    note: 'Same rules as Internal Hardpoint but for lighter weapons.',
  },

  {
    name: 'Gunnery Recoil Adjusters',
    category: 'Vehicle Weapon Mounts',
    design: {
      dpCost: '10 per level of recoil adjustment',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: 'Fixed Firmpoint/Micro-Turret: 4 | Mini-Turret: 6 | Small Turret/Fixed Hardpoint: 9 | Medium or Larger Turrets: 12',
    },
    customization: {
      partsCost: '500¥ per level',
      partsAvailability: '6/48 hrs (1.5)',
      equipmentRequired: 'Vehicle kit',
      baseTime: '24 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      targetNumber: null,
      maxImprovement: 'Fixed Firmpoint/Micro-Turret: 4 | Mini-Turret: 6 | Small Turret/Fixed Hardpoint: 9 | Medium or Larger Turrets: 12',
      cfConsumed: '1',
      loadReduction: 'Rating + 24 kg',
    },
    note: 'Fixed mounts and turrets only. Not compatible with vehicle gyro-stabilization. Each level negates 1 point of recoil.',
  },

  {
    name: 'Launch Control Systems — Medium',
    category: 'Vehicle Weapon Mounts',
    design: { dpCost: '10', cfConsumed: '0.5', loadReduction: '10 kg', maxImprovement: null },
    customization: { partsCost: '750¥', partsAvailability: '6/7 days (2)', equipmentRequired: 'Vehicle facility', baseTime: '24 hrs', skillTest: 'Appropriate Vehicle B/R (4)', cfConsumed: '1', loadReduction: '10 kg', maxImprovement: null },
    note: 'Controls firing of regular rockets and missiles. Vehicle can fire any number of rockets/missiles per Initiative Pass up to number of launch control systems.',
  },

  {
    name: 'Launch Control Systems — Heavy',
    category: 'Vehicle Weapon Mounts',
    design: { dpCost: '25', cfConsumed: '1', loadReduction: '10 kg', maxImprovement: null },
    customization: { partsCost: '2,000¥', partsAvailability: '6/7 days (2)', equipmentRequired: 'Vehicle facility', baseTime: '24 hrs', skillTest: 'Appropriate Vehicle B/R (4)', cfConsumed: '2', loadReduction: '10 kg', maxImprovement: null },
    note: 'Anti-ship rockets and missiles (Damage Code ending "N"). Consumes one hardpoint.',
  },

  {
    name: 'Missile and Rocket Mounts',
    category: 'Vehicle Weapon Mounts',
    design: {
      dpCost: '0',
      cfConsumed: 'External (Standard & Reinforced): 0 CF | Internal Standard: 2 CF + 3 CF/rocket | Internal Heavy: 8 CF + 50 CF/missile',
      loadReduction: 'External: 0 kg | Internal Standard: 0 kg | Internal Heavy: 500 kg (plus weapons)',
      maxImprovement: 'External: Body of vehicle | Internal: See text',
    },
    customization: {
      partsCost: 'Standard External: 1,500¥/mount | Reinforced External: 5,000¥/mount | Standard Internal: 5,000¥/CF | Heavy Internal: 50,000¥/CF',
      partsAvailability: '10/60 days (5)',
      equipmentRequired: 'Aircraft facility',
      baseTime: '8 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      targetNumber: null,
      maxImprovement: 'External: Body of vehicle | Internal: See text',
      cfConsumed: 'Same as design',
      loadReduction: 'Same as design',
    },
    note: 'Normal rockets/missiles require 3 CF storage each + 2 CF for door actuators + equal Load to weapon weight. Heavy missiles: 50 CF storage, 8 CF doors, 500 kg Load. External mounts do not decrease Signature; decrease it by 1 each. Internal: Signature −1 while armed. Reinforced mounts hold up to 1,500 kg ordnance.',
  },

  {
    name: 'Naval-Weapons Control Network (NWCN)',
    category: 'Vehicle Weapon Mounts',
    design: {
      dpCost: 'Rating × 5,000',
      cfConsumed: '100 CF per station',
      loadReduction: '500 kg per station',
      maxImprovement: 'Number of available hardpoints',
    },
    customization: {
      partsCost: 'Rating × 500,000¥',
      partsAvailability: '(Rating × 10)/(Rating × 10) days (—)',
      equipmentRequired: 'Ship facility',
      baseTime: '480 hrs',
      skillTest: 'Electronics (B/R) (8)',
      targetNumber: null,
      maxImprovement: 'Number of available hardpoints',
      cfConsumed: '100 CF per station',
      loadReduction: '500 kg per station',
    },
    note: 'Rigger network providing central control and coordination of naval weapons from a ship or submarine. Rating = number of control systems linked. Missiles, rockets, torpedoes do not consume hardpoints by themselves (Launch Control Systems do). Automated gun systems and turrets consume hardpoints normally.',
  },

  {
    name: 'Pintle Mount',
    category: 'Vehicle Weapon Mounts',
    design: { dpCost: '1', cfConsumed: '0 (not including passenger space)', loadReduction: null, maxImprovement: null },
    customization: { partsCost: '50¥', partsAvailability: '4/96 hrs (1.5)', equipmentRequired: 'Vehicle shop', baseTime: '12 hrs', skillTest: 'Appropriate Vehicle B/R (2)', cfConsumed: '0 (not including passenger space)', loadReduction: null, maxImprovement: null },
    note: 'Simple reinforced holes and swivels. Accepts any firmpoint-sized weapon. Firing arc: generally 60° left/right, 30° up/down. Counts as one firmpoint. Mounting/dismounting: Complex Action + Quickness (4) Test if vehicle moving. Drone pilots and riggers cannot remotely control pintle mounts. Weapon receives +2 points of recoil compensation.',
  },

  {
    name: 'Ring Mount',
    category: 'Vehicle Weapon Mounts',
    design: { dpCost: null, cfConsumed: null, loadReduction: null, maxImprovement: null }, // specs continue on next page
    customization: { partsCost: null, partsAvailability: null, equipmentRequired: null, baseTime: null, skillTest: null, cfConsumed: null, loadReduction: null, maxImprovement: null },
    note: 'Freely rotating ring set on top of vehicle with tripod assembly. Full 360° rotation; vertical traverse ±30°. Mounting/dismounting: Complex Action + Quickness (4) Test if vehicle moving. Helicopters: door must be open (exposes interior). Hardtop/convertible vehicles need roll bars.',
  },

];

// ── COMBINED EXPORT ───────────────────────────────────────────────────────────

const Rigger3Mods = {
  fuelTankCapacity: FuelTankCapacity,
  functionalImprovements: FunctionalImprovements,
  designEnhancements: DesignEnhancements,
  facilities: Facilities,
  peopleSpaceRequirements: PeopleSpaceRequirements,
  robotOptions: RobotOptions,
  engineModifications: EngineModifications,
  controlSystemModifications: [...ControlSystemModifications, ...ControlSystemModifications2],
  protectiveSystemModifications: ProtectiveSystemModifications,
  signatureModifications: SignatureModifications,
  vehicleWeaponMounts: VehicleWeaponMounts,
};

export default Rigger3Mods;
