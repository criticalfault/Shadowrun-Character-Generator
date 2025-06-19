import React from 'react';
import { Grid } from '@mui/material';
import SRSection from './SRSection';
import ConditionMonitor from '../ConditionMonitor'; // adjust path as needed

const ConditionMonitorBlock = ({ onConditionSelect }) => {
  return (
    <Grid item xs={12}>
      <SRSection title="Condition Monitor">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <ConditionMonitor
            type="Stun"
            key="stun"
            actor="S"
            onConditionSelect={onConditionSelect}
          />
          <ConditionMonitor
            type="Physical"
            key="physical"
            actor="P"
            onConditionSelect={onConditionSelect}
          />
        </div>
      </SRSection>
    </Grid>
  );
};

export default ConditionMonitorBlock;
