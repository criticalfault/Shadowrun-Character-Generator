import React from 'react';
import { Grid } from '@mui/material';
import SRSection from './SRSection';
import ConditionMonitor from '../ConditionMonitor'; // adjust path as needed

const ConditionMonitorBlockCyberDeck = ({ onConditionSelect }) => {
  return (
    <Grid item xs={12}>
      <SRSection title="Condition Monitor">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <ConditionMonitor
            type="Icon"
            key="icon"
            actor="I"
            onConditionSelect={onConditionSelect}
          />
        </div>
      </SRSection>
    </Grid>
  );
};

export default ConditionMonitorBlockCyberDeck;
