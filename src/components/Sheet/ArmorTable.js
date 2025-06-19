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

const ArmorTable = ({ gear }) => {
  if (!gear || gear.length === 0) return null;

  // Filter only armor (has Ballistic property)
  const armorItems = gear.filter((item) => item.Ballistic !== undefined);

  if (armorItems.length === 0) return null;

  return (
    <Grid item xs={12}>
      <SRSection title="Armor">
        <TableContainer component={Paper} sx={{ backgroundColor: '#1f1f1f' }}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Ballistic</TableCell>
                <TableCell align="right">Impact</TableCell>
                <TableCell align="right">Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {armorItems.map((item, index) => (
                <TableRow key={item.Name + index}>
                  <TableCell component="th" scope="row" style={{ color: '#00ffc3' }}>
                    {item.Name}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {item.Ballistic}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {item.Impact}
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

export default ArmorTable;