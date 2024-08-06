import { MenuItem } from '@mui/material';
import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
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
    
  const CyberwareData = require('../data/'+props.Edition+'/Cyberware.json');
  const BiowareData = require('../data/'+props.Edition+'/Bioware.json');
  const CalcEssenceSpent = () =>{
    let EssenceSpent = 0;
    let EyeEssenceSpent = 0;
    let ReplacedCyberEyes = false;
    props.Cyberware.forEach(function(cyber){

      if(cyber.hasOwnProperty('Replacement') && cyber.Replacement === true){
        ReplacedCyberEyes =true;
      }
      if(cyber.Type === 'EYES' && !cyber.hasOwnProperty('Replacement')){
        EyeEssenceSpent += parseFloat(cyber.EssCost);
      }else{
        EssenceSpent += parseFloat(cyber.EssCost);
      }
      
    });
    if(ReplacedCyberEyes){
      if(EyeEssenceSpent-.5 > 0){
        EssenceSpent += (EyeEssenceSpent-.5);
      }
    }else{
      EssenceSpent += EyeEssenceSpent;
    }
    
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

  
  const [EssencePointsSpent, setEssencePointsSpent]               = useState(CalcEssenceSpent());
  const [BodyIndexPointsSpent, setBodyIndexPointsSpent]           = useState(CalcBioIndexSpent());
  const [SelectedCyberwareCategory, setSelectedCyberwareCategory] = useState('BODYWARE');
  
  const [NewCyberware, setNewCyberware]           = useState();
  const [NewCyberwareCost, setNewCyberwareCost]   = useState();
  const [NewCyberwareGrade, setNewCyberwareGrade]   = useState('standard');
  const [NewCyberwareIndex, setNewCyberwareIndex] = useState(0);
  const [NewCyberwareDesc, setNewCyberwareDesc]   = useState('');
  const [selectedCyberware, setSelectedCyberware] = useState(props.Cyberware);
  const [TotalCyberwareCost, setTotalCyberwareCost] = useState(CalcTotalNuyenSpent());
  const CyberwareCategories = ['BODYWARE','COMMUNICATIONS','CYBERWEAPONS','EARS','EYES','HEADWEAR','CYBERLIMBS','CYBERLIMB MODS','FEET','HANDS','MATRIXWARE','RIGGER','SENSEWARE','NANOWARE','VARIOUS'];
  const handleCyberwareCategoryChange = (event) => {
      setSelectedCyberwareCategory(event.target.value);
  }
  const handleCyberwareChange = (event) => {
    if(CyberwareData[SelectedCyberwareCategory] !== undefined){
      const TempCyber = CyberwareData[SelectedCyberwareCategory].filter(item => props.BooksFilter.includes(item.BookPage.split('.')[0]))[event.target.value];
      setNewCyberware(TempCyber);
      setNewCyberwareIndex(event.target.value)
      setNewCyberwareGrade('standard');
      TempCyber.Cost *= CyberwareGrades['standard'].CostMod;
      setNewCyberwareCost(TempCyber.Cost);
      setNewCyberwareDesc(TempCyber.Notes)
    }else{
      // Hmm, its missing? what should we do?
    }
  }

  const handleAddCyberware = () => {
      if (NewCyberware) {
        const cyberToAdd = {...NewCyberware};
        cyberToAdd.Cost *= CyberwareGrades[NewCyberwareGrade].CostMod;
        cyberToAdd.EssCost *= CyberwareGrades[NewCyberwareGrade].EssenceReduction;
        cyberToAdd.Grade = NewCyberwareGrade;
        cyberToAdd.Type = SelectedCyberwareCategory;
        setSelectedCyberware(prevCyberware => [...prevCyberware, cyberToAdd]);
        setNewCyberware('');
        setNewCyberwareIndex('');
        props.onChangeCyberware([...selectedCyberware, cyberToAdd]);
      }
  }

  const handleRemoveCyberware = (index) => {
    const editedCyberware = [...selectedCyberware];
    let RemovedCyberware = editedCyberware.splice(index, 1);
    console.log("Removed Cyberware:");
    console.log(RemovedCyberware);
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
        'ROD':'Body',
        'STR':'Strength',
        'RTR':'Strength',
        'QCK':'Quickness', 
        'RCK':"Quickness",
        'INT':'Intelligence', 
        'RNT':'Intelligence',
        'CHA':'Charisma',
        'WIL':'Willpower',
        'RCT':'Reaction',
        'NCT':'Reaction',
        'INI':"Initative",
        'NNI':"Initative",
        'IMP':'Impact',
        'BAL':'Ballastic',
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

const handleCyberOrBioChange = (event) => {
  try{
    let cyberAttributeBonuses = {'Body':0,'Quickness':0,'Strength':0,'Charisma':0,'Willpower':0,'Intelligence':0,'Reaction':0,'Initative':0};
    let cyberModsTotals = [];
    let bioModsTotals = [];
    selectedCyberware.forEach(function(cyber){
      if(cyber.Mods !== ''){
        cyberModsTotals.push(cyber.Mods)
      }
    });
    cyberModsTotals.forEach(function(mod){
      console.log(mod);
      let AttributesToMod = convertModsToAttributes(mod.split(','));
      for(let i=0; i<AttributesToMod.length; i++){
          if(!cyberAttributeBonuses.hasOwnProperty(Object.keys(AttributesToMod[i])[0])){
              cyberAttributeBonuses[Object.keys(AttributesToMod[i])[0]] = 0;
          }
          cyberAttributeBonuses[Object.keys(AttributesToMod[i])[0]] += parseInt(Object.values(AttributesToMod[i])[0]);
        }
    });
    SelectedBioware.forEach(function(cyber){
      if(cyber.Mods !== ''){
        bioModsTotals.push(cyber.Mods)
      }
    });
    bioModsTotals.forEach(function(mod){
      let AttributesToMod = convertModsToAttributes(mod.split(','));
      for(let i=0; i<AttributesToMod.length; i++){
          if(!cyberAttributeBonuses.hasOwnProperty(Object.keys(AttributesToMod[i])[0])){
              cyberAttributeBonuses[Object.keys(AttributesToMod[i])[0]] = 0;
          }
          cyberAttributeBonuses[Object.keys(AttributesToMod[i])[0]] += parseInt(Object.values(AttributesToMod[i])[0]);
        }
    });
    props.onChangeCyberAttributes(cyberAttributeBonuses);
  }catch(err){
    console.log(err);
    alert("We have hit a fatal error. Please try again later. This has been reported to the developer.");
  }

}

  const handleBiowareChange = (event) => {
      const TempCyber = BiowareData[BiowareSelectedCategory].filter(item => props.BooksFilter.includes(item.BookPage.split('.')[0]))[event.target.value];
      setNewBioware(TempCyber);
      setNewBiowareIndex(event.target.value)
      setNewBiowareCost(TempCyber.Cost);
      setNewBiowareDesc(TempCyber.Notes)
  }

  const handleAddBioware = () => {
      if (NewBioware) {
        const bioToAdd = {...NewBioware};
        setSelectedBioware(prevBioware => [...prevBioware, bioToAdd]);
        setNewBioware('');
        setNewBiowareIndex('');
        props.onChangeBioware([...SelectedBioware, bioToAdd]);
      }
  }

  const handleRemoveBioware = (index) => {
      const editedBioware = [...SelectedBioware];
      editedBioware.splice(index, 1);
      setSelectedBioware(editedBioware);
      props.onChangeBioware([...editedBioware]);
  };

  const CheckIfSystemIsStressed = () =>{
    if(parseFloat(props.Essence-EssencePointsSpent+3).toFixed(2) < BodyIndexPointsSpent){
      return (<Box sx={{ width: '100%' }}>
        System is over Stressed!<br></br>
      </Box>)
    }
  }

  const CyberwareGrades   = { 'used':     {'EssenceReduction': 1, 'CostMod':.5, 'AvailabilityMod':1, 'AvailabilityTimeMod':1},
                              'standard': {'EssenceReduction': 1, 'CostMod':1, 'AvailabilityMod':1, 'AvailabilityTimeMod':1},
                              'alpha':    {'EssenceReduction':.8, 'CostMod':2 , 'AvailabilityMod':1, 'AvailabilityTimeMod':1},
                              'beta':     {'EssenceReduction':.6, 'CostMod':4 , 'AvailabilityMod':3, 'AvailabilityTimeMod':1.5},
                              'delta':    {'EssenceReduction':.5, 'CostMod':8 , 'AvailabilityMod':9, 'AvailabilityTimeMod':3}
                            };

  const handleChangeGrade = (event) => {
    setNewCyberwareGrade(event.target.value);
  };

  useEffect(function(){
    setEssencePointsSpent(CalcEssenceSpent());
    setBodyIndexPointsSpent(CalcBioIndexSpent());
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
        <FormControl style={{'width':'200px', "display":"inline-block"}}>
          <InputLabel  id="cyberware-label">Cyberware Categories</InputLabel>
          <NativeSelect
            id="cyberware-dropdown"
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
      <>
        <FormControl style={{ minWidth: 650 }}>
        <InputLabel id="power-label">{SelectedCyberwareCategory}</InputLabel>
        <Select
            id="power-dropdown"
            value={NewCyberwareIndex}
            onChange={handleCyberwareChange}>
            {CyberwareData[SelectedCyberwareCategory].filter(item => props.BooksFilter.includes(item.BookPage.split('.')[0])).map( (cyber, index) => (
            <MenuItem selected={NewCyberwareIndex === index} key={index} value={index}>{cyber.Name} - Essence Cost: {cyber.EssCost}</MenuItem>
            ))}
        </Select>
        </FormControl>
        <br/><br/>
        <FormControl>
          <FormLabel id="grade-radio-buttons-group-label">Grade</FormLabel>
          <RadioGroup
            aria-labelledby="grade-radio-buttons-group-label"
            defaultValue="standard"
            name="cyberware-grade-radio-buttons" row
          >
            <FormControlLabel value="used" control={<Radio onChange={handleChangeGrade} checked={ NewCyberwareGrade === 'used' } />} label="Used" />
            <FormControlLabel value="standard" control={<Radio onChange={handleChangeGrade} checked={ NewCyberwareGrade === 'standard' } />} label="Standard" />
            <FormControlLabel value="alpha" control={<Radio onChange={handleChangeGrade} checked={ NewCyberwareGrade === 'alpha' } />} label="Alpha" />
            <FormControlLabel value="beta" control={<Radio onChange={handleChangeGrade} checked={ NewCyberwareGrade === 'beta' } />} label="Beta" />
            <FormControlLabel value="delta" control={<Radio onChange={handleChangeGrade} checked={ NewCyberwareGrade === 'delta' } />} label="Delta" />
          </RadioGroup>
        </FormControl>
        </>
        )}
        {NewCyberware && (
        <>
            <TextField style={{'width':'120px', 'marginRight':'20px'}}
            id="power-cost-input"
            disabled={true}
            label="Cost"
            type="number"
            value={NewCyberwareCost * CyberwareGrades[NewCyberwareGrade].CostMod}
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
                <TableCell align="right">Grade</TableCell>
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
                  <TableCell align="right">{cyberware.Grade}</TableCell>
                  <TableCell align="right">{parseFloat(cyberware.EssCost).toFixed(2)}</TableCell>
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
    <Box sx={{ width: '100%' }}>Body Index / Essence Index: {BodyIndexPointsSpent}/{parseFloat(props.Essence-EssencePointsSpent+3).toFixed(2)}</Box>
    {
      CheckIfSystemIsStressed()
    }
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
        {BiowareData[BiowareSelectedCategory].filter(item => props.BooksFilter.includes(item.BookPage.split('.')[0])).map( (cyber, index) => (
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