import React from 'react';
import { Grid } from '@mui/material';
import SRSection from './SRSection';
import ConditionMonitor from '../ConditionMonitor'; // adjust path as needed

const ConditionMonitorBlock = ({ stunDamage, physicalDamage, onChangeStun, onChangePhysical }) => {
  return (
    <Grid size={12}>
      <SRSection title="Condition Monitor">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <ConditionMonitor type="Stun" filled={stunDamage ?? 0} onChange={onChangeStun} />
          <ConditionMonitor type="Physical" filled={physicalDamage ?? 0} onChange={onChangePhysical} />
        </div>
      </SRSection>
    </Grid>
  );
};

export default ConditionMonitorBlock;
