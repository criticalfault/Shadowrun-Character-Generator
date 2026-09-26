import React from 'react';
import { Grid, TextField } from '@mui/material';
import SRSection from './SRSection';
import { inputSx } from './sheetTheme';

const RunnerInfo = ({ character, onChange }) => {
  return (
    <Grid size={12}>
      <SRSection keepTogether title="Runner Info">
        <div style={{ padding: '0 10px' }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 5 }}>
              <TextField
                label="Runner Name"
                fullWidth
                variant="outlined"
                value={character.street_name}
                onChange={(e) => onChange('street_name', e.target.value)}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 8, sm: 5 }}>
              <TextField
                label="Race"
                fullWidth
                variant="outlined"
                value={character.race}
                sx={inputSx}
              />
            </Grid>
            <Grid size={{ xs: 4, sm: 2 }}>
              <TextField
                label="Age"
                fullWidth
                variant="outlined"
                value={character.age}
                onChange={(e) => onChange('age', e.target.value)}
                sx={inputSx}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                minRows={1}
                variant="outlined"
                value={character.description}
                onChange={(e) => onChange('description', e.target.value)}
                sx={inputSx}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Notes"
                fullWidth
                multiline
                minRows={3}
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
