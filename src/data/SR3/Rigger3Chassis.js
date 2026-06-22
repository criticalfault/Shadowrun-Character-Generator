// Rigger 3 Chassis Table — extracted from pp.202-203 (Vehicles, Drones, Submarines)
// Column order: name, body, cfStart, cfMax, handling, armor, autonav, sensor,
//               seating, entry, designPoints, markupFactor, notes
// Body "H" suffix = Heavy structural rating (ships/subs)
// Armor "B" suffix = Ballistic only

const Rigger3Chassis = {

  // ── VEHICLES ─────────────────────────────────────────────────────────────

  bike: [
    { name: 'All-Terrain Vehicle', body: 2, cfStart: 2,  cfMax: 15,  handling: '4/4', armor: 0, autonav: '0/-', sensor: '0/-', seating: '2m', entry: '—',        dp: 595,  muf: 0.40 },
    { name: 'Chopper',             body: 2, cfStart: 2,  cfMax: 9,   handling: '4/6', armor: 0, autonav: '0/-', sensor: '0/-', seating: '2m', entry: '—',        dp: 108,  muf: 0.30 },
    { name: 'Off-Road',            body: 2, cfStart: 1,  cfMax: 9,   handling: '3/6', armor: 0, autonav: '0/-', sensor: '0/-', seating: '1m', entry: '—',        dp: 338,  muf: 0.25 },
    { name: 'Racing Cycle',        body: 2, cfStart: 1,  cfMax: 2,   handling: '3/6', armor: 0, autonav: '0/-', sensor: '0/-', seating: '1m', entry: '—',        dp: 180,  muf: 0.30 },
    { name: 'Scooter',             body: 2, cfStart: 0,  cfMax: 2,   handling: '3/6', armor: 0, autonav: '0/-', sensor: '0/-', seating: '1m', entry: '—',        dp: 50,   muf: 0.25 },
  ],

  boat: [
    { name: 'Skiff',         body: 3, cfStart: 6,   cfMax: 25,   handling: '3', armor: 0, autonav: '0/-', sensor: '0/-', seating: '2',  entry: '—',  dp: 50,  muf: 1.25 },
    { name: 'Water Scooter', body: 2, cfStart: 0,   cfMax: 7,    handling: '3', armor: 0, autonav: '0/-', sensor: '0/-', seating: '1',  entry: '—',  dp: 36,  muf: 0.50 },
    { name: 'Speedboat',     body: 3, cfStart: 0,   cfMax: 30,   handling: '4', armor: 0, autonav: '0/-', sensor: '0/-', seating: '1',  entry: '1d', dp: 50,  muf: 1.25 },
    { name: 'Sport Cruiser', body: 5, cfStart: 48,  cfMax: 240,  handling: '4', armor: 0, autonav: '0/-', sensor: '1/-', seating: '2',  entry: '1d', dp: 84,  muf: 1.25, notes: '+210 CF People Space, 10 High Amenities' },
    { name: 'Yacht',         body: 8, cfStart: 240, cfMax: 1500, handling: '5', armor: 0, autonav: '0/-', sensor: '1/-', seating: '2',  entry: '1d', dp: 160, muf: 1.25 },
  ],

  car: [
    { name: 'APC, Tracked',           body: 6,  cfStart: 18,  cfMax: 96,  handling: '5/5',  armor: '6',  autonav: '0/-', sensor: '0/-', seating: '—',    entry: '1d+1h+1x', dp: 800, muf: 1.00 },
    { name: 'APC, Wheeled',           body: 6,  cfStart: 18,  cfMax: 96,  handling: '4/6',  armor: '6',  autonav: '0/-', sensor: '0/-', seating: '1b',   entry: '1d+1h+1x', dp: 750, muf: 1.00 },
    { name: 'Caterpillar, Heavy',     body: 10, cfStart: 6,   cfMax: 250, handling: '5/5',  armor: 0,    autonav: '0/-', sensor: '0/-', seating: '—',    entry: '—',        dp: 750, muf: 1.00 },
    { name: 'Caterpillar, Light',     body: 5,  cfStart: 6,   cfMax: 30,  handling: '4/4',  armor: 0,    autonav: '0/-', sensor: '0/-', seating: '1',    entry: '—',        dp: 300, muf: 1.00 },
    { name: 'Caterpillar, Medium',    body: 8,  cfStart: 3,   cfMax: 18,  handling: '4/4',  armor: 0,    autonav: '0/-', sensor: '0/-', seating: '—',    entry: '—',        dp: 500, muf: 1.00 },
    { name: 'Caterpillar, Miniature', body: 2,  cfStart: 2,   cfMax: 10,  handling: '4/4',  armor: 0,    autonav: '0/-', sensor: '0/-', seating: '—',    entry: '—',        dp: 150, muf: 0.50 },
    { name: 'Industrial Mover, Heavy',  body: 6, cfStart: 48, cfMax: 250, handling: '3/8',  armor: 0,    autonav: '0/-', sensor: '0/-', seating: '—',    entry: '—',        dp: 75,  muf: 0.80 },
    { name: 'Industrial Mover, Light',  body: 2, cfStart: 6,  cfMax: 42,  handling: '3/8',  armor: 0,    autonav: '0/-', sensor: '0/-', seating: '—',    entry: '—',        dp: 40,  muf: 0.25 },
    { name: 'Industrial Mover, Medium', body: 4, cfStart: 18, cfMax: 52,  handling: '3/8',  armor: 0,    autonav: '0/-', sensor: '0/-', seating: '—',    entry: '—',        dp: 55,  muf: 0.40 },
    { name: 'Limousine',   body: 4, cfStart: 6,   cfMax: 250, handling: '4/8',  armor: 0, autonav: '0/-', sensor: '0/-', seating: '4+2b', entry: '4d+1t',      dp: 625, muf: 1.00 },
    { name: 'RV',          body: 4, cfStart: 48,  cfMax: 250, handling: '4/4',  armor: 0, autonav: '0/-', sensor: '0/-', seating: '2',    entry: '2d+1t',      dp: 80,  muf: 1.00, notes: '+162 CF People Space, 2 Basic Amenities' },
    { name: 'Sand Buggy',  body: 2, cfStart: 4,   cfMax: 35,  handling: '4/4',  armor: 0, autonav: '0/-', sensor: '0/-', seating: '1b',   entry: '—',          dp: 40,  muf: 0.40 },
    { name: 'Sedan',       body: 3, cfStart: 6,   cfMax: 30,  handling: '4/8',  armor: 0, autonav: '0/-', sensor: '0/-', seating: '4',    entry: '2d+1t',      dp: 50,  muf: 1.00 },
    { name: 'Sports Car',  body: 3, cfStart: 3,   cfMax: 18,  handling: '4/8',  armor: 0, autonav: '0/-', sensor: '0/-', seating: '2',    entry: '2d+1t',      dp: 125, muf: 1.00 },
    { name: 'SUV',         body: 3, cfStart: 1,   cfMax: 54,  handling: '4/6',  armor: 0, autonav: '0/-', sensor: '0/-', seating: '—',    entry: '1d',         dp: 70,  muf: 1.00 },
    { name: 'Subcompact',  body: 3, cfStart: 1,   cfMax: 16,  handling: '4/8',  armor: 0, autonav: '0/-', sensor: '0/-', seating: '—',    entry: '1d',         dp: 30,  muf: 1.00 },
    { name: 'Tractor',     body: 5, cfStart: 6,   cfMax: 52,  handling: '5/12', armor: 0, autonav: '2/-', sensor: '0/-', seating: '2',    entry: '2d',         dp: 160, muf: 1.00 },
    { name: 'Transport, Medium', body: 5, cfStart: 80,  cfMax: 400, handling: '5/12', armor: 0, autonav: '0/-', sensor: '0/-', seating: '2', entry: '2d+1x', dp: 160, muf: 1.00 },
    { name: 'Transport, Heavy',  body: 6, cfStart: 120, cfMax: 800, handling: '5/12', armor: 0, autonav: '0/-', sensor: '0/-', seating: '2', entry: '2d+1x', dp: 180, muf: 1.00 },
    { name: 'Van',         body: 4, cfStart: 48,  cfMax: 250, handling: '4/10', armor: 0, autonav: '0/-', sensor: '0/-', seating: '2',    entry: '2d+1s+1g',   dp: 60,  muf: 1.00 },
  ],

  fixedWing: [
    { name: 'Airliner',      body: 9,  cfStart: 500, cfMax: 7500, handling: '6', armor: 0, autonav: '3/-', sensor: '1/-', seating: '2',   entry: '5d',    dp: 2000,  muf: 2.50, notes: 'Standard L/T Profile' },
    { name: 'HSCT',          body: 10, cfStart: 360, cfMax: 800,  handling: '6', armor: 0, autonav: '4/-', sensor: '3/-', seating: '124', entry: '6d+1s', dp: 20000, muf: 2.50, notes: 'Standard L/T Profile + 6 Partial Basic Amenities' },
    { name: 'Jet Fighter',   body: 7,  cfStart: 6,   cfMax: 64,   handling: '6', armor: 0, autonav: '3/-', sensor: '5/-', seating: '1e',  entry: '1d',    dp: 2000,  muf: 2.50, notes: 'Enviroseal (gas), Standard L/T Profile' },
    { name: 'Single Engine', body: 4,  cfStart: 2,   cfMax: 63,   handling: '5', armor: 0, autonav: '1/-', sensor: '1/-', seating: '2',   entry: '2d',    dp: 75,    muf: 2.50, notes: 'Standard L/T Profile' },
    { name: 'Twin Engine',   body: 6,  cfStart: 48,  cfMax: 600,  handling: '5', armor: 0, autonav: '1/-', sensor: '1/-', seating: '2',   entry: '2d',    dp: 125,   muf: 2.50, notes: 'Standard L/T Profile' },
    { name: 'Ultralight',    body: 2,  cfStart: 0,   cfMax: 8,    handling: '4', armor: 0, autonav: '0/-', sensor: '0/-', seating: '1',   entry: '—',     dp: 20,    muf: 0.60, notes: 'Standard L/T Profile' },
  ],

  hovercraft: [
    { name: 'Hovercraft, Light',  body: 3, cfStart: 6,   cfMax: 24,  handling: '3', armor: 0, autonav: '0/-', sensor: '0/-', seating: '2', entry: '2d+1t', dp: 50,  muf: 2.00 },
    { name: 'Hovercraft, Medium', body: 4, cfStart: 60,  cfMax: 240, handling: '4', armor: 0, autonav: '0/-', sensor: '0/-', seating: '2', entry: '2+1x',  dp: 75,  muf: 2.00 },
    { name: 'Hovercraft, Heavy',  body: 5, cfStart: 100, cfMax: 480, handling: '4', armor: 0, autonav: '0/-', sensor: '0/-', seating: '2', entry: '2+1x',  dp: 350, muf: 2.00 },
  ],

  rotorCraft: [
    { name: 'Attack Helicopter',  body: 5, cfStart: 4,  cfMax: 64,  handling: '5', armor: 0, autonav: '2/-', sensor: '3/-', seating: '1', entry: '1d',    dp: 1000, muf: 2.50, notes: 'VTOL L/T Profile' },
    { name: 'Autogyro',           body: 3, cfStart: 0,  cfMax: 8,   handling: '4', armor: 0, autonav: '0/-', sensor: '0/-', seating: '1', entry: '—',     dp: 200,  muf: 0.60, notes: 'VTOL L/T Profile' },
    { name: 'Cargo Helicopter',   body: 7, cfStart: 80, cfMax: 600, handling: '5', armor: 0, autonav: '1/-', sensor: '1/-', seating: '2', entry: '2d+1r', dp: 1000, muf: 2.50, notes: 'VTOL L/T Profile' },
    { name: 'Utility Helicopter', body: 4, cfStart: 50, cfMax: 75,  handling: '5', armor: 0, autonav: '1/-', sensor: '1/-', seating: '2', entry: '2d+1s', dp: 500,  muf: 2.50, notes: 'VTOL L/T Profile' },
    { name: 'Tilt-wing, Heavy',   body: 7, cfStart: 72, cfMax: 640, handling: '6', armor: 0, autonav: '1/-', sensor: '1/-', seating: '2', entry: '2d+1s', dp: 1200, muf: 2.50, notes: 'VTOL L/T Profile' },
    { name: 'Tilt-wing, Medium',  body: 5, cfStart: 48, cfMax: 96,  handling: '6', armor: 0, autonav: '1/-', sensor: '1/-', seating: '2', entry: '2d+1s', dp: 600,  muf: 2.50, notes: 'VTOL L/T Profile' },
  ],

  ships: [
    { name: 'Aircraft Carrier, Heavy',  body: '9H', cfStart: 2500000,  cfMax: 3000000,  handling: '5', armor: '6B', autonav: '3/-', sensor: '7/0', seating: '—', entry: '4L+6s+6d', dp: 3000000,  muf: 7.0, notes: '+593,250 CF People Space, Flight Deck (325m angled, catapult/arrestor cable), 4,600 Basic Amenities, 400 Improved Amenities' },
    { name: 'Aircraft Carrier, Light',  body: '6H', cfStart: 800000,   cfMax: 1250000,  handling: '5', armor: '4B', autonav: '3/-', sensor: '6/0', seating: '—', entry: '1L+4s+4d', dp: 500000,   muf: 5.0, notes: '+242,250 CF People Space, Flight Deck (100m), 1,000 Basic Amenities, 100 Improved Amenities' },
    { name: 'Aircraft Carrier, Medium', body: '7H', cfStart: 1000000,  cfMax: 1750000,  handling: '5', armor: '6B', autonav: '3/-', sensor: '7/0', seating: '—', entry: '2L+6s+6d', dp: 1500000,  muf: 6.0, notes: '+350,250 CF People Space, Flight Deck (150m, angled), 2,800 Basic Amenities, 200 Improved Amenities' },
    { name: 'Corvette',                 body: '3H', cfStart: 375,      cfMax: 1000,     handling: '3', armor: '0B', autonav: '3/-', sensor: '3/4', seating: '—', entry: '10d',      dp: 50000,    muf: 1.50, notes: '+3,600 CF People Space, 35 Basic Amenities' },
    { name: 'Cruiser',                  body: '6H', cfStart: 2000,     cfMax: 20000,    handling: '4', armor: '4B', autonav: '3/-', sensor: '4/3', seating: '—', entry: '12d',      dp: 500000,   muf: 6.0, notes: '+47,250 CF People Space, 500 Basic Amenities' },
    { name: 'Destroyer',                body: '5H', cfStart: 1700,     cfMax: 11000,    handling: '4', armor: '4B', autonav: '3/-', sensor: '4/3', seating: '—', entry: '12d',      dp: 200000,   muf: 6.0, notes: '+36,000 CF People Space, 375 Basic Amenities' },
    { name: 'Freighter',                body: '10H',cfStart: 750000,   cfMax: 10000000, handling: '5', armor: '0B', autonav: '1/-', sensor: '1/1', seating: '—', entry: '16d',      dp: 1200000,  muf: 1.50, notes: '+3,000 CF People Space, 25 Basic Amenities' },
    { name: 'Frigate',                  body: '4H', cfStart: 1700,     cfMax: 10200,    handling: '4', armor: '3B', autonav: '3/-', sensor: '4/4', seating: '—', entry: '12d',      dp: 100000,   muf: 5.0, notes: '+3,600 CF People Space, 300 Basic Amenities' },
    { name: 'Harbor Tug',               body: '1H', cfStart: 200,      cfMax: 500,      handling: '3', armor: '0B', autonav: '2/-', sensor: '0/0', seating: '6', entry: '2d+1h',    dp: 2500,     muf: 1.50, notes: '+3,000 CF People Space, 25 Basic Amenities' },
    { name: 'Merchantman, Heavy',        body: '7H', cfStart: 250000,  cfMax: 625000,   handling: '5', armor: '0B', autonav: '2/-', sensor: '1/1', seating: '4d+2h', entry: '—',   dp: 300000,   muf: 2.0, notes: '+3,000 CF People Space, 25 Basic Amenities' },
    { name: 'Merchantman, Light',        body: '3H', cfStart: 2400,    cfMax: 32000,    handling: '4', armor: '0B', autonav: '2/-', sensor: '1/0', seating: '—', entry: '4d',       dp: 30000,    muf: 1.50, notes: '+2,400 CF People Space, 15 Basic Amenities' },
    { name: 'Merchantman, Medium',       body: '5H', cfStart: 36000,   cfMax: 108000,   handling: '4', armor: '0B', autonav: '3/-', sensor: '1/0', seating: '—', entry: '4d',       dp: 80000,    muf: 2.0, notes: '+2,700 CF People Space, 20 Basic Amenities' },
    { name: 'Patrol Craft',             body: '2H', cfStart: 125,      cfMax: 500,      handling: '3', armor: '0',  autonav: '3/-', sensor: '3/3', seating: '—', entry: '4d',       dp: 20000,    muf: 1.50, notes: '+2,700 CF People Space, 20 Basic Amenities' },
    { name: 'Trawler',                  body: '2H', cfStart: 400,      cfMax: 1000,     handling: '4', armor: '0B', autonav: '2/-', sensor: '0/0', seating: '15', entry: '4d',      dp: 10000,    muf: 1.50 },
  ],

  vectoredThrust: [
    { name: 'Thunderbird',      body: 6, cfStart: 16, cfMax: 96, handling: '3', armor: 0, autonav: '2/-', sensor: '3/-', seating: '2e', entry: '1h+1s+1r', dp: 3200,  muf: 2.50, notes: 'Enviroseal (gas), VSTOL T/L Profile' },
    { name: 'Jump Jet Fighter', body: 7, cfStart: 6,  cfMax: 64, handling: '5', armor: 0, autonav: '3/-', sensor: '5/-', seating: '1e', entry: '1c',       dp: 24000, muf: 2.50, notes: 'Enviroseal (gas), VTOL T/L Profile' },
  ],

  special: [
    { name: 'Barge',                    body: '3H', cfStart: 2000,   cfMax: 4000,   handling: '—', armor: 0, autonav: '—/-', sensor: '0/0', seating: '—', entry: '1d or Open', dp: 1000,   muf: 1.00, notes: 'Load 1,000,000 kg (Max 10,000,000 kg)' },
    { name: 'Locomotive, Bullet',       body: 9,    cfStart: 4,      cfMax: 200,    handling: '5', armor: 0, autonav: '2/-', sensor: '1/-', seating: '2', entry: '2d',         dp: 4000,   muf: 1.00, notes: 'GridLink (Electric locomotives only)' },
    { name: 'Locomotive, Bulk',         body: 10,   cfStart: 4,      cfMax: 200,    handling: '5', armor: 0, autonav: '0/-', sensor: '0/-', seating: '1', entry: '2d',         dp: 3600,   muf: 1.00 },
    { name: 'Locomotive, Express',      body: 8,    cfStart: 4,      cfMax: 200,    handling: '4', armor: 0, autonav: '0/-', sensor: '0/-', seating: '1', entry: '2d',         dp: 2500,   muf: 1.00, notes: 'GridLink (Electric locomotives only)' },
    { name: 'Locomotive, Non-rail',     body: 8,    cfStart: 10,     cfMax: 80,     handling: '3/6', armor: 0, autonav: '4/-', sensor: '0/-', seating: '1', entry: '2d',       dp: 1500,   muf: 1.50 },
    { name: 'Locomotive, Streetcar',    body: 6,    cfStart: 160,    cfMax: 240,    handling: '4', armor: 0, autonav: '0/-', sensor: '0/-', seating: '1', entry: '1+10b',      dp: 1500,   muf: 1.00, notes: 'GridLink (Electric only); all CF is People Space' },
    { name: 'Locomotive, Switcher',     body: 8,    cfStart: 10,     cfMax: 80,     handling: '4', armor: 0, autonav: '0/-', sensor: '0/-', seating: '1', entry: '2d',         dp: 1500,   muf: 1.00 },
    { name: 'Rail Car, Freight',        body: 8,    cfStart: 800,    cfMax: 2000,   handling: '—', armor: 0, autonav: '—',   sensor: '0',   seating: '—', entry: '1g',         dp: 600,    muf: 1.00, notes: 'Load 80,000 kg (Max 120,000 kg); SIG=10-B' },
    { name: 'Rail Car, Long Passenger', body: 8,    cfStart: 960,    cfMax: 1200,   handling: '—', armor: 0, autonav: '—',   sensor: '0',   seating: '—', entry: '4d',         dp: 500,    muf: 1.00, notes: 'Load 24,000 kg (Max 30,000 kg); SIG=10-B' },
    { name: 'Rail Car, Short Passenger',body: 6,    cfStart: 480,    cfMax: 800,    handling: '—', armor: 0, autonav: '—',   sensor: '0',   seating: '—', entry: '4d',         dp: 400,    muf: 1.00, notes: 'Load 12,000 kg (Max 20,000 kg); SIG=10-B' },
    { name: 'Semiballistic',            body: '2H', cfStart: 250,    cfMax: 500,    handling: '6', armor: '1B', autonav: '4/4', sensor: '0/-', seating: '126', entry: '6d+1s', dp: 500000, muf: 1.00, notes: 'Special L/T Profile, Rigger Adaptation, 8 Partial Basic Amenities' },
    { name: 'Suborbital',               body: '1H', cfStart: 300,    cfMax: 750,    handling: '6', armor: '2B', autonav: '4/4', sensor: '0/-', seating: '126', entry: '6d+1s', dp: 100000, muf: 2.00, notes: 'Standard L/T Profile, Rigger Adaptation, 8 Partial Basic Amenities' },
    { name: 'Trailer, Heavy Axle',      body: 3,    cfStart: 12,     cfMax: 400,    handling: '—', armor: 0, autonav: '—/-', sensor: '0/-', seating: '—', entry: '1d or Open', dp: 75,     muf: 0.75, notes: 'Load 800 kg (Max 1,600 kg); SIG=10-B' },
    { name: 'Trailer, Light Axle',      body: 2,    cfStart: 4,      cfMax: 320,    handling: '—', armor: 0, autonav: '—/-', sensor: '0/-', seating: '—', entry: '1d or Open', dp: 60,     muf: 0.25, notes: 'Load 150 kg (Max 400 kg); SIG=10-B' },
    { name: 'Trailer, 20-foot',         body: 5,    cfStart: 400,    cfMax: 600,    handling: '—', armor: 0, autonav: '—/-', sensor: '0/-', seating: '—', entry: '1d or Open', dp: 100,    muf: 1.00, notes: 'Load 2,000 kg (Max 6,000 kg); SIG=10-B' },
    { name: 'Trailer, 40-foot',         body: 6,    cfStart: 800,    cfMax: 1000,   handling: '—', armor: 0, autonav: '—/-', sensor: '0/-', seating: '—', entry: '1d or Open', dp: 160,    muf: 1.00, notes: 'Load 10,000 kg (Max 12,000 kg); SIG=10-B' },
    { name: 'Trailer, 53-foot',         body: 7,    cfStart: 1200,   cfMax: 1600,   handling: '—', armor: 0, autonav: '—/-', sensor: '0/-', seating: '—', entry: '1d or Open', dp: 160,    muf: 1.00, notes: 'Load 10,000 kg (Max 25,000 kg); SIG=10-B' },
    { name: 'Zeppelin',                 body: 8,    cfStart: 48,     cfMax: 150,    handling: '5', armor: 0, autonav: '1/-', sensor: '2/-', seating: '2', entry: '2d',         dp: 1200,   muf: 1.00, notes: 'VTOL T/L Profile' },
  ],

  // ── DRONES ───────────────────────────────────────────────────────────────
  // All drones include radio-controlled interface and rigger adaptation free.
  // Autonav listed as pilot rating (—/n = drone only, no manual).

  drones: {
    car: [
      { name: 'Crawler, Micro',                     body: 0, cfStart: 0.6, cfMax: 0,  handling: '4/4', armor: 0, pilot: 1, sensor: 1, dp: 200, muf: 0.25 },
      { name: 'Crawler, Medium Tracked',             body: 2, cfStart: 2,   cfMax: 12, handling: '4/4', armor: 0, pilot: 1, sensor: 1, dp: 120, muf: 0.25 },
      { name: 'Crawler, Medium Wheeled',             body: 2, cfStart: 2,   cfMax: 12, handling: '4/6', armor: 0, pilot: 1, sensor: 1, dp: 120, muf: 0.25 },
      { name: 'Crawler, Small (Tracked & Wheeled)',  body: 1, cfStart: 0,   cfMax: 6,  handling: '4/4', armor: 0, pilot: 1, sensor: 1, dp: 35,  muf: 0.25 },
    ],

    fixedWing: [
      { name: 'UAV, Large',  body: 3, cfStart: 2, cfMax: 25, handling: '4', armor: 0, pilot: 1, sensor: 2, dp: 2210, muf: 0.25, notes: 'Standard L/T Profile, Setup Time (10 min.)' },
      { name: 'UAV, Medium', body: 2, cfStart: 1, cfMax: 12, handling: '4', armor: 0, pilot: 1, sensor: 1, dp: 1200, muf: 0.25, notes: 'Standard L/T Profile, Setup Time (10 min.)' },
      { name: 'UAV, Small',  body: 1, cfStart: 0, cfMax: 1,  handling: '3', armor: 0, pilot: 1, sensor: 1, dp: 600,  muf: 0.25, notes: 'Standard L/T Profile, Setup Time (3 min.)' },
    ],

    hovercraft: [
      { name: 'Skimmer, Medium', body: 2, cfStart: 1, cfMax: 10, handling: '3', armor: 0, pilot: 1, sensor: 1, dp: 150, muf: 1.00 },
      { name: 'Skimmer, Small',  body: 1, cfStart: 0, cfMax: 5,  handling: '3', armor: 0, pilot: 1, sensor: 1, dp: 50,  muf: 1.00 },
    ],

    rotorCraft: [
      { name: 'Tilt-wing UAV, Medium', body: 2, cfStart: 1, cfMax: 12, handling: '4', armor: 0, pilot: 1, sensor: 1, dp: 1460, muf: 0.25, notes: 'VTOL L/T Profile' },
      { name: 'Tilt-wing UAV, Large',  body: 3, cfStart: 2, cfMax: 25, handling: '4', armor: 0, pilot: 1, sensor: 1, dp: 2210, muf: 0.25, notes: 'VTOL L/T Profile' },
      { name: 'UAV, Medium',           body: 2, cfStart: 1, cfMax: 12, handling: '4', armor: 0, pilot: 1, sensor: 1, dp: 240,  muf: 0.25, notes: 'VTOL L/T Profile' },
      { name: 'UAV, Large',            body: 3, cfStart: 0, cfMax: 0,  handling: '4', armor: 0, pilot: 1, sensor: 1, dp: 90,   muf: 0.25, notes: 'VTOL L/T Profile' },
      { name: 'UAV, Small',            body: 1, cfStart: 0, cfMax: 1,  handling: '4', armor: 0, pilot: 1, sensor: 1, dp: 110,  muf: 0.25, notes: 'VTOL L/T Profile' },
    ],

    vectoredThrust: [
      { name: 'UAV, Medium', body: 2, cfStart: 1, cfMax: 20, handling: '4', armor: 0, pilot: 1, sensor: 1, dp: 70,  muf: 0.60, notes: 'VTOL L/T Profile' },
      { name: 'UAV, Large',  body: 3, cfStart: 2, cfMax: 25, handling: '4', armor: 0, pilot: 1, sensor: 1, dp: 160, muf: 0.60, notes: 'VTOL L/T Profile' },
    ],

    special: [
      { name: 'Anthroform, Medium',  body: 2, cfStart: 0,   cfMax: 1.6, handling: '3',   armor: 0, pilot: 1, sensor: 1, dp: 400, muf: 0.40, notes: 'Mechanical Arms (2, STR 6)' },
      { name: 'Anthroform, Large',   body: 3, cfStart: 1,   cfMax: 10,  handling: '4',   armor: 0, pilot: 1, sensor: 1, dp: 900, muf: 0.40, notes: 'Mechanical Arms (2, STR 9)' },
      { name: 'Anthroform, Mini',    body: 1, cfStart: 0,   cfMax: 0,   handling: '4',   armor: 0, pilot: 1, sensor: 1, dp: 45,  muf: 0.50, notes: 'VTOL L/T Profile' },
      { name: 'Walker, Extra-Large', body: 2, cfStart: 8,   cfMax: 24,  handling: '4/4', armor: 0, pilot: 1, sensor: 0, dp: 900, muf: 1.00 },
      { name: 'Walker, Large',       body: 3, cfStart: 4,   cfMax: 16,  handling: '4/4', armor: 0, pilot: 1, sensor: 0, dp: 425, muf: 1.00 },
      { name: 'Walker, Medium',      body: 2, cfStart: 2,   cfMax: 10,  handling: '4/4', armor: 0, pilot: 1, sensor: 0, dp: 240, muf: 0.25 },
      { name: 'Walker, Micro',       body: 0, cfStart: 0,   cfMax: 0.4, handling: '4/4', armor: 0, pilot: 1, sensor: 0, dp: 215, muf: 0.25 },
      { name: 'Walker, Small',       body: 1, cfStart: 0,   cfMax: 4,   handling: '4/4', armor: 0, pilot: 1, sensor: 0, dp: 165, muf: 0.25 },
    ],
  },

  // ── SUBMARINES ───────────────────────────────────────────────────────────
  // Submarines use speedStart/speedMax instead of the standard power plant table.
  // Depth column = crush depth rating.

  submarines: [
    { name: 'Attack Submarine',       body: '5H', cfStart: 600,    cfMax: 7500,   handling: '4', armor: '6B', autonav: '3/-', sensor: '5/6', speedStart: 400,   speedMax: 800,   depth: '—', entry: '2h',  dp: 250000,  muf: 6.00, notes: 'EnviroSeal (water & engine), Oxygen Generator, Torpedo Tubes (4), Heavy Launch Control Systems (4), +11,700 People Space, 105 Basic Amenities' },
    { name: 'Bathyscaph',             body: '5H', cfStart: 48,     cfMax: 120,    handling: '4', armor: '6B', autonav: '3/-', sensor: '0/3', speedStart: 8500,  speedMax: 12000, depth: 10,  entry: '1h',  dp: 75000,   muf: 2.00, notes: 'EnviroSeal (water & engine), Oxygen Generator' },
    { name: 'Boomer',                 body: '6H', cfStart: 7500,   cfMax: 15000,  handling: '5', armor: '6B', autonav: '3/-', sensor: '6/7', speedStart: 400,   speedMax: 1000,  depth: '—', entry: '2h',  dp: 640000,  muf: 2.00, notes: 'EnviroSeal (water & engine), Oxygen Generator, Torpedo tubes (4)' },
    { name: 'Commercial Sub, Heavy',  body: '7H', cfStart: 200000, cfMax: 320000, handling: '5', armor: '3B', autonav: '3/-', sensor: '0/1', speedStart: 1500,  speedMax: 3600,  depth: '—', entry: '3h',  dp: 150000,  muf: 2.00, notes: 'EnviroSeal (water & engine), Oxygen Generator, +2,940 CF People Space, 24 Basic Amenities' },
    { name: 'Commercial Sub, Light',  body: '3H', cfStart: 6400,   cfMax: 16000,  handling: '3', armor: '1B', autonav: '3/-', sensor: '0/1', speedStart: 150,   speedMax: 1600,  depth: '—', entry: '2h',  dp: 15000,   muf: 2.00, notes: 'EnviroSeal (water & engine), Oxygen Generator, +2,460 CF People Space, 16 Basic Amenities' },
    { name: 'Commercial Sub, Medium', body: '5H', cfStart: 40000,  cfMax: 100000, handling: '4', armor: '1B', autonav: '3/-', sensor: '0/1', speedStart: 1000,  speedMax: 2400,  depth: '—', entry: '2h',  dp: 50000,   muf: 2.00, notes: 'EnviroSeal (water & engine), Oxygen Generator, +2,700 CF People Space, 20 Basic Amenities' },
    { name: 'Minisub, Heavy',         body: 9,    cfStart: 5,      cfMax: 300,    handling: '4', armor: 4,    autonav: '3/-', sensor: '1/1', speedStart: 500,   speedMax: 3500,  depth: 3,   entry: '1h',  dp: 1280,    muf: 2.00, notes: 'EnviroSeal (water & engine), Torpedo Tubes (4), Life Support (20 man-hours)' },
    { name: 'Minisub, Light',         body: 4,    cfStart: 0,      cfMax: 25,     handling: '3', armor: 0,    autonav: '1/-', sensor: '0/0', speedStart: 50,    speedMax: 300,   depth: 1,   entry: '1h',  dp: 65,      muf: 2.00, notes: 'EnviroSeal (water & engine), Life Support (10 man-hours)' },
    { name: 'Minisub, Medium',        body: 6,    cfStart: 3,      cfMax: 200,    handling: '4', armor: 2,    autonav: '2/-', sensor: '1/1', speedStart: 150,   speedMax: 1000,  depth: 2,   entry: '1h',  dp: 420,     muf: 2.00, notes: 'EnviroSeal (water & engine), Oxygen Generator, Life Support (10 man-hours)' },
    { name: 'Patrol Submarine',       body: '4H', cfStart: 400,    cfMax: 5000,   handling: '3', armor: '6B', autonav: '2/-', sensor: '4/-', speedStart: 300,   speedMax: 600,   depth: '—', entry: '2h',  dp: 72000,   muf: 2.00, notes: 'EnviroSeal (water & engine), Oxygen Generator, Torpedo Tubes (4), Heavy Launch Control Systems (4), +600 CF People Space, 85 Basic Amenities' },
  ],

  submarineDrones: [
    { name: 'Sea Sled, Large',  body: 3, cfStart: 0, cfMax: 15, handling: '3', armor: 0, pilot: 1, sensor: '1/1', speedStart: 1000, speedMax: 6400, depth: '2m', dp: 40, muf: 1.50 },
    { name: 'Sea Sled, Medium', body: 2, cfStart: 0, cfMax: 6,  handling: '3', armor: 0, pilot: 1, sensor: '1/0', speedStart: 500,  speedMax: 3200, depth: '2m', dp: 25, muf: 1.25 },
    { name: 'Sea Sled, Small',  body: 1, cfStart: 0, cfMax: 2,  handling: '2', armor: 0, pilot: 1, sensor: '1/0', speedStart: 150,  speedMax: 1600, depth: '1m', dp: 10, muf: 1.00 },
  ],
};

export default Rigger3Chassis;
