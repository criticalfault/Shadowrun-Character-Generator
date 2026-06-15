import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SRSection from './SRSection';
import { tablePaperSx } from './sheetTheme';

const CyberwareTable = ({ cyberware }) => {
  if (!cyberware || cyberware.length === 0) return null;

  return (
    <Grid size={12}>
      <SRSection title="Cyberware">
        <TableContainer component={Paper} sx={tablePaperSx}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Ess</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cyberware.map((item, index) => (
                <TableRow key={item.Name + index}>
                  <TableCell component="th" scope="row">{item.Name}</TableCell>
                  <TableCell align="center">{item.EssCost != null ? parseFloat(item.EssCost).toFixed(2) : '—'}</TableCell>
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
