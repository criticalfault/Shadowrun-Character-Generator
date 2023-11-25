import { MenuItem } from '@mui/material';
import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AccordionCard from './AccordianCard'

export default function VehiclesPanel(props) {
  const VehicleData = require('../data/'+props.Edition+'/Vehicles.json');
  const DronesData = require('../data/'+props.Edition+'/Drones.json');
  //const VehicleGear = require('../data/'+props.Edition+'/VehicleGear.json');
  //const VehicleWeapons = require('../data/'+props.Edition+'/VehicleWeapons.json');
  const CalcTotalNuyenSpent = () =>{
      let TotalNuyen = 0;
      props.Vehicles.forEach(function(vehicle){
          TotalNuyen += parseInt(vehicle['$Cost']);
      });

      props.Drones.forEach(function(drone){
        TotalNuyen += parseInt(drone['$Cost']);
    });
      return TotalNuyen;
  }

  const [NewVehicle, setNewVehicle]           = useState();
  const [NewVehicleCost, setNewVehicleCost]   = useState();
  const [NewVehicleIndex, setNewVehicleIndex] = useState(0);
  const [NewVehicleDesc, setNewVehicleDesc]   = useState('');
  const [SelectedVehicle, setSelectedVehicle] = useState(props.Vehicles);
  const [NewDrone, setNewDrone]           = useState();
  const [NewDroneCost, setNewDroneCost]   = useState();
  const [NewDroneIndex, setNewDroneIndex] = useState(0);
  const [NewDroneDesc, setNewDroneDesc]   = useState('');
  const [SelectedDrone, setSelectedDrone] = useState(props.Drones);

  const handleDroneChange = (event) => { 
    const TempDrone = DronesData.filter(item => props.BooksFilter.includes(item['Book.Page'].split('.')[0]))[event.target.value];
    setNewDrone(TempDrone);
    setNewDroneIndex(event.target.value)
    setNewDroneCost(TempDrone['$Cost']);
    if(TempDrone.hasOwnProperty('Notes')){
      setNewVehicleDesc(TempDrone.Notes)
    }
  }

  const handleAddDrone = () => {
    if (NewDrone) {
      const DroneToAdd = {...NewDrone};
      setSelectedDrone(prevDrone => [...prevDrone, DroneToAdd]);
      setNewDrone('');
      setNewDroneIndex('');
      props.onChangeDrones([...SelectedDrone, DroneToAdd]);
    }
  }

  const handleRemoveDrone = (index) => {
    const editedDrone = [...SelectedDrone];
    let RemovedDrone = editedDrone.splice(index, 1);
    setSelectedDrone(editedDrone);
    props.onChangeDrones([...editedDrone]);
  };


    const handleVehicleChange = (event) => {
        
        const TempVehicle = VehicleData.filter(item => props.BooksFilter.includes(item['Book.Page'].split('.')[0]))[event.target.value];
        setNewVehicle(TempVehicle);
        setNewVehicleIndex(event.target.value)
        setNewVehicleCost(TempVehicle['$Cost']);
        if(TempVehicle.hasOwnProperty('Notes')){
          setNewVehicleDesc(TempVehicle.Notes)
        }
    }
  
    const handleAddVehicle = () => {
        if (NewVehicle) {
          const VehicleToAdd = {...NewVehicle};
          setSelectedVehicle(prevVehicle => [...prevVehicle, VehicleToAdd]);
          setNewVehicle('');
          setNewVehicleIndex('');
          props.onChangeVehicle([...SelectedVehicle, VehicleToAdd]);
        }
    }
  
    const handleRemoveVehicle = (index) => {
      const editedVehicle = [...SelectedVehicle];
      let RemovedVehicle = editedVehicle.splice(index, 1);
      console.log("Removed Vehicle");
      console.log(RemovedVehicle);
      setSelectedVehicle(editedVehicle);
      props.onChangeVehicle([...editedVehicle]);
    };

    return ( <>
    <Box sx={{ width: '250px' }}>
        Nuyen Spent: {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(CalcTotalNuyenSpent())} 
    </Box>
    <br></br>
    <FormControl style={{ minWidth: 650 }}>
        <InputLabel id="power-label">Vehicles</InputLabel>
        <Select
            id="power-dropdown"
            value={NewVehicleIndex}
            onChange={handleVehicleChange}>
            { 
                VehicleData.filter(item => props.BooksFilter.includes(item['Book.Page'].split('.')[0])).sort((a, b) => a - b).map( (gear, index) => (
                    <MenuItem selected={NewVehicleIndex === index} key={index} value={index}>{gear.name}</MenuItem>
                ))
            }
        </Select>
    </FormControl>

    {NewVehicle && (
        <>
            <TextField style={{'width':'100px', 'marginRight':'20px'}}
            id="power-cost-input"
            disabled={true}
            label="Cost"
            type="number"
            value={NewVehicleCost}
            />
            <Button variant="contained" color="primary" onClick={handleAddVehicle}>
            Add Vehicle
            </Button>
            <div>Notes:{NewVehicleDesc}</div>
        </>
    )}
    <br></br><br></br>
   
    <h3>Vehicles</h3>
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Handling</TableCell>
              <TableCell align="right">Speed/Accel</TableCell>
              <TableCell align="right">Body/Armor</TableCell>
              <TableCell align="right">Sig/Autonav</TableCell>
              <TableCell align="right">Pilot/Sensor</TableCell>
              <TableCell align="right">Cargo/Load</TableCell>
              <TableCell align="right">Seating</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Availability</TableCell>
              <TableCell align="right">Book Page</TableCell>
              <TableCell align="right">Notes</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.Vehicles.map((vehicle, index) => (
              <TableRow key={vehicle.Name+index}>
                <TableCell component="th" scope="row">{vehicle.name}</TableCell>
                <TableCell align="right">{vehicle.Handling}</TableCell>
                <TableCell align="right">{vehicle['Speed/Accel']}</TableCell>
                <TableCell align="right">{vehicle['Body/Armor']}</TableCell>
                <TableCell align="right">{vehicle['Sig/Autonav']}</TableCell>
                <TableCell align="right">{vehicle['Pilot/Sensor']}</TableCell>
                <TableCell align="right">{vehicle['Cargo/Load']}</TableCell>
                <TableCell align="right">{vehicle.Seating}</TableCell>
                <TableCell align="right">{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(vehicle['$Cost'])}</TableCell>
                <TableCell align="right">{vehicle.Availability}</TableCell>
                <TableCell align="right">{vehicle['Book.Page']}</TableCell>
                <TableCell align="right">{vehicle.Notes}</TableCell>
                <TableCell align="right">
                    <Button color="secondary" onClick={() => handleRemoveVehicle(index)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <hr></hr>
      <FormControl style={{ minWidth: 650, marginTop:20 }}>
        <InputLabel id="power-label">Drones</InputLabel>
        <Select
            id="power-dropdown"
            value={NewDroneIndex}
            onChange={handleDroneChange}>
            { 
                DronesData.filter(item => props.BooksFilter.includes(item['Book.Page'].split('.')[0])).sort((a, b) => a - b).map( (gear, index) => (
                    <MenuItem selected={NewDroneIndex === index} key={index} value={index}>{gear.name}</MenuItem>
                ))
            }
        </Select>
    </FormControl>

    {NewDrone && (
        <>
            <TextField style={{'width':'100px', 'marginRight':'20px'}}
            id="power-cost-input"
            disabled={true}
            label="Cost"
            type="number"
            value={NewDroneCost}
            />
            <Button variant="contained" color="primary" onClick={handleAddDrone}>
            Add Drone
            </Button>
            <div>Notes:{NewDroneDesc}</div>
        </>
    )}
    <br></br><br></br>



      <h3>Drones</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Handling</TableCell>
              <TableCell align="right">Speed/Accel</TableCell>
              <TableCell align="right">Body/Armor</TableCell>
              <TableCell align="right">Sig/Autonav</TableCell>
              <TableCell align="right">Pilot/Sensor</TableCell>
              <TableCell align="right">Cargo/Load</TableCell>
              <TableCell align="right">Seating</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Availability</TableCell>
              <TableCell align="right">Book Page</TableCell>
              <TableCell align="right">Notes</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.Drones.map((drone, index) => (
              <TableRow key={drone.Name+index}>
                <TableCell component="th" scope="row">{drone.name}</TableCell>
                <TableCell align="right">{drone.Handling}</TableCell>
                <TableCell align="right">{drone['Speed/Accel']}</TableCell>
                <TableCell align="right">{drone['Body/Armor']}</TableCell>
                <TableCell align="right">{drone['Sig/Autonav']}</TableCell>
                <TableCell align="right">{drone['Pilot/Sensor']}</TableCell>
                <TableCell align="right">{drone['Cargo/Load']}</TableCell>
                <TableCell align="right">{drone.Seating}</TableCell>
                <TableCell align="right">{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(drone['$Cost'])}</TableCell>
                <TableCell align="right">{drone.Availability}</TableCell>
                <TableCell align="right">{drone['Book.Page']}</TableCell>
                <TableCell align="right">{drone.Notes}</TableCell>
                <TableCell align="right">
                    <Button color="secondary" onClick={() => handleRemoveDrone(index)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>)

}