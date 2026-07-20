import React, { useState, useMemo } from 'react';
import {
  Box, Typography, TextField, Button, Chip, Divider, Accordion,
  AccordionSummary, AccordionDetails, Tooltip, Alert, Paper, Grid,
  FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import weaponFrames from '../data/SR3/WeaponFrames';
import WeaponModifications from '../data/SR3/WeaponModifications';
import WeaponOptions from '../data/SR3/WeaponOptions';

const DAMAGE_LEVELS = { 1: 'L', 2: 'M', 3: 'S', 4: 'D', 7: 'Stun' };

const MOD_CATEGORIES = [
  { label: 'Finish & Aesthetics', filter: m => ['Custom Finish','Embossing/Engraving'].includes(m) },
  { label: 'Gas Vents', filter: m => m.startsWith('Gas Vent') },
  { label: 'Smartgun Systems', filter: m => m.startsWith('Smartgun') },
  { label: 'Electronic Systems', filter: m => ['Safe Target System','Voice Activation','Biometric Safety','Range Finder','Ultrasound Sight'].includes(m) },
  { label: 'Optics & Sights', filter: m => m.startsWith('Laser') || m.startsWith('Imaging') },
  { label: 'Stocks & Mounts', filter: m => ['Bipod','Tripod','Foregrip','Underbarrel Weight','Rigid Stocks','Folding Stock','Shock Pads','Hip Pads'].includes(m) },
  { label: 'Sound Reduction', filter: m => ['Silencer','Sound Suppressor'].includes(m) },
  { label: 'Ammo & Feed', filter: m => ['Extended Clip','Full Auto'].includes(m) },
  { label: 'Modifications', filter: m => ['Personalized Grip','Remove Safety','Remove Trigger','Sawed-Off Shotgun Barrel (Kit Installed)','Sawed-Off Shotgun Barrel (Shop Installed)'].includes(m) },
  { label: 'Underbarrel Weapons', filter: m => m.startsWith('Underbarrel Weapon') },
];

function computeStats(frame, chosenOptions, installedMods) {
  let power = frame.Power;
  let damageLevel = frame['Damage Level'];
  let mode = [...frame.Mode];
  let concealability = frame.Concealability;
  let weight = frame.Weight;
  let ammoCap = frame['Ammo Cap'];
  let ammoLoad = frame['Ammo Load'];
  let fcu = parseFloat(frame.FCU);
  let dp = parseFloat(frame.DPV);
  let rc = frame.RC ?? 0;
  const notes = [];
  const buildNotes = [];

  for (const optName of chosenOptions) {
    const opt = WeaponOptions[optName];
    if (!opt) continue;
    if (opt.DP) dp += opt.DP;
    if (opt.FCU) fcu = parseFloat((fcu + opt.FCU).toFixed(4));
    if (opt.Concealability) concealability += opt.Concealability;
    if (opt.Weight) weight = parseFloat((weight + opt.Weight).toFixed(4));
    if (opt.RC) rc += opt.RC;
    if (opt.Power) power += opt.Power;
    if (opt.Extra) notes.push(`${optName}: ${opt.Extra}`);
  }

  for (const modKey of installedMods) {
    const mod = WeaponModifications[modKey];
    if (!mod) continue;
    const dpVal = typeof mod.DP === 'number' ? mod.DP : (mod.DP === 'frame base DPV' ? frame.DPV : 0);
    dp += dpVal;
    if (mod.FCU) fcu = parseFloat((fcu + mod.FCU).toFixed(4));
    if (mod.Weight) weight = parseFloat((weight + mod.Weight).toFixed(4));
    if (mod.RC) rc += mod.RC;
    if (mod.Concealability) concealability += mod.Concealability;
    if (mod.Extra) notes.push(`${mod.Name}: ${mod.Extra}`);
    if (mod.InstallTime) {
      buildNotes.push({ name: mod.Name, skill: mod.Skill, time: mod.InstallTime, tn: mod.InstallTN, tools: mod.Tools });
    }
  }

  return { power, damageLevel, mode, concealability, weight, ammoCap, ammoLoad, fcu: Math.round(fcu * 100) / 100, dp: Math.round(dp), rc, finalCost: Math.round(dp * 5), notes, buildNotes };
}

function StatDisplay({ label, value, unit }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.25 }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" fontWeight="bold">{value}{unit ? ` ${unit}` : ''}</Typography>
    </Box>
  );
}

export default function WeaponDesigner({ edition = 'SR3', onSave }) {
  const [weaponName, setWeaponName] = useState('Custom Weapon');
  const [frameKey, setFrameKey] = useState('Heavy Pistol');
  const [chosenOptions, setChosenOptions] = useState([]);
  const [installedMods, setInstalledMods] = useState([]);
  const [modSearch, setModSearch] = useState('');
  const [optSearch, setOptSearch] = useState('');

  const frame = weaponFrames[frameKey];

  const stats = useMemo(() => computeStats(frame, chosenOptions, installedMods), [frame, chosenOptions, installedMods]);

  const onFrameChange = (e) => {
    setFrameKey(e.target.value);
    setChosenOptions([]);
    setInstalledMods([]);
  };

  const isOptionIncompatible = (optName) => {
    const opt = WeaponOptions[optName];
    if (!opt) return false;
    return (opt.IncompatibleWith || []).some(inc => chosenOptions.includes(inc));
  };

  const isModIncompatible = (modKey) => {
    const mod = WeaponModifications[modKey];
    if (!mod) return false;
    return (mod.IncompatibleWith || []).some(inc => installedMods.includes(inc));
  };

  const toggleOption = (optName) => {
    setChosenOptions(prev =>
      prev.includes(optName) ? prev.filter(o => o !== optName) : [...prev, optName]
    );
  };

  const toggleMod = (modKey) => {
    setInstalledMods(prev =>
      prev.includes(modKey) ? prev.filter(m => m !== modKey) : [...prev, modKey]
    );
  };

  const handleSave = () => {
    if (!onSave) return;
    const design = { weaponName, frameKey, chosenOptions, installedMods, stats };
    onSave(design);
  };

  const handleExport = () => {
    const design = { weaponName, frameKey, chosenOptions, installedMods, stats };
    const blob = new Blob([JSON.stringify({ type: 'sr-custom-weapon', version: 1, design }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${weaponName}.srweapon.json`;
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
        if (parsed.type === 'sr-custom-weapon' && parsed.design) {
          onSave(parsed.design);
        }
      } catch {}
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const filteredMods = (frame.Modifications || []).filter(m =>
    modSearch === '' || m.toLowerCase().includes(modSearch.toLowerCase())
  );

  const filteredOpts = (frame.Options || []).filter(o =>
    optSearch === '' || o.toLowerCase().includes(optSearch.toLowerCase())
  );

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Weapon Designer
        </Typography>
        <Chip label="Canon Companion" size="small" color="warning" variant="outlined" />
        <Chip label="SR3" size="small" color="info" variant="outlined" />
      </Box>

      <Grid container spacing={2}>
        {/* LEFT: configuration */}
        <Grid item xs={12} md={8}>

          {/* Frame selection */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom><strong>1. Choose Frame</strong></Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel shrink>Weapon Frame</InputLabel>
                  <Select value={frameKey} onChange={onFrameChange} label="Weapon Frame">
                    {Object.keys(weaponFrames).map(k => (
                      <MenuItem key={k} value={k}>{k}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small" fullWidth label="Weapon Name"
                  value={weaponName} onChange={e => setWeaponName(e.target.value)}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 1.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip size="small" label={`Power ${frame.Power}`} />
              <Chip size="small" label={`${DAMAGE_LEVELS[frame['Damage Level']] ?? frame['Damage Level']} Damage`} />
              <Chip size="small" label={`Mode: ${frame.Mode.join('/')}`} />
              <Chip size="small" label={`Conceal ${frame.Concealability}`} />
              <Chip size="small" label={`${frame['Ammo Cap']} ${frame['Ammo Load']}`} />
              <Chip size="small" label={`Base DPV ${frame.DPV}`} color="primary" />
              {(frame.Mounts || []).map(m => <Chip key={m} size="small" label={`${m} mount`} variant="outlined" />)}
            </Box>
          </Paper>

          {/* Design options */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom><strong>2. Design Options</strong> <Typography component="span" variant="caption" color="text.secondary">(chosen at creation)</Typography></Typography>
            <TextField
              size="small" fullWidth label="Search options…" sx={{ mb: 1.5 }}
              value={optSearch} onChange={e => setOptSearch(e.target.value)}
            />
            <Box sx={{ maxHeight: 220, overflowY: 'auto' }}>
              {filteredOpts.map(optName => {
                const opt = WeaponOptions[optName] ?? {};
                const incompatible = isOptionIncompatible(optName) && !chosenOptions.includes(optName);
                const desc = [
                  opt.DP !== 0 && opt.DP ? `DP ${opt.DP > 0 ? '+' : ''}${opt.DP}` : null,
                  opt.FCU ? `FCU ${opt.FCU > 0 ? '+' : ''}${opt.FCU}` : null,
                  opt.Weight ? `Wt ${opt.Weight > 0 ? '+' : ''}${opt.Weight}kg` : null,
                  opt.Concealability ? `Conceal ${opt.Concealability > 0 ? '+' : ''}${opt.Concealability}` : null,
                  opt.RC ? `RC +${opt.RC}` : null,
                  opt.Power ? `Pwr +${opt.Power}` : null,
                ].filter(Boolean).join(' · ');
                return (
                  <Tooltip key={optName} title={opt.Extra ? `${desc} — ${opt.Extra}` : desc || optName} placement="right">
                    <FormControlLabel
                      sx={{ display: 'block', opacity: incompatible ? 0.4 : 1 }}
                      control={
                        <Checkbox
                          size="small"
                          checked={chosenOptions.includes(optName)}
                          onChange={() => !incompatible && toggleOption(optName)}
                          disabled={incompatible}
                        />
                      }
                      label={
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                          <span>{optName}</span>
                          {desc && <Typography variant="caption" color="text.secondary">({desc})</Typography>}
                        </Box>
                      }
                    />
                  </Tooltip>
                );
              })}
              {filteredOpts.length === 0 && <Typography variant="body2" color="text.secondary">No options match.</Typography>}
            </Box>
          </Paper>

          {/* Post-creation modifications */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom><strong>3. Modifications</strong> <Typography component="span" variant="caption" color="text.secondary">(installed after creation)</Typography></Typography>
            <TextField
              size="small" fullWidth label="Search modifications…" sx={{ mb: 1.5 }}
              value={modSearch} onChange={e => setModSearch(e.target.value)}
            />
            <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
              {MOD_CATEGORIES.map(cat => {
                const catMods = filteredMods.filter(cat.filter);
                if (catMods.length === 0) return null;
                return (
                  <Accordion key={cat.label} disableGutters defaultExpanded={false} sx={{ '&:before': { display: 'none' } }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ minHeight: 36, py: 0 }}>
                      <Typography variant="body2"><strong>{cat.label}</strong></Typography>
                      {catMods.filter(m => installedMods.includes(m)).length > 0 &&
                        <Chip size="small" label={catMods.filter(m => installedMods.includes(m)).length} color="primary" sx={{ ml: 1 }} />
                      }
                    </AccordionSummary>
                    <AccordionDetails sx={{ py: 0.5 }}>
                      {catMods.map(modKey => {
                        const mod = WeaponModifications[modKey] ?? {};
                        const incompatible = isModIncompatible(modKey) && !installedMods.includes(modKey);
                        const dpVal = typeof mod.DP === 'number' ? mod.DP : 0;
                        const desc = [
                          dpVal !== 0 ? `DP ${dpVal > 0 ? '+' : ''}${dpVal}` : null,
                          mod.FCU ? `FCU ${mod.FCU > 0 ? '+' : ''}${mod.FCU}` : null,
                          mod.Weight ? `Wt ${mod.Weight > 0 ? '+' : ''}${mod.Weight}kg` : null,
                          mod.RC ? `RC +${mod.RC}` : null,
                          mod.Concealability ? `Conceal ${mod.Concealability > 0 ? '+' : ''}${mod.Concealability}` : null,
                          mod.Tools ? `Tools: ${mod.Tools}` : null,
                          mod.InstallTime ? `Time: ${mod.InstallTime}` : null,
                          mod.InstallTN ? `TN ${mod.InstallTN}` : null,
                        ].filter(Boolean).join(' · ');
                        return (
                          <Tooltip key={modKey} title={mod.Extra ? `${desc} — ${mod.Extra}` : desc || modKey} placement="right">
                            <FormControlLabel
                              sx={{ display: 'block', opacity: incompatible ? 0.4 : 1 }}
                              control={
                                <Checkbox
                                  size="small"
                                  checked={installedMods.includes(modKey)}
                                  onChange={() => !incompatible && toggleMod(modKey)}
                                  disabled={incompatible}
                                />
                              }
                              label={
                                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                                  <span>{mod.Name ?? modKey}</span>
                                  {desc && <Typography variant="caption" color="text.secondary">({desc})</Typography>}
                                </Box>
                              }
                            />
                          </Tooltip>
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>
                );
              })}
              {/* Uncategorized */}
              {(() => {
                const allCatMods = MOD_CATEGORIES.flatMap(c => filteredMods.filter(c.filter));
                const uncategorized = filteredMods.filter(m => !allCatMods.includes(m));
                if (uncategorized.length === 0) return null;
                return (
                  <Accordion key="other" disableGutters defaultExpanded={false} sx={{ '&:before': { display: 'none' } }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ minHeight: 36, py: 0 }}>
                      <Typography variant="body2"><strong>Other</strong></Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ py: 0.5 }}>
                      {uncategorized.map(modKey => {
                        const mod = WeaponModifications[modKey] ?? {};
                        const incompatible = isModIncompatible(modKey) && !installedMods.includes(modKey);
                        return (
                          <FormControlLabel
                            key={modKey}
                            sx={{ display: 'block', opacity: incompatible ? 0.4 : 1 }}
                            control={
                              <Checkbox size="small" checked={installedMods.includes(modKey)}
                                onChange={() => !incompatible && toggleMod(modKey)} disabled={incompatible} />
                            }
                            label={mod.Name ?? modKey}
                          />
                        );
                      })}
                    </AccordionDetails>
                  </Accordion>
                );
              })()}
            </Box>
          </Paper>
        </Grid>

        {/* RIGHT: live stats */}
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 2, position: 'sticky', top: 8 }}>
            <Typography variant="subtitle1" gutterBottom><strong>Final Stats</strong></Typography>
            <Divider sx={{ mb: 1 }} />
            <StatDisplay label="Power" value={stats.power} />
            <StatDisplay label="Damage" value={DAMAGE_LEVELS[stats.damageLevel] ?? stats.damageLevel} />
            <StatDisplay label="Mode" value={stats.mode.join('/')} />
            <StatDisplay label="Concealability" value={stats.concealability} />
            <StatDisplay label="Weight" value={stats.weight} unit="kg" />
            <StatDisplay label="Ammo" value={`${stats.ammoCap} ${stats.ammoLoad}`} />
            <StatDisplay label="FCU" value={stats.fcu} />
            {stats.rc > 0 && <StatDisplay label="Recoil Comp." value={stats.rc} />}
            <Divider sx={{ my: 1 }} />
            <StatDisplay label="Design Point Value" value={stats.dp} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.25 }}>
              <Typography variant="body2" color="text.secondary">Final Cost</Typography>
              <Typography variant="body2" fontWeight="bold" color="success.main">{stats.finalCost.toLocaleString()}¥</Typography>
            </Box>

            {chosenOptions.length > 0 && (
              <Box sx={{ mt: 1.5 }}>
                <Typography variant="caption" color="text.secondary">Design Options ({chosenOptions.length})</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                  {chosenOptions.map(o => (
                    <Chip key={o} size="small" label={o} onDelete={() => toggleOption(o)} />
                  ))}
                </Box>
              </Box>
            )}

            {installedMods.length > 0 && (
              <Box sx={{ mt: 1.5 }}>
                <Typography variant="caption" color="text.secondary">Installed Mods ({installedMods.length})</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                  {installedMods.map(m => {
                    const mod = WeaponModifications[m];
                    return <Chip key={m} size="small" label={mod?.Name ?? m} onDelete={() => toggleMod(m)} />;
                  })}
                </Box>
              </Box>
            )}

            {stats.notes.length > 0 && (
              <Box sx={{ mt: 1.5 }}>
                <Typography variant="caption" color="text.secondary">Notes</Typography>
                {stats.notes.map((n, i) => (
                  <Alert key={i} severity="info" sx={{ mt: 0.5, py: 0, fontSize: '0.75rem' }}>{n}</Alert>
                ))}
              </Box>
            )}

            <Button
              fullWidth variant="contained" startIcon={<SaveIcon />}
              sx={{ mt: 2 }} onClick={handleSave}
              disabled={!onSave}
            >
              Save to Character
            </Button>
            <Button
              fullWidth variant="outlined" startIcon={<DownloadIcon />}
              sx={{ mt: 1 }} onClick={handleExport}
            >
              Export Design
            </Button>
            <Button
              fullWidth variant="outlined" startIcon={<UploadIcon />}
              sx={{ mt: 1 }} component="label"
              disabled={!onSave}
            >
              Import Design
              <input type="file" accept=".json,.srweapon.json" hidden onChange={handleImport} />
            </Button>
          </Paper>

          {/* Build notes */}
          {stats.buildNotes.length > 0 && (
            <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom><strong>Build Sheet</strong></Typography>
              <Divider sx={{ mb: 1 }} />
              {stats.buildNotes.map((bn, i) => (
                <Box key={i} sx={{ mb: 1.5 }}>
                  <Typography variant="body2"><strong>{bn.name}</strong></Typography>
                  <Typography variant="caption" color="text.secondary" display="block">Skill: {bn.skill}</Typography>
                  <Typography variant="caption" color="text.secondary" display="block">Time: {bn.time} · TN {bn.tn} · Tools: {bn.tools}</Typography>
                  {i < stats.buildNotes.length - 1 && <Divider sx={{ mt: 1 }} />}
                </Box>
              ))}
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
