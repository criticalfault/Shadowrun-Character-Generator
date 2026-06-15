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
import { applyVehicleMods } from '../VehicleModsModal';

const ModdedStat = ({ base, modified, lowerIsBetter = false }) => {
  if (modified === null || modified === undefined || modified === base) {
    return <span>{base}</span>;
  }
  const improved = lowerIsBetter ? modified < base : modified > base;
  return (
    <span>
      <span style={{ textDecoration: 'line-through', opacity: 0.5, marginRight: 4 }}>{base}</span>
      <span style={{ color: improved ? '#00ffc3' : '#ff4444' }}>{modified}</span>
    </span>
  );
};

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
                <TableCell align="right">Mods</TableCell>
                <TableCell align="right">Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.map((vehicle, index) => {
                const mods = vehicle.vehicleMods || [];
                const applied = applyVehicleMods(vehicle, mods);
                const baseBody = vehicle['Body/Armor']?.split('/')[0] ?? '';
                const baseArmor = vehicle['Body/Armor']?.split('/')[1] ?? '';
                const baseSig = vehicle['Sig/Autonav']?.split('/')[0] ?? '';
                const baseAutonav = vehicle['Sig/Autonav']?.split('/')[1] ?? '';
                const basePilot = vehicle['Pilot/Sensor']?.split('/')[0] ?? '';
                const baseSensor = vehicle['Pilot/Sensor']?.split('/')[1] ?? '';

                const newBody = baseBody;
                const newArmor = applied.armorDelta !== 0 ? (parseFloat(baseArmor) || 0) + applied.armorDelta : null;
                const newSig = applied.sigDelta !== 0 ? (parseFloat(baseSig) || 0) + applied.sigDelta : null;
                const newAutonav = applied.autonavRating ?? null;
                const newPilot = applied.pilotRating ?? null;
                const newSensor = null;

                const bodyArmor = newArmor !== null
                  ? `${newBody}/${newArmor}`
                  : vehicle['Body/Armor'];

                const sigAutonav = (newSig !== null || newAutonav !== null)
                  ? `${newSig !== null ? newSig : baseSig}/${newAutonav !== null ? newAutonav : baseAutonav}`
                  : vehicle['Sig/Autonav'];

                const pilotSensor = newPilot !== null
                  ? `${newPilot}/${baseSensor}`
                  : vehicle['Pilot/Sensor'];

                const modNames = mods.map(m => m.label).join(', ');

                return (
                  <TableRow key={vehicle.name + index}>
                    <TableCell style={{ color: '#00ffc3' }}>{vehicle.name}</TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      <ModdedStat base={vehicle.Handling} modified={applied.handlingDelta !== 0 ? (parseFloat(vehicle.Handling) || 0) + applied.handlingDelta : null} lowerIsBetter />
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {vehicle['Speed/Accel']}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      <ModdedStat base={vehicle['Body/Armor']} modified={newArmor !== null ? bodyArmor : null} />
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      <ModdedStat base={vehicle['Sig/Autonav']} modified={(newSig !== null || newAutonav !== null) ? sigAutonav : null} />
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      <ModdedStat base={vehicle['Pilot/Sensor']} modified={newPilot !== null ? pilotSensor : null} />
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {vehicle['Cargo/Load']}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {vehicle.Seating}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#ccc', fontSize: '0.75em' }}>
                      {modNames || '—'}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {vehicle.Notes ?? ''}
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

export default VehiclesTable;
