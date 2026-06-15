import React, { useState } from 'react';

const SECTIONS = [
  { label: 'Light',    boxes: 1 },
  { label: 'Moderate', boxes: 2 },
  { label: 'Serious',  boxes: 3 },
  { label: 'Persona\nCrashed', boxes: 4 },
];

const BOX_LABELS = [
  '+1 TN#\n-1 Init.',  // 0 — Light
  '+2 TN#\n-2 Init.',  // 1 — Moderate start
  '',                   // 2
  '+3 TN#\n-3 Init.',  // 3 — Serious start
  '', '',               // 4-5
  '', '', '', '',       // 6-9 — Persona Crashed
];

const PersonaConditionMonitor = ({ iconRating }) => {
  const [filled, setFilled] = useState(0);

  const handleClick = (i) => setFilled(filled === i + 1 ? i : i + 1);

  return (
    <div style={{ padding: '8px 0 4px 0' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
        <div style={{ flex: 1 }}>
          {/* Section header labels */}
          <div style={{ display: 'flex', gap: 2, marginBottom: 2 }}>
            {SECTIONS.map((s) => (
              <div key={s.label} style={{ flex: s.boxes, fontSize: '0.6rem', fontWeight: 600, textAlign: 'center', color: '#333', lineHeight: 1.2, whiteSpace: 'pre-line' }}>
                {s.label}
              </div>
            ))}
          </div>

          {/* Boxes */}
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
        </div>

        {/* Icon Rating box */}
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{ fontSize: '0.6rem', color: '#555', marginBottom: 2 }}>Icon<br />Rating</div>
          <div style={{
            width: 48, height: 40,
            border: '1px solid #000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.9rem', fontWeight: 700, color: '#000',
          }}>
            {iconRating ?? ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaConditionMonitor;
