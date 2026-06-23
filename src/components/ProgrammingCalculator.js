import React, { useState } from 'react';
import {
  Box, Typography, TextField, Paper, Chip, Alert,
  FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Accordion, AccordionSummary, AccordionDetails, Divider, Tooltip, Grid,
  ToggleButton, ToggleButtonGroup, Tabs, Tab,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  programSize, maxProgramRating, suiteSizeMp, suiteCompDice,
  baseTimeDays, taskPeriodDays,
  planTimeHours, planSizeMp, planTN,
  ProgrammingLanguages, bugTestTN, upgradeBaseTimeDays,
  ProgramOptions, calcDesignRating, calcDesignSize, calcActualSize,
  FrameAgentTypes, maxFrameRating, framePersonaPoints, frameFramePoints,
  WormTypes, ICPrograms,
} from '../data/SR3/ProgrammingRules';

// ── Shared helpers ────────────────────────────────────────────────────────────
function fmt(n) {
  if (n == null) return '—';
  return Math.round(n).toLocaleString();
}
function fmtDays(days) {
  if (days == null) return '—';
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
        <Typography variant="body2" fontWeight={highlight ? 'bold' : 'normal'} color={highlight ? 'primary.main' : 'text.primary'}>
          {value}
        </Typography>
        {caption && <Typography variant="caption" color="text.secondary" display="block">{caption}</Typography>}
      </Box>
    </Box>
  );
}

function OptionChips({ availableOptions, selectedOptions, onToggle, onRateChange }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {availableOptions.map(opt => {
        const sel = selectedOptions.find(o => o.id === opt.id);
        const isSelected = !!sel;
        const drLabel = opt.designRatingMod != null && opt.designRatingMod !== 0
          ? (opt.designRatingMod > 0 ? `+${opt.designRatingMod}` : `${opt.designRatingMod}`)
          : '';
        const perLabel = opt.designRatingModPerPoint
          ? (opt.designRatingModPerPoint > 0 ? `+${opt.designRatingModPerPoint}/pt` : `${opt.designRatingModPerPoint}/pt`)
          : '';
        const modLabel = [drLabel, perLabel].filter(Boolean).join(' ');
        return (
          <Box key={opt.id} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Tooltip title={opt.notes} placement="top" arrow>
              <Chip
                label={`${opt.label}${modLabel ? ` (DR ${modLabel})` : ' (special)'}`}
                size="small"
                variant={isSelected ? 'filled' : 'outlined'}
                color={isSelected ? 'primary' : 'default'}
                onClick={() => onToggle(opt.id)}
                sx={{ cursor: 'pointer' }}
              />
            </Tooltip>
            {isSelected && opt.hasOptionRating && (
              <TextField
                label={opt.optionRatingLabel}
                type="number" size="small" sx={{ width: 160 }}
                value={sel.optionRating}
                onChange={e => onRateChange(opt.id, Math.max(1, +e.target.value))}
                inputProps={{ min: 1, max: 10 }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

const HOST_COLORS = [
  { id: 'none',   label: 'None (not using mainframe)' },
  { id: 'blue',   label: 'Blue host',   mod: -1 },
  { id: 'green',  label: 'Green host',  mod: -2 },
  { id: 'orange', label: 'Orange host', mod: -3 },
  { id: 'red',    label: 'Red host',    mod: -4 },
];

const PROGRAM_TYPES = [
  { id: 'utility', label: 'Utility (Combat, Stealth, etc.)', isPersona: false },
  { id: 'persona', label: 'Persona Program (Bod/Evasion/Masking/Sensor)', isPersona: true },
  { id: 'ic',      label: 'IC (Intrusion Countermeasure)', isPersona: false },
  { id: 'agent',   label: 'Agent', isPersona: false },
  { id: 'other',   label: 'Other', isPersona: false },
];

// ═════════════════════════════════════════════════════════════════════════════
// Frames & Agents tab
// ═════════════════════════════════════════════════════════════════════════════

const frameDefault = {
  frameType: 'smart', coreRating: 4,
  bod: 1, evasion: 1, masking: 1, sensor: 1,
  pilotRating: 0, initBonus: 0, utilityPayload: 0,
  selectedOptions: [], programmingSuccesses: 3, language: 'none',
};

function FrameAgentCalculator({ skill, compDice: suiteComp }) {
  const [f, setF] = useState(frameDefault);
  const ff = (k, v) => setF(d => ({ ...d, [k]: v }));

  const frameType = FrameAgentTypes.find(t => t.id === f.frameType) ?? FrameAgentTypes[0];
  const maxRating = maxFrameRating(skill, f.frameType);
  const rating = Math.min(f.coreRating, maxRating);

  const personaPoints = framePersonaPoints(rating, f.frameType);
  const fpTotal = frameFramePoints(rating, f.frameType);
  const personaSpent = f.bod + f.evasion + f.masking + f.sensor;
  const fpSpent = f.pilotRating * 2 + f.initBonus * 3 + f.utilityPayload;
  const personaLeft = personaPoints - personaSpent;
  const fpLeft = fpTotal - fpSpent;

  const frameOpts = frameType.isIC
    ? ProgramOptions.filter(o =>
        (o.availableFor === 'ic' && !['ic_cascading', 'ic_party_cluster', 'ic_trap'].includes(o.id))
        || ['optimization', 'squeeze'].includes(o.id)
      )
    : ProgramOptions.filter(o => ['optimization', 'squeeze'].includes(o.id));

  function toggleOpt(id) {
    setF(d => {
      const has = d.selectedOptions.find(o => o.id === id);
      return has
        ? { ...d, selectedOptions: d.selectedOptions.filter(o => o.id !== id) }
        : { ...d, selectedOptions: [...d.selectedOptions, { id, optionRating: 1 }] };
    });
  }
  function setOptRating(id, val) {
    setF(d => ({ ...d, selectedOptions: d.selectedOptions.map(o => o.id === id ? { ...o, optionRating: val } : o) }));
  }

  const actualSizeMp = calcActualSize(rating, frameType.sizeMult, f.selectedOptions);
  const designSizeMp = calcDesignSize(rating, frameType.sizeMult, f.selectedOptions);
  const designRating = calcDesignRating(rating, f.selectedOptions);
  const lang = ProgrammingLanguages.find(l => l.id === f.language);
  const baseDays = baseTimeDays(designSizeMp);
  const effectiveBaseDays = lang?.id === 'renraku' ? baseDays * 2 : baseDays;
  const taskDays = taskPeriodDays(effectiveBaseDays, f.programmingSuccesses);
  const tnMod = (f.language === 'mct_iconix' ? -1 : 0) + (f.language === 'oblong' ? -2 : 0);
  const finalTN = Math.max(2, rating + tnMod);
  const attrCap = rating;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Frame / Agent Design</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Type</InputLabel>
              <Select value={f.frameType} label="Type" onChange={e => ff('frameType', e.target.value)}>
                {FrameAgentTypes.map(t => <MenuItem key={t.id} value={t.id}>{t.label}</MenuItem>)}
              </Select>
            </FormControl>
            <Box>
              <TextField
                label="Core Rating"
                type="number" size="small" sx={{ width: 130 }}
                value={f.coreRating}
                onChange={e => ff('coreRating', Math.max(1, Math.min(20, +e.target.value)))}
                inputProps={{ min: 1, max: 20 }}
                error={f.coreRating > maxRating}
                helperText={f.coreRating > maxRating ? `Capped at ${maxRating}` : `Max: ${maxRating}`}
              />
            </Box>
          </Box>

          {frameType.notes && (
            <Alert severity="info" sx={{ mb: 2 }} icon={false}>
              <Typography variant="caption">{frameType.notes}</Typography>
            </Alert>
          )}

          {/* Persona Points */}
          {frameType.hasPersona && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Persona Attributes
                <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  {personaPoints} points · max {attrCap} per attribute · {Math.max(0, personaLeft)} remaining
                </Typography>
              </Typography>
              {personaLeft < 0 && <Alert severity="error" sx={{ mb: 1, py: 0.5 }} icon={false}>Over-allocated by {-personaLeft} points — unused points are lost!</Alert>}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {[['bod','Bod'],['evasion','Evasion'],['masking','Masking'],['sensor','Sensor']].map(([k, lbl]) => (
                  <TextField key={k}
                    label={lbl} type="number" size="small" sx={{ width: 90 }}
                    value={f[k]}
                    onChange={e => ff(k, Math.max(0, Math.min(attrCap, +e.target.value)))}
                    inputProps={{ min: 0, max: attrCap }}
                    error={f[k] > attrCap}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Frame Points */}
          {fpTotal > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Frame Points
                <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  {fpTotal} available · {fpSpent} spent · {Math.max(0, fpLeft)} remaining
                </Typography>
              </Typography>
              {fpLeft < 0 && <Alert severity="error" sx={{ mb: 1, py: 0.5 }} icon={false}>Over-allocated by {-fpLeft} Frame Points!</Alert>}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {frameType.hasPilot && (
                  <Box>
                    <TextField
                      label={`Pilot Rating (${f.pilotRating * 2} FP)`}
                      type="number" size="small" sx={{ width: 170 }}
                      value={f.pilotRating}
                      onChange={e => ff('pilotRating', Math.max(0, Math.min(skill, +e.target.value)))}
                      inputProps={{ min: 0, max: skill }}
                    />
                    <Typography variant="caption" color="text.secondary" display="block">2 FP/die · max {skill}</Typography>
                  </Box>
                )}
                {frameType.maxInitBonusDice > 0 && (
                  <Box>
                    <TextField
                      label={`Init Bonus Dice (${f.initBonus * 3} FP)`}
                      type="number" size="small" sx={{ width: 170 }}
                      value={f.initBonus}
                      onChange={e => ff('initBonus', Math.max(0, Math.min(frameType.maxInitBonusDice, +e.target.value)))}
                      inputProps={{ min: 0, max: frameType.maxInitBonusDice }}
                    />
                    <Typography variant="caption" color="text.secondary" display="block">3 FP/die · max {frameType.maxInitBonusDice}D6</Typography>
                  </Box>
                )}
                <Box>
                  <TextField
                    label={`Utility Payload (${f.utilityPayload} FP)`}
                    type="number" size="small" sx={{ width: 170 }}
                    value={f.utilityPayload}
                    onChange={e => ff('utilityPayload', Math.max(0, +e.target.value))}
                    inputProps={{ min: 0 }}
                  />
                  <Typography variant="caption" color="text.secondary" display="block">1 FP/point</Typography>
                </Box>
              </Box>
            </Box>
          )}

          {/* IC Payload */}
          {frameType.isIC && (
            <Box sx={{ mb: 2 }}>
              <Chip color="secondary" label={`IC Payload: ${rating * 2} (rating ${rating} × 2)`} />
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                Hacking Pool = host Security Code (Blue=0, Green=1, Orange=2, Red=3)
              </Typography>
            </Box>
          )}

          {/* Options */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Options
              <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                {frameType.isIC ? 'IC options (excl. Cascading/Party Cluster/Trap) + Optimization + Squeeze' : 'Optimization and Squeeze only'}
              </Typography>
            </Typography>
            <OptionChips
              availableOptions={frameOpts}
              selectedOptions={f.selectedOptions}
              onToggle={toggleOpt}
              onRateChange={setOptRating}
            />
            {f.selectedOptions.length > 0 && (
              <Box sx={{ mt: 1 }}>
                <Chip size="small" color="secondary" label={`Design rating: ${designRating} (base ${rating})`} />
              </Box>
            )}
          </Box>

          <Box sx={{ mb: 2 }}>
            <FormControl size="small" sx={{ minWidth: 220 }}>
              <InputLabel>Programming Language</InputLabel>
              <Select value={f.language} label="Programming Language" onChange={e => ff('language', e.target.value)}>
                {ProgrammingLanguages.map(l => <MenuItem key={l.id} value={l.id}>{l.label}</MenuItem>)}
              </Select>
            </FormControl>
            {(() => { const l = ProgrammingLanguages.find(x => x.id === f.language); return l?.description ? <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>{l.description}</Typography> : null; })()}
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip color="primary" label={`Actual size: ${fmt(actualSizeMp)} Mp (memory)`} />
            {designSizeMp !== actualSizeMp && (
              <Chip label={`Design size: ${fmt(designSizeMp)} Mp (for time)`} variant="outlined" color="primary" />
            )}
            <Chip label={`Base time: ${fmtDays(effectiveBaseDays)}`} />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={5}>
        <Box sx={{ position: 'sticky', top: 80 }}>
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Programming Test</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Computer (Programming) vs TN {finalTN}{suiteComp > 0 ? ` · +${suiteComp} comp. dice` : ''}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip color="primary" label={`TN: ${finalTN} (core rating ${rating})`} />
              {suiteComp > 0 && <Chip color="secondary" label={`+${suiteComp} comp. dice`} />}
            </Box>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Task Period</Typography>
            <TextField
              label="Programming Test Successes"
              type="number" size="small" fullWidth
              value={f.programmingSuccesses}
              onChange={e => ff('programmingSuccesses', Math.max(1, +e.target.value))}
              inputProps={{ min: 1 }} sx={{ mb: 1 }}
            />
            <StatRow label="Base time" value={fmtDays(effectiveBaseDays)} />
            <StatRow label="Task period" value={fmtDays(taskDays)} highlight />
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Summary</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip size="small" color="primary" label={`${frameType.label} Rating ${rating}`} />
              <Chip size="small" label={`×${frameType.sizeMult} mult`} />
              <Chip size="small" label={`${fmt(actualSizeMp)} Mp`} />
              {frameType.hasPersona && <Chip size="small" label={`${personaSpent}/${personaPoints} persona pts`} color={personaLeft < 0 ? 'error' : 'default'} />}
              {fpTotal > 0 && <Chip size="small" label={`${fpSpent}/${fpTotal} frame pts`} color={fpLeft < 0 ? 'error' : 'default'} />}
              {frameType.hasPilot && f.pilotRating > 0 && <Chip size="small" label={`Pilot ${f.pilotRating}`} />}
              {f.initBonus > 0 && <Chip size="small" label={`+${f.initBonus}D6 Init`} />}
              {f.utilityPayload > 0 && <Chip size="small" label={`Payload ${f.utilityPayload}`} />}
              {frameType.isIC && <Chip size="small" color="secondary" label={`IC Payload ${rating * 2}`} />}
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// Worms tab
// ═════════════════════════════════════════════════════════════════════════════

const wormDefault = {
  wormType: 'crashworm', wormRating: 4,
  selectedOptions: [], programmingSuccesses: 3,
  language: 'none', hostColor: 'none', doubleMem: false, planSuccesses: 0,
};
const WORM_OPT_IDS = ['optimization', 'selective'];

function WormsCalculator({ skill, compDice: suiteComp }) {
  const [w, setW] = useState(wormDefault);
  const wf = (k, v) => setW(d => ({ ...d, [k]: v }));

  const wormType = WormTypes.find(t => t.id === w.wormType) ?? WormTypes[0];
  const rating = Math.min(w.wormRating, skill);
  const wormOpts = ProgramOptions.filter(o => WORM_OPT_IDS.includes(o.id));

  function toggleOpt(id) {
    setW(d => {
      const has = d.selectedOptions.find(o => o.id === id);
      return has
        ? { ...d, selectedOptions: d.selectedOptions.filter(o => o.id !== id) }
        : { ...d, selectedOptions: [...d.selectedOptions, { id, optionRating: 1 }] };
    });
  }
  function setOptRating(id, val) {
    setW(d => ({ ...d, selectedOptions: d.selectedOptions.map(o => o.id === id ? { ...o, optionRating: val } : o) }));
  }

  const designRating = calcDesignRating(rating, w.selectedOptions);
  const actualSizeMp = calcActualSize(rating, wormType.sizeMult, w.selectedOptions);
  const designSizeMp = calcDesignSize(rating, wormType.sizeMult, w.selectedOptions);
  const lang = ProgrammingLanguages.find(l => l.id === w.language);
  const host = HOST_COLORS.find(h => h.id === w.hostColor);
  let tnMod = 0;
  if (w.doubleMem) tnMod -= 2;
  if (w.planSuccesses > 0) tnMod -= w.planSuccesses;
  if (host?.mod) tnMod += host.mod;
  if (w.language === 'mct_iconix') tnMod -= 1;
  if (w.language === 'oblong') tnMod -= 2;
  const finalTN = Math.max(2, rating + tnMod);
  const baseDays = baseTimeDays(designSizeMp);
  const effectiveBaseDays = lang?.id === 'renraku' ? baseDays * 2 : baseDays;
  const taskDays = taskPeriodDays(effectiveBaseDays, w.programmingSuccesses);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Worm Design</Typography>
          <Alert severity="info" sx={{ mb: 2 }} icon={false}>
            <Typography variant="caption">Worms use the same programming rules as other programs. Only Optimization and Selective options are available. (Matrix pp. 92–93)</Typography>
          </Alert>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Worm Type</InputLabel>
              <Select value={w.wormType} label="Worm Type" onChange={e => wf('wormType', e.target.value)}>
                {WormTypes.map(t => <MenuItem key={t.id} value={t.id}>{t.label} (×{t.sizeMult})</MenuItem>)}
              </Select>
            </FormControl>
            <Box>
              <TextField
                label="Worm Rating"
                type="number" size="small" sx={{ width: 130 }}
                value={w.wormRating}
                onChange={e => wf('wormRating', Math.max(1, Math.min(14, +e.target.value)))}
                inputProps={{ min: 1, max: 14 }}
                error={w.wormRating > skill}
                helperText={w.wormRating > skill ? `Capped at ${skill}` : `Max: ${skill}`}
              />
            </Box>
          </Box>
          {wormType.notes && (
            <Alert severity="warning" sx={{ mb: 2 }} icon={false}>
              <Typography variant="caption">{wormType.notes}</Typography>
            </Alert>
          )}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Options (Optimization and Selective only)</Typography>
            <OptionChips
              availableOptions={wormOpts}
              selectedOptions={w.selectedOptions}
              onToggle={toggleOpt}
              onRateChange={setOptRating}
            />
            {w.selectedOptions.length > 0 && (
              <Box sx={{ mt: 1 }}>
                <Chip size="small" color="secondary" label={`Design rating: ${designRating} (base ${rating})`} />
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box>
              <FormControl size="small" sx={{ minWidth: 220 }}>
                <InputLabel>Programming Language</InputLabel>
                <Select value={w.language} label="Programming Language" onChange={e => wf('language', e.target.value)}>
                  {ProgrammingLanguages.map(l => <MenuItem key={l.id} value={l.id}>{l.label}</MenuItem>)}
                </Select>
              </FormControl>
              {(() => { const l = ProgrammingLanguages.find(x => x.id === w.language); return l?.description ? <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>{l.description}</Typography> : null; })()}
            </Box>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Mainframe Host</InputLabel>
              <Select value={w.hostColor} label="Mainframe Host" onChange={e => wf('hostColor', e.target.value)}>
                {HOST_COLORS.map(h => <MenuItem key={h.id} value={h.id}>{h.label}{h.mod != null ? ` (${h.mod > 0 ? '+' : ''}${h.mod} TN)` : ''}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box>
              <TextField
                label="Plan Successes"
                type="number" size="small" sx={{ width: 150 }}
                value={w.planSuccesses}
                onChange={e => wf('planSuccesses', Math.max(0, +e.target.value))}
                inputProps={{ min: 0 }}
              />
              <Typography variant="caption" color="text.secondary" display="block">Each success −1 TN</Typography>
            </Box>
            <FormControlLabel
              control={<Checkbox checked={w.doubleMem} onChange={e => wf('doubleMem', e.target.checked)} />}
              label="Double memory (−2 TN)"
            />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip color="primary" label={`Actual size: ${fmt(actualSizeMp)} Mp (memory)`} />
            {designSizeMp !== actualSizeMp && (
              <Chip label={`Design size: ${fmt(designSizeMp)} Mp (for time)`} variant="outlined" color="primary" />
            )}
            <Chip label={`Base time: ${fmtDays(effectiveBaseDays)}`} />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={5}>
        <Box sx={{ position: 'sticky', top: 80 }}>
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Programming Test</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Computer (Programming) vs TN {finalTN}</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip color="primary" label={`TN: ${finalTN}`} />
              {suiteComp > 0 && <Chip color="secondary" label={`+${suiteComp} comp. dice`} />}
            </Box>
          </Paper>
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Task Period</Typography>
            <TextField
              label="Programming Test Successes"
              type="number" size="small" fullWidth
              value={w.programmingSuccesses}
              onChange={e => wf('programmingSuccesses', Math.max(1, +e.target.value))}
              inputProps={{ min: 1 }} sx={{ mb: 1 }}
            />
            <StatRow label="Base time" value={fmtDays(effectiveBaseDays)} />
            <StatRow label="Task period" value={fmtDays(taskDays)} highlight />
          </Paper>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Summary</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip size="small" color="primary" label={`${wormType.label} Rating ${rating}`} />
              <Chip size="small" label={`×${wormType.sizeMult} mult`} />
              <Chip size="small" label={`${fmt(actualSizeMp)} Mp`} />
              <Chip size="small" label={`TN ${finalTN}`} />
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// Command Sets tab
// ═════════════════════════════════════════════════════════════════════════════

function CommandSetsInfo({ skill }) {
  const flyOps = Math.floor(skill / 2);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Command Set Rules</Typography>
          <Alert severity="info" sx={{ mb: 2 }} icon={false}>
            <Typography variant="caption">
              A command set is a simple script that runs timed system operations on a host. Command sets do NOT load any utilities. (Matrix pp. 87, 94)
            </Typography>
          </Alert>

          <Typography variant="subtitle2" gutterBottom>On-the-Fly Composition</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            <Chip color="primary" label={`Max operations: ${flyOps} (skill ${skill} ÷ 2, round down)`} />
            <Chip label="3 Complex Actions to compose" />
            <Chip label="No upload required" />
          </Box>

          <Typography variant="subtitle2" gutterBottom>Pre-Programmed Command Set</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip color="primary" label={`Max operations: ${skill} (= Computer skill)`} />
            <Chip label="Design size: 1D6 × 5 Mp (5–30 Mp)" />
            <Chip label="Program in advance, then upload to host" />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Base programming time = design size in days. Since design size is random (1D6 × 5 Mp), time varies:
          </Typography>
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Die Roll</TableCell>
                  <TableCell align="center">Design Size</TableCell>
                  <TableCell align="center">Base Time</TableCell>
                  <TableCell align="center">3 successes</TableCell>
                  <TableCell align="center">5 successes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[1,2,3,4,5,6].map(roll => {
                  const mp = roll * 5;
                  return (
                    <TableRow key={roll}>
                      <TableCell>{roll}</TableCell>
                      <TableCell align="center">{mp} Mp</TableCell>
                      <TableCell align="center">{fmtDays(mp)}</TableCell>
                      <TableCell align="center">{fmtDays(Math.ceil(mp / 3))}</TableCell>
                      <TableCell align="center">{fmtDays(Math.ceil(mp / 5))}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Activating a Command Set</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Perform a successful Analyze Subsystem operation, then a Null Operation to designate the command set as resident. The Security Value is modified based on time since the last operation.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Each test uses a target number equal to the average rating of loaded operations (round up). No Hacking Pool allowed for these tests.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Once activated, the command set runs and counts down. If the host shuts down, any active command sets are lost. Use Crash Application to remove a command set early.
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={5}>
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Quick Reference (Skill {skill})</Typography>
          <StatRow label="On-the-fly ops" value={`${flyOps} (skill ÷ 2)`} />
          <StatRow label="Pre-programmed max ops" value={`${skill} (= skill)`} highlight />
          <StatRow label="Design size" value="1D6 × 5 Mp (random)" />
          <StatRow label="Avg base time" value="~17–18 days" />
          <StatRow label="Composition (fly)" value="3 Complex Actions" />
        </Paper>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Per-Skill Reference</Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Skill</TableCell>
                  <TableCell align="center">Fly Ops</TableCell>
                  <TableCell align="center">Max Pre-Prog</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[3,4,5,6,7,8,9,10,12].map(s => (
                  <TableRow key={s} sx={s === skill ? { bgcolor: 'action.selected' } : {}}>
                    <TableCell>{s}{s === skill ? ' ★' : ''}</TableCell>
                    <TableCell align="center">{Math.floor(s / 2)}</TableCell>
                    <TableCell align="center">{s}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// Main component
// ═════════════════════════════════════════════════════════════════════════════

const defaultState = {
  skill: 6, suiteRating: 0,
  programType: 'utility', programRating: 4, multiplier: 3, icProgram: '',
  selectedOptions: [],
  language: 'none',
  doubleMem: false, hostColor: 'none', planSuccesses: 0, teamMembers: 1, reducedTime: false,
  programmingSuccesses: 3,
  upgradeMode: false, oldRating: 3,
};

export default function ProgrammingCalculator() {
  const [s, setS] = useState(defaultState);
  const [subTab, setSubTab] = useState(0);
  const set = (k, v) => setS(d => ({ ...d, [k]: v }));

  const programType = PROGRAM_TYPES.find(t => t.id === s.programType) ?? PROGRAM_TYPES[0];
  const maxRating   = maxProgramRating(s.skill, programType.isPersona);
  const rating      = Math.min(s.programRating, maxRating);
  const isUtility   = programType.id !== 'ic';

  const availableOptions = ProgramOptions.filter(o =>
    o.availableFor === 'both' ||
    (isUtility ? o.availableFor === 'utility' : o.availableFor === 'ic')
  );
  const optionCount = s.selectedOptions.length;

  function toggleOption(id) {
    setS(d => {
      const exists = d.selectedOptions.find(o => o.id === id);
      return exists
        ? { ...d, selectedOptions: d.selectedOptions.filter(o => o.id !== id) }
        : { ...d, selectedOptions: [...d.selectedOptions, { id, optionRating: 1 }] };
    });
  }
  function setOptionRating(id, val) {
    setS(d => ({ ...d, selectedOptions: d.selectedOptions.map(o => o.id === id ? { ...o, optionRating: val } : o) }));
  }

  const designRating = calcDesignRating(rating, s.selectedOptions);
  const designSizeMp = s.upgradeMode ? null : calcDesignSize(rating, s.multiplier, s.selectedOptions);
  const actualSizeMp = calcActualSize(rating, s.multiplier, s.selectedOptions);

  const baseTN = rating;
  let tnMod = 0;
  if (s.doubleMem) tnMod -= 2;
  if (s.planSuccesses > 0) tnMod -= s.planSuccesses;
  const host = HOST_COLORS.find(h => h.id === s.hostColor);
  if (host?.mod) tnMod += host.mod;
  const lang = ProgrammingLanguages.find(l => l.id === s.language);
  if (lang?.id === 'mct_iconix') tnMod -= 1;
  if (lang?.id === 'oblong')     tnMod -= 2;
  const finalTN = Math.max(2, baseTN + tnMod);

  const compDice = s.suiteRating > 0 ? suiteCompDice(s.suiteRating, s.skill) : 0;

  const basedays = s.upgradeMode
    ? upgradeBaseTimeDays(rating, s.multiplier, Math.min(s.oldRating, rating - 1))
    : baseTimeDays(designSizeMp ?? 0);
  const effectiveBasedays = lang?.id === 'renraku' ? basedays * 2 : basedays;
  const effectiveTaskDays = taskPeriodDays(effectiveBasedays, s.programmingSuccesses);

  const planHrs = planTimeHours(rating, optionCount, s.multiplier);
  const planMp  = planSizeMp(designSizeMp ?? programSize(rating, s.multiplier));
  const plantn  = planTN(rating, optionCount);

  const isMainframe = s.hostColor !== 'none';
  const bugTN = bugTestTN(rating, s.skill, optionCount, s.teamMembers, isMainframe, s.reducedTime, s.language);
  const effectiveRating = lang?.id === 'machodev' ? rating - 1 : rating;

  return (
    <Box sx={{ p: 2, maxWidth: 1100 }}>
      <Typography variant="h5" gutterBottom>
        Programming Calculator
        <Chip label="SR3 Matrix Rules" size="small" variant="outlined" sx={{ ml: 1, fontSize: '0.7rem' }} color="primary" />
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Calculate programming time, TNs and task periods for SR3 deckers. Source: <em>Matrix</em> pp. 76–94.
      </Typography>

      {/* Shared character section (all tabs use skill + suite) */}
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>Character</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            label="Computer (Programming) Skill"
            type="number" size="small" sx={{ width: 220 }}
            value={s.skill}
            onChange={e => set('skill', Math.max(1, Math.min(12, +e.target.value)))}
            inputProps={{ min: 1, max: 12 }}
          />
          <Box>
            <TextField
              label="Programming Suite Rating"
              type="number" size="small" sx={{ width: 180 }}
              value={s.suiteRating}
              onChange={e => set('suiteRating', Math.max(0, Math.min(10, +e.target.value)))}
              inputProps={{ min: 0, max: 10 }}
            />
            {s.suiteRating > 0 && (
              <Box sx={{ mt: 0.5, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                <Chip size="small" label={`${compDice} comp. dice`} color="secondary" />
                <Chip size="small" label={`Suite size: ${fmt(suiteSizeMp(s.suiteRating))} Mp`} />
              </Box>
            )}
            <Typography variant="caption" color="text.secondary" display="block">
              0 = no suite · max comp. dice = skill ({s.skill})
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Sub-tabs */}
      <Tabs
        value={subTab}
        onChange={(_, v) => setSubTab(v)}
        sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Utility / IC Programs" />
        <Tab label="Frames & Agents" />
        <Tab label="Worms" />
        <Tab label="Command Sets" />
      </Tabs>

      {/* ── Programs tab ─────────────────────────────────────────────────── */}
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
                <FormControl size="small" sx={{ minWidth: 260 }}>
                  <InputLabel>Program Type</InputLabel>
                  <Select value={s.programType} label="Program Type" onChange={e => { set('programType', e.target.value); if (e.target.value !== 'ic') set('icProgram', ''); }}>
                    {PROGRAM_TYPES.map(t => <MenuItem key={t.id} value={t.id}>{t.label}</MenuItem>)}
                  </Select>
                </FormControl>
                <Box>
                  <TextField
                    label="Program Rating"
                    type="number" size="small" sx={{ width: 140 }}
                    value={s.programRating}
                    onChange={e => set('programRating', Math.max(1, Math.min(14, +e.target.value)))}
                    inputProps={{ min: 1, max: 14 }}
                    error={s.programRating > maxRating}
                    helperText={s.programRating > maxRating ? `Capped at ${maxRating} (your skill)` : `Max: ${maxRating}`}
                  />
                </Box>
                <Box>
                  <TextField
                    label="Multiplier (1–10)"
                    type="number" size="small" sx={{ width: 140 }}
                    value={s.multiplier}
                    onChange={e => { set('multiplier', Math.max(1, Math.min(10, +e.target.value))); set('icProgram', ''); }}
                    inputProps={{ min: 1, max: 10 }}
                  />
                </Box>
                {s.programType === 'ic' && (
                  <FormControl size="small" sx={{ minWidth: 220 }}>
                    <InputLabel>IC Program Type</InputLabel>
                    <Select
                      value={s.icProgram}
                      label="IC Program Type"
                      onChange={e => {
                        const prog = ICPrograms.find(p => p.id === e.target.value);
                        set('icProgram', e.target.value);
                        if (prog) set('multiplier', prog.sizeMult);
                      }}
                    >
                      <MenuItem value=""><em>Custom multiplier</em></MenuItem>
                      {ICPrograms.map(p => (
                        <MenuItem key={p.id} value={p.id}>{p.label} (×{p.sizeMult})</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                {s.upgradeMode && (
                  <Box>
                    <TextField
                      label="Current (old) Rating"
                      type="number" size="small" sx={{ width: 160 }}
                      value={s.oldRating}
                      onChange={e => set('oldRating', Math.max(1, Math.min(rating - 1, +e.target.value)))}
                      inputProps={{ min: 1, max: Math.max(1, rating - 1) }}
                    />
                    <Typography variant="caption" color="text.secondary" display="block">
                      Must be less than new rating ({rating})
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Program Options
                  <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    (Matrix pp. 83–86 — options change design rating &amp; size, NOT the programming TN)
                  </Typography>
                </Typography>
                <OptionChips
                  availableOptions={availableOptions}
                  selectedOptions={s.selectedOptions}
                  onToggle={toggleOption}
                  onRateChange={setOptionRating}
                />
                {s.selectedOptions.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Chip size="small" color="secondary" label={`Design rating: ${designRating} (base ${rating})`} />
                  </Box>
                )}
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                <Chip color="primary" label={`Actual size: ${fmt(actualSizeMp)} Mp (memory)`} />
                {designSizeMp != null && designSizeMp !== actualSizeMp && (
                  <Chip label={`Design size: ${fmt(designSizeMp)} Mp (for time)`} variant="outlined" color="primary" />
                )}
                <Chip label={`Base time: ${fmtDays(effectiveBasedays)}`} />
                {lang?.id === 'renraku' && <Chip color="warning" size="small" label="Renraku Teng ×2 base time" />}
              </Box>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>Programming Conditions</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                <Box>
                  <TextField
                    label="Program Plan Successes"
                    type="number" size="small" sx={{ width: 200 }}
                    value={s.planSuccesses}
                    onChange={e => set('planSuccesses', Math.max(0, +e.target.value))}
                    inputProps={{ min: 0 }}
                  />
                  <Typography variant="caption" color="text.secondary" display="block">Each success −1 to Programming TN</Typography>
                </Box>
                <Box>
                  <TextField
                    label="Team Members (total)"
                    type="number" size="small" sx={{ width: 180 }}
                    value={s.teamMembers}
                    onChange={e => set('teamMembers', Math.max(1, +e.target.value))}
                    inputProps={{ min: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary" display="block">1 = solo; &gt;1 = team programming</Typography>
                </Box>
                <FormControl size="small" sx={{ minWidth: 220 }}>
                  <InputLabel>Mainframe Host</InputLabel>
                  <Select value={s.hostColor} label="Mainframe Host" onChange={e => set('hostColor', e.target.value)}>
                    {HOST_COLORS.map(h => (
                      <MenuItem key={h.id} value={h.id}>
                        {h.label}{h.mod != null ? ` (${h.mod > 0 ? '+' : ''}${h.mod} TN)` : ''}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box>
                  <FormControl size="small" sx={{ minWidth: 220 }}>
                    <InputLabel>Programming Language</InputLabel>
                    <Select value={s.language} label="Programming Language" onChange={e => set('language', e.target.value)}>
                      {ProgrammingLanguages.map(l => (
                        <MenuItem key={l.id} value={l.id}>
                          {l.label}{l.bugMod ? ` (Bug: ${l.bugMod > 0 ? '+' : ''}${l.id === 'novatech' ? l.bugMod + '/option' : l.bugMod})` : ''}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {lang?.description && <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>{lang.description}</Typography>}
                </Box>
              </Box>
              <Box>
                <FormControlLabel
                  control={<Checkbox checked={s.doubleMem} onChange={e => set('doubleMem', e.target.checked)} />}
                  label={<>Computer has double the required memory <InfoTip text="≥ 2× program size in both active and storage. Grants −2 TN." /></>}
                />
                <FormControlLabel
                  control={<Checkbox checked={s.reducedTime} onChange={e => set('reducedTime', e.target.checked)} />}
                  label={<>Used optional rule to reduce base time <InfoTip text="Adds +3 to Bug Test TN." /></>}
                />
              </Box>
            </Paper>

            <Accordion variant="outlined" sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2">Program Plan Helper</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1, mt: 0.3 }}>(Matrix p.78)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  A program plan reduces the Programming TN by 1 per success. Roll Combat/Operational Utility Design or Cyberterminal Code Design vs TN {plantn}.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip label={`Plan TN: ${plantn}`} color="primary" />
                  <Chip label={`Plan time: ${fmt(planHrs)} hrs (${(planHrs / 8).toFixed(1)} days)`} />
                  <Chip label={`Plan size: ${fmt(planMp)} Mp`} />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  TN = 4{rating <= 4 ? ' −1 (rating 1–4)' : rating >= 10 ? ' +1 (rating 10+)' : ''}{optionCount > 0 ? ` +${optionCount} options` : ''} = {plantn}
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion variant="outlined" sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2">Bug Test (Optional Rule)</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1, mt: 0.3 }}>(Matrix p.81)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Situation</TableCell>
                        <TableCell align="right">Modifier</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow><TableCell>Program difficulty (−(Rating+2))</TableCell><TableCell align="right">{-(rating + 2)}</TableCell></TableRow>
                      {optionCount > 0 && <TableRow><TableCell>Options (−(options+2))</TableCell><TableCell align="right">{-(optionCount + 2)}</TableCell></TableRow>}
                      {s.teamMembers > 1 && <TableRow><TableCell>Team ({s.teamMembers} members)</TableCell><TableCell align="right">{-(s.teamMembers + 2)}</TableCell></TableRow>}
                      {isMainframe && <TableRow><TableCell>Used mainframe</TableCell><TableCell align="right">+2</TableCell></TableRow>}
                      {s.reducedTime && <TableRow><TableCell>Reduced base time</TableCell><TableCell align="right">+3</TableCell></TableRow>}
                      {lang && lang.id !== 'none' && lang.bugMod !== 0 && (
                        <TableRow>
                          <TableCell>{lang.label}</TableCell>
                          <TableCell align="right">{lang.id === 'novatech' ? `${lang.bugMod} × ${optionCount} = ${lang.bugMod * optionCount}` : lang.bugMod}</TableCell>
                        </TableRow>
                      )}
                      <TableRow sx={{ bgcolor: 'action.hover' }}>
                        <TableCell><strong>Total Bug TN modifier</strong></TableCell>
                        <TableCell align="right"><strong>{bugTN >= 0 ? '+' : ''}{bugTN}</strong></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* Right column */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'sticky', top: 80 }}>
              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Programming Test</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Computer (Programming) vs TN {finalTN}{compDice > 0 ? ` · +${compDice} comp. dice` : ''}
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <StatRow label="Base TN (program rating)" value={baseTN} />
                  {s.doubleMem && <StatRow label="Double memory" value="−2" />}
                  {s.planSuccesses > 0 && <StatRow label={`Plan successes (×${s.planSuccesses})`} value={`−${s.planSuccesses}`} />}
                  {host?.mod && <StatRow label={host.label} value={host.mod} />}
                  {lang?.id === 'mct_iconix' && <StatRow label="MCT Iconix 7" value="−1" />}
                  {lang?.id === 'oblong' && <StatRow label="Oblong" value="−2" />}
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  <Chip color="primary" label={`Final TN: ${finalTN}`} />
                  {compDice > 0 && <Chip color="secondary" label={`+${compDice} comp. dice`} />}
                  {lang?.id === 'machodev' && <Chip color="warning" size="small" label={`Effective rating: ${effectiveRating} (MachoDev −1)`} />}
                </Box>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Task Period</Typography>
                <TextField
                  label="Successes on Programming Test"
                  type="number" size="small" fullWidth
                  value={s.programmingSuccesses}
                  onChange={e => set('programmingSuccesses', Math.max(1, +e.target.value))}
                  inputProps={{ min: 1 }} sx={{ mb: 1 }}
                />
                {s.teamMembers > 1 && effectiveTaskDays && (
                  <Alert severity="info" sx={{ mb: 1, py: 0.5 }} icon={false}>
                    Team: each member works min {fmt(Math.ceil(effectiveTaskDays / (s.teamMembers + 1)))} days.
                  </Alert>
                )}
                <StatRow label="Base time" value={fmtDays(effectiveBasedays)} />
                <StatRow label="Programming successes" value={s.programmingSuccesses} />
                <StatRow label="Task period" value={effectiveTaskDays ? fmtDays(effectiveTaskDays) : '—'} highlight
                  caption={effectiveTaskDays ? `${fmt(effectiveTaskDays * 8)} hrs total work` : undefined} />
                {s.teamMembers > 1 && effectiveTaskDays && (
                  <StatRow label={`Min days per member (÷${s.teamMembers + 1})`} value={`${fmt(Math.ceil(effectiveTaskDays / (s.teamMembers + 1)))} days`} />
                )}
              </Paper>

              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Program Summary</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip size="small" color="primary" label={`Rating ${rating}`} />
                  <Chip size="small" label={`×${s.multiplier} multiplier`} />
                  <Chip size="small" label={`${fmt(actualSizeMp)} Mp`} />
                  <Chip size="small" label={`TN ${finalTN}`} />
                  {compDice > 0 && <Chip size="small" color="secondary" label={`+${compDice} comp dice`} />}
                  {optionCount > 0 && <Chip size="small" label={`${optionCount} option${optionCount > 1 ? 's' : ''}`} />}
                  {s.upgradeMode && <Chip size="small" color="warning" label={`Upgrade from ${s.oldRating}`} />}
                  {lang && lang.id !== 'none' && <Chip size="small" label={lang.label} />}
                  {s.hostColor !== 'none' && <Chip size="small" label={HOST_COLORS.find(h => h.id === s.hostColor)?.label} />}
                </Box>
              </Paper>

              <Accordion variant="outlined">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Quick Reference</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 1 }}>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Program Size:</strong> Rating² × Multiplier (Mp)</Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Base Time:</strong> Size in days (1 day = 8 hrs)</Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Task Period:</strong> Base time ÷ successes</Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Max Rating:</strong> = skill{programType.isPersona ? ' × 1.5 (round down)' : ''}</Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Suite:</strong> Rating² × 15 Mp · comp. dice capped by skill</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Frame/Agent size multipliers:</strong></Typography>
                  <Typography variant="caption" display="block" sx={{ pl: 1 }}>Dumb Frame ×3 · Smart Frame ×6 · Agent ×10 · IC Construct ×3</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Suite Size Table:</strong></Typography>
                  {[1,2,3,4,5,6,7,8,9,10].map(r => (
                    <Typography key={r} variant="caption" display="block" sx={{ pl: 1 }}>Rating {r}: {r*r*15} Mp</Typography>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
        </Grid>
      )}

      {subTab === 1 && <FrameAgentCalculator skill={s.skill} compDice={compDice} />}
      {subTab === 2 && <WormsCalculator skill={s.skill} compDice={compDice} />}
      {subTab === 3 && <CommandSetsInfo skill={s.skill} />}
    </Box>
  );
}
