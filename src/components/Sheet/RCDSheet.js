import React, { useState } from 'react';
import {
  Grid, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, Checkbox, FormControlLabel,
  Tooltip,
} from '@mui/material';
import SRSection from './SRSection';
import { tablePaperSx } from './sheetTheme';

const FLUX_RANGES = [
  { flux: 0, range: '250M' }, { flux: 1, range: '1km' }, { flux: 2, range: '2km' },
  { flux: 3, range: '4km' }, { flux: 4, range: '6km' }, { flux: 5, range: '9km' },
  { flux: 6, range: '12km' }, { flux: 7, range: '16km' }, { flux: 8, range: '20km' },
  { flux: 9, range: '25km' }, { flux: '10+', range: '(2×flux) +10km' },
];

const CHANNEL_CONFIG = {
  Command:  { boxes: 10 },
  Simsense: { boxes: 6 },
  System:   { boxes: 10 },
};

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

// ── Damage Track ─────────────────────────────────────────────────────────────
function DamageTrack({ label, totalBoxes, filled, onChange }) {
  const thresholds = {
    Command:  { serious: 7, moderate: 4, light: 1 },
    Simsense: { serious: 5, moderate: 3, light: 1 },
    System:   { serious: 7, moderate: 4, light: 1 },
  }[label] ?? { serious: Math.ceil(totalBoxes * 0.7), moderate: Math.ceil(totalBoxes * 0.4), light: 1 };

  const getColor = (i) => {
    const idx = totalBoxes - i;
    if (idx >= thresholds.serious) return '#cc0000';
    if (idx >= thresholds.moderate) return '#888';
    return '#333';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }}>
      <div style={{ color: '#555', fontSize: '0.7em', marginBottom: 4 }}>{label}</div>
      <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 2 }}>
        {Array.from({ length: totalBoxes }).map((_, i) => (
          <Tooltip key={i} title={i < thresholds.serious ? 'Serious' : i < thresholds.moderate ? 'Moderate' : 'Light'} placement="left">
            <div
              onClick={() => onChange(i < filled ? i : i + 1)}
              style={{
                width: 18, height: 18,
                border: `1px solid ${getColor(i)}`,
                backgroundColor: i < filled ? getColor(i) : 'transparent',
                cursor: 'pointer',
                borderRadius: 2,
              }}
            />
          </Tooltip>
        ))}
      </div>
      <div style={{ color: '#888', fontSize: '0.65em', marginTop: 4 }}>
        {filled}/{totalBoxes}
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
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                {Object.entries(CHANNEL_CONFIG).map(([ch, { boxes }]) => (
                  <DamageTrack
                    key={ch}
                    label={ch}
                    totalBoxes={boxes}
                    filled={damage[ch] ?? 0}
                    onChange={(val) => updateDamage(ch, val)}
                  />
                ))}
              </div>
              <div style={{ color: '#888', fontSize: '0.65em', marginTop: 8, textAlign: 'center' }}>
                Click boxes to mark damage (top = worst)
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
