import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SRSection from './SRSection';
import { tablePaperSx } from './sheetTheme';

const CyberwareTable = ({ cyberware }) => {
  if (!cyberware || cyberware.length === 0) return null;

  return (
    <Grid item xs={12}>
      <SRSection title="Cyberware">
        <TableContainer component={Paper} sx={tablePaperSx}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Ess</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cyberware.map((item, index) => (
                <TableRow key={item.Name + index}>
                  <TableCell component="th" scope="row">{item.Name}</TableCell>
                  <TableCell align="center">{item.Rating ?? '—'}</TableCell>
                  <TableCell align="center">{item.EssCost ?? '—'}</TableCell>
                  <TableCell>{item.Notes ?? ''}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SRSection>
    </Grid>
  );
};

export default CyberwareTable;
