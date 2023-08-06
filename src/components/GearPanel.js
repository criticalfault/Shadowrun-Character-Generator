import { MenuItem } from '@mui/material';
import React, { useState, useEffect } from 'react';
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

const GearData = require('../data/SR3/Gear.json');
export default function GearPanel(props) {
    const GearCategories = Object.keys(GearData).sort((a, b) => a - b);
    const GearCollection = ['Cyberdeck','Cyberdeck Parts'];
    const CalcTotalNuyenSpent = () =>{
        let TotalNuyen = 0;
        props.Gear.forEach(function(gear){
            TotalNuyen += parseInt(gear.Cost);
        });
        return TotalNuyen;
    }
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
        const TempGear = GearData[SelectedGearCategory].entries[event.target.value];
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
      let RemovedGear = editedGear.splice(index, 1);
      setSelectedGear(editedGear);
      props.onChangeGear([...editedGear]);
    };

    return ( <>
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
            
          { GearData[SelectedGearCategory].entries.sort((a, b) => a - b).map( (gear, index) => (
            <MenuItem selected={NewGearIndex == index} key={index} value={index}>{gear.name}</MenuItem>
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
            {props.Gear.filter(item => !item.hasOwnProperty('Damage') || item.hasOwnProperty('Ballistic')).map((gear, index) => (
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