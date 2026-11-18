import React from 'react';
import { Grid } from '@mui/material';
import SRSection from './SRSection';
import { useDice } from '../../dice/DiceContext';
import { getChippedSkills } from '../../utils/chipware';

const rollableTr = {
  cursor: 'pointer',
  transition: 'background 0.15s',
};
const rollableTrHover = (e) => { e.currentTarget.style.background = 'rgba(25,118,210,0.08)'; };
const rollableTrLeave = (e) => { e.currentTarget.style.background = ''; };

const SkillsBlock = ({ character, edition }) => {
  const dice = useDice();

  const handleSkillClick = (name, pool) => {
    if (!dice) return;
    dice.openRoll({ label: name, pool, tn: 4 });
  };

  const renderSR3Skills = () =>
    character.skills.map((skill, index) => {
      const effectiveRating = skill.specialization ? skill.rating + 1 : skill.rating;
      return (
        <tr key={index} style={rollableTr}
          onMouseEnter={rollableTrHover} onMouseLeave={rollableTrLeave}
          onClick={() => handleSkillClick(
            skill.specialization ? `${skill.name} (${skill.specialization})` : skill.name,
            effectiveRating
          )}
          title={`Click to roll ${effectiveRating}d6`}
        >
          <td className="shadowrun-label">
            {skill.specialization
              ? `${skill.name} (${skill.rating - 1}) → ${skill.specialization}`
              : skill.name}
          </td>
          <td style={{ textAlign: 'center', fontWeight: 700, width: 36 }}>
            {effectiveRating}
          </td>
        </tr>
      );
    });

  const renderSR2Skills = () =>
    character.skills.map((skill, index) => {
      const hasConcentrations = skill.selectedConcentrations?.length > 0;
      return (
        <React.Fragment key={index}>
          <tr style={rollableTr}
            onMouseEnter={rollableTrHover} onMouseLeave={rollableTrLeave}
            onClick={() => handleSkillClick(skill.name, skill.rating)}
            title={`Click to roll ${skill.rating}d6`}
          >
            <td className="shadowrun-label">{skill.name}</td>
            <td style={{ textAlign: 'center', fontWeight: 700, width: 36 }}>{skill.rating}</td>
          </tr>
          {hasConcentrations && skill.selectedConcentrations.map((c, ci) => {
            const hasSpec = c.specializations?.length > 0;
            const concRating = hasSpec ? c.rating + 2 : c.rating;
            const label = hasSpec ? `${skill.name} → ${c.name} → ${c.specializations[0].name}` : `${skill.name} → ${c.name}`;
            return (
              <tr key={ci} style={rollableTr}
                onMouseEnter={rollableTrHover} onMouseLeave={rollableTrLeave}
                onClick={() => handleSkillClick(label, concRating)}
                title={`Click to roll ${concRating}d6`}
              >
                <td style={{ paddingLeft: 20, fontSize: '0.8rem', color: '#444' }}>
                  {hasSpec ? `↳ ${c.name} → ${c.specializations[0].name}` : `↳ ${c.name}`}
                </td>
                <td style={{ textAlign: 'center', fontSize: '0.8rem', color: '#444', width: 36 }}>
                  {concRating}
                </td>
              </tr>
            );
          })}
        </React.Fragment>
      );
    });

  // Skills granted by slotted chips. ActiveSofts above the Skillwires rating
  // (or with no Skillwires at all) don't work, so they're left off the sheet.
  const renderChippedSkills = () =>
    getChippedSkills(character)
      .filter((s) => s.active)
      .map((s, index) => (
        <tr key={`chip-${index}`} style={rollableTr}
          onMouseEnter={rollableTrHover} onMouseLeave={rollableTrLeave}
          onClick={() => handleSkillClick(`${s.name} (chip)`, s.rating)}
          title={`${s.holder} — click to roll ${s.rating}d6`}
        >
          <td className="shadowrun-label">
            {s.name}
            <span className="sr-chip-tag">chip</span>
          </td>
          <td style={{ textAlign: 'center', fontWeight: 700, width: 36 }}>{s.rating}</td>
        </tr>
      ));

  return (
    <Grid size={12}>
      <SRSection title="Skills">
        <table className="shadowrun-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Skill</th>
              <th style={{ textAlign: 'center', width: 36 }}>Rtg</th>
            </tr>
          </thead>
          <tbody>
            {edition === 'SR3' ? renderSR3Skills() : renderSR2Skills()}
            {renderChippedSkills()}
          </tbody>
        </table>
      </SRSection>
    </Grid>
  );
};

export default SkillsBlock;
