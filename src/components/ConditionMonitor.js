import React, { useState } from 'react';
import './ConditionMonitor.css';

// Damage level section definitions
const SECTIONS = [
  { label: 'Light',    boxes: 2 },
  { label: 'Moderate', boxes: 3 },
  { label: 'Serious',  boxes: 5 },
];

// Text shown inside boxes; index 9 is the "dead" box, handled per type
const BOX_LABELS = [
  '+1 TN\n-1 Init.',   // 0 — Light start
  '',                   // 1
  '+2 TN\n-2 Init.',   // 2 — Moderate start
  '',                   // 3
  '',                   // 4
  '+3 TN\n-3 Init.',   // 5 — Serious start
  '',                   // 6
  '',                   // 7
  '',                   // 8
  null,                 // 9 — last box (Unc. / Unc. Maybe Dead)
];

const ConditionMonitor = ({ type, filled: filledProp, onChange }) => {
  const [localFilled, setLocalFilled] = useState(0);
  const isControlled = filledProp !== undefined && onChange !== undefined;
  const filled = isControlled ? filledProp : localFilled;

  const handleClick = (i) => {
    const next = filled === i + 1 ? i : i + 1;
    if (isControlled) onChange(next);
    else setLocalFilled(next);
  };

  const lastLabel = type === 'Stun' ? 'Unc.' : 'Unc.\nMaybe\nDead';

  return (
    <div className="conditionMonitor">
      <div className="cm-type-label">{type}</div>

      {/* Section header labels */}
      <div className="cm-section-headers">
        {SECTIONS.map((s) => (
          <div key={s.label} className="cm-section-header" style={{ flex: s.boxes }}>
            {s.label}<br />{type === 'Stun' ? 'Stun' : 'Wound'}
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
