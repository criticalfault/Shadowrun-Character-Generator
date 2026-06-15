import React, { useState } from 'react';
import {
  Grid, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, Checkbox, FormControlLabel,
} from '@mui/material';
import SRSection from './SRSection';
import { tablePaperSx } from './sheetTheme';

const FLUX_RANGES = [
  { flux: 0, range: '250M' }, { flux: 1, range: '1km' }, { flux: 2, range: '2km' },
  { flux: 3, range: '4km' }, { flux: 4, range: '6km' }, { flux: 5, range: '9km' },
  { flux: 6, range: '12km' }, { flux: 7, range: '16km' }, { flux: 8, range: '20km' },
  { flux: 9, range: '25km' }, { flux: '10+', range: '(2×flux) +10km' },
];

// 10 rows, index 0 = top (Channel Disengaged), index 9 = bottom (Light)
const SIGNAL_ROWS = [
  { label: 'Channel\nDisengaged', boxText: '' },
  { label: null, boxText: '' },
  { label: null, boxText: '' },
  { label: null, boxText: '' },
  { label: null, boxText: '' },
  { label: 'Serious\nDegradation', boxText: '+3TN #' },
  { label: null, boxText: '' },
  { label: 'Moderate\nDegradation', boxText: '+2 TN #' },
  { label: null, boxText: '' },
  { label: 'Light\nDegradation', boxText: '+1TN #' },
];

const cellSx = { borderColor: '#ddd', padding: '4px 8px', fontSize: '0.8em' };
const headSx = { ...cellSx, fontSize: '0.7em' };

const sectionLabel = {
  color: '#555',
  fontSize: '0.75em',
  marginBottom: 8,
  textTransform: 'uppercase',
  letterSpacing: 1,
  fontWeight: 'bold',
};

const panelStyle = { border: '1px solid #bbb', padding: 12, borderRadius: 2 };

// ── Signal Damage Track ───────────────────────────────────────────────────────
// filled = number of boxes marked from the bottom (0..10)
// showLabels: 'left' | 'right' | false
function DamageTrack({ label, filled, onChange, showLabels }) {
  const handleClick = (i) => {
    // i is 0=top, 9=bottom; fill level from bottom = 10 - i
    const level = 10 - i;
    onChange(filled === level ? level - 1 : level);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Channel label above */}
      <div style={{ fontSize: '0.72rem', fontWeight: 700, textAlign: 'center', marginBottom: 6, lineHeight: 1.3 }}>
        {label.split('\n').map((l, i) => <div key={i}>{l}</div>)}
      </div>
      {/* Box rows top-to-bottom */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {SIGNAL_ROWS.map((row, i) => {
          const isFilled = i >= (10 - filled);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {/* Left label column */}
              {showLabels === 'left' && (
                <div style={{ width: 72, textAlign: 'right', fontSize: '0.6rem', lineHeight: 1.2, color: '#333' }}>
                  {row.label?.split('\n').map((l, j) => <div key={j}>{l}</div>)}
                </div>
              )}
              {/* Box */}
              <div
                onClick={() => handleClick(i)}
                style={{
                  width: 46, height: 22,
                  border: '1px solid #000',
                  backgroundColor: isFilled ? '#333' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  userSelect: 'none',
                }}
              >
                {row.boxText && (
                  <span style={{ fontSize: '0.55rem', color: isFilled ? '#fff' : '#000' }}>
                    {row.boxText}
                  </span>
                )}
              </div>
              {/* Right label column */}
              {showLabels === 'right' && (
                <div style={{ width: 72, textAlign: 'left', fontSize: '0.6rem', lineHeight: 1.2, color: '#333' }}>
                  {row.label?.split('\n').map((l, j) => <div key={j}>{l}</div>)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── RCD stat field ────────────────────────────────────────────────────────────
function RCDField({ label, value, onChange, width = 120 }) {
  return (
    <TextField
      label={label}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      size="small"
      sx={{
        width,
        '& label': { color: '#555', fontSize: '0.75em' },
        '& label.Mui-focused': { color: '#000' },
        '& input': { color: '#000', fontSize: '0.85em' },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#aaa' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
        mb: 1, mr: 1,
      }}
    />
  );
}

// ── Main component ────────────────────────────────────────────────────────────
const RCDSheet = ({ rcd, drones, onChangeRCD }) => {
  const [visible, setVisible] = useState(false);

  if (!visible) {
    return (
      <Grid size={12} className="no-print">
        <Button
          variant="outlined"
          onClick={() => setVisible(true)}
          sx={{ color: '#000', borderColor: '#aaa', mt: 1 }}
        >
          Show Remote Control Record Sheet
        </Button>
      </Grid>
    );
  }

  const update = (key, val) => onChangeRCD({ ...rcd, [key]: val });
  const updateDamage = (channel, val) =>
    onChangeRCD({ ...rcd, damage: { ...(rcd.damage ?? {}), [channel]: val } });
  const updateDroneExtra = (droneIndex, field, val) => {
    const extras = [...(rcd.droneExtras ?? [])];
    extras[droneIndex] = { ...(extras[droneIndex] ?? {}), [field]: val };
    onChangeRCD({ ...rcd, droneExtras: extras });
  };

  const damage = rcd.damage ?? {};

  return (
    <Grid size={12}>
      <SRSection title="Remote Control Record Sheet">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <Button
            size="small"
            onClick={() => setVisible(false)}
            sx={{ color: '#555', fontSize: '0.75em' }}
          >
            Hide
          </Button>
        </div>

        {/* ── Top row: Signal Monitor + RCD Stats ── */}
        <Grid container spacing={2} sx={{ mb: 2 }}>

          {/* Signal Condition Monitor */}
          <Grid size={{ xs: 12, md: 5 }}>
            <div style={panelStyle}>
              <div style={sectionLabel}>Signal Condition Monitor</div>
              <div style={{ display: 'flex', gap: 0, justifyContent: 'center', alignItems: 'flex-start' }}>
                <DamageTrack label="Command\nChannel"  filled={damage.Command  ?? 0} onChange={(v) => updateDamage('Command',  v)} showLabels="left" />
                <DamageTrack label="Simsense\nChannel" filled={damage.Simsense ?? 0} onChange={(v) => updateDamage('Simsense', v)} showLabels={false} />
                <DamageTrack label="System\nChannel"   filled={damage.System   ?? 0} onChange={(v) => updateDamage('System',   v)} showLabels="right" />
              </div>
            </div>
          </Grid>

          {/* RCD Stats */}
          <Grid size={{ xs: 12, md: 7 }}>
            <div style={panelStyle}>
              <div style={sectionLabel}>Remote Control Deck</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <RCDField label="Max Flux" value={rcd.maxFlux} onChange={(v) => update('maxFlux', v)} width={100} />
                <RCDField label="Current Modified Flux" value={rcd.currentFlux} onChange={(v) => update('currentFlux', v)} width={160} />
                <RCDField label="ECCM" value={rcd.eccm} onChange={(v) => update('eccm', v)} width={80} />
                <RCDField label="Encryption Module" value={rcd.encryptionModule} onChange={(v) => update('encryptionModule', v)} width={150} />
                <RCDField label="Decryption Module" value={rcd.decryptionModule} onChange={(v) => update('decryptionModule', v)} width={150} />
                <RCDField label="Protocol Emulation" value={rcd.protocolEmulation} onChange={(v) => update('protocolEmulation', v)} width={150} />
                <RCDField label="Rating" value={rcd.rating} onChange={(v) => update('rating', v)} width={80} />
                <RCDField label="Flux" value={rcd.flux} onChange={(v) => update('flux', v)} width={80} />
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rcd.ivisMaster ?? false}
                      onChange={(e) => update('ivisMaster', e.target.checked)}
                      sx={{ color: '#aaa', '&.Mui-checked': { color: '#000' }, padding: '2px 4px' }}
                      size="small"
                    />
                  }
                  label={<span style={{ color: '#333', fontSize: '0.8em' }}>IVIS Master Unit</span>}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rcd.fddmMaster ?? false}
                      onChange={(e) => update('fddmMaster', e.target.checked)}
                      sx={{ color: '#aaa', '&.Mui-checked': { color: '#000' }, padding: '2px 4px' }}
                      size="small"
                    />
                  }
                  label={<span style={{ color: '#333', fontSize: '0.8em' }}>FDDM Master Unit</span>}
                />
              </div>
            </div>
          </Grid>
        </Grid>

        {/* ── Flux Ranges + Subscribed Drones ── */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <div style={panelStyle}>
              <div style={sectionLabel}>Flux Ranges</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', gap: '2px 16px' }}>
                {FLUX_RANGES.map(({ flux, range }) => (
                  <React.Fragment key={flux}>
                    <span style={{ color: '#000', fontSize: '0.8em', fontWeight: 'bold' }}>{flux}</span>
                    <span style={{ color: '#333', fontSize: '0.8em' }}>{range}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <div style={panelStyle}>
              <div style={sectionLabel}>Subscribed Drones</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <RCDField label="Current" value={rcd.subscribedCurrent} onChange={(v) => update('subscribedCurrent', v)} width={90} />
                <RCDField label="Max Active (Rating)" value={rcd.maxActive} onChange={(v) => update('maxActive', v)} width={140} />
                <RCDField label="Max Subscribed (Rating×2)" value={rcd.maxSubscribed} onChange={(v) => update('maxSubscribed', v)} width={190} />
              </div>
              <RCDField
                label="Remote Network Notes"
                value={rcd.networkNotes}
                onChange={(v) => update('networkNotes', v)}
                width={360}
              />
            </div>
          </Grid>
        </Grid>

        {/* ── Drone table ── */}
        {drones && drones.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={sectionLabel}>Subscribed Drones</div>
            <TableContainer component={Paper} sx={{ ...tablePaperSx, mb: 2 }}>
              <Table size="small" className="shadowrun-table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={headSx}>Drone</TableCell>
                    <TableCell sx={headSx}>Type</TableCell>
                    <TableCell sx={{ ...headSx, textAlign: 'center' }}>Pilot</TableCell>
                    <TableCell sx={{ ...headSx, textAlign: 'center' }}>Handling</TableCell>
                    <TableCell sx={{ ...headSx, textAlign: 'center' }}>Body</TableCell>
                    <TableCell sx={{ ...headSx, textAlign: 'center' }}>Armor</TableCell>
                    <TableCell sx={{ ...headSx, textAlign: 'center' }}>Sig</TableCell>
                    <TableCell sx={{ ...headSx, textAlign: 'center' }}>Adapt.Pool</TableCell>
                    <TableCell sx={{ ...headSx, textAlign: 'center' }}>IVIS Pool</TableCell>
                    <TableCell sx={{ ...headSx, textAlign: 'center' }}>Affiliated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {drones.map((drone, i) => {
                    const extra = (rcd.droneExtras ?? [])[i] ?? {};
                    const bodyArmor = drone['Body/Armor'] ?? '';
                    const [body, armor] = bodyArmor.split('/');
                    const pilotSensor = drone['Pilot/Sensor'] ?? '';
                    const [pilot] = pilotSensor.split('/');
                    const sigAutonav = drone['Sig/Autonav'] ?? '';
                    const [sig] = sigAutonav.split('/');
                    return (
                      <TableRow key={i}>
                        <TableCell sx={cellSx}>{drone.name}</TableCell>
                        <TableCell sx={cellSx}>
                          <input
                            value={extra.type ?? ''}
                            onChange={(e) => updateDroneExtra(i, 'type', e.target.value)}
                            placeholder="—"
                            style={{ background: 'transparent', border: 'none', color: '#000', width: 90, fontSize: '0.8em' }}
                          />
                        </TableCell>
                        <TableCell sx={{ ...cellSx, textAlign: 'center' }}>{pilot}</TableCell>
                        <TableCell sx={{ ...cellSx, textAlign: 'center' }}>{drone.Handling}</TableCell>
                        <TableCell sx={{ ...cellSx, textAlign: 'center' }}>{body}</TableCell>
                        <TableCell sx={{ ...cellSx, textAlign: 'center' }}>{armor}</TableCell>
                        <TableCell sx={{ ...cellSx, textAlign: 'center' }}>{sig}</TableCell>
                        <TableCell sx={{ ...cellSx, textAlign: 'center' }}>
                          <input
                            value={extra.adaptPool ?? ''}
                            onChange={(e) => updateDroneExtra(i, 'adaptPool', e.target.value)}
                            placeholder="—"
                            style={{ background: 'transparent', border: 'none', color: '#000', width: 50, textAlign: 'center', fontSize: '0.8em' }}
                          />
                        </TableCell>
                        <TableCell sx={{ ...cellSx, textAlign: 'center' }}>
                          <input
                            value={extra.ivisPool ?? ''}
                            onChange={(e) => updateDroneExtra(i, 'ivisPool', e.target.value)}
                            placeholder="—"
                            style={{ background: 'transparent', border: 'none', color: '#000', width: 50, textAlign: 'center', fontSize: '0.8em' }}
                          />
                        </TableCell>
                        <TableCell sx={{ ...cellSx, textAlign: 'center' }}>
                          <Checkbox
                            checked={extra.affiliated ?? false}
                            onChange={(e) => updateDroneExtra(i, 'affiliated', e.target.checked)}
                            sx={{ color: '#aaa', '&.Mui-checked': { color: '#000' }, padding: '2px' }}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Autosofts / Standing Orders per drone */}
            <Grid container spacing={2}>
              {drones.map((drone, i) => {
                const extra = (rcd.droneExtras ?? [])[i] ?? {};
                return (
                  <Grid size={{ xs: 12, md: 6 }} key={i}>
                    <div style={panelStyle}>
                      <div style={{ color: '#000', fontSize: '0.8em', fontWeight: 'bold', marginBottom: 6 }}>
                        {drone.name}
                      </div>
                      <TextField
                        label="Weapons, Autosofts & Accessories"
                        multiline
                        minRows={2}
                        value={extra.autosofts ?? ''}
                        onChange={(e) => updateDroneExtra(i, 'autosofts', e.target.value)}
                        fullWidth
                        size="small"
                        sx={{
                          mb: 1,
                          '& label': { color: '#555', fontSize: '0.75em' },
                          '& label.Mui-focused': { color: '#000' },
                          '& textarea': { color: '#000', fontSize: '0.8em' },
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#aaa' },
                        }}
                      />
                      <TextField
                        label="Standing Orders"
                        multiline
                        minRows={2}
                        value={extra.standingOrders ?? ''}
                        onChange={(e) => updateDroneExtra(i, 'standingOrders', e.target.value)}
                        fullWidth
                        size="small"
                        sx={{
                          '& label': { color: '#555', fontSize: '0.75em' },
                          '& label.Mui-focused': { color: '#000' },
                          '& textarea': { color: '#000', fontSize: '0.8em' },
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#aaa' },
                        }}
                      />
                    </div>
                  </Grid>
                );
              })}
            </Grid>

            {/* Drone Weapons */}
            <div style={{ marginTop: 16 }}>
              <div style={sectionLabel}>Drone Weapons</div>
              <TableContainer component={Paper} sx={tablePaperSx}>
                <Table size="small" className="shadowrun-table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={headSx}>Drone</TableCell>
                      <TableCell sx={headSx}>Weapon Type</TableCell>
                      <TableCell sx={headSx}>Mode</TableCell>
                      <TableCell sx={headSx}>Ammo</TableCell>
                      <TableCell sx={headSx}>Short/Med/Long/Extreme</TableCell>
                      <TableCell sx={headSx}>Damage</TableCell>
                      <TableCell sx={headSx}>Blast</TableCell>
                      <TableCell sx={headSx}>Scatter</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {drones.map((drone, i) => {
                      const extra = (rcd.droneExtras ?? [])[i] ?? {};
                      const weapons = extra.weapons ?? [{}];
                      return weapons.map((wpn, wi) => (
                        <TableRow key={`${i}-${wi}`}>
                          {wi === 0 && (
                            <TableCell sx={cellSx} rowSpan={weapons.length}>{drone.name}</TableCell>
                          )}
                          {(['type','mode','ammo','ranges','damage','blast','scatter']).map((field) => (
                            <TableCell key={field} sx={cellSx}>
                              <input
                                value={wpn[field] ?? ''}
                                onChange={(e) => {
                                  const newWeapons = [...weapons];
                                  newWeapons[wi] = { ...newWeapons[wi], [field]: e.target.value };
                                  updateDroneExtra(i, 'weapons', newWeapons);
                                }}
                                placeholder="—"
                                style={{ background: 'transparent', border: 'none', color: '#000', width: field === 'ranges' ? 130 : 70, fontSize: '0.8em' }}
                              />
                            </TableCell>
                          ))}
                          <TableCell sx={cellSx}>
                            <Button
                              size="small"
                              onClick={() => {
                                const newWeapons = [...weapons, {}];
                                updateDroneExtra(i, 'weapons', newWeapons);
                              }}
                              sx={{ minWidth: 0, color: '#555', fontSize: '0.7em', padding: '0 4px' }}
                            >
                              +
                            </Button>
                            {weapons.length > 1 && (
                              <Button
                                size="small"
                                onClick={() => {
                                  const newWeapons = weapons.filter((_, idx) => idx !== wi);
                                  updateDroneExtra(i, 'weapons', newWeapons);
                                }}
                                sx={{ minWidth: 0, color: '#cc0000', fontSize: '0.7em', padding: '0 4px' }}
                              >
                                ×
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ));
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        )}

        {(!drones || drones.length === 0) && (
          <div style={{ color: '#888', fontSize: '0.8em', textAlign: 'center', padding: 16 }}>
            No drones on character — add drones in the Vehicles tab to populate this section.
          </div>
        )}
      </SRSection>
    </Grid>
  );
};

export default RCDSheet;
