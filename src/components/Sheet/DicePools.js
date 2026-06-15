import React from 'react';
import { Grid } from '@mui/material';
import SRSection from './SRSection';

const DicePools = ({ character, edition, magicalChoice }) => {
  const cyber = character.cyberAttributeBonuses || {};
  const race  = character.raceBonuses || {};
  const magic = character.magicalAttributeBonuses || {};

  const getAttr = (name) =>
    parseInt(character.attributes[name]) +
    parseInt(race[name]  ?? 0) +
    parseInt(cyber[name] ?? 0) +
    parseInt(magic[name] ?? 0);

  const pools = [];

  // Combat Pool
  const combatPool = Math.floor(
    (getAttr('Quickness') + getAttr('Intelligence') + getAttr('Willpower')) / 2
  ) + (magic.Combat_Pool ?? 0);
  pools.push({ label: 'Combat Pool', value: combatPool });

  // Spell Pool
  if (character.magical && magicalChoice !== 'Physical Adept') {
    let spellPool = 0;
    if (edition === 'SR3') {
      spellPool = Math.floor(
        (parseInt(character.attributes.Magic) + getAttr('Intelligence') + getAttr('Willpower')) / 3
      );
    } else {
      character.skills.forEach((skill) => {
        if (skill.name === 'Sorcery') {
          spellPool = skill.selectedConcentrations?.length > 0
            ? Math.max(...skill.selectedConcentrations.map((s) => s.rating))
            : skill.rating;
        }
      });
    }
    pools.push({ label: 'Spell Pool', value: spellPool });
  }

  // Astral Combat Pool
  if (character.magical) {
    const astral = Math.floor(
      (getAttr('Charisma') + getAttr('Intelligence') + getAttr('Willpower')) / 2
    );
    pools.push({ label: 'Astral Combat Pool', value: astral });
  }

  // Hacking Pool
  let hackingPool = 0;
  if (edition === 'SR3') {
    let MPCP = character.decks?.length ? character.decks[0].Persona : 0;
    hackingPool = Math.floor((getAttr('Intelligence') + parseInt(MPCP)) / 3) + (cyber.Hacking_Pool ?? 0);
  } else {
    character.skills.forEach((skill) => {
      if (skill.name === 'Computer') {
        hackingPool = skill.selectedConcentrations?.length > 0
          ? Math.max(...skill.selectedConcentrations.map((s) => s.rating))
          : skill.rating;
      }
    });
  }
  if (hackingPool) pools.push({ label: 'Hacking Pool', value: hackingPool });

  // Task Pool
  if (cyber.Task_Pool) pools.push({ label: 'Task Pool', value: parseInt(cyber.Task_Pool) });

  // Control Pool
  if (cyber.Vehicle_Control_Rig_Level) {
    const reaction = Math.floor((getAttr('Quickness') + getAttr('Intelligence')) / 2);
    const vcrBonus = cyber.Vehicle_Control_Reaction ?? 0;
    pools.push({ label: `Control Pool (VCR ${cyber.Vehicle_Control_Rig_Level})`, value: reaction + vcrBonus });
  }

  // Karma Pool
  if (character.karmaPool > 0) pools.push({ label: 'Karma Pool', value: parseInt(character.karmaPool) });

  return (
    <Grid item xs={12}>
      <SRSection title="Dice Pools">
        <table className="shadowrun-table" style={{ width: '100%' }}>
          <tbody>
            {pools.map((pool) => (
              <tr key={pool.label}>
                <td className="shadowrun-label">{pool.label}</td>
                <td style={{ textAlign: 'center', fontWeight: 700, width: 48 }}>{pool.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SRSection>
    </Grid>
  );
};

export default DicePools;
