import React from 'react';
import { Grid } from '@mui/material';
import SRSection from './SRSection';

const SkillsBlock = ({ character, edition }) => {
  const renderSR3Skills = () =>
    character.skills.map((skill, index) => (
      <tr key={index}>
        <td className="shadowrun-label">
          {skill.specialization
            ? `${skill.name} (${skill.rating - 1}) → ${skill.specialization}`
            : skill.name}
        </td>
        <td style={{ textAlign: 'center', fontWeight: 700, width: 36 }}>
          {skill.specialization ? skill.rating + 1 : skill.rating}
        </td>
      </tr>
    ));

  const renderSR2Skills = () =>
    character.skills.map((skill, index) => {
      const hasConcentrations = skill.selectedConcentrations?.length > 0;
      return (
        <React.Fragment key={index}>
          <tr>
            <td className="shadowrun-label">{skill.name}</td>
            <td style={{ textAlign: 'center', fontWeight: 700, width: 36 }}>{skill.rating}</td>
          </tr>
          {hasConcentrations && skill.selectedConcentrations.map((c, ci) => {
            const hasSpec = c.specializations?.length > 0;
            return (
              <tr key={ci}>
                <td style={{ paddingLeft: 20, fontSize: '0.8rem', color: '#444' }}>
                  {hasSpec ? `↳ ${c.name} → ${c.specializations[0].name}` : `↳ ${c.name}`}
                </td>
                <td style={{ textAlign: 'center', fontSize: '0.8rem', color: '#444', width: 36 }}>
                  {hasSpec ? c.rating + 2 : c.rating}
                </td>
              </tr>
            );
          })}
        </React.Fragment>
      );
    });

  return (
    <Grid item xs={12}>
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
          </tbody>
        </table>
      </SRSection>
    </Grid>
  );
};

export default SkillsBlock;
