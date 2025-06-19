import React from 'react';
import { Grid } from '@mui/material';
import SRSection from './SRSection';

const AttributesBlock = ({ attributes, raceBonuses, cyberBonuses, magicBonuses }) => {
  return (
    <Grid item xs={12} md={6}>
      <SRSection title="Attributes">
        <table className="shadowrun-table">
          <tbody>
            {Object.keys(attributes).map((attr) => {
              const base = parseInt(attributes[attr]);
              const race = parseInt(raceBonuses[attr] ?? 0);
              const cyber = parseInt(cyberBonuses[attr] ?? 0);
              const magic = parseInt(magicBonuses[attr] ?? 0);
              const total = base + race + cyber + magic;

              return (
                <tr key={attr}>
                  <td className="shadowrun-label">{attr}</td>
                  <td className="shadowrun-value">Base: {base}</td>
                  <td className="shadowrun-value">Total: {total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </SRSection>
    </Grid>
  );
};

export default AttributesBlock;