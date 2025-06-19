import React from 'react';
import { Paper } from '@mui/material';
import '../SheetDisplay.css'; // Use existing styling

const SRSection = ({ title, children }) => (
  <Paper className="shadowrun-paper">
    <div className="shadowrun-header">[ {title.toUpperCase()} ]</div>
    {children}
  </Paper>
);

export default SRSection;