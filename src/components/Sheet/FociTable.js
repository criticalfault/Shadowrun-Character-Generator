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

const FociTable = ({ foci }) => {
  if (!foci || foci.length === 0) return null;

  const formatNuyen = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Grid item xs={12}>
      <SRSection title="Foci">
        <TableContainer component={Paper} sx={{ backgroundColor: '#1f1f1f' }}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">¥ Cost</TableCell>
                <TableCell align="right">Karma</TableCell>
                <TableCell align="right">Bound</TableCell>
                <TableCell align="right">Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foci.map((item, index) => (
                <TableRow key={item.Name + index}>
                  <TableCell style={{ color: '#00ffc3' }}>
                    {item.Name}
                    {item.Extra ? ` (${item.Extra})` : ''}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {item.Rating}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {formatNuyen(item.Cost)}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {item.KarmaCost}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {item.Bound}
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

export default FociTable;