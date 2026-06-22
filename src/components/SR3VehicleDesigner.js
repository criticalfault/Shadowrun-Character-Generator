import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Tooltip from '@mui/material/Tooltip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';

import Rigger3Chassis from '../data/SR3/Rigger3Chassis';
import Rigger3PowerPlants from '../data/SR3/Rigger3PowerPlants';
import Rigger3Mods from '../data/SR3/Rigger3Mods';

// ── category config ───────────────────────────────────────────────────────────

const CATEGORIES = [
  { key: 'bike',           label: 'Bikes',          ppKey: 'bikes' },
  { key: 'boat',           label: 'Boats',          ppKey: 'boats' },
  { key: 'car',            label: 'Cars',           ppKey: 'cars' },
  { key: 'fixedWing',      label: 'Fixed-Wing',     ppKey: 'fixedWingAircraft' },
  { key: 'hovercraft',     label: 'Hovercraft',     ppKey: 'hovercraft' },
  { key: 'rotorCraft',     label: 'Rotor Craft',    ppKey: 'rotorCraft' },
  { key: 'ships',          label: 'Ships',          ppKey: 'ships' },
  { key: 'vectoredThrust', label: 'Vectored Thrust',ppKey: 'vectoredThrust' },
  { key: 'special',        label: 'Special',        ppKey: 'specialVehicles' },
  { key: 'drones',         label: 'Drones',         ppKey: null },
  { key: 'submarines',     label: 'Submarines',     ppKey: 'submarines' },
  { key: 'submarineDrones',label: 'Sub Drones',     ppKey: 'submarines' },
];

const DRONE_CAT_PP = {
  car: 'cars',
  fixedWing: 'fixedWingAircraft',
  hovercraft: 'hovercraft',
  rotorCraft: 'rotorCraft',
  vectoredThrust: 'vectoredThrust',
  special: 'specialVehicles',
};

const FUEL_LABELS = {
  battery:          'Battery',
  chemicalRockets:  'Chemical Rockets',
  diesel:           'Diesel',
  electricFuelCell: 'Electric Fuel Cell',
  gasoline:         'Gasoline',
  jetTurbine:       'Jet Turbine',
  jetPropeller:     'Jet Propeller',
  methane:          'Methane',
  nuclear:          'Nuclear',
  sail:             'Sail',
};

// Ordered display groups for mod accordion
const MOD_GROUPS = [
  'Fuel Tank',
  'Functional Improvements',
  'Design Enhancements',
  'Facilities',
  'Robot Options',
  'Engine Modifications',
  'Control-System Modifications',
  'Protective System Modifications',
  'Signature Modifications',
  'Vehicle Weapon Mounts',
  'Turrets',
  'Electronic Warfare',
  'Electronic Systems',
  'Accessories',
];

// ── helpers ───────────────────────────────────────────────────────────────────

function fmt(v) {
  if (v === undefined || v === null || v === '') return '—';
  return v;
}

function range(start, max) {
  if (start === max || max === undefined) return fmt(start);
  return `${fmt(start)}–${fmt(max)}`;
}

// Try to parse an integer from a DP cost string.
// Returns null for formula-based costs or null input.
function parseDP(val) {
  if (val == null) return null;
  const n = parseInt(String(val), 10);
  return isNaN(n) ? null : n;
}

function getChassisRows(catKey) {
  if (catKey === 'drones') {
    return Object.entries(Rigger3Chassis.drones).flatMap(([subKey, rows]) =>
      rows.map(r => ({ ...r, _droneSubCat: subKey }))
    );
  }
  if (catKey === 'submarineDrones') return Rigger3Chassis.submarineDrones ?? [];
  return Rigger3Chassis[catKey] ?? [];
}

function getPPRows(ppKey, fuelKey) {
  if (!ppKey || !fuelKey) return [];
  return Rigger3PowerPlants[fuelKey]?.[ppKey] ?? [];
}

function fuelsForPPKey(ppKey) {
  return Object.keys(Rigger3PowerPlants).filter(fuelKey =>
    (Rigger3PowerPlants[fuelKey]?.[ppKey]?.length ?? 0) > 0
  );
}

// ── build flat mod-item list ──────────────────────────────────────────────────
// Returns an array of design-phase mod items with normalised fields.

function buildModItems(selectedFuelKey) {
  const items = [];

  const push = (id, name, category, dpCostRaw, cfRaw, loadRaw, maxImprovement, note) => {
    items.push({
      id,
      name,
      category,
      dpCostRaw: dpCostRaw != null ? String(dpCostRaw) : null,
      dpCostNum: parseDP(dpCostRaw),
      cfRaw: cfRaw != null ? String(cfRaw) : null,
      loadRaw: loadRaw != null ? String(loadRaw) : null,
      maxImprovement: maxImprovement != null ? String(maxImprovement) : null,
      note: note ?? null,
    });
  };

  // Fuel tank capacity — filtered to the selected fuel type
  const ftcEntries = selectedFuelKey ? Rigger3Mods.fuelTankCapacity : {};
  const ftcKeys = selectedFuelKey ? [selectedFuelKey] : Object.keys(ftcEntries);
  for (const fk of ftcKeys) {
    const ftc = Rigger3Mods.fuelTankCapacity[fk];
    if (!ftc) continue;
    push(
      `fuelTank::${fk}`,
      `Fuel Tank Capacity (${FUEL_LABELS[fk] ?? fk})`,
      'Fuel Tank',
      ftc.dpCost,
      ftc.cfConsumed,
      ftc.loadReduction,
      null,
      `Capacity increase: ${fmt(ftc.capacityIncrease)}`
    );
  }

  // Array-based mod sections
  const ARRAY_SECTIONS = [
    [Rigger3Mods.functionalImprovements,        'Functional Improvements'],
    [Rigger3Mods.designEnhancements,            'Design Enhancements'],
    [Rigger3Mods.facilities,                    'Facilities'],
    [Rigger3Mods.robotOptions,                  'Robot Options'],
    [Rigger3Mods.engineModifications,           'Engine Modifications'],
    [Rigger3Mods.controlSystemModifications,    'Control-System Modifications'],
    [Rigger3Mods.protectiveSystemModifications, 'Protective System Modifications'],
    [Rigger3Mods.signatureModifications,        'Signature Modifications'],
    [Rigger3Mods.vehicleWeaponMounts,           'Vehicle Weapon Mounts'],
    [Rigger3Mods.electronicSystems,             'Electronic Systems'],
    [Rigger3Mods.accessories,                   'Accessories'],
  ];

  for (const [arr, cat] of ARRAY_SECTIONS) {
    for (const mod of (arr ?? [])) {
      push(
        `${cat}::${mod.name}`,
        mod.name,
        cat,
        mod.design?.dpCost,
        mod.design?.cfConsumed,
        mod.design?.loadReduction,
        mod.design?.maxImprovement,
        mod.note
      );
    }
  }

  // Turrets (standard)
  for (const t of (Rigger3Mods.turretsTable ?? [])) {
    push(
      `turret::${t.size}`,
      `Turret — ${t.size}`,
      'Turrets',
      t.design.dpCost,
      t.design.cfConsumed,
      t.design.loadReduction,
      null,
      `WV ${t.weaponValue}, ${t.hardpointRequirement} HP. Internal: ${t.internalSpace.cf} CF, seating ${t.internalSpace.seating ?? 'None'}.`
    );
  }

  // Remote turrets
  for (const t of (Rigger3Mods.remoteTurretsTable ?? [])) {
    push(
      `remoteTurret::${t.size}`,
      `Remote Turret — ${t.size}`,
      'Turrets',
      t.design.dpCost,
      t.design.cfConsumed,
      t.design.loadReduction,
      null,
      `WV ${t.weaponValue}, ${t.hardpointRequirement} HP. Operator-controlled remotely.`
    );
  }

  // Electronic warfare tables (ECM / ECCM / ED / ECD)
  const EW_TABLES = [
    [Rigger3Mods.ecmTable,  'ECM'],
    [Rigger3Mods.eccmTable, 'ECCM'],
    [Rigger3Mods.edTable,   'ED'],
    [Rigger3Mods.ecdTable,  'ECD'],
  ];
  for (const [tbl, abbr] of EW_TABLES) {
    for (const row of (tbl ?? [])) {
      push(
        `${abbr}::${row.level}`,
        `${abbr} — Level ${row.level}`,
        'Electronic Warfare',
        row.dpCost,
        row.cfDesign,
        `${row.weightKg} kg`,
        null,
        row.streetIndex != null ? `Street Index ${row.streetIndex}, Avail ${row.availability}` : `Military/restricted. Avail ${row.availability}`
      );
    }
  }

  // Sensor systems
  for (const row of (Rigger3Mods.sensorSystemsTable ?? [])) {
    push(
      `sensor::${row.level}`,
      `Sensors — Level ${row.level}`,
      'Electronic Systems',
      row.dpCost,
      row.cfDesign,
      `${row.weightKg} kg`,
      null,
      row.streetIndex != null ? `Street Index ${row.streetIndex}` : 'Military/restricted'
    );
  }

  // Sonar systems
  for (const row of (Rigger3Mods.sonarSystemsTable ?? [])) {
    push(
      `sonar::${row.level}`,
      `Sonar — Level ${row.level}`,
      'Electronic Systems',
      row.dpCost,
      row.cfDesign,
      `${row.weightKg} kg`,
      null,
      row.streetIndex != null ? `Street Index ${row.streetIndex}` : 'Military/restricted'
    );
  }

  return items;
}

// ── stat panels ───────────────────────────────────────────────────────────────

function ChassisStatPanel({ chassis }) {
  const isDrone = 'pilot' in chassis;
  const isSub   = 'depth' in chassis;

  const rows = [
    ['Body',    chassis.body],
    ['CF',      range(chassis.cfStart, chassis.cfMax)],
    ['Handling',chassis.handling],
    ['Armor',   chassis.armor],
    ...(isDrone
      ? [['Pilot', chassis.pilot]]
      : [['Autonav', chassis.autonav], ['Sensor', chassis.sensor]]),
    ...(isSub ? [['Speed', range(chassis.speedStart, chassis.speedMax)], ['Depth', chassis.depth]] : []),
    ['Entry',   chassis.entry ?? '—'],
    ['Seating', chassis.seating ?? '—'],
    ['DP Cost', chassis.dp],
    ['MUF',     chassis.muf],
    ...(chassis.notes ? [['Notes', chassis.notes]] : []),
  ];

  return (
    <Box>
      <Typography variant="caption" color="text.secondary"
        sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
        Chassis Stats
      </Typography>
      <Table size="small">
        <TableBody>
          {rows.map(([label, val]) => (
            <TableRow key={label} sx={{ '&:last-child td': { border: 0 } }}>
              <TableCell sx={{ py: 0.25, pl: 0, fontSize: '0.82rem', color: 'text.secondary', width: 100 }}>{label}</TableCell>
              <TableCell sx={{ py: 0.25, fontWeight: 600, fontSize: '0.85rem' }}>{fmt(val)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

function PPStatPanel({ pp, fuelLabel }) {
  const isSub = 'speedSurface' in pp;
  const rows = [
    ['Fuel',      fuelLabel],
    ['Load (kg)', range(pp.loadStart, pp.loadMax)],
    ...(isSub
      ? [['Speed (surf)', pp.speedSurface], ['Speed (max)', pp.speedMax]]
      : [['Speed', range(pp.speedStart, pp.speedMax)]]),
    ...((pp.accelStart != null) ? [['Accel', range(pp.accelStart, pp.accelMax)]] : []),
    ['Sig',       fmt(pp.sig)],
    ...(pp.fuel != null ? [['Fuel Code', fmt(pp.fuel)]] : []),
    ...(pp.econStart != null ? [['Economy', range(pp.econStart, pp.econMax)]] : []),
    ['DP Budget', pp.dp],
    ...(pp.peopleSpace ? [['People Space', pp.peopleSpace]] : []),
  ];

  return (
    <Box>
      <Typography variant="caption" color="text.secondary"
        sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
        Power Plant Stats
      </Typography>
      <Table size="small">
        <TableBody>
          {rows.map(([label, val]) => (
            <TableRow key={label} sx={{ '&:last-child td': { border: 0 } }}>
              <TableCell sx={{ py: 0.25, pl: 0, fontSize: '0.82rem', color: 'text.secondary', width: 100 }}>{label}</TableCell>
              <TableCell sx={{ py: 0.25, fontWeight: 600, fontSize: '0.85rem' }}>{fmt(val)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

// ── DPBudgetBar ───────────────────────────────────────────────────────────────

function DPBudgetBar({ ppDp, chassisDp, modsDpNum, hasFormulaMods }) {
  const ppNum      = typeof ppDp      === 'number' ? ppDp      : null;
  const chassisNum = typeof chassisDp === 'number' ? chassisDp : null;
  const afterChassis = ppNum != null && chassisNum != null ? ppNum - chassisNum : null;
  const afterMods    = afterChassis != null ? afterChassis - modsDpNum : null;

  const chipColor = (val) => {
    if (val == null) return 'default';
    if (val < 0) return 'error';
    if (val < 100) return 'warning';
    return 'success';
  };

  return (
    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
      <Chip size="small" variant="outlined" label={`PP Budget: ${fmt(ppDp)} DP`} />
      <Typography variant="body2" color="text.secondary">−</Typography>
      <Chip size="small" variant="outlined" label={`Chassis: ${fmt(chassisDp)} DP`} />
      {modsDpNum > 0 && <>
        <Typography variant="body2" color="text.secondary">−</Typography>
        <Chip size="small" variant="outlined"
          label={`Mods: ${modsDpNum}${hasFormulaMods ? '+?' : ''} DP`} />
      </>}
      <Typography variant="body2" color="text.secondary">=</Typography>
      <Chip
        size="small"
        label={afterMods != null
          ? `${afterMods}${hasFormulaMods ? '−?' : ''} DP remaining`
          : 'Select chassis + PP'}
        color={chipColor(afterMods)}
      />
    </Box>
  );
}

// ── ModPickerAccordion ────────────────────────────────────────────────────────

function ModPickerAccordion({ modItems, chosenMods, onAdd, onRemove }) {
  // Group items by category in MOD_GROUPS order
  const grouped = useMemo(() => {
    const map = {};
    for (const item of modItems) {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    }
    const result = [];
    for (const g of MOD_GROUPS) {
      if (map[g]?.length) result.push({ group: g, items: map[g] });
    }
    // any extra categories not in MOD_GROUPS
    for (const [g, items] of Object.entries(map)) {
      if (!MOD_GROUPS.includes(g)) result.push({ group: g, items });
    }
    return result;
  }, [modItems]);

  const chosenById = useMemo(() => {
    const m = {};
    for (const cm of chosenMods) m[cm.id] = cm.qty;
    return m;
  }, [chosenMods]);

  return (
    <Box>
      {grouped.map(({ group, items }) => (
        <Accordion key={group} disableGutters square
          sx={{ border: '1px solid', borderColor: 'divider', '&:before': { display: 'none' }, mb: 0.5 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ minHeight: 40 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{group}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1, alignSelf: 'center' }}>
              ({items.length} options)
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: 'action.hover' }}>
                  <TableCell sx={{ py: 0.5, fontSize: '0.75rem' }}>Mod</TableCell>
                  <TableCell align="center" sx={{ py: 0.5, fontSize: '0.75rem', width: 80 }}>DP Cost</TableCell>
                  <TableCell align="center" sx={{ py: 0.5, fontSize: '0.75rem', width: 60 }}>CF</TableCell>
                  <TableCell align="center" sx={{ py: 0.5, fontSize: '0.75rem', width: 80 }}>Max</TableCell>
                  <TableCell sx={{ width: 100 }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map(item => {
                  const qty = chosenById[item.id] ?? 0;
                  const isChosen = qty > 0;
                  return (
                    <TableRow key={item.id}
                      sx={{ opacity: 1, bgcolor: isChosen ? 'action.selected' : 'inherit' }}>
                      <TableCell sx={{ py: 0.5, fontSize: '0.82rem' }}>
                        {item.note
                          ? <Tooltip title={item.note} placement="right" arrow>
                              <span style={{ cursor: 'help', borderBottom: '1px dotted' }}>{item.name}</span>
                            </Tooltip>
                          : item.name}
                      </TableCell>
                      <TableCell align="center" sx={{ py: 0.5, fontSize: '0.82rem' }}>
                        {item.dpCostNum != null
                          ? item.dpCostNum
                          : <Tooltip title={item.dpCostRaw ?? 'No design DP cost'}>
                              <span style={{ color: 'var(--mui-palette-text-secondary)', cursor: 'help' }}>
                                {item.dpCostRaw != null ? '†' : '—'}
                              </span>
                            </Tooltip>
                        }
                      </TableCell>
                      <TableCell align="center" sx={{ py: 0.5, fontSize: '0.82rem' }}>
                        {fmt(item.cfRaw)}
                      </TableCell>
                      <TableCell align="center" sx={{ py: 0.5, fontSize: '0.75rem', color: 'text.secondary' }}>
                        {fmt(item.maxImprovement)}
                      </TableCell>
                      <TableCell align="right" sx={{ py: 0.25 }}>
                        {isChosen ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                            <IconButton size="small" onClick={() => onRemove(item)} title="Remove one">
                              <RemoveIcon fontSize="inherit" />
                            </IconButton>
                            <Typography variant="caption" sx={{ minWidth: 16, textAlign: 'center', fontWeight: 700 }}>
                              {qty}
                            </Typography>
                            <IconButton size="small" onClick={() => onAdd(item)} title="Add another">
                              <AddIcon fontSize="inherit" />
                            </IconButton>
                          </Box>
                        ) : (
                          <Button size="small" variant="outlined" sx={{ fontSize: '0.72rem', py: 0 }}
                            onClick={() => onAdd(item)}>
                            Add
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

// ── ChosenModsPanel ───────────────────────────────────────────────────────────

function ChosenModsPanel({ chosenMods, modsDpNum, hasFormulaMods, onRemoveAll }) {
  if (chosenMods.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
        No modifications added yet.
      </Typography>
    );
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '0.75rem' }}>Modification</TableCell>
            <TableCell align="center" sx={{ fontSize: '0.75rem', width: 40 }}>×</TableCell>
            <TableCell align="center" sx={{ fontSize: '0.75rem', width: 80 }}>DP</TableCell>
            <TableCell sx={{ width: 40 }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {chosenMods.map(cm => (
            <TableRow key={cm.id}>
              <TableCell sx={{ fontSize: '0.82rem', py: 0.5 }}>{cm.name}</TableCell>
              <TableCell align="center" sx={{ fontSize: '0.82rem', py: 0.5 }}>{cm.qty}</TableCell>
              <TableCell align="center" sx={{ fontSize: '0.82rem', py: 0.5 }}>
                {cm.dpCostNum != null
                  ? cm.dpCostNum * cm.qty
                  : <Tooltip title={cm.dpCostRaw ?? 'Formula-based'}>
                      <span style={{ cursor: 'help', color: 'var(--mui-palette-warning-main)' }}>†</span>
                    </Tooltip>
                }
              </TableCell>
              <TableCell sx={{ py: 0.25 }}>
                <IconButton size="small" onClick={() => onRemoveAll(cm)} title="Remove">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2} sx={{ py: 0.5, fontWeight: 700, fontSize: '0.82rem' }}>Total</TableCell>
            <TableCell align="center" sx={{ py: 0.5, fontWeight: 700, fontSize: '0.82rem' }}>
              {modsDpNum}{hasFormulaMods ? '+?' : ''}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
      {hasFormulaMods && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
          † Formula-based DP costs must be calculated manually from the Rigger 3 rules.
        </Typography>
      )}
    </Box>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function SR3VehicleDesigner({ onSave }) {
  const [catIdx, setCatIdx]               = useState(0);
  const [selectedChassis, setSelectedChassis] = useState(null);
  const [selectedPP, setSelectedPP]           = useState(null);
  const [vehicleName, setVehicleName]         = useState('');
  const [fuelTabIdx, setFuelTabIdx]           = useState(0);
  // chosenMods: [{ id, name, qty, dpCostNum, dpCostRaw, cfRaw }]
  const [chosenMods, setChosenMods]           = useState([]);
  const [notes, setNotes]                     = useState('');

  const category = CATEGORIES[catIdx];

  const chassisRows = useMemo(() => getChassisRows(category.key), [category.key]);

  const ppKey = useMemo(() => {
    if (category.key === 'drones' && selectedChassis?._droneSubCat) {
      return DRONE_CAT_PP[selectedChassis._droneSubCat] ?? null;
    }
    return category.ppKey;
  }, [category.key, selectedChassis]);

  const availableFuels = useMemo(() => (ppKey ? fuelsForPPKey(ppKey) : []), [ppKey]);
  const safeFuelTabIdx = Math.min(fuelTabIdx, Math.max(0, availableFuels.length - 1));
  const currentFuelKey = availableFuels[safeFuelTabIdx] ?? null;
  const ppRows = useMemo(() => getPPRows(ppKey, currentFuelKey), [ppKey, currentFuelKey]);

  // DP calculations
  const dpBudget = useMemo(() => {
    if (typeof selectedPP?.dp !== 'number') return null;
    return selectedPP.dp;
  }, [selectedPP]);

  const chassisDp = useMemo(() => {
    if (typeof selectedChassis?.dp !== 'number') return null;
    return selectedChassis.dp;
  }, [selectedChassis]);

  const dpAfterChassis = dpBudget != null && chassisDp != null ? dpBudget - chassisDp : null;

  const modsDpNum = useMemo(() =>
    chosenMods.reduce((sum, cm) => sum + (cm.dpCostNum != null ? cm.dpCostNum * cm.qty : 0), 0),
    [chosenMods]
  );
  const hasFormulaMods = chosenMods.some(cm => cm.dpCostNum == null && cm.dpCostRaw != null);

  // Flat mod items for the picker
  const modItems = useMemo(() => buildModItems(currentFuelKey), [currentFuelKey]);

  // ── handlers ────────────────────────────────────────────────────────────────

  const handleSelectCategory = (_, v) => {
    setCatIdx(v);
    setSelectedChassis(null);
    setSelectedPP(null);
    setFuelTabIdx(0);
    setChosenMods([]);
  };

  const handleSelectChassis = (ch) => {
    setSelectedChassis(ch);
    setSelectedPP(null);
    setChosenMods([]);
  };

  const handleSelectFuelTab = (_, v) => {
    setFuelTabIdx(v);
    setSelectedPP(null);
    setChosenMods([]);
  };

  const handleAddMod = (item) => {
    setChosenMods(prev => {
      const existing = prev.find(cm => cm.id === item.id);
      if (existing) return prev.map(cm => cm.id === item.id ? { ...cm, qty: cm.qty + 1 } : cm);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const handleDecrMod = (item) => {
    setChosenMods(prev => {
      const existing = prev.find(cm => cm.id === item.id);
      if (!existing) return prev;
      if (existing.qty <= 1) return prev.filter(cm => cm.id !== item.id);
      return prev.map(cm => cm.id === item.id ? { ...cm, qty: cm.qty - 1 } : cm);
    });
  };

  const handleRemoveAllMod = (cm) => {
    setChosenMods(prev => prev.filter(c => c.id !== cm.id));
  };

  const buildDesign = () => ({
    name: vehicleName || `Custom ${selectedChassis?.name ?? 'Vehicle'}`,
    edition: 'SR3',
    chassis: selectedChassis,
    powerPlant: { ...selectedPP, fuelType: currentFuelKey },
    chosenMods,
    dpAfterChassis,
    modsDpNum,
    hasFormulaMods,
    notes,
  });

  const handleSave = () => {
    if (!selectedChassis || !selectedPP) return;
    onSave?.(buildDesign());
  };

  const handleExport = () => {
    if (!selectedChassis || !selectedPP) return;
    const design = buildDesign();
    const blob = new Blob(
      [JSON.stringify({ type: 'sr-custom-vehicle', version: 2, design }, null, 2)],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${design.name}.srvehicle.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file || !onSave) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed.type === 'sr-custom-vehicle' && parsed.design) onSave(parsed.design);
      } catch {}
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // ── render ──────────────────────────────────────────────────────────────────

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Design a custom vehicle using Rigger 3 rules. Choose a chassis, then a power plant, then
        add design-phase modifications. Formula-based DP costs (marked †) must be verified
        against the Rigger 3 rulebook.
      </Typography>

      {/* ── Step 1: Chassis ── */}
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>1. Choose Chassis</Typography>
        <Tabs
          value={catIdx}
          onChange={handleSelectCategory}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          {CATEGORIES.map((c, i) => <Tab key={c.key} label={c.label} value={i} sx={{ fontSize: '0.78rem' }} />)}
        </Tabs>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Chassis</TableCell>
              <TableCell align="center">Body</TableCell>
              <TableCell align="center">CF</TableCell>
              <TableCell align="center">Handling</TableCell>
              <TableCell align="center">Armor</TableCell>
              <TableCell align="center">Sensor/Pilot</TableCell>
              <TableCell align="center">DP Cost</TableCell>
              <TableCell align="center">MUF</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {chassisRows.map((ch, i) => (
              <TableRow key={i} selected={selectedChassis === ch} hover sx={{ cursor: 'pointer' }}
                onClick={() => handleSelectChassis(ch)}>
                <TableCell sx={{ fontSize: '0.82rem' }}>{ch.name}</TableCell>
                <TableCell align="center">{ch.body}</TableCell>
                <TableCell align="center">{range(ch.cfStart, ch.cfMax)}</TableCell>
                <TableCell align="center">{ch.handling}</TableCell>
                <TableCell align="center">{ch.armor}</TableCell>
                <TableCell align="center">{ch.sensor ?? ch.pilot ?? '—'}</TableCell>
                <TableCell align="center">{ch.dp}</TableCell>
                <TableCell align="center">{ch.muf}</TableCell>
                <TableCell align="right">
                  {selectedChassis === ch && <Chip size="small" label="selected" color="primary" />}
                </TableCell>
              </TableRow>
            ))}
            {chassisRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography variant="body2" color="text.secondary">No chassis data for this category yet.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* ── Step 2: Power Plant ── */}
      {selectedChassis && (
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>2. Choose Power Plant — {selectedChassis.name}</Typography>

          {availableFuels.length === 0 ? (
            <Alert severity="info">No power plant data available for this chassis category yet.</Alert>
          ) : (
            <>
              <Tabs
                value={safeFuelTabIdx}
                onChange={handleSelectFuelTab}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
              >
                {availableFuels.map((fk, i) => (
                  <Tab key={fk} label={FUEL_LABELS[fk] ?? fk} value={i} sx={{ fontSize: '0.78rem' }} />
                ))}
              </Tabs>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Power Plant</TableCell>
                    <TableCell align="center">Load (kg)</TableCell>
                    <TableCell align="center">Speed</TableCell>
                    <TableCell align="center">Accel</TableCell>
                    <TableCell align="center">Sig</TableCell>
                    <TableCell align="center">Fuel</TableCell>
                    <TableCell align="center">Economy</TableCell>
                    <TableCell align="center">DP Budget</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ppRows.map((pp, i) => (
                    <TableRow key={i} selected={selectedPP === pp} hover sx={{ cursor: 'pointer' }}
                      onClick={() => setSelectedPP(pp)}>
                      <TableCell sx={{ fontSize: '0.82rem' }}>{pp.chassis}</TableCell>
                      <TableCell align="center">{range(pp.loadStart, pp.loadMax)}</TableCell>
                      <TableCell align="center">
                        {'speedSurface' in pp
                          ? `${pp.speedSurface} / ${pp.speedMax}`
                          : range(pp.speedStart, pp.speedMax)}
                      </TableCell>
                      <TableCell align="center">
                        {pp.accelStart != null ? range(pp.accelStart, pp.accelMax) : '—'}
                      </TableCell>
                      <TableCell align="center">{fmt(pp.sig)}</TableCell>
                      <TableCell align="center">{pp.fuel != null ? fmt(pp.fuel) : '—'}</TableCell>
                      <TableCell align="center">
                        {pp.econStart != null ? range(pp.econStart, pp.econMax) : '—'}
                      </TableCell>
                      <TableCell align="center">{pp.dp}</TableCell>
                      <TableCell align="right">
                        {selectedPP === pp && <Chip size="small" label="selected" color="primary" />}
                      </TableCell>
                    </TableRow>
                  ))}
                  {ppRows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        <Typography variant="body2" color="text.secondary">
                          No {FUEL_LABELS[currentFuelKey]} entries for this chassis category.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          )}
        </Paper>
      )}

      {/* ── Step 3: Modifications ── */}
      {selectedChassis && selectedPP && (
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>3. Add Modifications (Design Phase)</Typography>

          <DPBudgetBar
            ppDp={dpBudget}
            chassisDp={chassisDp}
            modsDpNum={modsDpNum}
            hasFormulaMods={hasFormulaMods}
          />

          <ModPickerAccordion
            modItems={modItems}
            chosenMods={chosenMods}
            onAdd={handleAddMod}
            onRemove={handleDecrMod}
          />
        </Paper>
      )}

      {/* ── Step 4: Summary + Save ── */}
      {selectedChassis && selectedPP && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>

          {/* Stats + chosen mods */}
          <Box sx={{ flex: '1 1 400px' }}>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>4. Design Summary</Typography>

              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 2 }}>
                <Box sx={{ flex: '1 1 160px' }}>
                  <ChassisStatPanel chassis={selectedChassis} />
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ flex: '1 1 160px' }}>
                  <PPStatPanel pp={selectedPP} fuelLabel={FUEL_LABELS[currentFuelKey] ?? currentFuelKey} />
                </Box>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="subtitle2" gutterBottom>Chosen Modifications</Typography>
              <ChosenModsPanel
                chosenMods={chosenMods}
                modsDpNum={modsDpNum}
                hasFormulaMods={hasFormulaMods}
                onRemoveAll={handleRemoveAllMod}
              />

              <TextField
                multiline
                minRows={2}
                size="small"
                label="Additional notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                sx={{ width: '100%', mt: 1 }}
              />
            </Paper>
          </Box>

          {/* Save panel */}
          <Box sx={{ flex: '0 0 220px' }}>
            <Paper variant="outlined" sx={{ p: 2, position: 'sticky', top: 16 }}>
              <Typography variant="subtitle2" gutterBottom>Save Design</Typography>
              <TextField
                size="small"
                label="Vehicle name"
                value={vehicleName}
                onChange={e => setVehicleName(e.target.value)}
                sx={{ width: '100%', mb: 1.5 }}
              />
              <Button variant="contained" fullWidth onClick={handleSave} disabled={!onSave}>
                Save to Character
              </Button>
              <Button variant="outlined" fullWidth startIcon={<DownloadIcon />}
                sx={{ mt: 1 }} onClick={handleExport}>
                Export Design
              </Button>
              <Button variant="outlined" fullWidth startIcon={<UploadIcon />}
                sx={{ mt: 1 }} component="label" disabled={!onSave}>
                Import Design
                <input type="file" accept=".json,.srvehicle.json" hidden onChange={handleImport} />
              </Button>
            </Paper>
          </Box>
        </Box>
      )}
    </Box>
  );
}
