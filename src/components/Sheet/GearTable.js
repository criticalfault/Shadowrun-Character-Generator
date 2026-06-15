import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SRSection from './SRSection';
import { tablePaperSx } from './sheetTheme';

const GearTable = ({ gear }) => {
  if (!gear || gear.length === 0) return null;
  const nonWeaponGear = gear.filter((item) => !item.Damage && !item.Ballistic);
  if (nonWeaponGear.length === 0) return null;

  return (
    <Grid item xs={12}>
      <SRSection title="Gear">
        <TableContainer component={Paper} sx={tablePaperSx}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nonWeaponGear.map((item, index) => (
                <TableRow key={item.Name + index}>
                  <TableCell component="th" scope="row">
                    {item.Name}{item.Amount && item.Amount > 1 ? ` ×${item.Amount}` : ''}
                  </TableCell>
                  <TableCell align="center">{item.Rating ?? '—'}</TableCell>
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

export default GearTable;
