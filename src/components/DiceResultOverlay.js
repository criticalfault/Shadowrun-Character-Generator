import React, { useEffect } from 'react';
import { Box, Typography, IconButton, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Die face rendered as an SVG pip-dot d6
function DieFace({ value, success, tn }) {
  const pipPositions = {
    1: [[50, 50]],
    2: [[25, 25], [75, 75]],
    3: [[25, 25], [50, 50], [75, 75]],
    4: [[25, 25], [75, 25], [25, 75], [75, 75]],
    5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
    6: [[25, 22], [75, 22], [25, 50], [75, 50], [25, 78], [75, 78]],
  };
  const pips = pipPositions[value] ?? [];
  const borderColor = success ? '#2e7d32' : value === 1 ? '#c62828' : '#555';
  const bg = success ? '#e8f5e9' : value === 1 ? '#ffebee' : '#1e1e1e';

  return (
    <svg width="44" height="44" viewBox="0 0 100 100" style={{ margin: '3px' }}>
      <rect x="4" y="4" width="92" height="92" rx="16" ry="16"
        fill={bg} stroke={borderColor} strokeWidth="6" />
      {pips.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="10"
          fill={success ? '#2e7d32' : value === 1 ? '#c62828' : '#ccc'} />
      ))}
    </svg>
  );
}

export default function DiceResultOverlay({ result, rolling, onClose }) {
  // Auto-dismiss after 12 s
  useEffect(() => {
    if (!result) return;
    const t = setTimeout(onClose, 12000);
    return () => clearTimeout(t);
  }, [result, onClose]);

  if (!result && !rolling) return null;

  return (
    <Box
      onClick={onClose}
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1400,
        background: 'rgba(18,18,18,0.92)',
        backdropFilter: 'blur(8px)',
        border: '1px solid #333',
        borderRadius: 3,
        p: 2,
        minWidth: 280,
        maxWidth: 420,
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        cursor: 'pointer',
      }}
    >
      {rolling && !result && (
        <Typography sx={{ color: '#fff', textAlign: 'center', py: 1 }}>
          Rolling…
        </Typography>
      )}

      {result && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ color: '#aaa', fontWeight: 600, letterSpacing: 1 }}>
              {result.label} — TN {result.tn} ({result.pool}d6)
            </Typography>
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); onClose(); }}
              sx={{ color: '#666', ml: 1 }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Dice faces */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1.5 }}>
            {result.values.map((v, i) => (
              <DieFace key={i} value={v} success={v >= result.tn} tn={result.tn} />
            ))}
          </Box>

          {/* Summary */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            {result.botch ? (
              <Chip label="BOTCH" size="small" sx={{ background: '#c62828', color: '#fff', fontWeight: 700 }} />
            ) : result.successes === 0 ? (
              <Chip label="No successes" size="small" sx={{ background: '#555', color: '#fff' }} />
            ) : (
              <Chip
                label={`${result.successes} success${result.successes !== 1 ? 'es' : ''}`}
                size="small"
                sx={{ background: '#2e7d32', color: '#fff', fontWeight: 700 }}
              />
            )}
            {result.ones > 0 && (
              <Typography variant="caption" sx={{ color: '#c62828' }}>
                {result.ones} one{result.ones !== 1 ? 's' : ''}
              </Typography>
            )}
            <Typography variant="caption" sx={{ color: '#666', ml: 'auto' }}>
              click to dismiss
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}
