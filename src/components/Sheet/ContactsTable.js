import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SRSection from './SRSection';
import { tablePaperSx } from './sheetTheme';

const LEVEL_LABELS = {
  1: 'Contact',
  2: 'Buddy',
  3: 'Friend For Life',
};

const formatLevel = (level) => {
  if (level === undefined || level === null || level === '') return '—';
  const label = LEVEL_LABELS[Number(level)];
  return label ? `${level} – ${label}` : String(level);
};

// Display-only list of the runner's contacts. Edit them on the Contacts tab.
const ContactsTable = ({ contacts }) => {
  if (!contacts || contacts.length === 0) return null;

  // Archetype isn't editable on the Contacts tab, so only show the column
  // when at least one contact actually has one.
  const showArchetype = contacts.some((c) => c.Archtype);

  return (
    <Grid size={12}>
      <SRSection title="Contacts">
        <TableContainer component={Paper} sx={tablePaperSx}>
          <Table size="small" className="shadowrun-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                {showArchetype && <TableCell>Archetype</TableCell>}
                <TableCell>Level</TableCell>
                <TableCell>Info</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact, index) => (
                <TableRow key={(contact.Name || 'contact') + index}>
                  <TableCell component="th" scope="row">{contact.Name || '—'}</TableCell>
                  {showArchetype && <TableCell>{contact.Archtype ?? ''}</TableCell>}
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>{formatLevel(contact.Level)}</TableCell>
                  <TableCell>{contact.GeneralInfo ?? ''}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SRSection>
    </Grid>
  );
};

export default ContactsTable;
