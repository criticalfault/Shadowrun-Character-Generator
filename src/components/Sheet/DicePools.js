import React from 'react';
import { Grid, TextField } from '@mui/material';
import SRSection from './SRSection';

const DicePools = ({ character, edition, magicalChoice }) => {
  const cyber = character.cyberAttributeBonuses || {};
  const race = character.raceBonuses || {};
  const magic = character.magicalAttributeBonuses || {};

  const getAttr = (name) =>
    parseInt(character.attributes[name]) +
    parseInt(race[name] ?? 0) +
    parseInt(cyber[name] ?? 0) +
    parseInt(magic[name] ?? 0);

  const pools = [];

  // Combat Pool
  const combatPool = Math.floor(
    (getAttr('Quickness') + getAttr('Intelligence') + getAttr('Willpower')) / 2
  ) + (magic.Combat_Pool ?? 0);

  pools.push({ label: 'Combat', value: combatPool });

  // Spell Pool
  if (character.magical && magicalChoice !== 'Physical Adept') {
    let spellPool = 0;
    if (edition === 'SR3') {
      spellPool = Math.floor(
        (parseInt(character.attributes.Magic) +
          getAttr('Intelligence') +
          getAttr('Willpower')) /
          3
      );
    } else {
      character.skills.forEach((skill) => {
        if (skill.name === 'Sorcery') {
          if (skill.selectedConcentrations?.length > 0) {
            spellPool = Math.max(
              ...skill.selectedConcentrations.map((s) => s.rating)
            );
          } else {
            spellPool = skill.rating;
          }
        }
      });
    }
    pools.push({ label: 'Spell', value: spellPool });
  }

  // Astral Combat Pool
  if (character.magical) {
    const astral = Math.floor(
      (getAttr('Charisma') + getAttr('Intelligence') + getAttr('Willpower')) / 2
    );
    pools.push({ label: 'Astral Combat', value: astral });
  }

  // Hacking Pool
  let hackingPool = 0;
  if (edition === 'SR3') {
    let MPCP = 0;
    if (character.decks?.length) {
      MPCP = character.decks[0].Persona;
    }
    hackingPool =
      Math.floor((getAttr('Intelligence') + parseInt(MPCP)) / 3) +
      (cyber.Hacking_Pool ?? 0);
  } else {
    character.skills.forEach((skill) => {
      if (skill.name === 'Computer') {
        if (skill.selectedConcentrations?.length > 0) {
          hackingPool = Math.max(
            ...skill.selectedConcentrations.map((s) => s.rating)
          );
        } else {
          hackingPool = skill.rating;
        }
      }
    });
  }
  if (hackingPool) pools.push({ label: 'Hacking', value: hackingPool });

  // Task Pool
  if (cyber.Task_Pool) {
    pools.push({ label: 'Task', value: parseInt(cyber.Task_Pool) });
  }

  // Control Pool
  if (cyber.Vehicle_Control_Rig_Level) {
    const controlPool = Math.floor(
      (getAttr('Quickness') + getAttr('Intelligence')) / 2
    ) + (cyber.Vehicle_Control_Reaction ?? 0);
    pools.push({ label: 'Control', value: controlPool });
  }

  // Karma Pool
  if (character.karmaPool > 0) {
    pools.push({ label: 'Karma', value: parseInt(character.karmaPool) });
  }

  return (
    <Grid item xs={12} md={4}>
      <SRSection title="Dice Pools">
        {pools.map((pool, index) => (
          <TextField
            key={index}
            className="pool_display"
            label={pool.label}
            type="text"
            variant="outlined"
            value={pool.value}
            fullWidth
            InputLabelProps={{ style: { color: '#00ffc3' } }}
            InputProps={{
              style: {
                color: '#00ffc3',
                fontFamily: 'Share Tech Mono, monospace',
              },
              readOnly: true,
            }}
            sx={{ mb: 2 }}
          />
        ))}
      </SRSection>
    </Grid>
  );
};

export default DicePools;