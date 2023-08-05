import React, { useState } from 'react';
import { MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
const spellsData = require('../data/SR3/Spells.json');
const AdeptPowers = require('../data/SR3/AdeptPowers.json');
function MagicPanel(props) {

  const CalcTotalSpellRatings = (spellList) =>{
    let totalRatings = 0;
    spellList.forEach(function(spell){
      totalRatings += spell.Rating;
    })
    return totalRatings;
  }

  const CalcTotalPowerRatings = (powerList) =>{
    let totalCost = 0;
    powerList.forEach(function(spell){
      totalCost += spell.Cost;
    })
    return totalCost;
  }

  const FullMageTraditions = ['Full Mage','Psionicist','Wujen','Aboriginal Magic','Aztec Magic','Black Magic','Chaos Magic','Christian Magic','Druid Magic','Egyptian Magic','Gypsy Magic',"Hawai'ian Magic",'Hindu Magic','Islamic Magic','Norse Magic','Qabbalistic Magic','Rastafarian Magic','Shinto Magic','Witchcraft','Elemental Mage (Fire)','Elemental Mage (Water)','Elemental Mage (Air)','Elemental Mage (Earth)'];
  const AspectedMageTraditions = ['Shaman','Conjurer','Elementalist','Shamanist','Sorcerer','WuFa'];
  const AdeptPaths = ["Athelete's Way","Artist's Way","Warriors's Way","Invisible Way","Spirit Way","Totem Way", "Magician's Way"]
  const Totems = [{name:'Ant Eater',environment:'ENV'},{name:'Badger'}]
  
  const [newSpell, setNewSpell] = useState('');
  const [newSpellIndex, setNewSpellIndex] = useState('');
  const [selectedSpells, setSelectedSpells] = useState(props.spells);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [spellRating, setSpellRating] = useState(1);
  const [spellPointsSpent, setSpellPointsSpent] = useState(CalcTotalSpellRatings(props.spells));
  const [spellPointsMax, setSpellPointsMax] = useState(36);
  const [magicalTradition, setMagicalTradition] = useState('Full Magician')
  
  const [AdeptPointsSpent, setAdeptPointsSpent] = useState(CalcTotalPowerRatings(props.powers));
  const [AdeptPointsMax, setAdeptPointsMax] = useState(6);
  const [newPower, setNewPower] = useState('');
  const [newPowerCost, setNewPowerCost] = useState(0.0);
  const [newPowerDesc, setNewPowerDesc] = useState('');
  const [newPowerHasRating, setNewPowerHasRating] = useState(false);
  const [NewPowerIndex, setNewPowerIndex] = useState('');
  const [newPowerRating, setNewPowerRating] = useState(0);
  const [powerCost, setPowerCost] = useState(0);
  const [selectedPowers, setSelectedPowers] = useState(props.powers);

  

  const handleSpellChange = (event) => {
    const TempSpell = spellsData[event.target.value];
    setNewSpell(TempSpell);
    setNewSpellIndex(event.target.value);
  };

  const handlePowerChange = (event) => {
    const TempPower = AdeptPowers[event.target.value];
    setNewPower(TempPower);
    setNewPowerIndex(event.target.value)
    setNewPowerCost(TempPower.Cost);
    setNewPowerDesc(TempPower.Notes)
  }

  const handleRatingChange = (event) => {
    const rating = parseInt(event.target.value);
    if (!isNaN(rating) && rating >= 1 && rating <= 6) {
      setSpellRating(rating);
    }
  };

  const handleCostChange = (event) => {
    const cost = parseFloat(event.target.value);
    if (!isNaN(cost)){
      setPowerCost(cost);
    }
  };
  

  const handleAddSpell = () => {
    if (newSpell) {
      const spellToAdd = {...newSpell, Rating:spellRating }
      setSelectedSpells(prevSpells => [...prevSpells, spellToAdd]);
      setSpellPointsSpent(prevSpells => (prevSpells + spellRating));
      setNewSpell('');
      setNewSpellIndex('');
      props.onChangeSpells([...selectedSpells, spellToAdd]);
    }
  };

  const handleAddPower = () => {
    if (newPower) {
      const powerToAdd = {...newPower, Rating:newPowerRating};
      setSelectedPowers(prevPowers => [...prevPowers, powerToAdd]);
      setAdeptPointsSpent(prevPowersPointsSpent => (prevPowersPointsSpent + powerToAdd.Cost));
      setNewPower('');
      setNewPowerIndex('');
      props.onChangePowers([...selectedPowers, powerToAdd]);
    }
  }

  const handleEditPower = (index) => {
    // const editedSpells = [...selectedSpells];
    // const spellToEdit = editedSpells[index];
    // setNewSpell(spellToEdit.name);
    // setSpellRating(spellToEdit.rating);
    // editedSpells.splice(index, 1);
    // setSelectedSpells(editedSpells);
  }

  const handleEditSpell = (index) => {
    const editedSpells = [...selectedSpells];
    const spellToEdit = editedSpells[index];
    setNewSpell(spellToEdit.name);
    setSpellRating(spellToEdit.rating);
    editedSpells.splice(index, 1);
    setSelectedSpells(editedSpells);
  };

  const handleRemoveSpell = (index) => {
    const editedSpells = [...selectedSpells];
    let SpellRemoved = editedSpells.splice(index, 1);
    setSpellPointsSpent(prevSpells => (prevSpells - SpellRemoved[0].Rating));
    setSelectedSpells(editedSpells);
    props.onChangeSpells(editedSpells);
  };

  const handleRemovePower = (index) => {
    const editedPowers = [...selectedPowers];
    let PowerRemoved = editedPowers.splice(index, 1);
    setSpellPointsSpent(prevPowers => (prevPowers - PowerRemoved[0].Cost));
    setSelectedPowers(editedPowers);
    props.onChangePowers(editedPowers);
  };

  const RenderMagicianWithSpells = () =>{
    return (<>
    <Box sx={{ width: '100%' }}>Spells {spellPointsSpent}/{spellPointsMax}
            <LinearProgress variant="determinate" value={spellPointsSpent/spellPointsMax*100} />
          </Box>
          <br></br> 
          <FormControl style={{'width':'200px'}}>
            <InputLabel  id="spell-label">{selectedCategory}</InputLabel>
            <Select
              id="spell-dropdown"
              value={newSpellIndex}
              onChange={handleSpellChange}
            >
              {spellsData.map( (spell, index) => (
                <MenuItem key={index} value={index}>{spell.Name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {newSpell && (
            <>
              <TextField style={{'width':'100px', 'marginRight':'20px'}}
                id="rating-input"
                label="Rating (1-6)"
                type="number"
                value={spellRating}
                onChange={handleRatingChange}
                InputProps={{
                  inputProps: { min: 1, max: 6 },
                }}
              />
            </>
          )}
          <Button variant="contained" color="primary" onClick={handleAddSpell}>
            Add Spell
          </Button>

    <hr></hr>
    <h3>Spells</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Spellname</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Target</TableCell>
              <TableCell align="right">Duration</TableCell>
              <TableCell align="right">Drain Code</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedSpells.map((spell, index) => (
              <TableRow
                key={spell.Name}
              >
                <TableCell component="th" scope="row">
                  {spell.Name}
                </TableCell>
                <TableCell align="right">{spell.Rating}</TableCell>
                <TableCell align="right">{spell.Type}</TableCell>
                <TableCell align="right">{spell.Target}</TableCell>
                <TableCell align="right">{spell.Duration}</TableCell>
                <TableCell align="right">{spell.Drain}</TableCell>
                <TableCell align="right"><Button onClick={() => handleRemoveSpell(index)}>Remove</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
    )
  }


  const RenderPhysicalAdepts = () =>{
    return (<><h3>Adept Powers</h3>
    <Box sx={{ width: '100%' }}>Power Points {AdeptPointsSpent}/{AdeptPointsMax}
            <LinearProgress variant="determinate" value={AdeptPointsSpent} />
          </Box>
          <br></br> 
          <FormControl style={{'width':'400px'}}>
            <InputLabel  id="power-label">{selectedCategory}</InputLabel>
            <Select
              id="power-dropdown"
              value={NewPowerIndex}
              onChange={handlePowerChange}
            >
              {AdeptPowers.map( (power, index) => (
                <MenuItem key={index} value={index}>{power.Name} - PP: {power.Cost}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {newPower && (
            <>
              <TextField style={{'width':'100px', 'marginRight':'20px'}}
                id="power-cost-input"
                disabled={true}
                label="Cost"
                type="number"
                value={newPowerCost}
              />
               <Button variant="contained" color="primary" onClick={handleAddPower}>
                Add Power
              </Button>
              <div>Notes:{newPowerDesc}</div>
            </>
          )}

    <hr></hr>
    <h3>Powers</h3>
          <List style={{maxWidth:'500px'}}>
            {selectedPowers.map((power, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${power.name} (${power.cost})`}
                />
                <Button color="primary" onClick={() => handleEditPower(index)}>
                  Edit
                </Button>
                <Button color="secondary" onClick={() => handleRemovePower(index)}>
                  Remove
                </Button>
              </ListItem>
            ))}
          </List>
    </>)
  }

  const handleTraditionChange = (event) => {
    setMagicalTradition(event.target.value);
  }


  const RenderWindow = () =>{
    switch(props.magicalChoice){
      case 'Full Magician':
        return RenderMagicianWithSpells();
      case 'Physical Adept':
        return RenderPhysicalAdepts();
      case 'Aspected':
        return RenderMagicianWithSpells();
      break;

      default:
        return (<div>Not Magical</div>);
    }

  }

  return (
    <div>
      <h3>Magical Talents ( {props.magicalChoice} )</h3>
      {RenderWindow()}
       
    </div>
  );
}

export default MagicPanel;