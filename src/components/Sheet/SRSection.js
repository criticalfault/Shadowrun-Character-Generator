import React from 'react';
import { Paper } from '@mui/material';
import '../SheetDisplay.css';

const SRSection = ({ title, children }) => (
  <Paper className="shadowrun-paper">
    <div className="shadowrun-header">{title}</div>
    {children}
  </Paper>
);

export default SRSection;
