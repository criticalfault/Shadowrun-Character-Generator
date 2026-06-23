import React, { useState, useMemo } from 'react';
import {
  Box, Typography, TextField, Button, Chip, Paper,
  FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Alert, Tooltip, ToggleButton, ToggleButtonGroup, Grid,
  Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  ComponentCosts, calcDeckCost, Casings,
  personaRatingLimit, responseIncreaseMax, ioSpeedMax, roundIoSpeed, realityFilterMax,
  ConstructionTasks
} from '../data/SR3/MatrixCyberdeckDesign';

const MPCP_MAX = 10;

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
        sx={{ width: 100 }}
      />
      {tooltip && (
        <Tooltip title={tooltip} placement="right">
          <InfoOutlinedIcon fontSize="small" sx={{ color: 'text.secondary', cursor: 'help' }} />
        </Tooltip>
      )}
    </Box>
  );
}

function CostBreakdown({ breakdown }) {
  if (!breakdown) return null;
  const { items, total } = breakdown;
  return (
    <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 360 }}>
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
          <TableRow sx={{ bgcolor: 'action.hover' }}>
            <TableCell><strong>Total</strong></TableCell>
            <TableCell align="right"><strong>{fmt(total)}</strong></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function TaskBlock({ task }) {
  if (!task) return <Typography variant="caption" color="text.secondary">None required.</Typography>;
  return (
    <Box>
      {task.time  && <Typography variant="caption" display="block"><strong>Time:</strong> {task.time}</Typography>}
      {task.test  && <Typography variant="caption" display="block"><strong>Test:</strong> {task.test}</Typography>}
      {task.parts?.length > 0 && (
        <Typography variant="caption" display="block"><strong>Parts:</strong> {task.parts.join(', ')}</Typography>
      )}
      {task.tools?.length > 0 && (
        <Typography variant="caption" display="block"><strong>Tools:</strong> {task.tools.join(', ')}</Typography>
      )}
    </Box>
  );
}

function ConstructionPanel({ design }) {
  const keys = [];
  if (design.mpcp > 0)            keys.push('mpcp');
  if (design.bod > 0 || design.evasion > 0 || design.masking > 0 || design.sensor > 0) keys.push('persona');
  if (design.asistType === 'hot')  keys.push('asistHot');
  if (design.asistType === 'cold') keys.push('asistCool');
  if (design.activeMemoryMp > 0)   keys.push('activeMemory');
  if (design.storageMemoryMp > 0)  keys.push('storageMemory');
  if (design.hardening > 0)        keys.push('hardening');
  if (design.iccmFilter)           keys.push('iccmFilter');
  if (design.iconRating > 1)       keys.push('iconChip');
  if (design.ioSpeedMePS > 0)      keys.push('ioSpeed');
  if (design.rasOverride)          keys.push('rasOverride');
  if (design.realityFilter)        keys.push('realityFilter');
  if (design.responseIncrease > 0) keys.push('responseIncrease');
  if (design.matrixInterface)      keys.push('matrixInterface');
  if (design.maserInterface)       keys.push('maserInterface');
  if (design.additionalPorts > 0)  keys.push('ports');

  return (
    <Accordion variant="outlined" sx={{ mt: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle2">Construction Tasks</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ ml: 1, mt: 0.3 }}>
          (build times, tests &amp; parts for DIY construction — Matrix p.54–63)
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 1 }}>
        {keys.length === 0 && (
          <Typography variant="caption" color="text.secondary">Select components to see construction tasks.</Typography>
        )}
        {keys.map((key) => {
          const ct = ConstructionTasks[key];
          if (!ct) return null;
          return (
            <Box key={key} sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>
                {ct.label}
              </Typography>
              {ct.design && (
                <Typography variant="caption" display="block" color="text.secondary">
                  <em>Design:</em> Modifier {ct.design.modifier}
                </Typography>
              )}
              {ct.software && (
                <Typography variant="caption" display="block" color="text.secondary">
                  <em>Software:</em> Rating {ct.software.ratingBasis}, Multiplier {ct.software.multiplier}
                </Typography>
              )}
              {ct.cook?.required && (
                <Typography variant="caption" display="block" color="text.secondary">
                  <em>Cook Task:</em> Required
                </Typography>
              )}
              <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.25 }}>
                <em>Installation Task:</em>
              </Typography>
              <TaskBlock task={ct.install} />
            </Box>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
}

const defaultDesign = {
  name: '',
  mpcp: 4,
  bod: 0, evasion: 0, masking: 0, sensor: 0,
  asistType: 'hot',
  activeMemoryMp: 200,
  storageMemoryMp: 200,
  hardening: 0,
  iccmFilter: false,
  iconRating: 1,
  ioSpeedMePS: 100,
  rasOverride: false,
  realityFilter: false,
  responseIncrease: 0,
  matrixInterface: true,
  maserInterface: false,
  additionalPorts: 0,
  casing: 1,
  hitcherJacks: 0,
  displayScreen: false,
  vrKit: false,
  keyboard: false,
};

export default function MatrixCyberdeckDesigner({ onSave }) {
  const [design, setDesign] = useState(defaultDesign);
  const set = (key, val) => setDesign(d => ({ ...d, [key]: val }));

  const breakdown = useMemo(() => {
    if (!design.mpcp) return null;
    return calcDeckCost(design);
  }, [design]);

  const programMax      = design.mpcp;
  const personaTotal    = design.bod + design.evasion + design.masking + design.sensor;
  const personaLimit    = personaRatingLimit(design.mpcp);
  const personaOver     = personaTotal > personaLimit;
  const riMax           = responseIncreaseMax(design.mpcp);
  const ioMax           = ioSpeedMax(design.mpcp);
  const rfMax           = realityFilterMax(design.mpcp);

  function handleSave() {
    if (!design.name.trim()) return;
    const saved = {
      edition: 'SR3-Matrix',
      source: 'Matrix',
      ...design,
      breakdown,
      estimatedCost: breakdown?.total ?? 0,
    };
    onSave(saved);
    setDesign(defaultDesign);
  }

  function handleExport() {
    if (!breakdown) return;
    const saved = { edition: 'SR3-Matrix', source: 'Matrix', ...design, breakdown, estimatedCost: breakdown.total };
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
        <Chip label="SR3 Matrix Rules" size="small" variant="outlined" sx={{ ml: 1, fontSize: '0.7rem' }} color="primary" />
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Custom cyberdeck construction using <em>Matrix</em> (SR3) rules.
        Costs shown are parts costs for self-construction (pp. 54–63).
        Memory and I/O Speed use retail purchase prices (mat.170).
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>

        {/* ── Left column ───────────────────────────────────────────── */}
        <Grid item xs={12} md={7}>

          {/* Name */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <TextField
              label="Deck Name"
              fullWidth size="small"
              value={design.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. Fuchi Cyber-6, Custom Shadowdancer…"
            />
          </Paper>

          {/* ── MPCP ──────────────────────────────────────────────────── */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>MPCP</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <RatingInput
                label="MPCP Rating"
                value={design.mpcp}
                min={1} max={MPCP_MAX}
                onChange={(v) => setDesign(d => ({
                  ...d,
                  mpcp: v,
                  bod:     Math.min(d.bod, v),
                  evasion: Math.min(d.evasion, v),
                  masking: Math.min(d.masking, v),
                  sensor:  Math.min(d.sensor, v),
                  hardening: Math.min(d.hardening, v),
                  iconRating: Math.min(d.iconRating, v),
                  responseIncrease: Math.min(d.responseIncrease, responseIncreaseMax(v)),
                  ioSpeedMePS: Math.min(d.ioSpeedMePS, ioSpeedMax(v)),
                }))}
                tooltip="Design TN = MPCP rating. Drives ASIST, ICCM, RAS, Reality Filter costs."
              />
              {design.mpcp > 0 && (
                <Chip size="small" color="primary"
                  label={`MPCP cost: ${fmt(ComponentCosts.mpcp(design.mpcp))}`} />
              )}
            </Box>
            <Typography variant="caption" color="text.secondary">
              Formula: 35¥ × MPCP² &nbsp;|&nbsp; Comes with Rating-1 icon chip and {design.mpcp} FUP ports.
            </Typography>
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
                { key: 'bod',     label: 'Bod'     },
                { key: 'evasion', label: 'Evasion' },
                { key: 'masking', label: 'Masking' },
                { key: 'sensor',  label: 'Sensor'  },
              ].map(({ key, label }) => {
                const rating = design[key];
                const cost = rating > 0 ? ComponentCosts.persona(rating) : 0;
                return (
                  <Box key={key} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <RatingInput
                      label={label} value={rating}
                      min={0} max={programMax}
                      onChange={(v) => set(key, v)}
                    />
                    {rating > 0 && <Chip size="small" label={fmt(cost)} />}
                  </Box>
                );
              })}
            </Box>
            {personaOver
              ? <Alert severity="error" sx={{ mt: 1 }}>
                  Combined persona ratings ({personaTotal}) exceed MPCP×3 limit ({personaLimit}). Reduce one or more programs.
                </Alert>
              : <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Combined: {personaTotal} / {personaLimit} (MPCP×3 limit) &nbsp;|&nbsp; 35¥ × Rating² each
                </Typography>
            }
          </Paper>

          {/* ── ASIST ────────────────────────────────────────────────── */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>ASIST Interface</Typography>
            <ToggleButtonGroup
              value={design.asistType} exclusive size="small"
              onChange={(_, v) => { if (v) set('asistType', v); }}
            >
              <ToggleButton value="none">None (Tortoise)</ToggleButton>
              <ToggleButton value="hot">Hot Deck</ToggleButton>
              <ToggleButton value="cold">Cold Deck</ToggleButton>
            </ToggleButtonGroup>
            {design.asistType !== 'none' && design.mpcp > 0 && (
              <Box sx={{ mt: 1 }}>
                <Chip size="small" color="primary"
                  label={`Cost: ${fmt(design.asistType === 'hot'
                    ? ComponentCosts.asistHot(design.mpcp)
                    : ComponentCosts.asistCool(design.mpcp))}`}
                />
              </Box>
            )}
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              Hot: 25¥ × MPCP² + 1,250¥ &nbsp;|&nbsp; Cold: 25¥ × MPCP + 1,250¥ (incl. ASIST Processor Unit)
            </Typography>
          </Paper>

          {/* ── Memory & I/O ─────────────────────────────────────────── */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Memory &amp; I/O Speed</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <RatingInput
                  label="Active Memory (Mp)" value={design.activeMemoryMp}
                  min={0} max={9999}
                  onChange={(v) => set('activeMemoryMp', v)}
                  tooltip="Retail: 7.5¥/Mp (mat.170)"
                />
                {design.activeMemoryMp > 0 && <Chip size="small" label={fmt(ComponentCosts.activeMemory(design.activeMemoryMp))} sx={{ mt: 0.5 }} />}
              </Box>
              <Box>
                <RatingInput
                  label="Storage Memory (Mp)" value={design.storageMemoryMp}
                  min={0} max={99999}
                  onChange={(v) => set('storageMemoryMp', v)}
                  tooltip="Retail: 6¥/Mp (mat.170)"
                />
                {design.storageMemoryMp > 0 && <Chip size="small" label={fmt(ComponentCosts.storageMemory(design.storageMemoryMp))} sx={{ mt: 0.5 }} />}
              </Box>
              <Box>
                <RatingInput
                  label="I/O Speed (MePS)" value={design.ioSpeedMePS}
                  min={0} max={ioMax}
                  onChange={(v) => set('ioSpeedMePS', roundIoSpeed(v))}
                  tooltip={`Multiples of 10. Max = MPCP × 100 = ${ioMax} MePS. Retail: 35¥/MePS.`}
                />
                {design.ioSpeedMePS > 0 && (
                  <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                    <Chip size="small" label={fmt(ComponentCosts.ioSpeedRetail(design.ioSpeedMePS))} />
                    {design.ioSpeedMePS > ioMax && <Chip size="small" color="error" label={`Over max (${ioMax} MePS)`} />}
                  </Box>
                )}
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Active: 7.5¥/Mp retail &nbsp;|&nbsp; Storage: 6¥/Mp retail &nbsp;|&nbsp; I/O: 35¥/MePS (max {ioMax} MePS)
            </Typography>
          </Paper>

          {/* ── Hardening & Enhancements ──────────────────────────────── */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Hardening &amp; Enhancements</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <RatingInput
                  label="Hardening" value={design.hardening}
                  min={0} max={programMax}
                  onChange={(v) => set('hardening', v)}
                  tooltip="35¥ × Hardening²"
                />
                {design.hardening > 0 && <Chip size="small" label={fmt(ComponentCosts.hardening(design.hardening))} sx={{ mt: 0.5 }} />}
              </Box>
              <Box>
                <RatingInput
                  label="Response Increase" value={design.responseIncrease}
                  min={0} max={riMax}
                  onChange={(v) => set('responseIncrease', Math.min(v, riMax))}
                  tooltip={`Max = floor(MPCP÷4) = ${riMax} for MPCP ${design.mpcp}. Hard cap 3. Formula: 135¥ × RI.`}
                />
                {design.responseIncrease > 0 && <Chip size="small" label={fmt(ComponentCosts.responseIncrease(design.responseIncrease))} sx={{ mt: 0.5 }} />}
                <Typography variant="caption" color="text.secondary" display="block">
                  Max {riMax} for MPCP {design.mpcp}
                </Typography>
              </Box>
              <Box>
                <RatingInput
                  label="Icon Chip Rating" value={design.iconRating}
                  min={1} max={programMax}
                  onChange={(v) => set('iconRating', v)}
                  tooltip="Rating 1 included free with MPCP. Higher ratings: 35¥ × Rating²"
                />
                {design.iconRating > 1 && (
                  <>
                    <Chip size="small" label={fmt(ComponentCosts.iconChip(design.iconRating))} sx={{ mt: 0.5 }} />
                    <Typography variant="caption" color="text.secondary" display="block">
                      Rating 1 free; this is the upgrade cost
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Paper>

          {/* ── Optional System Components ────────────────────────────── */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>System Components</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <FormControlLabel
                  control={<Checkbox checked={design.iccmFilter} onChange={(e) => set('iccmFilter', e.target.checked)} />}
                  label="ICCM Biofeedback Filter"
                />
                {design.iccmFilter && design.mpcp > 0 && (
                  <Chip size="small" label={fmt(ComponentCosts.iccmFilter(design.mpcp))} />
                )}
                <Typography variant="caption" color="text.secondary" display="block">
                  35¥ × MPCP + 1,000¥ (bio-monitor). Needs Biotech.
                </Typography>
              </Box>
              <Box>
                <FormControlLabel
                  control={<Checkbox checked={design.rasOverride} onChange={(e) => set('rasOverride', e.target.checked)} />}
                  label="RAS Override"
                />
                {design.rasOverride && design.mpcp > 0 && (
                  <Chip size="small" label={fmt(ComponentCosts.rasOverride(design.mpcp))} />
                )}
                <Typography variant="caption" color="text.secondary" display="block">
                  1,000¥ unit + 35¥ × MPCP (connections)
                </Typography>
              </Box>
              <Box>
                <FormControlLabel
                  control={<Checkbox checked={design.realityFilter} onChange={(e) => set('realityFilter', e.target.checked)} />}
                  label={`Reality Filter (max ${rfMax})`}
                />
                {design.realityFilter && design.mpcp > 0 && (
                  <Chip size="small" label={fmt(ComponentCosts.realityFilter(design.mpcp))} />
                )}
                <Typography variant="caption" color="text.secondary" display="block">
                  70¥ × MPCP. Needs Computer (Cybernetics) + Biotech kit.
                </Typography>
              </Box>
              <Box>
                <FormControlLabel
                  control={<Checkbox checked={design.matrixInterface} onChange={(e) => set('matrixInterface', e.target.checked)} />}
                  label="Matrix Interface (5m cable)"
                />
                {design.matrixInterface && <Chip size="small" label={fmt(ComponentCosts.matrixInterface())} />}
              </Box>
              <Box>
                <FormControlLabel
                  control={<Checkbox checked={design.maserInterface} onChange={(e) => set('maserInterface', e.target.checked)} />}
                  label="Maser Interface"
                />
                {design.maserInterface && <Chip size="small" label={fmt(ComponentCosts.maserInterface())} />}
              </Box>
            </Box>
          </Paper>

          {/* ── Hardware / Peripherals ────────────────────────────────── */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Hardware &amp; Peripherals</Typography>
            <FormControl size="small" sx={{ minWidth: 240, mb: 2 }}>
              <InputLabel>Casing</InputLabel>
              <Select value={design.casing} label="Casing"
                onChange={(e) => set('casing', e.target.value)}>
                {Casings.map((c, i) => (
                  <MenuItem key={i} value={i}>
                    {c.name} {c.cost != null ? `— ${fmt(c.cost)}` : `— ${c.costNote}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <RatingInput
                  label="Additional Ports (FUPs)" value={design.additionalPorts}
                  min={0} max={design.mpcp}
                  onChange={(v) => set('additionalPorts', v)}
                  tooltip={`MPCP comes with ${design.mpcp} ports free; can add up to ${design.mpcp} more. 235¥ each.`}
                />
                {design.additionalPorts > 0 && <Chip size="small" label={fmt(ComponentCosts.ports(design.additionalPorts))} sx={{ mt: 0.5 }} />}
              </Box>
              <Box>
                <RatingInput
                  label="Hitcher Jacks" value={design.hitcherJacks}
                  min={0} max={10}
                  onChange={(v) => set('hitcherJacks', v)}
                  tooltip="250¥ each"
                />
                {design.hitcherJacks > 0 && <Chip size="small" label={fmt(250 * design.hitcherJacks)} sx={{ mt: 0.5 }} />}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
              <FormControlLabel control={<Checkbox checked={design.displayScreen} onChange={(e) => set('displayScreen', e.target.checked)} />} label="Display Screen (100¥)" />
              <FormControlLabel control={<Checkbox checked={design.vrKit} onChange={(e) => set('vrKit', e.target.checked)} />} label="VR Kit (250¥)" />
              <FormControlLabel control={<Checkbox checked={design.keyboard} onChange={(e) => set('keyboard', e.target.checked)} />} label="Keyboard (50¥)" />
            </Box>
          </Paper>

        </Grid>

        {/* ── Right column: cost breakdown + save ──────────────────────── */}
        <Grid item xs={12} md={5}>
          <Box sx={{ position: 'sticky', top: 80 }}>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>Cost Breakdown</Typography>
              {breakdown
                ? <>
                    <CostBreakdown breakdown={breakdown} />
                    <Typography variant="h6" color="primary" sx={{ mt: 1 }}>{fmt(breakdown.total)}</Typography>
                  </>
                : <Alert severity="info">Set MPCP to see costs.</Alert>
              }
            </Paper>

            {design.mpcp > 0 && (
              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Deck Stats Summary</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip size="small" label={`MPCP ${design.mpcp}`} color="primary" />
                  {design.bod > 0         && <Chip size="small" label={`Bod ${design.bod}`} />}
                  {design.evasion > 0     && <Chip size="small" label={`Evasion ${design.evasion}`} />}
                  {design.masking > 0     && <Chip size="small" label={`Masking ${design.masking}`} />}
                  {design.sensor > 0      && <Chip size="small" label={`Sensor ${design.sensor}`} />}
                  {design.asistType !== 'none' && <Chip size="small" label={`ASIST ${design.asistType === 'hot' ? 'Hot' : 'Cold'}`} color="secondary" />}
                  {design.activeMemoryMp > 0  && <Chip size="small" label={`Active ${design.activeMemoryMp} Mp`} />}
                  {design.storageMemoryMp > 0 && <Chip size="small" label={`Storage ${design.storageMemoryMp} Mp`} />}
                  {design.ioSpeedMePS > 0     && <Chip size="small" label={`I/O ${design.ioSpeedMePS} MePS`} />}
                  {design.hardening > 0        && <Chip size="small" label={`Hardening ${design.hardening}`} />}
                  {design.responseIncrease > 0 && <Chip size="small" label={`Response +${design.responseIncrease}`} />}
                  {design.iconRating > 1       && <Chip size="small" label={`Icon ${design.iconRating}`} />}
                  {design.iccmFilter    && <Chip size="small" label="ICCM" color="warning" />}
                  {design.rasOverride   && <Chip size="small" label="RAS Override" />}
                  {design.realityFilter && <Chip size="small" label="Reality Filter" />}
                  {design.maserInterface && <Chip size="small" label="Maser" />}
                  {design.additionalPorts > 0 && <Chip size="small" label={`+${design.additionalPorts} FUPs`} />}
                </Box>
              </Paper>
            )}

            <Paper variant="outlined" sx={{ p: 2 }}>
              {!design.name.trim() && (
                <Alert severity="warning" sx={{ mb: 1 }}>Enter a deck name to save.</Alert>
              )}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button variant="contained" startIcon={<SaveIcon />}
                  onClick={handleSave} disabled={!design.name.trim() || !breakdown}>
                  Save to Character
                </Button>
                <Button variant="outlined" startIcon={<DownloadIcon />}
                  onClick={handleExport} disabled={!design.name.trim() || !breakdown}>
                  Export
                </Button>
                <Button variant="outlined" component="label" startIcon={<UploadIcon />}>
                  Import
                  <input type="file" hidden accept=".json,.srdeck.json" onChange={handleImport} />
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>

      </Grid>

      <ConstructionPanel design={design} />
    </Box>
  );
}
