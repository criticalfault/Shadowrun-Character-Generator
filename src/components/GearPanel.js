import { MenuItem } from '@mui/material';
import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default function GearPanel(props) {
  const GearData = require('../data/'+props.Edition+'/Gear.json');
  const tempCategories = Object.keys(GearData);
  const GearCategories = [...tempCategories].sort();
  //const GearCollection = ['Cyberdeck','Cyberdeck Parts'];
  const CalcTotalNuyenSpent = () =>{
      let TotalNuyen = 0;
      props.Gear.forEach(function(gear){
          TotalNuyen += parseInt(gear.Cost);
      });
      return TotalNuyen;
  }
  GearData['Firearms'].entries.forEach(function(item) {
    if(!item.hasOwnProperty('BookPage')){
      console.log("No BookPage");
      console.log(item);
      return;
    }
    if(!item.BookPage.includes('.')){
      console.log("BookPage lacks .");
      console.log(item);
    }
  });
  const [NewGear, setNewGear]           = useState();
  const [NewGearCost, setNewGearCost]   = useState();
  const [NewGearIndex, setNewGearIndex] = useState(0);
  const [NewGearDesc, setNewGearDesc]   = useState('');
  const [SelectedGear, setSelectedGear] = useState(props.Gear);
  const [SelectedGearCategory, setSelectedGearCategory] = useState(GearCategories[0]);

    const handleGearCategoryChange = (event) => {
        setSelectedGearCategory(event.target.value);
    }
    const handleGearChange = (event) => {
      console.log("SelectedGearCategory:"+SelectedGearCategory);
      var TempGear = {}
      if(props.Edition === 'SR3'){
        TempGear = GearData[SelectedGearCategory].entries.filter(item => item.hasOwnProperty('BookPage') && props.BooksFilter.includes(item.BookPage.split('.')[0]))[event.target.value];
      }else{
        TempGear = GearData[SelectedGearCategory].entries[event.target.value];
      }
      console.log(TempGear);
      setNewGear(TempGear);
      setNewGearIndex(event.target.value)
      setNewGearCost(TempGear.Cost);
      if(TempGear.hasOwnProperty('Notes')){
        setNewGearDesc(TempGear.Notes)
      }
    }
  
    const handleAddGear = () => {
      if (NewGear) {
        const gearToAdd = {...NewGear};
        gearToAdd.Type = SelectedGearCategory;
        setSelectedGear(prevGear => [...prevGear, gearToAdd]);
        setNewGear('');
        setNewGearIndex('');
        props.onChangeGear([...SelectedGear, gearToAdd]);
      }
    }
  
    const handleRemoveGear = (index) => {
      const editedGear = [...SelectedGear];
      editedGear.splice(index, 1);
      setSelectedGear(editedGear);
      props.onChangeGear([...editedGear]);
    };

    return ( <>
    <h3>Notice: SR2 Gear is currently missing data needing for filtering by book. So filtering is ignored.</h3>
    <Box sx={{ width: '250px' }}>
        Nuyen Spent: {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(CalcTotalNuyenSpent())} 
    </Box>
    <br></br>

    <Box sx={{ width: '250px' }}>
        <FormControl style={{'width':'200px'}}>
            <InputLabel  id="gear-label">Gear Categories</InputLabel>
            <NativeSelect
                id="gear-dropdown"
                value={SelectedGearCategory}
                onChange={handleGearCategoryChange}>
                {GearCategories.map(catName => (
                    <option key={catName} value={catName}>{catName}</option>
                ))}
            </NativeSelect>
        </FormControl>
    </Box><br></br>
    {SelectedGearCategory && (
        <FormControl style={{ minWidth: 650 }}>
        <InputLabel id="power-label">{SelectedGearCategory}</InputLabel>
        <Select
            id="power-dropdown"
            value={NewGearIndex}
            onChange={handleGearChange}>
            
          { GearData[SelectedGearCategory].entries.filter(item => !item.hasOwnProperty('BookPage') || props.BooksFilter.includes(item.BookPage.split('.')[0])).sort((a, b) => a - b).map( (gear, index) => (
            <MenuItem selected={NewGearIndex === index} key={index} value={index}>{gear.name}</MenuItem>
          ))}
        </Select>
        </FormControl>
    )}
    {NewGear && (
        <>
            <TextField style={{'width':'100px', 'marginRight':'20px'}}
            id="power-cost-input"
            disabled={true}
            label="Cost"
            type="number"
            value={NewGearCost}
            />
            <Button variant="contained" color="primary" onClick={handleAddGear}>
            Add Gear
            </Button>
            <div>Notes:{NewGearDesc}</div>
        </>
    )}
    <br></br><br></br>
    <h3>Armor</h3>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Ballistic</TableCell>
              <TableCell align="right">Impact</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Book.Page</TableCell>
              <TableCell align="right">Availability</TableCell>
              <TableCell align="right">Notes</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.Gear.filter(item => item.hasOwnProperty('Ballistic')).map((gear, index) => (
              <TableRow key={gear.Name+index}>
                <TableCell component="th" scope="row">{gear.name}</TableCell>
                <TableCell align="right">{gear.Ballistic}</TableCell>
                <TableCell align="right">{gear.Impact}</TableCell>
                <TableCell align="right">{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(gear.Cost)}</TableCell>
                <TableCell align="right">{gear.BookPage}</TableCell>
                <TableCell align="right">{gear.Availability}</TableCell>
                <TableCell align="right">{gear.Notes}</TableCell>
                <TableCell align="right">
                    <Button color="secondary" onClick={() => handleRemoveGear(index)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    <h3>Weapons</h3>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Damage</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Book.Page</TableCell>
              <TableCell align="right">Availability</TableCell>
              <TableCell align="right">Notes</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.Gear.filter(item => item.hasOwnProperty('Damage')).map((gear, index) => (
              <TableRow key={gear.Name+index}>
                <TableCell component="th" scope="row">{gear.name}</TableCell>
                <TableCell align="right">{gear.Damage}</TableCell>
                <TableCell align="right">{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(gear.Cost)}</TableCell>
                <TableCell align="right">{gear.BookPage}</TableCell>
                <TableCell align="right">{gear.Availability}</TableCell>
                <TableCell align="right">{gear.Notes}</TableCell>
                <TableCell align="right">
                    <Button color="secondary" onClick={() => handleRemoveGear(index)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    <h3>Gear</h3>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Book.Page</TableCell>
              <TableCell align="right">Availability</TableCell>
              <TableCell align="right">Notes</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.Gear.filter(item => !item.hasOwnProperty('Damage') && !item.hasOwnProperty('Ballistic')).map((gear, index) => (
              <TableRow key={gear.Name+index}>
                <TableCell component="th" scope="row">{gear.name}</TableCell>
                <TableCell align="right">{gear.Rating??'N/A'}</TableCell>
                <TableCell align="right">{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(gear.Cost)}</TableCell>
                <TableCell align="right">{gear.BookPage}</TableCell>
                <TableCell align="right">{gear.Availability}</TableCell>
                <TableCell align="right">{gear.Notes}</TableCell>
                <TableCell align="right">
                    <Button color="secondary" onClick={() => handleRemoveGear(index)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>)

}