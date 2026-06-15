import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SRSection from './SRSection';
import { tablePaperSx } from './sheetTheme';

const SPELL_CATEGORIES = { C: 'Combat', M: 'Manipulation', H: 'Health', D: 'Detection', I: 'Illusion', Z: 'Transformation' };

const SpellsTable = ({ spells }) => {
  if (!spells || spells.length === 0) return null;

  return (
    <Grid item xs={12}>
      <SRSection title="Spells">
        <TableContainer component={Paper} sx={tablePaperSx}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Force</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Target</TableCell>
                <TableCell align="center">Duration</TableCell>
                <TableCell align="center">Drain</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {spells.map((spell, index) => (
                <TableRow key={spell.Name + index}>
                  <TableCell component="th" scope="row">
                    {spell.Name}
                    {spell.Fetish ? ' [F]' : ''}
                    {spell.Exclusive ? ' [E]' : ''}
                  </TableCell>
                  <TableCell align="center">{spell.Rating}</TableCell>
                  <TableCell align="center">{spell.Type}</TableCell>
                  <TableCell align="center">{SPELL_CATEGORIES[spell.Class] ?? spell.Class}</TableCell>
                  <TableCell align="center">{spell.Target}</TableCell>
                  <TableCell align="center">{spell.Duration}</TableCell>
                  <TableCell align="center">{spell.Drain}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SRSection>
    </Grid>
  );
};

export default SpellsTable;
