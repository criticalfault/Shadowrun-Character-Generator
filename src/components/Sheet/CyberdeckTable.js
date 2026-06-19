import React, { useState } from "react";
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
import { tablePaperSx } from './sheetTheme';
import PersonaConditionMonitor from './PersonaConditionMonitor';


const CyberdeckTable = (props) => {
  if (!props.Decks || props.Decks.length === 0) return null;

  const character = props.character || {};
  const cyber = character.cyberAttributeBonuses || {};
  const race = character.raceBonuses || {};
  const magic = character.magicalAttributeBonuses || {};

  const getAttr = (name) =>
    parseInt(character.attributes?.[name] ?? 0) +
    parseInt(race[name] ?? 0) +
    parseInt(cyber[name] ?? 0) +
    parseInt(magic[name] ?? 0);

  const INT = getAttr('Intelligence');

  const calcHackingPool = (mpcp) =>
    Math.floor((INT + parseInt(mpcp || 0)) / 3) + (cyber.Hacking_Pool ?? 0);

  const calcMatrixReaction = (deck) => {
    const ri = parseInt(deck['Response Increase'] || deck.ResponseIncrease || 0);
    return INT + ri * 2;
  };

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

  const handleIconDamage = (index, val) => {
    const edited = props.Decks.map((d, i) => i === index ? { ...d, iconDamage: val } : d);
    setSelectedCyberdecks(edited);
    props.onChangeDeck(edited);
  };

  return (
    <Grid size={12}>
      <SRSection title="Cyberdecks">
        {props.Decks.map((deck, index) => {
          const mpcp = deck.Persona;
          const hackingPool = calcHackingPool(mpcp);
          const matrixReaction = calcMatrixReaction(deck);
          const ri = parseInt(deck['Response Increase'] || deck.ResponseIncrease || 0);

          return (
            <TableContainer
              component={Paper}
              key={deck.Name + index}
              sx={{ ...tablePaperSx, mb: 4, border: '1px solid #bbb' }}
            >
              <Typography
                variant="h6"
                sx={{
                  padding: '0.4rem 1rem',
                  fontFamily: 'inherit',
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  borderBottom: '1px solid #ddd',
                }}
              >
                {deck.Name}
              </Typography>

              {/* Persona attributes */}
              <Table size="small" className="shadowrun-table">
                <TableHead>
                  <TableRow>
                    <TableCell>MPCP</TableCell>
                    <TableCell align="right">Bod</TableCell>
                    <TableCell align="right">Evasion</TableCell>
                    <TableCell align="right">Masking</TableCell>
                    <TableCell align="right">Sensors</TableCell>
                    <TableCell align="right">Hardening</TableCell>
                    <TableCell align="right">Active Memory</TableCell>
                    <TableCell align="right">Storage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{mpcp}</TableCell>
                    <TableCell align="right">{deck.Bod}</TableCell>
                    <TableCell align="right">{deck.Evasion}</TableCell>
                    <TableCell align="right">{deck.Masking}</TableCell>
                    <TableCell align="right">{deck.Sensors}</TableCell>
                    <TableCell align="right">{deck.Hardening}</TableCell>
                    <TableCell align="right">{deck.Memory}/{CalcMemoryUsed(deck)}</TableCell>
                    <TableCell align="right">{deck.Storage}/{CalcStorageUsed(deck)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {/* Matrix combat stats */}
              <Table size="small" className="shadowrun-table" sx={{ mt: 1 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Hacking Pool</TableCell>
                    <TableCell align="right">Matrix Reaction</TableCell>
                    <TableCell align="right">Matrix Initiative</TableCell>
                    <TableCell align="right">I/O Speed</TableCell>
                    <TableCell align="right">Response Increase</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{hackingPool}</TableCell>
                    <TableCell align="right">{matrixReaction}</TableCell>
                    <TableCell align="right">{matrixReaction} + 3D6</TableCell>
                    <TableCell align="right">{deck['I/O Speed'] || deck.IOSpeed || '—'}</TableCell>
                    <TableCell align="right">{ri}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Grid size={12}>
                <PersonaConditionMonitor
                  iconRating={mpcp}
                  filled={deck.iconDamage ?? 0}
                  onChange={(val) => handleIconDamage(index, val)}
                />
              </Grid>

              {/* Programs */}
              {deck.ProgramsInStorage && deck.ProgramsInStorage.length > 0 && (
                <>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      margin: '1rem 1rem 0 1rem',
                      fontFamily: 'inherit',
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: '0.85rem',
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
          );
        })}
      </SRSection>
    </Grid>
  );
};

export default CyberdeckTable;
