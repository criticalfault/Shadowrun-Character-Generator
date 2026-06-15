import React, { useState } from 'react';
import './ConditionMonitor.css';

// Damage level section definitions
const SECTIONS = [
  { label: 'Light',    boxes: 1 },
  { label: 'Moderate', boxes: 2 },
  { label: 'Serious',  boxes: 3 },
  { label: 'Deadly',   boxes: 4 },
];

// Text shown inside the first box of each section
const BOX_LABELS = [
  '+1 TN\n-1 Init.',   // box 0 — Light
  '+2 TN\n-2 Init.',   // box 1 — Moderate start
  '',                   // box 2
  '+3 TN\n-3 Init.',   // box 3 — Serious start
  '', '',               // boxes 4-5
  '', '', '',           // boxes 6-8 — Deadly
  null,                 // box 9 — last box, handled per type
];

const ConditionMonitor = ({ type }) => {
  const [filled, setFilled] = useState(0);

  const handleClick = (i) => {
    // clicking a filled box unfills from that point; clicking empty fills up to it
    setFilled(filled === i + 1 ? i : i + 1);
  };

  const lastLabel = type === 'Stun' ? 'Unc.' : 'Unc.\nMaybe\nDead';

  return (
    <div className="conditionMonitor">
      <div className="cm-type-label">{type}</div>

      {/* Section header labels */}
      <div className="cm-section-headers">
        {SECTIONS.map((s) => (
          <div key={s.label} className="cm-section-header" style={{ flex: s.boxes }}>
            {s.label}<br />
            {type === 'Stun' ? 'Stun' : 'Wound'}
          </div>
        ))}
      </div>

      {/* Box row */}
      <div className="cm-boxes">
        {BOX_LABELS.map((label, i) => {
          const isFilled = i < filled;
          const displayLabel = i === 9 ? lastLabel : label;
          return (
            <div
              key={i}
              className={`cm-box${isFilled ? ' cm-box-filled' : ''}`}
              onClick={() => handleClick(i)}
            >
              {displayLabel && displayLabel.split('\n').map((line, j) => (
                <span key={j} className="cm-box-line">{line}</span>
              ))}
            </div>
          );
        })}
      </div>

      {/* Physical overflow box */}
      {type === 'Physical' && (
        <div className="cm-overflow">
          <span className="cm-overflow-label">Physical Damage Overflow</span>
          <div className="cm-overflow-box" />
        </div>
      )}
    </div>
  );
};

export default ConditionMonitor;
