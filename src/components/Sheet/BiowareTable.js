import React from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import SRSection from './SRSection';

const BiowareTable = ({ bioware }) => {
  if (!bioware || bioware.length === 0) return null;

  return (
    <Grid item xs={12}>
      <SRSection title="Bioware">
        <TableContainer component={Paper} sx={{ backgroundColor: '#1f1f1f' }}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">BioIndex</TableCell>
                <TableCell align="right">Book.Page</TableCell>
                <TableCell align="right">Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bioware.map((item, index) => (
                <TableRow key={item.Name + index}>
                  <TableCell component="th" scope="row" style={{ color: '#00ffc3' }}>
                    {item.Name}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {item.BioIndex ?? '—'}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {item.BookPage ?? '—'}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {item.Notes ?? ''}
                  </TableCell>
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