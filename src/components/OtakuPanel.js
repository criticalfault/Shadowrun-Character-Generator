import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import { MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
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

export default function OtakuPanel(props) {
  const rawPrograms = require("../data/SR2/ComplexForms.json");
  const [openModal, setOpenModal] = React.useState(false);
  const [NewComplexForm, setNewComplexForm] = useState(0);
  const [NewComplexFormIndex, setNewComplexFormIndex] = useState(0);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);
  /*
  MPCP; (intelligence Rating + Willpower Rating + Charisma Rating} / 3 (round up)
  Bod: Willpower Rating
  Evasion: Intelligence Rating
  Masking: (Willpower Rating + Charisma Rating) / 2 (round up)
  Sensor: Intelligence Rating
  Response: (Intelligence Rating +Willpower Rating) / 2 {round up) + 3D6 Initiative
  Armor: Willpower Rating
  Hardening: Willpower Rating + 2, round up
  */

  const addComplexForm = () => { 
    let ComplexForm = {
      Name: NewComplexForm.Name,
      Multiplyer: NewComplexForm.Multiplyer,
      Rating: 1,
      Size: NewComplexForm.Multiplyer,
    };
    props.complexForms.push(ComplexForm);
    setOpenModal(false);
    props.onChangeComplexForm(props.complexForms);
  };

  const removeComplexForm = (event, index) => {
    let formIndex = index;
    props.complexForms.splice(formIndex, 1);
    props.onChangeComplexForm(props.complexForms);
  };

  const handleComplexFormChange = (event) => {
    const TempProgram = rawPrograms[event.target.value];
    setNewComplexForm(TempProgram);
    setNewComplexFormIndex(event.target.value);
  };

  const handleCFRatingChange = (event, index) => {
    let programIndex = index;
    let CF = props.complexForms[programIndex];
    props.complexForms[programIndex].Rating = event.target.value;
    props.complexForms[programIndex].Size = (CF.Rating * CF.Rating) * CF.Multiplyer;
    props.onChangeComplexForm(props.complexForms);
  };

  const renderFreeProgrammingDays = () => {
    let poolValue = 0;
    props.currentCharacter.skills.forEach(function (skill) {
        if (skill.name === "Computer") {
          if (skill.hasOwnProperty("selectedConcentrations") && skill.selectedConcentrations.length > 0) {
            skill.selectedConcentrations.forEach(function (subSkill) {
            if (poolValue < subSkill.rating) {
              poolValue = subSkill.rating;
            }
          });
        }else{
          poolValue = skill.rating;
        }
      }
    });
    return (<span>{poolValue*3}</span>);
  }

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
                  <td>{ 
                  Math.ceil((
                    parseInt(props.currentCharacter.attributes.Willpower) +
                    parseInt(props.currentCharacter.raceBonuses.Willpower ?? 0) +
                    parseInt(props.currentCharacter.cyberAttributeBonuses.Willpower ?? 0) +

                    parseInt(props.currentCharacter.attributes.Intelligence) +
                    parseInt(props.currentCharacter.raceBonuses.Intelligence ?? 0) +
                    parseInt(props.currentCharacter.cyberAttributeBonuses.Intelligence ?? 0)+

                    parseInt(props.currentCharacter.attributes.Charisma) +
                    parseInt(props.currentCharacter.raceBonuses.Charisma ?? 0) +
                    parseInt(props.currentCharacter.cyberAttributeBonuses.Charisma ?? 0)) / 3)
                  }</td>
                </tr>
                <tr>
                  <td>Bod</td>
                  <td>{
                    parseInt(props.currentCharacter.attributes.Willpower) +
                    parseInt(props.currentCharacter.raceBonuses.Willpower ?? 0) +
                    parseInt(props.currentCharacter.cyberAttributeBonuses.Willpower ?? 0)
                    }</td>
                </tr>
                <tr>
                  <td>Sensors</td>
                  <td>{  parseInt(props.currentCharacter.attributes.Intelligence) +
                    parseInt(props.currentCharacter.raceBonuses.Intelligence ?? 0) +
                    parseInt(props.currentCharacter.cyberAttributeBonuses.Intelligence ?? 0)}</td>
                </tr>
                <tr>
                  <td>Masking</td>
                  <td>{ 

                    Math.ceil(parseInt(props.currentCharacter.attributes.Willpower) +
                    parseInt(props.currentCharacter.raceBonuses.Willpower ?? 0) +
                    parseInt(props.currentCharacter.cyberAttributeBonuses.Willpower ?? 0) +
                    parseInt(props.currentCharacter.attributes.Charisma) +
                    parseInt(props.currentCharacter.raceBonuses.Charisma ?? 0) +
                    parseInt(props.currentCharacter.cyberAttributeBonuses.Charisma ?? 0) )/2
                    
                    }</td>
                </tr>
                <tr>
                  <td>Evasion</td>
                  <td>{ parseInt(props.currentCharacter.attributes.Intelligence) +
                    parseInt(props.currentCharacter.raceBonuses.Intelligence ?? 0) +
                    parseInt(props.currentCharacter.cyberAttributeBonuses.Intelligence ?? 0)}</td>
                </tr>
                <tr>
                  <td>Hardening</td>
                  <td>{
                    Math.ceil((
                      parseInt(props.currentCharacter.attributes.Willpower) +
                      parseInt(props.currentCharacter.raceBonuses.Willpower ?? 0) +
                      parseInt(props.currentCharacter.cyberAttributeBonuses.Willpower ?? 0)
                    )/2)
                    }</td>
                </tr>
                <tr>
                  <td>Memory</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>Storage</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>I/O:</td>
                  <td>{(parseInt(props.currentCharacter.attributes.Intelligence) +
                    parseInt(props.currentCharacter.raceBonuses.Intelligence ?? 0) +
                    parseInt(props.currentCharacter.cyberAttributeBonuses.Intelligence ?? 0))*100} MPs</td>
                </tr>
                <tr>
                  <td>Response Increase:</td>
                  <td>{
                    Math.ceil((
                    parseInt(props.currentCharacter.attributes.Intelligence) +
                    parseInt(props.currentCharacter.raceBonuses.Intelligence ?? 0) +
                    parseInt(props.currentCharacter.cyberAttributeBonuses.Intelligence ?? 0)+
                    parseInt(props.currentCharacter.attributes.Willpower) +
                      parseInt(props.currentCharacter.raceBonuses.Willpower ?? 0) +
                      parseInt(props.currentCharacter.cyberAttributeBonuses.Willpower ?? 0))/2)
                    } +3d6</td>
                </tr>
              </tbody>
            </table>
          </Grid>
          <Grid item size={{ xs: 9}} className="">
            <h3>Otaku Special Rules</h3>
            <div><strong>Otaku Task Bonus:</strong> {Math.ceil(
              (parseInt(props.currentCharacter.attributes.Intelligence) +
              parseInt(props.currentCharacter.raceBonuses.Intelligence ?? 0) +
              parseInt(props.currentCharacter.cyberAttributeBonuses.Intelligence ?? 0)+
              parseInt(props.currentCharacter.attributes.Charisma) +
              parseInt(props.currentCharacter.raceBonuses.Charisma ?? 0) +
              parseInt(props.currentCharacter.cyberAttributeBonuses.Charisma ?? 0))/4
            )}</div>
            <div><strong>Character Gen Free Programming Days:</strong> {renderFreeProgrammingDays()}</div>
            <h3>Complex Forms</h3>
            <div>
               <Modal
                  open={openModal}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                <Box sx={modalStyle}>
                  <FormControl style={{ width: "200px" }}>
                    <InputLabel id="gear-label">Complex Form</InputLabel>
                    <Select
                      id="program-dropdown"
                      value={NewComplexFormIndex}
                      onChange={handleComplexFormChange}
                    >
                      {rawPrograms.map((prog, index) => (
                        <MenuItem key={index} value={index}>
                          {prog.Name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                      <TableCell>{parseInt(props.currentCharacter.attributes.Willpower) +
                      parseInt(props.currentCharacter.raceBonuses.Willpower ?? 0) +
                      parseInt(props.currentCharacter.cyberAttributeBonuses.Willpower ?? 0)}</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>{(parseInt(props.currentCharacter.attributes.Willpower) +
                      parseInt(props.currentCharacter.raceBonuses.Willpower ?? 0) +
                      parseInt(props.currentCharacter.cyberAttributeBonuses.Willpower ?? 0)+
                      parseInt(props.currentCharacter.attributes.Willpower) +
                      parseInt(props.currentCharacter.raceBonuses.Willpower ?? 0) +
                      parseInt(props.currentCharacter.cyberAttributeBonuses.Willpower ?? 0))*3}</TableCell>
                      <TableCell>Free</TableCell>
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