import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SRSection from './SRSection';
import { tablePaperSx } from './sheetTheme';
import Ranges from '../../data/ranges.json';
import { applyWeaponMods } from '../WeaponModsModal';

const getRangesFromName = (name) => {
  for (const key of Object.keys(Ranges)) {
    if (name.includes(key)) return Ranges[key];
  }
  return { short: 'N/A', medium: 'N/A', long: 'N/A', extreme: 'N/A' };
};

const WeaponsTable = ({ gear }) => {
  if (!gear || gear.length === 0) return null;
  const weapons = gear.filter((item) => item.Damage);
  if (weapons.length === 0) return null;

  return (
    <Grid size={12}>
      <SRSection title="Weapons">
        <TableContainer component={Paper} sx={tablePaperSx}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Conceal</TableCell>
                <TableCell align="center">Mode</TableCell>
                <TableCell align="center">Damage</TableCell>
                <TableCell align="center">RC</TableCell>
                <TableCell align="center">Ammo</TableCell>
                <TableCell align="center">Short</TableCell>
                <TableCell align="center">Med</TableCell>
                <TableCell align="center">Long</TableCell>
                <TableCell align="center">Ext</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {weapons.map((item, index) => {
                const range    = getRangesFromName(item.Name);
                const modified = applyWeaponMods(item, item.weaponMods ?? []);
                const hasMods  = (item.weaponMods ?? []).length > 0;
                return (
                  <TableRow key={item.Name + index}>
                    <TableCell component="th" scope="row">
                      {item.Name}
                      {hasMods && <span style={{ fontSize: '0.75em', color: '#555', marginLeft: 5 }}>({item.weaponMods.length} mod{item.weaponMods.length > 1 ? 's' : ''})</span>}
                    </TableCell>
                    <TableCell align="center">{modified.conceal}</TableCell>
                    <TableCell align="center">{modified.mode || '—'}</TableCell>
                    <TableCell align="center">{modified.damage}</TableCell>
                    <TableCell align="center">{modified.recoilComp > 0 ? `+${modified.recoilComp}` : '—'}</TableCell>
                    <TableCell align="center">{item.Ammunition ?? 'N/A'}</TableCell>
                    <TableCell align="center">{range.short}</TableCell>
                    <TableCell align="center">{range.medium}</TableCell>
                    <TableCell align="center">{range.long}</TableCell>
                    <TableCell align="center">{range.extreme}</TableCell>
                    <TableCell>{item.Notes ?? ''}</TableCell>
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
