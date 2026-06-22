// Rigger 3 Power Plant Table — extracted from pp.194-199
// Columns: loadStart, loadMax, speedStart, speedMax, accelStart, accelMax,
//          sig, fuel, econStart, econMax, dp, peopleSpace (optional)
// Ships: speed shown as "surface(sustained)" e.g. "30(15)" — recorded as speedSurface/speedSustained
// Subs: speed shown as surface/submerged pairs
// Fuel unit: km/PF (non-electric) or km/l (electric)

const Rigger3PowerPlants = {

  // ── BATTERY ──────────────────────────────────────────────────────────────

  battery: {
    bikes: [
      { chassis: 'Chopper & ATVs', loadStart: 80,  loadMax: 220, speedStart: 50, speedMax: 125, accelStart: 4, accelMax: 9,  sig: 4, fuel: 60,  econStart: 0.25, econMax: 1,   dp: 63 },
      { chassis: 'Off-Road',        loadStart: 100, loadMax: 150, speedStart: 40, speedMax: 120, accelStart: 4, accelMax: 8,  sig: 5, fuel: 40,  econStart: 0.25, econMax: 1,   dp: 60 },
      { chassis: 'Racing Cycle',    loadStart: 80,  loadMax: 200, speedStart: 40, speedMax: 120, accelStart: 6, accelMax: 18, sig: 5, fuel: 35,  econStart: 0.25, econMax: 1,   dp: 92 },
      { chassis: 'Scooter',         loadStart: 55,  loadMax: 100, speedStart: 50, speedMax: 100, accelStart: 4, accelMax: 8,  sig: 5, fuel: 40,  econStart: 0.25, econMax: 1,   dp: 60 },
    ],
    boats: [
      { chassis: 'Skiff',         loadStart: 115, loadMax: 400,  speedStart: 40, speedMax: 60,  accelStart: 4, accelMax: 6,  sig: 5, fuel: 75,  econStart: 0.75, econMax: 2.5, dp: 20 },
      { chassis: 'Water Scooter', loadStart: 15,  loadMax: 125,  speedStart: 30, speedMax: 60,  accelStart: 3, accelMax: 6,  sig: 5, fuel: 50,  econStart: 0.5,  econMax: 2,   dp: 18 },
      { chassis: 'All Others',    loadStart: '30xB', loadMax: '100xB', speedStart: 30, speedMax: 55, accelStart: 2, accelMax: 5, sig: 5, fuel: 40, econStart: 0.4, econMax: 2, dp: '8xB' },
    ],
    cars: [
      { chassis: 'Crawler, Micro',                     loadStart: 0,      loadMax: 4,         speedStart: 5,  speedMax: 40,  accelStart: 1, accelMax: 4,  sig: 12, fuel: 4,   econStart: 0.5,  econMax: 2,   dp: 108 },
      { chassis: 'Crawler, Tracked (Small & Medium)',  loadStart: '5xB',  loadMax: '250xB',   speedStart: 10, speedMax: 80,  accelStart: 2, accelMax: 6,  sig: '9-B', fuel: '5+(35xB)', econStart: 0.75, econMax: 2.25, dp: '15xB' },
      { chassis: 'Crawler, Wheeled (Small & Medium)',  loadStart: '5xB',  loadMax: '150xB',   speedStart: 10, speedMax: 100, accelStart: 2, accelMax: 7,  sig: '9-B', fuel: '5+(35xB)', econStart: 0.75, econMax: 2.25, dp: '15xB' },
      { chassis: 'Industrial Mover, Heavy',            loadStart: 750,    loadMax: 3000,      speedStart: 5,  speedMax: 15,  accelStart: 1, accelMax: 3,  sig: 5,  fuel: 200, econStart: 0.2,  econMax: 1,   dp: 25 },
      { chassis: 'Industrial Mover, Light',            loadStart: 200,    loadMax: 800,       speedStart: 5,  speedMax: 35,  accelStart: 1, accelMax: 6,  sig: 6,  fuel: 200, econStart: 0.25, econMax: 1.5, dp: 15 },
      { chassis: 'Industrial Mover, Medium',           loadStart: 400,    loadMax: 1600,      speedStart: 5,  speedMax: 25,  accelStart: 1, accelMax: 4,  sig: 5,  fuel: 200, econStart: 0.2,  econMax: 1,   dp: 20 },
      { chassis: 'Sand Buggy',      loadStart: 30,  loadMax: 300,  speedStart: 60, speedMax: 100, accelStart: 4,  accelMax: 9,  sig: 5, fuel: 150, econStart: 1,    econMax: 2.5, dp: 10 },
      { chassis: 'Sedan',           loadStart: 50,  loadMax: 350,  speedStart: 75, speedMax: 100, accelStart: 4,  accelMax: 9,  sig: 5, fuel: 200, econStart: 0.5,  econMax: 2.5, dp: 15 },
      { chassis: 'Subcompact',      loadStart: 40,  loadMax: 160,  speedStart: 60, speedMax: 120, accelStart: 4,  accelMax: 10, sig: 5, fuel: 150, econStart: 1.25, econMax: 2.5, dp: 10 },
      { chassis: 'All Others',      loadStart: '15xB', loadMax: '100xB', speedStart: 60, speedMax: 90, accelStart: '6-B', accelMax: '10-B', sig: 5, fuel: '30xB', econStart: 0.4, econMax: 2, dp: '5+(5xB)' },
    ],
    fixedWingAircraft: [
      { chassis: 'UAV, Small', loadStart: 0, loadMax: 50, speedStart: '20/60', speedMax: '20/125', accelStart: 5, accelMax: 8, sig: 10, fuel: 50, econStart: 0.5, econMax: 1, dp: 10 },
    ],
    hovercraft: [
      { chassis: 'Skimmer (Both Sizes)', loadStart: '5xB', loadMax: '300xB', speedStart: 90, speedMax: 225, accelStart: 6, accelMax: 15, sig: '8-B', fuel: 120, econStart: 0.4, econMax: 1.6, dp: '10+(10xB)' },
    ],
    rotorCraft: [
      { chassis: 'Tilt-wing UAV, Small & Medium', loadStart: 5,  loadMax: 125,  speedStart: 35, speedMax: 90,  accelStart: 3, accelMax: 12, sig: '9-B', fuel: 50,  econStart: 0.2, econMax: 1.2, dp: '25xB' },
      { chassis: 'UAV, Micro',                    loadStart: 0,  loadMax: 3,    speedStart: 10, speedMax: 25,  accelStart: 3, accelMax: 8,  sig: 12,   fuel: 4,   econStart: 0.25, econMax: 1.25, dp: 15 },
      { chassis: 'UAV, Small & Medium',           loadStart: 5,  loadMax: 125,  speedStart: 35, speedMax: 90,  accelStart: 3, accelMax: 12, sig: '9-B', fuel: 50,  econStart: 0.2, econMax: 0.5, dp: '25xB' },
    ],
    submarines: [
      { chassis: 'Attack Submarine',       speedSurface: '8/8', speedSubmerged: '8/8', sig: '8/8', fuel: 20000, econStart: 0.1,  econMax: 0.25, dp: 65000,  peopleSpace: '+236,250' },
      { chassis: 'Boomer',                 speedSurface: '8/8', speedSubmerged: '8/8', sig: '8/8', fuel: 20000, econStart: 0.05, econMax: 0.15, dp: 105000, peopleSpace: '+236,250' },
      { chassis: 'Commercial Sub, Heavy',  speedSurface: '8/8', speedSubmerged: '8/8', sig: '8/8', fuel: 10000, econStart: 0.1,  econMax: 0.25, dp: 60000,  peopleSpace: '+36,000' },
    ],
    specialVehicles: [
      { chassis: 'Mini-blimp',        loadStart: 2,    loadMax: 100,  speedStart: 40, speedMax: 75,  accelStart: 1, accelMax: 5, sig: 10, fuel: 15,   econStart: 5,    econMax: 10,  dp: 20 },
      { chassis: 'Walker, Micro',     loadStart: 0,    loadMax: 100,  speedStart: 10, speedMax: 50,  accelStart: 2, accelMax: 8, sig: 12, fuel: 125,  econStart: 0.5,  econMax: 4,   dp: 2 },
      { chassis: 'Walker, Small',     loadStart: 5,    loadMax: 25,   speedStart: 2,  speedMax: 15,  accelStart: null, accelMax: null, sig: 8, fuel: 40,  econStart: 0.5, econMax: 2, dp: 80 },
      { chassis: 'Walker, Medium',    loadStart: 25,   loadMax: 125,  speedStart: 10, speedMax: 40,  accelStart: null, accelMax: null, sig: 7, fuel: 50,  econStart: 0.5, econMax: 2, dp: 120 },
      { chassis: 'Walker, Large',     loadStart: 100,  loadMax: 500,  speedStart: 10, speedMax: 50,  accelStart: null, accelMax: null, sig: 5, fuel: 75,  econStart: 0.5, econMax: 1.5, dp: 200 },
      { chassis: 'Walker, Extra-Large', loadStart: 100, loadMax: 750, speedStart: 10, speedMax: 60,  accelStart: null, accelMax: null, sig: 5, fuel: 125, econStart: 1,   econMax: 1.5, dp: 150 },
      { chassis: 'Zeppelin',          loadStart: 1000, loadMax: 2400, speedStart: 40, speedMax: 125, accelStart: 1, accelMax: 9, sig: 5, fuel: 1000, econStart: 0.25, econMax: 1, dp: 900 },
    ],
  },

  // ── CHEMICAL ROCKETS ─────────────────────────────────────────────────────

  chemicalRockets: {
    specialVehicles: [
      { chassis: 'Semiballistic', loadStart: 8000,  loadMax: 15000, speedStart: 200, speedMax: 750, speedAlt: '200/1500', accelStart: 40, accelMax: 60, sig: 2, fuel: 50000, econStart: 0.01, econMax: 0.02, dp: 250000 },
      { chassis: 'Suborbital',    loadStart: 10000, loadMax: 20000, speedStart: 150, speedMax: 750, speedAlt: '150/2000', accelStart: 80, accelMax: 240, sig: 2, fuel: 80000, econStart: 0.01, econMax: 0.025, dp: 50000 },
    ],
  },

  // ── DIESEL ───────────────────────────────────────────────────────────────

  diesel: {
    boats: [
      { chassis: 'Skiff',        loadStart: 300, loadMax: 750,   speedStart: 45, speedMax: 100, accelStart: 5,  accelMax: 9,  sig: 3, fuel: 20,  econStart: 5,   econMax: 10, dp: 35 },
      { chassis: 'Speedboat',    loadStart: 40,  loadMax: 1000,  speedStart: 80, speedMax: 275, accelStart: 12, accelMax: 24, sig: 2, fuel: 100, econStart: 2,   econMax: 6,  dp: 35 },
      { chassis: 'Sport Cruiser',loadStart: 500, loadMax: 2500,  speedStart: 30, speedMax: 100, accelStart: 4,  accelMax: 9,  sig: 2, fuel: 200, econStart: 2,   econMax: 6,  dp: 48 },
      { chassis: 'Yacht',        loadStart: 600, loadMax: 3500,  speedStart: 30, speedMax: 100, accelStart: 4,  accelMax: 6,  sig: 2, fuel: 200, econStart: 2,   econMax: 6,  dp: 80, peopleSpace: '+1,500' },
    ],
    cars: [
      { chassis: 'APC, Tracked',           loadStart: 3000,  loadMax: 7500,   speedStart: 55,  speedMax: 80,  accelStart: 5,  accelMax: 8,  sig: 2, fuel: 200, econStart: 2,   econMax: 4,   dp: 400 },
      { chassis: 'APC, Wheeled',           loadStart: 2000,  loadMax: 6000,   speedStart: 60,  speedMax: 120, accelStart: 5,  accelMax: 8,  sig: 2, fuel: 250, econStart: 2.5, econMax: 5,   dp: 350 },
      { chassis: 'Caterpillar, Heavy',     loadStart: 10000, loadMax: 25000,  speedStart: 5,   speedMax: 50,  accelStart: 1,  accelMax: 5,  sig: 2, fuel: 800, econStart: 0.5, econMax: 1.5, dp: 400 },
      { chassis: 'Caterpillar, Light',     loadStart: 400,   loadMax: 5000,   speedStart: 5,   speedMax: 80,  accelStart: 1,  accelMax: 5,  sig: 2, fuel: 300, econStart: 1,   econMax: 2,   dp: 150 },
      { chassis: 'Caterpillar, Medium',    loadStart: 5000,  loadMax: 10000,  speedStart: 5,   speedMax: 55,  accelStart: 1,  accelMax: 4,  sig: 2, fuel: 600, econStart: 1,   econMax: 2.5, dp: 250 },
      { chassis: 'Caterpillar, Miniature', loadStart: 1000,  loadMax: 2000,   speedStart: 5,   speedMax: 60,  accelStart: 1,  accelMax: 5,  sig: 2, fuel: 150, econStart: 2.5, econMax: 5,   dp: 75 },
      { chassis: 'Industrial Mover, Heavy',  loadStart: 1200, loadMax: 4000,  speedStart: 5,   speedMax: 30,  accelStart: 1,  accelMax: 6,  sig: 2, fuel: 45,  econStart: 3,   econMax: 6,   dp: 35 },
      { chassis: 'Industrial Mover, Light',  loadStart: 400,  loadMax: 1500,  speedStart: 5,   speedMax: 40,  accelStart: 1,  accelMax: 6,  sig: 2, fuel: 20,  econStart: 3,   econMax: 6,   dp: 25 },
      { chassis: 'Industrial Mover, Medium', loadStart: 750,  loadMax: 3000,  speedStart: 5,   speedMax: 35,  accelStart: 1,  accelMax: 6,  sig: 2, fuel: 30,  econStart: 3,   econMax: 6,   dp: 30 },
      { chassis: 'Limousine',      loadStart: 180,   loadMax: 900,    speedStart: 80,  speedMax: 140, accelStart: 8,  accelMax: 12, sig: 2, fuel: 60,  econStart: 6,   econMax: 10,  dp: 65 },
      { chassis: 'RV',             loadStart: 1000,  loadMax: 3000,   speedStart: 80,  speedMax: 150, accelStart: 4,  accelMax: 9,  sig: 2, fuel: 100, econStart: 4,   econMax: 8,   dp: 35, peopleSpace: '+300' },
      { chassis: 'Sports Car',     loadStart: 40,    loadMax: 260,    speedStart: 240, speedMax: 400, accelStart: 18, accelMax: 32, sig: 2, fuel: 60,  econStart: 6,   econMax: 10,  dp: 90 },
      { chassis: 'SUV',            loadStart: 400,   loadMax: 2000,   speedStart: 100, speedMax: 200, accelStart: 7,  accelMax: 12, sig: 2, fuel: 100, econStart: 6,   econMax: 9,   dp: 35 },
      { chassis: 'Van',            loadStart: 1000,  loadMax: 3000,   speedStart: 80,  speedMax: 175, accelStart: 4,  accelMax: 7,  sig: 2, fuel: 95,  econStart: 4,   econMax: 8,   dp: 35 },
      { chassis: 'Tractor',        loadStart: 7500,  loadMax: 20000,  speedStart: 60,  speedMax: 120, accelStart: 4,  accelMax: 4,  sig: 2, fuel: 400, econStart: 3,   econMax: 6,   dp: 80 },
      { chassis: 'Transport, Medium', loadStart: 2000, loadMax: 5000, speedStart: 65,  speedMax: 130, accelStart: 3,  accelMax: 6,  sig: 2, fuel: 250, econStart: 4,   econMax: 8,   dp: 80 },
      { chassis: 'Transport, Heavy',  loadStart: 6000, loadMax: 12000,speedStart: 60,  speedMax: 120, accelStart: 3,  accelMax: 5,  sig: 2, fuel: 500, econStart: 3,   econMax: 6,   dp: 140 },
    ],
    hovercraft: [
      { chassis: 'Hovercraft, Heavy',  loadStart: 1000, loadMax: 5000, speedStart: 90, speedMax: 150, accelStart: 5, accelMax: 10, sig: 2, fuel: 400, econStart: 0.5,  econMax: 2.5, dp: 175 },
      { chassis: 'Hovercraft, Light',  loadStart: 80,   loadMax: 800,  speedStart: 90, speedMax: 150, accelStart: 5, accelMax: 10, sig: 2, fuel: 100, econStart: 0.5,  econMax: 2.5, dp: 50 },
      { chassis: 'Hovercraft, Medium', loadStart: 750,  loadMax: 2500, speedStart: 90, speedMax: 150, accelStart: 5, accelMax: 10, sig: 2, fuel: 400, econStart: 0.5,  econMax: 2.5, dp: 50 },
      { chassis: 'Skimmer, Medium',    loadStart: 25,   loadMax: 400,  speedStart: 90, speedMax: 180, accelStart: 6, accelMax: 15, sig: 2, fuel: 25,  econStart: 0.25, econMax: 1,   dp: 35 },
      { chassis: 'Skimmer, Small',     loadStart: 10,   loadMax: 250,  speedStart: 90, speedMax: 180, accelStart: 8, accelMax: 20, sig: 5, fuel: 25,  econStart: 0.5,  econMax: 1,   dp: 80 },
    ],
    ships: [
      { chassis: 'Aircraft Carrier, Heavy',  loadStart: 1500000,    loadMax: 30000000,   speedSurface: '25(15)', speedMax: '45(25)', accelStart: 2, accelMax: 4, sig: '2/2', fuel: 400000, econStart: 0.1,  econMax: 0.2,  dp: 1000000, peopleSpace: '+14,700,000' },
      { chassis: 'Aircraft Carrier, Light',  loadStart: 750000,     loadMax: 12000000,   speedSurface: '30(15)', speedMax: '45(25)', accelStart: 2, accelMax: 5, sig: '2/2', fuel: 100000, econStart: 0.2,  econMax: 0.4,  dp: 200000,  peopleSpace: '-5,925,000' },
      { chassis: 'Aircraft Carrier, Medium', loadStart: 1000000,    loadMax: 15000000,   speedSurface: '25(15)', speedMax: '45(25)', accelStart: 2, accelMax: 4, sig: '2/2', fuel: 200000, econStart: 0.15, econMax: 0.2,  dp: 500000,  peopleSpace: '-8,850,000' },
      { chassis: 'Corvette',                 loadStart: 20000,      loadMax: 400000,     speedSurface: '30(30)', speedMax: '90(50)', accelStart: 5, accelMax: 10, sig: '3/4', fuel: 10000, econStart: 0.25, econMax: 0.45, dp: 25000,   peopleSpace: '+52,500' },
      { chassis: 'Cruiser',                  loadStart: 40000,      loadMax: 1600000,    speedSurface: '30(15)', speedMax: '45(30)', accelStart: 2, accelMax: 5, sig: '3/3', fuel: 75000,  econStart: 0.2,  econMax: 0.3,  dp: 150000,  peopleSpace: '-1,125,000' },
      { chassis: 'Destroyer',                loadStart: 60000,      loadMax: 1000000,    speedSurface: '25(20)', speedMax: '45(30)', accelStart: 3, accelMax: 6, sig: '3/3', fuel: 60000,  econStart: 0.2,  econMax: 0.4,  dp: 75000,   peopleSpace: '+843,750' },
      { chassis: 'Freighter',                loadStart: 20000000,   loadMax: 100000000,  speedSurface: '15(10)', speedMax: '20(10)', accelStart: 1, accelMax: 2, sig: '1/1', fuel: 40000,  econStart: 0.05, econMax: 0.05, dp: 500000,  peopleSpace: '+37,500' },
      { chassis: 'Frigate',                  loadStart: 45000,      loadMax: 800000,     speedSurface: '30(20)', speedMax: '45(30)', accelStart: 3, accelMax: 8, sig: '2/4', fuel: 50000,  econStart: 0.2,  econMax: 0.3,  dp: 50000,   peopleSpace: '+675,000' },
      { chassis: 'Harbor Tug',               loadStart: 10000,      loadMax: 50000,      speedSurface: '10(5)', speedMax: '15(10)', accelStart: 1, accelMax: 3, sig: '3/2', fuel: 5000,   econStart: 0.2,  econMax: 0.25, dp: 1500 },
      { chassis: 'Merchantman, Heavy',       loadStart: 2000000,    loadMax: 20000000,   speedSurface: '15(10)', speedMax: '25(10)', accelStart: 1, accelMax: 3, sig: '2/1', fuel: 20000,  econStart: 0.15, econMax: 0.24, dp: 150000,  peopleSpace: '+37,500' },
      { chassis: 'Merchantman, Light',       loadStart: 50000,      loadMax: 500000,     speedSurface: '25(15)', speedMax: '50(15)', accelStart: 2, accelMax: 5, sig: '3/2', fuel: 5000,   econStart: 0.3,  econMax: 0.6,  dp: 10000,   peopleSpace: '+22,500' },
      { chassis: 'Merchantman, Medium',      loadStart: 500000,     loadMax: 2000000,    speedSurface: '20(15)', speedMax: '50(15)', accelStart: 2, accelMax: 5, sig: '3/2', fuel: 10000,  econStart: 0.2,  econMax: 0.3,  dp: 40000,   peopleSpace: '+30,000' },
      { chassis: 'Patrol Craft',             loadStart: 5000,       loadMax: 10000,      speedSurface: '35(35)', speedMax: '90(50)', accelStart: 6, accelMax: 12, sig: '4/4', fuel: 5000,  econStart: 0.4,  econMax: 0.6,  dp: 40000,   peopleSpace: '+37,500' },
      { chassis: 'Trawler',                  loadStart: 25000,      loadMax: 75000,      speedSurface: '10(5)', speedMax: '60(10)', accelStart: 2, accelMax: 6, sig: '3/2', fuel: 5000,   econStart: 0.2,  econMax: 0.3,  dp: 5000 },
    ],
    submarines: [
      { chassis: 'Attack Submarine',       loadStart: 750000,    loadMax: 4000000,  speedSurface: '30/25', speedMax: '45/30', accelStart: 3, accelMax: 5, sig: '6/4', fuel: 10000, econStart: 0.25, econMax: 1,    dp: 120000,  peopleSpace: '+236,250' },
      { chassis: 'Bathyscaph',             loadStart: 800000,    loadMax: 2500000,  speedSurface: '10/5',  speedMax: '20/5',  accelStart: 1, accelMax: 3, sig: '5/3', fuel: 10000, econStart: 0.2,  econMax: 0.5,  dp: 40000 },
      { chassis: 'Commercial Sub, Heavy',  loadStart: 1000000,   loadMax: 16000000, speedSurface: '15/10', speedMax: '30/20', accelStart: 2, accelMax: 4, sig: '5/3', fuel: 10000, econStart: 0.1,  econMax: 0.25, dp: 200000,  peopleSpace: '+236,250' },
      { chassis: 'Commercial Sub, Light',  loadStart: 500000,    loadMax: 4000000,  speedSurface: '20/5',  speedMax: '30/5',  accelStart: 2, accelMax: 6, sig: '6/3', fuel: 7200,  econStart: 0.25, econMax: 1,    dp: 15000,   peopleSpace: '+24,000' },
      { chassis: 'Commercial Sub, Medium', loadStart: 5000000,   loadMax: 12500000, speedSurface: '15/5',  speedMax: '30/5',  accelStart: 1, accelMax: 4, sig: '5/3', fuel: 10000, econStart: 0.2,  econMax: 0.5,  dp: 40000,   peopleSpace: '+30,000' },
      { chassis: 'Minisub, Light',         loadStart: 400,       loadMax: 1600,     speedSurface: '30',    speedMax: '60',    accelStart: 3, accelMax: 6, sig: '6/4', fuel: 100,   econStart: 2,    econMax: 6,    dp: 40 },
      { chassis: 'Minisub, Medium',        loadStart: 550,       loadMax: 4000,     speedSurface: '40',    speedMax: '80',    accelStart: 4, accelMax: 8, sig: '6/4', fuel: 150,   econStart: 1,    econMax: 4.5,  dp: 210 },
      { chassis: 'Minisub, Heavy',         loadStart: 1250,      loadMax: 10000,    speedSurface: '25',    speedMax: '50',    accelStart: 3, accelMax: 6, sig: '6/4', fuel: 15000, econStart: 4.5,  econMax: 4.5,  dp: 400 },
      { chassis: 'Patrol Submarine',       loadStart: 50000,     loadMax: 400000,   speedSurface: '30/20', speedMax: '50/40', accelStart: 3, accelMax: 6, sig: '6/4', fuel: 15000, econStart: 0.5,  econMax: 1.5,  dp: 35000,   peopleSpace: '+127,500' },
      { chassis: 'Sea Sled (all)',          loadStart: '50xB',    loadMax: '500xB',  speedSurface: '50-(5xB)', speedMax: '80-(5xB)', accelStart: '7-B', accelMax: '12-B', sig: '8/5', fuel: '10xB', econStart: 4, econMax: 10, dp: '10+(5xB)' },
    ],
    specialVehicles: [
      { chassis: 'Anthroform, Large',       loadStart: 150,      loadMax: 600,       speedStart: 10,  speedMax: 50,  accelStart: null, accelMax: null, sig: 3,  fuel: 25,    econStart: 3.6,  econMax: 5.4,  dp: 480 },
      { chassis: 'Anthroform, Medium',      loadStart: 75,       loadMax: 375,       speedStart: 10,  speedMax: 40,  accelStart: null, accelMax: null, sig: 5,  fuel: 10,    econStart: 4,    econMax: 6,    dp: 300 },
      { chassis: 'Locomotive, Bulk',        loadStart: 1000000,  loadMax: 150000000, speedStart: 40,  speedMax: 110, accelStart: 1,    accelMax: 4,    sig: 1,  fuel: 25000, econStart: 1,    econMax: 3,    dp: 1000 },
      { chassis: 'Locomotive, Bullet',      loadStart: 100000,   loadMax: 150000,    speedStart: 120, speedMax: 270, accelStart: 10,   accelMax: 18,   sig: 1,  fuel: 25000, econStart: 1,    econMax: 3,    dp: 2000 },
      { chassis: 'Locomotive, Express',     loadStart: 100000,   loadMax: 400000,    speedStart: 60,  speedMax: 105, accelStart: 4,    accelMax: 8,    sig: 1,  fuel: 20000, econStart: 2,    econMax: 4,    dp: 1000 },
      { chassis: 'Locomotive, Non-Rail',    loadStart: 1500,     loadMax: 4000,      speedStart: 60,  speedMax: 110, accelStart: 3,    accelMax: 5,    sig: 1,  fuel: 400,   econStart: 2,    econMax: 4,    dp: 750 },
      { chassis: 'Locomotive, Streetcar',   loadStart: 500,      loadMax: 4000,      speedStart: 40,  speedMax: 65,  accelStart: 3,    accelMax: 8,    sig: 2,  fuel: 120,   econStart: 3,    econMax: 6,    dp: 600 },
      { chassis: 'Locomotive, Switcher',    loadStart: 400000,   loadMax: 800000,    speedStart: 5,   speedMax: 90,  accelStart: 1,    accelMax: 5,    sig: 1,  fuel: 400,   econStart: 2,    econMax: 4,    dp: 750 },
      { chassis: 'Mini-blimp',              loadStart: 20,       loadMax: 300,       speedStart: 60,  speedMax: 120, accelStart: 6,    accelMax: 20,   sig: 6,  fuel: 5,     econStart: 0.2,  econMax: 6,    dp: 35 },
      { chassis: 'Walker, Extra-Large',     loadStart: 250,      loadMax: 1200,      speedStart: 10,  speedMax: 60,  accelStart: null, accelMax: null, sig: 2,  fuel: 60,    econStart: 2,    econMax: 4,    dp: 600 },
      { chassis: 'Walker, Large',           loadStart: 200,      loadMax: 1000,      speedStart: 10,  speedMax: 50,  accelStart: null, accelMax: null, sig: 3,  fuel: 40,    econStart: 3.6,  econMax: 5.4,  dp: 400 },
      { chassis: 'Walker, Medium',          loadStart: 100,      loadMax: 400,       speedStart: 10,  speedMax: 40,  accelStart: null, accelMax: null, sig: 5,  fuel: 15,    econStart: 4,    econMax: 6,    dp: 240 },
      { chassis: 'Walker, Small',           loadStart: 25,       loadMax: 125,       speedStart: 2,   speedMax: 15,  accelStart: null, accelMax: null, sig: 6,  fuel: 5,     econStart: 4,    econMax: 6,    dp: 160 },
    ],
  },

  // ── ELECTRIC FUEL CELL ───────────────────────────────────────────────────

  electricFuelCell: {
    bikes: [
      { chassis: 'Chopper & ATVs', loadStart: 80,  loadMax: 220, speedStart: 50, speedMax: 125, accelStart: 4, accelMax: 9,  sig: 4, fuel: 60,  econStart: 0.25, econMax: 1,   dp: 63 },
      { chassis: 'Off-Road',        loadStart: 100, loadMax: 150, speedStart: 40, speedMax: 120, accelStart: 4, accelMax: 8,  sig: 5, fuel: 40,  econStart: 0.25, econMax: 1,   dp: 60 },
      { chassis: 'Racing Cycle',    loadStart: 80,  loadMax: 200, speedStart: 40, speedMax: 120, accelStart: 6, accelMax: 18, sig: 5, fuel: 35,  econStart: 0.25, econMax: 1,   dp: 92 },
      { chassis: 'Scooter',         loadStart: 55,  loadMax: 100, speedStart: 50, speedMax: 100, accelStart: 4, accelMax: 8,  sig: 5, fuel: 40,  econStart: 0.25, econMax: 1,   dp: 60 },
    ],
    boats: [
      { chassis: 'Skiff',         loadStart: 50,  loadMax: 200,  speedStart: 40, speedMax: 80,  accelStart: 5, accelMax: 8,  sig: 5, fuel: 75,  econStart: 1, econMax: 2.5, dp: 45 },
      { chassis: 'Speedboat',     loadStart: 25,  loadMax: 325,  speedStart: 60, speedMax: 210, accelStart: 8, accelMax: 16, sig: 5, fuel: 50,  econStart: 1, econMax: 2.5, dp: 45 },
      { chassis: 'Sport Cruiser', loadStart: 500, loadMax: 1500, speedStart: 30, speedMax: 60,  accelStart: 3, accelMax: 6,  sig: 5, fuel: 100, econStart: 1, econMax: 2.5, dp: 54 },
      { chassis: 'Water Scooter', loadStart: 15,  loadMax: 125,  speedStart: 30, speedMax: 55,  accelStart: 3, accelMax: 5,  sig: 5, fuel: 50,  econStart: 1, econMax: 2.5, dp: 20 },
      { chassis: 'Yacht',         loadStart: 450, loadMax: 3000, speedStart: 25, speedMax: 90,  accelStart: 3, accelMax: 5,  sig: 5, fuel: 150, econStart: 1, econMax: 2.5, dp: 100, peopleSpace: '+1,500' },
    ],
    cars: [
      { chassis: 'APC, Tracked',                       loadStart: 2500,   loadMax: 6000,    speedStart: 50, speedMax: 75,  accelStart: 4, accelMax: 7,  sig: 5, fuel: 100, econStart: 1,    econMax: 2,   dp: 600 },
      { chassis: 'APC, Wheeled',                       loadStart: 1500,   loadMax: 5000,    speedStart: 55, speedMax: 100, accelStart: 4, accelMax: 7,  sig: 5, fuel: 100, econStart: 1,    econMax: 2,   dp: 600 },
      { chassis: 'Crawler, Tracked & Wheeled (Micro)', loadStart: 0,      loadMax: 6,       speedStart: 5,  speedMax: 40,  accelStart: 1, accelMax: 4,  sig: 12, fuel: 4,  econStart: 0.5,  econMax: 2,   dp: 270 },
      { chassis: 'Crawler, Tracked (Small & Medium)',  loadStart: '5xB',  loadMax: '350xB', speedStart: 25, speedMax: 100, accelStart: 3, accelMax: 8,  sig: '9-B', fuel: '5+(35xB)', econStart: 1.25, econMax: 2.5, dp: '10+(20xB)' },
      { chassis: 'Crawler, Wheeled (Small & Medium)',  loadStart: '5xB',  loadMax: '250xB', speedStart: 25, speedMax: 150, accelStart: 3, accelMax: 10, sig: '9-B', fuel: '5+(35xB)', econStart: 1.25, econMax: 2.5, dp: '10+(20xB)' },
      { chassis: 'Industrial Mover, Heavy',            loadStart: 1000,   loadMax: 3600,    speedStart: 5,  speedMax: 20,  accelStart: 1, accelMax: 4,  sig: 5,  fuel: 200, econStart: 0.2,  econMax: 1,   dp: 40 },
      { chassis: 'Industrial Mover, Light',            loadStart: 300,    loadMax: 1000,    speedStart: 5,  speedMax: 40,  accelStart: 1, accelMax: 6,  sig: 6,  fuel: 60,  econStart: 0.25, econMax: 1.5, dp: 30 },
      { chassis: 'Industrial Mover, Medium',           loadStart: 600,    loadMax: 2500,    speedStart: 5,  speedMax: 25,  accelStart: 1, accelMax: 5,  sig: 5,  fuel: 200, econStart: 0.2,  econMax: 1,   dp: 36 },
      { chassis: 'Limousine',   loadStart: '25xB',  loadMax: '150xB', speedStart: 80, speedMax: 140, accelStart: 7, accelMax: 12, sig: 5, fuel: 150, econStart: 1, econMax: 2.5, dp: '20xB' },
      { chassis: 'RV',          loadStart: 750,     loadMax: 2000,    speedStart: 75, speedMax: 150, accelStart: 4, accelMax: 8,  sig: 5, fuel: 400, econStart: 1, econMax: 2.5, dp: 50, peopleSpace: '+300' },
      { chassis: 'Sedan',       loadStart: '25xB',  loadMax: '150xB', speedStart: 80, speedMax: 140, accelStart: 7, accelMax: 12, sig: 5, fuel: 150, econStart: 1, econMax: 2.5, dp: '20xB' },
      { chassis: 'Subcompact',  loadStart: 500,     loadMax: 800,     speedStart: 80, speedMax: 100, accelStart: 6, accelMax: 8,  sig: 5, fuel: 100, econStart: 1, econMax: 2,   dp: 40 },
      { chassis: 'SUVs',        loadStart: 300,     loadMax: 20000,   speedStart: 90, speedMax: 150, accelStart: 10, accelMax: 5, sig: 5, fuel: 200, econStart: 1, econMax: 2,   dp: 55 },
      { chassis: 'Sand Buggy',  loadStart: 30,      loadMax: 300,     speedStart: 90, speedMax: 120, accelStart: 6, accelMax: 10, sig: 5, fuel: 100, econStart: 1, econMax: 2.5, dp: 25 },
      { chassis: 'Transport, Heavy',  loadStart: 5000,  loadMax: 10000, speedStart: 55, speedMax: 100, accelStart: 2, accelMax: 4, sig: 4, fuel: 100, econStart: 1, econMax: 2.5, dp: 200 },
      { chassis: 'Transport, Medium', loadStart: 2000,  loadMax: 5000,  speedStart: 65, speedMax: 100, accelStart: 3, accelMax: 6, sig: 5, fuel: 100, econStart: 1, econMax: 2,   dp: 55 },
      { chassis: 'Van',         loadStart: 300,     loadMax: 20000,   speedStart: 90, speedMax: 150, accelStart: 5, accelMax: 10, sig: 5, fuel: 100, econStart: 1, econMax: 2,   dp: 55 },
    ],
    fixedWingAircraft: [
      { chassis: 'Single Engine', loadStart: 150,    loadMax: 1000,  speedStart: 60,  speedMax: 400,  accelStart: 15, accelMax: 20, sig: 6, fuel: 100, econStart: 0.8, econMax: 2.4, dp: 75 },
      { chassis: 'Twin Engine',   loadStart: 300,    loadMax: 2000,  speedStart: 135, speedMax: 400,  accelStart: 20, accelMax: 6,  sig: 6, fuel: 150, econStart: 0.8, econMax: 2.4, dp: 100 },
      { chassis: 'UAV All Sizes', loadStart: '5xB',  loadMax: '100xB', speedStart: '20/8/80xB', speedMax: '20/8/240', accelStart: 20, accelMax: 50, sig: '11-B to 25+(25xB)', fuel: '(see table)', econStart: 0.5, econMax: 1, dp: '20xB' },
      { chassis: 'Ultralight',    loadStart: 0,      loadMax: 200,   speedStart: 75,  speedMax: 275,  accelStart: 20, accelMax: 75, sig: 3, fuel: 50,  econStart: 0.25, econMax: 1,  dp: 100 },
    ],
    hovercraft: [
      { chassis: 'Hovercraft, Heavy',  loadStart: 800,  loadMax: 4000, speedStart: 75, speedMax: 120, accelStart: 5, accelMax: 8,  sig: 5, fuel: 500, econStart: 0.25, econMax: 1,   dp: 196 },
      { chassis: 'Hovercraft, Light',  loadStart: 80,   loadMax: 720,  speedStart: 75, speedMax: 210, accelStart: 5, accelMax: 10, sig: 5, fuel: 250, econStart: 0.5,  econMax: 1.6, dp: 32 },
      { chassis: 'Hovercraft, Medium', loadStart: 600,  loadMax: 2400, speedStart: 75, speedMax: 120, accelStart: 5, accelMax: 8,  sig: 5, fuel: 500, econStart: 0.4,  econMax: 1.2, dp: 64 },
      { chassis: 'Skimmer, Small',     loadStart: 10,   loadMax: 250,  speedStart: 75, speedMax: 150, accelStart: 8, accelMax: 18, sig: 5, fuel: 18,  econStart: 0.4,  econMax: 1.6, dp: 92 },
      { chassis: 'Skimmer, Medium',    loadStart: 25,   loadMax: 400,  speedStart: 75, speedMax: 150, accelStart: 6, accelMax: 10, sig: 6, fuel: 120, econStart: 0.4,  econMax: 1.6, dp: 144 },
    ],
    rotorCraft: [
      { chassis: 'Attack Helicopter',       loadStart: 1500, loadMax: 5000,  speedStart: 75,  speedMax: 120, accelStart: 15, accelMax: 25, sig: 5, fuel: 500,  econStart: 0.1,  econMax: 0.25, dp: 3000 },
      { chassis: 'Autogyro',                loadStart: 100,  loadMax: 850,   speedStart: 60,  speedMax: 200, accelStart: 10, accelMax: 20, sig: 4, fuel: 250,  econStart: 0.25, econMax: 0.4,  dp: 40 },
      { chassis: 'Cargo Helicopter',        loadStart: 800,  loadMax: 10000, speedStart: 60,  speedMax: 180, accelStart: 6,  accelMax: 15, sig: 5, fuel: 500,  econStart: 0.1,  econMax: 0.25, dp: 240 },
      { chassis: 'Rotary Wing UAV, Medium', loadStart: 20,   loadMax: 800,   speedStart: 60,  speedMax: 180, accelStart: 5,  accelMax: 15, sig: 7, fuel: 50,   econStart: 0.2,  econMax: 0.5,  dp: 80 },
      { chassis: 'Rotary Wing UAV, Micro',  loadStart: 0,    loadMax: 5,     speedStart: 15,  speedMax: 50,  accelStart: 4,  accelMax: 10, sig: 12, fuel: 4,   econStart: 0.25, econMax: 1.25, dp: 40 },
      { chassis: 'Rotary Wing UAV, Small',  loadStart: 10,   loadMax: 400,   speedStart: 60,  speedMax: 180, accelStart: 5,  accelMax: 15, sig: 8, fuel: 50,   econStart: 0.2,  econMax: 0.5,  dp: 60 },
      { chassis: 'Tilt-wing, Heavy',        loadStart: 300,  loadMax: 8000,  speedStart: 120, speedMax: 200, accelStart: 14, accelMax: 7,  sig: 7, fuel: 15,   econStart: 0.25, econMax: 0.65, dp: 105 },
      { chassis: 'Tilt-wing, Medium',       loadStart: 300,  loadMax: 2000,  speedStart: 140, speedMax: 250, accelStart: 7,  accelMax: 15, sig: 5, fuel: 15,   econStart: 0.25, econMax: 0.65, dp: 100 },
      { chassis: 'Tilt-wing UAV, Large',    loadStart: 20,   loadMax: 750,   speedStart: 60,  speedMax: 275, accelStart: 5,  accelMax: 12, sig: 6, fuel: 50,   econStart: 0.4,  econMax: 1.2,  dp: 80 },
      { chassis: 'Tilt-wing UAV, Medium',   loadStart: 10,   loadMax: 350,   speedStart: 60,  speedMax: 325, accelStart: 5,  accelMax: 15, sig: 7, fuel: 50,   econStart: 0.4,  econMax: 1.2,  dp: 60 },
      { chassis: 'Utility Helicopter',      loadStart: 800,  loadMax: 3200,  speedStart: 60,  speedMax: 180, accelStart: 6,  accelMax: 15, sig: 5, fuel: 250,  econStart: 0.15, econMax: 0.3,  dp: 80 },
    ],
    submarines: [
      { chassis: 'Attack Submarine',       loadStart: 750000,  loadMax: 4000000,  speedSurface: '30/25', speedMax: '45/30', accelStart: 3,  accelMax: 5,  sig: '3/5', fuel: '8/8', econStart: 15000, econMax: 0.1, dp: 144000,  peopleSpace: '+236,250' },
      { chassis: 'Bathyscaph',             loadStart: 800000,  loadMax: 2500000,  speedSurface: '15/5',  speedMax: '20/5',  accelStart: 1,  accelMax: 3,  sig: '1/3', fuel: '7/7', econStart: 15000, econMax: 0.1, dp: 100000 },
      { chassis: 'Boomer',                 loadStart: 1000000, loadMax: 16000000, speedSurface: '15/10', speedMax: '30/20', accelStart: 2,  accelMax: 4,  sig: '2/4', fuel: '7/7', econStart: 20000, econMax: 0.05, dp: 225000, peopleSpace: '+236,250' },
      { chassis: 'Commercial Sub, Heavy',  loadStart: 15000000,loadMax: 40000000, speedSurface: '10/5',  speedMax: '20/5',  accelStart: 1,  accelMax: 3,  sig: '1/3', fuel: '6/6', econStart: 10000, econMax: 0.05, dp: 150000, peopleSpace: '+36,000' },
      { chassis: 'Commercial Sub, Light',  loadStart: 500000,  loadMax: 4000000,  speedSurface: '20/5',  speedMax: '30/5',  accelStart: 2,  accelMax: 6,  sig: '2/6', fuel: '8/8', econStart: 7500,  econMax: 0.2,  dp: 32000,  peopleSpace: '+24,000' },
      { chassis: 'Commercial Sub, Medium', loadStart: 5000000, loadMax: 12500000, speedSurface: '15/5',  speedMax: '30/5',  accelStart: 1,  accelMax: 4,  sig: '1/4', fuel: '7/7', econStart: 10000, econMax: 0.1,  dp: 90000,  peopleSpace: '+30,000' },
      { chassis: 'Minisub, Heavy',         loadStart: 1250,    loadMax: 10000,    speedSurface: '25',    speedMax: '50',    accelStart: 2,  accelMax: 5,  sig: '8/8', fuel: '8/8', econStart: 500,   econMax: 0.1,  dp: 1500 },
      { chassis: 'Minisub, Light',         loadStart: 400,     loadMax: 1600,     speedSurface: '30',    speedMax: '60',    accelStart: 3,  accelMax: 6,  sig: '8/8', fuel: '8/8', econStart: 100,   econMax: 2,    dp: 40 },
      { chassis: 'Minisub, Medium',        loadStart: 400,     loadMax: 4000,     speedSurface: '30',    speedMax: '60',    accelStart: 4,  accelMax: 8,  sig: '6/8', fuel: '8/8', econStart: 150,   econMax: 0.5,  dp: 77 },
      { chassis: 'Patrol Submarine',       loadStart: 50000,   loadMax: 450000,   speedSurface: '30/20', speedMax: '50/40', accelStart: 3,  accelMax: 6,  sig: '3/6', fuel: '8/8', econStart: 10000, econMax: 0.5,  dp: 50000,  peopleSpace: '+127,500' },
      { chassis: 'Sea Sled, Medium',       loadStart: 100,     loadMax: 1000,     speedSurface: '40',    speedMax: '70',    accelStart: 5,  accelMax: 10, sig: '9/9', fuel: 60,    econStart: 0.8,   econMax: 4,    dp: 36 },
      { chassis: 'Sea Sled, Large',        loadStart: 1500,    loadMax: 3500,     speedSurface: '45',    speedMax: '75',    accelStart: 5,  accelMax: 10, sig: '9/9', fuel: 100,   econStart: 0.5,   econMax: 2.5,  dp: 56 },
      { chassis: 'Sea Sled, Small',        loadStart: 50,      loadMax: 500,      speedSurface: '45',    speedMax: '75',    accelStart: 6,  accelMax: 11, sig: '10/10', fuel: 50,  econStart: 1,     econMax: 5,    dp: 25 },
    ],
    vectoredThrust: [
      { chassis: 'Thunderbird', loadStart: 3500, loadMax: 6500,  speedStart: 250, speedMax: 720, accelStart: 20, accelMax: 50, sig: 5, fuel: 1000, econStart: 0.1, econMax: 0.1, dp: 2500 },
      { chassis: 'UAV, Medium', loadStart: 10,   loadMax: 400,   speedStart: 60,  speedMax: 300, accelStart: 6,  accelMax: 30, sig: 8, fuel: 100,  econStart: 0.25, econMax: 1,  dp: 48 },
      { chassis: 'UAV, Large',  loadStart: 10,   loadMax: 1000,  speedStart: 60,  speedMax: 240, accelStart: 6,  accelMax: 30, sig: 8, fuel: 125,  econStart: 0.2,  econMax: 1,  dp: 125 },
    ],
    specialVehicles: [
      { chassis: 'Anthroform, Medium',  loadStart: 50,      loadMax: 375,      speedStart: 10,  speedMax: 50,  accelStart: null, accelMax: null, sig: 6,  fuel: 60,    econStart: 0.5,  econMax: 0.5, dp: 375 },
      { chassis: 'Anthroform, Large',   loadStart: 100,     loadMax: 500,      speedStart: 10,  speedMax: 50,  accelStart: null, accelMax: null, sig: 5,  fuel: 100,   econStart: 0.5,  econMax: 1.5, dp: 600 },
      { chassis: 'Locomotive, Bullet',  loadStart: 100000,  loadMax: 200000,   speedStart: 160, speedMax: 300, accelStart: 12,   accelMax: 20,   sig: 3,  fuel: 1000,  econStart: 0.04, econMax: 0.1, dp: 2000 },
      { chassis: 'Walker, Extra-Large', loadStart: 250,     loadMax: 1200,     speedStart: 10,  speedMax: 50,  accelStart: null, accelMax: null, sig: 4,  fuel: 125,   econStart: 0.5,  econMax: 4,   dp: 500 },
      { chassis: 'Walker, Large',       loadStart: 150,     loadMax: 750,      speedStart: 10,  speedMax: 50,  accelStart: null, accelMax: null, sig: 5,  fuel: 75,    econStart: 0.5,  econMax: 1.5, dp: 500 },
      { chassis: 'Walker, Medium',      loadStart: 50,      loadMax: 250,      speedStart: 10,  speedMax: 40,  accelStart: null, accelMax: null, sig: 7,  fuel: 50,    econStart: 0.5,  econMax: 2,   dp: 300 },
      { chassis: 'Walker, Micro',       loadStart: 0,       loadMax: 6,        speedStart: 2,   speedMax: 8,   accelStart: null, accelMax: null, sig: 8,  fuel: 8,     econStart: 0.5,  econMax: 2,   dp: 270 },
      { chassis: 'Walker, Small',       loadStart: 25,      loadMax: 125,      speedStart: 2,   speedMax: 15,  accelStart: null, accelMax: null, sig: 8,  fuel: 8,     econStart: 0.5,  econMax: 2,   dp: 200 },
      { chassis: 'Zeppelin',            loadStart: 1000,    loadMax: 4000,     speedStart: 10,  speedMax: 250, accelStart: 6,    accelMax: 18,   sig: 5,  fuel: 1000,  econStart: 0.2,  econMax: 2,   dp: 1000 },
    ],
  },

  // ── GASOLINE ─────────────────────────────────────────────────────────────

  gasoline: {
    bikes: [
      { chassis: 'All-Terrain Vehicle', loadStart: 80,  loadMax: 220, speedStart: 60, speedMax: 180, accelStart: 4, accelMax: 10, sig: 2, fuel: 20, econStart: 10, econMax: 14, dp: 54 },
      { chassis: 'Chopper',             loadStart: 80,  loadMax: 220, speedStart: 60, speedMax: 180, accelStart: 4, accelMax: 10, sig: 2, fuel: 20, econStart: 10, econMax: 14, dp: 54 },
      { chassis: 'Off-Road',            loadStart: 60,  loadMax: 220, speedStart: 60, speedMax: 100, accelStart: 4, accelMax: 10, sig: 2, fuel: 20, econStart: 10, econMax: 14, dp: 55 },
      { chassis: 'Racing Cycle',        loadStart: 40,  loadMax: 100, speedStart: 120, speedMax: 240, accelStart: 10, accelMax: 18, sig: 2, fuel: 15, econStart: 8, econMax: 16, dp: 88 },
      { chassis: 'Scooter',             loadStart: 60,  loadMax: 120, speedStart: 60, speedMax: 100, accelStart: 4, accelMax: 8,  sig: 2, fuel: 20, econStart: 10, econMax: 14, dp: 55 },
    ],
    boats: [
      { chassis: 'Skiff',         loadStart: 250, loadMax: 600,  speedStart: 45, speedMax: 100, accelStart: 5, accelMax: 9,  sig: 3, fuel: 20,  econStart: 7, econMax: 10, dp: 30 },
      { chassis: 'Speedboat',     loadStart: 40,  loadMax: 260,  speedStart: 80, speedMax: 270, accelStart: 10, accelMax: 16, sig: 2, fuel: 100, econStart: 2, econMax: 10, dp: 28 },
      { chassis: 'Sport Cruiser', loadStart: 650, loadMax: 1500, speedStart: 30, speedMax: 100, accelStart: 5, accelMax: 9,  sig: 3, fuel: 200, econStart: 4, econMax: 8,  dp: 36 },
      { chassis: 'Water Scooter', loadStart: 50,  loadMax: 250,  speedStart: 45, speedMax: 90,  accelStart: 6, accelMax: 10, sig: 3, fuel: 20,  econStart: 7, econMax: 10, dp: 29 },
      { chassis: 'Yacht',         loadStart: 500, loadMax: 3000, speedStart: 25, speedMax: 80,  accelStart: 3, accelMax: 5,  sig: 3, fuel: 200, econStart: 2, econMax: 5,  dp: 60, peopleSpace: '+1,500' },
    ],
    cars: [
      { chassis: 'Crawler, Tracked (Small & Medium)',  loadStart: '5xB', loadMax: '350xB', speedStart: 25, speedMax: 100, accelStart: 3, accelMax: 8,  sig: '6-B', fuel: '10xB', econStart: 10, econMax: 15, dp: '5+(20xB)' },
      { chassis: 'Crawler, Wheeled (Small & Medium)',  loadStart: '5xB', loadMax: '250xB', speedStart: 25, speedMax: 150, accelStart: 3, accelMax: 10, sig: '6-B', fuel: '10xB', econStart: 10, econMax: 15, dp: '5+(20xB)' },
      { chassis: 'Industrial Mover, Heavy',   loadStart: 800,   loadMax: 3200,  speedStart: 5,   speedMax: 25,  accelStart: 1, accelMax: 5,  sig: 2, fuel: 45,  econStart: 1,    econMax: 2.5,  dp: 33 },
      { chassis: 'Industrial Mover, Light',   loadStart: 250,   loadMax: 800,   speedStart: 5,   speedMax: 45,  accelStart: 1, accelMax: 7,  sig: 2, fuel: 20,  econStart: 1.25, econMax: 3,    dp: 24 },
      { chassis: 'Industrial Mover, Medium',  loadStart: 600,   loadMax: 2500,  speedStart: 5,   speedMax: 30,  accelStart: 1, accelMax: 6,  sig: 2, fuel: 30,  econStart: 1,    econMax: 2.5,  dp: 30 },
      { chassis: 'Limousine',     loadStart: 60,    loadMax: 500,   speedStart: 100, speedMax: 160, accelStart: 8, accelMax: 14, sig: 2, fuel: 60,  econStart: 6,    econMax: 8,    dp: 50 },
      { chassis: 'RV',            loadStart: 350,   loadMax: 2500,  speedStart: 80,  speedMax: 120, accelStart: 5, accelMax: 8,  sig: 2, fuel: 95,  econStart: 5,    econMax: 9,    dp: 40, peopleSpace: '+300' },
      { chassis: 'Sand Buggy',    loadStart: 40,    loadMax: 400,   speedStart: 90,  speedMax: 120, accelStart: 6, accelMax: 14, sig: 2, fuel: 60,  econStart: 8,    econMax: 14,   dp: 25 },
      { chassis: 'Sedan',         loadStart: 60,    loadMax: 300,   speedStart: 100, speedMax: 160, accelStart: 8, accelMax: 14, sig: 2, fuel: 60,  econStart: 8,    econMax: 14,   dp: 25 },
      { chassis: 'Sports Car',    loadStart: 40,    loadMax: 260,   speedStart: 160, speedMax: 270, accelStart: 10, accelMax: 18, sig: 2, fuel: 60, econStart: 6,    econMax: 10,   dp: 28 },
      { chassis: 'Subcompact',    loadStart: 50,    loadMax: 500,   speedStart: 90,  speedMax: 120, accelStart: 6, accelMax: 10, sig: 2, fuel: 40,  econStart: 8,    econMax: 12,   dp: 20 },
      { chassis: 'SUV',           loadStart: 250,   loadMax: 1600,  speedStart: 100, speedMax: 140, accelStart: 7, accelMax: 12, sig: 2, fuel: 100, econStart: 6,    econMax: 10,   dp: 30 },
      { chassis: 'Van',           loadStart: 350,   loadMax: 2500,  speedStart: 80,  speedMax: 120, accelStart: 5, accelMax: 8,  sig: 2, fuel: 95,  econStart: 5,    econMax: 9,    dp: 40 },
    ],
    fixedWingAircraft: [
      { chassis: 'UAV, Small',  loadStart: 0,  loadMax: 100, speedStart: '20/50', speedMax: '20/150', accelStart: 20, accelMax: 60, sig: 6, fuel: 40, econStart: 1, econMax: 3, dp: 25 },
      { chassis: 'Ultralight',  loadStart: 10, loadMax: 100, speedStart: '40/100', speedMax: '40/240', accelStart: 15, accelMax: 20, sig: 6, fuel: 20, econStart: 1, econMax: 3, dp: 15 },
    ],
    hovercraft: [
      { chassis: 'Hovercraft, Light', loadStart: 80,  loadMax: 400, speedStart: 90, speedMax: 130, accelStart: 5, accelMax: 10, sig: 2, fuel: 100, econStart: 0.4, econMax: 1.6, dp: 20 },
      { chassis: 'Skimmer, Medium',   loadStart: 25,  loadMax: 300, speedStart: 90, speedMax: 180, accelStart: 6, accelMax: 15, sig: 4, fuel: 25,  econStart: 0.25, econMax: 1,  dp: 96 },
      { chassis: 'Skimmer, Small',    loadStart: 10,  loadMax: 200, speedStart: 90, speedMax: 180, accelStart: 8, accelMax: 20, sig: 5, fuel: 20,  econStart: 0.25, econMax: 1,  dp: 72 },
    ],
    rotorCraft: [
      { chassis: 'UAV, Small', loadStart: 5, loadMax: 125, speedStart: 40, speedMax: 90, accelStart: 4, accelMax: 10, sig: 4, fuel: 60, econStart: 0.2, econMax: 0.4, dp: 25 },
    ],
    submarines: [
      { chassis: 'Minisub, Light',  loadStart: 200,   loadMax: 800,   speedSurface: '30', speedMax: '60', accelStart: 3, accelMax: 6, sig: '6/4', fuel: 80, econStart: 1.5, econMax: 4.5, dp: 36 },
      { chassis: 'Sea Sled (all)',   loadStart: '40xB', loadMax: '200xB', speedSurface: '50-(5xB)', speedMax: '80-(5xB)', accelStart: '7-B', accelMax: '12-B', sig: '8/5', fuel: '10xB', econStart: 3, econMax: 9, dp: '5+(5xB)' },
    ],
    specialVehicles: [
      { chassis: 'Anthroform, Medium',  loadStart: 50,   loadMax: 200,  speedStart: 10, speedMax: 40, accelStart: null, accelMax: null, sig: 5, fuel: 10,  econStart: 4, econMax: 6,   dp: 225 },
      { chassis: 'Anthroform, Large',   loadStart: 100,  loadMax: 500,  speedStart: 10, speedMax: 50, accelStart: null, accelMax: null, sig: 6, fuel: 60,  econStart: 3, econMax: 5.4, dp: 360 },
      { chassis: 'Mini-blimp',          loadStart: 10,   loadMax: 120,  speedStart: 60, speedMax: 120, accelStart: 6,  accelMax: 20, sig: 6,  fuel: 15,  econStart: 5, econMax: 4,   dp: 25 },
      { chassis: 'Walker, Extra-Large', loadStart: 250,  loadMax: 1200, speedStart: 10, speedMax: 60, accelStart: null, accelMax: null, sig: 2, fuel: 60,  econStart: 2, econMax: 4,   dp: 600 },
      { chassis: 'Walker, Large',       loadStart: 150,  loadMax: 750,  speedStart: 10, speedMax: 50, accelStart: null, accelMax: null, sig: 3, fuel: 40,  econStart: 3.6, econMax: 5.4, dp: 300 },
      { chassis: 'Walker, Medium',      loadStart: 50,   loadMax: 400,  speedStart: 10, speedMax: 50, accelStart: null, accelMax: null, sig: 5, fuel: 15,  econStart: 4, econMax: 6,   dp: 180 },
      { chassis: 'Walker, Small',       loadStart: 10,   loadMax: 100,  speedStart: 2,  speedMax: 15, accelStart: null, accelMax: null, sig: 6, fuel: 5,   econStart: 4, econMax: 6,   dp: 120 },
      { chassis: 'Zeppelin',            loadStart: 1000, loadMax: 4000, speedStart: 10, speedMax: 250, accelStart: 6,  accelMax: 18, sig: 5,  fuel: 4000, econStart: 0.5, econMax: 2, dp: 1000 },
    ],
  },

  // ── JET TURBINE ──────────────────────────────────────────────────────────

  jetTurbine: {
    boats: [
      { chassis: 'Speedboat',    loadStart: 40,  loadMax: 200,  speedStart: 100, speedMax: 350, accelStart: 12, accelMax: 50, sig: 1, fuel: 100, econStart: 0.5, econMax: 2.5, dp: 60 },
      { chassis: 'Sport Cruiser',loadStart: 750, loadMax: 3000, speedStart: 40,  speedMax: 120, accelStart: 6,  accelMax: 12, sig: 1, fuel: 200, econStart: 0.5, econMax: 3,   dp: 72 },
      { chassis: 'Yacht',        loadStart: 800, loadMax: 3600, speedStart: 40,  speedMax: 120, accelStart: 4,  accelMax: 8,  sig: 1, fuel: 200, econStart: 0.5, econMax: 3,   dp: 150, peopleSpace: '+1,500' },
    ],
    cars: [
      { chassis: 'APC, Tracked',           loadStart: 3000,  loadMax: 6000,  speedStart: 70,  speedMax: 150, accelStart: 5, accelMax: 9,  sig: 1, fuel: 250, econStart: 0.8,  econMax: 2,   dp: 500 },
      { chassis: 'APC, Wheeled',           loadStart: 2000,  loadMax: 5000,  speedStart: 75,  speedMax: 200, accelStart: 6, accelMax: 10, sig: 1, fuel: 250, econStart: 1,    econMax: 2.5, dp: 500 },
      { chassis: 'Caterpillar, Heavy',     loadStart: 10000, loadMax: 25000, speedStart: 20,  speedMax: 80,  accelStart: 2, accelMax: 5,  sig: 1, fuel: 900, econStart: 0.25, econMax: 0.9, dp: 400 },
      { chassis: 'Caterpillar, Light',     loadStart: 2000,  loadMax: 5000,  speedStart: 20,  speedMax: 80,  accelStart: 2, accelMax: 7,  sig: 1, fuel: 400, econStart: 0.8,  econMax: 2.4, dp: 320 },
      { chassis: 'Caterpillar, Medium',    loadStart: 5000,  loadMax: 10000, speedStart: 20,  speedMax: 60,  accelStart: 2, accelMax: 6,  sig: 1, fuel: 700, econStart: 0.5,  econMax: 1.5, dp: 400 },
      { chassis: 'Caterpillar, Miniature', loadStart: 1000,  loadMax: 2000,  speedStart: 25,  speedMax: 100, accelStart: 3, accelMax: 7,  sig: 1, fuel: 200, econStart: 1,    econMax: 2.5, dp: 90 },
      { chassis: 'Transport, Heavy',       loadStart: 6000,  loadMax: 12000, speedStart: 75,  speedMax: 180, accelStart: 5, accelMax: 9,  sig: 1, fuel: 250, econStart: 1,    econMax: 3,   dp: 170 },
    ],
    fixedWingAircraft: [
      { chassis: 'Airliner',     loadStart: 10000, loadMax: 75000,  speedStart: 150,  speedMax: 600,  accelStart: 35, accelMax: 60,  sig: 2, fuel: 2000,   econStart: 0.4,  econMax: 1,    dp: 1000 },
      { chassis: 'HSCT',         loadStart: 10000, loadMax: 25000,  speedStart: 125,  speedMax: 2400, accelStart: 50, accelMax: 125, sig: 2, fuel: 120000, econStart: 0.02, econMax: 0.05, dp: 20000 },
      { chassis: 'Jet Fighter',  loadStart: 4000,  loadMax: 12500,  speedStart: 150,  speedMax: 1800, accelStart: 80, accelMax: 250, sig: 5, fuel: 2000,   econStart: 0.1,  econMax: 0.3,  dp: 2000 },
      { chassis: 'Single Engine',loadStart: 250,   loadMax: 2000,   speedStart: 60,   speedMax: 400,  accelStart: 20, accelMax: 35,  sig: 3, fuel: 750,    econStart: 0.5,  econMax: 0.75, dp: 100 },
      { chassis: 'Twin Engine',  loadStart: 825,   loadMax: 5000,   speedStart: 135,  speedMax: 600,  accelStart: 30, accelMax: 42,  sig: 3, fuel: 750,    econStart: 0.5,  econMax: 0.75, dp: 150 },
      { chassis: 'UAV, Small',   loadStart: 5,     loadMax: 825,    speedStart: 20,   speedMax: 400,  accelStart: 30, accelMax: 150, sig: 6, fuel: 140,    econStart: 0.5,  econMax: 0.75, dp: 40 },
      { chassis: 'UAV, Medium',  loadStart: 10,    loadMax: 2000,   speedStart: 40,   speedMax: 480,  accelStart: 30, accelMax: 275, sig: 6, fuel: 80,     econStart: 0.5,  econMax: 0.75, dp: 55 },
      { chassis: 'UAV, Large',   loadStart: 10,    loadMax: 4500,   speedStart: 60,   speedMax: 1620, accelStart: 40, accelMax: 570, sig: 6, fuel: 470,    econStart: 0.5,  econMax: 0.75, dp: 80 },
      { chassis: 'Ultralight',   loadStart: 50,    loadMax: 250,    speedStart: 40,   speedMax: 500,  accelStart: 18, accelMax: 36,  sig: 5, fuel: 100,    econStart: 0.5,  econMax: 0.75, dp: 50 },
    ],
    hovercraft: [
      { chassis: 'Hovercraft, Light',  loadStart: 100,  loadMax: 1000, speedStart: 90, speedMax: 300, accelStart: 8, accelMax: 16, sig: 2, fuel: 100, econStart: 0.25, econMax: 0.75, dp: 35 },
      { chassis: 'Hovercraft, Medium', loadStart: 250,  loadMax: 1000, speedStart: 90, speedMax: 180, accelStart: 8, accelMax: 12, sig: 2, fuel: 250, econStart: 0.25, econMax: 0.75, dp: 60 },
      { chassis: 'Hovercraft, Heavy',  loadStart: 1000, loadMax: 6000, speedStart: 90, speedMax: 180, accelStart: 8, accelMax: 12, sig: 2, fuel: 400, econStart: 0.25, econMax: 0.75, dp: 200 },
    ],
    rotorCraft: [
      { chassis: 'Attack Helicopter',       loadStart: 1500, loadMax: 5000,  speedStart: 250, speedMax: 350, accelStart: 25, accelMax: 40, sig: 4, fuel: 3000, econStart: 0.1,  econMax: 0.3,  dp: 1500 },
      { chassis: 'Autogyro',                loadStart: 15,   loadMax: 165,   speedStart: 60,  speedMax: 200, accelStart: 10, accelMax: 20, sig: 4, fuel: 250,  econStart: 0.25, econMax: 0.4,  dp: 40 },
      { chassis: 'Cargo Helicopter',        loadStart: 850,  loadMax: 12000, speedStart: 120, speedMax: 350, accelStart: 10, accelMax: 25, sig: 3, fuel: 1000, econStart: 0.2,  econMax: 0.3,  dp: 350 },
      { chassis: 'Rotary Wing UAV, Medium', loadStart: 20,   loadMax: 900,   speedStart: 60,  speedMax: 200, accelStart: 6,  accelMax: 18, sig: 4, fuel: 120,  econStart: 0.25, econMax: 0.4,  dp: 50 },
      { chassis: 'Rotary Wing UAV, Small',  loadStart: 10,   loadMax: 450,   speedStart: 60,  speedMax: 200, accelStart: 6,  accelMax: 18, sig: 5, fuel: 120,  econStart: 0.25, econMax: 0.4,  dp: 40 },
      { chassis: 'Utility Helicopter',      loadStart: 850,  loadMax: 3600,  speedStart: 120, speedMax: 350, accelStart: 10, accelMax: 25, sig: 3, fuel: 1000, econStart: 0.2,  econMax: 0.3,  dp: 35 },
    ],
    ships: [
      { chassis: 'Aircraft Carrier, Heavy',  loadStart: 2000000,  loadMax: 40000000,  speedSurface: '30(15)', speedMax: '50(25)', accelStart: 2, accelMax: 4,  sig: '2/2', fuel: 400000, econStart: 0.05, econMax: 0.1,  dp: 1000000, peopleSpace: '+14,700,000' },
      { chassis: 'Aircraft Carrier, Light',  loadStart: 800000,   loadMax: 15000000,  speedSurface: '30(15)', speedMax: '60(25)', accelStart: 3, accelMax: 6,  sig: '2/2', fuel: 100000, econStart: 0.1,  econMax: 0.25, dp: 250000,  peopleSpace: '-5,925,000' },
      { chassis: 'Aircraft Carrier, Medium', loadStart: 1500000,  loadMax: 25000000,  speedSurface: '30(15)', speedMax: '50(25)', accelStart: 2, accelMax: 5,  sig: '2/2', fuel: 200000, econStart: 0.08, econMax: 0.2,  dp: 600000,  peopleSpace: '-8,850,000' },
      { chassis: 'Corvette',                 loadStart: 20000,    loadMax: 400000,    speedSurface: '50(50)', speedMax: '100(50)', accelStart: 5, accelMax: 10, sig: '3/3', fuel: 10000, econStart: 0.15, econMax: 0.3,  dp: 35000,   peopleSpace: '+52,500' },
      { chassis: 'Cruiser',                  loadStart: 50000,    loadMax: 2000000,   speedSurface: '30(15)', speedMax: '60(25)', accelStart: 3, accelMax: 6,  sig: '2/2', fuel: 75000,  econStart: 0.1,  econMax: 0.25, dp: 250000,  peopleSpace: '-1,125,000' },
      { chassis: 'Destroyer',                loadStart: 60000,    loadMax: 1000000,   speedSurface: '30(20)', speedMax: '55(30)', accelStart: 3, accelMax: 6,  sig: '3/3', fuel: 60000,  econStart: 0.2,  econMax: 0.4,  dp: 100000,  peopleSpace: '+843,750' },
      { chassis: 'Freighter',                loadStart: 30000000, loadMax: 125000000, speedSurface: '15(10)', speedMax: '20(10)', accelStart: 1, accelMax: 2,  sig: '1/1', fuel: 40000,  econStart: 0.05, econMax: 0.05, dp: 600000,  peopleSpace: '+37,500' },
      { chassis: 'Frigate',                  loadStart: 45000,    loadMax: 800000,    speedSurface: '40(20)', speedMax: '60(30)', accelStart: 3, accelMax: 8,  sig: '2/4', fuel: 50000,  econStart: 0.15, econMax: 0.3,  dp: 75000,   peopleSpace: '+675,000' },
      { chassis: 'Merchantman, Heavy',       loadStart: 2500000,  loadMax: 25000000,  speedSurface: '20(10)', speedMax: '25(10)', accelStart: 2, accelMax: 4,  sig: '2/1', fuel: 20000,  econStart: 0.1,  econMax: 0.2,  dp: 200000,  peopleSpace: '+37,500' },
      { chassis: 'Merchantman, Medium',      loadStart: 750000,   loadMax: 2500000,   speedSurface: '15(5)',  speedMax: '25(10)', accelStart: 1, accelMax: 3,  sig: '3/2', fuel: 10000,  econStart: 0.1,  econMax: 0.24, dp: 60000,   peopleSpace: '+30,000' },
    ],
    submarines: [
      { chassis: 'Bathyscaph',             loadStart: 5000000,  loadMax: 12500000, speedSurface: '20/5',  speedMax: '40/5',  accelStart: 1, accelMax: 3, sig: '4/2', fuel: '4/2', econStart: 10000, econMax: 0.1,  dp: 60000 },
      { chassis: 'Commercial Sub, Heavy',  loadStart: 15000000, loadMax: 40000000, speedSurface: '15/5',  speedMax: '30/5',  accelStart: 1, accelMax: 3, sig: '4/2', fuel: '4/2', econStart: 10000, econMax: 0.1,  dp: 100000, peopleSpace: '+36,000' },
      { chassis: 'Commercial Sub, Medium', loadStart: 5000000,  loadMax: 12500000, speedSurface: '25/5',  speedMax: '45/5',  accelStart: 2, accelMax: 6, sig: '4/2', fuel: '4/2', econStart: 10000, econMax: 0.1,  dp: 75000,  peopleSpace: '+30,000' },
      { chassis: 'Minisub, Heavy',         loadStart: 1500,     loadMax: 12500,    speedSurface: '35',    speedMax: '75',    accelStart: 3, accelMax: 7, sig: '5/3', fuel: '5/3', econStart: 150,   econMax: 0.5,  dp: 900 },
      { chassis: 'Patrol Submarine',       loadStart: 50000,    loadMax: 400000,   speedSurface: '40/15', speedMax: '60/30', accelStart: 4, accelMax: 7, sig: '5/3', fuel: '5/3', econStart: 15000, econMax: 0.25, dp: 50000,  peopleSpace: '+127,500' },
    ],
  },

  // ── JET PROPELLER ────────────────────────────────────────────────────────
  // Economy in km/l

  jetPropeller: {
    fixedWingAircraft: [
      { chassis: 'Airliner',     loadStart: 5000,  loadMax: 15000, speedStart: '135/320', speedMax: '135/500', accelStart: 22, accelMax: 35, sig: 3, fuel: 5000, econStart: 0.75, econMax: 1.5, dp: 500 },
      { chassis: 'Single Engine',loadStart: 175,   loadMax: 1200,  speedStart: '60/130',  speedMax: '60/450',  accelStart: 20, accelMax: 25, sig: 4, fuel: 250,  econStart: 1,    econMax: 3,   dp: 50 },
      { chassis: 'Twin Engine',  loadStart: 350,   loadMax: 2500,  speedStart: '135/280', speedMax: '135/500', accelStart: 20, accelMax: 28, sig: 4, fuel: 500,  econStart: 1,    econMax: 3,   dp: 75 },
      { chassis: 'UAV, Large',   loadStart: 20,    loadMax: 350,   speedStart: '40/90',   speedMax: '40/125',  accelStart: 30, accelMax: 60, sig: 6, fuel: 60,   econStart: 1,    econMax: 3,   dp: 55 },
      { chassis: 'UAV, Medium',  loadStart: 10,    loadMax: 225,   speedStart: '40/90',   speedMax: '40/325',  accelStart: 30, accelMax: 75, sig: 6, fuel: 60,   econStart: 1,    econMax: 3,   dp: 40 },
      { chassis: 'UAV, Small',   loadStart: 5,     loadMax: 125,   speedStart: '20/60',   speedMax: '20/175',  accelStart: 35, accelMax: 80, sig: 6, fuel: 40,   econStart: 1,    econMax: 3,   dp: 30 },
      { chassis: 'Ultralight',   loadStart: 15,    loadMax: 150,   speedStart: '40/80',   speedMax: '40/250',  accelStart: 17, accelMax: 21, sig: 6, fuel: 60,   econStart: 1,    econMax: 3,   dp: 20 },
    ],
    rotorCraft: [
      { chassis: 'Tilt-wing, Medium',     loadStart: 350, loadMax: 2500,  speedStart: 280, speedMax: 500, accelStart: 10, accelMax: 20, sig: 4, fuel: 750,  econStart: 0.6, econMax: 1, dp: 75 },
      { chassis: 'Tilt-wing, Heavy',      loadStart: 350, loadMax: 10000, speedStart: 240, speedMax: 400, accelStart: 8,  accelMax: 20, sig: 4, fuel: 1000, econStart: 0.6, econMax: 1, dp: 200 },
      { chassis: 'Tilt-wing UAV, Large',  loadStart: 20,  loadMax: 350,   speedStart: 60,  speedMax: 300, accelStart: 6,  accelMax: 15, sig: 4, fuel: 120,  econStart: 0.6, econMax: 1, dp: 80 },
      { chassis: 'Tilt-wing UAV, Medium', loadStart: 10,  loadMax: 400,   speedStart: 60,  speedMax: 350, accelStart: 6,  accelMax: 18, sig: 5, fuel: 120,  econStart: 0.6, econMax: 1, dp: 40 },
    ],
    specialVehicles: [
      { chassis: 'Mini-blimp', loadStart: 50,   loadMax: 400,  speedStart: 70, speedMax: 250, accelStart: 8, accelMax: 24, sig: 5, fuel: 25,   econStart: 1, econMax: 3, dp: 45 },
      { chassis: 'Zeppelin',   loadStart: 1000, loadMax: 4000, speedStart: 70, speedMax: 250, accelStart: 8, accelMax: 26, sig: 3, fuel: 2000, econStart: 1, econMax: 3, dp: 600 },
    ],
  },

  // ── METHANE ──────────────────────────────────────────────────────────────
  // Economy in km/bar

  methane: {
    bikes: [
      { chassis: 'All-Terrain Vehicle', loadStart: 60, loadMax: 150, speedStart: 40, speedMax: 120, accelStart: 3, accelMax: 8, sig: 4, fuel: 250, econStart: 1.25, econMax: 2,    dp: 36 },
      { chassis: 'Chopper',             loadStart: 60, loadMax: 150, speedStart: 40, speedMax: 120, accelStart: 3, accelMax: 8, sig: 4, fuel: 250, econStart: 1.25, econMax: 2,    dp: 36 },
      { chassis: 'Off-Road',            loadStart: 60, loadMax: 120, speedStart: 40, speedMax: 120, accelStart: 3, accelMax: 8, sig: 4, fuel: 200, econStart: 1.25, econMax: 2,    dp: 30 },
      { chassis: 'Scooter',             loadStart: 60, loadMax: 120, speedStart: 40, speedMax: 90,  accelStart: 4, accelMax: 7, sig: 4, fuel: 200, econStart: 1.25, econMax: 2,    dp: 30 },
    ],
    boats: [
      { chassis: 'Skiff',         loadStart: 200, loadMax: 450, speedStart: 65, speedMax: 85, accelStart: 6, accelMax: 10, sig: 4, fuel: 250, econStart: 1, econMax: 2.25, dp: 25 },
      { chassis: 'Water Scooter', loadStart: 25,  loadMax: 150, speedStart: 30, speedMax: 60, accelStart: 3, accelMax: 6,  sig: 4, fuel: 150, econStart: 1, econMax: 2.25, dp: 24 },
    ],
    cars: [
      { chassis: 'Crawler, Tracked (Small & Medium)',  loadStart: '5xB', loadMax: '300xB', speedStart: 20, speedMax: 80,  accelStart: 3, accelMax: 7,  sig: '7-B', fuel: '100+(50xB)', econStart: 0.75, econMax: 2.25, dp: '20xB' },
      { chassis: 'Crawler, Wheeled (Small & Medium)',  loadStart: '5xB', loadMax: '200xB', speedStart: 20, speedMax: 120, accelStart: 3, accelMax: 8,  sig: '7-B', fuel: '100+(50xB)', econStart: 1,    econMax: 2,    dp: '20xB' },
      { chassis: 'Industrial Mover, Heavy',   loadStart: 800,  loadMax: 3200,  speedStart: 5,   speedMax: 20,  accelStart: 1, accelMax: 4, sig: 3, fuel: 600,  econStart: 0.02, econMax: 0.05, dp: 30 },
      { chassis: 'Industrial Mover, Light',   loadStart: 250,  loadMax: 800,   speedStart: 5,   speedMax: 40,  accelStart: 1, accelMax: 6, sig: 4, fuel: 300,  econStart: 0.04, econMax: 0.10, dp: 20 },
      { chassis: 'Industrial Mover, Medium',  loadStart: 500,  loadMax: 2000,  speedStart: 5,   speedMax: 25,  accelStart: 1, accelMax: 5, sig: 4, fuel: 450,  econStart: 0.03, econMax: 0.09, dp: 25 },
      { chassis: 'Limousine',   loadStart: 60,   loadMax: 400,  speedStart: 100, speedMax: 150, accelStart: 6, accelMax: 10, sig: 4, fuel: 500,  econStart: 1,    econMax: 2.25, dp: 20 },
      { chassis: 'RV',          loadStart: 250,  loadMax: 1600, speedStart: 80,  speedMax: 120, accelStart: 2, accelMax: 5,  sig: 3, fuel: 1000, econStart: 0.5,  econMax: 1.5,  dp: 20, peopleSpace: '+300' },
      { chassis: 'Sand Buggy',  loadStart: 40,   loadMax: 300,  speedStart: 90,  speedMax: 120, accelStart: 6, accelMax: 10, sig: 4, fuel: 1000, econStart: 1.25, econMax: 2.5,  dp: 15 },
      { chassis: 'Sedan',       loadStart: 60,   loadMax: 400,  speedStart: 100, speedMax: 150, accelStart: 6, accelMax: 10, sig: 4, fuel: 500,  econStart: 1,    econMax: 2.25, dp: 20 },
      { chassis: 'SUV',         loadStart: 120,  loadMax: 1000, speedStart: 80,  speedMax: 120, accelStart: 6, accelMax: 5,  sig: 4, fuel: 1000, econStart: 0.5,  econMax: 1.5,  dp: 20 },
      { chassis: 'Subcompact',  loadStart: 50,   loadMax: 350,  speedStart: 90,  speedMax: 100, accelStart: 6, accelMax: 10, sig: 4, fuel: 450,  econStart: 1.25, econMax: 2.5,  dp: 15 },
      { chassis: 'Van',         loadStart: 250,  loadMax: 1600, speedStart: 80,  speedMax: 120, accelStart: 2, accelMax: 5,  sig: 3, fuel: 1000, econStart: 0.5,  econMax: 1.5,  dp: 20 },
    ],
    fixedWingAircraft: [
      { chassis: 'UAV, Small',  loadStart: 0, loadMax: 80,  speedStart: '20/40',  speedMax: '20/120', accelStart: 15, accelMax: 50, sig: 6, fuel: 200, econStart: 1.25, econMax: 3, dp: 20 },
      { chassis: 'Ultralight',  loadStart: 5, loadMax: 75,  speedStart: '40/80',  speedMax: '40/240', accelStart: null, accelMax: null, sig: 6, fuel: 400, econStart: 1.25, econMax: 3, dp: 15 },
    ],
    hovercraft: [
      { chassis: 'Skimmer, Both Sizes', loadStart: '10xB', loadMax: '300xB', speedStart: 90, speedMax: 180, accelStart: 5, accelMax: 20, sig: '7-B', fuel: 1000, econStart: 0.25, econMax: 1, dp: '20+(15xB)' },
    ],
    rotorCraft: [
      { chassis: 'UAV, Small', loadStart: 0, loadMax: 100, speedStart: 40, speedMax: 120, accelStart: 5, accelMax: 12, sig: 6, fuel: 1000, econStart: 0.25, econMax: 1, dp: 20 },
    ],
    submarines: [
      { chassis: 'Sea Sled (all)', loadStart: '25xB', loadMax: '100xB', speedSurface: '15', speedMax: '55-(5xB)', accelStart: 2, accelMax: 4, sig: '(10-B)/(8-B)', fuel: '300+(25xB)', econStart: 0.4, econMax: 2, dp: '12+(4xB)' },
      { chassis: 'Minisub, Light',  loadStart: 100,   loadMax: 500,    speedSurface: '15', speedMax: '35',        accelStart: 2, accelMax: 4, sig: '6/4',          fuel: 400,           econStart: 0.25, econMax: 1, dp: 24 },
    ],
    specialVehicles: [
      { chassis: 'Anthroform, Large',   loadStart: 80,  loadMax: 400, speedStart: 10, speedMax: 50, accelStart: null, accelMax: null, sig: 4, fuel: 240, econStart: 0.5, econMax: 1, dp: 300 },
      { chassis: 'Anthroform, Medium',  loadStart: 25,  loadMax: 125, speedStart: 10, speedMax: 40, accelStart: null, accelMax: null, sig: 6, fuel: 200, econStart: 0.5, econMax: 1, dp: 180 },
      { chassis: 'Mini-Hub',            loadStart: 5,   loadMax: 125, speedStart: 40, speedMax: 80, accelStart: 3,    accelMax: 10,   sig: 8, fuel: 1000, econStart: 0.5, econMax: 1, dp: 18 },
      { chassis: 'Walker, Extra-Large', loadStart: 150, loadMax: 800, speedStart: 10, speedMax: 60, accelStart: null, accelMax: null, sig: 3, fuel: 300,  econStart: 0.5, econMax: 1, dp: 500 },
      { chassis: 'Walker, Large',       loadStart: 120, loadMax: 600, speedStart: 10, speedMax: 50, accelStart: null, accelMax: null, sig: 4, fuel: 240,  econStart: 0.5, econMax: 1, dp: 250 },
      { chassis: 'Walker, Medium',      loadStart: 30,  loadMax: 150, speedStart: 10, speedMax: 40, accelStart: null, accelMax: null, sig: 6, fuel: 200,  econStart: 0.5, econMax: 1, dp: 150 },
      { chassis: 'Walker, Small',       loadStart: 5,   loadMax: 35,  speedStart: 2,  speedMax: 15, accelStart: null, accelMax: null, sig: 7, fuel: 150,  econStart: 0.5, econMax: 1, dp: 100 },
    ],
  },

  // ── NUCLEAR ──────────────────────────────────────────────────────────────
  // No fuel cost / economy (dashes in book)

  nuclear: {
    ships: [
      { chassis: 'Merchantman, Medium',      loadStart: 800000,    loadMax: 3000000,    speedSurface: '25(15)', speedMax: '50(15)', accelStart: 3, accelMax: 5, sig: '4/3', dp: 100000, peopleSpace: '-30,000' },
      { chassis: 'Merchantman, Heavy',       loadStart: 3000000,   loadMax: 30000000,   speedSurface: '20(10)', speedMax: '25(10)', accelStart: 2, accelMax: 4, sig: '3/2', dp: 400000, peopleSpace: '+37,500' },
      { chassis: 'Freighter',               loadStart: 50000000,  loadMax: 250000000,  speedSurface: '15(10)', speedMax: '20(10)', accelStart: 1, accelMax: 2, sig: '2/2', dp: 1000000, peopleSpace: '+37,500' },
      { chassis: 'Cruiser',                  loadStart: 75000,     loadMax: 2000000,    speedSurface: '45(20)', speedMax: '60(30)', accelStart: 3, accelMax: 7, sig: '2/2', dp: 600000, peopleSpace: '-1,125,000' },
      { chassis: 'Aircraft Carrier, Light',  loadStart: 1000000,   loadMax: 12000000,   speedSurface: '45(20)', speedMax: '60(30)', accelStart: 3, accelMax: 7, sig: '2/2', dp: 600000, peopleSpace: '+5,925,000' },
      { chassis: 'Aircraft Carrier, Medium', loadStart: 2000000,   loadMax: 30000000,   speedSurface: '45(20)', speedMax: '60(30)', accelStart: 2, accelMax: 6, sig: '1/2', dp: 800000, peopleSpace: '+8,850,000' },
      { chassis: 'Aircraft Carrier, Heavy',  loadStart: 2500000,   loadMax: 50000000,   speedSurface: '45(20)', speedMax: '60(30)', accelStart: 2, accelMax: 5, sig: '1/2', dp: 1500000, peopleSpace: '+14,700,000' },
    ],
    submarines: [
      { chassis: 'Attack Submarine',       loadStart: 750000,    loadMax: 4000000,  speedSurface: '40/35', speedMax: '60/40', accelStart: 3, accelMax: 5, sig: '7/7', dp: 250000, peopleSpace: '+236,250' },
      { chassis: 'Boomer',                 loadStart: 1000000,   loadMax: 16000000, speedSurface: '20/20', speedMax: '40/30', accelStart: 2, accelMax: 4, sig: '8/8', dp: 360000, peopleSpace: '+236,250' },
      { chassis: 'Commercial Sub, Heavy',  loadStart: 25000000,  loadMax: 40000000, speedSurface: '15/5',  speedMax: '45/30', accelStart: 1, accelMax: 3, sig: '5/4', dp: 140000, peopleSpace: '-36,000' },
      { chassis: 'Commercial Sub, Medium', loadStart: 7500000,   loadMax: 15000000, speedSurface: '25/5',  speedMax: '50/5',  accelStart: 2, accelMax: 4, sig: '6/5', dp: 80000, peopleSpace: '-30,000' },
    ],
  },

  // ── SAIL ─────────────────────────────────────────────────────────────────
  // Wind powered — no fuel or economy ratings

  sail: {
    boats: [
      { chassis: 'Skiff',        loadStart: 150, loadMax: 750,   speedStart: 30, speedMax: 60, accelStart: 3, accelMax: 7, sig: 6, dp: 25 },
      { chassis: 'Sport Cruiser',loadStart: 250, loadMax: 1000,  speedStart: 30, speedMax: 60, accelStart: 3, accelMax: 6, sig: 6, dp: 32 },
      { chassis: 'Water Scooter',loadStart: 20,  loadMax: 180,   speedStart: 15, speedMax: 45, accelStart: 3, accelMax: 7, sig: 8, dp: 25 },
      { chassis: 'Yacht',        loadStart: 400, loadMax: 2500,  speedStart: 30, speedMax: 50, accelStart: 3, accelMax: 6, sig: 6, dp: 65, peopleSpace: '+1,500' },
    ],
    ships: [
      { chassis: 'Harbor Tug',         loadStart: 1000,  loadMax: 5000,   speedSurface: '30(30)', speedMax: '50(50)', accelStart: 1, accelMax: 3, sig: '3/2', dp: 2000 },
      { chassis: 'Merchantman, Light',  loadStart: 25000, loadMax: 150000, speedSurface: '25(25)', speedMax: '40(40)', accelStart: 2, accelMax: 5, sig: '3/2', dp: 20000, peopleSpace: '-22,500' },
      { chassis: 'Trawler',             loadStart: 5000,  loadMax: 50000,  speedSurface: '25(25)', speedMax: '40(40)', accelStart: 2, accelMax: 6, sig: '3/2', dp: 8000 },
    ],
  },

};

export default Rigger3PowerPlants;
