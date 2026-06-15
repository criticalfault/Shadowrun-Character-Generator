import React from 'react';
import { Grid } from '@mui/material';
import SRSection from './SRSection';
import ConditionMonitor from '../ConditionMonitor'; // adjust path as needed

const ConditionMonitorBlock = ({ onConditionSelect }) => {
  return (
    <Grid size={12}>
      <SRSection title="Condition Monitor">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <ConditionMonitor type="Stun" key="stun" />
          <ConditionMonitor type="Physical" key="physical" />
        </div>
      </SRSection>
    </Grid>
  );
};

export default ConditionMonitorBlock;
