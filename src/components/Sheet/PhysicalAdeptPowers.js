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

const PhysicalAdeptPowers = ({ powers }) => {
  if (!powers || powers.length === 0) return null;

  return (
    <Grid item xs={12}>
      <SRSection title="Physical Adept Powers">
        <TableContainer component={Paper} sx={{ backgroundColor: '#1f1f1f' }}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {powers.map((power, index) => (
                <TableRow key={power.Name + index}>
                  <TableCell style={{ color: '#00ffc3' }}>
                    {power.Name}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {power.HasLevels ? power.Rating : '—'}
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

export default PhysicalAdeptPowers;