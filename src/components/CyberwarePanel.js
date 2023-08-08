import { MenuItem } from '@mui/material';
import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import LinearProgress from '@mui/material/LinearProgress';
import NativeSelect from '@mui/material/NativeSelect';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default function CyberwarePanel(props) {
    
  const CyberwareData = require('../data/SR3/Cyberware.json');
  const BiowareData = require('../data/SR3/Bioware.json');

  const CalcEssenceSpent = () =>{
    let EssenceSpent = 0;
    props.Cyberware.forEach(function(cyber){
      EssenceSpent += parseFloat(cyber.EssCost);
    });
    return EssenceSpent.toFixed(2);
  }

  const CalcTotalNuyenSpent = () =>{
    let TotalNuyen = 0;
    props.Cyberware.forEach(function(cyber){
      TotalNuyen += parseInt(cyber.Cost);
    });
    return TotalNuyen;
  }

  const CalcBioIndexSpent = () =>{
    let BioIndex = 0;
    props.Bioware.forEach(function(bio){
      BioIndex += parseFloat(bio.BioIndex);
    });
    return BioIndex.toFixed(2);
  }

  
  const [Essence, setEssence]                                     = useState(props.Essence);
  const [EssencePointsSpent, setEssencePointsSpent]               = useState(CalcEssenceSpent());
  const [BodyIndex, setBodyIndex]                                 = useState(CalcBioIndexSpent());
  const [SelectedCyberwareCategory, setSelectedCyberwareCategory] = useState('BODYWARE');
  
  const [NewCyberware, setNewCyberware]           = useState();
  const [NewCyberwareCost, setNewCyberwareCost]   = useState();
  const [NewCyberwareIndex, setNewCyberwareIndex] = useState(0);
  const [NewCyberwareDesc, setNewCyberwareDesc]   = useState('');
  const [selectedCyberware, setSelectedCyberware] = useState(props.Cyberware);
  const [TotalCyberwareCost, setTotalCyberwareCost] = useState(CalcTotalNuyenSpent());
  const CyberwareCategories = ['BODYWARE','COMMUNICATIONS','CYBERWEAPONS','EARS','EYES','HEADWEAR','CYBERLIMBS','CYBERLIMB MODS','FEET','HANDS','MATRIXWARE','RIGGER','SENSEWARE','NANOWARE','VARIOUS'];
  const handleCyberwareCategoryChange = (event) => {
      setSelectedCyberwareCategory(event.target.value);
  }
  const handleCyberwareChange = (event) => {
      const TempCyber = CyberwareData[SelectedCyberwareCategory][event.target.value];
      setNewCyberware(TempCyber);
      setNewCyberwareIndex(event.target.value)
      setNewCyberwareCost(TempCyber.Cost);
      setNewCyberwareDesc(TempCyber.Notes)
  }

  const handleAddCyberware = () => {
      if (NewCyberware) {
        const cyberToAdd = {...NewCyberware};
        setSelectedCyberware(prevCyberware => [...prevCyberware, cyberToAdd]);
        setNewCyberware('');
        setNewCyberwareIndex('');
        props.onChangeCyberware([...selectedCyberware, cyberToAdd]);
      }
  }

  const handleRemoveCyberware = (index) => {
    const editedCyberware = [...selectedCyberware];
    let RemovedCyberware = editedCyberware.splice(index, 1);
    setSelectedCyberware(editedCyberware);
    props.onChangeCyberware([...editedCyberware]);
  };
  
  const [NewBioware, setNewBioware]                           = useState();
  const [NewBiowareCost, setNewBiowareCost]                   = useState();
  const [NewBiowareIndex, setNewBiowareIndex]                 = useState(0);
  const [NewBiowareDesc, setNewBiowareDesc]                   = useState('');
  const [SelectedBioware, setSelectedBioware]                 = useState(props.Bioware);
  const [BiowareSelectedCategory, setBiowareSelectedCategory] = useState();
  const BiowareCategories = ['STANDARD','CULTURED','COSMETIC','NANOWARE','GENETECH']
  const handleBiowareCategoryChange = (event) => {
      setBiowareSelectedCategory(event.target.value);
  }
  const convertModsToAttributes = (mods) => {
    const ModToAttributes ={ 
        'BOD':'Body',
        'STR':'Strength',
        'QCK':'Quickness', 
        'INT':'Intelligence', 
        'CHA':'Charisma',
        'WIL':'Willpower',
        'RCT':'Reaction',
        'INI':"Initative",
        'IMP':'Impact',
        'BAL':'Ballastic',
        'TASK':'Task Pool',
        'HAC':'Hacking Pool',
        'VNI':'Vehicle Initative',
        'VCT':'Vehicle Control Reaction',
        'VCR':'Vehicle Control Rig Level'
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

const handleCyberOrBioChange = (event) => {
  let cyberAttributeBonuses = {'Body':0,'Quickness':0,'Strength':0,'Charisma':0,'Willpower':0,'Intelligence':0,'Reaction':0,'Initative':0};
  let cyberModsTotals = [];
  selectedCyberware.forEach(function(cyber){
    if(cyber.Mods !== ''){
      cyberModsTotals.push(cyber.Mods)
    }
  });
  cyberModsTotals.forEach(function(mod){
    let AttributesToMod = convertModsToAttributes(mod.split(','));
    for(let i=0; i<AttributesToMod.length; i++){
        if(!cyberAttributeBonuses.hasOwnProperty(Object.keys(AttributesToMod[i])[0])){
            cyberAttributeBonuses[Object.keys(AttributesToMod[i])[0]] = 0;
        }
        cyberAttributeBonuses[Object.keys(AttributesToMod[i])[0]] += parseInt(Object.values(AttributesToMod[i])[0]);
      }
  });
  props.onChangeCyberAttributes(cyberAttributeBonuses);
}

  const handleBiowareChange = (event) => {
      const TempCyber = BiowareData[BiowareSelectedCategory][event.target.value];
      setNewBioware(TempCyber);
      setNewBiowareIndex(event.target.value)
      setNewBiowareCost(TempCyber.Cost);
      setNewBiowareDesc(TempCyber.Notes)
  }

  const handleAddBioware = () => {
      if (NewBioware) {
        const powerToAdd = {...NewBioware};
        setSelectedBioware(prevBioware => [...prevBioware, powerToAdd]);
      //   SetAdeptPointsSpent(prevCyberwarePointsSpent => (prevCyberwarePointsSpent + powerToAdd.Cost));
        setNewBioware('');
        setNewBiowareIndex('');
        props.onChangeBioware([...SelectedBioware, powerToAdd]);
        setEssence(prevEssence => prevEssence - NewBioware.EssCost);
        props.onChangeEssence(Essence);
      }
  }

  const handleRemoveBioware = (index) => {
      const editedBioware = [...SelectedBioware];
      let RemovedBioware = editedBioware.splice(index, 1);
      setEssence(prevEssence => prevEssence + RemovedBioware.EssCost);
      props.onChangeEssence(Essence);
      setSelectedCyberware(editedBioware);
  };


  useEffect(function(){
    setEssencePointsSpent(CalcEssenceSpent());
    setBodyIndex(CalcBioIndexSpent());
    setTotalCyberwareCost(CalcTotalNuyenSpent());
    handleCyberOrBioChange();
  },[selectedCyberware,SelectedBioware]);

    
    return (<>
        <h3>Cyberware</h3>
        <Box sx={{ width: '250px' }}>Essence Points {parseFloat(props.Essence-EssencePointsSpent).toFixed(2)}/6
            <LinearProgress variant="determinate" value={(parseFloat(props.Essence-EssencePointsSpent))/6*100} />
        </Box>
        <Box sx={{ width: '250px' }}>
        Cyberware Cost: {TotalCyberwareCost}
        </Box>
        <br></br>
        <FormControl style={{'width':'200px'}}>
        <InputLabel  id="skill-label">Cyberware Categories</InputLabel>
        <NativeSelect
          id="skill-dropdown"
          value={SelectedCyberwareCategory}
          onChange={handleCyberwareCategoryChange}>
          {CyberwareCategories.map(catName => (
            <option key={catName} value={catName}>{catName}</option>
          ))}
        </NativeSelect>
      </FormControl>
      <br></br>
      <br></br>
    {SelectedCyberwareCategory && (
        <FormControl style={{ minWidth: 650 }}>
        <InputLabel id="power-label">{SelectedCyberwareCategory}</InputLabel>
        <Select
            id="power-dropdown"
            value={NewCyberwareIndex}
            onChange={handleCyberwareChange}>
            {CyberwareData[SelectedCyberwareCategory].map( (cyber, index) => (
            <MenuItem selected={NewCyberwareIndex === index} key={index} value={index}>{cyber.Name} - Essence Cost: {cyber.EssCost}</MenuItem>
            ))}
        </Select>
        </FormControl>
        )}
        {NewCyberware && (
        <>
            <TextField style={{'width':'100px', 'marginRight':'20px'}}
            id="power-cost-input"
            disabled={true}
            label="Cost"
            type="number"
            value={NewCyberwareCost}
            />
            <Button variant="contained" color="primary" onClick={handleAddCyberware}>
            Add Cyberware
            </Button>
            <div>Notes:{NewCyberwareDesc}</div>
        </>
        )}
        <br></br><br></br>
        <h4>Cyberware</h4>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Essence Cost</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Book.Page</TableCell>
              <TableCell align="right">Notes</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.Cyberware.map((cyberware, index) => (
              <TableRow key={cyberware.Name+index}>
                <TableCell component="th" scope="row">{cyberware.Name}</TableCell>
                <TableCell align="right">{cyberware.EssCost}</TableCell>
                <TableCell align="right">{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(cyberware.Cost)}</TableCell>
                <TableCell align="right">{cyberware.BookPage}</TableCell>
                <TableCell align="right">{cyberware.Notes}</TableCell>
                <TableCell align="right">
                    <Button color="secondary" onClick={() => handleRemoveCyberware(index)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    <br></br>
    <hr></hr>
    <h3>Bioware</h3>
    {/* <Box sx={{ width: '100%' }}>Body Index {BodyIndex}/6
        <LinearProgress variant="determinate" value={EssencePointsSpent} />
    </Box> */}
    <br></br>
    <FormControl style={{'width':'200px'}}>
    <InputLabel  id="skill-label">Bioware Categories</InputLabel>
    <NativeSelect
        id="skill-dropdown"
        value={BiowareSelectedCategory}
        onChange={handleBiowareCategoryChange}>
        {BiowareCategories.map(catName => (
        <option key={catName} value={catName}>{catName}</option>
        ))}
    </NativeSelect>
    </FormControl>
    <br></br>
    <br></br>
{BiowareSelectedCategory && (
    <FormControl style={{ minWidth: 650 }}>
    <InputLabel  id="power-label">{BiowareSelectedCategory}</InputLabel>
    <Select
        id="power-dropdown"
        value={NewBiowareIndex}
        onChange={handleBiowareChange}>
        {BiowareData[BiowareSelectedCategory].map( (cyber, index) => (
        <MenuItem selected={NewBiowareIndex === index} key={index} value={index}>{cyber.Name} - BioIndex Cost: {cyber.BioIndex}</MenuItem>
        ))}
    </Select>
    </FormControl>
    )}
    {NewBioware && (
    <>
        <TextField style={{'width':'100px', 'marginRight':'20px'}}
        id="power-cost-input"
        disabled={true}
        label="Cost"
        type="number"
        value={NewBiowareCost}
        />
        <Button variant="contained" color="primary" onClick={handleAddBioware}>
        Add Bioware
        </Button>
        <div>Notes:{NewBiowareDesc}</div>
    </>
    )}
    <br></br><br></br>
    <h4>Bioware</h4>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">BioIndex Cost</TableCell>
                <TableCell align="right">Cost</TableCell>
                <TableCell align="right">Book.Page</TableCell>
                <TableCell align="right">Notes</TableCell>
                <TableCell align="right">Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {props.Bioware.map((bioware, index) => (
                <TableRow key={bioware.Name+index}>
                    <TableCell component="th" scope="row">{bioware.Name}</TableCell>
                    <TableCell align="right">{bioware.BioIndex}</TableCell>
                    <TableCell align="right">{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(bioware.Cost)}</TableCell>
                    <TableCell align="right">{bioware.BookPage}</TableCell>
                    <TableCell align="right">{bioware.Notes}</TableCell>
                    <TableCell align="right">
                        <Button color="secondary" onClick={() => handleRemoveBioware(index)}>Remove</Button>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>



    </>)
    


}