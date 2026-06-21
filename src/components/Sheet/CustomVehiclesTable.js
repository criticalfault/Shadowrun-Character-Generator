import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
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

const CustomVehiclesTable = ({ customVehicles }) => {
  if (!customVehicles?.length) return null;

  return (
    <Grid size={12}>
      <SRSection title="Custom Vehicles">
        <TableContainer component={Paper} sx={tablePaperSx}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Chassis</TableCell>
                <TableCell align="center">Engine</TableCell>
                <TableCell align="center">Body</TableCell>
                <TableCell align="center">Handling</TableCell>
                <TableCell align="center">Speed</TableCell>
                <TableCell align="center">Accel</TableCell>
                <TableCell align="center">CF</TableCell>
                <TableCell align="center">Armor</TableCell>
                <TableCell align="center">Sig</TableCell>
                <TableCell align="center">Mods</TableCell>
                <TableCell align="center">Export</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customVehicles.map((v, i) => {
                const s = v.finalStats ?? {};
                return (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">{v.name}</TableCell>
                    <TableCell align="center">{v.chassis?.name}</TableCell>
                    <TableCell align="center">{v.engine?.name}</TableCell>
                    <TableCell align="center">{s.body ?? v.chassis?.body}</TableCell>
                    <TableCell align="center">{s.handling}</TableCell>
                    <TableCell align="center">{s.speed}</TableCell>
                    <TableCell align="center">{s.accel}</TableCell>
                    <TableCell align="center">{s.cf}</TableCell>
                    <TableCell align="center">{s.armour ?? v.chassis?.armour ?? 0}</TableCell>
                    <TableCell align="center">{s.sig}</TableCell>
                    <TableCell align="center">{v.mods?.length ?? 0}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Export this design">
                        <IconButton size="small" onClick={() => exportDesign(v)}>
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
        {customVehicles.some(v => v.mods?.length) && (
          <div style={{ padding: '8px 12px', fontSize: '0.8em', color: '#555' }}>
            <strong>Modifications:</strong>
            {customVehicles.map((v, i) =>
              v.mods?.length ? (
                <div key={i} style={{ marginTop: 2 }}>
                  <em>{v.name}</em>: {v.mods.map(m => `${m.mod.name}${m.level > 1 ? ` (${m.level})` : ''}`).join(', ')}
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
