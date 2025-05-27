// A new React component panel for Shadowrun 3rd Edition point buy system
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Box, Select, Typography, Slider, FormControlLabel, Checkbox } from "@mui/material";

export default function PointBuyPanel(props) {
  const maxPoints = 123;

  const [pointsRemaining, setPointsRemaining] = React.useState(maxPoints);
  const [attributes, setAttributes] = React.useState(0);
  const [skills, setSkills] = React.useState(0);
  const [raceCost, setRaceCost] = React.useState(0);
  const [magicCost, setMagicCost] = React.useState(0);
  const [resourcesCost, setResourcesCost] = React.useState(0);
  const [metavariant, setMetavariant] = React.useState(false);
  const [ghoul, setGhoul] = React.useState(false);
  const [otaku, setOtaku] = React.useState(false);

  const [Resource, setResource] = React.useState(props.Resource);
  const [Race, setRace] = React.useState(props.Race);
  const [Magic, setMagic] = React.useState(props.magicalChoice)
  const AvailableRaces = ["Human", "Troll", "Ork", "Dwarf", "Elf", "Shapeshifter"]
  const AvailableMagics = ["None", "Full Magician", "Physical Adept", "Aspected"]
  const AvailableResources = [500, 5000, 20000, 90000, 200000, 400000, 650000, 1000000] 
  
  const handleResourceChange = (resource) => {
    console.log(resource);
    setResource(resource);
  }

  const handleRaceChange = (race) => {
    setRace(race.target.value);
  };

  const handleMagicChange = (magic) => {
    setMagic(magic.target.value);
  };

  React.useEffect(() => {
    props.ChangeMaxAttributes(attributes);
    props.ChangeMaxSkills(skills);
    props.ChangeMagic(Magic);
    props.ChangeRace(Race);
    props.ChangeMaxCash(Resource)
    // props.ChangeRaceBonuses(
    //   prorityChart[props.Edition].raceBonuses[race.target.value]
    // );
    switch(Resource){
      case 500:
        setResourcesCost(-5);
        break;
      case 5000:
        setResourcesCost(0);
        break;
      case 20000:
        setResourcesCost(5);
        break;
      case 90000:
        setResourcesCost(10);
        break;
      case 200000:
        setResourcesCost(15);
        break;
      case 400000:
        setResourcesCost(20);
        break;
      case 650000:
        setResourcesCost(25);
        break;
      case 1000000:
        setResourcesCost(30);
        break;
    }
    switch(Magic){
      case "None":
        setMagicCost(0);
        break;
      case "Full Magician":
        setMagicCost(30);
        props.ChangeMaxSpellPoints(25);
        break;
      case "Aspected Magician":
        setMagicCost(25);
        props.ChangeMaxSpellPoints(35);
        break;
      case "Physical Adept":
        setMagicCost(25);
        break;
    }
    switch(Race){
      case "Human":
        setRaceCost(0);
        break;
      case "Troll":
        setRaceCost(10);
        break;
      case "Elf":
        setRaceCost(10);
        break;
      case "Dwarf":
        setRaceCost(5);
        break;
      case "Ork":
        setRaceCost(5);
        break;
      case "Shapeshifter":
        setRaceCost(25);
        break;
    }

    let total = (attributes * 2) + skills + raceCost + magicCost + resourcesCost;
    if (metavariant) total += 5;
    if (ghoul) total += 10;
    if (otaku) total += 30;
    setPointsRemaining(maxPoints - total);
    console.log(attributes, skills, raceCost, magicCost, resourcesCost, metavariant, ghoul, otaku, Race, Magic, Resource)
  }, [attributes, skills, raceCost, magicCost, resourcesCost, metavariant, ghoul, otaku, Race, Magic, Resource]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Point Buy Allocation</Typography>
      <Typography variant="body1">Points Remaining: {pointsRemaining}</Typography>
      <hr></hr>
      <Typography variant="body1">Attribute Cost: {attributes*2}</Typography>
      <Typography variant="body1">Skill Cost: {skills}</Typography>
      <Typography variant="body1">Race Cost: {raceCost}</Typography>
      <Typography variant="body1">Magic Cost: {magicCost}</Typography>
      <Typography variant="body1">Resource Cost: {resourcesCost}</Typography>

      <Box mt={2}>
        <Typography gutterBottom>Attributes (2 pts each) [ {attributes} ]</Typography>
        <Slider value={attributes} onChange={(e, val) => setAttributes(val)} min={1} max={60} step={1} valueLabelDisplay="auto" />
      </Box>

      <Box mt={2}>
        <Typography gutterBottom>Skills (1 pt each) [ {skills} ]</Typography>
        <Slider value={skills} onChange={(e, val) => setSkills(val)} min={1} max={60} step={1} valueLabelDisplay="auto" />
      </Box>

      <Box mt={2}>
        <FormControlLabel
          control={<Checkbox checked={metavariant} onChange={() => setMetavariant(!metavariant)} />}
          label="Metavariant (+5)"
        />
        <FormControlLabel
          control={<Checkbox checked={ghoul} onChange={() => setGhoul(!ghoul)} />}
          label="Ghoul (+10)"
        />
        <FormControlLabel
          control={<Checkbox checked={otaku} onChange={() => setOtaku(!otaku)} />}
          label="Otaku (+30)"
        />
      </Box>

      <Box mt={2}>
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
      </Box>

      <Box mt={2}>
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

      <Box mt={2}>
        <FormControl fullWidth>
          <InputLabel id="resouce-select-label">Resources</InputLabel>
          <Select
            id="resource-select"
            value={Resource}
            label="Resource"
            onChange={handleResourceChange}
            style={{ width: "50%", marginBottom: "20px" }}
          >
            {AvailableResources.map((resource) => {
              return (
                <MenuItem key={resource} value={resource}>
                  {resource}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}