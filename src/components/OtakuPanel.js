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
  const rawPrograms = require("../data/" + props.Edition + "/Programs.json");
  const [openModal, setOpenModal] = React.useState(false);
  const [modalCurrentTarget, setModalCurrentTarget] = useState(0);
  const handleOpenModal = (index) => {
    setOpenModal(true);
    setModalCurrentTarget(index);
  };
  const handleCloseModal = () => setOpenModal(false);
  /*

  MPCP; (intelligence Rating + Willpower Rating + Charisma
  Rating} / 3 (round up)

  Bod: Willpower Rating

  Evasion: Intelligence Rating

  Masking: (Willpower Rating + Charisma Rating) / 2 (round up)
  
  Sensor: Intelligence Rating

  Response: (Intelligence Rating +Willpower Rating) / 2 {round
  up) + 3D6 Initiative

  Armor: Willpower Rating

  Hardening: Willpower Rating + 2, round up


  */

  return (
    <div>
      <h2>Otaku Living Persona</h2>
      <Box className="cyberdeckCard">
        <Grid container spacing={2}>
          <Grid item size={{ xs: 5}} className="cyberDeckTable">
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
                    parseInt(props.currentCharacter.cyberAttributeBonuses.Intelligence ?? 0)*100)}</td>
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
          <Grid item size={{ xs: 7}} className="">
            <h4>Programs</h4>
            <div>
              {/* <Button
                style={{ marginBottom: 10 }}
                variant="contained"
                color="primary"
                data-index={index}
                onClick={() => handleOpenModal(index)}
              >
                Add Program
              </Button> */}
            </div>

            {/* <TableContainer component={Paper}>
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
            </TableContainer> */}
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}