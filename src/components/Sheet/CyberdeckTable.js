import React, {useState} from "react";
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
import ConditionMonitorBlockCyberDeck from './ConditionMonitorBlockCyberDeck';


const CyberdeckTable = (props) => {
  if (!props.Decks || props.Decks.length === 0) return null;
  const handleConditionSelect = () => {};
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

  const [SelectedCyberdecks, setSelectedCyberdecks] = useState(props.Decks);

  const handleProgramToggle = (event, index, index2) => {
    let programIndex = index2;
    const editedcyberdecks = [...props.Decks];
    editedcyberdecks[index].ProgramsInStorage[programIndex].Loaded = !editedcyberdecks[index].ProgramsInStorage[programIndex].Loaded;
    setSelectedCyberdecks(editedcyberdecks);
    props.onChangeDeck(editedcyberdecks);
  };

  return (
    <Grid item xs={12}>
      <SRSection title="Cyberdecks">
        {props.Decks.map((deck, index) => (
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
            <Grid item size={12}>
              <ConditionMonitorBlockCyberDeck onConditionSelect={handleConditionSelect} />
            </Grid>
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
                      <TableCell>Loaded</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Multiplyer</TableCell>
                      <TableCell>Size</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {deck.ProgramsInStorage.map((program, index2) => (
                      <TableRow key={index2 + program.Name}>
                        <TableCell>
                          <input
                            type="checkbox"
                            data-index={index}
                            checked={program.Loaded === true}
                            onChange={(event) =>
                              handleProgramToggle(event, index, index2)
                            }
                          />
                        </TableCell>
                        <TableCell>{program.Name}</TableCell>
                        <TableCell>{program.Rating}</TableCell>
                        <TableCell>{program.Multiplyer}</TableCell>
                        <TableCell>{program.Size}</TableCell>
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