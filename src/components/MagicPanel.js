import React, { useState } from 'react';
import { MenuItem } from '@mui/material';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import { CheckBox } from '@material-ui/icons';
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
    powerList.forEach(function(power){
      if(power.HasLevels){
        totalCost += parseFloat(power.Cost)*power.Rating;
      }else{
        totalCost += parseFloat(power.Cost);
      }
      
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
  const [spellPointsMax, setSpellPointsMax] = useState(props.maxSpellPoints);
  const [magicalTradition, setMagicalTradition] = useState('Full Magician')
  const [AdeptPointsSpent, setAdeptPointsSpent] = useState(CalcTotalPowerRatings(props.powers));
  const [AdeptPointsMax, setAdeptPointsMax] = useState(6);
  const [newPower, setNewPower] = useState('');
  const [newPowerCost, setNewPowerCost] = useState(0.0);
  const [newPowerDesc, setNewPowerDesc] = useState('');
  const [newPowerHasRating, setNewPowerHasRating] = useState(false);
  const [NewPowerIndex, setNewPowerIndex] = useState('');
  const [newPowerRating, setNewPowerRating] = useState(1);
  const [selectedPowers, setSelectedPowers] = useState(props.powers);
  const [spellFetish, setSpellFetish] = useState(false);
  const [spellExclusive, setSpellExclusive] = useState(false);

  const label = { inputProps: { 'aria-label': 'Edition Switch' } };

  const convertModsToAttributes = (mods) => {
    const ModToAttributes ={ 
        'BOD':'Body',
        'RBOD':'Body',
        'STR':'Strength',
        'RSTR':'Strength',
        'QCK':'Quickness', 
        'RQCK':'Quickness',
        'INT':'Intelligence', 
        'CHA':'Charisma',
        'WIL':'Willpower',
        'RCT':'Reaction',
        'INI':"Initative",
        'IMP':'Impact',
        'BAL':'Ballastic',
        'CPL':'Combat_Pool',
        'TAS':'Task_Pool',
        'HAC':'Hacking_Pool',
        'VNI':'Vehicle_Initative',
        'VCT':'Vehicle_Control_Reaction',
        'VCR':'Vehicle_Control_Rig_Level'
    }

    return mods.map(mod => {
        const matches = mod.match(/([+-])(\d)([A-Z]\w+)/);
        if (matches) {
            const [, sign, amount, modPart] = matches;
            const attribute = ModToAttributes[modPart] || modPart;
            const value = sign === '-' ? parseInt(amount)*-1 : parseInt(amount);
            return { [attribute]: value };
        }
        return null;
    }).filter(mod => mod !== null);
  }

  const CalcPowerAttributeChanges = () =>{
    let magicalAttributeBonuses = {'Body':0,'Quickness':0,'Strength':0,'Charisma':0,'Willpower':0,'Intelligence':0,'Reaction':0,'Initative':0};
    let magicModsTotals = [];
    selectedPowers.forEach(function(power){
      if(power.Mods !== ''){
        magicModsTotals.push(power)
      }
    });
    magicModsTotals.forEach(function(power){
      let mod = power.Mods;
      let AttributesToMod = convertModsToAttributes(mod.split(','));
      for(let i=0; i<AttributesToMod.length; i++){
          if(!magicalAttributeBonuses.hasOwnProperty(Object.keys(AttributesToMod[i])[0])){
            magicalAttributeBonuses[Object.keys(AttributesToMod[i])[0]] = 0;
          }
          if(power.HasLevels){
            magicalAttributeBonuses[Object.keys(AttributesToMod[i])[0]] += parseInt(Object.values(AttributesToMod[i])[0])*power.Rating;
          }else{
            magicalAttributeBonuses[Object.keys(AttributesToMod[i])[0]] += parseInt(Object.values(AttributesToMod[i])[0]);
          }
        }
    });
    props.onChangeMagicalAttributes(magicalAttributeBonuses);
  }

  const handleAddPower = () => {
    if (newPower) {
      var powerToAdd = {...newPower};
      if(newPowerHasRating){
        powerToAdd.Cost = newPower.Cost * newPowerRating;
        powerToAdd = {...newPower, Rating:newPowerRating};
        setNewPowerRating(1);
      }else{
        powerToAdd = {...newPower};
      }
      
      setSelectedPowers(prevPowers => [...prevPowers, powerToAdd]);
      setAdeptPointsSpent(prevPowersPointsSpent => (parseFloat(prevPowersPointsSpent) + parseFloat(powerToAdd.Cost)));
      setNewPower('');
      setNewPowerIndex('');
      props.onChangePowers([...selectedPowers, powerToAdd]);
      CalcPowerAttributeChanges();
    }
  }

  const handleRemovePower = (index) => {
    const editedPowers = [...selectedPowers];
    let PowerRemoved = editedPowers.splice(index, 1);
    if(PowerRemoved.HasLevels){
      setAdeptPointsSpent(prevPowers => (prevPowers - PowerRemoved[0].Cost*PowerRemoved.Rating));
    }else{
      setAdeptPointsSpent(prevPowers => (prevPowers - PowerRemoved[0].Cost));
    }
    
    setSelectedPowers(editedPowers);
    props.onChangePowers(editedPowers);
    CalcPowerAttributeChanges();
  };

  const handlePowerChange = (event) => {
    const TempPower = AdeptPowers[event.target.value];
    setNewPower(TempPower);
    setNewPowerIndex(event.target.value)
    setNewPowerCost(TempPower.Cost);
    setNewPowerDesc(TempPower.Notes)
    if(TempPower.HasLevels){
      setNewPowerHasRating(true);
    }else{
      setNewPowerHasRating(false);
    }
  }

  const handlePowerRatingChange = (event) => {
    const rating = parseInt(event.target.value);
    setNewPowerRating(rating);
  }

  const renderPowerListItem = (power) =>{
    if(power.HasLevels){
      return (<ListItemText primary={`${power.Name}`} secondary={'Cost: '+power.Cost+ " - Rating: "+power.Rating} />)
    }else{
      return (<ListItemText primary={`${power.Name}`} secondary={'Cost: '+power.Cost}/>)
    }
  }

  const RenderPhysicalAdepts = () =>{
    return (<><h3>Adept Powers</h3>
    <Box sx={{ width: '100%' }}>Power Points {AdeptPointsSpent}/{AdeptPointsMax}
            <LinearProgress variant="determinate" value={AdeptPointsSpent/6*100} />
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
                value={newPowerCost*newPowerRating}
              />
              {newPowerHasRating && (
                <TextField style={{'width':'100px', 'marginRight':'20px'}}
                id="power-rating-input"
                label="Rating"
                type="number"
                value={newPowerRating}
                onChange={event => handlePowerRatingChange(event)}
                inputProps={{
                  min: 1,
                  max: 6
                }}
              />
              )}
              
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
            {renderPowerListItem(power)}
            <Button color="secondary" onClick={() => handleRemovePower(index)}>
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
    </>)
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
  
  const handleSpellChange = (event) => {
    const TempSpell = spellsData[event.target.value];
    setNewSpell(TempSpell);
    setNewSpellIndex(event.target.value);
  };

  const handleAddSpell = () => {
    if (newSpell) {
      const spellToAdd = {...newSpell, Rating:spellRating, Fetish:spellFetish, Exclusive:spellExclusive};
      setSelectedSpells(prevSpells => [...prevSpells, spellToAdd]);
      setSpellPointsSpent(prevSpells => (prevSpells + spellRating));
      setNewSpell('');
      setNewSpellIndex('');
      setSpellFetish(false);
      setSpellExclusive(false);
      props.onChangeSpells([...selectedSpells, spellToAdd]);
    }
  };

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

  const handleChangeSpellFetish = (event) => {
    setSpellFetish(event.target.checked);
  };

  const handleChangeSpellExclusive = (event) => {
    setSpellExclusive(event.target.checked);
  };

  const isFetishSpell = (spell) => {
    if(spell){
      return (<span>F&nbsp;</span>)
    }   
  }

  const isExclusiveSpell = (spell) => {
    if(spell){
      return (<span>E&nbsp;</span>)
    }  
  }

  const CalcSpellRating = (spell) => {
    let tempRating = spell.Rating;
    let limitedSpell = false;
    if(spell.Fetish){
      limitedSpell = true;
      tempRating+=1;
    }
    if(spell.Exclusive){
      limitedSpell = true;
      tempRating+=1;
    }
    if(limitedSpell){
      return (<span>&nbsp;({tempRating})</span>)
    }else{
      return;
    }
   
  }
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
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <FormControlLabel
              value="top"
              control={<Checkbox {...label} name="Fetish" color="default" onChange={handleChangeSpellFetish} checked={spellFetish} />}
              label="Fetish?"
              labelPlacement="end"
          />
          <FormControlLabel
              value="top"
              control={<Checkbox {...label} name="Exclusive" color="default" onChange={handleChangeSpellExclusive} checked={spellExclusive} />}
              label="Exclusive?"
              labelPlacement="end"
          />
          <br></br><br></br>
          <Button variant="contained" color="primary" onClick={handleAddSpell}>
            Add Spell
          </Button>

    <hr></hr>
    <h3>Spells</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Spell Name</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Target</TableCell>
              <TableCell align="right">Duration</TableCell>
              <TableCell align="right">Drain Code</TableCell>
              <TableCell align="right">Options</TableCell>
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
                <TableCell align="right">{spell.Rating} {CalcSpellRating(spell)}</TableCell>
                <TableCell align="right">{spell.Type}</TableCell>
                <TableCell align="right">{spell.Target}</TableCell>
                <TableCell align="right">{spell.Duration}</TableCell>
                <TableCell align="right">{spell.Drain}</TableCell>
                <TableCell align="right">
                 {isFetishSpell(spell.Fetish)} {isExclusiveSpell(spell.Exclusive)}
                </TableCell>
                <TableCell align="right"><Button onClick={() => handleRemoveSpell(index)}>Remove</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
    )
  }

  const handleTraditionChange = (event) => {
    setMagicalTradition(event.target.value);
  }


  const RenderWindow = () =>{
    switch(props.magicalChoice){
      case 'Full Magician':
      case 'Human Full Magician':
      case 'Metahuman Full Magician':
        return RenderMagicianWithSpells();
      case 'Physical Adept':
      case 'Human Physical Adept':
      case 'Metahuman Physical Adept':
        return RenderPhysicalAdepts();
      case 'Aspected':
      case 'Human Shamanist':
      case 'Human Sorcerer':
      case 'Metahuman Sorcerer':
      case 'Metahuman Shamanist':
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