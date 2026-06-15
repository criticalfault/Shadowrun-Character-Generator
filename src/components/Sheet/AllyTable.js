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
  Box,
  Typography,
  Chip,
} from '@mui/material';
import SRSection from './SRSection';
import { tablePaperSx } from './sheetTheme';

const FREE_POWERS = [
  "Aid Power",
  "Inhabiting",
  "Materialization",
  "Sorcery",
  "Telepathic Link",
  "3D Movement",
];

const PHYSICAL_ATTRS = ["Body", "Quickness", "Strength", "Charisma"];
const MENTAL_ATTRS = ["Intelligence", "Willpower"];

const AllyTable = ({ ally }) => {
  if (!ally) return null;

  const totalKarma = (() => {
    let k = 0;
    for (let f = 1; f < ally.force; f++) k += 5 * f;
    const base = ally.baseForce ?? 1;
    for (const attr of PHYSICAL_ATTRS) {
      const rating = ally.physicalAttributes?.[attr] ?? base;
      for (let r = base; r < rating; r++) k += r;
    }
    for (const sk of ally.skills ?? []) {
      if (!sk.free) {
        for (let r = 0; r < sk.rating; r++) k += 1;
      }
    }
    if (ally.senseLink) k += 5;
    for (let i = 1; i < (ally.spells ?? []).length; i++) k += ally.spells[i].force ?? ally.force;
    k += Math.max(0, (ally.karmaPool ?? 1) - 1);
    k += Math.max(0, (ally.forms ?? 1) - 1);
    return k;
  })();

  const powers = [...FREE_POWERS];
  if (ally.senseLink) powers.push('Sense Link');

  return (
    <Grid size={12}>
      <SRSection title="Ally Spirit">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 2, px: 1 }}>
          {ally.name && (
            <Box>
              <Typography variant="caption" sx={{ color: '#666' }}>True Name</Typography>
              <Typography sx={{ color: '#000' }}>{ally.name}</Typography>
            </Box>
          )}
          {ally.nativePlane && (
            <Box>
              <Typography variant="caption" sx={{ color: '#666' }}>Native Plane</Typography>
              <Typography sx={{ color: '#000' }}>{ally.nativePlane}</Typography>
            </Box>
          )}
          <Box>
            <Typography variant="caption" sx={{ color: '#666' }}>Force</Typography>
            <Typography sx={{ color: '#000', fontWeight: 'bold' }}>{ally.force}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: '#666' }}>Karma Pool</Typography>
            <Typography sx={{ color: '#000' }}>{ally.karmaPool ?? 1}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: '#666' }}>Forms</Typography>
            <Typography sx={{ color: '#000' }}>{ally.forms ?? 1}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: '#666' }}>Total Karma</Typography>
            <Typography sx={{ color: '#000' }}>{totalKarma}</Typography>
          </Box>
        </Box>

        {/* Attributes */}
        <TableContainer component={Paper} sx={{ ...tablePaperSx, mb: 2 }}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={PHYSICAL_ATTRS.length + MENTAL_ATTRS.length} sx={{ fontSize: '0.75rem', color: '#555' }}>
                  Attributes
                </TableCell>
              </TableRow>
              <TableRow>
                {PHYSICAL_ATTRS.map((a) => <TableCell key={a} align="center">{a}</TableCell>)}
                {MENTAL_ATTRS.map((a) => <TableCell key={a} align="center">{a}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {PHYSICAL_ATTRS.map((a) => (
                  <TableCell key={a} align="center">
                    {ally.physicalAttributes?.[a] ?? ally.force}
                  </TableCell>
                ))}
                {MENTAL_ATTRS.map((a) => (
                  <TableCell key={a} align="center">
                    {ally.mentalAttributes?.[a] ?? '—'}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Skills */}
        {(ally.skills ?? []).length > 0 && (
          <TableContainer component={Paper} sx={{ ...tablePaperSx, mb: 2 }}>
            <Table size="small" className="shadowrun-table">
              <TableHead>
                <TableRow>
                  <TableCell>Skill</TableCell>
                  <TableCell align="right">Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ally.skills.map((sk, i) => (
                  <TableRow key={i}>
                    <TableCell>{sk.name}</TableCell>
                    <TableCell align="right">{sk.rating}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Powers */}
        <Box sx={{ mb: 2, px: 1 }}>
          <Typography variant="caption" sx={{ color: '#555', display: 'block', mb: 0.5 }}>Powers</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {powers.map((p) => (
              <Chip
                key={p}
                label={p}
                size="small"
                sx={{ backgroundColor: '#eee', color: '#000', fontSize: '0.72rem', border: '1px solid #ccc' }}
              />
            ))}
          </Box>
        </Box>

        {/* Spells */}
        {(ally.spells ?? []).length > 0 && (
          <TableContainer component={Paper} sx={tablePaperSx}>
            <Table size="small" className="shadowrun-table">
              <TableHead>
                <TableRow>
                  <TableCell>Ally Spell</TableCell>
                  <TableCell align="right">Force</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ally.spells.map((sp, i) => (
                  <TableRow key={i}>
                    <TableCell>{sp.name}</TableCell>
                    <TableCell align="right">{sp.force}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </SRSection>
    </Grid>
  );
};

export default AllyTable;
