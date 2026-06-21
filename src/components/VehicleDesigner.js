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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';

import {
  CHASSIS, ENGINES_BY_CHASSIS, MODS, VEHICLE_CATEGORIES, MOD_CATEGORIES,
} from '../vehicle/vehicleData';
import { buildVehicleStats, checkLimit, applyMod } from '../vehicle/evalExpr';

// ── helpers ──────────────────────────────────────────────────────────────────

function fmt(v, decimals = 0) {
  if (v === undefined || v === null || v === '') return '—';
  const n = Number(v);
  if (isNaN(n)) return v;
  return decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
}

function fmtCost(v) {
  const n = Number(v);
  if (isNaN(n)) return '—';
  return `¥${Math.round(n).toLocaleString()}`;
}

// Compute final vehicle stats by applying all chosen mods in priority order
function computeStats(chassis, engine, chosenMods) {
  let stats = buildVehicleStats(chassis, engine);
  // Add engine cost
  stats.Cost = (chassis.cost ?? 0) + (engine.cost ?? 0);
  stats.Sig = 3; // default

  let globals = { Points: 0, DBW: 0, EC: 0, ECLevel: 0, ECCost: 0, Rigged: 0,
    ES: 0, RollBars: 0, RagTop: 0, SideCar: 0, GRA: 0, AntiTheft: 0,
    Benches: 0, Buckets: 0, RBuckets: 0,
    TMicro: 0, TMini: 0, TSmall: 0, TMedium: 0,
    TMicroCF: 0, TMiniCF: 0, TSmallCF: 0, TMediumCF: 0,
    TMicroCost: 0, TMiniCost: 0, TSmallCost: 0, TMediumCost: 0,
    Ports: 0,
  };

  // Sort by priority then apply
  const sorted = [...chosenMods].sort((a, b) => a.mod.priority - b.mod.priority);
  for (const { mod, level } of sorted) {
    const result = applyMod(mod, stats, chassis, engine, globals, level);
    stats   = result.stats;
    globals = result.globals;
  }

  return stats;
}

// ── stat display table ────────────────────────────────────────────────────────

const STAT_GROUPS = [
  {
    label: 'Handling',
    stats: [
      { key: 'Handling', label: 'Handling (road)' },
      { key: 'OffRoad',  label: 'Handling (off-road)' },
    ],
  },
  {
    label: 'Performance',
    stats: [
      { key: 'Speed',    label: 'Speed (cr/t)' },
      { key: 'SpeedMax', label: 'Speed max' },
      { key: 'Accel',    label: 'Acceleration' },
      { key: 'AccelMax', label: 'Accel max' },
    ],
  },
  {
    label: 'Structure',
    stats: [
      { key: 'Body',   label: 'Body' },
      { key: 'Armour', label: 'Armour' },
      { key: 'Sig',    label: 'Signature' },
    ],
  },
  {
    label: 'Cargo',
    stats: [
      { key: 'CF',     label: 'Cargo Factor' },
      { key: 'CFUsed', label: 'CF Used' },
      { key: 'Load',   label: 'Load (kg)' },
      { key: 'LoadUsed', label: 'Load Used' },
    ],
  },
  {
    label: 'Electronics',
    stats: [
      { key: 'Autonav', label: 'Autonav' },
      { key: 'Pilot',   label: 'Pilot' },
      { key: 'Sensor',  label: 'Sensor' },
    ],
  },
  {
    label: 'Economy',
    stats: [
      { key: 'Economy',    label: 'Economy (L/100km)' },
      { key: 'Fuel',       label: 'Fuel (L)' },
    ],
  },
];

function StatPanel({ stats }) {
  const cfRemain = (stats.CF ?? 0) - (stats.CFUsed ?? 0);
  const loadRemain = (stats.Load ?? 0) - (stats.LoadUsed ?? 0);

  return (
    <Box>
      {STAT_GROUPS.map(group => (
        <Box key={group.label} sx={{ mb: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
            {group.label}
          </Typography>
          <Table size="small" sx={{ mb: 0.5 }}>
            <TableBody>
              {group.stats.map(({ key, label }) => {
                const val = stats[key];
                const isOver = (key === 'CFUsed' && cfRemain < 0) || (key === 'LoadUsed' && loadRemain < 0);
                return (
                  <TableRow key={key} sx={{ '&:last-child td': { border: 0 } }}>
                    <TableCell sx={{ py: 0.25, pl: 0, fontSize: '0.82rem', color: 'text.secondary', width: 150 }}>{label}</TableCell>
                    <TableCell sx={{ py: 0.25, fontWeight: 700, fontSize: '0.9rem', color: isOver ? 'error.main' : 'inherit' }}>
                      {fmt(val)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      ))}
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Chip size="small" label={`CF remaining: ${Math.round(cfRemain)}`} color={cfRemain < 0 ? 'error' : cfRemain < 5 ? 'warning' : 'success'} variant="outlined" />
        <Chip size="small" label={`Load remaining: ${Math.round(loadRemain)} kg`} color={loadRemain < 0 ? 'error' : 'success'} variant="outlined" />
      </Box>
    </Box>
  );
}

// ── mod picker ────────────────────────────────────────────────────────────────

function ModPicker({ chassis, engine, stats, globals, chosenMods, onAdd }) {
  const [search, setSearch] = useState('');

  const available = useMemo(() => {
    return MODS.filter(mod => {
      if (search && !mod.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search]);

  const byCategory = useMemo(() => {
    return MOD_CATEGORIES.map(cat => ({
      cat,
      mods: available.filter(m => m.category === cat),
    })).filter(g => g.mods.length > 0);
  }, [available]);

  return (
    <Box>
      <TextField
        size="small"
        placeholder="Search modifications…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ mb: 2, width: '100%' }}
      />
      {byCategory.map(({ cat, mods: catMods }) => (
        <Accordion key={cat} disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">{cat}</Typography>
            <Chip size="small" label={catMods.length} sx={{ ml: 1 }} />
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Modification</TableCell>
                  <TableCell align="center" sx={{ width: 70 }}>{' '}</TableCell>
                  <TableCell align="right" sx={{ width: 80 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {catMods.map(mod => {
                  const inLimit = checkLimit(mod, stats, chassis, engine, globals, 1);
                  const alreadyAdded = chosenMods.some(c => c.mod.name === mod.name);
                  return (
                    <TableRow key={mod.name} sx={{ opacity: inLimit ? 1 : 0.4 }}>
                      <TableCell sx={{ fontSize: '0.82rem' }}>
                        <Tooltip title={mod.effectExpr || ''} arrow placement="top">
                          <span>{mod.name}</span>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        {alreadyAdded && <Chip size="small" label="added" color="primary" sx={{ fontSize: '0.65rem' }} />}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          variant="outlined"
                          disabled={!inLimit}
                          onClick={() => onAdd(mod)}
                        >
                          Add
                        </Button>
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

// ── chosen mods list ──────────────────────────────────────────────────────────

function ChosenMods({ chosenMods, onChange }) {
  const handleLevel = (i, delta) => {
    const updated = chosenMods.map((cm, idx) =>
      idx === i ? { ...cm, level: Math.max(1, cm.level + delta) } : cm
    );
    onChange(updated);
  };

  const handleRemove = (i) => {
    onChange(chosenMods.filter((_, idx) => idx !== i));
  };

  if (chosenMods.length === 0) {
    return <Typography color="text.secondary" variant="body2">No modifications added yet.</Typography>;
  }

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Modification</TableCell>
          <TableCell align="center">Level</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {chosenMods.map((cm, i) => (
          <TableRow key={i}>
            <TableCell sx={{ fontSize: '0.82rem' }}>{cm.mod.name}</TableCell>
            <TableCell align="center">
              {cm.mod.levelLabel !== '' ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                  <Button size="small" sx={{ minWidth: 24, p: 0 }} onClick={() => handleLevel(i, -1)} disabled={cm.level <= 1}>−</Button>
                  <Typography variant="body2">{cm.level}</Typography>
                  <Button size="small" sx={{ minWidth: 24, p: 0 }} onClick={() => handleLevel(i, 1)}>+</Button>
                </Box>
              ) : '—'}
            </TableCell>
            <TableCell align="right">
              <Button size="small" color="error" onClick={() => handleRemove(i)}>✕</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// ── main designer ─────────────────────────────────────────────────────────────

export default function VehicleDesigner({ onSave }) {
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [selectedChassis, setSelectedChassis] = useState(null);
  const [selectedEngine, setSelectedEngine] = useState(null);
  const [chosenMods, setChosenMods] = useState([]);
  const [vehicleName, setVehicleName] = useState('');
  const [tab, setTab] = useState(0);

  const category = VEHICLE_CATEGORIES[categoryIdx];
  const filteredChassis = CHASSIS.filter(category.filter);
  const availableEngines = selectedChassis ? (ENGINES_BY_CHASSIS[selectedChassis.name] ?? []) : [];

  const stats = useMemo(() => {
    if (!selectedChassis || !selectedEngine) return null;
    return computeStats(selectedChassis, selectedEngine, chosenMods);
  }, [selectedChassis, selectedEngine, chosenMods]);

  const globals = useMemo(() => {
    if (!selectedChassis || !selectedEngine) return {};
    // Re-run to extract globals — computeStats already does this internally,
    // but we need them for the mod picker. Recompute cheaply.
    let g = { Points: 0, DBW: 0, EC: 0, ECLevel: 0, ECCost: 0, Rigged: 0,
      ES: 0, RollBars: 0, RagTop: 0, SideCar: 0, GRA: 0, AntiTheft: 0,
      Benches: 0, Buckets: 0, RBuckets: 0,
      TMicro: 0, TMini: 0, TSmall: 0, TMedium: 0,
      TMicroCF: 0, TMiniCF: 0, TSmallCF: 0, TMediumCF: 0,
      TMicroCost: 0, TMiniCost: 0, TSmallCost: 0, TMediumCost: 0, Ports: 0,
    };
    let s = buildVehicleStats(selectedChassis, selectedEngine);
    s.Cost = (selectedChassis.cost ?? 0) + (selectedEngine.cost ?? 0);
    s.Sig = 3;
    const sorted = [...chosenMods].sort((a, b) => a.mod.priority - b.mod.priority);
    for (const { mod, level } of sorted) {
      const result = applyMod(mod, s, selectedChassis, selectedEngine, g, level);
      s = result.stats; g = result.globals;
    }
    return g;
  }, [selectedChassis, selectedEngine, chosenMods]);

  const handleAddMod = (mod) => {
    setChosenMods(prev => [...prev, { mod, level: mod.defaultLevel > 0 ? mod.defaultLevel : 1 }]);
  };

  const handleSave = () => {
    if (!selectedChassis || !selectedEngine || !stats) return;
    const design = {
      name: vehicleName || `Custom ${selectedChassis.name}`,
      chassis: selectedChassis,
      engine: selectedEngine,
      mods: chosenMods,
      finalStats: stats,
    };
    onSave?.(design);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Vehicle Designer</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Design a custom vehicle using SR2 Rigger 2 rules. Choose a chassis, engine, and modifications.
        Stats update live as you build.
      </Typography>

      {/* Step 1 — Chassis */}
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>1. Choose Chassis</Typography>
        <Tabs
          value={categoryIdx}
          onChange={(_, v) => { setCategoryIdx(v); setSelectedChassis(null); setSelectedEngine(null); }}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          {VEHICLE_CATEGORIES.map((vc, i) => (
            <Tab key={vc.label} label={vc.label} value={i} sx={{ fontSize: '0.78rem' }} />
          ))}
        </Tabs>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Chassis</TableCell>
              <TableCell align="center">Body</TableCell>
              <TableCell align="center">Armour</TableCell>
              <TableCell align="center">CF</TableCell>
              <TableCell align="center">Handling</TableCell>
              <TableCell align="center">Pilot</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredChassis.map(ch => (
              <TableRow
                key={ch.name}
                selected={selectedChassis?.name === ch.name}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => { setSelectedChassis(ch); setSelectedEngine(null); setChosenMods([]); }}
              >
                <TableCell sx={{ fontSize: '0.82rem' }}>{ch.name}</TableCell>
                <TableCell align="center">{ch.body}</TableCell>
                <TableCell align="center">{ch.armour}</TableCell>
                <TableCell align="center">{ch.cf}</TableCell>
                <TableCell align="center">{ch.handling}/{ch.offRoad}</TableCell>
                <TableCell align="center">{ch.pilot === -1 ? '—' : ch.pilot}</TableCell>
                <TableCell align="right">{fmtCost(ch.cost * 1000)}</TableCell>
                <TableCell align="right">
                  {selectedChassis?.name === ch.name && <Chip size="small" label="selected" color="primary" />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Step 2 — Engine */}
      {selectedChassis && (
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>2. Choose Engine — {selectedChassis.name}</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Engine</TableCell>
                <TableCell align="center">Speed</TableCell>
                <TableCell align="center">Accel</TableCell>
                <TableCell align="center">Load (kg)</TableCell>
                <TableCell align="center">Sig</TableCell>
                <TableCell align="center">Economy</TableCell>
                <TableCell align="right">Cost</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {availableEngines.map((eng, i) => (
                <TableRow
                  key={i}
                  selected={selectedEngine === eng}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => { setSelectedEngine(eng); setChosenMods([]); }}
                >
                  <TableCell sx={{ fontSize: '0.82rem' }}>{eng.name}</TableCell>
                  <TableCell align="center">{eng.speed}/{eng.speedMax}</TableCell>
                  <TableCell align="center">{eng.accel}/{eng.accelMax}</TableCell>
                  <TableCell align="center">{eng.load}/{eng.loadMax}</TableCell>
                  <TableCell align="center">{eng.sig}</TableCell>
                  <TableCell align="center">{eng.economy}</TableCell>
                  <TableCell align="right">{fmtCost(eng.cost * 1000)}</TableCell>
                  <TableCell align="right">
                    {selectedEngine === eng && <Chip size="small" label="selected" color="primary" />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Step 3 — Mods + live stats */}
      {selectedChassis && selectedEngine && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {/* Left: mod picker + chosen mods */}
          <Box sx={{ flex: '1 1 400px' }}>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>3. Modifications</Typography>
              <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Tab label="Available" />
                <Tab label={`Chosen (${chosenMods.length})`} />
              </Tabs>
              {tab === 0 && (
                <ModPicker
                  chassis={selectedChassis}
                  engine={selectedEngine}
                  stats={stats ?? buildVehicleStats(selectedChassis, selectedEngine)}
                  globals={globals}
                  chosenMods={chosenMods}
                  onAdd={handleAddMod}
                />
              )}
              {tab === 1 && (
                <ChosenMods chosenMods={chosenMods} onChange={setChosenMods} />
              )}
            </Paper>
          </Box>

          {/* Right: live stat panel */}
          <Box sx={{ flex: '0 0 260px' }}>
            <Paper variant="outlined" sx={{ p: 2, position: 'sticky', top: 16 }}>
              <Typography variant="h6" gutterBottom>Live Stats</Typography>
              {stats && <StatPanel stats={stats} />}
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>Total Cost</Typography>
              <Typography variant="h5" color="primary">{fmtCost(Math.round(stats?.Cost ?? 0) * 1000)}</Typography>
              <Typography variant="caption" color="text.secondary">
                (chassis + engine + modifications × 1,000 ¥)
              </Typography>
              <Divider sx={{ my: 2 }} />
              <TextField
                size="small"
                label="Vehicle name"
                value={vehicleName}
                onChange={e => setVehicleName(e.target.value)}
                sx={{ width: '100%', mb: 1.5 }}
              />
              <Button variant="contained" fullWidth onClick={handleSave}>
                Save to Character
              </Button>
            </Paper>
          </Box>
        </Box>
      )}
    </Box>
  );
}
