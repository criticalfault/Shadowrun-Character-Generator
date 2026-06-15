import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import SearchableSelect from "./SearchableSelect";
import "./DeckingPanel.css";

// Pre-import all edition data so Vite can bundle them (no runtime require)
const allCyberdecks = import.meta.glob('../data/*/Cyberdeck.json', { eager: true });
const allPrograms = import.meta.glob('../data/*/Programs.json', { eager: true });

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function DeckingPanel(props) {
  const rawCyberdecks = allCyberdecks[`../data/${props.Edition}/Cyberdeck.json`]?.default;
  const rawPrograms = allPrograms[`../data/${props.Edition}/Programs.json`]?.default;
  const [NewCyberdeck, setNewCyberdeck] = useState();
  const [SelectedCyberdecks, setSelectedCyberdecks] = useState(props.Decks);
  const [NewCyberdeckIndex, setNewCyberdeckIndex] = useState(0);
  const [NewCyberdeckProgram, setNewCyberdeckProgram] = useState(0);
  const [NewCyberdeckProgramIndex, setNewCyberdeckProgramIndex] = useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalCurrentTarget, setModalCurrentTarget] = useState(0);

  // Agents state
  const [agents, setAgents] = useState(props.Agents ?? []);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentRating, setNewAgentRating] = useState(1);
  const [agentModalOpen, setAgentModalOpen] = useState(false);
  const [agentModalTarget, setAgentModalTarget] = useState(0);
  const [newAgentProgram, setNewAgentProgram] = useState(0);
  const [newAgentProgramIndex, setNewAgentProgramIndex] = useState(0);

  const updateAgents = (updated) => {
    setAgents(updated);
    props.onChangeAgents(updated);
  };

  const addAgent = () => {
    if (!newAgentName.trim()) return;
    const rating = parseInt(newAgentRating) || 1;
    const newAgent = {
      Name: newAgentName.trim(),
      Rating: rating,
      Programs: [],
    };
    updateAgents([...agents, newAgent]);
    setNewAgentName('');
    setNewAgentRating(1);
  };

  const removeAgent = (index) => {
    updateAgents(agents.filter((_, i) => i !== index));
  };

  const handleAgentProgramChange = (event) => {
    setNewAgentProgram(rawPrograms[event.target.value]);
    setNewAgentProgramIndex(event.target.value);
  };

  const addAgentProgram = () => {
    const prog = {
      Name: newAgentProgram.Name,
      Multiplyer: newAgentProgram.Multiplyer,
      Rating: 1,
      Loaded: true,
      Size: newAgentProgram.Multiplyer,
    };
    const updated = agents.map((a, i) =>
      i === agentModalTarget ? { ...a, Programs: [...a.Programs, prog] } : a
    );
    updateAgents(updated);
    setAgentModalOpen(false);
  };

  const removeAgentProgram = (agentIndex, progIndex) => {
    const updated = agents.map((a, i) =>
      i === agentIndex
        ? { ...a, Programs: a.Programs.filter((_, pi) => pi !== progIndex) }
        : a
    );
    updateAgents(updated);
  };

  const handleAgentProgramRatingChange = (agentIndex, progIndex, value) => {
    const newRating = parseInt(value) || 1;
    const updated = agents.map((a, i) =>
      i === agentIndex
        ? {
            ...a,
            Programs: a.Programs.map((p, pi) =>
              pi === progIndex
                ? { ...p, Rating: newRating, Size: newRating * newRating * p.Multiplyer }
                : p
            ),
          }
        : a
    );
    updateAgents(updated);
  };
  const handleOpenModal = (index) => {
    setOpenModal(true);
    setModalCurrentTarget(index);
  };
  const handleCloseModal = () => setOpenModal(false);
  const ProgramCosts = {
    1: 100,
    2: 100,
    3: 100,
    4: 200,
    5: 200,
    6: 200,
    7: 500,
    8: 500,
    9: 500,
    10: 1000,
    11: 1000,
    12: 1000,
  };

  const handleCyberdeckChange = (event) => {
    const TempCyberdeck = rawCyberdecks[event.target.value];
    setNewCyberdeck(TempCyberdeck);
    setNewCyberdeckIndex(event.target.value);
  };

  const handleCyberdeckProgramChange = (event) => {
    const TempProgram = rawPrograms[event.target.value];
    setNewCyberdeckProgram(TempProgram);
    setNewCyberdeckProgramIndex(event.target.value);
  };

  const CalcTotalNuyenSpent = () => {
    let TotalNuyen = 0;
    props.Decks.forEach(function (deck) {
      TotalNuyen += parseInt(deck["Cost"]);
      deck.ProgramsInStorage.forEach(function (program) {
        TotalNuyen +=
          program.Rating *
          program.Rating *
          program.Multiplyer *
          ProgramCosts[program.Rating];
      });
    });
    return TotalNuyen;
  };

  const removeCyberdeck = (index) => {
    const editedcyberdecks = [...SelectedCyberdecks];
    editedcyberdecks.splice(index, 1);
    setSelectedCyberdecks(editedcyberdecks);
    props.onChangeDeck(editedcyberdecks);
  };

  const handleAddCyberdeck = () => {
    if (NewCyberdeck) {
      const cyberdeckToAdd = { ...NewCyberdeck };
      cyberdeckToAdd.Bod = 1;
      cyberdeckToAdd.Evasion = 1;
      cyberdeckToAdd.Sensors = 1;
      cyberdeckToAdd.Masking = 1;
      cyberdeckToAdd.ProgramsInStorage = [];
      cyberdeckToAdd.ProgramsActive = [];
      setSelectedCyberdecks((prevCyberdecks) => [
        ...prevCyberdecks,
        cyberdeckToAdd,
      ]);
      setNewCyberdeck("");
      setNewCyberdeckIndex("");
      props.onChangeDeck([...SelectedCyberdecks, cyberdeckToAdd]);
    }
  };

  const handlePersonaChange = (event) => {
    let value = parseInt(event.target.value);
    const index = parseInt(event.target.attributes.getNamedItem("data-index").value);
    const attribute = event.target.name;
    const deck = SelectedCyberdecks[index];
    const maxAttribute = parseInt(deck.Persona);
    const maxAttributes = maxAttribute * 3;
    const AttributeSum =
      parseInt(deck.Bod) + parseInt(deck.Evasion) +
      parseInt(deck.Sensors) + parseInt(deck.Masking);

    if (value > maxAttribute) value = maxAttribute;
    if (value < 0) value = 0;
    if (AttributeSum - maxAttributes >= 0 && deck[attribute] < value) return;

    const editedcyberdecks = SelectedCyberdecks.map((d, i) =>
      i === index ? { ...d, [attribute]: value } : d
    );
    setSelectedCyberdecks(editedcyberdecks);
    props.onChangeDeck(editedcyberdecks);
  };

  const updateDeckPrograms = (deckIndex, newPrograms) => {
    const updated = SelectedCyberdecks.map((d, i) =>
      i === deckIndex ? { ...d, ProgramsInStorage: newPrograms } : d
    );
    setSelectedCyberdecks(updated);
    props.onChangeDeck(updated);
  };

  const addProgram = () => {
    const newProgram = {
      Name: NewCyberdeckProgram.Name,
      Multiplyer: NewCyberdeckProgram.Multiplyer,
      Rating: 1,
      Loaded: false,
      Size: NewCyberdeckProgram.Multiplyer,
    };
    const deck = SelectedCyberdecks[modalCurrentTarget];
    updateDeckPrograms(modalCurrentTarget, [...deck.ProgramsInStorage, newProgram]);
    setOpenModal(false);
  };

  const removeProgram = (event, deckIndex, programIndex) => {
    const programs = SelectedCyberdecks[deckIndex].ProgramsInStorage.filter(
      (_, i) => i !== programIndex
    );
    updateDeckPrograms(deckIndex, programs);
  };

  const handleProgramRatingChange = (event, deckIndex, programIndex) => {
    const newRating = parseInt(event.target.value);
    const programs = SelectedCyberdecks[deckIndex].ProgramsInStorage.map((p, i) =>
      i === programIndex
        ? { ...p, Rating: newRating, Size: newRating * newRating * p.Multiplyer }
        : p
    );
    updateDeckPrograms(deckIndex, programs);
  };

  const handleProgramToggle = (event, deckIndex, programIndex) => {
    const programs = SelectedCyberdecks[deckIndex].ProgramsInStorage.map((p, i) =>
      i === programIndex ? { ...p, Loaded: !p.Loaded } : p
    );
    updateDeckPrograms(deckIndex, programs);
  };

  const CalcMemoryUsed = (index) => {
    let memoryUsed = 0;
    SelectedCyberdecks[index].ProgramsInStorage.forEach(function (prog) {
      if (prog.Loaded) {
        memoryUsed += prog.Size;
      }
    });
    return memoryUsed;
  };

  const CalcStorageUsed = (index) => {
    let storageUsed = 0;
    SelectedCyberdecks[index].ProgramsInStorage.forEach(function (prog) {
      storageUsed += prog.Size;
    });
    return storageUsed;
  };

  const RenderSelectedCyberdeck = () => {
    if (SelectedCyberdecks.length !== 0) {
      return (
        <div>
          {SelectedCyberdecks.map((cyberdeck, index) => (
            <Box className="cyberdeckCard" key={index}>
              <h3>{cyberdeck.Name}</h3>
              <Grid container spacing={2}>
                <Grid size={{ xs: 5}} className="cyberDeckTable">
                  <div>
                    Persona Points Left:{" "}
                    {parseInt(cyberdeck.Persona) * 3 -
                      (parseInt(cyberdeck.Bod) +
                        parseInt(cyberdeck.Evasion) +
                        parseInt(cyberdeck.Masking) +
                        parseInt(cyberdeck.Sensors))}
                  </div>
                  <table className="">
                    <thead>
                      <tr>
                        <th>Attribute</th>
                        <th>Current Value</th>
                        <th>Max Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>MPCP</td>
                        <td>{cyberdeck.Persona}</td>
                        <td>{cyberdeck.Persona}</td>
                      </tr>
                      <tr>
                        <td>Bod</td>
                        <td>
                          <input
                            type="number"
                            name="Bod"
                            data-index={index}
                            min={1}
                            max={cyberdeck.Persona}
                            value={cyberdeck.Bod}
                            onChange={handlePersonaChange}
                          />
                        </td>
                        <td>{cyberdeck.Persona}</td>
                      </tr>
                      <tr>
                        <td>Sensors</td>
                        <td>
                          <input
                            type="number"
                            name="Sensors"
                            data-index={index}
                            min={1}
                            max={cyberdeck.Persona}
                            value={cyberdeck.Sensors}
                            onChange={handlePersonaChange}
                          />
                        </td>
                        <td>{cyberdeck.Persona}</td>
                      </tr>
                      <tr>
                        <td>Masking</td>
                        <td>
                          <input
                            type="number"
                            name="Masking"
                            data-index={index}
                            min={1}
                            max={cyberdeck.Persona}
                            value={cyberdeck.Masking}
                            onChange={handlePersonaChange}
                          />
                        </td>
                        <td>{cyberdeck.Persona}</td>
                      </tr>
                      <tr>
                        <td>Evasion</td>
                        <td>
                          <input
                            type="number"
                            name="Evasion"
                            data-index={index}
                            min={1}
                            max={cyberdeck.Persona}
                            value={cyberdeck.Evasion}
                            onChange={handlePersonaChange}
                          />
                        </td>
                        <td>{cyberdeck.Persona}</td>
                      </tr>
                      <tr>
                        <td>Hardening</td>
                        <td>{cyberdeck.Hardening}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Memory</td>
                        <td>{CalcMemoryUsed(index)}</td>
                        <td>{cyberdeck.Memory}</td>
                      </tr>
                      <tr>
                        <td>Storage</td>
                        <td>{CalcStorageUsed(index)}</td>
                        <td>{cyberdeck.Storage}</td>
                      </tr>
                      <tr>
                        <td>I/O:</td>
                        <td>{cyberdeck["I/O Speed"]}</td>
                        <td>{cyberdeck["I/O Speed"]}</td>
                      </tr>
                      <tr>
                        <td>Response Increase:</td>
                        <td>{parseInt(cyberdeck["Response Increase"])}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </Grid>
                <Grid size={{ xs: 7}} className="">
                  <h4>Programs</h4>
                  <div>
                    <Button
                      style={{ marginBottom: 10 }}
                      variant="contained"
                      color="primary"
                      data-index={index}
                      onClick={() => handleOpenModal(index)}
                    >
                      Add Program
                    </Button>
                  </div>

                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Loaded</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Rating</TableCell>
                          <TableCell>Multiplyer</TableCell>
                          <TableCell>Size</TableCell>
                          <TableCell>Cost</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cyberdeck.ProgramsInStorage.map((program, index2) => (
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
                            <TableCell>
                              <input
                                type="number"
                                data-index={index}
                                value={program.Rating}
                                min={1}
                                max={12}
                                onChange={(event) =>
                                  handleProgramRatingChange(
                                    event,
                                    index,
                                    index2
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>{program.Multiplyer}</TableCell>
                            <TableCell>{program.Size}</TableCell>
                            <TableCell>
                              {new Intl.NumberFormat("ja-JP", {
                                style: "currency",
                                currency: "JPY",
                              }).format(
                                program.Rating *
                                  program.Rating *
                                  program.Multiplyer *
                                  ProgramCosts[program.Rating]
                              )}
                            </TableCell>
                            <TableCell>
                              <button
                                edge="end"
                                aria-label="delete"
                                onClick={(event) =>
                                  removeProgram(event, index, index2)
                                }
                              >
                                <DeleteIcon />
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <Button
                  style={{ marginLeft: 15, marginTop: 10 }}
                  variant="contained"
                  color="primary"
                  onClick={() => removeCyberdeck(index)}
                >
                  Remove Cyberdeck
                </Button>
              </Grid>
            </Box>
          ))}
        </div>
      );
    } else {
      return <div>No Deck Selected</div>;
    }
  };

  const showCyberdeckDropdown = () => {
    return (
      <Box sx={{ width: "350px" }}>
        <SearchableSelect
          items={rawCyberdecks}
          value={NewCyberdeckIndex}
          onChange={handleCyberdeckChange}
          label="Cyberdecks"
          getLabel={(deck) => deck.Name}
          style={{ width: "300px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCyberdeck}
          className=""
          style={{ marginTop: "10px" }}
        >
          Add Cyberdeck
        </Button>
      </Box>
    );
  };

  const RenderProgramSelectionModal = () => {
    return (
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <SearchableSelect
            items={rawPrograms}
            value={NewCyberdeckProgramIndex}
            onChange={handleCyberdeckProgramChange}
            label="Programs"
            getLabel={(prog) => prog.Name}
            style={{ width: "300px" }}
          />
          <Button variant="contained" color="primary" onClick={addProgram} style={{ marginTop: "10px" }}>
            Add Program
          </Button>
        </Box>
      </Modal>
    );
  };

  const RenderAgents = () => {
    return (
      <>
        <hr />
        <h2>Agents</h2>
        <p style={{ fontSize: '0.85em', opacity: 0.7 }}>
          Agents are autonomous programs (Rating² × 5 Mp) that run on your deck. All persona attributes = Rating. Hacking Pool = Rating ÷ 3. Initiative = Rating + 1D6.
        </p>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Agent Name"
            value={newAgentName}
            onChange={(e) => setNewAgentName(e.target.value)}
            style={{ padding: '6px', width: '180px' }}
          />
          <label>Rating:&nbsp;
            <input
              type="number"
              min={1}
              max={10}
              value={newAgentRating}
              onChange={(e) => setNewAgentRating(e.target.value)}
              style={{ width: '50px', padding: '4px' }}
            />
          </label>
          <Button variant="contained" color="primary" onClick={addAgent}>Add Agent</Button>
        </Box>

        {agents.map((agent, agentIndex) => {
          const r = parseInt(agent.Rating);
          const hackPool = Math.floor(r / 3);
          const size = r * r * 5;
          return (
            <Box className="cyberdeckCard" key={agentIndex} sx={{ mb: 3 }}>
              <h3>{agent.Name} <span style={{ fontSize: '0.7em', opacity: 0.7 }}>(Rating {r})</span></h3>
              <Grid container spacing={2}>
                <Grid size={{ xs: 4 }} className="cyberDeckTable">
                  <table>
                    <thead><tr><th>Attribute</th><th>Value</th></tr></thead>
                    <tbody>
                      <tr><td>Rating</td><td>{r}</td></tr>
                      <tr><td>Bod</td><td>{r}</td></tr>
                      <tr><td>Evasion</td><td>{r}</td></tr>
                      <tr><td>Masking</td><td>{r}</td></tr>
                      <tr><td>Sensors</td><td>{r}</td></tr>
                      <tr><td>Hacking Pool</td><td>{hackPool}</td></tr>
                      <tr><td>Initiative</td><td>{r} + 1D6</td></tr>
                      <tr><td>Deck Memory Used</td><td>{size} Mp</td></tr>
                      <tr><td>Condition Monitor</td><td>10 boxes</td></tr>
                    </tbody>
                  </table>
                </Grid>
                <Grid size={{ xs: 8 }}>
                  <h4>Agent Programs</h4>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: 10 }}
                    onClick={() => { setAgentModalTarget(agentIndex); setAgentModalOpen(true); }}
                  >
                    Add Program
                  </Button>
                  <TableContainer component={Paper}>
                    <Table size="small" aria-label="agent programs">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Rating</TableCell>
                          <TableCell>Multiplyer</TableCell>
                          <TableCell>Size</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {agent.Programs.map((prog, progIndex) => (
                          <TableRow key={progIndex}>
                            <TableCell>{prog.Name}</TableCell>
                            <TableCell>
                              <input
                                type="number"
                                min={1}
                                max={12}
                                value={prog.Rating}
                                onChange={(e) => handleAgentProgramRatingChange(agentIndex, progIndex, e.target.value)}
                                style={{ width: '50px' }}
                              />
                            </TableCell>
                            <TableCell>{prog.Multiplyer}</TableCell>
                            <TableCell>{prog.Size}</TableCell>
                            <TableCell>
                              <button onClick={() => removeAgentProgram(agentIndex, progIndex)}>
                                <DeleteIcon />
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Button
                  style={{ marginLeft: 15, marginTop: 10 }}
                  variant="contained"
                  color="error"
                  onClick={() => removeAgent(agentIndex)}
                >
                  Remove Agent
                </Button>
              </Grid>
            </Box>
          );
        })}

        <Modal open={agentModalOpen} onClose={() => setAgentModalOpen(false)}>
          <Box sx={modalStyle}>
            <SearchableSelect
              items={rawPrograms}
              value={newAgentProgramIndex}
              onChange={handleAgentProgramChange}
              label="Programs"
              getLabel={(prog) => prog.Name}
              style={{ width: '300px' }}
            />
            <Button variant="contained" color="primary" onClick={addAgentProgram} style={{ marginTop: '10px' }}>
              Add Program
            </Button>
          </Box>
        </Modal>
      </>
    );
  };

  return (
    <>
      <Box sx={{ width: "250px", marginBottom: "20px" }}>
        Nuyen Spent:{" "}
        {new Intl.NumberFormat("ja-JP", {
          style: "currency",
          currency: "JPY",
        }).format(CalcTotalNuyenSpent())}
      </Box>
      {showCyberdeckDropdown()}
      <hr sx="mt-6"></hr>
      {RenderSelectedCyberdeck()}
      {RenderProgramSelectionModal()}
      {RenderAgents()}
    </>
  );
}
