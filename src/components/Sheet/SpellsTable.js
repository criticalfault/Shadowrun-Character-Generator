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

const SPELL_CATEGORIES = {
  C: 'Combat',
  M: 'Manipulation',
  H: 'Health',
  D: 'Detection',
  I: 'Illusion',
  Z: 'Transformation',
};

const SpellsTable = ({ spells }) => {
  if (!spells || spells.length === 0) return null;

  return (
    <Grid item xs={12}>
      <SRSection title="Spells">
        <TableContainer component={Paper} sx={{ backgroundColor: '#1f1f1f' }}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Target</TableCell>
                <TableCell align="right">Duration</TableCell>
                <TableCell align="right">Drain</TableCell>
                <TableCell align="right">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {spells.map((spell, index) => {
                const options = [];
                if (spell.Fetish) options.push('F');
                if (spell.Exclusive) options.push('E');

                return (
                  <TableRow key={spell.Name + index}>
                    <TableCell style={{ color: '#00ffc3' }}>{spell.Name}</TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {spell.Rating}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {spell.Type}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {SPELL_CATEGORIES[spell.Class] ?? spell.Class}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {spell.Target}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {spell.Duration}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {spell.Drain}
                    </TableCell>
                    <TableCell align="right" style={{ color: '#00ffc3' }}>
                      {options.join(' ')}
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

export default SpellsTable;