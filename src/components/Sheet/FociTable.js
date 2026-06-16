import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SRSection from './SRSection';
import { tablePaperSx } from './sheetTheme';

const FociTable = ({ foci }) => {
  if (!foci || foci.length === 0) return null;

  const fmtNuyen = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'JPY', maximumFractionDigits: 0 }).format(n);

  return (
    <Grid size={12}>
      <SRSection title="Foci">
        <TableContainer component={Paper} sx={tablePaperSx}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="right">Cost</TableCell>
                <TableCell align="center">Karma</TableCell>
                <TableCell align="center">Bound</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foci.map((item, index) => (
                <TableRow key={item.Name + index}>
                  <TableCell component="th" scope="row">
                    {item.Name}{item.Extra ? ` (${item.Extra})` : ''}
                  </TableCell>
                  <TableCell align="center">{item.Rating}</TableCell>
                  <TableCell align="right">{fmtNuyen(item.Cost)}</TableCell>
                  <TableCell align="center">{item.KarmaCost}</TableCell>
                  <TableCell align="center">{item.Bound}</TableCell>
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

export default FociTable;
