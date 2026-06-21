import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Typography, Box, Slider,
} from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';

export default function RollDialog({ open, label, defaultPool, defaultTN = 4, onRoll, onClose }) {
  const [pool, setPool] = useState(defaultPool ?? 1);
  const [tn, setTN] = useState(defaultTN);

  useEffect(() => {
    if (open) {
      setPool(defaultPool ?? 1);
      setTN(defaultTN);
    }
  }, [open, defaultPool, defaultTN]);

  const handleRoll = () => {
    onRoll({ label, pool: parseInt(pool) || 1, tn: parseInt(tn) || 4 });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pb: 0 }}>{label}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography gutterBottom>Dice Pool: <strong>{pool}</strong></Typography>
          <Slider
            value={parseInt(pool) || 1}
            min={1} max={20} step={1}
            onChange={(_, v) => setPool(v)}
            marks={[1,5,10,15,20].map(v=>({value:v,label:`${v}`}))}
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography gutterBottom>Target Number: <strong>{tn}</strong></Typography>
          <Slider
            value={parseInt(tn) || 4}
            min={2} max={12} step={1}
            onChange={(_, v) => setTN(v)}
            marks={[2,4,6,8,10,12].map(v=>({value:v,label:`${v}`}))}
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <TextField
            label="Pool" type="number" size="small"
            value={pool} onChange={(e) => setPool(e.target.value)}
            inputProps={{ min: 1, max: 30 }} sx={{ width: 90 }}
          />
          <TextField
            label="TN" type="number" size="small"
            value={tn} onChange={(e) => setTN(e.target.value)}
            inputProps={{ min: 2, max: 20 }} sx={{ width: 90 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          startIcon={<CasinoIcon />}
          onClick={handleRoll}
        >
          Roll {pool}d6
        </Button>
      </DialogActions>
    </Dialog>
  );
}
