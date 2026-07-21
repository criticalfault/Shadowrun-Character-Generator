import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SRSection from './SRSection';
import { tablePaperSx } from './sheetTheme';

const PhysicalAdeptPowers = ({ powers }) => {
  if (!powers || powers.length === 0) return null;

  return (
    <Grid size={12}>
      <SRSection title="Physical Adept Powers">
        <TableContainer component={Paper} sx={tablePaperSx}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Power Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {powers.map((power, index) => (
                <TableRow key={power.Name + index}>
                  <TableCell component="th" scope="row">
                    {power.LinkedSkill
                      ? `${power.Name.replace('*->', '')} [${power.LinkedSkill}]`
                      : power.Name}
                  </TableCell>
                  <TableCell align="center">{power.HasLevels ? power.Rating : '—'}</TableCell>
                  <TableCell align="center">{power.PowerCost ?? '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SRSection>
    </Grid>
  );
};

export default PhysicalAdeptPowers;
