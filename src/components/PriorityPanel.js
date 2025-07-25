import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Select, Checkbox } from "@mui/material";
import DraggableList from "./DraggableList";
import Slider from '@mui/material/Slider';
import "./PriorityPanel.css";
export default function PriorityPanel(props) {
  const Priorities = ["A", "B", "C", "D", "E"];
  const prorityChart = {
    SR3: {
      raceBonuses: {
        Human: {
          Body: 0,
          Quickness: 0,
          Strength: 0,
          Charisma: 0,
          Willpower: 0,
          Intelligence: 0,
          Notes: "",
        },
        Dwarf: {
          Body: 1,
          Quickness: 0,
          Strength: 2,
          Charisma: 0,
          Willpower: 1,
          Intelligence: 0,
          Notes:
            "Thermographic Vision, Resistance (+2 Body) to any disease or toxin",
        },
        Elf: {
          Body: 0,
          Quickness: 1,
          Strength: 0,
          Charisma: 2,
          Willpower: 0,
          Intelligence: 0,
          Notes: "Low-light Vision",
        },
        Ork: {
          Body: 3,
          Quickness: 0,
          Strength: 2,
          Charisma: -1,
          Willpower: 0,
          Intelligence: -1,
          Notes: "Low-light Vision",
        },
        Troll: {
          Body: 5,
          Quickness: -1,
          Strength: 4,
          Charisma: -2,
          Willpower: 0,
          Intelligence: -2,
          Notes:
            "Thermographic Vision, +1 Reach for Armed/Unarmed Combat, Dermal Armor (+1 Body)",
        },
      },
      race: {
        A: ["N/A"],
        B: ["N/A"],
        C: ["Troll", "Elf"],
        D: ["Dwarf", "Ork"],
        E: ["Human"],
      },
      magic: {
        A: ["Full Magician"],
        B: ["Physical Adept", "Aspected"],
        C: ["None"],
        D: ["None"],
        E: ["None"],
      },
      high_attributes:{A: 34, B: 31, C: 28, D: 25, E: 22},
      low_attributes:{A: 24, B: 21, C: 18, D: 15, E: 12 },
      attributes: { A: 30, B: 27, C: 24, D: 21, E: 18 },
      low_skills:{A: 30, B: 25, C: 20, D: 17, E: 15 },
      high_skills:{A: 60, B: 50, C: 44, D: 40, E: 37 },
      skills: { A: 50, B: 40, C: 34, D: 30, E: 27 },
      high_resources:{
        A: { nuyen: 2000000, spell_points: 25 },
        B: { nuyen: 1000000, spell_points: 25 },
        C: { nuyen: 400000, spell_points: 25 },
        D: { nuyen: 150000, spell_points: 25 },
        E: { nuyen: 5000, spell_points: 25 },
      },
      low_resources:{
        A: { nuyen: 250000, spell_points: 25 },
        B: { nuyen: 100000, spell_points: 25 },
        C: { nuyen: 50000, spell_points: 25 },
        D: { nuyen: 10000, spell_points: 25 },
        E: { nuyen: 3000, spell_points: 25 },
      },
      resources: {
        A: { nuyen: 1000000, spell_points: 25 },
        B: { nuyen: 400000, spell_points: 25 },
        C: { nuyen: 90000, spell_points: 25 },
        D: { nuyen: 20000, spell_points: 25 },
        E: { nuyen: 5000, spell_points: 25 },
      },
    },
    SR2: {
      raceBonuses: {
        Human: {
          Body: 0,
          Quickness: 0,
          Strength: 0,
          Charisma: 0,
          Willpower: 0,
          Intelligence: 0,
          Notes: "",
        },
        Dwarf: {
          Body: 1,
          Quickness: -1,
          Strength: 2,
          Charisma: 0,
          Willpower: 1,
          Intelligence: 0,
          Notes:
            "Thermographic Vision, Resistance (+2 Body) to any disease or toxin",
        },
        Elf: {
          Body: 0,
          Quickness: 1,
          Strength: 0,
          Charisma: 2,
          Willpower: 0,
          Intelligence: 0,
          Notes: "Low-light Vision",
        },
        Ork: {
          Body: 3,
          Quickness: 0,
          Strength: 2,
          Charisma: -1,
          Willpower: 0,
          Intelligence: -1,
          Notes: "Low-light Vision",
        },
        Troll: {
          Body: 5,
          Quickness: -1,
          Strength: 4,
          Charisma: -2,
          Willpower: -1,
          Intelligence: -2,
          Notes:
            "Thermographic Vision, +1 Reach for Armed/Unarmed Combat, Dermal Armor (+1 Body)",
        },
      },
      MMrace: {
        A: ["Troll", "Ork", "Dwarf", "Elf", "Human"],
        B: ["Troll", "Ork", "Dwarf", "Elf", "Human"],
        C: ["Troll", "Ork", "Dwarf", "Elf", "Human"],
        D: ["Human"],
        E: ["Human"],
      },
      MMmagic: {
        A: ["Human Full Magician", "Metahuman Full Magician"],
        B: [
          "Human Physical Adept",
          "Human Shamanist",
          "Human Sorcerer",
          "Metahuman Shamanist",
          "Metahuman Sorcerer",
        ],
        C: ["Metahuman Physical Adept"],
        D: ["None"],
        E: ["None","Otaku"],
      },
      race: {
        A: ["Troll", "Ork", "Dwarf", "Elf", "Human"],
        B: ["Human"],
        C: ["Human"],
        D: ["Human"],
        E: ["Human"],
      },
      magic: {
        A: ["Human Full Magician"],
        B: [
          "Metahuman Full Magician",
          "Human Physical Adept",
          "Human Shamanist",
          "Human Sorcerer",
        ],
        C: [
          "Metahuman Physical Adept",
          "Metahuman Shamanist",
          "Metahuman Sorcerer",
        ],
        D: ["None"],
        E: ["None","Otaku"],
      },
      attributes: { A: 30, B: 24, C: 20, D: 17, E: 15 },
      skills: { A: 40, B: 30, C: 24, D: 20, E: 17 },
      resources: {
        A: { nuyen: 1000000, spell_points: 50 },
        B: { nuyen: 400000, spell_points: 35 },
        C: { nuyen: 90000, spell_points: 25 },
        D: { nuyen: 5000, spell_points: 15 },
        E: { nuyen: 500, spell_points: 5 },
      },
    }
  };
  const label = { inputProps: { 'aria-label': 'More Metahuman Options' } };
  const propertiesToOrderedList = (priorities) => {
    let templist = [];
    let finalArrayOfObjects = [];
    for (var pri in priorities) {
      templist.push([pri, priorities[pri]]);
    }
    templist.forEach(function (key) {
      finalArrayOfObjects.push({ name: key[0], id: key[0] });
    });
    return finalArrayOfObjects;
  };

  const [priorities, setPriorities] = React.useState(
    propertiesToOrderedList(props.CharacterPriorities)
  );
  const [PriorityRace, setPriorityRace] = React.useState(
    props.CharacterPriorities.Race
  );
  const [PriorityMagic, setPriorityMagic] = React.useState(
    props.CharacterPriorities.Magic
  );
  const [AvailableRaces, setAvailableRaces] = React.useState([
    ...prorityChart[props.Edition].race[PriorityRace],
  ]);
  const [AvailableMagics, setAvailableMagics] = React.useState([
    ...prorityChart[props.Edition].magic[PriorityMagic],
  ]);
  const [Race, setRace] = React.useState(props.Race);
  const [Magic, setMagic] = React.useState(props.magicalChoice);
  const [PowerLevel, setPowerLevel] = React.useState(props.PowerLevel)
  const PLString = PowerLevel === 1 ? "low_" : PowerLevel === 3 ? "high_" : "";

  React.useEffect(() => {
    applyPriorities(priorities);
  }, [PowerLevel]);


  const handlePLChange = (event) => {
    setPowerLevel(event.target.value);
    props.ChangePowerLevel(event.target.value);
  }
  
  const handleMagicChange = (magic) => {
    setMagic(magic.target.value);
    props.ChangeMagic(magic.target.value);
  };

  const handleChangePriorityMagic = (newPriority) => {
    const newPriorityMagic = newPriority;
    setPriorityMagic(newPriority);
    //Set MM options here
    if(props.moreMetahumansOption === true){
      setAvailableMagics(prorityChart[props.Edition]['MMmagic'][newPriorityMagic]);
      setMagic(prorityChart[props.Edition]['MMmagic'][newPriorityMagic][0]);
      props.ChangeMagicChoices(
        prorityChart[props.Edition]['MMmagic'][newPriorityMagic]
      );
      props.ChangeMagic(prorityChart[props.Edition]['MMmagic'][newPriorityMagic][0]);
    }else{
      setAvailableMagics(prorityChart[props.Edition]['magic'][newPriorityMagic]);
      setMagic(prorityChart[props.Edition]['magic'][newPriorityMagic][0]);
      props.ChangeMagicChoices(
        prorityChart[props.Edition]['magic'][newPriorityMagic]
      );
      props.ChangeMagic(prorityChart[props.Edition]['magic'][newPriorityMagic][0]);
    }
    if (props.Edition === "SR3") {
      if (newPriority === "A") {
        props.ChangeMaxSpellPoints(25);
      } else if (newPriority === "B") {
        props.ChangeMaxSpellPoints(35);
      }
    }
  
  };

  const handleRaceChange = (race) => {
    setRace(race.target.value);
    props.ChangeRace(race.target.value);
    props.ChangeRaceBonuses(
      prorityChart[props.Edition].raceBonuses[race.target.value]
    );
  };

  const handleChangePriorityRace = (newPriority) => {
    setPriorityRace(newPriority);
    if(props.moreMetahumansOption === true){
      setAvailableRaces(prorityChart[props.Edition]['MMrace'][newPriority]);
      setRace(prorityChart[props.Edition]['MMrace'][newPriority][0]);
      props.ChangeRaceChoices(prorityChart[props.Edition]['MMrace'][newPriority]);
    }else{
      setAvailableRaces(prorityChart[props.Edition]['race'][newPriority]);
      setRace(prorityChart[props.Edition]['race'][newPriority][0]);
      props.ChangeRaceChoices(prorityChart[props.Edition]['race'][newPriority]);
    }
    
  };

  const handleChangePriorityAttributes = (newPriority) => {
    props.ChangeMaxAttributes(
      prorityChart[props.Edition][PLString +'attributes'][newPriority]
    );
  };

  const handleChangePrioritySkills = (newPriority) => {
    props.ChangeMaxSkills(prorityChart[props.Edition][PLString +'skills'][newPriority]);
  };

  const handleChangePriorityResources = (newPriority) => {
    
    if(Magic === 'Otaku'){
      props.ChangeMaxCash(prorityChart[props.Edition].resources['D'].nuyen);
    }else{
      props.ChangeMaxCash(
        prorityChart[props.Edition][PLString +'resources'][newPriority].nuyen
      );
    }
    
    if (props.Edition === "SR2") {
      props.ChangeMaxSpellPoints(
        prorityChart[props.Edition].resources[newPriority].spell_points
      );
    }
  };

  const handleChangeMoreMetahumansOption = (event) => {
    if(event.target.checked){
      props.ChangeMoreMetahumansOption(false);
    }else{
      props.ChangeMoreMetahumansOption(true);
    }
  }

  const MoreMetahumansDisplay = function(edition) {
    if(props.Edition === 'SR2'){
      return (<div>
         <FormControlLabel
              value="top"
              control={<Checkbox {...label} name="MoreMetaHumansBox" color="success" onChange={handleChangeMoreMetahumansOption} checked={props.moreMetahumansOption} />}
              label="More Metahumans Option"
              labelPlacement="end"
          />
          <br></br>
        </div>
      )
    }else{
      return (<span></span>);
    }
  }

  const TableRender = function (edition) {
    return (
      <div>
          { MoreMetahumansDisplay(edition) }
        <table className="">
          <thead>
            <tr>
              <th style={{ width: "100px" }}>Priority</th>
              <th>Race</th>
              <th style={{ width: "310px" }}>Magic</th>
              <th>Attributes</th>
              <th>Skills</th>
              <th>Resources</th>
            </tr>
          </thead>
          <tbody>
            {Priorities.map((letter) => {
              return (
                <tr key={letter}>
                  <td>{letter}</td>
                  <td
                    className={
                      props.CharacterPriorities.Race === letter
                        ? "highlighted"
                        : ""
                    }
                  >
                    <label>
                      {(props.moreMetahumansOption ? prorityChart[props.Edition]["MMrace"][letter].join(", ") : prorityChart[props.Edition]["race"][letter].join(", "))}
                    </label>
                  </td>
                  <td
                    className={
                      props.CharacterPriorities.Magic === letter
                        ? "highlighted"
                        : ""
                    }
                  >
                    <label>
                      {(props.moreMetahumansOption ? prorityChart[props.Edition]["MMmagic"][letter].join(", ") : prorityChart[props.Edition]["magic"][letter].join(", "))}
                    </label>
                  </td>
                  <td
                    className={
                      props.CharacterPriorities.Attributes === letter
                        ? "highlighted": ""
                    }
                  >
                    <label>
                      {prorityChart[props.Edition][PLString +"attributes"][letter]}
                    </label>
                  </td>
                  <td
                    className={
                      props.CharacterPriorities.Skills === letter
                        ? "highlighted" : ""
                    }
                  >
                    <label>{prorityChart[props.Edition][PLString +"skills"][letter]}</label>
                  </td>
                  <td
                    className={
                      props.CharacterPriorities.Resources === letter
                        ? "highlighted"
                        : ""
                    }
                  >
                    <label>
                      {Magic === "Otaku" ? new Intl.NumberFormat("ja-JP", {
                        style: "currency",
                        currency: "JPY",
                      }).format(
                        prorityChart[props.Edition]["resources"]['D']["nuyen"]
                      ) :
                      new Intl.NumberFormat("ja-JP", {
                        style: "currency",
                        currency: "JPY",
                      }).format(
                        prorityChart[props.Edition][PLString +"resources"][letter]["nuyen"]
                      )}{" "}
                      {
                        props.Edition === "SR2" && Magic !== "Otaku" 
                        ? 
                        " / " + prorityChart[props.Edition]["resources"][letter]["spell_points"]
                        : 
                        ""
                      }
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const applyPriorities = (priorityList) => {
  let propertiesOrder = { 0: "A", 1: "B", 2: "C", 3: "D", 4: "E" };
  let tempPriorities = {};

  for (let i = 0; i < priorityList.length; i++) {
    const name = priorityList[i].name;
    const level = propertiesOrder[i];

    switch (name) {
      case "Race":
        handleChangePriorityRace(level);
        tempPriorities.Race = level;
        break;
      case "Magic":
        handleChangePriorityMagic(level);
        tempPriorities.Magic = level;
        break;
      case "Skills":
        handleChangePrioritySkills(level);
        tempPriorities.Skills = level;
        break;
      case "Attributes":
        handleChangePriorityAttributes(level);
        tempPriorities.Attributes = level;
        break;
      case "Resources":
        handleChangePriorityResources(level);
        tempPriorities.Resources = level;
        break;
      default:
        console.warn("Unknown priority: " + name);
    }
  }

  props.ChangePriorities(tempPriorities);
};

const onDragEnd = ({ destination, source }) => {
  if (!destination) return;
  const newItems = reorder(priorities, source.index, destination.index);
  setPriorities(newItems);
  applyPriorities(newItems);
};

  const moveMagicAndResourcesToBottom = () => {
    props.ChangePriorities({
      "Attributes": "A",
      "Skills": "B",
      "Race": "C",
      "Resources": "D",
      "Magic": "E"
    });
  };

  const renderPowerLevel = () => {
    const marks = [
      {
        value: 1,
        label: 'Street Level',
      },
      {
        value: 2,
        label: 'Standard',
      },
      {
        value: 3,
        label: 'High Level',
      },
    ];
    if(props.Edition === 'SR3'){
      return (<Slider
        aria-label="Custom marks"
        defaultValue={2}
        step={1}
        min={1}
        max={3}
        style={{"width":"200px","marginLeft":"40px"}}
        onChange={handlePLChange}
        valueLabelDisplay="auto"
        marks={marks}
        value={PowerLevel}
      />)
    }else{
      return "";
    }
  }

  return (
    <Box sx={{ background: "#ffffff", padding: "20px", marginTop: "40px" }}>
      <h2>MASTER CHARACTER CREATION TABLE</h2>
        {renderPowerLevel()}
        {TableRender()}
      <h2>Drag Priorities as desired</h2>
      <DraggableList items={priorities} onDragEnd={onDragEnd} />
      <Box sx={{ background: "#ffffff", padding: "20px", marginTop: "40px" }}>
        <h4>Character Sub Choices</h4>
        <FormControl fullWidth>
          <InputLabel id="race-select-label">Race</InputLabel>
          <Select
            id="race-select"
            value={Race}
            label="race"
            onChange={handleRaceChange}
            style={{ width: "50%", marginBottom: "20px" }}
          >
            {AvailableRaces.map((race) => {
              return (
                <MenuItem key={race} value={race}>
                  {race}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <br></br>
        <br></br>
        <FormControl fullWidth>
          <InputLabel id="race-select-label">Magic</InputLabel>
          <Select
            id="magic-select"
            value={Magic}
            label="magic"
            onChange={handleMagicChange}
            style={{ width: "50%", marginBottom: "20px" }}
          >
            {AvailableMagics.map((magic) => {
              return (
                <MenuItem key={magic} value={magic}>
                  {magic}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
