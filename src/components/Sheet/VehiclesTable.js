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

const VehiclesTable = ({ vehicles }) => {
  if (!vehicles || vehicles.length === 0) return null;

  return (
    <Grid item xs={12}>
      <SRSection title="Vehicles">
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
              {vehicles.map((vehicle, index) => (
                <TableRow key={vehicle.name + index}>
                  <TableCell style={{ color: '#00ffc3' }}>
                    {vehicle.name}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {vehicle.Handling}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {vehicle['Speed/Accel']}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {vehicle['Body/Armor']}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {vehicle['Sig/Autonav']}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {vehicle['Pilot/Sensor']}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {vehicle['Cargo/Load']}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {vehicle.Seating}
                  </TableCell>
                  <TableCell align="right" style={{ color: '#00ffc3' }}>
                    {vehicle.Notes ?? ''}
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

export default VehiclesTable;