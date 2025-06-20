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
import AttributesBlock from './Sheet/AttributesBlock';
import RunnerInfo from './Sheet/RunnerInfo';
import DicePools from './Sheet/DicePools';
import SkillsBlock from './Sheet/SkillsBlock';
import CyberwareTable from './Sheet/CyberwareTable';
import BiowareTable from './Sheet/BiowareTable';
import GearTable from './Sheet/GearTable';
import ArmorTable from './Sheet/ArmorTable';
import WeaponsTable from './Sheet/WeaponsTable';
import PhysicalAdeptPowers from './Sheet/PhysicalAdeptPowers';
import SpellsTable from './Sheet/SpellsTable';
import FociTable from './Sheet/FociTable';
import VehiclesTable from './Sheet/VehiclesTable';
import ConditionMonitorBlock from './Sheet/ConditionMonitorBlock';
import CyberdeckTable from './Sheet/CyberdeckTable';


import "./SheetDisplay.css";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#1f1f1f",
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
  const handleConditionSelect = () => {};

  return (
    <Grid container spacing={2} className="sheetBody">
      <RunnerInfo
        character={props.currentCharacter}
        onChange={(key, value) => {
          switch (key) {
            case 'street_name':
              props.onChangeStreetName(value);
              break;
            case 'age':
              props.onChangeAge(value);
              break;
            case 'description':
              props.onChangeDescription(value);
              break;
            case 'notes':
              props.onChangeNotes(value);
              break;
            default:
              break;
          }
        }}
      />
      <Grid item size={12}>
          <ConditionMonitorBlock onConditionSelect={handleConditionSelect} />
      </Grid>

     <AttributesBlock
        attributes={props.currentCharacter.attributes}
        raceBonuses={props.currentCharacter.raceBonuses}
        cyberBonuses={props.currentCharacter.cyberAttributeBonuses}
        magicBonuses={props.currentCharacter.magicalAttributeBonuses}
      />
      <Grid item size={4}>
       <DicePools
          character={props.currentCharacter}
          edition={props.Edition}
          magicalChoice={props.magicalChoice}
        />
      </Grid>
      <Grid item size={12}>
        <SkillsBlock character={props.currentCharacter} edition={props.Edition}  />
      </Grid>

      <CyberdeckTable Decks={props.currentCharacter.decks} onChangeDeck={props.onChangeDeck} />

      <CyberwareTable cyberware={props.currentCharacter.cyberware} />

      <BiowareTable bioware={props.currentCharacter.bioware} />

      <GearTable gear={props.currentCharacter.gear} />

      <ArmorTable gear={props.currentCharacter.gear} />
      
      <WeaponsTable gear={props.currentCharacter.gear} />

      <PhysicalAdeptPowers powers={props.currentCharacter.powers} />

      <FociTable foci={props.currentCharacter.foci} />

      <SpellsTable spells={props.currentCharacter.spells} />

      <VehiclesTable vehicles={props.currentCharacter.vehicles} />

    </Grid>
  );
}

export default SheetDisplay;
