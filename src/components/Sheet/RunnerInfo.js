import React from 'react';
import { Grid, TextField } from '@mui/material';
import SRSection from './SRSection';
import { inputSx } from './sheetTheme';

const RunnerInfo = ({ character, onChange }) => {
  return (
    <Grid item xs={12}>
      <SRSection title="Runner Info">
        <div style={{ padding: '0 10px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Runner Name"
                fullWidth
                variant="outlined"
                value={character.street_name}
                onChange={(e) => onChange('street_name', e.target.value)}
                sx={inputSx}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Race"
                fullWidth
                variant="outlined"
                value={character.race}
                sx={inputSx}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Age"
                fullWidth
                variant="outlined"
                value={character.age}
                onChange={(e) => onChange('age', e.target.value)}
                sx={inputSx}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                variant="outlined"
                value={character.description}
                onChange={(e) => onChange('description', e.target.value)}
                sx={inputSx}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                value={character.notes}
                onChange={(e) => onChange('notes', e.target.value)}
                sx={inputSx}
              />
            </Grid>
          </Grid>
        </div>
      </SRSection>
    </Grid>
  );
};

export default RunnerInfo;
