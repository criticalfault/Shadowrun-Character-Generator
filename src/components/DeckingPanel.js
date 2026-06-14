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
                <Grid item size={{ xs: 5}} className="cyberDeckTable">
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
                <Grid item size={{ xs: 7}} className="">
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
    </>
  );
}
