import React, { useState } from 'react';
import {
  Box, Typography, Paper, Chip, Alert,
  FormControl, InputLabel, Select, MenuItem,
  TextField, Tooltip, Grid, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Accordion, AccordionSummary, AccordionDetails, Tabs, Tab,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  SR2Utilities, SR2UtilityOptions, SR2ProgrammingTools,
  sr2ProgramSize, sr2MaxRating, sr2BaseTimeDays, sr2TaskPeriod,
  sr2CalcEffectiveRating, sr2CalcActualSize, sr2CalcDesignSize,
  sr2MaxTeamSize, sr2MaxTeamRating,
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

// ── Main component ────────────────────────────────────────────────────────────
const defaultState = {
  skill: 6,
  utilityId: 'analyze',
  rating: 4,
  selectedOptions: [],   // [{ id, areaRating?, dinabRating?, skulkRating? }]
  toolId: 'personal_computer',
  teamMembers: 1,
  successes: 2,
};

export default function SR2ProgrammingCalculator() {
  const [s, setS] = useState(defaultState);
  const [subTab, setSubTab] = useState(0);
  const set = (k, v) => setS(d => ({ ...d, [k]: v }));

  const utility = SR2Utilities.find(u => u.id === s.utilityId) ?? SR2Utilities[0];
  const tool    = SR2ProgrammingTools.find(t => t.id === s.toolId) ?? SR2ProgrammingTools[0];

  const maxRating      = sr2MaxRating(s.skill, false);
  const rating         = Math.min(s.rating, maxRating);
  const effectiveRating = sr2CalcEffectiveRating(rating, s.selectedOptions);
  const actualSizeMp   = sr2CalcActualSize(rating, utility.mult, s.selectedOptions);
  const designSizeMp   = sr2CalcDesignSize(rating, utility.mult, s.selectedOptions);
  const baseSize       = sr2ProgramSize(rating, utility.mult);
  const baseTimeDays   = sr2BaseTimeDays(designSizeMp);
  const taskPeriod     = sr2TaskPeriod(baseTimeDays, s.successes);
  const tn             = rating; // TN = program rating

  const availOpts = SR2UtilityOptions.filter(o => utility.availableOptions.includes(o.id));

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

  const selOpts = s.selectedOptions;

  return (
    <Box sx={{ p: 2, maxWidth: 1100 }}>
      <Typography variant="h5" gutterBottom>
        Programming Calculator
        <Chip label="SR2 / VR2 Rules" size="small" variant="outlined" sx={{ ml: 1, fontSize: '0.7rem' }} color="secondary" />
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Calculate programming time, TNs and task periods for SR2 deckers. Source: <em>Virtual Realities 2.0</em> pp. 101–104, 161.
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
            helperText={`Max utility rating: ${maxRating}`}
          />
        </Box>
      </Paper>

      {/* Sub-tabs */}
      <Tabs value={subTab} onChange={(_, v) => setSubTab(v)} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Utility Programs" />
        <Tab label="Program Size Table" />
        <Tab label="Command Sets" />
      </Tabs>

      {/* ── Utility Programs tab ─────────────────────────────────────────── */}
      {subTab === 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>

            {/* Utility + Rating */}
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>Program Design</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                <FormControl size="small" sx={{ minWidth: 220 }}>
                  <InputLabel>Utility</InputLabel>
                  <Select value={s.utilityId} label="Utility"
                    onChange={e => {
                      set('utilityId', e.target.value);
                      // clear any options that don't apply to the new utility
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
              </Box>

              {utility.systemOps && (
                <Alert severity="info" sx={{ mb: 2 }} icon={false}>
                  <Typography variant="caption"><strong>System Operations:</strong> {utility.systemOps}</Typography>
                </Alert>
              )}

              {/* Base size chips */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip color="primary" label={`Base size: ${fmt(baseSize)} Mp (rating ${rating}² × ${utility.mult})`} />
                {selOpts.length > 0 && actualSizeMp !== baseSize && (
                  <Chip label={`Actual size: ${fmt(actualSizeMp)} Mp (with options)`} color="primary" variant="outlined" />
                )}
                {selOpts.length > 0 && designSizeMp !== actualSizeMp && (
                  <Chip label={`Design size: ${fmt(designSizeMp)} Mp (for time)`} variant="outlined" />
                )}
              </Box>
            </Paper>

            {/* Options */}
            {availOpts.length > 0 ? (
              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Utility Options
                  <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    (VR2 pp.103–104 — options change design/actual size and effective rating, NOT the programming TN)
                  </Typography>
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {availOpts.map(opt => {
                    const sel = selOpts.find(o => o.id === opt.id);
                    const isSelected = !!sel;
                    const modLabel = typeof opt.ratingMod === 'number'
                      ? ` (${opt.ratingMod > 0 ? '+' : ''}${opt.ratingMod})`
                      : opt.ratingMod === 'per_area_rating' || opt.ratingMod === 'per_dinab_rating' || opt.ratingMod === 'per_stealth_rating'
                        ? ' (+rating)'
                        : ' (special)';
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
            ) : (
              utility.availableOptions.length === 0 && (
                <Alert severity="info" sx={{ mb: 2 }} icon={false}>
                  <Typography variant="caption">No utility options available for {utility.label}.</Typography>
                </Alert>
              )
            )}

            {/* Programming Setup */}
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>Programming Setup</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <FormControl size="small" sx={{ minWidth: 280 }}>
                  <InputLabel>Tools / Environment</InputLabel>
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
                <Typography variant="caption" color="text.secondary" display="block">
                  Cost: {tool.costNote}
                </Typography>
              )}
              {s.teamMembers > 1 && (
                <Alert severity="info" sx={{ mt: 1 }} icon={false}>
                  <Typography variant="caption">
                    Team: max rating {sr2MaxTeamRating(s.skill)} · each additional member reduces task period by 1 day · average skills for Computer Test (round up) · sum all task bonuses ÷ members = team task bonus
                  </Typography>
                </Alert>
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
                <Chip color="primary" label={`TN: ${tn} (= program rating)`} />
                {tool.taskBonus > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Chip color="secondary" size="small" label={`+${s.teamMembers > 1 ? Math.floor(tool.taskBonus / s.teamMembers) : tool.taskBonus} task bonus (${tool.label})`} />
                  </Box>
                )}
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
                <StatRow label="Design size" value={`${fmt(designSizeMp)} Mp`} />
                <StatRow label="Base time (size × 2)" value={fmtDays(baseTimeDays)} />
                <StatRow label="Task period (base ÷ successes)" value={fmtDays(taskPeriod)} highlight
                  caption={`${fmt(taskPeriod * 8)} hrs total work`} />
                {s.teamMembers > 1 && (
                  <StatRow
                    label={`Team reduction (${s.teamMembers - 1} extra member${s.teamMembers > 2 ? 's' : ''})`}
                    value={`−${s.teamMembers - 1} day${s.teamMembers > 2 ? 's' : ''}/day worked`}
                  />
                )}
              </Paper>

              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Summary</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip size="small" color={TYPE_COLORS[utility.type] ?? 'default'} label={`${utility.label} (${utility.type})`} />
                  <Chip size="small" label={`Rating ${rating}${effectiveRating !== rating ? ` → eff. ${effectiveRating}` : ''}`} />
                  <Chip size="small" label={`×${utility.mult} mult`} />
                  <Chip size="small" color="primary" label={`${fmt(actualSizeMp)} Mp actual`} />
                  {designSizeMp !== actualSizeMp && <Chip size="small" label={`${fmt(designSizeMp)} Mp design`} />}
                  <Chip size="small" label={`TN ${tn}`} />
                  {tool.taskBonus > 0 && <Chip size="small" color="secondary" label={`+${tool.taskBonus} task`} />}
                  {selOpts.length > 0 && <Chip size="small" label={`${selOpts.length} option${selOpts.length > 1 ? 's' : ''}`} />}
                </Box>
              </Paper>

              {/* Quick Reference */}
              <Accordion variant="outlined">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Quick Reference</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 1 }}>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Program Size:</strong> Rating² × Multiplier (Mp)</Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Base Time:</strong> Size × 2 days (1 day = 8 hrs)</Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Task Period:</strong> Base time ÷ successes</Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>TN:</strong> Program rating</Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Max Rating:</strong> = Computer Skill (deck/frame cores: skill × 1.5, round down)</Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Task Bonuses:</strong> Kit +1 · Shop +2 · Mainframe +4 · Mainframe+Suite +5 · Double memory +1</Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5 }}><strong>Options (actual size):</strong> One-Shot ×0.25 · Optimization ×0.5 · Squeeze ×0.5 · Sensitive ×0.25</Typography>
                  <Typography variant="caption" display="block"><strong>Options (design size):</strong> One-Shot ×1.5 · Optimization ×2 · Sensitive ×1.5</Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
        </Grid>
      )}

      {/* ── Program Size Table tab ───────────────────────────────────────── */}
      {subTab === 1 && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Program Size Table (VR2 p.101) — Rating² × Multiplier (Mp)
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Highlighted row = current rating ({rating}). All values in megapulses (Mp).
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
                  <TableRow key={r} sx={r === rating ? { bgcolor: 'action.selected' } : {}}>
                    <TableCell><strong>{r}{r === rating ? ' ★' : ''}</strong></TableCell>
                    {[1,2,3,4,5,6,7,8,9,10].map(m => (
                      <TableCell key={m} align="center"
                        sx={r === rating && m === utility.mult ? { fontWeight: 'bold', color: 'primary.main' } : {}}>
                        {r * r * m}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* ── Command Sets tab ─────────────────────────────────────────────── */}
      {subTab === 2 && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Command Sets (VR2 p.104)</Typography>
          <Alert severity="info" sx={{ mb: 2 }} icon={false}>
            <Typography variant="caption">
              A command set is a simple program of orders left on a host to be executed at a later time. Writing a command set requires one or more Subsystem Tests. The Deception utility reduces TN for all command set tests.
            </Typography>
          </Alert>
          <Typography variant="body2" color="text.secondary">
            The gamemaster determines the specific Subsystem Test needed for each task in the command set (when in doubt, use a Control Test). Command sets are all tasks, with specific base times, task periods, and tests needed to complete the work (see <em>Deckers and Tasks</em>, VR2 p.77).
          </Typography>
          <Alert severity="warning" sx={{ mt: 2 }} icon={false}>
            <Typography variant="caption">
              Full command set rules will be filled in from the VR2 scan. Check back after the book scan is available.
            </Typography>
          </Alert>
        </Paper>
      )}
    </Box>
  );
}
