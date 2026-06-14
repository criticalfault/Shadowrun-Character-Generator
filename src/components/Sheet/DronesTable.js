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

const DronesTable = ({ drones }) => {
  if (!drones || drones.length === 0) return null;

  return (
    <Grid item xs={12}>
      <SRSection title="Drones">
        <TableContainer component={Paper} sx={{ backgroundColor: '#1f1f1f' }}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Handling</TableCell>
                <TableCell align="right">Speed/Accel</TableCell>
                <TableCell align="right">Body/Armor</TableCell>
                <TableCell align="right">Sig/Autonav</TableCell>
                <TableCell align="right">Pilot/Sensor</TableCell>
                <TableCell align="right">Cargo/Load</TableCell>
                <TableCell align="right">Seating</TableCell>
                <TableCell align="right">Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drones.map((drone, index) => (
                <TableRow key={drone.name + index}>
                  <TableCell style={{ color: '#00ffc3' }}>
                    {drone.name}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {drone.Handling}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {drone['Speed/Accel']}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {drone['Body/Armor']}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {drone['Sig/Autonav']}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {drone['Pilot/Sensor']}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {drone['Cargo/Load']}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {drone.Seating}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {drone.Notes ?? ''}
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

export default DronesTable;
