import React, { useState } from 'react';
import {
  Box, Typography, Paper, Chip, Alert,
  FormControl, InputLabel, Select, MenuItem,
  TextField, Tooltip, Grid, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Accordion, AccordionSummary, AccordionDetails,
  Tabs, Tab, ToggleButton, ToggleButtonGroup, Divider,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  SR2Utilities, SR2UtilityOptions, SR2ProgrammingTools,
  SR2FrameTypes,
  sr2ProgramSize, sr2MaxRating, sr2BaseTimeDays, sr2TaskPeriod,
  sr2CalcEffectiveRating, sr2CalcActualSize, sr2CalcDesignSize,
  sr2MaxTeamSize,
  sr2FrameCoreSize, sr2LoadingRating, sr2LoadingSize, sr2LoadingBaseTime, sr2AvgProgramRating,
  sr2UpgradeBaseTime,
  sr2ProgramPrice, sr2ProgramPriceTier,
  SR2_COMMAND_SET_DESIGN_SIZES,
} from '../data/SR2/ProgrammingRules';

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmt(n) {
  if (n == null) return '—';
  return Math.round(n).toLocaleString();
}
function fmtDays(days) {
  if (!days) return '—';
  if (days === 1) return '1 day (8 hrs)';
  return `${fmt(days)} days (${fmt(days * 8)} hrs)`;
}
function InfoTip({ text }) {
  return (
    <Tooltip title={text} placement="right">
      <InfoOutlinedIcon fontSize="small" sx={{ color: 'text.secondary', cursor: 'help', ml: 0.5, verticalAlign: 'middle' }} />
    </Tooltip>
  );
}
function StatRow({ label, value, highlight, caption }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', py: 0.5, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="body2" fontWeight={highlight ? 'bold' : 'normal'} color={highlight ? 'primary.main' : 'text.primary'}>{value}</Typography>
        {caption && <Typography variant="caption" color="text.secondary" display="block">{caption}</Typography>}
      </Box>
    </Box>
  );
}

const TYPE_COLORS = {
  operational: 'info',
  defensive:   'success',
  offensive:   'error',
  special:     'warning',
};

const FRAME_OPT_IDS = ['dinab', 'optimization', 'squeeze'];

// ── Frames & Agents tab ───────────────────────────────────────────────────────
const frameDefault = {
  frameType: 'dumb',
  coreRating: 4,
  bod: 1, evasion: 1, masking: 1, sensor: 1,
  initPoints: 0,
  dinabRating: 1,
  selectedOptions: [],
  loadedPrograms: [{ rating: 4, mult: 3 }],
  successes: 2,
};

function FrameCalculator({ skill }) {
  const [f, setF] = useState(frameDefault);
  const ff = (k, v) => setF(d => ({ ...d, [k]: v }));

  const frameType   = SR2FrameTypes.find(t => t.id === f.frameType) ?? SR2FrameTypes[0];
  const maxCore     = sr2MaxRating(skill, true);
  const coreRating  = Math.min(f.coreRating, maxCore);
  const coreSizeMp  = sr2FrameCoreSize(coreRating, f.frameType);

  const attrTotal   = f.bod + f.evasion + f.masking + f.sensor;
  const initAlloc   = frameType.hasInitiative ? f.initPoints : 0;
  const corePoints  = coreRating; // total Core Rating Points to distribute
  const pointsUsed  = attrTotal + initAlloc;
  const pointsLeft  = corePoints - pointsUsed;

  // DINAB rating capped at Computer Skill
  const dinabRating = Math.min(f.dinabRating, skill);

  // Frame options: DINAB, Optimization, Squeeze only
  const frameOpts = SR2UtilityOptions.filter(o => FRAME_OPT_IDS.includes(o.id));

  function toggleOpt(id) {
    setF(d => {
      const has = d.selectedOptions.find(o => o.id === id);
      return has
        ? { ...d, selectedOptions: d.selectedOptions.filter(o => o.id !== id) }
        : { ...d, selectedOptions: [...d.selectedOptions, { id }] };
    });
  }

  // Frame loading calculation
  const programRatings = f.loadedPrograms.map(p => p.rating);
  const loadingRating  = sr2LoadingRating(programRatings);
  const loadingSize    = sr2LoadingSize(loadingRating);
  const loadingBase    = sr2LoadingBaseTime(loadingRating);
  const avgRating      = sr2AvgProgramRating(programRatings);
  const loadingPeriod  = sr2TaskPeriod(loadingBase, f.successes);

  const programSizes   = f.loadedPrograms.map(p => sr2ProgramSize(p.rating, p.mult));
  const totalFrameSize = coreSizeMp + programSizes.reduce((a, b) => a + b, 0);

  function addProgram() {
    setF(d => ({ ...d, loadedPrograms: [...d.loadedPrograms, { rating: 4, mult: 3 }] }));
  }
  function removeProgram(i) {
    setF(d => ({ ...d, loadedPrograms: d.loadedPrograms.filter((_, j) => j !== i) }));
  }
  function setProgramField(i, key, val) {
    setF(d => {
      const progs = [...d.loadedPrograms];
      progs[i] = { ...progs[i], [key]: val };
      return { ...d, loadedPrograms: progs };
    });
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Frame Core</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel shrink>Frame Type</InputLabel>
              <Select value={f.frameType} label="Frame Type" onChange={e => ff('frameType', e.target.value)}>
                {SR2FrameTypes.map(t => <MenuItem key={t.id} value={t.id}>{t.label} (×{t.coreMult})</MenuItem>)}
              </Select>
            </FormControl>
            <Box>
              <TextField
                label="Core Rating"
                type="number" size="small" sx={{ width: 130 }}
                value={f.coreRating}
                onChange={e => ff('coreRating', Math.max(1, Math.min(20, +e.target.value)))}
                inputProps={{ min: 1, max: 20 }}
                error={f.coreRating > maxCore}
                helperText={f.coreRating > maxCore ? `Capped at ${maxCore}` : `Max: ${maxCore} (skill×1.5)`}
              />
            </Box>
          </Box>

          <Alert severity="info" sx={{ mb: 2 }} icon={false}>
            <Typography variant="caption">{frameType.notes}</Typography>
          </Alert>

          {/* Core Rating Points allocation */}
          <Typography variant="subtitle2" gutterBottom>
            Core Rating Points — {coreRating} total
            <Typography component="span" variant="caption" color={pointsLeft < 0 ? 'error' : 'text.secondary'} sx={{ ml: 1 }}>
              {pointsLeft < 0 ? `Over by ${-pointsLeft}` : `${pointsLeft} remaining`}
            </Typography>
          </Typography>
          {pointsLeft < 0 && <Alert severity="error" sx={{ mb: 1, py: 0.5 }} icon={false}>Attributes + Initiative exceed Core Rating — reduce allocations.</Alert>}

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            {[['bod','Bod'],['evasion','Evasion'],['masking','Masking'],['sensor','Sensor']].map(([k, lbl]) => (
              <TextField key={k}
                label={lbl} type="number" size="small" sx={{ width: 90 }}
                value={f[k]}
                onChange={e => ff(k, Math.max(0, +e.target.value))}
                inputProps={{ min: 0, max: coreRating }}
                error={f[k] > coreRating}
              />
            ))}
            {frameType.hasInitiative && (
              <Box>
                <TextField
                  label="Init Dice Points"
                  type="number" size="small" sx={{ width: 130 }}
                  value={f.initPoints}
                  onChange={e => ff('initPoints', Math.max(0, +e.target.value))}
                  inputProps={{ min: 0, max: coreRating }}
                />
                <Typography variant="caption" color="text.secondary" display="block">
                  = {1 + f.initPoints}D6 Initiative
                </Typography>
              </Box>
            )}
          </Box>

          {/* DINAB rating (smart frames required, dumb optional) */}
          {f.selectedOptions.find(o => o.id === 'dinab') || frameType.hasDINABRequired ? (
            <Box sx={{ mb: 2 }}>
              <TextField
                label={`DINAB Rating ${frameType.hasDINABRequired ? '(required)' : '(optional)'}`}
                type="number" size="small" sx={{ width: 200 }}
                value={f.dinabRating}
                onChange={e => ff('dinabRating', Math.max(1, Math.min(skill, +e.target.value)))}
                inputProps={{ min: 1, max: skill }}
                helperText={`Max: ${skill} (= Computer Skill)`}
              />
            </Box>
          ) : null}

          {/* Frame options */}
          <Typography variant="subtitle2" gutterBottom>Frame Core Options (DINAB, Optimization, Squeeze only)</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {frameOpts.map(opt => {
              const sel = f.selectedOptions.find(o => o.id === opt.id);
              const isSelected = !!sel;
              if (opt.id === 'dinab' && frameType.hasDINABRequired) return null; // smart always has it
              return (
                <Tooltip key={opt.id} title={opt.notes} placement="top" arrow>
                  <Chip
                    label={opt.label}
                    size="small"
                    variant={isSelected ? 'filled' : 'outlined'}
                    color={isSelected ? 'primary' : 'default'}
                    onClick={() => toggleOpt(opt.id)}
                    sx={{ cursor: 'pointer' }}
                  />
                </Tooltip>
              );
            })}
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip color="primary" label={`Core size: ${fmt(coreSizeMp)} Mp (${coreRating}² × ${frameType.coreMult})`} />
          </Box>
        </Paper>

        {/* Frame Loading */}
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Frame Loading (VR2 p.106)
            <InfoTip text="Loading Rating = sum of program ratings ÷ 2 (round down). Loading size = Loading Rating². Base time = Loading size × 2 days. Computer Test vs average program rating." />
          </Typography>

          {f.loadedPrograms.map((prog, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
              <TextField label={`Program ${i + 1} Rating`} type="number" size="small" sx={{ width: 140 }}
                value={prog.rating}
                onChange={e => setProgramField(i, 'rating', Math.max(1, +e.target.value))}
                inputProps={{ min: 1 }}
              />
              <TextField label="Multiplier" type="number" size="small" sx={{ width: 100 }}
                value={prog.mult}
                onChange={e => setProgramField(i, 'mult', Math.max(1, Math.min(20, +e.target.value)))}
                inputProps={{ min: 1, max: 20 }}
              />
              <Typography variant="caption" color="text.secondary">{fmt(sr2ProgramSize(prog.rating, prog.mult))} Mp</Typography>
              {f.loadedPrograms.length > 1 && (
                <Chip label="×" size="small" onClick={() => removeProgram(i)} sx={{ cursor: 'pointer' }} />
              )}
            </Box>
          ))}
          <Chip label="+ Add Program" size="small" variant="outlined" onClick={addProgram} sx={{ cursor: 'pointer', mb: 2 }} />

          <StatRow label="Loading Rating (ratings ÷ 2)" value={loadingRating} />
          <StatRow label="Loading size (LR²)" value={`${fmt(loadingSize)} Mp`} />
          <StatRow label="Loading base time (size × 2)" value={fmtDays(loadingBase)} />
          <StatRow label="Avg program rating (TN)" value={avgRating} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={5}>
        <Box sx={{ position: 'sticky', top: 80 }}>
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Loading Task Period</Typography>
            <TextField
              label="Computer Test Successes"
              type="number" size="small" fullWidth
              value={f.successes}
              onChange={e => ff('successes', Math.max(1, +e.target.value))}
              inputProps={{ min: 1 }} sx={{ mb: 1 }}
            />
            <StatRow label="Loading base time" value={fmtDays(loadingBase)} />
            <StatRow label="Loading task period" value={fmtDays(loadingPeriod)} highlight />
          </Paper>

          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Frame Summary</Typography>
            <StatRow label="Core Rating" value={coreRating} />
            <StatRow label="Core size" value={`${fmt(coreSizeMp)} Mp`} />
            <StatRow label="Loaded programs size" value={`${fmt(programSizes.reduce((a,b)=>a+b,0))} Mp`} />
            <StatRow label="Total frame size" value={`${fmt(totalFrameSize)} Mp`} highlight />
            {frameType.hasInitiative && <StatRow label="Initiative" value={`${1 + f.initPoints}D6 + ${coreRating}`} />}
            {frameType.hasInitiative && <StatRow label="Reaction" value={coreRating} />}
            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip size="small" color={f.frameType === 'smart' ? 'secondary' : 'default'} label={frameType.label} />
              <Chip size="small" label={`Bod ${f.bod} / Evasion ${f.evasion}`} />
              <Chip size="small" label={`Masking ${f.masking} / Sensor ${f.sensor}`} />
              {(f.selectedOptions.find(o => o.id === 'dinab') || frameType.hasDINABRequired) && (
                <Chip size="small" color="secondary" label={`DINAB ${dinabRating}`} />
              )}
            </Box>
          </Paper>

          <Alert severity="info" icon={false}>
            <Typography variant="caption">
              <strong>Core Rating used in place of MPCP</strong> for all MPCP tests.<br />
              Programs may not be loaded partial — if a program isn't smaller, it's incomplete and won't work.<br />
              Combined option ratings of all programs may not exceed Core Rating. Deckers may re-use frame cores with different utility combinations (cannot rearrange attributes — write a new core).
            </Typography>
          </Alert>
        </Box>
      </Grid>
    </Grid>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
const defaultState = {
  skill: 6,
  utilityId: 'analyze',
  rating: 4,
  selectedOptions: [],
  toolId: 'personal_computer',
  teamMembers: 1,
  successes: 2,
  upgradeMode: false,
  oldRating: 3,
};

export default function SR2ProgrammingCalculator() {
  const [s, setS] = useState(defaultState);
  const [subTab, setSubTab] = useState(0);
  const set = (k, v) => setS(d => ({ ...d, [k]: v }));

  const utility = SR2Utilities.find(u => u.id === s.utilityId) ?? SR2Utilities[0];
  const tool    = SR2ProgrammingTools.find(t => t.id === s.toolId) ?? SR2ProgrammingTools[0];

  const maxRating       = sr2MaxRating(s.skill, false);
  const rating          = Math.min(s.rating, maxRating);
  const effectiveRating = sr2CalcEffectiveRating(rating, s.selectedOptions);
  const actualSizeMp    = sr2CalcActualSize(rating, utility.mult, s.selectedOptions);
  const designSizeMp    = sr2CalcDesignSize(rating, utility.mult, s.selectedOptions);
  const baseSize        = sr2ProgramSize(rating, utility.mult);
  const tn              = rating;

  const baseTimeDays = s.upgradeMode
    ? sr2UpgradeBaseTime(rating, Math.min(s.oldRating, rating - 1), utility.mult)
    : sr2BaseTimeDays(designSizeMp);
  const taskPeriod = sr2TaskPeriod(baseTimeDays, s.successes);

  const priceTier = sr2ProgramPriceTier(rating);
  const priceInfo = sr2ProgramPrice(rating, actualSizeMp);

  const availOpts = SR2UtilityOptions.filter(o => utility.availableOptions.includes(o.id));
  const selOpts   = s.selectedOptions;

  function toggleOption(id) {
    setS(d => {
      const has = d.selectedOptions.find(o => o.id === id);
      return has
        ? { ...d, selectedOptions: d.selectedOptions.filter(o => o.id !== id) }
        : { ...d, selectedOptions: [...d.selectedOptions, { id }] };
    });
  }
  function setOptSubRating(id, key, val) {
    setS(d => ({
      ...d,
      selectedOptions: d.selectedOptions.map(o => o.id === id ? { ...o, [key]: val } : o),
    }));
  }

  return (
    <Box sx={{ p: 2, maxWidth: 1100 }}>
      <Typography variant="h5" gutterBottom>
        Programming Calculator
        <Chip label="SR2 / VR2 Rules" size="small" variant="outlined" sx={{ ml: 1, fontSize: '0.7rem' }} color="secondary" />
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Calculate programming time, TNs and task periods for SR2 deckers. Source: <em>Virtual Realities 2.0</em> pp. 101–107, 161.
      </Typography>

      {/* Shared character section */}
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>Character</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            label="Computer Skill"
            type="number" size="small" sx={{ width: 180 }}
            value={s.skill}
            onChange={e => set('skill', Math.max(1, Math.min(12, +e.target.value)))}
            inputProps={{ min: 1, max: 12 }}
            helperText={`Max utility rating: ${maxRating} · Max frame core: ${sr2MaxRating(s.skill, true)}`}
          />
        </Box>
      </Paper>

      {/* Sub-tabs */}
      <Tabs value={subTab} onChange={(_, v) => setSubTab(v)} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Utility Programs" />
        <Tab label="Frames" />
        <Tab label="Program Size Table" />
        <Tab label="Command Sets" />
      </Tabs>

      {/* ── Utility Programs tab ─────────────────────────────────────────── */}
      {subTab === 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>

            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>Program Design</Typography>

              <Box sx={{ mb: 2 }}>
                <ToggleButtonGroup value={s.upgradeMode ? 'upgrade' : 'new'} exclusive size="small"
                  onChange={(_, v) => { if (v) set('upgradeMode', v === 'upgrade'); }}>
                  <ToggleButton value="new">New Program</ToggleButton>
                  <ToggleButton value="upgrade">Upgrade Existing</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                <FormControl size="small" sx={{ minWidth: 220 }}>
                  <InputLabel shrink>Utility</InputLabel>
                  <Select value={s.utilityId} label="Utility"
                    onChange={e => {
                      const newUtil = SR2Utilities.find(u => u.id === e.target.value);
                      setS(d => ({
                        ...d,
                        utilityId: e.target.value,
                        selectedOptions: d.selectedOptions.filter(o => newUtil?.availableOptions.includes(o.id)),
                      }));
                    }}
                  >
                    {SR2Utilities.map(u => (
                      <MenuItem key={u.id} value={u.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip label={u.type} size="small" color={TYPE_COLORS[u.type] ?? 'default'} sx={{ fontSize: '0.65rem', height: 18 }} />
                          {u.label} (×{u.mult})
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box>
                  <TextField
                    label="Rating"
                    type="number" size="small" sx={{ width: 120 }}
                    value={s.rating}
                    onChange={e => set('rating', Math.max(1, Math.min(14, +e.target.value)))}
                    inputProps={{ min: 1, max: 14 }}
                    error={s.rating > maxRating}
                    helperText={s.rating > maxRating ? `Capped at ${maxRating}` : `Max: ${maxRating}`}
                  />
                </Box>

                {s.upgradeMode && (
                  <Box>
                    <TextField
                      label="Current (old) Rating"
                      type="number" size="small" sx={{ width: 150 }}
                      value={s.oldRating}
                      onChange={e => set('oldRating', Math.max(1, Math.min(rating - 1, +e.target.value)))}
                      inputProps={{ min: 1, max: Math.max(1, rating - 1) }}
                    />
                    <Typography variant="caption" color="text.secondary" display="block">
                      Must be less than {rating}
                    </Typography>
                  </Box>
                )}
              </Box>

              {utility.systemOps && (
                <Alert severity="info" sx={{ mb: 2 }} icon={false}>
                  <Typography variant="caption"><strong>System Operations:</strong> {utility.systemOps}</Typography>
                </Alert>
              )}

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip color="primary" label={`Base size: ${fmt(baseSize)} Mp (${rating}² × ${utility.mult})`} />
                {selOpts.length > 0 && actualSizeMp !== baseSize && (
                  <Chip label={`Actual size: ${fmt(actualSizeMp)} Mp`} color="primary" variant="outlined" />
                )}
                {selOpts.length > 0 && designSizeMp !== actualSizeMp && (
                  <Chip label={`Design size: ${fmt(designSizeMp)} Mp (for time)`} variant="outlined" />
                )}
              </Box>
            </Paper>

            {/* Options */}
            {availOpts.length > 0 && (
              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Utility Options
                  <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    Options change design/actual size and effective rating — NOT the programming TN
                  </Typography>
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {availOpts.map(opt => {
                    const sel = selOpts.find(o => o.id === opt.id);
                    const isSelected = !!sel;
                    const modLabel = typeof opt.ratingMod === 'number'
                      ? ` (${opt.ratingMod > 0 ? '+' : ''}${opt.ratingMod})`
                      : ' (+rating)';
                    return (
                      <Box key={opt.id} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Tooltip title={opt.notes} placement="top" arrow>
                          <Chip
                            label={`${opt.label}${modLabel}`}
                            size="small"
                            variant={isSelected ? 'filled' : 'outlined'}
                            color={isSelected ? 'primary' : 'default'}
                            onClick={() => toggleOption(opt.id)}
                            sx={{ cursor: 'pointer' }}
                          />
                        </Tooltip>
                        {isSelected && opt.ratingMod === 'per_area_rating' && (
                          <TextField label="Area Rating" type="number" size="small" sx={{ width: 130 }}
                            value={sel.areaRating ?? 1}
                            onChange={e => setOptSubRating(opt.id, 'areaRating', Math.max(1, +e.target.value))}
                            inputProps={{ min: 1, max: rating }}
                          />
                        )}
                        {isSelected && opt.ratingMod === 'per_dinab_rating' && (
                          <TextField label="DINAB Rating" type="number" size="small" sx={{ width: 130 }}
                            value={sel.dinabRating ?? 1}
                            onChange={e => setOptSubRating(opt.id, 'dinabRating', Math.max(1, +e.target.value))}
                            inputProps={{ min: 1, max: rating }}
                          />
                        )}
                        {isSelected && opt.ratingMod === 'per_stealth_rating' && (
                          <TextField label="Stealth Rating" type="number" size="small" sx={{ width: 130 }}
                            value={sel.skulkRating ?? 1}
                            onChange={e => setOptSubRating(opt.id, 'skulkRating', Math.max(1, +e.target.value))}
                            inputProps={{ min: 1, max: rating }}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>
                {selOpts.length > 0 && effectiveRating !== rating && (
                  <Box sx={{ mt: 1 }}>
                    <Chip size="small" color="secondary" label={`Effective rating: ${effectiveRating} (base ${rating})`} />
                  </Box>
                )}
              </Paper>
            )}

            {/* Programming Setup */}
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>Programming Setup</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <FormControl size="small" sx={{ minWidth: 280 }}>
                  <InputLabel shrink>Tools / Environment</InputLabel>
                  <Select value={s.toolId} label="Tools / Environment" onChange={e => set('toolId', e.target.value)}>
                    {SR2ProgrammingTools.map(t => (
                      <MenuItem key={t.id} value={t.id}>
                        {t.label} {t.taskBonus > 0 ? `(+${t.taskBonus} task bonus)` : '(no bonus)'}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Team Members"
                  type="number" size="small" sx={{ width: 140 }}
                  value={s.teamMembers}
                  onChange={e => set('teamMembers', Math.max(1, Math.min(sr2MaxTeamSize(s.skill), +e.target.value)))}
                  inputProps={{ min: 1, max: sr2MaxTeamSize(s.skill) }}
                  helperText={`Max: ${sr2MaxTeamSize(s.skill)} (skill÷2)`}
                />
              </Box>
              {tool.notes && (
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                  {tool.notes}
                </Typography>
              )}
              {tool.costNote && (
                <Typography variant="caption" color="text.secondary" display="block">Cost: {tool.costNote}</Typography>
              )}
            </Paper>
          </Grid>

          {/* Right column */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'sticky', top: 80 }}>
              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Programming Test</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Computer Skill (or Software / Matrix Programming) vs TN {tn}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip color="primary" label={`TN: ${tn} (= program rating)`} />
                  {tool.taskBonus > 0 && <Chip color="secondary" size="small" label={`+${tool.taskBonus} task bonus`} />}
                </Box>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Task Period</Typography>
                <TextField
                  label="Successes on Computer Test"
                  type="number" size="small" fullWidth
                  value={s.successes}
                  onChange={e => set('successes', Math.max(1, +e.target.value))}
                  inputProps={{ min: 1 }} sx={{ mb: 1 }}
                />
                {s.upgradeMode ? (
                  <>
                    <StatRow label={`New size (rating ${rating})`} value={`${fmt(sr2ProgramSize(rating, utility.mult))} Mp`} />
                    <StatRow label={`Old size (rating ${Math.min(s.oldRating, rating-1)})`} value={`${fmt(sr2ProgramSize(Math.min(s.oldRating, rating-1), utility.mult))} Mp`} />
                    <StatRow label="Upgrade base time (difference × 2)" value={fmtDays(baseTimeDays)} />
                  </>
                ) : (
                  <StatRow label={`Design size`} value={`${fmt(designSizeMp)} Mp`} />
                )}
                <StatRow label={s.upgradeMode ? 'Base time' : 'Base time (size × 2)'} value={fmtDays(baseTimeDays)} />
                <StatRow label="Task period (base ÷ successes)" value={fmtDays(taskPeriod)} highlight
                  caption={`${fmt(taskPeriod * 8)} hrs total work`} />
                {s.teamMembers > 1 && (
                  <StatRow label={`Each extra member`} value="−1 day/day worked" />
                )}
              </Paper>

              {/* Program Price */}
              {priceInfo && (
                <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Buying This Program (VR2 p.107)</Typography>
                  <StatRow label="Actual size" value={`${fmt(actualSizeMp)} Mp`} />
                  <StatRow label={`Price (size × ${priceTier?.priceMult})`} value={`¥${priceInfo.price.toLocaleString()}`} highlight />
                  <StatRow label="Availability" value={priceInfo.avail} />
                  <StatRow label="Street Index" value={priceInfo.streetIndex} />
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                    Option ratings do not affect price. Availability: Etiquette (Matrix) skill. −25% for object-code only.
                  </Typography>
                </Paper>
              )}

              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Summary</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip size="small" color={TYPE_COLORS[utility.type] ?? 'default'} label={`${utility.label} (${utility.type})`} />
                  <Chip size="small" label={`Rating ${rating}${effectiveRating !== rating ? ` → eff. ${effectiveRating}` : ''}`} />
                  <Chip size="small" label={`×${utility.mult}`} />
                  <Chip size="small" color="primary" label={`${fmt(actualSizeMp)} Mp actual`} />
                  {designSizeMp !== actualSizeMp && <Chip size="small" label={`${fmt(designSizeMp)} Mp design`} />}
                  <Chip size="small" label={`TN ${tn}`} />
                  {tool.taskBonus > 0 && <Chip size="small" color="secondary" label={`+${tool.taskBonus} task`} />}
                  {selOpts.length > 0 && <Chip size="small" label={`${selOpts.length} option${selOpts.length > 1 ? 's' : ''}`} />}
                  {s.upgradeMode && <Chip size="small" color="warning" label={`Upgrade from ${Math.min(s.oldRating, rating-1)}`} />}
                </Box>
              </Paper>

              <Accordion variant="outlined">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Quick Reference</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 1 }}>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Size:</strong> Rating² × Mult (Mp)</Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Base Time:</strong> Design size × 2 days</Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Upgrade Base Time:</strong> (New size − Old size) × 2 days</Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>TN:</strong> Program rating</Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Max Rating:</strong> = Computer Skill</Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Max Deck/Frame Core:</strong> Skill × 1.5 (round down)</Typography>
                  <Divider sx={{ my: 0.5 }} />
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Task Bonuses:</strong> Kit +1 · Shop +2 · Mainframe +4 · +Suite +5 · Double memory +1</Typography>
                  <Divider sx={{ my: 0.5 }} />
                  <Typography variant="caption" display="block" sx={{ mb: 0.25 }}><strong>Prices:</strong></Typography>
                  <Typography variant="caption" display="block" sx={{ pl: 1 }}>R1–3: ×100¥ · R4–6: ×200¥ · R7–9: ×500¥ · R10+: ×1000¥</Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
        </Grid>
      )}

      {/* ── Frames tab ───────────────────────────────────────────────────── */}
      {subTab === 1 && <FrameCalculator skill={s.skill} />}

      {/* ── Program Size Table tab ───────────────────────────────────────── */}
      {subTab === 2 && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Program Size Table (VR2 p.101) — Rating² × Multiplier (Mp)
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Rating</strong></TableCell>
                  {[1,2,3,4,5,6,7,8,9,10].map(m => <TableCell key={m} align="center"><strong>×{m}</strong></TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(r => (
                  <TableRow key={r}>
                    <TableCell><strong>{r}</strong></TableCell>
                    {[1,2,3,4,5,6,7,8,9,10].map(m => (
                      <TableCell key={m} align="center">{r * r * m}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* ── Command Sets tab ─────────────────────────────────────────────── */}
      {subTab === 3 && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>Command Sets (VR2 pp.104–105)</Typography>
              <Alert severity="info" sx={{ mb: 2 }} icon={false}>
                <Typography variant="caption">
                  A command set is a simple program of orders that a decker can leave on a host to be executed at a later time. Writing a command set requires one or more Subsystem Tests depending on the tasks the decker wants the host to perform. The Deception utility reduces TN for all command set tests.
                </Typography>
              </Alert>

              <Typography variant="subtitle2" gutterBottom>Design Size</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Design size is <strong>1D6 × 20 Mp</strong> (random, determined at write time). After uploading the program, the decker must make a successful Control Test to load it into the host.
              </Typography>
              <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Die Roll</TableCell>
                      <TableCell align="center">Design Size</TableCell>
                      <TableCell align="center">Base Time (×2)</TableCell>
                      <TableCell align="center">2 successes</TableCell>
                      <TableCell align="center">4 successes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {SR2_COMMAND_SET_DESIGN_SIZES.map((mp, i) => {
                      const base = mp * 2;
                      return (
                        <TableRow key={i}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell align="center">{mp} Mp</TableCell>
                          <TableCell align="center">{fmtDays(base)}</TableCell>
                          <TableCell align="center">{fmtDays(Math.ceil(base / 2))}</TableCell>
                          <TableCell align="center">{fmtDays(Math.ceil(base / 4))}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant="subtitle2" gutterBottom>Runtime Duration</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                After the command set is loaded, the host makes Subsystem Test rolls opposing the decker. Total the host's successes and divide by 24 — this is the number of hours the command set will continue running undetected before being found and purged. If the host scores no successes, the command set remains undetected for <strong>48 hours</strong>.
              </Typography>

              <Typography variant="subtitle2" gutterBottom>What Tests to Use</Typography>
              <Typography variant="body2" color="text.secondary">
                The gamemaster determines the specific Subsystem Test for each task in the command set. When in doubt, use a Control Test. Examples: opening a security door → Access Test; printing something → Files Test; opening a system → Access Test.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>Quick Reference (Skill {s.skill})</Typography>
              <StatRow label="Design size" value="1D6 × 20 Mp (random)" />
              <StatRow label="Base time" value="Design size × 2 days" />
              <StatRow label="Min base time (roll 1)" value={fmtDays(40)} />
              <StatRow label="Max base time (roll 6)" value={fmtDays(240)} />
              <StatRow label="Upload" value="Successful Control Test required" />
              <StatRow label="Runtime if host fails" value="48 hours undetected" highlight />
              <StatRow label="Runtime formula" value="Host successes ÷ 24 hrs" />
              <Divider sx={{ my: 1 }} />
              <Typography variant="caption" color="text.secondary" display="block">
                Cannot be upgraded (VR2 p.107). Use the Deception utility to reduce TN on all command set Subsystem Tests.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
