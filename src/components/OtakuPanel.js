import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import { MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import SearchableSelect from "./SearchableSelect";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";

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

const allComplexForms = import.meta.glob('../data/*/ComplexForms.json', { eager: true });

export default function OtakuPanel(props) {
  const edition = props.Edition ?? 'SR2';
  const rawPrograms = allComplexForms[`../data/${edition}/ComplexForms.json`]?.default ?? [];
  const [openModal, setOpenModal] = React.useState(false);
  const [NewComplexForm, setNewComplexForm] = useState(0);
  const [NewComplexFormIndex, setNewComplexFormIndex] = useState(0);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Sum base + race + cyber bonus for a single attribute
  const attr = (name) =>
    parseInt(props.currentCharacter.attributes[name] ?? 0) +
    parseInt(props.currentCharacter.raceBonuses[name] ?? 0) +
    parseInt(props.currentCharacter.cyberAttributeBonuses[name] ?? 0);

  const WIL = attr('Willpower');
  const INT = attr('Intelligence');
  const CHA = attr('Charisma');

  const MPCP = Math.ceil((INT + WIL + CHA) / 3);
  const hackingPool = Math.floor((MPCP + INT) / 3);

  const OtakuPathInfo = {
    'Cyber Adept': "Complex forms are treated as 1 rating higher when used (does not affect size)",
    'Technoshaman': "Reduce all target numbers by 1 when using Channel skills",
  }

  const handleCloseModal = () => setOpenModal(false);
  const addComplexForm = () => {
    const ComplexForm = {
      Name: NewComplexForm.Name,
      Multiplyer: NewComplexForm.Multiplyer,
      Rating: 1,
      Size: NewComplexForm.Multiplyer,
    };
    setOpenModal(false);
    props.onChangeComplexForm([...props.complexForms, ComplexForm]);
  };

  const removeComplexForm = (event, index) => {
    const updated = [...props.complexForms];
    updated.splice(index, 1);
    props.onChangeComplexForm(updated);
  };

  const handleComplexFormChange = (event) => {
    const TempProgram = rawPrograms[event.target.value];
    setNewComplexForm(TempProgram);
    setNewComplexFormIndex(event.target.value);
  };

  const handleCFRatingChange = (event, index) => {
    const newRating = parseInt(event.target.value);
    const updated = props.complexForms.map((cf, i) => {
      if (i !== index) return cf;
      return { ...cf, Rating: newRating, Size: newRating * newRating * cf.Multiplyer };
    });
    props.onChangeComplexForm(updated);
  };

  // Book (Matrix p.137): free complex forms = Computer(Programming) skill × 50 Mp
  const getFreeComplexFormMp = () => {
    const compSkill = props.currentCharacter.skills.find(
      (s) => s.name === "Computer" || s.name === "Computer (Programming)"
    );
    const rating = compSkill?.rating ?? 0;
    return rating * 50;
  };

  const handlePathChange = (event) => {
    props.onChangeOtakuPath(event.target.value);
  };

  return (
    <div>
      <h2>Otaku Living Persona</h2>
      <Box className="cyberdeckCard">
        <Grid container spacing={2}>
          <Grid item size={{ xs: 3}} className="cyberDeckTable">
            <table className="">
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MPCP</td>
                  <td>{MPCP}</td>
                </tr>
                <tr>
                  <td>Bod</td>
                  <td>{WIL}</td>
                </tr>
                <tr>
                  <td>Sensor</td>
                  <td>{INT}</td>
                </tr>
                <tr>
                  <td>Masking</td>
                  <td>{Math.ceil((WIL + CHA) / 2)}</td>
                </tr>
                <tr>
                  <td>Evasion</td>
                  <td>{INT}</td>
                </tr>
                <tr>
                  <td>Hardening</td>
                  <td>{Math.ceil(WIL / 2)}</td>
                </tr>
                <tr>
                  <td>Matrix Reaction</td>
                  <td>{INT}</td>
                </tr>
                <tr>
                  <td>Matrix Initiative</td>
                  <td>{INT} + 4D6</td>
                </tr>
                <tr>
                  <td>I/O Speed</td>
                  <td>{INT * 100} Mp</td>
                </tr>
                <tr>
                  <td>Hacking Pool</td>
                  <td>{hackingPool}</td>
                </tr>
                <tr>
                  <td>Memory</td>
                  <td title="Complex forms require no active memory">N/A</td>
                </tr>
                <tr>
                  <td>Storage</td>
                  <td title="Uses external headware memory for file transfers">External</td>
                </tr>
              </tbody>
            </table>
          </Grid>
          <Grid item size={{ xs: 9}} className="">
            <h3>Otaku Special Rules</h3>
            <div>
              <FormControl style={{ width: "200px" }}>
                <Select
                  id="TraditionList-dropdown"
                  value={props.currentCharacter.otakuPath}
                  onChange={handlePathChange}
                >
                  {Object.keys(OtakuPathInfo).map((path, index) => (
                    <MenuItem key={index} value={path}>
                      {path}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <br></br>
            <div><strong>Otaku Path:</strong> <em>{props.currentCharacter.otakuPath}</em>: {OtakuPathInfo[props.currentCharacter.otakuPath]} </div>
            <div><strong>Hacking Pool:</strong> {hackingPool}</div>
            <div><strong>Starting Channel Points:</strong> {MPCP} (= MPCP; distribute among 5 channels)</div>
            <div><strong>Free Complex Forms (char gen):</strong> {getFreeComplexFormMp()} Mp (Computer(Programming) × 50)</div>
            <h3>Complex Forms</h3>
            <div>
               <Modal
                  open={openModal}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                <Box sx={modalStyle}>
                  <SearchableSelect
                    items={rawPrograms}
                    value={NewComplexFormIndex}
                    onChange={handleComplexFormChange}
                    label="Complex Form"
                    getLabel={(prog) => prog.Name}
                    style={{ width: "300px" }}
                  />
                  <Button variant="contained" color="primary" onClick={addComplexForm}>
                    Add Complex Form
                  </Button>
                </Box>
              </Modal>
              <Button
                style={{ marginBottom: 10 }}
                variant="contained"
                color="primary"
                onClick={() => handleOpenModal()}>
                Add Complex Form
              </Button>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Multiplyer</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={0}>
                      <TableCell>Armor</TableCell>
                      <TableCell>{WIL}</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>{WIL * WIL * 3}</TableCell>
                      <TableCell>Free</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  {props.complexForms.map((cForm, index) => (
                    <TableRow key={index}>
                      <TableCell>{cForm.Name}</TableCell>
                      <TableCell>
                        <input
                          type="number"
                          data-index={index}
                          value={cForm.Rating}
                          min={1}
                          max={12}
                          onChange={(event) =>
                            handleCFRatingChange(
                              event,
                              index
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>{cForm.Multiplyer}</TableCell>
                      <TableCell>{cForm.Size}</TableCell>
                      <TableCell>{cForm.Rating} Karma</TableCell>
                      <TableCell>
                        <button
                          edge="end"
                          aria-label="delete"
                          onClick={(event) =>
                            removeComplexForm(event, index)
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
           <h3>Sprites</h3>
           <div>Still Pending</div>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}