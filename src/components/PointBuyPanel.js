// A new React component panel for Shadowrun 3rd Edition point buy system
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Box, Select, Typography, Slider, FormControlLabel, Checkbox } from "@mui/material";

export default function PointBuyPanelSR3(props) {
  
  var maxPoints = 123;
  if(props.Edition === 'SR2'){
    maxPoints = 100;
  }
  const raceBonuses = {
    "SR3": {
      "raceBonuses": {
        "Cyclops":{
          "Body": 5,
          "Quickness": -1,
          "Strength": 6,
          "Charisma": -2,
          "Willpower": 0,
          "Intelligence": -2,
          "Notes": "+2 Target Number for Ranged Attacks, +1 Reach for Armed/Unarmed Combat",
        },
        Koborokuru:{
          Body: 1,
          Quickness: 0,
          Strength: 2,
          Charisma: 0,
          Willpower: 1,
          Intelligence: 0,
          Notes:
            "Thermographic Vision, Naturally immune to one kind of man made Toxin",
        },
        Fomori:{
          Body: 4,
          Quickness: -1,
          Strength: 3,
          Charisma: 0,
          Willpower: 0,
          Intelligence: -2,
          Notes: "Thermographic Vision, +1 Reach for Armed/Unarmed Combat",
        },
        Menehune:{
          Body: 2,
          Quickness: 0,
          Strength: 1,
          Charisma: 0,
          Willpower: 1,
          Intelligence: 0,
          Notes:
            "Thermographic Vision, Resistance (+2 Body) to any disease or toxin",
        },
        Hobgoblin:{
          Body: 2,
          Quickness: 0,
          Strength: 2,
          Charisma: -1,
          Willpower: 0,
          Intelligence: 0,
          Notes: "Low-Light Vision",
        },
        Giants:{
          Body: 4,
          Quickness: -1,
          Strength: 5,
          Charisma: -2,
          Willpower: 0,
          Intelligence: -2,
          Notes: "Thermographic Vision, +1 Reach for Armed/Unarmed Combat",
        },
        Gnome:{
          Body: 1,
          Quickness: 0,
          Strength: 1,
          Charisma: 0,
          Willpower: 2,
          Intelligence: 0,
          Notes: "Thermographic Vision",
        },
        Oni:{
          Body: 2,
          Quickness: 0,
          Strength: 2,
          Charisma: -1,
          Willpower: 1,
          Intelligence: -1,
          Notes: "Low-Light Vision",
        },
        Wakyambi:{
          Body: 0,
          Quickness: 0,
          Strength: 0,
          Charisma: 2,
          Willpower: 1,
          Intelligence: 0,
          Notes: "Low-Light Vision",
        },
        Ogre:{
          Body: 3,
          Quickness: 0,
          Strength: 2,
          Charisma: 0,
          Willpower: 0,
          Intelligence: -1,
          Notes: "",
        },
        Minotaurs:{
          Body: 4,
          Quickness: -1,
          Strength: 3,
          Charisma: -1,
          Willpower: 0,
          Intelligence: -1,
          Notes: "Thermographic Vision, +1 Reach for Armed/Unarmed Combat, Dermal Armor (+1 Body)",
        },
        Satyr:{
          Body: 3,
          Quickness: -1,
          Strength: 2,
          Charisma: -1,
          Willpower: 1,
          Intelligence: -1,
          Notes: "Low-Light Vision",
        },
        "Night One":{
          Body: 0,
          Quickness: 2,
          Strength: 0,
          Charisma: 2,
          Willpower: 0,
          Intelligence: 0,
          Notes: "Mild Allergy to Sun Light",
        },
        Dryad:{
          Body: -1,
          Quickness: 1,
          Strength: -1,
          Charisma: 3,
          Willpower: 0,
          Intelligence: 0,
          Notes: " Mild allergy to urban areas, Animal Empathy Edge: only affects birds and small tree-living animals such as squirrels and chipmunks",
        },
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
      }
    },
    "SR2": {
      "raceBonuses": {
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
      }
    }
  };
  const [pointsRemaining, setPointsRemaining] = React.useState(maxPoints);
  const [attributes, setAttributes] = React.useState(props.pointbuyAttributePoints);
  const [skills, setSkills] = React.useState(props.pointbuySkillPoints);
  const [extraForce, setExtraForce] = React.useState(props.pointbuyExtraForce);
  const [raceCost, setRaceCost] = React.useState(0);
  const [magicCost, setMagicCost] = React.useState(0);
  const [resourcesCost, setResourcesCost] = React.useState(0);
  const [metavariant, setMetavariant] = React.useState(props.IsMetaVariant);
  const [metaVariantType, setMetavariantType] = React.useState(props.metaVariantType)
  const [ghoul, setGhoul] = React.useState(props.IsGhoul);
  const [otaku, setOtaku] = React.useState(props.IsOtaku);

  const [Resource, setResource] = React.useState(props.chargenCash);
  const [Race, setRace] = React.useState(props.Race);
  const [Magic, setMagic] = React.useState(props.magicalChoice)
  const AvailableRaces = ["Human", "Troll", "Ork", "Dwarf", "Elf" ] // "Shapeshifter" <-- To be added later
  const MetaVariants = { "Troll":["Minotaur","Cyclops","Fomori", "Giant"],
                          "Dwarf":["Koborokuru","Menehune","Gnome"],
                          "Ork":["Ogre","Hobgoblin","Oni","Satyr"],
                          "Elf":["Wakyambi","Night One", "Dryad"],
                          "Human":['Human'],
                          "Shapeshifter":['Shapeshifter']
                        };
  const AvailableShapeShifterForms = ["Bear","Eagle","Fox","Leopard","Seal","Tiger","Wolf"];
  const AvailableMagics = ["None", "Full Magician", "Physical Adept", "Aspected"]
  var AvailableResources = [500, 5000, 20000, 90000, 200000, 400000, 650000, 1000000]
  if(props.Edition === 'SR2'){
    AvailableResources = [0, 500, 5000, 90000, 200000, 400000, 650000, 1000000] 
  }

  
  const handleResourceChange = (resource) => {
    setResource(resource.target.value);
  }

  const handleRaceChange = (race) => {
    setRace(race.target.value);
    props.ChangeRaceBonuses(
      raceBonuses[props.Edition].raceBonuses[race.target.value]
    );
  };

  const handleMagicChange = (magic) => {
    setMagic(magic.target.value);
  };

  const handleMetaVariantChange = (meta) => {
    setMetavariantType(meta.target.value);
    props.ChangeMetaVariantType(meta.target.value)
    props.ChangeRaceBonuses(
      raceBonuses[props.Edition].raceBonuses[meta.target.value]
    );
  }

  React.useEffect(() => {
    props.ChangeMaxAttributes(attributes);
    props.ChangeMaxSkills(skills);
    props.ChangeMagic(Magic);
    props.ChangeRace(Race);
    props.ChangeMaxCash(Resource)
    props.ChangeIsOtakuOption(otaku);
    props.ChangePointBuyAttributes(attributes);
    props.ChangePointBuySkills(skills);
    props.ChangeIsGhoulOption(ghoul)
    props.ChangeIsMetavariantOption(metavariant);
    props.ChangePointBuyExtraForce(extraForce);
    switch(Resource){
      case 500:
      case 0:
        setResourcesCost(-5);
        break;
      case 5000:
        if(props.Edition === 'SR3'){
          setResourcesCost(0);
        }else{
          setResourcesCost(5);
        }
        
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
        if(props.Edition === 'SR2'){
          setMagicCost(20);
          props.ChangeMaxSpellPoints(30+extraForce);
        }else{
          setMagicCost(30);
          props.ChangeMaxSpellPoints(25);
        }
        
        break;
      case "Aspected Magician":
        if(props.Edition === 'SR2'){
          setMagicCost(15);
          props.ChangeMaxSpellPoints(30+extraForce);
        }else{
          setMagicCost(25);
          props.ChangeMaxSpellPoints(35);
        }
        break;
      case "Physical Adept":
        if(props.Edition === 'SR2'){
          setMagicCost(15);
        }else{
          setMagicCost(25);
        }
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
        if(props.Edition === 'SR2'){
          setRaceCost(10);
        }else{
          setRaceCost(5);
        }
        break;
      case "Ork":
        if(props.Edition === 'SR2'){
          setRaceCost(10);
        }else{
          setRaceCost(5);
        }
        break;
      case "Shapeshifter":
        setRaceCost(25);
        break;
    }

    let total = (attributes * 2) + skills + raceCost + magicCost + resourcesCost;
    if(extraForce !== 0){
      total += (extraForce/2);
    }
    if (metavariant && props.Edition ==='SR3') total += 5;
    if (ghoul) total += 10;
    if (otaku) total += 30;
    setPointsRemaining(maxPoints - total);
    props.ChangePointsRemaining(maxPoints - total);
  }, [attributes, skills, raceCost, magicCost, resourcesCost, metavariant, ghoul, otaku, Race, Magic, Resource, extraForce]);

  var metaVariantLabel = "Metavariant (+5)";
  if(props.Edition === 'SR2'){
    metaVariantLabel = "Metavariant";
  }


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
      <hr></hr>
      <Box mt={2}>
        <Typography gutterBottom>Attributes (2 pts each) [ {attributes} ]</Typography>
        <Slider value={attributes} onChange={(e, val) => setAttributes(val)} min={1} max={60} step={1} valueLabelDisplay="auto" />
      </Box>

      <Box mt={2}>
        <Typography gutterBottom>Skills (1 pt each) [ {skills} ]</Typography>
        <Slider value={skills} onChange={(e, val) => setSkills(val)} min={1} max={60} step={1} valueLabelDisplay="auto" />
      </Box>

      {(props.Edition === 'SR2') ?
      <Box mt={2}>
        <Typography gutterBottom>Extra Force Points (1 pt per 2) [ {extraForce} ]</Typography>
        <Slider value={extraForce} onChange={(e, val) => setExtraForce(val)} min={0} max={60} step={2} valueLabelDisplay="auto" />
      </Box>
      : ""}

      <Box mt={2}>
        <FormControlLabel
          control={<Checkbox checked={metavariant} onChange={() => setMetavariant(!metavariant)} />}
          label={metaVariantLabel}
        />
        {/* <FormControlLabel
          control={<Checkbox checked={ghoul} onChange={() => setGhoul(!ghoul)} />}
          label="Ghoul (+10)"
        /> */}
        {(props.Edition === 'SR3') ?
        
          <FormControlLabel
            control={<Checkbox checked={otaku} onChange={() => setOtaku(!otaku)} />}
            label="Otaku (+30)"
          /> : 
        ''}
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

      {( (metavariant) ? 
        <Box mt={2}>
        <FormControl fullWidth>
          <InputLabel id="race-select-label">Meta Variant Type</InputLabel>
          <Select
            id="race-select"
            value={metaVariantType}
            label="race"
            onChange={handleMetaVariantChange}
            style={{ width: "50%", marginBottom: "20px" }}
          >
            {MetaVariants[Race].map((race) => {
              return (
                <MenuItem key={race} value={race}>
                  {race}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      : ""
      )}

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