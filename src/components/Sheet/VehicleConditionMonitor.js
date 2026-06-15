import React, { useState } from 'react';

const SECTIONS = [
  { label: 'Light\nDamage',    boxes: 1 },
  { label: 'Moderate\nDamage', boxes: 2 },
  { label: 'Serious\nDamage',  boxes: 3 },
  { label: 'Destroyed',        boxes: 4 },
];

const BOX_LABELS = [
  '+1TN #\n-1 Init.',  // 0 — Light
  '+2TN #\n-2 Init.',  // 1 — Moderate start
  '',                   // 2
  '+3TN #\n-3 Init.',  // 3 — Serious start
  '', '',               // 4-5
  '', '', '',           // 6-8 — Destroyed
  'Crash\nTest',        // 9
];

// Speed reduction label that appears below certain boxes (by box index)
const SPEED_LABELS = {
  0: 'NA',
  1: '25%',
  3: '50%',
};

const VehicleConditionMonitor = () => {
  const [filled, setFilled] = useState(0);

  const handleClick = (i) => setFilled(filled === i + 1 ? i : i + 1);

  return (
    <div style={{ padding: '6px 8px 8px 8px', borderTop: '1px solid #ddd' }}>
      <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: '#555', letterSpacing: '0.04em', marginBottom: 4 }}>
        Condition Monitor
      </div>

      {/* Section header labels */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        {SECTIONS.map((s) => (
          <div key={s.label} style={{ flex: s.boxes, fontSize: '0.6rem', fontWeight: 600, textAlign: 'center', color: '#333', lineHeight: 1.2, whiteSpace: 'pre-line' }}>
            {s.label}
          </div>
        ))}
      </div>

      {/* Box row */}
      <div style={{ display: 'flex', gap: 2 }}>
        {BOX_LABELS.map((label, i) => {
          const isFilled = i < filled;
          return (
            <div
              key={i}
              onClick={() => handleClick(i)}
              style={{
                flex: 1,
                minHeight: 40,
                border: '1px solid #000',
                backgroundColor: isFilled ? '#333' : 'transparent',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px 1px',
                userSelect: 'none',
              }}
            >
              {label && label.split('\n').map((line, j) => (
                <span key={j} style={{ fontSize: '0.55rem', lineHeight: 1.3, textAlign: 'center', color: isFilled ? '#fff' : '#000', display: 'block' }}>
                  {line}
                </span>
              ))}
            </div>
          );
        })}
      </div>

      {/* Speed rating reduction row */}
      <div style={{ display: 'flex', gap: 2, marginTop: 2 }}>
        {BOX_LABELS.map((_, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: '0.6rem', color: '#555', minHeight: 14 }}>
            {SPEED_LABELS[i] ?? ''}
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', fontSize: '0.6rem', color: '#555', marginTop: 1 }}>
        Speed Rating Reduction
      </div>
    </div>
  );
};

export default VehicleConditionMonitor;
