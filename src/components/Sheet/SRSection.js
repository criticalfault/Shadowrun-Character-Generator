import React from 'react';
import { Paper } from '@mui/material';
import '../SheetDisplay.css';

// keepTogether: small fixed-size blocks that should never split across
// printed pages. Long tables leave it off so they can flow onto the next page.
const SRSection = ({ title, children, keepTogether = false }) => (
  <Paper className={`shadowrun-paper${keepTogether ? ' sr-keep-together' : ''}`}>
    <div className="shadowrun-header">{title}</div>
    {children}
  </Paper>
);

export default SRSection;
