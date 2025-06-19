import React from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import SRSection from './SRSection';

const CyberdeckTable = ({ decks }) => {
  if (!decks || decks.length === 0) return null;

  const CalcMemoryUsed = (deck) => {
    let memoryUsed = 0;
    deck.ProgramsInStorage.forEach(function (prog) {
      if (prog.Loaded) {
        memoryUsed += prog.Size;
      }
    });
    return memoryUsed;
  };

  const CalcStorageUsed = (deck) => {
    let storageUsed = 0;
    deck.ProgramsInStorage.forEach(function (prog) {
      storageUsed += prog.Size;
    });
    return storageUsed;
  };


  console.log(decks)
  return (
    <Grid item xs={12}>
      <SRSection title="Cyberdecks">
        {decks.map((deck, index) => (
          <TableContainer
            component={Paper}
            key={deck.Name + index}
            sx={{ backgroundColor: '#1f1f1f', mb: 4 }}
          >
            <Typography
              variant="h6"
              sx={{
                padding: '0.5rem 1rem',
                fontFamily: 'Share Tech Mono, monospace',
                color: '#00ffc3',
              }}
            >
              {deck.Name}
            </Typography>
            <Table size="small" className="shadowrun-table">
              <TableHead>
                <TableRow>
                  <TableCell>MPCP</TableCell>
                  <TableCell align="right">Bod</TableCell>
                  <TableCell align="right">Evasion</TableCell>
                  <TableCell align="right">Masking</TableCell>
                  <TableCell align="right">Sensors</TableCell>
                  <TableCell align="right">Active Memory</TableCell>
                  <TableCell align="right">Storage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{deck.Persona}</TableCell>
                  <TableCell align="right">{deck.Bod}</TableCell>
                  <TableCell align="right">{deck.Evasion}</TableCell>
                  <TableCell align="right">{deck.Masking}</TableCell>
                  <TableCell align="right">{deck.Sensors}</TableCell>
                  <TableCell align="right">{deck.Memory}/{CalcMemoryUsed(deck)}</TableCell>
                  <TableCell align="right">{deck.Storage}/{CalcStorageUsed(deck)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Options */}
            {deck.Options && deck.Options.length > 0 && (
              <>
                <Typography
                  variant="subtitle1"
                  sx={{
                    margin: '1rem 1rem 0 1rem',
                    fontFamily: 'Share Tech Mono, monospace',
                    color: '#00ffc3',
                  }}
                >
                  Options
                </Typography>
                <Table size="small" className="shadowrun-table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Rating</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {deck.Options.map((opt, idx) => (
                      <TableRow key={opt.Name + idx}>
                        <TableCell>{opt.Name}</TableCell>
                        <TableCell align="right">{opt.Rating}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}

            {/* Programs */}
            {deck.ProgramsInStorage && deck.ProgramsInStorage.length > 0 && (
              <>
                <Typography
                  variant="subtitle1"
                  sx={{
                    margin: '1rem 1rem 0 1rem',
                    fontFamily: 'Share Tech Mono, monospace',
                    color: '#00ffc3',
                  }}
                >
                  Programs
                </Typography>
                <Table size="small" className="shadowrun-table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Rating</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {deck.ProgramsInStorage.map((prog, idx) => (
                      <TableRow key={prog.Name + idx}>
                        <TableCell>{prog.Name}</TableCell>
                        <TableCell align="right">{prog.Rating}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </TableContainer>
        ))}
      </SRSection>
    </Grid>
  );
};

export default CyberdeckTable;