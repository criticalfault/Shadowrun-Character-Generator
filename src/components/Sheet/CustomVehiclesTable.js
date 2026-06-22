import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Chip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import SRSection from './SRSection';
import { tablePaperSx } from './sheetTheme';

function exportDesign(design) {
  const blob = new Blob([JSON.stringify({ type: 'sr-custom-vehicle', version: 1, design }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${design.name ?? 'custom-vehicle'}.srvehicle.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function fmt(v) {
  return v != null && v !== '' ? v : '—';
}

// Normalize SR2 and SR3 designs to a common display shape
function normalize(v) {
  if (v.edition === 'SR3') {
    const ch = v.chassis ?? {};
    const pp = v.powerPlant ?? {};
    const mods = v.chosenMods ?? [];
    return {
      edition: 'SR3',
      name: v.name,
      chassisName: ch.name,
      engineName: pp.name ? `${pp.name} (${pp.fuelType ?? ''})`.trim() : fmt(pp.fuelType),
      body: ch.body,
      handling: ch.handling,
      speed: pp.speed ?? ch.speed,
      accel: pp.accel ?? ch.accel,
      cf: ch.cf,
      armor: ch.armor ?? ch.armour ?? 0,
      sig: ch.sig,
      modCount: mods.reduce((n, m) => n + (m.qty ?? 1), 0),
      modList: mods.map(m => `${m.name}${(m.qty ?? 1) > 1 ? ` ×${m.qty}` : ''}`),
      dpValue: v.totalDpValue,
      cost: v.estimatedCost != null ? `¥${v.estimatedCost.toLocaleString()}` : null,
    };
  }

  // SR2
  const s = v.finalStats ?? {};
  const mods = v.mods ?? [];
  return {
    edition: 'SR2',
    name: v.name,
    chassisName: v.chassis?.name,
    engineName: v.engine?.name,
    body: s.body ?? v.chassis?.body,
    handling: s.handling,
    speed: s.speed,
    accel: s.accel,
    cf: s.cf,
    armor: s.armour ?? v.chassis?.armour ?? 0,
    sig: s.sig,
    modCount: mods.length,
    modList: mods.map(m => `${m.mod?.name ?? m.name}${(m.level ?? 1) > 1 ? ` (${m.level})` : ''}`),
    dpValue: null,
    cost: null,
  };
}

const CustomVehiclesTable = ({ customVehicles }) => {
  if (!customVehicles?.length) return null;

  const rows = customVehicles.map(normalize);

  return (
    <Grid size={12}>
      <SRSection title="Custom Vehicles &amp; Drones">
        <TableContainer component={Paper} sx={tablePaperSx}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Ed.</TableCell>
                <TableCell align="center">Chassis</TableCell>
                <TableCell align="center">Power Plant</TableCell>
                <TableCell align="center">Body</TableCell>
                <TableCell align="center">Handling</TableCell>
                <TableCell align="center">Speed</TableCell>
                <TableCell align="center">Accel</TableCell>
                <TableCell align="center">CF</TableCell>
                <TableCell align="center">Armor</TableCell>
                <TableCell align="center">Sig</TableCell>
                <TableCell align="center">Mods</TableCell>
                <TableCell align="center">DP / Cost</TableCell>
                <TableCell align="center">Export</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">{r.name}</TableCell>
                  <TableCell align="center">
                    <Chip label={r.edition} size="small" variant="outlined"
                      color={r.edition === 'SR3' ? 'primary' : 'default'} />
                  </TableCell>
                  <TableCell align="center">{fmt(r.chassisName)}</TableCell>
                  <TableCell align="center">{fmt(r.engineName)}</TableCell>
                  <TableCell align="center">{fmt(r.body)}</TableCell>
                  <TableCell align="center">{fmt(r.handling)}</TableCell>
                  <TableCell align="center">{fmt(r.speed)}</TableCell>
                  <TableCell align="center">{fmt(r.accel)}</TableCell>
                  <TableCell align="center">{fmt(r.cf)}</TableCell>
                  <TableCell align="center">{fmt(r.armor)}</TableCell>
                  <TableCell align="center">{fmt(r.sig)}</TableCell>
                  <TableCell align="center">{r.modCount}</TableCell>
                  <TableCell align="center">
                    {r.dpValue != null ? `${r.dpValue} DP` : '—'}
                    {r.cost && <><br /><small>{r.cost}</small></>}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Export this design">
                      <IconButton size="small" onClick={() => exportDesign(customVehicles[i])}>
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {rows.some(r => r.modCount > 0) && (
          <div style={{ padding: '8px 12px', fontSize: '0.8em', color: '#555' }}>
            <strong>Modifications:</strong>
            {rows.map((r, i) =>
              r.modList.length ? (
                <div key={i} style={{ marginTop: 2 }}>
                  <em>{r.name}</em>: {r.modList.join(', ')}
                </div>
              ) : null
            )}
          </div>
        )}
      </SRSection>
    </Grid>
  );
};

export default CustomVehiclesTable;
