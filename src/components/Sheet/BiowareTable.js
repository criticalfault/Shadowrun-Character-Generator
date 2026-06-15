import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SRSection from './SRSection';
import { tablePaperSx } from './sheetTheme';

const BiowareTable = ({ bioware }) => {
  if (!bioware || bioware.length === 0) return null;

  return (
    <Grid item xs={12}>
      <SRSection title="Bioware">
        <TableContainer component={Paper} sx={tablePaperSx}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Bio Index</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bioware.map((item, index) => (
                <TableRow key={item.Name + index}>
                  <TableCell component="th" scope="row">{item.Name}</TableCell>
                  <TableCell align="center">{item.BioIndex ?? '—'}</TableCell>
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

export default BiowareTable;
