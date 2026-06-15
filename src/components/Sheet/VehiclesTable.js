import React from 'react';
import { Grid } from '@mui/material';
import SRSection from './SRSection';
import { applyVehicleMods } from '../VehicleModsModal';
import VehicleConditionMonitor from './VehicleConditionMonitor';

const StatCell = ({ label, value }) => (
  <div style={{ flex: '1 1 120px', minWidth: 90, padding: '4px 8px', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
    <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: '#555', letterSpacing: '0.04em' }}>{label}</div>
    <div style={{ fontSize: '0.9rem', color: '#000', marginTop: 1 }}>{value || '—'}</div>
  </div>
);


const ModdedValue = ({ base, modified }) => {
  if (modified === null || modified === undefined || modified === base) return <span>{base}</span>;
  return (
    <span>
      <span style={{ textDecoration: 'line-through', opacity: 0.4, marginRight: 4 }}>{base}</span>
      <span style={{ fontWeight: 'bold' }}>{modified}</span>
    </span>
  );
};

const VehicleCard = ({ vehicle, index }) => {
  const mods = vehicle.vehicleMods || [];
  const applied = applyVehicleMods(vehicle, mods);

  const baseBody   = vehicle['Body/Armor']?.split('/')[0] ?? '';
  const baseArmor  = vehicle['Body/Armor']?.split('/')[1] ?? '';
  const baseSig    = vehicle['Sig/Autonav']?.split('/')[0] ?? '';
  const baseAutonav = vehicle['Sig/Autonav']?.split('/')[1] ?? '';
  const baseSensor = vehicle['Pilot/Sensor']?.split('/')[1] ?? '';

  const newArmor   = applied.armorDelta !== 0 ? (parseFloat(baseArmor) || 0) + applied.armorDelta : null;
  const newSig     = applied.sigDelta !== 0 ? (parseFloat(baseSig) || 0) + applied.sigDelta : null;
  const newAutonav = applied.autonavRating ?? null;
  const newPilot   = applied.pilotRating ?? null;
  const newHandling = applied.handlingDelta !== 0 ? (parseFloat(vehicle.Handling) || 0) + applied.handlingDelta : null;

  const bodyArmor  = newArmor !== null ? `${baseBody}/${newArmor}` : vehicle['Body/Armor'];
  const sigAutonav = (newSig !== null || newAutonav !== null)
    ? `${newSig ?? baseSig}/${newAutonav ?? baseAutonav}`
    : vehicle['Sig/Autonav'];
  const pilotSensor = newPilot !== null ? `${newPilot}/${baseSensor}` : vehicle['Pilot/Sensor'];

  return (
    <div style={{ border: '1px solid #bbb', borderRadius: 2, marginBottom: 12, backgroundColor: '#fff', breakInside: 'avoid' }}>
      {/* Card header */}
      <div style={{ background: '#333', color: '#fff', padding: '5px 10px', fontSize: '0.85rem', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{vehicle.name}</span>
        {mods.length > 0 && (
          <span style={{ fontSize: '0.7rem', fontWeight: 400, opacity: 0.8 }}>{mods.length} mod{mods.length > 1 ? 's' : ''}</span>
        )}
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', borderTop: '1px solid #ddd' }}>
        <StatCell label="Handling" value={<ModdedValue base={vehicle.Handling} modified={newHandling} />} />
        <StatCell label="Speed/Accel" value={vehicle['Speed/Accel']} />
        <StatCell label="Body/Armor" value={<ModdedValue base={vehicle['Body/Armor']} modified={newArmor !== null ? bodyArmor : null} />} />
        <StatCell label="Sig/Autonav" value={<ModdedValue base={vehicle['Sig/Autonav']} modified={(newSig !== null || newAutonav !== null) ? sigAutonav : null} />} />
        <StatCell label="Pilot/Sensor" value={<ModdedValue base={vehicle['Pilot/Sensor']} modified={newPilot !== null ? pilotSensor : null} />} />
        <StatCell label="Cargo/Load" value={vehicle['Cargo/Load']} />
        <StatCell label="Seating" value={vehicle.Seating} />
      </div>

      {/* Mods list */}
      {mods.length > 0 && (
        <div style={{ padding: '4px 8px', borderTop: '1px solid #ddd', fontSize: '0.75rem', color: '#444' }}>
          <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem', color: '#555', letterSpacing: '0.04em' }}>Mods: </span>
          {mods.map(m => m.label).join(', ')}
        </div>
      )}

      {/* Notes */}
      {vehicle.Notes && (
        <div style={{ padding: '4px 8px', borderTop: '1px solid #ddd', fontSize: '0.8rem', color: '#333' }}>
          <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem', color: '#555', letterSpacing: '0.04em' }}>Notes: </span>
          {vehicle.Notes}
        </div>
      )}

      {/* Condition Monitor */}
      <VehicleConditionMonitor />

      {/* Blank notes area */}
      <div style={{ padding: '4px 8px 8px 8px', borderTop: '1px solid #ddd' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: '#555', letterSpacing: '0.04em', marginBottom: 4 }}>Session Notes</div>
        <div style={{ borderBottom: '1px solid #ccc', height: 18, marginBottom: 4 }} />
        <div style={{ borderBottom: '1px solid #ccc', height: 18 }} />
      </div>
    </div>
  );
};

const VehiclesTable = ({ vehicles }) => {
  if (!vehicles || vehicles.length === 0) return null;

  return (
    <Grid size={12}>
      <SRSection title="Vehicles">
        <div style={{ padding: '0 0 4px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: 12, padding: '0 0 4px 0' }}>
            {vehicles.map((vehicle, index) => (
              <VehicleCard key={vehicle.name + index} vehicle={vehicle} index={index} />
            ))}
          </div>
        </div>
      </SRSection>
    </Grid>
  );
};

export default VehiclesTable;
