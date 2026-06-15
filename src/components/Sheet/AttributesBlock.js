import React from 'react';
import { Grid } from '@mui/material';
import SRSection from './SRSection';

const AttributesBlock = ({ attributes, raceBonuses = {}, cyberBonuses = {}, magicBonuses = {}, Cyberware = [] }) => {
  const CalcEssenceSpent = () => {
    let EssenceSpent = 0;
    let EyeEssenceSpent = 0;
    let ReplacedCyberEyes = false;
    Cyberware.forEach((cyber) => {
      if (cyber.hasOwnProperty('Replacement') && cyber.Replacement === true) {
        ReplacedCyberEyes = true;
      }
      if (cyber.Type === 'EYES' && !cyber.hasOwnProperty('Replacement')) {
        EyeEssenceSpent += parseFloat(cyber.EssCost);
      } else {
        EssenceSpent += parseFloat(cyber.EssCost);
      }
    });
    if (ReplacedCyberEyes) {
      if (EyeEssenceSpent - 0.5 > 0) EssenceSpent += EyeEssenceSpent - 0.5;
    } else {
      EssenceSpent += EyeEssenceSpent;
    }
    return (6 - EssenceSpent).toFixed(2);
  };

  attributes['Reaction'] = (attributes['Quickness'] + attributes['Willpower']) / 2;

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <SRSection title="Attributes">
        <table className="shadowrun-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Attribute</th>
              <th style={{ textAlign: 'center' }}>Base</th>
              <th style={{ textAlign: 'center' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(attributes).map((attr) => {
              if (attr === 'Essence') return null;
              if (attr === 'Magic' && attributes[attr] === 0) return null;
              const base  = parseInt(attributes[attr]);
              const race  = parseInt(raceBonuses[attr]  ?? 0);
              const cyber = parseInt(cyberBonuses[attr] ?? 0);
              const magic = parseInt(magicBonuses[attr] ?? 0);
              const total = base + race + cyber + magic;
              return (
                <tr key={attr}>
                  <td className="shadowrun-label">{attr}</td>
                  <td style={{ textAlign: 'center' }}>{base}</td>
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>{total}</td>
                </tr>
              );
            })}
            <tr>
              <td className="shadowrun-label">Essence</td>
              <td style={{ textAlign: 'center' }}>6</td>
              <td style={{ textAlign: 'center', fontWeight: 700 }}>{CalcEssenceSpent()}</td>
            </tr>
          </tbody>
        </table>
      </SRSection>
    </Grid>
  );
};

export default AttributesBlock;
