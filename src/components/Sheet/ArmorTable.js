import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SRSection from './SRSection';
import { tablePaperSx } from './sheetTheme';

const ArmorTable = ({ gear }) => {
  if (!gear || gear.length === 0) return null;
  const armorItems = gear.filter((item) => item.Ballistic !== undefined);
  if (armorItems.length === 0) return null;

  return (
    <Grid item xs={12}>
      <SRSection title="Armor">
        <TableContainer component={Paper} sx={tablePaperSx}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Ballistic</TableCell>
                <TableCell align="center">Impact</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {armorItems.map((item, index) => (
                <TableRow key={item.Name + index}>
                  <TableCell component="th" scope="row">{item.Name}</TableCell>
                  <TableCell align="center">{item.Ballistic}</TableCell>
                  <TableCell align="center">{item.Impact}</TableCell>
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

export default ArmorTable;
