import React from 'react';
import { Grid, TextField } from '@mui/material';
import SRSection from './SRSection';

const RunnerInfo = ({ character, onChange }) => {
  return (
    <Grid item xs={12}>
      <SRSection title="Runner Info">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Runner Name"
              fullWidth
              variant="outlined"
              value={character.street_name}
              onChange={(e) => onChange('street_name', e.target.value)}
              InputLabelProps={{ style: { color: '#00ffc3' } }}
              InputProps={{
                style: {
                  color: '#00ffc3',
                  fontFamily: 'Share Tech Mono, monospace',
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#00ffc3',
                  fontFamily: 'Share Tech Mono, monospace',
                  '& fieldset': {
                    borderColor: '#00ffc3',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff3c3c',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00ffc3',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#00ffc3',
                },
                '& label.Mui-focused': {
                  color: '#00ffc3',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Race"
              fullWidth
              variant="outlined"
              value={character.race}
              InputLabelProps={{ style: { color: '#00ffc3' } }}
              InputProps={{
                style: {
                  color: '#00ffc3',
                  fontFamily: 'Share Tech Mono, monospace',
                },
              }}
              sx={{
                '& .MuiOutlinedInput-notchedOutline':{
                  color: '#00ffc3',
                  border:"solid 1px #00ffc3"
                },
                '& .MuiOutlinedInput-root': {
                  color: '#00ffc3',
                  fontFamily: 'Share Tech Mono, monospace',
                  '& fieldset': {
                    borderColor: '#00ffc3',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff3c3c',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00ffc3',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#00ffc3',
                },
                '& label.Mui-focused': {
                  color: '#00ffc3',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Age"
              fullWidth
              variant="outlined"
              value={character.age}
              onChange={(e) => onChange('age', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#00ffc3',
                  fontFamily: 'Share Tech Mono, monospace',
                  '& fieldset': {
                    borderColor: '#00ffc3',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff3c3c',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00ffc3',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#00ffc3',
                },
                '& label.Mui-focused': {
                  color: '#00ffc3',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              variant="outlined"
              value={character.description}
              onChange={(e) => onChange('description', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#00ffc3',
                  fontFamily: 'Share Tech Mono, monospace',
                  '& fieldset': {
                    borderColor: '#00ffc3',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff3c3c',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00ffc3',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#00ffc3',
                },
                '& label.Mui-focused': {
                  color: '#00ffc3',
                },
              }}
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#00ffc3',
                  fontFamily: 'Share Tech Mono, monospace',
                  '& fieldset': {
                    borderColor: '#00ffc3',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff3c3c',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00ffc3',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#00ffc3',
                },
                '& label.Mui-focused': {
                  color: '#00ffc3',
                },
              }}
            />
          </Grid>
        </Grid>
      </SRSection>
    </Grid>
  );
};

export default RunnerInfo;