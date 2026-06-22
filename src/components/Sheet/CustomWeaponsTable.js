import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import SRSection from './SRSection';
import { tablePaperSx } from './sheetTheme';

const DAMAGE_LEVELS = { 1: 'L', 2: 'M', 3: 'S', 4: 'D', 7: 'Stun' };

function exportDesign(design) {
  const blob = new Blob([JSON.stringify({ type: 'sr-custom-weapon', version: 1, design }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${design.weaponName ?? 'custom-weapon'}.srweapon.json`;
  a.click();
  URL.revokeObjectURL(url);
}

const CustomWeaponsTable = ({ customWeapons }) => {
  if (!customWeapons?.length) return null;

  return (
    <Grid size={12}>
      <SRSection title="Custom Weapons">
        <TableContainer component={Paper} sx={tablePaperSx}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Frame</TableCell>
                <TableCell align="center">Power</TableCell>
                <TableCell align="center">Damage</TableCell>
                <TableCell align="center">Mode</TableCell>
                <TableCell align="center">Conceal</TableCell>
                <TableCell align="center">RC</TableCell>
                <TableCell align="center">Ammo</TableCell>
                <TableCell align="center">Weight</TableCell>
                <TableCell align="center">FCU</TableCell>
                <TableCell align="center">Cost (¥)</TableCell>
                <TableCell align="center">Export</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customWeapons.map((w, i) => {
                const s = w.stats ?? {};
                return (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">{w.weaponName}</TableCell>
                    <TableCell align="center">{w.frameKey}</TableCell>
                    <TableCell align="center">{s.power}</TableCell>
                    <TableCell align="center">{DAMAGE_LEVELS[s.damageLevel] ?? s.damageLevel}</TableCell>
                    <TableCell align="center">{Array.isArray(s.mode) ? s.mode.join('/') : s.mode}</TableCell>
                    <TableCell align="center">{s.concealability}</TableCell>
                    <TableCell align="center">{s.rc ?? 0}</TableCell>
                    <TableCell align="center">{s.ammoCap} ({s.ammoLoad})</TableCell>
                    <TableCell align="center">{s.weight} kg</TableCell>
                    <TableCell align="center">{s.fcu}</TableCell>
                    <TableCell align="center">{s.finalCost?.toLocaleString()}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Export this design">
                        <IconButton size="small" onClick={() => exportDesign(w)}>
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {customWeapons.some(w => w.stats?.buildNotes?.length) && (
          <div style={{ padding: '8px 12px', fontSize: '0.8em', color: '#555' }}>
            <strong>Build Notes:</strong>
            {customWeapons.flatMap((w, i) =>
              (w.stats?.buildNotes ?? []).map((n, j) => (
                <div key={`${i}-${j}`} style={{ marginTop: 2 }}>
                  <em>{w.weaponName}</em> — {n.name}: {n.skill} ({n.time}h, TN {n.tn}){n.tools ? `, Tools: ${n.tools}` : ''}
                </div>
              ))
            )}
          </div>
        )}
      </SRSection>
    </Grid>
  );
};

export default CustomWeaponsTable;
