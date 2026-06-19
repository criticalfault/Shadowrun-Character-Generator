import React, { useEffect } from 'react';
import { Box, Typography, IconButton, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const pipPositions = {
  1: [[50, 50]],
  2: [[25, 25], [75, 75]],
  3: [[25, 25], [50, 50], [75, 75]],
  4: [[25, 25], [75, 25], [25, 75], [75, 75]],
  5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
  6: [[25, 22], [75, 22], [25, 50], [75, 50], [25, 78], [75, 78]],
};

function DieFace({ value, success, allOne, size = 44 }) {
  const pips = pipPositions[value] ?? [];
  const borderColor = success ? '#2e7d32' : allOne ? '#c62828' : '#555';
  const bg = success ? '#e8f5e9' : allOne ? '#ffebee' : '#1e1e1e';
  const pipFill = success ? '#2e7d32' : allOne ? '#c62828' : '#fff';

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ margin: '2px' }}>
      <rect x="4" y="4" width="92" height="92" rx="16" ry="16"
        fill={bg} stroke={borderColor} strokeWidth="6" />
      {pips.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="10" fill={pipFill} />
      ))}
    </svg>
  );
}

function DiceRow({ values, tn, allOne, size }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {values.map((v, i) => (
        <DieFace key={i} value={v} success={v >= tn} allOne={allOne} size={size} />
      ))}
    </Box>
  );
}

export default function DiceResultOverlay({ result, rolling, onClose }) {
  useEffect(() => {
    if (!result) return;
    const t = setTimeout(onClose, 12000);
    return () => clearTimeout(t);
  }, [result, onClose]);

  if (!result && !rolling) return null;

  const hasRerolls = result?.rerollGroups?.length > 0;

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
        maxWidth: 480,
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

          {/* Initial dice */}
          <DiceRow values={result.values} tn={result.tn} allOne={result.allOnes} size={44} />

          {/* Rule of 6 reroll groups */}
          {hasRerolls && result.rerollGroups.map((group, gi) => (
            <Box key={gi} sx={{ mt: 0.5, pl: 1, borderLeft: '2px solid #ffa726' }}>
              <Typography variant="caption" sx={{ color: '#ffa726', display: 'block', mb: 0.25 }}>
                Rule of 6 — reroll {gi + 1}
              </Typography>
              <DiceRow values={group} tn={result.tn} allOne={false} size={36} />
            </Box>
          ))}

          {/* Summary */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', mt: 1.5 }}>
            {result.allOnes ? (
              <Chip label="RULE OF ONES" size="small" sx={{ background: '#c62828', color: '#fff', fontWeight: 700 }} />
            ) : result.successes === 0 ? (
              <Chip label="No successes" size="small" sx={{ background: '#555', color: '#fff' }} />
            ) : (
              <Chip
                label={`${result.successes} success${result.successes !== 1 ? 'es' : ''}`}
                size="small"
                sx={{ background: '#2e7d32', color: '#fff', fontWeight: 700 }}
              />
            )}
            {hasRerolls && (
              <Typography variant="caption" sx={{ color: '#ffa726' }}>
                (incl. Rule of 6)
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
