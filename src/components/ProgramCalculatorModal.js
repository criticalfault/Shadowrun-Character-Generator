import React, { useState, useMemo } from 'react';
import {
  Modal, Box, Typography, Table, TableHead, TableBody,
  TableRow, TableCell, TableContainer, Paper, Button, Chip,
} from '@mui/material';

const PRICE_PER_MP = {
  1: 100, 2: 100, 3: 100,
  4: 200, 5: 200, 6: 200,
  7: 500, 8: 500, 9: 500,
  10: 1000, 11: 1000, 12: 1000,
};

const fmtY = (n) =>
  new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(n);

const calcSize = (rating, multiplier) => rating * rating * multiplier;
const calcCost = (rating, multiplier) =>
  calcSize(rating, multiplier) * (PRICE_PER_MP[rating] ?? 1000);

const modalSx = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95vw', md: 860 },
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 1,
  overflow: 'hidden',
};

const statChipSx = (over) => ({
  fontWeight: 700,
  fontSize: '0.75rem',
  bgcolor: over ? '#c62828' : '#e8f5e9',
  color: over ? '#fff' : '#1b5e20',
  border: `1px solid ${over ? '#c62828' : '#4caf50'}`,
});

export default function ProgramCalculatorModal({ open, onClose, programs, deck }) {
  // ratings[programName] = 1..12
  const [ratings, setRatings] = useState({});

  const setRating = (name, val) => {
    const r = Math.min(12, Math.max(1, parseInt(val) || 1));
    setRatings((prev) => ({ ...prev, [name]: r }));
  };

  const getRating = (name) => ratings[name] ?? 1;

  const rows = useMemo(() =>
    (programs ?? []).map((prog) => {
      const r = getRating(prog.Name);
      return {
        ...prog,
        rating: r,
        size: calcSize(r, prog.Multiplyer),
        cost: calcCost(r, prog.Multiplyer),
      };
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [programs, ratings]
  );

  const totalSize = rows.reduce((s, r) => s + r.size, 0);
  const totalCost = rows.reduce((s, r) => s + r.cost, 0);

  const activeMemory = parseInt(deck?.Memory ?? 0);
  const storage = parseInt(deck?.Storage ?? 0);
  const memOver = activeMemory > 0 && totalSize > activeMemory;
  const storeOver = storage > 0 && totalSize > storage;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalSx}>
        {/* Header */}
        <Box sx={{ px: 3, py: 2, borderBottom: '1px solid #ddd', flexShrink: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Program Calculator{deck ? ` — ${deck.Name}` : ''}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            {activeMemory > 0 && (
              <Chip
                label={`Active Memory: ${totalSize} / ${activeMemory} Mp`}
                sx={statChipSx(memOver)}
                size="small"
              />
            )}
            {storage > 0 && (
              <Chip
                label={`Storage: ${totalSize} / ${storage} Mp`}
                sx={statChipSx(storeOver)}
                size="small"
              />
            )}
            <Chip
              label={`Total Cost: ${fmtY(totalCost)}`}
              size="small"
              sx={{ fontWeight: 700, fontSize: '0.75rem', bgcolor: '#f5f5f5', border: '1px solid #bbb' }}
            />
          </Box>
          <Typography variant="caption" sx={{ color: '#888', mt: 0.5, display: 'block' }}>
            Set ratings to plan your loadout. Size = Rating² × Multiplier.
          </Typography>
        </Box>

        {/* Table */}
        <Box sx={{ overflowY: 'auto', flex: 1 }}>
          <TableContainer component={Paper} elevation={0}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Program</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>Multiplier</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>Rating</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>Size (Mp)</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((prog) => (
                  <TableRow key={prog.Name} hover>
                    <TableCell>{prog.Name}</TableCell>
                    <TableCell align="center">{prog.Multiplyer}</TableCell>
                    <TableCell align="center">
                      <input
                        type="number"
                        min={1}
                        max={12}
                        value={getRating(prog.Name)}
                        onChange={(e) => setRating(prog.Name, e.target.value)}
                        style={{ width: 48, padding: '2px 4px', textAlign: 'center' }}
                      />
                    </TableCell>
                    <TableCell align="right">{prog.size}</TableCell>
                    <TableCell align="right">{fmtY(prog.cost)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Footer */}
        <Box sx={{ px: 3, py: 1.5, borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}>
          <Button variant="outlined" onClick={onClose}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
}
