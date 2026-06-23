import React, { useState, useMemo } from 'react';
import {
  Box, Typography, TextField, Paper, Chip, Alert,
  FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Accordion, AccordionSummary, AccordionDetails, Divider, Tooltip, Grid,
  ToggleButton, ToggleButtonGroup
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  programSize, maxProgramRating, suiteSizeMp, suiteCompDice,
  baseTimeDays, baseTimeHours, taskPeriodDays, taskPeriodHours,
  ProgrammingModifiers, planTimeHours, planSizeMp, planTN,
  ProgrammingLanguages, bugTestTN, upgradeBaseTimeDays
} from '../data/SR3/ProgrammingRules';

function fmt(n, unit = '') {
  if (n == null) return '—';
  return `${Math.round(n).toLocaleString()}${unit ? ' ' + unit : ''}`;
}

function fmtDays(days) {
  if (days == null) return '—';
  const h = days * 8;
  if (days === 1) return '1 day (8 hrs)';
  return `${fmt(days)} days (${fmt(h)} hrs)`;
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

const PROGRAM_TYPES = [
  { id: 'utility',   label: 'Utility (Combat, Stealth, etc.)', isPersona: false },
  { id: 'persona',   label: 'Persona Program (Bod/Evasion/Masking/Sensor)', isPersona: true },
  { id: 'ic',        label: 'IC (Intrusion Countermeasure)', isPersona: false },
  { id: 'agent',     label: 'Agent', isPersona: false },
  { id: 'other',     label: 'Other', isPersona: false },
];

const HOST_COLORS = [
  { id: 'none',   label: 'None (not using mainframe)' },
  { id: 'blue',   label: 'Blue host',   mod: -1 },
  { id: 'green',  label: 'Green host',  mod: -2 },
  { id: 'orange', label: 'Orange host', mod: -3 },
  { id: 'red',    label: 'Red host',    mod: -4 },
];

const defaultState = {
  // Character
  skill: 6,
  suiteRating: 0,
  // Program
  programType: 'utility',
  programRating: 4,
  multiplier: 3,
  options: 0,
  language: 'none',
  // Programming conditions
  doubleMem: false,
  hostColor: 'none',
  planSuccesses: 0,
  teamMembers: 1,
  reducedTime: false,
  // Successes achieved on Programming Test (for task period)
  programmingSuccesses: 3,
  // Upgrade mode
  upgradeMode: false,
  oldRating: 3,
};

export default function ProgrammingCalculator() {
  const [s, setS] = useState(defaultState);
  const set = (k, v) => setS(d => ({ ...d, [k]: v }));

  const programType = PROGRAM_TYPES.find(t => t.id === s.programType) ?? PROGRAM_TYPES[0];
  const maxRating   = maxProgramRating(s.skill, programType.isPersona);
  const rating      = Math.min(s.programRating, maxRating);
  const sizeMp      = programSize(rating, s.multiplier);

  // TN calculation
  const baseTN  = rating;
  let tnMod = 0;
  if (s.doubleMem) tnMod -= 2;
  if (s.planSuccesses > 0) tnMod -= s.planSuccesses;
  const host = HOST_COLORS.find(h => h.id === s.hostColor);
  if (host?.mod) tnMod += host.mod;
  const lang = ProgrammingLanguages.find(l => l.id === s.language);
  if (lang?.id === 'mct_iconix') tnMod -= 1;
  if (lang?.id === 'oblong')     tnMod -= 2;

  const finalTN = Math.max(2, baseTN + tnMod);

  // Suite complementary dice
  const compDice = s.suiteRating > 0 ? suiteCompDice(s.suiteRating, s.skill) : 0;

  // Time
  const basedays    = s.upgradeMode
    ? upgradeBaseTimeDays(rating, s.multiplier, Math.min(s.oldRating, rating - 1))
    : baseTimeDays(sizeMp);
  const taskDays    = taskPeriodDays(basedays, s.programmingSuccesses);

  // Renraku Teng doubles base time
  const effectiveBasedays = lang?.id === 'renraku' ? basedays * 2 : basedays;
  const effectiveTaskDays = taskPeriodDays(effectiveBasedays, s.programmingSuccesses);

  // Program plan
  const planHrs    = planTimeHours(rating, s.options, s.multiplier);
  const planMp     = planSizeMp(sizeMp);
  const plantn     = planTN(rating, s.options);

  // Bug test
  const isMainframe = s.hostColor !== 'none';
  const bugTN = bugTestTN(rating, s.skill, s.options, s.teamMembers, isMainframe, s.reducedTime, s.language);

  // MachoDev reduces effective rating for display
  const effectiveRating = lang?.id === 'machodev' ? rating - 1 : rating;

  // Memory needed
  const memNeeded = sizeMp;
  const hasDoubleMem = s.doubleMem;

  return (
    <Box sx={{ p: 2, maxWidth: 1100 }}>
      <Typography variant="h5" gutterBottom>
        Programming Calculator
        <Chip label="SR3 Matrix Rules" size="small" variant="outlined" sx={{ ml: 1, fontSize: '0.7rem' }} color="primary" />
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Calculate programming time, TNs and task periods for SR3 deckers. Source: <em>Matrix</em> pp. 76–81.
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>

        {/* ── Left column ─────────────────────────────────────────────── */}
        <Grid item xs={12} md={7}>

          {/* Character */}
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

          {/* Program Design */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Program Design</Typography>

            {/* Mode toggle */}
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
                <Select value={s.programType} label="Program Type"
                  onChange={e => set('programType', e.target.value)}>
                  {PROGRAM_TYPES.map(t => (
                    <MenuItem key={t.id} value={t.id}>{t.label}</MenuItem>
                  ))}
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
                  onChange={e => set('multiplier', Math.max(1, Math.min(10, +e.target.value)))}
                  inputProps={{ min: 1, max: 10 }}
                />
              </Box>

              <Box>
                <TextField
                  label="Program Options"
                  type="number" size="small" sx={{ width: 140 }}
                  value={s.options}
                  onChange={e => set('options', Math.max(0, +e.target.value))}
                  inputProps={{ min: 0 }}
                />
                <Typography variant="caption" color="text.secondary" display="block">
                  Each option +1 to plan TN
                </Typography>
              </Box>

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

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip color="primary" label={`Program size: ${fmt(sizeMp)} Mp`} />
              <Chip label={`Memory required: ${fmt(memNeeded)} Mp`} />
              <Chip label={`Base time: ${fmtDays(effectiveBasedays)}`} />
              {lang?.id === 'renraku' && (
                <Chip color="warning" size="small" label="Renraku Teng ×2 base time" />
              )}
            </Box>
          </Paper>

          {/* Programming Conditions */}
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
                <Typography variant="caption" color="text.secondary" display="block">
                  Each success −1 to Programming TN
                </Typography>
              </Box>

              <Box>
                <TextField
                  label="Team Members (total)"
                  type="number" size="small" sx={{ width: 180 }}
                  value={s.teamMembers}
                  onChange={e => set('teamMembers', Math.max(1, +e.target.value))}
                  inputProps={{ min: 1 }}
                />
                <Typography variant="caption" color="text.secondary" display="block">
                  1 = solo; &gt;1 = team programming
                </Typography>
              </Box>

              <FormControl size="small" sx={{ minWidth: 220 }}>
                <InputLabel>Mainframe Host</InputLabel>
                <Select value={s.hostColor} label="Mainframe Host"
                  onChange={e => set('hostColor', e.target.value)}>
                  {HOST_COLORS.map(h => (
                    <MenuItem key={h.id} value={h.id}>
                      {h.label}{h.mod != null ? ` (${h.mod > 0 ? '+' : ''}${h.mod} TN)` : ''}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 220 }}>
                <InputLabel>Programming Language</InputLabel>
                <Select value={s.language} label="Programming Language"
                  onChange={e => set('language', e.target.value)}>
                  {ProgrammingLanguages.map(l => (
                    <MenuItem key={l.id} value={l.id}>
                      {l.label}
                      {l.bugMod ? ` (Bug: ${l.bugMod > 0 ? '+' : ''}${l.id === 'novatech' ? l.bugMod + '/option' : l.bugMod})` : ''}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
              <FormControlLabel
                control={<Checkbox checked={s.doubleMem} onChange={e => set('doubleMem', e.target.checked)} />}
                label={<>Computer has double the required memory <InfoTip text="Computer has ≥ 2× the program size in both active and storage memory. Grants −2 TN." /></>}
              />
              <FormControlLabel
                control={<Checkbox checked={s.reducedTime} onChange={e => set('reducedTime', e.target.checked)} />}
                label={<>Used optional rule to reduce base time <InfoTip text="Optional rule allowing reduced base time. Adds +3 to Bug Test TN." /></>}
              />
            </Box>

            {lang && lang.id !== 'none' && lang.otherEffect && (
              <Alert severity="info" sx={{ mt: 1 }} icon={false}>
                <strong>{lang.label}:</strong> {lang.otherEffect}
              </Alert>
            )}
          </Paper>

          {/* Program Plan Helper */}
          <Accordion variant="outlined" sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">Program Plan Helper</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1, mt: 0.3 }}>
                (create a plan to reduce programming TN — Matrix p.78)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                A program plan reduces the Programming TN by 1 per success. Uses
                Combat Utility Design / Operational Utility Design / Cyberterminal Code Design
                skill against TN {plantn}.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Chip label={`Plan TN: ${plantn}`} color="primary" />
                <Chip label={`Plan creation time: ${fmt(planHrs)} hrs (${(planHrs / 8).toFixed(1)} days)`} />
                <Chip label={`Plan size: ${fmt(planMp)} Mp`} />
              </Box>
              <Typography variant="caption" color="text.secondary">
                Plan TN = 4 base
                {rating <= 4 ? ' −1 (rating 1–4)' : rating >= 10 ? ' +1 (rating 10+)' : ''}
                {s.options > 0 ? ` +${s.options} (${s.options} option${s.options > 1 ? 's' : ''})` : ''}
                {' = '}{plantn}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Plan time = (rating {rating} + {s.options} options) × multiplier {s.multiplier} = {planHrs} hrs
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Bug Test (optional rule) */}
          <Accordion variant="outlined" sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">Bug Test (Optional Rule)</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1, mt: 0.3 }}>
                (Matrix p.81 — open test each time program is used)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Every time the program is run, make an Open Test using Computer (Programming).
                Bugs appear on the n-th use (n = Occurrence factor from rolls). TN modifiers:
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Situation</TableCell>
                      <TableCell align="right">Modifier</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Program difficulty (−(Rating+2))</TableCell>
                      <TableCell align="right">{-(rating + 2)}</TableCell>
                    </TableRow>
                    {s.options > 0 && (
                      <TableRow>
                        <TableCell>Options (−(options+2))</TableCell>
                        <TableCell align="right">{-(s.options + 2)}</TableCell>
                      </TableRow>
                    )}
                    {s.teamMembers > 1 && (
                      <TableRow>
                        <TableCell>Team ({s.teamMembers} members)</TableCell>
                        <TableCell align="right">{-(s.teamMembers + 2)}</TableCell>
                      </TableRow>
                    )}
                    {isMainframe && (
                      <TableRow>
                        <TableCell>Used mainframe</TableCell>
                        <TableCell align="right">+2</TableCell>
                      </TableRow>
                    )}
                    {s.reducedTime && (
                      <TableRow>
                        <TableCell>Reduced base time</TableCell>
                        <TableCell align="right">+3</TableCell>
                      </TableRow>
                    )}
                    {lang && lang.id !== 'none' && lang.bugMod !== 0 && (
                      <TableRow>
                        <TableCell>{lang.label} (language)</TableCell>
                        <TableCell align="right">
                          {lang.id === 'novatech'
                            ? `${lang.bugMod} × ${s.options} options = ${lang.bugMod * s.options}`
                            : lang.bugMod}
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow sx={{ bgcolor: 'action.hover' }}>
                      <TableCell><strong>Total Bug TN modifier</strong></TableCell>
                      <TableCell align="right"><strong>{bugTN >= 0 ? '+' : ''}{bugTN}</strong></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                GM rolls 2D6 ÷ base time (round up) on failure. That number = minimum uses before bugs manifest.
              </Typography>
            </AccordionDetails>
          </Accordion>

        </Grid>

        {/* ── Right column: results ───────────────────────────────────── */}
        <Grid item xs={12} md={5}>
          <Box sx={{ position: 'sticky', top: 80 }}>

            {/* Programming Test */}
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>Programming Test</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Computer (Programming) vs TN {finalTN}
                {compDice > 0 && ` · +${compDice} comp. dice from suite`}
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

            {/* Task Period */}
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>Task Period</Typography>
              <Box sx={{ mb: 1 }}>
                <TextField
                  label="Successes on Programming Test"
                  type="number" size="small" fullWidth
                  value={s.programmingSuccesses}
                  onChange={e => set('programmingSuccesses', Math.max(1, +e.target.value))}
                  inputProps={{ min: 1 }}
                  sx={{ mb: 1 }}
                />
                {s.teamMembers > 1 && (
                  <Alert severity="info" sx={{ mb: 1, py: 0.5 }} icon={false}>
                    Team: roll dice equal to average Computer (Programming) skill (round down).
                    Each member works min {fmt(Math.ceil(effectiveTaskDays / (s.teamMembers + 1)))} days.
                  </Alert>
                )}
              </Box>
              <StatRow label="Base time" value={fmtDays(effectiveBasedays)} />
              <StatRow label="Programming successes" value={s.programmingSuccesses} />
              <StatRow
                label="Task period"
                value={effectiveTaskDays ? fmtDays(effectiveTaskDays) : '—'}
                highlight
                caption={effectiveTaskDays ? `${fmt(effectiveTaskDays * 8)} hrs total work` : undefined}
              />
              {s.teamMembers > 1 && effectiveTaskDays && (
                <StatRow
                  label={`Min days per member (÷${s.teamMembers + 1})`}
                  value={`${fmt(Math.ceil(effectiveTaskDays / (s.teamMembers + 1)))} days`}
                />
              )}
            </Paper>

            {/* Summary chips */}
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>Program Summary</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip size="small" color="primary" label={`Rating ${rating}`} />
                <Chip size="small" label={`×${s.multiplier} multiplier`} />
                <Chip size="small" label={`${fmt(sizeMp)} Mp`} />
                <Chip size="small" label={`TN ${finalTN}`} />
                {compDice > 0 && <Chip size="small" color="secondary" label={`+${compDice} comp dice`} />}
                {s.options > 0 && <Chip size="small" label={`${s.options} option${s.options > 1 ? 's' : ''}`} />}
                {s.upgradeMode && <Chip size="small" color="warning" label={`Upgrade from ${s.oldRating}`} />}
                {lang && lang.id !== 'none' && <Chip size="small" label={lang.label} />}
                {s.hostColor !== 'none' && <Chip size="small" label={HOST_COLORS.find(h => h.id === s.hostColor)?.label} />}
              </Box>
            </Paper>

            {/* Quick Reference */}
            <Accordion variant="outlined">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2">Quick Reference</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 1 }}>
                <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Program Size:</strong> Rating² × Multiplier (Mp)</Typography>
                <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Base Time:</strong> Size in days (1 day = 8 hrs work)</Typography>
                <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Task Period:</strong> Base time ÷ successes (days)</Typography>
                <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Max Rating:</strong> = Computer (Programming) skill{programType.isPersona ? ' × 1.5 (round down) for persona' : ''}</Typography>
                <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Suite:</strong> Rating² × 15 Mp · provides comp. dice (capped by skill)</Typography>
                <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Memory:</strong> Computer must have program size in both active and storage memory. Double = −2 TN.</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Programming Suite Table:</strong></Typography>
                {[1,2,3,4,5,6,7,8,9,10].map(r => (
                  <Typography key={r} variant="caption" display="block" sx={{ pl: 1 }}>
                    Rating {r}: {r*r*15} Mp
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
