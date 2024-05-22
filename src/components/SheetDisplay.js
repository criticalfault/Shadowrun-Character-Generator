import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import ConditionMonitor from "./ConditionMonitor";
import { ListItem, ListItemText } from "@mui/material";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./SheetDisplay.css";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.primary,
}));
function SheetDisplay(props) {
  const Ranges = require("../data/ranges.json");
  const getRangesFromName = (name) => {
    let RangeNames = Object.keys(Ranges);
    for (let i = 0; i < RangeNames.length; i++) {
      if (name.includes(RangeNames[i])) {
        return Ranges[RangeNames[i]];
      }
    }

    return {
      short: "N/A",
      medium: "N/A",
      long: "N/A",
      extreme: "N/A",
    };
  };
  const isFetishSpell = (spell) => {
    if (spell) {
      return <span>F&nbsp;</span>;
    }
  };

  const isExclusiveSpell = (spell) => {
    if (spell) {
      return <span>E&nbsp;</span>;
    }
  };

  const handleConditionSelect = () => {};

  const SpellCategories = {
    C: "Combat",
    M: "Manipulation",
    H: "Health",
    D: "Detection",
    I: "Illusion",
    Z: "Transformation",
  };

  const renderPowerListItem = (power, index) => {
    if (power.HasLevels) {
      return (
        <TableRow key={index}>
          <TableCell>{power.Name}</TableCell>
          <TableCell>{power.Rating}</TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow key={index}>
          <TableCell>{power.Name}</TableCell>
          <TableCell></TableCell>
        </TableRow>
      );
    }
  };

  const renderPhysicalAdeptPowers = () => {
    return (
      <>
        <h2>Physical Adept Powers</h2>
        <Table component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.currentCharacter.powers.map((power, index) =>
              renderPowerListItem(power, index)
            )}
          </TableBody>
        </Table>
      </>
    );
  };

  const renderControlPool = () => {
    if (
      props.currentCharacter.cyberAttributeBonuses.hasOwnProperty(
        "Vehicle_Control_Rig_Level"
      )
    ) {
      return (
        <>
          <br />
          <br />
          <TextField
            className="pool_display"
            id="rating-input"
            label="Control"
            type="text"
            value={
              Math.floor(
                parseInt(props.currentCharacter.attributes.Quickness) +
                  parseInt(props.currentCharacter.raceBonuses.Quickness ?? 0) +
                  parseInt(
                    props.currentCharacter.cyberAttributeBonuses.Quickness ?? 0
                  ) +
                  parseInt(props.currentCharacter.attributes.Intelligence) +
                  parseInt(
                    props.currentCharacter.raceBonuses.Intelligence ?? 0
                  ) +
                  parseInt(
                    props.currentCharacter.cyberAttributeBonuses.Intelligence ??
                      0
                  )
              ) /
                2 +
              parseInt(
                props.currentCharacter.cyberAttributeBonuses
                  .Vehicle_Control_Reaction ?? 0
              )
            }
          />
        </>
      );
    }
  };

  const renderAstralCombatPool = () => {
    if (props.currentCharacter.magical === true) {
      return (
        <>
          <br />
          <br />
          <TextField
            className="pool_display"
            id="rating-input"
            label="Astral Combat"
            type="text"
            value={Math.floor(
              (parseInt(props.currentCharacter.attributes.Charisma) +
                parseInt(props.currentCharacter.raceBonuses.Charisma ?? 0) +
                parseInt(
                  props.currentCharacter.cyberAttributeBonuses.Charisma ?? 0
                ) +
                parseInt(props.currentCharacter.attributes.Intelligence) +
                parseInt(props.currentCharacter.raceBonuses.Intelligence ?? 0) +
                parseInt(
                  props.currentCharacter.cyberAttributeBonuses.Intelligence ?? 0
                ) +
                parseInt(props.currentCharacter.attributes.Willpower) +
                parseInt(props.currentCharacter.raceBonuses.Willpower ?? 0) +
                parseInt(
                  props.currentCharacter.cyberAttributeBonuses.Willpower ?? 0
                )) /
                2
            )}
          />
        </>
      );
    }
  };

  const renderHackingPool = () => {
    let poolValue = 0;
    if (props.Edition === "SR3") {
      let MPCP = 0;
      if (props.currentCharacter.decks.length !== 0) {
        MPCP = props.currentCharacter.decks[0].Persona;
      }
      poolValue =
        Math.floor(
          (parseInt(props.currentCharacter.attributes.Intelligence) +
            parseInt(props.currentCharacter.raceBonuses.Intelligence ?? 0) +
            parseInt(
              props.currentCharacter.cyberAttributeBonuses.Intelligence ?? 0
            ) +
            parseInt(MPCP)) /
            3
        ) +
        parseInt(
          props.currentCharacter.cyberAttributeBonuses.Hacking_Pool ?? 0
        );
    } else {
      props.currentCharacter.skills.forEach(function (skill) {
        if (skill.name === "Computers") {
          if (
            skill.hasOwnProperty("selectedConcentrations") &&
            skill.selectedConcentrations.length > 0
          ) {
            let subRating = 0;
            skill.selectedConcentrations.forEach(function (subSkill) {
              console.log(subSkill.rating);
              if (subRating < subSkill.rating) {
                subRating = subSkill.rating;
              }
            });

            poolValue =
              parseInt(subRating) +
              Math.floor(
                parseInt(props.currentCharacter.attributes.Intelligence) +
                  parseInt(
                    props.currentCharacter.raceBonuses.Intelligence ?? 0
                  ) +
                  parseInt(
                    props.currentCharacter.cyberAttributeBonuses.Intelligence ??
                      0
                  )
              ) +
              parseInt(
                props.currentCharacter.cyberAttributeBonuses.Hacking_Pool ?? 0
              );
          } else {
            poolValue =
              parseInt(skill.rating) +
              Math.floor(
                parseInt(props.currentCharacter.attributes.Intelligence) +
                  parseInt(
                    props.currentCharacter.raceBonuses.Intelligence ?? 0
                  ) +
                  parseInt(
                    props.currentCharacter.cyberAttributeBonuses.Intelligence ??
                      0
                  ) +
                  parseInt(props.currentCharacter.attributes.Quickness) +
                  parseInt(props.currentCharacter.raceBonuses.Quickness ?? 0) +
                  parseInt(
                    props.currentCharacter.cyberAttributeBonuses.Quickness ?? 0
                  )
              ) /
                2 +
              parseInt(
                props.currentCharacter.cyberAttributeBonuses.Hacking_Pool ?? 0
              );
          }
        }
      });
    }
    if (poolValue !== 0) {
      return (
        <>
          <br />
          <br />
          <TextField
            className="pool_display"
            id="rating-input"
            label="Hacking"
            type="text"
            value={poolValue}
          />
        </>
      );
    }
  };

  const renderSpellPool = () => {
    let poolValue = "";
    if (props.Edition === "SR3") {
      poolValue = Math.floor(
        (parseInt(props.currentCharacter.attributes.Magic) +
          parseInt(props.currentCharacter.attributes.Intelligence) +
          parseInt(props.currentCharacter.raceBonuses.Intelligence ?? 0) +
          parseInt(
            props.currentCharacter.cyberAttributeBonuses.Intelligence ?? 0
          ) +
          parseInt(props.currentCharacter.attributes.Willpower) +
          parseInt(props.currentCharacter.raceBonuses.Willpower ?? 0) +
          parseInt(
            props.currentCharacter.cyberAttributeBonuses.Willpower ?? 0
          )) /
          3
      );
    } else {
      props.currentCharacter.skills.forEach(function (skill) {
        if (skill.name === "Sorcery") {
          poolValue = skill.value;
        }
      });
    }
    if (
      props.currentCharacter.magical === true &&
      props.magicalChoice !== "Physical Adept"
    ) {
      return (
        <>
          <br />
          <br />
          <TextField
            className="pool_display"
            id="rating-input"
            label="Spell"
            type="text"
            value={poolValue}
          />
        </>
      );
    }
  };

  const renderTaskPool = () => {
    if (
      props.currentCharacter.cyberAttributeBonuses.hasOwnProperty("Task_Pool") >
      0
    ) {
      return (
        <>
          <br />
          <br />
          <TextField
            className="pool_display"
            id="rating-input"
            label="Task"
            type="text"
            value={parseInt(
              props.currentCharacter.cyberAttributeBonuses.Task_Pool ?? 0
            )}
          />
        </>
      );
    }
  };

  const renderKarmaPool = () => {
    if (props.currentCharacter.karmaPool > 0) {
      return (
        <>
          <br />
          <br />
          <TextField
            className="pool_display"
            id="rating-input"
            label="Karma"
            type="text"
            value={parseInt(props.currentCharacter.karmaPool)}
          />
        </>
      );
    }
  };

  const renderSkillsPanel = () => {
    if (props.Edition === "SR3") {
      return props.currentCharacter.skills.map((skill, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={
              skill.specialization
                ? `${skill.name} (${skill.rating - 1}) ->  ${
                    skill.specialization
                  } (${skill.rating + 1})`
                : `${skill.name} (${skill.rating})`
            }
          />
        </ListItem>
      ));
    } else {
      return props.currentCharacter.skills.map((skill, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={
              skill.selectedConcentrations.length === 0
                ? `${skill.name} (${skill.rating})`
                : `${skill.name} (${skill.rating}) -> ` +
                  skill.selectedConcentrations.map((concen, index) => {
                    if (
                      concen.hasOwnProperty("specializations") &&
                      concen.specializations.length > 0
                    ) {
                      return `${concen.name} (${concen.rating}) -> ${
                        concen.specializations[0].name
                      } (${parseInt(concen.rating) + 2})`;
                    } else {
                      return `${concen.name} (${concen.rating})`;
                    }
                  })
            }
          />
        </ListItem>
      ));
    }
  };

  const renderControlBoxes = () => {
    if (
      props.currentCharacter.cyberAttributeBonuses.hasOwnProperty(
        "Vehicle_Control_Rig_Level"
      )
    ) {
      return (
        <>
          <br />
          <br />
          <TextField
            style={{
              width: "100px",
              marginRight: "10px",
              display: "inline-block",
            }}
            id="rating-input"
            label="Rigged React"
            type="text"
            value={
              Math.floor(
                parseInt(props.currentCharacter.attributes.Quickness) +
                  parseInt(props.currentCharacter.raceBonuses.Quickness ?? 0) +
                  parseInt(
                    props.currentCharacter.cyberAttributeBonuses.Quickness ?? 0
                  ) +
                  parseInt(props.currentCharacter.attributes.Intelligence) +
                  parseInt(
                    props.currentCharacter.raceBonuses.Intelligence ?? 0
                  ) +
                  parseInt(
                    props.currentCharacter.cyberAttributeBonuses.Intelligence ??
                      0
                  )
              ) /
                2 +
              parseInt(
                props.currentCharacter.cyberAttributeBonuses
                  .Vehicle_Control_Reaction
              )
            }
          />
          <br />
          <br />
          <TextField
            style={{
              width: "100px",
              marginRight: "10px",
              display: "inline-block",
            }}
            id="rating-input"
            label="Rigged Init"
            type="text"
            value={
              parseInt(props.currentCharacter.attributes.Initative) +
              parseInt(
                props.currentCharacter.cyberAttributeBonuses.Vehicle_Initative
              ) +
              "d6"
            }
          />
        </>
      );
    } else {
      return;
    }
  };
  return (
    <Grid container spacing={2} className="sheetBody">
      <Grid item xs={12} md={6}>
        <TextField
          label="Runner Name"
          type="text"
          value={props.currentCharacter.street_name}
          onChange={(event) => props.onChangeStreetName(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Race"
          type="text"
          value={props.currentCharacter.race}
          disabled={true}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Age"
          type="text"
          value={props.currentCharacter.age}
          onChange={(event) => props.onChangeAge(event.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          style={{ width: "100%" }}
          label="Description"
          type="text"
          value={props.currentCharacter.description}
          onChange={(event) => props.onChangeDescription(event.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          style={{ width: "100%" }}
          label="Notes"
          type="text"
          value={props.currentCharacter.notes}
          onChange={(event) => props.onChangeNotes(event.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Item>
          <h2 className={"boxHeader"}>Condition Monitor</h2>
          <ConditionMonitor
            type="Stun &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
            key={"S"}
            actor="S"
            onConditionSelect={handleConditionSelect}
          />
          <ConditionMonitor
            type="Physical &nbsp;"
            key={"P"}
            actor="P"
            onConditionSelect={handleConditionSelect}
          />
        </Item>
      </Grid>
      <Grid item xs={12} md={4}>
        <Item>
          <h2 className={"boxHeader"}>Attributes</h2>
          <Grid container>
            <Grid item xs={8}>
              <table className="">
                <tbody>
                  {Object.keys(props.currentCharacter.attributes).map(
                    (attribute) => (
                      <tr key={attribute}>
                        <td>{attribute}</td>
                        <td style={{ width: "25px" }}>
                          {props.currentCharacter.attributes[attribute]}
                        </td>
                        <td style={{ width: "25px" }}>
                          {parseInt(
                            props.currentCharacter.attributes[attribute]
                          ) +
                            parseInt(
                              props.currentCharacter.raceBonuses[attribute] ?? 0
                            ) +
                            parseInt(
                              props.currentCharacter.cyberAttributeBonuses[
                                attribute
                              ] ?? 0
                            ) +
                            parseInt(
                              props.currentCharacter.magicalAttributeBonuses[
                                attribute
                              ] ?? 0
                            )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </Grid>
            <Grid item xs={4}>
              <TextField
                style={{
                  width: "90px",
                  marginRight: "10px",
                  display: "inline-block",
                }}
                id="rating-input"
                label="Reaction"
                type="text"
                value={
                  Math.floor(
                    (parseInt(props.currentCharacter.attributes.Quickness) +
                      parseInt(
                        props.currentCharacter.raceBonuses.Quickness ?? 0
                      ) +
                      parseInt(
                        props.currentCharacter.cyberAttributeBonuses
                          .Quickness ?? 0
                      ) +
                      parseInt(
                        props.currentCharacter.magicalAttributeBonuses.Quickness
                      ) +
                      parseInt(props.currentCharacter.attributes.Intelligence) +
                      parseInt(
                        props.currentCharacter.raceBonuses.Intelligence ?? 0
                      ) +
                      parseInt(
                        props.currentCharacter.cyberAttributeBonuses
                          .Intelligence ?? 0
                      )) /
                      2
                  ) +
                  parseInt(
                    props.currentCharacter.cyberAttributeBonuses.Reaction
                  )
                }
              />
              <br></br>
              <br></br>
              <TextField
                style={{
                  width: "90px",
                  marginRight: "10px",
                  display: "inline-block",
                }}
                id="rating-input"
                label="Initative"
                type="text"
                value={
                  parseInt(props.currentCharacter.attributes.Initative) +
                  parseInt(
                    props.currentCharacter.magicalAttributeBonuses.Initative
                  ) +
                  parseInt(
                    props.currentCharacter.cyberAttributeBonuses.Initative
                  ) +
                  "d6"
                }
              />
              {renderControlBoxes()}
            </Grid>
          </Grid>
        </Item>
      </Grid>
      <Grid item xs={6} md={3}>
        <Item style={{ minHeight: "341px" }}>
          <h2 className={"boxHeader"}>Dice Pools</h2>
          <TextField
            className="pool_display"
            id="rating-input"
            label="Combat"
            type="text"
            value={Math.floor(
              (parseInt(props.currentCharacter.attributes.Quickness) +
                parseInt(props.currentCharacter.raceBonuses.Quickness ?? 0) +
                parseInt(
                  props.currentCharacter.cyberAttributeBonuses.Quickness ?? 0
                ) +
                parseInt(
                  props.currentCharacter.magicalAttributeBonuses.Quickness ?? 0
                ) +
                parseInt(props.currentCharacter.attributes.Intelligence) +
                parseInt(props.currentCharacter.raceBonuses.Intelligence ?? 0) +
                parseInt(
                  props.currentCharacter.cyberAttributeBonuses.Intelligence ?? 0
                ) +
                parseInt(
                  props.currentCharacter.magicalAttributeBonuses.Intelligence ??
                    0
                ) +
                parseInt(props.currentCharacter.attributes.Willpower) +
                parseInt(props.currentCharacter.raceBonuses.Willpower ?? 0) +
                parseInt(
                  props.currentCharacter.cyberAttributeBonuses.Willpower ?? 0
                ) +
                parseInt(
                  props.currentCharacter.magicalAttributeBonuses.Willpower ?? 0
                )) /
                2 +
                parseInt(
                  props.currentCharacter.magicalAttributeBonuses.Combat_Pool ??
                    0
                )
            )}
          />

          {renderHackingPool()}
          {renderControlPool()}
          {renderAstralCombatPool()}
          {renderSpellPool()}
          {renderTaskPool()}
          {renderKarmaPool()}
        </Item>
      </Grid>
      <Grid item xs={12} md={6}>
        <Item style={{ minHeight: "341px" }}>
          <h2 className={"boxHeader"}>Skills</h2>
          {renderSkillsPanel()}
        </Item>
      </Grid>

      <Grid item md={6} xs={12}>
        <Item>
          <h2 className={"boxHeader"}>Cyberware</h2>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Rating</TableCell>
                  <TableCell align="right">Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.currentCharacter.cyberware.map((cyberware, index) => (
                  <TableRow key={cyberware.Name + index}>
                    <TableCell component="th" scope="row">
                      {cyberware.Name}
                    </TableCell>
                    <TableCell align="right">{cyberware.Rating}</TableCell>
                    <TableCell align="right">{cyberware.Notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Item>
      </Grid>
      <Grid item md={6} xs={12}>
        <Item>
          <h2 className={"boxHeader"}>Bioware</h2>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">BioIndex Cost</TableCell>
                  <TableCell align="right">Book.Page</TableCell>
                  <TableCell align="right">Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.currentCharacter.bioware.map((bioware, index) => (
                  <TableRow key={bioware.Name + index}>
                    <TableCell component="th" scope="row">
                      {bioware.Name}
                    </TableCell>
                    <TableCell align="right">{bioware.BioIndex}</TableCell>
                    <TableCell align="right">{bioware.BookPage}</TableCell>
                    <TableCell align="right">{bioware.Notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Item>
      </Grid>
      <Grid item md={6} xs={12}>
        <Item>
          <h2 className={"boxHeader"}>Gear</h2>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Rating</TableCell>
                  <TableCell align="right">Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.currentCharacter.gear
                  .filter(
                    (item) =>
                      !item.hasOwnProperty("Damage") &&
                      !item.hasOwnProperty("Ballistic")
                  )
                  .map((gear, index) => (
                    <TableRow key={gear.Name + index}>
                      <TableCell component="th" scope="row">
                        {" "}
                        {gear.Name}
                        {gear.Amount !== 0 ? `  x${gear.Amount}` : ""}
                      </TableCell>
                      <TableCell align="right">{gear.Rating}</TableCell>
                      <TableCell align="right">{gear.Notes}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Item>
      </Grid>
      <Grid item md={6} xs={12}>
        <Item>
          <h2 className={"boxHeader"}>Armor</h2>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Ballistic</TableCell>
                  <TableCell align="right">Impact</TableCell>
                  <TableCell align="right">Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.currentCharacter.gear
                  .filter((item) => item.hasOwnProperty("Ballistic"))
                  .map((gear, index) => (
                    <TableRow key={gear.Name + index}>
                      <TableCell component="th" scope="row">
                        {gear.Name}
                      </TableCell>
                      <TableCell align="right">{gear.Ballistic}</TableCell>
                      <TableCell align="right">{gear.Impact}</TableCell>
                      <TableCell align="right">{gear.Notes}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Item>
      </Grid>
      <Grid item xs={12}>
        <Item>
          <h2 className={"boxHeader"}>Weapons</h2>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Damage</TableCell>
                  <TableCell align="right">Short</TableCell>
                  <TableCell align="right">Medium</TableCell>
                  <TableCell align="right">Long</TableCell>
                  <TableCell align="right">Extreme</TableCell>
                  <TableCell align="right">Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.currentCharacter.gear
                  .filter((item) => item.hasOwnProperty("Damage"))
                  .map((gear, index) => {
                    let gearRange = getRangesFromName(gear.Name);

                    return (
                      <TableRow key={gear.Name + index}>
                        <TableCell component="th" scope="row">
                          {gear.Name}
                        </TableCell>
                        <TableCell align="right">{gear.Damage}</TableCell>
                        <TableCell align="right">
                          {gearRange.short ?? "N/A"}
                        </TableCell>
                        <TableCell align="right">
                          {gearRange.medium ?? "N/A"}
                        </TableCell>
                        <TableCell align="right">
                          {gearRange.long ?? "N/A"}
                        </TableCell>
                        <TableCell align="right">
                          {gearRange.extreme ?? "N/A"}
                        </TableCell>
                        <TableCell align="right">{gear.Notes}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Item>
      </Grid>
      {props.currentCharacter.powers &&
      props.currentCharacter.powers.length > 0 ? (
        <Grid item xs={12}>
          <Item>{renderPhysicalAdeptPowers()}</Item>
        </Grid>
      ) : (
        ""
      )}

      {props.currentCharacter.spells && props.currentCharacter.spells.length ? (
        <Grid item xs={12}>
          <Item>
            <h3>Spells</h3>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Spell Name</TableCell>
                    <TableCell align="right">Rating</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Category</TableCell>
                    <TableCell align="right">Target</TableCell>
                    <TableCell align="right">Duration</TableCell>
                    <TableCell align="right">Drain Code</TableCell>
                    <TableCell align="right">Options</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.currentCharacter.spells.map((spell, index) => (
                    <TableRow key={spell.Name}>
                      <TableCell component="th" scope="row">
                        {spell.Name}
                      </TableCell>
                      <TableCell align="right">{spell.Rating}</TableCell>
                      <TableCell align="right">{spell.Type}</TableCell>
                      <TableCell align="right">
                        {SpellCategories[spell.Class]}
                      </TableCell>
                      <TableCell align="right">{spell.Target}</TableCell>
                      <TableCell align="right">{spell.Duration}</TableCell>
                      <TableCell align="right">{spell.Drain}</TableCell>
                      <TableCell align="right">
                        {isFetishSpell(spell.Fetish)}{" "}
                        {isExclusiveSpell(spell.Exclusive)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid>
      ) : (
        ""
      )}
      {props.currentCharacter.vehicles ? (
        <Grid item xs={12}>
          <Item>
            <h2 className={"boxHeader"}>Vehicles</h2>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Handling</TableCell>
                    <TableCell align="right">Speed/Accel</TableCell>
                    <TableCell align="right">Body/Armor</TableCell>
                    <TableCell align="right">Sig/Autonav</TableCell>
                    <TableCell align="right">Pilot/Sensor</TableCell>
                    <TableCell align="right">Cargo/Load</TableCell>
                    <TableCell align="right">Seating</TableCell>
                    <TableCell align="right">Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.currentCharacter.vehicles.map((vehicle, index) => (
                    <TableRow key={vehicle.Name + index}>
                      <TableCell component="th" scope="row">
                        {vehicle.name}
                      </TableCell>
                      <TableCell align="right">{vehicle.Handling}</TableCell>
                      <TableCell align="right">
                        {vehicle["Speed/Accel"]}
                      </TableCell>
                      <TableCell align="right">
                        {vehicle["Body/Armor"]}
                      </TableCell>
                      <TableCell align="right">
                        {vehicle["Sig/Autonav"]}
                      </TableCell>
                      <TableCell align="right">
                        {vehicle["Pilot/Sensor"]}
                      </TableCell>
                      <TableCell align="right">
                        {vehicle["Cargo/Load"]}
                      </TableCell>
                      <TableCell align="right">{vehicle.Seating}</TableCell>
                      <TableCell align="right">{vehicle.Notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid>
      ) : (
        ""
      )}
    </Grid>
  );
}

export default SheetDisplay;
