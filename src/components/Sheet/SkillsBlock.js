import React from 'react';
import { Grid, List, ListItem, ListItemText } from '@mui/material';
import SRSection from './SRSection';

const SkillsBlock = ({ character, edition }) => {
  const renderSR3Skills = () => {
    return character.skills.map((skill, index) => (
      <ListItem key={index} disableGutters>
        <ListItemText
          primary={
            skill.specialization
              ? `${skill.name} (${skill.rating - 1}) → ${skill.specialization} (${skill.rating + 1})`
              : `${skill.name} (${skill.rating})`
          }
          primaryTypographyProps={{
            style: {
              color: '#00ffc3',
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '0.95rem',
            },
          }}
        />
      </ListItem>
    ));
  };

  const renderSR2Skills = () => {
    return character.skills.map((skill, index) => (
      <ListItem key={index} disableGutters>
        <ListItemText
          primary={
            skill.selectedConcentrations.length === 0
              ? `${skill.name} (${skill.rating})`
              : `${skill.name} (${skill.rating}) → ` +
                skill.selectedConcentrations
                  .map((concen) => {
                    if (
                      concen.specializations &&
                      concen.specializations.length > 0
                    ) {
                      return `${concen.name} (${concen.rating}) → ${concen.specializations[0].name} (${concen.rating + 2})`;
                    } else {
                      return `${concen.name} (${concen.rating})`;
                    }
                  })
                  .join(', ')
          }
          primaryTypographyProps={{
            style: {
              color: '#00ffc3',
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '0.95rem',
            },
          }}
        />
      </ListItem>
    ));
  };

  return (
    <Grid item xs={12}>
      <SRSection title="Skills">
        <List dense disablePadding>
          {edition === 'SR3' ? renderSR3Skills() : renderSR2Skills()}
        </List>
      </SRSection>
    </Grid>
  );
};

export default SkillsBlock;