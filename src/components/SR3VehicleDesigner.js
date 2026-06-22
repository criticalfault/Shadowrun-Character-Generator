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
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';

import Rigger3Chassis from '../data/SR3/Rigger3Chassis';
import Rigger3PowerPlants from '../data/SR3/Rigger3PowerPlants';

// ── category config ───────────────────────────────────────────────────────────

const CATEGORIES = [
  { key: 'bike',          label: 'Bikes',          ppKey: 'bikes' },
  { key: 'boat',          label: 'Boats',          ppKey: 'boats' },
  { key: 'car',           label: 'Cars',           ppKey: 'cars' },
  { key: 'fixedWing',     label: 'Fixed-Wing',     ppKey: 'fixedWingAircraft' },
  { key: 'hovercraft',    label: 'Hovercraft',     ppKey: 'hovercraft' },
  { key: 'rotorCraft',    label: 'Rotor Craft',    ppKey: 'rotorCraft' },
  { key: 'ships',         label: 'Ships',          ppKey: 'ships' },
  { key: 'vectoredThrust',label: 'Vectored Thrust',ppKey: 'vectoredThrust' },
  { key: 'special',       label: 'Special',        ppKey: 'specialVehicles' },
  { key: 'drones',        label: 'Drones',         ppKey: null },     // sub-categories below
  { key: 'submarines',    label: 'Submarines',     ppKey: 'submarines' },
  { key: 'submarineDrones',label: 'Sub Drones',   ppKey: 'submarines' },
];

// Drone chassis sub-keys → pp key
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

// ── helpers ───────────────────────────────────────────────────────────────────

function fmt(v) {
  if (v === undefined || v === null || v === '') return '—';
  if (typeof v === 'string') return v;
  return v;
}

function range(start, max) {
  if (start === max || max === undefined) return fmt(start);
  return `${fmt(start)}–${fmt(max)}`;
}

// Flatten chassis array for a given category key
function getChassisRows(catKey) {
  if (catKey === 'drones') {
    return Object.entries(Rigger3Chassis.drones).flatMap(([subKey, rows]) =>
      rows.map(r => ({ ...r, _droneSubCat: subKey }))
    );
  }
  if (catKey === 'submarineDrones') {
    return Rigger3Chassis.submarineDrones ?? [];
  }
  return Rigger3Chassis[catKey] ?? [];
}

// Get power plant entries for a category + fuel type
function getPPRows(ppKey, fuelKey) {
  if (!ppKey || !fuelKey) return [];
  return Rigger3PowerPlants[fuelKey]?.[ppKey] ?? [];
}

// Which fuel types have entries for a given ppKey?
function fuelsForPPKey(ppKey) {
  return Object.keys(Rigger3PowerPlants).filter(fuelKey =>
    (Rigger3PowerPlants[fuelKey]?.[ppKey]?.length ?? 0) > 0
  );
}

// ── stat panels ───────────────────────────────────────────────────────────────

function ChassisStatPanel({ chassis }) {
  const isDrone = 'pilot' in chassis;
  const isSub   = 'depth' in chassis;

  const rows = [
    ['Body', chassis.body],
    ['CF', range(chassis.cfStart, chassis.cfMax)],
    ['Handling', chassis.handling],
    ['Armor', chassis.armor],
    ...(isDrone
      ? [['Pilot', chassis.pilot]]
      : [['Autonav', chassis.autonav], ['Sensor', chassis.sensor]]),
    ...(isSub ? [
      ['Speed', range(chassis.speedStart, chassis.speedMax)],
      ['Depth', chassis.depth],
    ] : []),
    ['Entry', chassis.entry ?? '—'],
    ['Seating', chassis.seating ?? '—'],
    ['DP Cost', chassis.dp],
    ['MUF', chassis.muf],
    ...(chassis.notes ? [['Notes', chassis.notes]] : []),
  ];

  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
        Chassis Stats
      </Typography>
      <Table size="small">
        <TableBody>
          {rows.map(([label, val]) => (
            <TableRow key={label} sx={{ '&:last-child td': { border: 0 } }}>
              <TableCell sx={{ py: 0.25, pl: 0, fontSize: '0.82rem', color: 'text.secondary', width: 120 }}>{label}</TableCell>
              <TableCell sx={{ py: 0.25, fontWeight: 600, fontSize: '0.88rem' }}>{fmt(val)}</TableCell>
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
    ['Fuel Type', fuelLabel],
    ['Load (kg)', range(pp.loadStart, pp.loadMax)],
    ...(isSub ? [
      ['Speed (surf)', pp.speedSurface],
      ['Speed (max)', pp.speedMax],
    ] : [
      ['Speed', range(pp.speedStart, pp.speedMax)],
    ]),
    ...((pp.accelStart != null) ? [['Accel', range(pp.accelStart, pp.accelMax)]] : []),
    ['Sig', fmt(pp.sig)],
    ...(pp.fuel != null ? [['Fuel Code', fmt(pp.fuel)]] : []),
    ...(pp.econStart != null ? [['Economy', range(pp.econStart, pp.econMax)]] : []),
    ['DP Budget', pp.dp],
    ...(pp.peopleSpace ? [['People Space', pp.peopleSpace]] : []),
  ];

  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
        Power Plant Stats
      </Typography>
      <Table size="small">
        <TableBody>
          {rows.map(([label, val]) => (
            <TableRow key={label} sx={{ '&:last-child td': { border: 0 } }}>
              <TableCell sx={{ py: 0.25, pl: 0, fontSize: '0.82rem', color: 'text.secondary', width: 120 }}>{label}</TableCell>
              <TableCell sx={{ py: 0.25, fontWeight: 600, fontSize: '0.88rem' }}>{fmt(val)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function SR3VehicleDesigner({ onSave }) {
  const [catIdx, setCatIdx]             = useState(0);
  const [selectedChassis, setSelectedChassis] = useState(null);
  const [selectedFuel, setSelectedFuel]       = useState(null);
  const [selectedPP, setSelectedPP]           = useState(null);
  const [vehicleName, setVehicleName]         = useState('');
  const [notes, setNotes]                     = useState('');
  const [fuelTabIdx, setFuelTabIdx]           = useState(0);

  const category = CATEGORIES[catIdx];

  // Chassis rows for current category
  const chassisRows = useMemo(() => getChassisRows(category.key), [category.key]);

  // Derive ppKey — for drones use the drone's sub-category
  const ppKey = useMemo(() => {
    if (category.key === 'drones' && selectedChassis?._droneSubCat) {
      return DRONE_CAT_PP[selectedChassis._droneSubCat] ?? null;
    }
    return category.ppKey;
  }, [category.key, selectedChassis]);

  // Available fuel types for this chassis category
  const availableFuels = useMemo(() => {
    if (!ppKey) return [];
    return fuelsForPPKey(ppKey);
  }, [ppKey]);

  // Clamp fuel tab index
  const safeFuelTabIdx = Math.min(fuelTabIdx, Math.max(0, availableFuels.length - 1));
  const currentFuelKey = availableFuels[safeFuelTabIdx] ?? null;

  // Power plant rows for current fuel + chassis category
  const ppRows = useMemo(() => getPPRows(ppKey, currentFuelKey), [ppKey, currentFuelKey]);

  // DP remaining
  const dpRemaining = useMemo(() => {
    if (!selectedChassis || !selectedPP) return null;
    const budget = typeof selectedPP.dp === 'number' ? selectedPP.dp : null;
    const cost   = typeof selectedChassis.dp === 'number' ? selectedChassis.dp : null;
    if (budget == null || cost == null) return null;
    return budget - cost;
  }, [selectedChassis, selectedPP]);

  const handleSelectCategory = (_, v) => {
    setCatIdx(v);
    setSelectedChassis(null);
    setSelectedPP(null);
    setSelectedFuel(null);
    setFuelTabIdx(0);
  };

  const handleSelectChassis = (ch) => {
    setSelectedChassis(ch);
    setSelectedPP(null);
  };

  const handleSelectFuelTab = (_, v) => {
    setFuelTabIdx(v);
    setSelectedPP(null);
  };

  const handleSave = () => {
    if (!selectedChassis || !selectedPP) return;
    const design = {
      name: vehicleName || `Custom ${selectedChassis.name}`,
      edition: 'SR3',
      chassis: selectedChassis,
      powerPlant: { ...selectedPP, fuelType: currentFuelKey },
      dpRemaining,
      notes,
    };
    onSave?.(design);
  };

  const handleExport = () => {
    if (!selectedChassis || !selectedPP) return;
    const design = {
      name: vehicleName || `Custom ${selectedChassis.name}`,
      edition: 'SR3',
      chassis: selectedChassis,
      powerPlant: { ...selectedPP, fuelType: currentFuelKey },
      dpRemaining,
      notes,
    };
    const blob = new Blob(
      [JSON.stringify({ type: 'sr-custom-vehicle', version: 1, design }, null, 2)],
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

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Design a custom vehicle using Rigger 3 rules. Choose a chassis, then a matching power
        plant. Modification DP enforcement will be added once the mods table is available.
      </Typography>

      {/* Step 1 — Chassis category + table */}
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
              <TableCell align="center">Sensor</TableCell>
              <TableCell align="center">DP Cost</TableCell>
              <TableCell align="center">MUF</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {chassisRows.map((ch, i) => (
              <TableRow
                key={i}
                selected={selectedChassis === ch}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => handleSelectChassis(ch)}
              >
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

      {/* Step 2 — Power plant */}
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
                    <TableRow
                      key={i}
                      selected={selectedPP === pp}
                      hover
                      sx={{ cursor: 'pointer' }}
                      onClick={() => setSelectedPP(pp)}
                    >
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

      {/* Step 3 — Summary + save */}
      {selectedChassis && selectedPP && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {/* Stat display */}
          <Box sx={{ flex: '1 1 360px' }}>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>3. Design Summary</Typography>

              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 160px' }}>
                  <ChassisStatPanel chassis={selectedChassis} />
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ flex: '1 1 160px' }}>
                  <PPStatPanel pp={selectedPP} fuelLabel={FUEL_LABELS[currentFuelKey] ?? currentFuelKey} />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                <Chip
                  label={`Chassis DP cost: ${selectedChassis.dp ?? '?'}`}
                  variant="outlined"
                />
                <Chip
                  label={`Power plant DP budget: ${selectedPP.dp ?? '?'}`}
                  variant="outlined"
                  color="primary"
                />
                {dpRemaining != null && (
                  <Chip
                    label={`DP remaining for mods: ${dpRemaining}`}
                    color={dpRemaining < 0 ? 'error' : dpRemaining < 50 ? 'warning' : 'success'}
                  />
                )}
              </Box>

              <TextField
                multiline
                minRows={3}
                size="small"
                label="Modifications / notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                sx={{ width: '100%', mt: 2 }}
                helperText="Free-text mods for now — DP enforcement coming once the mods table is available."
              />
            </Paper>
          </Box>

          {/* Save panel */}
          <Box sx={{ flex: '0 0 240px' }}>
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
              <Button
                variant="outlined"
                fullWidth
                startIcon={<DownloadIcon />}
                sx={{ mt: 1 }}
                onClick={handleExport}
              >
                Export Design
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<UploadIcon />}
                sx={{ mt: 1 }}
                component="label"
                disabled={!onSave}
              >
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
