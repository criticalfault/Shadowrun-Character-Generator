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

// This should be passed in or imported, depending on your project structure
import Ranges from '../../data/ranges.json';

const getRangesFromName = (name) => {
  const rangeKeys = Object.keys(Ranges);
  for (let i = 0; i < rangeKeys.length; i++) {
    if (name.includes(rangeKeys[i])) {
      return Ranges[rangeKeys[i]];
    }
  }
  return {
    short: 'N/A',
    medium: 'N/A',
    long: 'N/A',
    extreme: 'N/A',
  };
};

const WeaponsTable = ({ gear }) => {
  if (!gear || gear.length === 0) return null;

  const weapons = gear.filter((item) => item.Damage);

  if (weapons.length === 0) return null;

  return (
    <Grid item xs={12}>
      <SRSection title="Weapons">
        <TableContainer component={Paper} sx={{ backgroundColor: '#1f1f1f' }}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Damage</TableCell>
                <TableCell align="right">Ammo</TableCell>
                <TableCell align="right">Short</TableCell>
                <TableCell align="right">Medium</TableCell>
                <TableCell align="right">Long</TableCell>
                <TableCell align="right">Extreme</TableCell>
                <TableCell align="right">Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {weapons.map((item, index) => {
                const range = getRangesFromName(item.Name);

                return (
                  <TableRow key={item.Name + index}>
                    <TableCell style={{ color: '#00ffc3' }}>
                      {item.Name}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {item.Damage}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {item.Ammunition ?? 'N/A'}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {range.short}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {range.medium}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {range.long}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {range.extreme}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {item.Notes ?? ''}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </SRSection>
    </Grid>
  );
};

export default WeaponsTable;