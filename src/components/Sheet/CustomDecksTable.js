import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Chip, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import SRSection from './SRSection';
import { tablePaperSx } from './sheetTheme';

function exportDesign(design) {
  const blob = new Blob([JSON.stringify({ type: 'sr-custom-deck', version: 1, design }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${design.name ?? 'custom-deck'}.srdeck.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function fmt(v) {
  return v != null && v !== '' ? v : '—';
}

const CustomDecksTable = ({ customDecks }) => {
  if (!customDecks?.length) return null;

  return (
    <Grid size={12}>
      <SRSection title="Custom Cyberdecks">
        <TableContainer component={Paper} sx={tablePaperSx}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Source</TableCell>
                <TableCell align="center">MPCP</TableCell>
                <TableCell align="center">Bod</TableCell>
                <TableCell align="center">Evasion</TableCell>
                <TableCell align="center">Masking</TableCell>
                <TableCell align="center">Sensor</TableCell>
                <TableCell align="center">ASIST</TableCell>
                <TableCell align="center">Active Mem</TableCell>
                <TableCell align="center">Storage</TableCell>
                <TableCell align="center">I/O</TableCell>
                <TableCell align="center">Hardening</TableCell>
                <TableCell align="center">Cost</TableCell>
                <TableCell align="center">Export</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customDecks.map((d, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">{d.name}</TableCell>
                  <TableCell align="center">
                    <Chip label={d.source ?? d.edition ?? 'VR2'} size="small" variant="outlined" color="primary" />
                  </TableCell>
                  <TableCell align="center">{fmt(d.mpcp)}</TableCell>
                  <TableCell align="center">{d.bod > 0 ? d.bod : '—'}</TableCell>
                  <TableCell align="center">{d.evasion > 0 ? d.evasion : '—'}</TableCell>
                  <TableCell align="center">{d.masking > 0 ? d.masking : '—'}</TableCell>
                  <TableCell align="center">{d.sensor > 0 ? d.sensor : '—'}</TableCell>
                  <TableCell align="center">
                    {d.asistType === 'hot' ? 'Hot' : d.asistType === 'cool' ? 'Cool' : '—'}
                  </TableCell>
                  <TableCell align="center">{d.activeMemoryMp > 0 ? `${d.activeMemoryMp} Mp` : '—'}</TableCell>
                  <TableCell align="center">{d.storageMemoryMp > 0 ? `${d.storageMemoryMp} Mp` : '—'}</TableCell>
                  <TableCell align="center">{d.ioSpeedMePS > 0 ? `${d.ioSpeedMePS} MePS` : '—'}</TableCell>
                  <TableCell align="center">{d.hardening > 0 ? d.hardening : '—'}</TableCell>
                  <TableCell align="center">
                    {d.estimatedCost != null ? `¥${Math.round(d.estimatedCost).toLocaleString()}` : '—'}
                    {d.breakdown?.discount > 0 && (
                      <><br /><small style={{ color: 'green' }}>−¥{d.breakdown.discount.toLocaleString()} pkg</small></>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Export this design">
                      <IconButton size="small" onClick={() => exportDesign(d)}>
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {customDecks.some(d => d.iccmFilter || d.satlinkInterface || d.responseIncrease > 0 || d.hitckerJacks > 0 || d.vidscreen || d.offlineStorageMp > 0) && (
          <div style={{ padding: '8px 12px', fontSize: '0.8em', color: '#555' }}>
            <strong>Optional Components:</strong>
            {customDecks.map((d, i) => {
              const extras = [];
              if (d.iccmFilter)           extras.push('ICCM Biofeedback Filter');
              if (d.satlinkInterface)     extras.push('Satlink Interface');
              if (d.responseIncrease > 0) extras.push(`Response Increase ${d.responseIncrease}`);
              if (d.hitckerJacks > 0)     extras.push(`×${d.hitckerJacks} Hitcher Jack`);
              if (d.offlineStorageMp > 0) extras.push(`Offline Storage ${d.offlineStorageMp} Mp`);
              if (d.vidscreen)            extras.push('Vidscreen');
              if (!extras.length) return null;
              return (
                <div key={i} style={{ marginTop: 2 }}>
                  <em>{d.name}</em>: {extras.join(', ')}
                </div>
              );
            })}
          </div>
        )}
      </SRSection>
    </Grid>
  );
};

export default CustomDecksTable;
