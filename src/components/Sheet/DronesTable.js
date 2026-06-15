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
                <TableCell align="right">Mods</TableCell>
                <TableCell align="right">Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drones.map((drone, index) => {
                const mods = drone.vehicleMods || [];
                const applied = applyVehicleMods(drone, mods);
                const baseArmor = drone['Body/Armor']?.split('/')[1] ?? '';
                const baseSig = drone['Sig/Autonav']?.split('/')[0] ?? '';
                const baseAutonav = drone['Sig/Autonav']?.split('/')[1] ?? '';
                const baseBody = drone['Body/Armor']?.split('/')[0] ?? '';
                const baseSensor = drone['Pilot/Sensor']?.split('/')[1] ?? '';

                const newArmor = applied.armorDelta !== 0 ? (parseFloat(baseArmor) || 0) + applied.armorDelta : null;
                const newSig = applied.sigDelta !== 0 ? (parseFloat(baseSig) || 0) + applied.sigDelta : null;
                const newAutonav = applied.autonavRating ?? null;
                const newPilot = applied.pilotRating ?? null;

                const bodyArmor = newArmor !== null ? `${baseBody}/${newArmor}` : drone['Body/Armor'];
                const sigAutonav = (newSig !== null || newAutonav !== null)
                  ? `${newSig !== null ? newSig : baseSig}/${newAutonav !== null ? newAutonav : baseAutonav}`
                  : drone['Sig/Autonav'];
                const pilotSensor = newPilot !== null ? `${newPilot}/${baseSensor}` : drone['Pilot/Sensor'];

                const modNames = mods.map(m => m.label).join(', ');

                return (
                  <TableRow key={drone.name + index}>
                    <TableCell style={{ color: '#00ffc3' }}>{drone.name}</TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      <ModdedStat base={drone.Handling} modified={applied.handlingDelta !== 0 ? (parseFloat(drone.Handling) || 0) + applied.handlingDelta : null} lowerIsBetter />
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {drone['Speed/Accel']}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      <ModdedStat base={drone['Body/Armor']} modified={newArmor !== null ? bodyArmor : null} />
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      <ModdedStat base={drone['Sig/Autonav']} modified={(newSig !== null || newAutonav !== null) ? sigAutonav : null} />
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      <ModdedStat base={drone['Pilot/Sensor']} modified={newPilot !== null ? pilotSensor : null} />
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {drone['Cargo/Load']}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {drone.Seating}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#ccc', fontSize: '0.75em' }}>
                      {modNames || '—'}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {drone.Notes ?? ''}
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

export default DronesTable;
