import React, { useState, useMemo } from 'react';
import {
  Box, Typography, TextField, Button, Chip, Divider, Paper,
  FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Alert, Tooltip, ToggleButton, ToggleButtonGroup, Slider, Grid
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import {
  ComponentFormulas, calcDeckCost, Casings, getPF, PFTable, PACKAGE_DISCOUNT,
  personaRatingLimit, responseIncreaseMax, ioSpeedMax, roundIoSpeed,
  ConstructionTasks
} from '../data/SR2/VR2CyberdeckDesign';

const MPCP_MAX = 12;
const PROGRAM_MAX = 10;

// ── Utility ──────────────────────────────────────────────────────────────────

function fmt(n) {
  return n != null ? `¥${Math.round(n).toLocaleString()}` : '—';
}

function RatingInput({ label, value, min = 0, max, onChange, tooltip }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <TextField
        label={label}
        type="number"
        size="small"
        value={value}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10);
          if (!isNaN(v) && v >= min && v <= max) onChange(v);
        }}
        inputProps={{ min, max, step: 1 }}
        sx={{ width: 90 }}
      />
      {tooltip && (
        <Tooltip title={tooltip} placement="right">
          <InfoOutlinedIcon fontSize="small" sx={{ color: 'text.secondary', cursor: 'help' }} />
        </Tooltip>
      )}
    </Box>
  );
}

function PFChip({ rating, label }) {
  const pf = getPF(rating);
  return (
    <Chip
      size="small"
      label={`PF ${pf}¥ (${label ?? `Rating ${rating}`})`}
      variant="outlined"
      color={pf >= 1000 ? 'error' : pf >= 500 ? 'warning' : pf >= 200 ? 'primary' : 'default'}
      sx={{ fontSize: '0.7rem' }}
    />
  );
}

// ── Construction Tasks Panel ──────────────────────────────────────────────────

function TaskBlock({ label, task }) {
  if (!task) return <Typography variant="caption" color="text.secondary">None required.</Typography>;
  return (
    <Box sx={{ mb: 0.5 }}>
      {task.time  && <Typography variant="caption" display="block"><strong>Time:</strong> {task.time}</Typography>}
      {task.test  && <Typography variant="caption" display="block"><strong>Test:</strong> {task.test}</Typography>}
      {task.parts?.length > 0 && (
        <Typography variant="caption" display="block">
          <strong>Parts:</strong> {task.parts.join(', ')}
        </Typography>
      )}
      {task.tools?.length > 0 && (
        <Typography variant="caption" display="block">
          <strong>Tools:</strong> {task.tools.join(', ')}
        </Typography>
      )}
    </Box>
  );
}

function ConstructionPanel({ design }) {
  const activeComponents = [];

  if (design.mpcp > 0) activeComponents.push('mpcp');
  if (design.bod > 0)  activeComponents.push('bodOrEvasion');
  if (design.evasion > 0 && !activeComponents.includes('bodOrEvasion')) activeComponents.push('bodOrEvasion');
  if (design.masking > 0) activeComponents.push('maskingOrSensor');
  if (design.sensor > 0 && !activeComponents.includes('maskingOrSensor')) activeComponents.push('maskingOrSensor');
  if (design.asistType === 'hot')  activeComponents.push('asistHot');
  if (design.asistType === 'cool') activeComponents.push('asistCool');
  if (design.activeMemoryMp > 0)   activeComponents.push('activeMemory');
  if (design.storageMemoryMp > 0)  activeComponents.push('storageMemory');
  if (design.hardening > 0)        activeComponents.push('hardening');
  if (design.iccmFilter)           activeComponents.push('iccmFilter');
  if (design.ioSpeedMePS > 0)      activeComponents.push('ioSpeed');
  if (design.responseIncrease > 0) activeComponents.push('responseIncrease');
  if (design.satlinkInterface)     activeComponents.push('satlinkInterface');

  return (
    <Accordion variant="outlined" sx={{ mt: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle2">Construction Tasks</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ ml: 1, mt: 0.3 }}>
          (build times, parts &amp; tests for DIY construction)
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 1 }}>
        {activeComponents.map((key) => {
          const ct = ConstructionTasks[key];
          if (!ct) return null;
          return (
            <Box key={key} sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>
                {ct.label}
              </Typography>
              {ct.software && (
                <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                  <em>Software:</em> Rating {ct.software.ratingBasis}, Multiplier {ct.software.multiplier}
                </Typography>
              )}
              {ct.cook && (
                <>
                  <Typography variant="caption" display="block" sx={{ color: 'text.secondary', mt: 0.5 }}><em>Cook Task:</em></Typography>
                  <TaskBlock label="Cook" task={ct.cook} />
                </>
              )}
              <Typography variant="caption" display="block" sx={{ color: 'text.secondary', mt: 0.5 }}><em>Installation Task:</em></Typography>
              <TaskBlock label="Install" task={ct.install} />
            </Box>
          );
        })}
        {activeComponents.length === 0 && (
          <Typography variant="caption" color="text.secondary">Select components to see construction tasks.</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

// ── Cost Breakdown Table ──────────────────────────────────────────────────────

function CostBreakdown({ breakdown }) {
  if (!breakdown) return null;
  const { items, subtotal, discount, total } = breakdown;
  return (
    <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 320 }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell><strong>Component</strong></TableCell>
            <TableCell align="right"><strong>Cost</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.label}</TableCell>
              <TableCell align="right">{fmt(item.cost)}</TableCell>
            </TableRow>
          ))}
          {discount > 0 && (
            <TableRow sx={{ bgcolor: 'success.lighter' }}>
              <TableCell><em>Package Discount (10%)</em></TableCell>
              <TableCell align="right" sx={{ color: 'success.main' }}>−{fmt(discount)}</TableCell>
            </TableRow>
          )}
          <TableRow sx={{ bgcolor: 'action.hover' }}>
            <TableCell><strong>Total</strong></TableCell>
            <TableCell align="right"><strong>{fmt(total)}</strong></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ── PF Reference Table ────────────────────────────────────────────────────────

function PFReferenceTable() {
  return (
    <Paper variant="outlined" sx={{ p: 1, fontSize: '0.75rem' }}>
      <Typography variant="caption" display="block" gutterBottom sx={{ fontWeight: 'bold' }}>
        Program Factor (PF) by Rating
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {PFTable.filter(r => isFinite(r.ratingMax)).map((r, i) => (
          <Chip key={i} size="small" variant="outlined"
            label={`${r.ratingMin}–${r.ratingMax} → PF ${r.pf}¥`} />
        ))}
        <Chip size="small" variant="outlined" label="10+ → PF 1,000¥" />
      </Box>
    </Paper>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

const defaultDesign = {
  name: '',
  mpcp: 4,
  bod: 0,
  evasion: 0,
  masking: 0,
  sensor: 0,
  asistType: 'hot',
  activeMemoryMp: 200,
  storageMemoryMp: 200,
  hardening: 0,
  iccmFilter: false,
  ioSpeedMePS: 100,
  responseIncrease: 0,
  satlinkInterface: false,
  casing: 0,
  hitckerJacks: 0,
  offlineStorageMp: 0,
  vidscreen: false,
  packageDiscount: false,
};

function VR2CyberdeckDesigner({ edition, onSave }) {
  const [design, setDesign] = useState(defaultDesign);

  const set = (key, val) => setDesign(d => ({ ...d, [key]: val }));

  const breakdown = useMemo(() => {
    if (!design.mpcp) return null;
    return calcDeckCost(design);
  }, [design]);

  const programMax = Math.min(design.mpcp, PROGRAM_MAX);
  const personaTotal = design.bod + design.evasion + design.masking + design.sensor;
  const personaLimit = personaRatingLimit(design.mpcp);
  const personaOver  = personaTotal > personaLimit;
  const riMax        = responseIncreaseMax(design.mpcp);
  const ioMax        = ioSpeedMax(design.mpcp, design.sensor);

  function handleSave() {
    if (!design.name.trim()) return;
    const saved = {
      edition: 'SR2-VR2',
      source: 'VR2',
      ...design,
      breakdown,
      estimatedCost: breakdown?.total ?? 0,
    };
    onSave(saved);
    setDesign(defaultDesign);
  }

  function handleExport() {
    if (!breakdown) return;
    const saved = { edition: 'SR2-VR2', source: 'VR2', ...design, breakdown, estimatedCost: breakdown.total };
    const blob = new Blob([JSON.stringify({ type: 'sr-custom-deck', version: 1, design: saved }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${design.name || 'custom-deck'}.srdeck.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        const d = parsed.design ?? parsed;
        if (d.mpcp) setDesign({ ...defaultDesign, ...d });
      } catch (_) {}
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <Box sx={{ p: 2, maxWidth: 1100 }}>
      <Typography variant="h5" gutterBottom>
        Cyberdeck Designer
        <Chip label="VR2 Rules" size="small" variant="outlined" sx={{ ml: 1, fontSize: '0.7rem' }} />
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Custom deck construction using <em>Virtual Realities 2.0</em> "Decks À La Carte" rules.
        All costs computed from VR2 component price formulas.
      </Typography>

      <PFReferenceTable />

      <Grid container spacing={2} sx={{ mt: 1 }}>

        {/* ── Left column: design controls ─────────────────────────────── */}
        <Grid item xs={12} md={7}>

          {/* Name */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <TextField
              label="Deck Name"
              fullWidth
              size="small"
              value={design.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. Fuchi Cyber-4, Custom Shadowdancer…"
            />
          </Paper>

          {/* ── Core: MPCP ─────────────────────────────────────────────── */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>MPCP (Master Persona Control Program)</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <RatingInput
                label="MPCP Rating"
                value={design.mpcp}
                min={1}
                max={MPCP_MAX}
                onChange={(v) => {
                  // Clamp persona programs to new MPCP
                  setDesign(d => ({
                    ...d,
                    mpcp: v,
                    bod: Math.min(d.bod, v),
                    evasion: Math.min(d.evasion, v),
                    masking: Math.min(d.masking, v),
                    sensor: Math.min(d.sensor, v),
                    hardening: Math.min(d.hardening, v),
                  }));
                }}
                tooltip="Maximum persona program rating equals MPCP. Drives cost of ASIST, ICCM, Satlink, and Response Increase."
              />
              <PFChip rating={design.mpcp} label={`MPCP ${design.mpcp}`} />
              {design.mpcp > 0 && (
                <Chip
                  size="small"
                  label={`MPCP cost: ${fmt(ComponentFormulas.mpcp(design.mpcp))}`}
                  color="primary"
                />
              )}
            </Box>
          </Paper>

          {/* ── Persona Programs ───────────────────────────────────────── */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Persona Programs
              <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                (max rating = MPCP {design.mpcp})
              </Typography>
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {[
                { key: 'bod',     label: 'Bod',     formula: 'bodOrEvasion'    },
                { key: 'evasion', label: 'Evasion', formula: 'bodOrEvasion'    },
                { key: 'masking', label: 'Masking', formula: 'maskingOrSensor' },
                { key: 'sensor',  label: 'Sensor',  formula: 'maskingOrSensor' },
              ].map(({ key, label, formula }) => {
                const rating = design[key];
                const cost = rating > 0 ? ComponentFormulas[formula](rating) : 0;
                return (
                  <Box key={key} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <RatingInput
                      label={label}
                      value={rating}
                      min={0}
                      max={programMax}
                      onChange={(v) => set(key, v)}
                    />
                    {rating > 0 && (
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        <PFChip rating={rating} label={`${label} ${rating}`} />
                        <Chip size="small" label={fmt(cost)} color="default" />
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
            {personaOver && (
              <Alert severity="error" sx={{ mt: 1 }}>
                Combined persona ratings ({personaTotal}) exceed MPCP×3 limit ({personaLimit}). Reduce one or more programs.
              </Alert>
            )}
            {!personaOver && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Combined: {personaTotal} / {personaLimit} allowed (MPCP×3) &nbsp;|&nbsp;
                Bod &amp; Evasion: Rating² × (3×PF + 95) &nbsp;|&nbsp;
                Masking &amp; Sensor: Rating² × (2×PF + 75)
              </Typography>
            )}
          </Paper>

          {/* ── ASIST Interface ────────────────────────────────────────── */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>ASIST Interface</Typography>
            <ToggleButtonGroup
              value={design.asistType}
              exclusive
              onChange={(_, v) => { if (v) set('asistType', v); }}
              size="small"
            >
              <ToggleButton value="none">None</ToggleButton>
              <ToggleButton value="hot">Hot Deck</ToggleButton>
              <ToggleButton value="cool">Cool Deck</ToggleButton>
            </ToggleButtonGroup>
            {design.asistType !== 'none' && design.mpcp > 0 && (
              <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <PFChip rating={design.mpcp} label={`MPCP ${design.mpcp}`} />
                <Chip size="small" color="primary"
                  label={`Cost: ${fmt(design.asistType === 'hot'
                    ? ComponentFormulas.asistHot(design.mpcp)
                    : ComponentFormulas.asistCool(design.mpcp))}`}
                />
              </Box>
            )}
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              Hot: (MPCP² × [PF×2 + 40]) + (MPCP × 50) &nbsp;|&nbsp;
              Cool: (MPCP² × [PF×20]) + (MPCP × 25) &nbsp; PF based on MPCP.
            </Typography>
          </Paper>

          {/* ── Memory & I/O ───────────────────────────────────────────── */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Memory &amp; I/O Speed</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <RatingInput
                  label="Active Memory (Mp)"
                  value={design.activeMemoryMp}
                  min={0}
                  max={9999}
                  onChange={(v) => set('activeMemoryMp', v)}
                  tooltip="7.5¥ per Mp"
                />
                {design.activeMemoryMp > 0 && (
                  <Chip size="small" label={fmt(ComponentFormulas.activeMemory(design.activeMemoryMp))} sx={{ mt: 0.5 }} />
                )}
              </Box>
              <Box>
                <RatingInput
                  label="Storage Memory (Mp)"
                  value={design.storageMemoryMp}
                  min={0}
                  max={99999}
                  onChange={(v) => set('storageMemoryMp', v)}
                  tooltip="6¥ per Mp"
                />
                {design.storageMemoryMp > 0 && (
                  <Chip size="small" label={fmt(ComponentFormulas.storageMemory(design.storageMemoryMp))} sx={{ mt: 0.5 }} />
                )}
              </Box>
              <Box>
                <RatingInput
                  label="I/O Speed (MePS)"
                  value={design.ioSpeedMePS}
                  min={0}
                  max={ioMax ?? 9990}
                  onChange={(v) => set('ioSpeedMePS', roundIoSpeed(v))}
                  tooltip={`Must be multiples of 10.${ioMax ? ` Max = Sensor × MPCP × 10 = ${ioMax} MePS.` : ' Set Sensor rating to unlock max.'}`}
                />
                {design.ioSpeedMePS > 0 && (
                  <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                    <Chip size="small" label={fmt(ComponentFormulas.ioSpeed(design.ioSpeedMePS))} />
                    {ioMax != null && design.ioSpeedMePS > ioMax && (
                      <Chip size="small" color="error" label={`Over max (${ioMax} MePS)`} />
                    )}
                  </Box>
                )}
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Active Memory: Mp × 7.5¥ &nbsp;|&nbsp; Storage Memory: Mp × 6¥ &nbsp;|&nbsp;
              I/O Speed: MePS × 30¥ (multiples of 10; max = Sensor × MPCP × 10)
            </Typography>
          </Paper>

          {/* ── Optional Enhancements ──────────────────────────────────── */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Optional Enhancements</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>

              {/* Hardening */}
              <Box>
                <RatingInput
                  label="Hardening"
                  value={design.hardening}
                  min={0}
                  max={programMax}
                  onChange={(v) => set('hardening', v)}
                  tooltip="PF based on Hardening rating: Hardening² × (PF×8 + 160) + Hardening×70"
                />
                {design.hardening > 0 && (
                  <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                    <PFChip rating={design.hardening} label={`Hardening ${design.hardening}`} />
                    <Chip size="small" label={fmt(ComponentFormulas.hardening(design.hardening))} />
                  </Box>
                )}
              </Box>

              {/* Response Increase */}
              <Box>
                <RatingInput
                  label="Response Increase"
                  value={design.responseIncrease}
                  min={0}
                  max={riMax}
                  onChange={(v) => set('responseIncrease', Math.min(v, riMax))}
                  tooltip={`Max = floor(MPCP÷4) = ${riMax} for MPCP ${design.mpcp}. Absolute max 5. PF based on MPCP.`}
                />
                {design.responseIncrease > 0 && design.mpcp > 0 && (
                  <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                    <PFChip rating={design.mpcp} label={`MPCP ${design.mpcp}`} />
                    <Chip size="small" label={fmt(ComponentFormulas.responseIncrease(design.mpcp, design.responseIncrease))} />
                  </Box>
                )}
                <Typography variant="caption" color="text.secondary" display="block">
                  Max {riMax} for MPCP {design.mpcp} (floor(MPCP÷4))
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
              {/* ICCM */}
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox checked={design.iccmFilter} onChange={(e) => set('iccmFilter', e.target.checked)} />
                  }
                  label="ICCM Biofeedback Filter"
                />
                {design.iccmFilter && design.mpcp > 0 && (
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    <PFChip rating={design.mpcp} label={`MPCP ${design.mpcp}`} />
                    <Chip size="small" label={fmt(ComponentFormulas.iccmFilter(design.mpcp))} />
                  </Box>
                )}
                <Typography variant="caption" color="text.secondary" display="block">
                  (MPCP² × [PF×4 + 115]) + 5,000¥
                </Typography>
              </Box>

              {/* Satlink */}
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox checked={design.satlinkInterface} onChange={(e) => set('satlinkInterface', e.target.checked)} />
                  }
                  label="Satlink Interface"
                />
                {design.satlinkInterface && design.mpcp > 0 && (
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    <PFChip rating={design.mpcp} label={`MPCP ${design.mpcp}`} />
                    <Chip size="small" label={fmt(ComponentFormulas.satlinkInterface(design.mpcp))} />
                  </Box>
                )}
                <Typography variant="caption" color="text.secondary" display="block">
                  (MPCP² × [PF×2 + 40]) + (MPCP × 35)
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* ── Hardware / Peripherals ─────────────────────────────────── */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Hardware &amp; Peripherals</Typography>

            {/* Casing */}
            <FormControl size="small" sx={{ minWidth: 220, mb: 2 }}>
              <InputLabel>Casing</InputLabel>
              <Select
                value={design.casing}
                label="Casing"
                onChange={(e) => set('casing', e.target.value)}
              >
                {Casings.map((c, i) => (
                  <MenuItem key={i} value={i}>
                    {c.name} {c.cost > 0 ? `— ${fmt(c.cost)}` : '— free'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <RatingInput
                  label="Hitcher Jacks"
                  value={design.hitckerJacks}
                  min={0}
                  max={10}
                  onChange={(v) => set('hitckerJacks', v)}
                  tooltip="250¥ each"
                />
                {design.hitckerJacks > 0 && (
                  <Chip size="small" label={fmt(250 * design.hitckerJacks)} sx={{ mt: 0.5 }} />
                )}
              </Box>
              <Box>
                <RatingInput
                  label="Offline Storage (Mp)"
                  value={design.offlineStorageMp}
                  min={0}
                  max={9999}
                  onChange={(v) => set('offlineStorageMp', v)}
                  tooltip="50¥ + 0.5¥/Mp"
                />
                {design.offlineStorageMp > 0 && (
                  <Chip size="small" label={fmt(50 + 0.5 * design.offlineStorageMp)} sx={{ mt: 0.5 }} />
                )}
              </Box>
            </Box>

            <FormControlLabel
              sx={{ mt: 1 }}
              control={
                <Checkbox checked={design.vidscreen} onChange={(e) => set('vidscreen', e.target.checked)} />
              }
              label="Vidscreen (100¥)"
            />
          </Paper>

          {/* ── Package Discount ───────────────────────────────────────── */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: 'success.lighter' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={design.packageDiscount}
                  onChange={(e) => set('packageDiscount', e.target.checked)}
                />
              }
              label={
                <span>
                  <strong>Apply Package Discount (10% off)</strong>
                  <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    — ordering complete deck from manufacturer
                  </Typography>
                </span>
              }
            />
          </Paper>

        </Grid>

        {/* ── Right column: live cost breakdown ────────────────────────── */}
        <Grid item xs={12} md={5}>
          <Box sx={{ position: 'sticky', top: 80 }}>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>Cost Breakdown</Typography>

              {breakdown ? (
                <>
                  <CostBreakdown breakdown={breakdown} />
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary">
                      {fmt(breakdown.total)}
                    </Typography>
                    {design.packageDiscount && (
                      <Chip label={`Saved ${fmt(breakdown.discount)}`} color="success" size="small" />
                    )}
                  </Box>
                </>
              ) : (
                <Alert severity="info">Set MPCP to see costs.</Alert>
              )}
            </Paper>

            {/* ── Stats summary ──────────────────────────────────── */}
            {design.mpcp > 0 && (
              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Deck Stats Summary</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip size="small" label={`MPCP ${design.mpcp}`} color="primary" />
                  {design.bod > 0     && <Chip size="small" label={`Bod ${design.bod}`} />}
                  {design.evasion > 0 && <Chip size="small" label={`Evasion ${design.evasion}`} />}
                  {design.masking > 0 && <Chip size="small" label={`Masking ${design.masking}`} />}
                  {design.sensor > 0  && <Chip size="small" label={`Sensor ${design.sensor}`} />}
                  {design.asistType !== 'none' && (
                    <Chip size="small" label={`ASIST ${design.asistType === 'hot' ? 'Hot' : 'Cool'}`} color="secondary" />
                  )}
                  {design.activeMemoryMp > 0  && <Chip size="small" label={`Active ${design.activeMemoryMp} Mp`} />}
                  {design.storageMemoryMp > 0 && <Chip size="small" label={`Storage ${design.storageMemoryMp} Mp`} />}
                  {design.ioSpeedMePS > 0     && <Chip size="small" label={`I/O ${design.ioSpeedMePS} MePS`} />}
                  {design.hardening > 0       && <Chip size="small" label={`Hardening ${design.hardening}`} />}
                  {design.responseIncrease > 0 && <Chip size="small" label={`Response +${design.responseIncrease}`} />}
                  {design.iccmFilter     && <Chip size="small" label="ICCM Filter" color="warning" />}
                  {design.satlinkInterface && <Chip size="small" label="Satlink" />}
                  {design.casing > 0     && <Chip size="small" label={`Casing L${design.casing}`} />}
                  {design.hitckerJacks > 0 && <Chip size="small" label={`×${design.hitckerJacks} Hitcher Jack`} />}
                  {design.vidscreen      && <Chip size="small" label="Vidscreen" />}
                </Box>
              </Paper>
            )}

            {/* ── Save / Export / Import ────────────────────────── */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              {!design.name.trim() && (
                <Alert severity="warning" sx={{ mb: 1 }}>Enter a deck name to save.</Alert>
              )}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  disabled={!design.name.trim() || !breakdown}
                >
                  Save to Character
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={handleExport}
                  disabled={!design.name.trim() || !breakdown}
                >
                  Export
                </Button>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadIcon />}
                >
                  Import
                  <input type="file" hidden accept=".json,.srdeck.json" onChange={handleImport} />
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>

      </Grid>

      {/* ── Construction Tasks (full width) ──────────────────────────── */}
      <ConstructionPanel design={design} />

    </Box>
  );
}

// ── Edition-aware wrapper ─────────────────────────────────────────────────────
import MatrixCyberdeckDesigner from './MatrixCyberdeckDesigner';

export default function CyberdeckDesigner({ edition, onSave }) {
  if (edition === 'SR3') {
    return <MatrixCyberdeckDesigner onSave={onSave} />;
  }
  return <VR2CyberdeckDesigner edition={edition} onSave={onSave} />;
}
