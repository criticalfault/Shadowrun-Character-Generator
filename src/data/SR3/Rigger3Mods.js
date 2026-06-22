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
    design: { dpCost: '10', cfConsumed: '1 (16 CF People Space required for door-gun configuration)', loadReduction: '25 kg', maxImprovement: null },
    customization: { partsCost: '3,000¥', partsAvailability: '8/14 days (2)', equipmentRequired: 'Vehicle shop', baseTime: '8 hrs', skillTest: 'Appropriate Vehicle B/R (3)', cfConsumed: '1 (16 CF People Space required for door-gun configuration)', loadReduction: '25 kg', maxImprovement: null },
    note: 'Freely rotating ring set on top of vehicle with tripod assembly. Full 360° rotation; vertical traverse ±30°. Mounting/dismounting: Complex Action + Quickness (4) Test if vehicle moving. Helicopters: door must be open (exposes interior). Hardtop/convertible vehicles need roll bars. Counts as hardpoint; can mount man-portable heavy weapons and LMGs. Cannot be remotely controlled by drone pilot or rigger. Weapons receive 6 points of recoil compensation.',
  },

  {
    name: 'Smartlink Integration Kit — Level I',
    category: 'Vehicle Weapon Mounts',
    design: { dpCost: '250', cfConsumed: '1', loadReduction: null, maxImprovement: null },
    customization: { partsCost: '650¥', partsAvailability: '4/48 hrs (1)', equipmentRequired: 'Vehicle kit', baseTime: '24 hrs', skillTest: 'Appropriate Vehicle B/R (4)', cfConsumed: '1', loadReduction: null, maxImprovement: null },
    note: 'Interface connecting smartgun-equipped weapons in fixed mounts or turrets with smartlink cyberware gunners. Without kit, smartgun weapons in mounts/turrets do not grant smartlink benefit during Manual Gunnery Tests. Smartlink modifiers do not apply to Sensor-Enhanced Gunnery or Missile Attack Tests. Not required for pintle or ring mounts.',
  },

  {
    name: 'Smartlink Integration Kit — Level II',
    category: 'Vehicle Weapon Mounts',
    design: { dpCost: '350', cfConsumed: '1', loadReduction: null, maxImprovement: null },
    customization: { partsCost: '900¥', partsAvailability: '6/48 hrs (2)', equipmentRequired: 'Vehicle kit', baseTime: '24 hrs', skillTest: 'Appropriate Vehicle B/R (4)', cfConsumed: '1', loadReduction: null, maxImprovement: null },
    note: 'Level II smartlink integration kit. See Level I note. Also contains palm-induction links for weapon controls.',
  },

  {
    name: 'Torpedo Tubes',
    category: 'Vehicle Weapon Mounts',
    design: {
      dpCost: '250 points per tube; Autoloader: +250 per tube',
      cfConsumed: '128 CF per tube; Storage Racks: 32 CF per torpedo; Manual Loading: 720 CF; Autoloader: 360 CF',
      loadReduction: '500 kg per tube; Storage Racks: weight of torpedoes stored; Autoloader: 50,000 kg',
      maxImprovement: null,
    },
    customization: {
      partsCost: '100,000¥ per tube; Autoloader: 50,000¥',
      partsAvailability: '25/6 months (—)',
      equipmentRequired: 'Ship Facility',
      baseTime: '300 hrs',
      skillTest: 'Submarine B/R (6)',
      cfConsumed: '50 CF + 150 per tube; Storage Racks: 32 CF per torpedo; Manual Loading: 720 CF; Autoloader: 400 CF',
      loadReduction: '750 kg per tube; Storage Racks: weight of torpedoes stored; Autoloader: 60,000 kg',
      maxImprovement: null,
    },
    note: 'Submarines only (surface ships launch torpedoes from internal missile mounts). Fixed direction — fore or aft. Fore and aft tubes require separate storage. Each torpedo requires 32 CF storage on ammunition rack. Autoloaders use machinery instead of crew. Manual loading: Complex Action + Strength 30 to load one; Autoloader: 15 seconds per torpedo.',
  },

  {
    name: 'Vehicle Gyroscopic Stabilizers',
    category: 'Vehicle Weapon Mounts',
    design: {
      dpCost: '15 per level of gyro-stabilization',
      cfConsumed: '1',
      loadReduction: 'Rating + 24 kg',
      maxImprovement: 'Body × 2',
    },
    customization: {
      partsCost: '1,000¥ per level of gyro-stabilization',
      partsAvailability: '8/72 hrs (1.5)',
      equipmentRequired: 'Vehicle kit',
      baseTime: '24 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: '1',
      loadReduction: 'Rating + 24 kg',
      maxImprovement: 'Body × 2',
    },
    note: 'For weapons mounted in fixed mounts and turrets. Reduces combined recoil + movement modifiers by half (movement reduction only applies to vehicles using mechanical legs). If total active gyroscopic stabilization rating > vehicle Body: vehicle receives +1 to Handling for each gyro-stabilization point > Body. Not compatible with Gunnery Recoil Adjusters.',
  },

];

// ── TURRETS ───────────────────────────────────────────────────────────────────
// Standard (gunner-operated) turrets. Weapon value of all weapons on turret
// may not exceed turret's Weapon Value (see Weapon Values Table, p.140).
// Anti-aircraft turrets: multiply design/parts cost × 1.5, CF +1.
// Pop-up turrets: weapon value −1; CF consumption doubled; design cost as listed.

export const TurretsTable = [
  {
    size: 'Mini',
    weaponValue: 2,
    hardpointRequirement: 1,
    internalSpace: { cf: 1, seating: 'None' },
    design: { dpCost: 125, cfConsumed: 6, loadReduction: '25 kg' },
    customization: {
      partsCost: '5,000¥',
      partsAvailability: '(Vehicle Cost ÷ 25) ÷ 6 = Target Number; (Vehicle Cost ÷ 25) × 14 = days',
      streetIndex: 2,
      equipmentRequired: 'Vehicle facility',
      baseTime: '72 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: 7,
      loadReduction: '25 kg',
    },
  },
  {
    size: 'Small',
    weaponValue: 3,
    hardpointRequirement: 2,
    internalSpace: { cf: 2, seating: 'None' },
    design: { dpCost: 250, cfConsumed: 7, loadReduction: '100 kg' },
    customization: {
      partsCost: '7,500¥',
      partsAvailability: '(Vehicle Cost ÷ 25) ÷ 6 = Target Number; (Vehicle Cost ÷ 25) × 14 = days',
      streetIndex: 3,
      equipmentRequired: 'Vehicle facility',
      baseTime: '72 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: 8,
      loadReduction: '100 kg',
    },
  },
  {
    size: 'Medium',
    weaponValue: 6,
    hardpointRequirement: 3,
    internalSpace: { cf: 4, seating: 2 },
    design: { dpCost: 500, cfConsumed: 16, loadReduction: '1,000 kg' },
    customization: {
      partsCost: '15,000¥',
      partsAvailability: 'Military only',
      streetIndex: null,
      equipmentRequired: 'Vehicle facility',
      baseTime: '72 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: 24,
      loadReduction: '1,000 kg',
    },
  },
  {
    size: 'Large',
    weaponValue: 8,
    hardpointRequirement: 4,
    internalSpace: { cf: 8, seating: 2 },
    design: { dpCost: 1500, cfConsumed: 32, loadReduction: '6,000 kg' },
    customization: {
      partsCost: '300,000¥',
      partsAvailability: 'Military only',
      streetIndex: null,
      equipmentRequired: 'Vehicle facility',
      baseTime: '72 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: 36,
      loadReduction: '6,000 kg',
    },
  },
  {
    size: 'Extra-Large',
    weaponValue: 10,
    hardpointRequirement: 6,
    internalSpace: { cf: 16, seating: 3 },
    design: { dpCost: 3000, cfConsumed: 64, loadReduction: '30,000 kg' },
    customization: {
      partsCost: '1,000,000¥',
      partsAvailability: 'Military only',
      streetIndex: null,
      equipmentRequired: 'Vehicle facility',
      baseTime: '72 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: 72,
      loadReduction: '30,000 kg',
    },
  },
];

// Remote turrets: operator controls from passenger compartment via remote sensors.
// A gunner or rigger may operate; military vehicles often use two riggers.
// Available in micro, mini, small, medium, large, and extra-large sizes.
// Micro turrets normally on large drones: 1 firmpoint, Weapon Value 1.
// Large and extra-large remote turrets exist on destroyers/cruisers only.
// Pop-up micro-turrets have Weapon Value 1 and take up 1 CF.

export const RemoteTurretsTable = [
  {
    size: 'Micro',
    weaponValue: 1,
    hardpointRequirement: 1,
    design: { dpCost: 100, cfConsumed: 0, loadReduction: '10 kg' },
    customization: {
      partsCost: '2,500¥',
      partsAvailability: '(Vehicle Cost ÷ 25) ÷ 6 = Target Number; (Vehicle Cost ÷ 25) × 14 = days',
      streetIndex: 2,
      equipmentRequired: 'Vehicle facility',
      baseTime: '72 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: 1,
      loadReduction: '10 kg',
    },
  },
  {
    size: 'Mini',
    weaponValue: 2,
    hardpointRequirement: 1,
    design: { dpCost: 175, cfConsumed: 3, loadReduction: '25 kg' },
    customization: {
      partsCost: '6,000¥',
      partsAvailability: '(Vehicle Cost ÷ 25) ÷ 6 = Target Number; (Vehicle Cost ÷ 25) × 14 = days',
      streetIndex: 2,
      equipmentRequired: 'Vehicle facility',
      baseTime: '72 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: 4,
      loadReduction: '25 kg',
    },
  },
  {
    size: 'Small',
    weaponValue: 3,
    hardpointRequirement: 2,
    design: { dpCost: 350, cfConsumed: 4, loadReduction: '100 kg' },
    customization: {
      partsCost: '9,000¥',
      partsAvailability: '3',
      streetIndex: 3,
      equipmentRequired: 'Vehicle facility',
      baseTime: '72 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: 5,
      loadReduction: '100 kg',
    },
  },
  {
    size: 'Medium',
    weaponValue: 6,
    hardpointRequirement: 3,
    design: { dpCost: 600, cfConsumed: 8, loadReduction: '1,000 kg' },
    customization: {
      partsCost: '17,500¥',
      partsAvailability: 'Military only',
      streetIndex: null,
      equipmentRequired: 'Vehicle facility',
      baseTime: '72 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: 8,
      loadReduction: '1,000 kg',
    },
  },
  {
    size: 'Large',
    weaponValue: 8,
    hardpointRequirement: 4,
    design: { dpCost: 2500, cfConsumed: 60, loadReduction: '8,000 kg' },
    customization: {
      partsCost: '600,000¥',
      partsAvailability: 'Military only',
      streetIndex: null,
      equipmentRequired: 'Vehicle facility',
      baseTime: '72 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: 60,
      loadReduction: '8,000 kg',
    },
  },
  {
    size: 'Extra-Large',
    weaponValue: 10,
    hardpointRequirement: 6,
    design: { dpCost: 5000, cfConsumed: 120, loadReduction: '75,000 kg' },
    customization: {
      partsCost: '2,000,000¥',
      partsAvailability: 'Military only',
      streetIndex: null,
      equipmentRequired: 'Vehicle facility',
      baseTime: '72 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: 120,
      loadReduction: '75,000 kg',
    },
  },
];

// ── ELECTRONIC SYSTEMS ────────────────────────────────────────────────────────
// Computers and electronic devices that regulate/control vehicles, plus sensor
// and electronic warfare systems. CF values: design CF / customization CF where noted.

export const ElectronicSystems = [

  {
    name: 'Autosoft Interpretation System',
    category: 'Electronic Systems',
    design: {
      dpCost: 'Pilot rating × 50',
      cfConsumed: '1',
      loadReduction: null,
      maxImprovement: null,
    },
    customization: {
      partsCost: 'Pilot rating × 1,000¥',
      partsAvailability: '8/14 days (2)',
      equipmentRequired: 'Electronics shop',
      baseTime: '72 hrs',
      skillTest: 'Electronics B/R (4)',
      cfConsumed: '1',
      loadReduction: '2 kg',
      maxImprovement: null,
    },
    note: 'Drones only. Essentially a "skillwire" system — allows a drone to interpret autosoft or knowsoft programming on either an autosoft (p.44) or a knowsoft (p.295, SR3). Processing power and memory equal to Pilot rating × 2. Combined ratings of simultaneously used programs may not exceed this figure. Autosofts and knowsofts must have ratings ≤ drone\'s Pilot rating. Autosofts/knowsofts may not use any programming options available to skillsofts. Does not inhibit IVIS Pool or Adaptation Pool.',
  },

  {
    name: 'BattleTac FDDM Receiver Module',
    category: 'Electronic Systems',
    design: {
      dpCost: '350',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    customization: {
      partsCost: '35,000¥',
      partsAvailability: '10/21 days (3)',
      equipmentRequired: 'Microtronics shop',
      baseTime: '64 × Pilot hrs',
      skillTest: 'Computer B/R (4)',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    note: 'Fire-Direction Data Manager spin-off of BattleTac. Allows vehicle to transmit and receive targeting information among other drones via a remote-control network. Enables drones to fire on targets outside their lines of sight. See Indirect Fire, p.99, CC.',
  },

  {
    name: 'BattleTac IVIS Receiver Module',
    category: 'Electronic Systems',
    design: {
      dpCost: '250',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    customization: {
      partsCost: '25,000¥',
      partsAvailability: '8/14 days (3)',
      equipmentRequired: 'Microtronics shop',
      baseTime: '64 × Pilot hrs',
      skillTest: 'Computer B/R (4)',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    note: 'Intra-Vehicle Information System spin-off of BattleTac. Enhances data-sharing between remote-control deck and drones in its network. Only remotely controlled vehicles/drones with pilots modified to interact with BattleTac IVIS receive benefits. See The BattleTac IVIS System, p.43.',
  },

  {
    name: 'Closed-Circuit Simsense System Integration',
    category: 'Electronic Systems',
    design: {
      dpCost: 'Technical rating × 5,000',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: '10',
    },
    customization: {
      partsCost: 'Technical rating × 400,000¥',
      partsAvailability: '6/21 days (4)',
      equipmentRequired: 'Ship Facility',
      baseTime: '120 hrs',
      skillTest: 'Computer B/R (6); Electronics B/R (6)',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: '10',
    },
    note: 'Ships only. Allows rigger to monitor a ship the same way she monitors a building\'s security system (see CCSS, p.45). Concerned with internal activities only — no piloting/maneuvering capabilities. If ship is wired for both CCSS and rigger control, rigger can "jump" from direct helm control to CCSS monitoring. Useful for engineering functions (damage control), commanding maintenance drone groups. Rigger can command up to Intelligence attribute drones via CCSS network.',
  },

  {
    name: 'Dipping Sonar',
    category: 'Electronic Systems',
    design: {
      dpCost: 'Sonar rating × 250',
      cfConsumed: '12',
      loadReduction: '50 kg',
      maxImprovement: '6',
    },
    customization: {
      partsCost: 'Sonar rating × 15,000¥',
      partsAvailability: '8/21 days (4.5)',
      equipmentRequired: 'Vehicle Facility',
      baseTime: '16 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: '16',
      loadReduction: '50 kg',
      maxImprovement: '6',
    },
    note: 'Helicopters and aircraft capable of hovering. Array of active and passive sonar sensors on long cable, lowered into water while hovering ≤30m altitude at ≤7m/s speed. Detects underwater contacts (submarines). Processes data and transmits to aircraft via cable.',
  },

  {
    name: 'Electronic Countermeasures (ECM)',
    category: 'Electronic Systems',
    design: { dpCost: 'See ECM Systems Table', cfConsumed: 'See ECM Systems Table', loadReduction: 'See ECM Systems Table', maxImprovement: '10' },
    customization: { partsCost: 'See ECM Systems Table', partsAvailability: 'See ECM Systems Table', equipmentRequired: 'Vehicle facility', baseTime: '16 hrs per level', skillTest: 'Electronics B/R (4)', cfConsumed: 'See ECM Systems Table', loadReduction: 'See ECM Systems Table', maxImprovement: '10' },
    note: 'Barrage radio jammers, infrared jammers, chaff/flare dispensers, wave harmonic disrupters. Jam communications of opposing remote-control operations. See ECM, p.138, SR3.',
  },

  {
    name: 'Electronic Counter-Countermeasures (ECCM)',
    category: 'Electronic Systems',
    design: { dpCost: 'See ECCM Systems Table', cfConsumed: 'See ECCM Systems Table', loadReduction: 'See ECCM Systems Table', maxImprovement: '10' },
    customization: { partsCost: 'See ECCM Systems Table', partsAvailability: 'See ECCM Systems Table', equipmentRequired: 'Vehicle facility', baseTime: '16 hrs per level', skillTest: 'Electronics B/R (4)', cfConsumed: 'See ECCM Systems Table', loadReduction: 'See ECCM Systems Table', maxImprovement: '10' },
    note: 'Signal amplifiers and noise filters that nullify ECM effects. More readily available than ECM. Higher-level ECCM available only through licensed security firms or military organizations. See Electronic Countermeasures, p.138, SR3.',
  },

  {
    name: 'Electronic Deception (ED)',
    category: 'Electronic Systems',
    design: { dpCost: 'See ED Systems Table', cfConsumed: 'See ED Systems Table', loadReduction: 'See ED Systems Table', maxImprovement: '6' },
    customization: { partsCost: 'See ED Systems Table', partsAvailability: 'See ED Systems Table', equipmentRequired: 'Vehicle facility', baseTime: '16 hrs per level', skillTest: 'Electronics B/R (4)', cfConsumed: 'See ED Systems Table', loadReduction: 'See ED Systems Table', maxImprovement: '6' },
    note: 'Reality-checking electronic components (inertial navigation, flux density monitors) that negate effects of ECD. Generally restricted to security/military — almost impossible on streets. See Electronic Deception, p.32.',
  },

  {
    name: 'Electronic Counter-Deception (ECD)',
    category: 'Electronic Systems',
    design: { dpCost: 'See ECD Systems Table', cfConsumed: 'See ECD Systems Table', loadReduction: 'See ECD Systems Table', maxImprovement: '6' },
    customization: { partsCost: 'See ECD Systems Table', partsAvailability: 'See ECD Systems Table', equipmentRequired: 'Vehicle facility', baseTime: '16 hrs per level', skillTest: 'Electronics B/R (4)', cfConsumed: 'See ECD Systems Table', loadReduction: 'See ECD Systems Table', maxImprovement: '6' },
    note: 'Devices that feed sensors false information about target\'s range, position, and direction. More insidious than ECM; a sensor won\'t know it\'s being deceived. Restricted to security/military — almost impossible on streets. See Electronic Deception, p.32.',
  },

  {
    name: 'Electronics Ports',
    category: 'Electronic Systems',
    design: { dpCost: '10', cfConsumed: null, loadReduction: null, maxImprovement: null },
    customization: { partsCost: '1,000¥', partsAvailability: '3/6 days (1)', equipmentRequired: 'Vehicle shop', baseTime: '8 hrs', skillTest: 'Electronics B/R (3)', cfConsumed: null, loadReduction: null, maxImprovement: null },
    note: 'Required for electronic items unrelated to vehicle operations (radios, video cameras, surveillance measures, remote control decks). Allows these items to draw electrical power from the vehicle\'s power plant. Applicable devices may increase Flux ratings by half the vehicle\'s Body (round up). Automatically linked to vehicle\'s computer which acts as router. Does not consume CF or reduce Load; attached equipment might (see CF Requirements for Common Electronic Equipment table, p.146).',
  },

  {
    name: 'Magnetic-Anomaly Detector (MAD)',
    category: 'Electronic Systems',
    design: { dpCost: 'Sensor rating × 250', cfConsumed: '12', loadReduction: '50 kg', maxImprovement: null },
    customization: { partsCost: 'Sensor rating × 20,000¥', partsAvailability: '8/21 days (4.5)', equipmentRequired: 'Vehicle Facility', baseTime: '16 hrs', skillTest: 'Electronics (B/R) (8)', cfConsumed: '16', loadReduction: '50 kg', maxImprovement: null },
    note: 'Aircraft only (ships have too much iron). Detects underwater submarines by monitoring natural magnetic field effects of large iron-bearing boats. Only method other than sonar for detecting submerged submarines. To detect via MAD: make Sensor Perception Test (p.135, SR3) rolling dice equal to aircraft\'s Sensor rating against target number equal to sub\'s normal (not Sonar) Signature rating.',
  },

  {
    name: 'Over-the-Horizon Sensors (OTHS)',
    category: 'Electronic Systems',
    design: { dpCost: 'Sensor rating × 1,000', cfConsumed: '216', loadReduction: '2,500 kg', maxImprovement: null },
    customization: { partsCost: 'Sensor rating × 100,000¥', partsAvailability: '10/60 days (—)', equipmentRequired: 'Ship facility', baseTime: '40 hrs', skillTest: 'Electronics B/R (6)', cfConsumed: '216', loadReduction: '2,500 kg', maxImprovement: null },
    note: 'Ships only. Normal ship surface-scanning sensors limited to 35 km (earth\'s curvature). OTHS uses reflective/refractive optics to extend range of ship surface sensors to absolute maximum of 35 km. Ship with OTHS ignores the 35 km limitation for detecting surface contacts using onboard ship sensors. However, ship receives +3 modifier when making Detection Tests against surface targets beyond 35 km range (ray-bending technology degrades image quality).',
  },

  {
    name: 'Power Amplifiers',
    category: 'Electronic Systems',
    design: { dpCost: '5 per rating', cfConsumed: '0.25 per rating (round down)', loadReduction: '1 kg per rating', maxImprovement: '10' },
    customization: { partsCost: '250¥ per rating', partsAvailability: 'Rating ÷ (rating × 12) hrs (1.5)', equipmentRequired: null, baseTime: null, skillTest: null, cfConsumed: '0.25 per rating (round down)', loadReduction: '1 kg per rating', maxImprovement: '10' },
    note: 'Increase Flux ratings of sensors, ECM, ECCM, hardwired remote control decks, and other electronic transmission devices. Increased Flux rating increases effective range of remote-control deck and makes it more resistant to electronic warfare. See Electronic Warfare, p.35.',
  },

  {
    name: 'Remote-Control Encryption Module',
    category: 'Electronic Systems',
    design: { dpCost: 'Rating × 50', cfConsumed: null, loadReduction: null, maxImprovement: null },
    customization: { partsCost: 'Rating × 5,000¥', partsAvailability: 'Rating/rating days (3)', equipmentRequired: 'Electronics kit', baseTime: '1 hr', skillTest: 'Electronics B/R (4)', cfConsumed: null, loadReduction: null, maxImprovement: null },
    note: 'Works like the encryption module for remote-control decks (p.97): allows remotely controlled drones to decrypt signals from the rigger and scramble their own transmissions against signal interception. If a vehicle/drone is part of a remote-control network using an encryption module, the vehicle/drone must have a module to scramble its signals. A remote-control network always operates with an encryption rating equal to the rating of the lowest encryption module.',
  },

  {
    name: 'Retransmission Units',
    category: 'Electronic Systems',
    design: { dpCost: '250', cfConsumed: '1', loadReduction: '5 kg', maxImprovement: null },
    customization: { partsCost: '25,000¥', partsAvailability: '8/14 days (3)', equipmentRequired: 'Microtronics shop', baseTime: '64 hrs', skillTest: 'Electronics B/R (4)', cfConsumed: '1.5', loadReduction: '5 kg', maxImprovement: null },
    note: 'Receiver-transmitter that intercepts signals from a remote-control deck and relays them to other drones on a separate frequency. Two purposes: (1) increase effective range of remote-control deck; (2) provide extra defense against electronic warfare. A retrans unit has its own Flux rating. Any drone inside the retrans unit\'s range can receive commands from the main remote-control deck even if outside the deck\'s range. Additionally, a retrans unit can use its Flux as complementary dice to any MIlJ Tests made against the remote-control deck, applying only to drones within range of both the deck and the retrans unit. A retrans unit may be targeted for electronic warfare; any MIlJ results apply only to drones within the retrans unit\'s range. Base Flux: 0; additional Flux can be purchased by adding Power Amplifiers.',
  },

  {
    name: 'Sensors',
    category: 'Electronic Systems',
    design: { dpCost: 'See Sensor Systems Table', cfConsumed: '0.5 per rating (round up)', loadReduction: '1 kg per rating', maxImprovement: '10' },
    customization: { partsCost: 'See Sensor Systems Table', partsAvailability: 'See Sensor Systems Table', equipmentRequired: 'Vehicle shop', baseTime: '8 hrs', skillTest: 'Electronics B/R (4)', cfConsumed: '0.5 per rating (round up)', loadReduction: '1 kg per rating', maxImprovement: '10' },
    note: 'Standard and enhanced audio/video sensors, thermal and radar sensors, ultrasound sensors, identification, recognition, tracking software. See Sensor-Enhanced Gunnery (p.152, SR3) and Sensors (p.135, SR3). Higher-level sensors restricted to security/military — not available on street except from very well-connected fixers.',
  },

  {
    name: 'Sonar Systems',
    category: 'Electronic Systems',
    design: { dpCost: 'See Sonar Systems Table', cfConsumed: 'See Sonar Systems Table', loadReduction: 'See Sonar Systems Table', maxImprovement: null },
    customization: { partsCost: 'See Sonar Systems Table', partsAvailability: 'See Sonar Systems Table', equipmentRequired: 'Vehicle facility', baseTime: '40 hrs per level', skillTest: 'Electronics B/R (6)', cfConsumed: 'See Sonar Systems Table', loadReduction: 'See Sonar Systems Table', maxImprovement: null },
    note: 'Primary means for submarines to navigate underwater. Surface ships can also carry sonar to detect underwater hazards (reefs, sandbars, mines, submarines).',
  },

  {
    name: 'Towed-Array Sonar',
    category: 'Electronic Systems',
    design: { dpCost: 'Sonar rating × 1,000', cfConsumed: '125', loadReduction: '1,500 kg', maxImprovement: '6' },
    customization: { partsCost: 'Sonar rating × 100,000¥', partsAvailability: '10/45 days (4.5)', equipmentRequired: 'Ship facility', baseTime: '16 hrs', skillTest: 'Ship or Submarine B/R (6)', cfConsumed: '175', loadReduction: '1,500 kg', maxImprovement: '6' },
    note: 'Long cable with sophisticated microphones at strategic lengths. Allows ship to overcome sonar "blind spot" in the stern caused by propeller turbulence baffles. Additional benefit: improves passive sonar contact detection at medium/long ranges. Ship with towed-array sonar deployed gains an additional die when making Passive Sonar Detection Tests against contacts more than 15 km distant. Vulnerable to cable breaks during ship combat maneuvers: roll 2D6 each time a maneuver is made (GM discretion); on result of two 1s, the cable is cut.',
  },

];

// ── ECM / ECCM / ED / ECD SYSTEMS TABLES ─────────────────────────────────────
// CF Consumed*: first value = design; second value = customization.
// All specs refer to these tables for design/customization points and costs.

export const ECMTable = [
  { level: 1,  cfDesign:  0, cfCustom:  1, dpCost:     100, customCost:     '10,000¥', weightKg:   5, availability: '5/7 days',    streetIndex: 2.5 },
  { level: 2,  cfDesign:  1, cfCustom:  2, dpCost:     200, customCost:     '20,000¥', weightKg:  10, availability: '6/10 days',   streetIndex: 3   },
  { level: 3,  cfDesign:  2, cfCustom:  3, dpCost:     300, customCost:     '30,000¥', weightKg:  15, availability: '7/14 days',   streetIndex: 3.5 },
  { level: 4,  cfDesign:  2, cfCustom:  3, dpCost:     500, customCost:     '50,000¥', weightKg:  20, availability: '8/21 days',   streetIndex: 4   },
  { level: 5,  cfDesign:  3, cfCustom:  6, dpCost:     750, customCost:     '75,000¥', weightKg:  25, availability: '10/30 days',  streetIndex: null },
  { level: 6,  cfDesign:  4, cfCustom:  8, dpCost:   1_000, customCost:    '100,000¥', weightKg:  50, availability: '12/45 days',  streetIndex: null },
  { level: 7,  cfDesign:  6, cfCustom:  9, dpCost:   2_000, customCost:    '200,000¥', weightKg:  75, availability: '14/60 days',  streetIndex: null },
  { level: 8,  cfDesign: 10, cfCustom: 12, dpCost:   3_000, customCost:    '300,000¥', weightKg: 100, availability: '18/6 months', streetIndex: null },
  { level: 9,  cfDesign: 12, cfCustom: 16, dpCost:   5_000, customCost:    '500,000¥', weightKg: 150, availability: '18/6 months', streetIndex: null },
  { level: 10, cfDesign: 16, cfCustom: 20, dpCost:  10_000, customCost:  '1,000,000¥', weightKg: 250, availability: '20/1 year',   streetIndex: null },
];

export const ECCMTable = [
  { level: 1,  cfDesign:  0, cfCustom:  1, dpCost:    100, customCost:    '10,000¥', weightKg:   3, availability: '4/7 days',    streetIndex: 2   },
  { level: 2,  cfDesign:  1, cfCustom:  2, dpCost:    200, customCost:    '20,000¥', weightKg:   5, availability: '4/10 days',   streetIndex: 2.5 },
  { level: 3,  cfDesign:  2, cfCustom:  3, dpCost:    300, customCost:    '30,000¥', weightKg:   8, availability: '5/14 days',   streetIndex: 3   },
  { level: 4,  cfDesign:  2, cfCustom:  3, dpCost:    400, customCost:    '40,000¥', weightKg:  12, availability: '6/21 days',   streetIndex: 3.5 },
  { level: 5,  cfDesign:  3, cfCustom:  6, dpCost:    500, customCost:    '50,000¥', weightKg:  18, availability: '8/30 days',   streetIndex: null },
  { level: 6,  cfDesign:  4, cfCustom:  8, dpCost:    750, customCost:    '75,000¥', weightKg:  25, availability: '10/45 days',  streetIndex: null },
  { level: 7,  cfDesign:  6, cfCustom:  9, dpCost:  1_000, customCost:   '100,000¥', weightKg:  50, availability: '12/60 days',  streetIndex: null },
  { level: 8,  cfDesign: 10, cfCustom: 12, dpCost:  2_500, customCost:   '250,000¥', weightKg:  75, availability: '14/3 months', streetIndex: null },
  { level: 9,  cfDesign: 12, cfCustom: 16, dpCost:  3_000, customCost:   '300,000¥', weightKg: 150, availability: '16/6 months', streetIndex: null },
  { level: 10, cfDesign: 16, cfCustom: 20, dpCost:  5_000, customCost:   '500,000¥', weightKg: 150, availability: '18/1 year',   streetIndex: null },
];

export const EDTable = [
  { level: 1, cfDesign: 1, cfCustom: 2, dpCost:   150, customCost:   '15,000¥', weightKg: 10, availability: '8/30 days',   streetIndex: 3   },
  { level: 2, cfDesign: 2, cfCustom: 3, dpCost:   300, customCost:   '30,000¥', weightKg: 20, availability: '8/45 days',   streetIndex: 3.5 },
  { level: 3, cfDesign: 4, cfCustom: 5, dpCost:   500, customCost:   '50,000¥', weightKg: 30, availability: '8/60 days',   streetIndex: 4   },
  { level: 4, cfDesign: 5, cfCustom: 6, dpCost:   750, customCost:   '75,000¥', weightKg: 45, availability: '10/3 months', streetIndex: 4.5 },
  { level: 5, cfDesign: 6, cfCustom: 7, dpCost: 1_000, customCost:  '100,000¥', weightKg: 50, availability: '12/6 months', streetIndex: 5   },
  { level: 6, cfDesign: 8, cfCustom: 9, dpCost: 2_500, customCost:  '250,000¥', weightKg: 75, availability: '16/1 year',   streetIndex: null },
];

export const ECDTable = [
  { level: 1, cfDesign: 1, cfCustom: 2, dpCost:   100, customCost:   '10,000¥', weightKg: 25, availability: '8/30 days',   streetIndex: 3   },
  { level: 2, cfDesign: 2, cfCustom: 3, dpCost:   300, customCost:   '30,000¥', weightKg: 30, availability: '8/45 days',   streetIndex: 3.5 },
  { level: 3, cfDesign: 3, cfCustom: 4, dpCost:   500, customCost:   '50,000¥', weightKg: 35, availability: '8/60 days',   streetIndex: 4   },
  { level: 4, cfDesign: 4, cfCustom: 5, dpCost:   750, customCost:   '75,000¥', weightKg: 45, availability: '10/3 months', streetIndex: 4.5 },
  { level: 5, cfDesign: 5, cfCustom: 6, dpCost: 1_500, customCost:  '150,000¥', weightKg: 60, availability: '12/6 months', streetIndex: 5   },
  { level: 6, cfDesign: 6, cfCustom: 8, dpCost: 3_000, customCost:  '300,000¥', weightKg: 75, availability: '16/1 year',   streetIndex: null },
];

// ── SENSOR / SONAR SYSTEMS TABLES ─────────────────────────────────────────────
// CF Consumed*: first value = design; second value = customization.

export const SensorSystemsTable = [
  { level: 1,  cfDesign:  0, cfCustom:  1, dpCost:    50, customCost:    '5,000¥', weightKg:  12, availability: '4/7 days',    streetIndex: 2   },
  { level: 2,  cfDesign:  1, cfCustom:  2, dpCost:    75, customCost:    '7,500¥', weightKg:  20, availability: '4/10 days',   streetIndex: 2.5 },
  { level: 3,  cfDesign:  2, cfCustom:  3, dpCost:   100, customCost:   '10,000¥', weightKg:  25, availability: '5/14 days',   streetIndex: 3   },
  { level: 4,  cfDesign:  2, cfCustom:  3, dpCost:   125, customCost:   '12,500¥', weightKg:  35, availability: '6/21 days',   streetIndex: 3.5 },
  { level: 5,  cfDesign:  3, cfCustom:  6, dpCost:   150, customCost:   '15,000¥', weightKg:  50, availability: '8/30 days',   streetIndex: null },
  { level: 6,  cfDesign:  4, cfCustom:  8, dpCost:   200, customCost:   '20,000¥', weightKg:  75, availability: '10/45 days',  streetIndex: null },
  { level: 7,  cfDesign:  6, cfCustom:  9, dpCost:   300, customCost:   '30,000¥', weightKg: 110, availability: '12/60 days',  streetIndex: null },
  { level: 8,  cfDesign: 10, cfCustom: 12, dpCost:   500, customCost:   '50,000¥', weightKg: 150, availability: '14/3 months', streetIndex: null },
  { level: 9,  cfDesign: 12, cfCustom: 16, dpCost: 1_000, customCost:  '100,000¥', weightKg: 200, availability: '16/6 months', streetIndex: null },
  { level: 10, cfDesign: 16, cfCustom: 20, dpCost: 5_000, customCost:  '500,000¥', weightKg: 250, availability: '18/1 year',   streetIndex: null },
];

export const SonarSystemsTable = [
  { level: 1,  cfDesign:   4, cfCustom:   6, dpCost:     50, customCost:      '5,000¥', weightKg:    120, availability: '4/7 days',    streetIndex: 2   },
  { level: 2,  cfDesign:   6, cfCustom:   8, dpCost:    500, customCost:     '25,000¥', weightKg:    250, availability: '4/10 days',   streetIndex: 2.5 },
  { level: 3,  cfDesign:  10, cfCustom:  14, dpCost:  2_500, customCost:    '125,000¥', weightKg:    350, availability: '5/14 days',   streetIndex: 3   },
  { level: 4,  cfDesign:  16, cfCustom:  25, dpCost:  5_000, customCost:    '625,000¥', weightKg:    500, availability: '6/21 days',   streetIndex: 3.5 },
  { level: 5,  cfDesign:  50, cfCustom:  75, dpCost:  2_500, customCost:  '2,000,000¥', weightKg:    750, availability: '8/30 days',   streetIndex: null },
  { level: 6,  cfDesign:  75, cfCustom: 100, dpCost:  3_000, customCost:  '5,000,000¥', weightKg:  1_000, availability: '10/45 days',  streetIndex: null },
  { level: 7,  cfDesign: 100, cfCustom: 150, dpCost: 10_000, customCost: '15,000,000¥', weightKg:  1_250, availability: '12/60 days',  streetIndex: null },
  { level: 8,  cfDesign: 200, cfCustom: 300, dpCost: 15_000, customCost: '20,000,000¥', weightKg:  1_500, availability: '14/3 months', streetIndex: null },
  { level: 9,  cfDesign: 300, cfCustom: 500, dpCost: 25_000, customCost: '30,000,000¥', weightKg:  2_000, availability: '16/6 months', streetIndex: null },
  { level: 10, cfDesign: 500, cfCustom: 750, dpCost: 50_000, customCost: '50,000,000¥', weightKg:  2_500, availability: '18/1 year',   streetIndex: null },
];

// CF Requirements for Common Electronic Equipment (p.146)
export const CommonElectronicEquipmentCF = [
  { item: 'Video/Trideo Display',          cfRequired: '0.15 per 20 cm of screen size' },
  { item: 'Simsense Player',               cfRequired: '0.1'  },
  { item: 'Cellular Phone',               cfRequired: '0.05' },
  { item: 'Table Top Personal Computer (not including monitor)', cfRequired: '0.5' },
  { item: 'Computer Printer',             cfRequired: '0.25' },
  { item: 'Radio',                         cfRequired: '0.3 × Flux rating' },
  { item: 'Audio/Video/Trideo Recorder',  cfRequired: '0.25' },
  { item: 'Cyberdeck',                     cfRequired: '0.15' },
  { item: 'Remote Control Deck',          cfRequired: '0.25' },
  { item: 'BattleTac Master Component',   cfRequired: '0.6'  },
  { item: 'Tactical Communications Gear — Master Unit',      cfRequired: '2'   },
  { item: 'Tactical Communications Gear — Personal Comm Unit', cfRequired: '0.3 × Flux rating' },
  { item: 'Tactical Communications Gear — Microwave/Laser Link', cfRequired: '1' },
  { item: 'Satellite Dish — Standard Portable', cfRequired: '2'  },
  { item: 'Satellite Dish — Large Portable',    cfRequired: '6'  },
  { item: 'Satellite Dish — Fixed Base',        cfRequired: '20' },
];

// ── ACCESSORIES ───────────────────────────────────────────────────────────────
// Custom accessories for rigger vehicles (Rigger 3, pp.148-153).
// Note: Aircraft Drop Tank design specs were not captured in available pages;
// inline costs from text (8,000¥ per pair) and effects are noted below.

export const Accessories = [

  {
    name: 'Aircraft Drop Tanks',
    category: 'Accessories',
    design: {
      dpCost: null, // specs not captured in available page images
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    customization: {
      partsCost: '8,000¥ per pair',
      partsAvailability: null,
      equipmentRequired: null,
      baseTime: '10 minutes (mounting)',
      skillTest: null,
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    note: 'Aircraft only. Attached under wings or fuselage in lieu of rocket/missile mounts. For every 2 external mounts sacrificed, 1 pair of drop tanks may be added (always in pairs for aerodynamic balance). Each pair holds 1,000 liters of fuel (+2,000 liters aircraft fuel supply). Each additional pair beyond the first: Speed −15, Signature −1, Handling −1. Drop tanks have Body 1 and 3 Armor Points. Pilot may jettison via Complex Action; aircraft immediately returns to standard values.',
  },

  {
    name: 'Amphibious Operation Packages',
    category: 'Accessories',
    design: {
      dpCost: '25 (Level 1), 80 (Level 2), 200 (Level 3)',
      cfConsumed: '0 CF (Levels 1 and 2), 2 CF (Level 3)',
      loadReduction: null,
      maxImprovement: '3',
    },
    customization: {
      partsCost: '2,500¥ (Level 1), 7,500¥ (Level 2), 15,000¥ (Level 3)',
      partsAvailability: 'Level 1: 3/6 days (1) | Level 2: 5/10 days (1.25) | Level 3: 6/12 days (1.5)',
      equipmentRequired: 'Vehicle facility',
      baseTime: 'Level 1: 32 hrs | Level 2: 40 hrs | Level 3: 80 hrs',
      skillTest: 'Level 1: Appropriate Vehicle B/R (4) | Level 2: Appropriate Vehicle B/R (5) | Level 3: Appropriate Vehicle B/R (6)',
      cfConsumed: '0 CF (Level 1), 2 CF (Level 2), 4 CF (Level 3)',
      loadReduction: null,
      maxImprovement: '3',
    },
    note: 'Ground vehicles only. Level 1: uses vehicle\'s wheels as motive power; Speed 15 m/turn on water, +2 Handling modifier. Level 2: propeller or drive system linked to vehicle\'s drive; Speed 30 on water, no Handling modifier. Level 3: water-jet units and impellers linked to drive system; Speed 45 on water, no Handling modifier. Speeds apply only when afloat and treading water — if touching ground, travel at Off-Road speed. Submarine operations require sealed power plant (EnviroSeal, p.132).',
  },

  {
    name: 'Anti-Theft Systems (Improved Security)',
    category: 'Accessories',
    design: {
      dpCost: 'Ratings 3–6: 4 points per rating | Ratings 7–9: 10 points per rating | Ratings 10+: 50 points per rating | Electric Shock System: +20 points | Proximity Alert: +2 points',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: '10',
    },
    customization: {
      partsCost: 'Ratings 3–6: 400¥/rating | Ratings 7–9: 1,000¥/rating | Ratings 10+: 5,000¥/rating | Electric Shock System: +2,000¥ | Proximity Alert: +250¥',
      partsAvailability: 'Ratings 3–6: 4/7 days (1.25) | Ratings 7–9: 5/10 days (1.5) | Ratings 10+: 6/14 days (2)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '40 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: '10',
    },
    note: 'All vehicles come with built-in maglocks (Rating 2, keypad/cardreader/fingerprint scanner). This mod improves rating to 3–10, used as rating for all vehicle maglocks and other security features. Optional add-ons: Electric Shock System (ripples electrical current through outer shell — same damage as Defiance Super Shock Taser, 10S Stun); Proximity Alert (sensors scan for approaching persons without a proper identifier — audible warning, then linked alarm/electric shock). Explosion: can set anti-theft system to destroy vehicle with plastic explosives (Compound IV or XII) when triggered — damage Power = square of Body or Armor (whichever higher); reduce damage by half Body/Armor for passengers/cargo/bystanders; +1 per meter distance.',
  },

  {
    name: 'Ejection Bucket Seats',
    category: 'Accessories',
    design: {
      dpCost: '35 (Standard), 70 (Reinforced)',
      cfConsumed: '6',
      loadReduction: '100 kg (Standard), 250 kg (Reinforced)',
      maxImprovement: null,
    },
    customization: {
      partsCost: '3,000¥ (Standard), 6,000¥ (Reinforced)',
      partsAvailability: '5/10 days (2)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '16 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: '7',
      loadReduction: '110 kg (Standard), 250 kg (Reinforced)',
      maxImprovement: null,
    },
    note: 'Standard or armored bucket seat (see Seats, p.153) with small solid-fuel rocket and rudimentary stabilization systems. Ejection-activation controls may be included on or near the seat (or elsewhere) at time of installation. Includes a parasail that deploys on ejection and brings chair and occupant safely to the ground, assuming the occupant is securely strapped in. Reinforced ejection bucket seats also available for large orks, trolls and other large metahumans — double costs.',
  },

  {
    name: 'Convertible Tops',
    category: 'Accessories',
    design: {
      dpCost: '0',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    customization: {
      partsCost: '(Vehicle cost × 0.1) + 2,500¥',
      partsAvailability: '4/72 hrs (1)',
      equipmentRequired: 'Vehicle shop',
      baseTime: '24 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    note: 'Vehicles with hard tops that do not have gull-wing or canopy access only. Replaces hard-top roof with a folding canopy that can be extended or retracted on command. If a roll bar is not installed, double the target number for any passenger Damage Resistance Test following a crash. Rag-tops do not provide vehicle protection to passengers from side, rear, or top attacks.',
  },

  {
    name: 'Cranes',
    category: 'Accessories',
    cranCapacityTable: [
      { bodyRating: 1,   maxLoadKg:       25 },
      { bodyRating: 2,   maxLoadKg:      200 },
      { bodyRating: 3,   maxLoadKg:      750 },
      { bodyRating: 4,   maxLoadKg:    2_000 },
      { bodyRating: 5,   maxLoadKg:    5_000 },
      { bodyRating: 6,   maxLoadKg:   20_000 },
      { bodyRating: 7,   maxLoadKg:   30_000 },
      { bodyRating: 8,   maxLoadKg:   45_000 },
      { bodyRating: 9,   maxLoadKg:   60_000 },
      { bodyRating: '10+', maxLoadKg: 'Body × Body × 750 kg' },
    ],
    design: {
      dpCost: "Crane's Load rating ÷ 50",
      cfConsumed: '15',
      loadReduction: 'Body × 80 kg',
      maxImprovement: 'See Crane Capacity Table',
    },
    customization: {
      partsCost: "Crane's Load rating × 2¥",
      partsAvailability: '6/14 days (2)',
      equipmentRequired: 'Vehicle facility',
      baseTime: 'Body × 16 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: '35',
      loadReduction: 'Body × 80 kg',
      maxImprovement: 'See Crane Capacity Table',
    },
    note: 'Hydraulic-powered mechanical boom. Vehicle must be stationary and immobilized with supplied chocks. Not available for Body 0 vehicles. Crane has its own Load rating (max per Crane Capacity Table). When used to pull or tow while moving, towing maximum is the lower of vehicle\'s or crane\'s Load rating. See Lifting and Pulling Objects, p.64.',
  },

  {
    name: 'Drone Racks',
    category: 'Accessories',
    design: {
      dpCost: 'Body × 12',
      cfConsumed: 'Amount needed to store drones (see p.62)',
      loadReduction: '45 kg',
      maxImprovement: null,
    },
    customization: {
      partsCost: '(Vehicle cost × 0.1) + 2,500¥',
      partsAvailability: '4/96 hrs (2)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '8 hrs per Body point',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: 'Amount needed to store drones + 2 CF',
      loadReduction: '45 kg',
      maxImprovement: null,
    },
    note: 'Hardware cradle that holds drone, moves it into launch position, and releases it. Can launch airborne drones from moving vehicles and recover launched drones while vehicle is moving. Launching from rack: two separate actions (first to activate rack, second to launch drone). Drone considered to be moving at current vehicle speed or drone\'s stall speed, whichever is greater. Rotorcraft drones from stationary vehicles launch in hover mode. Recovery: driver Handling Test + controller Free Action; if either fails, drone has not been recovered — if both fail, drone crashes into vehicle. Also serves as enclosed mini-hangar protecting drones inside. Same Armor rating as vehicle, but only one-half vehicle\'s Body (round down).',
  },

  {
    name: 'External Cargo Mounts',
    category: 'Accessories',
    design: {
      dpCost: null,
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
      note: 'May NOT be added during the design process.',
    },
    customization: {
      partsCost: '250¥ per CF that the mount will hold',
      partsAvailability: '3/24 hrs (1)',
      equipmentRequired: 'Vehicle shop',
      baseTime: '8 hrs',
      skillTest: 'Appropriate Vehicle B/R (3)',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: 'Original internal cargo space',
    },
    note: 'Roof racks, externally mounted side cargo-boxes on motorcycles, etc. Require no CF allocation. When loaded, vehicle Handling increases by 1. Maximum cargo capacity of external mounts = vehicle\'s original internal cargo capacity. Cannot be added during vehicle design.',
  },

  {
    name: 'Flotation Packages (Aircraft)',
    category: 'Accessories',
    design: {
      dpCost: 'Chassis point value × 1.2',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    customization: {
      partsCost: '(Vehicle cost × 0.1) + 2,500¥',
      partsAvailability: '4/7 days (2)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '32 hrs',
      skillTest: 'Appropriate Vehicle B/R (3)',
      cfConsumed: null,
      loadReduction: '100 kg',
      maxImprovement: null,
    },
    note: 'Any aircraft or helicopter may be fitted with floats for amphibious operations. Adding floats increases aircraft\'s Economy (multiply initial Economy × 1.2) and reduces Speed by half. For helicopters: multiply initial Speed rating by 0.9, round down. Float-equipped helicopters can still touch down on land. Float-equipped aircraft cannot touch down on land.',
  },

  {
    name: 'Generator',
    category: 'Accessories',
    design: {
      dpCost: 'Chassis cost ÷ 4',
      cfConsumed: 'Starting CF ÷ 3',
      loadReduction: 'Starting Load ÷ 2',
      maxImprovement: null,
    },
    customization: {
      partsCost: 'Chassis cost ÷ 4',
      partsAvailability: '5/7 days (1)',
      equipmentRequired: 'Vehicle shop',
      baseTime: '16 hrs',
      skillTest: 'Appropriate Vehicle B/R (4)',
      cfConsumed: 'Starting CF ÷ 3',
      loadReduction: 'Starting Load ÷ 2',
      maxImprovement: null,
    },
    note: 'Trailers, barges, and rail cars only. Provides power for design options or modifications that require power. GM should exercise common sense in determining which modifications require power.',
  },

  {
    name: 'Hovercraft Water Seals',
    category: 'Accessories',
    design: {
      dpCost: 'Body × 5',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    customization: {
      partsCost: 'Body × 500¥',
      partsAvailability: '4/96 hrs (1)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '32 hrs',
      skillTest: 'Appropriate Vehicle B/R (3)',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    note: 'Hovercraft only. Makes hovercraft chassis watertight, enabling craft to float if engine fails or is deliberately turned off while moving over water. Without this, a hovercraft that loses power on a body of water sinks within 30 minutes.',
  },

  {
    name: 'Mechanical Arms',
    category: 'Accessories',
    design: {
      dpCost: 'Body × 100; Strength Enhancement (1–3 pts): 60 × Body per point; Strength Enhancement (4+ pts): 75 × Body per point',
      cfConsumed: '2',
      loadReduction: 'Strength × 10 kg',
      maxImprovement: null,
    },
    customization: {
      partsCost: 'Body × 10,000¥; Strength Enhancement (1–3 pts): 5,000 × Body per point; Strength Enhancement (4+ pts): 6,000 × Body per point',
      partsAvailability: '4/4 days (1)',
      equipmentRequired: 'Vehicle facility',
      baseTime: '40 hrs',
      skillTest: 'Cybertechnology B/R (6)',
      cfConsumed: '4',
      loadReduction: 'Strength × 10 kg',
      maxImprovement: null,
    },
    note: 'Articulated mechanical arms — not as strong as cranes but superior dexterity. Strength rating = vehicle\'s Body rating × 2 (squared). Can lift weight equal to Strength rating × 20 kg. Strength may be increased with Strength Enhancement option (max never exceeds Body × 10). Increasing Strength also increases Load reduction, limiting maximum Strength enhancement. Can use any accessory or feature available on cyberarms except Strength or Quickness enhancements (pp.33–34, M&M). Limb accessory for mechanical arm costs half as much as standard cyberarm version, same Availability and Street Index. GM has final say on type and number of modifications.',
  },

  {
    name: 'Medical Clinic',
    category: 'Accessories',
    design: {
      dpCost: '(Rating + 4)³ × 3',
      cfConsumed: 'Rating × 2',
      loadReduction: 'Rating × 75 kg',
      maxImprovement: '6',
    },
    customization: {
      partsCost: '(Rating + 4)³ × 800¥',
      partsAvailability: '(Rating + 3)/(Rating × 2) days (3)',
      equipmentRequired: 'Vehicle shop, Electronics shop',
      baseTime: 'Rating days',
      skillTest: 'Appropriate Vehicle B/R; Electronics B/R',
      targetNumber: 'Rating',
      cfConsumed: 'Rating × 3',
      loadReduction: 'Rating × 100 kg',
      maxImprovement: '6',
    },
    note: 'Complete assortment of medical gear: emergency diagnostic electronics, biomonitors, pressurized oxygen tanks, breathing masks, stabilization unit (p.305, SR3), and controlled drugs and compounds. Equivalent of a medical shop (p.138, SR3). Number of patients dictated by amount of People Space in vehicle (p.120). Primarily used by ambulances and other emergency medical vehicles.',
  },

  {
    name: 'Photovoltaic Chameleon Paint',
    category: 'Accessories',
    design: {
      dpCost: '50',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    customization: {
      partsCost: '5,000¥',
      partsAvailability: '6/14 days (1.5)',
      equipmentRequired: 'Vehicle shop',
      baseTime: '72 hrs',
      skillTest: 'Electronics (6)',
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    note: 'Allows pigmentation and pattern of vehicle\'s paint to be altered via onboard computer program. User can select a particular color and pattern for each segment of the mesh grid. Changing color: minimum one Complex Action (may take significantly longer for detailed patterns or color combinations). Does NOT allow vehicle to blend into surroundings like ruthenium polymers — incompatible with ruthenium, smart armor systems, ablative armor, and radar-absorbing materials.',
  },

  {
    name: 'Seats — Bench Seat',
    category: 'Accessories',
    design: { dpCost: null, cfConsumed: null, loadReduction: null, maxImprovement: null },
    customization: {
      partsCost: null,
      partsAvailability: null,
      equipmentRequired: null,
      baseTime: null,
      skillTest: null,
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    note: 'Popular in compact vehicles and space-premium vehicles. Seats 2 human-sized passengers (3 if cramped) or 200 kg. Not available for motorcycles. Removing a bench seat frees up 6 CF and increases available Load by 200 kg (reflects vehicle now carrying fewer passengers, so more power free for hauling cargo). Folding bench seats common in limousines — freed CF can be used for cargo (weighing up to 150 kg) when folded bench seat is folded.',
  },

  {
    name: 'Seats — Bucket Seat',
    category: 'Accessories',
    design: { dpCost: null, cfConsumed: null, loadReduction: null, maxImprovement: null },
    customization: {
      partsCost: null,
      partsAvailability: null,
      equipmentRequired: null,
      baseTime: null,
      skillTest: null,
      cfConsumed: null,
      loadReduction: null,
      maxImprovement: null,
    },
    note: 'Holds a single person in greater comfort than a standard bench seat. Removing a bucket seat frees up 6 CF and increases available Load by 100 kg (vehicle now carries one less 100-kg passenger). Options: Armored Seats (bench or bucket may be armored to protect against incoming fire that penetrates the vehicle — armoring on bench seats protects against attacks from rear only; up to 2 points of Armor may be installed on a bench seat). Reinforced Seats (support larger orks, trolls, large metahumans — reinforced bench seat: up to 300 kg; reinforced bucket seat: up to 250 kg; cost an additional 100¥ for every additional 25 kg of support capacity).',
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
  turretsTable: TurretsTable,
  remoteTurretsTable: RemoteTurretsTable,
  electronicSystems: ElectronicSystems,
  ecmTable: ECMTable,
  eccmTable: ECCMTable,
  edTable: EDTable,
  ecdTable: ECDTable,
  sensorSystemsTable: SensorSystemsTable,
  sonarSystemsTable: SonarSystemsTable,
  commonElectronicEquipmentCF: CommonElectronicEquipmentCF,
  accessories: Accessories,
};

export default Rigger3Mods;
