import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box,
} from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';

export default function DiceStylePrompt({ open, onChoose }) {
  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CasinoIcon color="primary" />
        Dice Roller Style
      </DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          Want <strong>3D animated dice</strong> that physically roll on screen?
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          This downloads ~600 KB of extra assets the first time. After that
          it's cached and instant.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You can change this any time in Settings.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'column', alignItems: 'stretch', gap: 1, px: 3, pb: 2 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<CasinoIcon />}
          onClick={() => onChoose('3d')}
        >
          Yes — give me 3D dice!
        </Button>
        <Button
          variant="outlined"
          onClick={() => onChoose('simple')}
        >
          No thanks — keep it simple
        </Button>
        <Button
          size="small"
          color="inherit"
          onClick={() => onChoose(null)}
          sx={{ opacity: 0.6 }}
        >
          Ask me later
        </Button>
      </DialogActions>
    </Dialog>
  );
}
