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

// A single die face. Shows pip dots for 1-6; shows accumulated number for > 6.
function DieFace({ initial, total, tn, allOne, size = 44 }) {
  const success = total >= tn;
  const isAllOne = allOne && initial === 1;
  const wasRerolled = total > initial;

  const borderColor = success ? '#2e7d32' : isAllOne ? '#c62828' : '#555';
  const bg = success ? '#e8f5e9' : isAllOne ? '#ffebee' : '#1e1e1e';
  const pipFill = success ? '#2e7d32' : isAllOne ? '#c62828' : '#fff';
  const fontSize = size * 0.28;

  return (
    <Box sx={{ position: 'relative', display: 'inline-block', m: '2px' }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <rect x="4" y="4" width="92" height="92" rx="16" ry="16"
          fill={bg} stroke={borderColor} strokeWidth="6" />
        {total <= 6
          ? (pipPositions[total] ?? []).map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="10" fill={pipFill} />
            ))
          : (
              <text x="50" y="62" textAnchor="middle"
                fontSize="38" fontWeight="bold"
                fill={success ? '#2e7d32' : '#fff'}>
                {total}
              </text>
            )
        }
      </svg>
      {/* Small badge on rerolled dice to show the initial 6 */}
      {wasRerolled && (
        <Box sx={{
          position: 'absolute', top: -4, right: -4,
          background: '#ffa726', color: '#000',
          borderRadius: '50%', width: 16, height: 16,
          fontSize: 10, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          lineHeight: 1,
        }}>
          6
        </Box>
      )}
    </Box>
  );
}

export default function DiceResultOverlay({ result, rolling, onClose }) {
  useEffect(() => {
    if (!result) return;
    const t = setTimeout(onClose, 15000);
    return () => clearTimeout(t);
  }, [result, onClose]);

  if (!result && !rolling) return null;

  const hasRule6 = result?.dice?.some((d) => d.total > d.initial);

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
        maxWidth: 520,
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
            {result.dice.map((d, i) => (
              <DieFace
                key={i}
                initial={d.initial}
                total={d.total}
                tn={result.tn}
                allOne={result.allOnes}
                size={44}
              />
            ))}
          </Box>

          {hasRule6 && (
            <Typography variant="caption" sx={{ color: '#ffa726', display: 'block', mb: 1 }}>
              Orange badge = die was rerolled (Rule of 6). Number shown is accumulated total.
            </Typography>
          )}

          {/* Summary */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
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
            {hasRule6 && (
              <Typography variant="caption" sx={{ color: '#ffa726' }}>(incl. Rule of 6)</Typography>
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
