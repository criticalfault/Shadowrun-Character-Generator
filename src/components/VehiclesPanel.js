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

//New Vehicle Display
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';

export default function VehiclesPanel(props) {
  const VehicleData = require('../data/'+props.Edition+'/Vehicles.json');
  const DronesData = require('../data/'+props.Edition+'/Drones.json');
  const VehicleGear = require('../data/SR3/VehicleMods.json');
  const VehicleWeapons = require('../data/SR3/VehicleWeapons.json');

  const CalcTotalNuyenSpent = () =>{
      let TotalNuyen = 0;
      props.Vehicles.forEach(function(vehicle){
          TotalNuyen += parseInt(vehicle['$Cost']);
          vehicle.options.forEach(function(option){
            TotalNuyen += parseInt(option['$Cost']);
          })
      });

      props.Drones.forEach(function(drone){
        TotalNuyen += parseInt(drone['$Cost']);
        drone.options.forEach(function(option){
          TotalNuyen += parseInt(option['$Cost']);
        })
    });
      return TotalNuyen;
  }

  const [NewVehicle, setNewVehicle]           = useState();
  const [NewVehicleCost, setNewVehicleCost]   = useState();
  const [NewVehicleIndex, setNewVehicleIndex] = useState(-1);
  const [NewVehicleDesc, setNewVehicleDesc]   = useState('');
  const [SelectedVehicle, setSelectedVehicle] = useState(props.Vehicles);
  const [NewDrone, setNewDrone]           = useState();
  const [NewDroneCost, setNewDroneCost]   = useState();
  const [NewDroneIndex, setNewDroneIndex] = useState(-1);
  const [NewDroneDesc, setNewDroneDesc]   = useState('');
  const [SelectedDrone, setSelectedDrone] = useState(props.Drones);

  const handleDroneChange = (event) => { 
    if(event.target.value === -1){
      return;
    }
    const TempDrone = DronesData.filter(item => props.BooksFilter.includes(item['Book.Page'].split('.')[0]))[event.target.value];
    setNewDrone(TempDrone);
    setNewDroneIndex(event.target.value)
    setNewDroneCost(TempDrone['$Cost']);
    if(TempDrone.hasOwnProperty('Notes')){
      setNewDroneDesc(TempDrone.Notes)
    }
  }

  const handleAddDrone = () => {
    if (NewDrone) {
      const DroneToAdd = {...NewDrone};
      DroneToAdd.options = [];
      setSelectedDrone(prevDrone => [...prevDrone, DroneToAdd]);
      setNewDrone('');
      setNewDroneIndex('');
      props.onChangeDrones([...SelectedDrone, DroneToAdd]);
    }
  }

  const handleRemoveDrone = (index) => {
    const editedDrone = [...SelectedDrone];
    editedDrone.splice(index, 1);
    setSelectedDrone(editedDrone);
    props.onChangeDrones([...editedDrone]);
  };

  const handleVehicleChange = (event) => {
    if(event.target.value === -1){
      return;
    }
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
      VehicleToAdd.options = [];
      setSelectedVehicle(prevVehicle => [...prevVehicle, VehicleToAdd]);
      setNewVehicle('');
      setNewVehicleIndex(-1);
      props.onChangeVehicle([...SelectedVehicle, VehicleToAdd]);
    }
  }

  const handleRemoveVehicle = (index) => {
    const editedVehicle = [...SelectedVehicle];
    editedVehicle.splice(index, 1);
    setSelectedVehicle(editedVehicle);
    props.onChangeVehicle([...editedVehicle]);
  };

  const renderDrones = () => {
    return (<TableContainer component={Paper}>
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
    </TableContainer>)
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  /*
      VEHICLE CUSTOMIZATION
  */

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [vehicleToCustomize, setVehicleToCustomize] = useState(false);
  const [vehicleToCustomizeIndex, setVehicleToCustomizeIndex] = useState(0);
  const [VehicleGearCustomizationIndex, setVehicleGearCustomizationIndex] = useState(0)
  const handleModalVehicle = (index) => {
    setOpen(true);
    setVehicleToCustomizeIndex(index);
    setVehicleToCustomize(props.Vehicles[index]);
  }

  const handleVehicleCustomizationGearChange = (event) => {
    setVehicleGearCustomizationIndex(event.target.value);
  }

  const VehicleGearCustomizationAdd = () => {
    const editedVehicle = [...props.Vehicles];
    editedVehicle[vehicleToCustomizeIndex].options.push(VehicleGear[VehicleGearCustomizationIndex]);
    setVehicleToCustomize(false);
    setVehicleGearCustomizationIndex(0);
    props.onChangeVehicle([...editedVehicle]);
  }

  const removeVehicleOption = (index, index2) => {
    const editedVehicle = [...SelectedVehicle];
    editedVehicle[index].options.splice(index2,1);
    props.onChangeVehicle([...editedVehicle]);
  }

/*
  DRONE CUSTOMIZATION
*/
  const [openDrone, setOpenDrone] = React.useState(false);
  const handleCloseDrone = () => setOpenDrone(false);
  const [droneToCustomize, setDroneToCustomize] = useState(false);
  const [droneToCustomizeIndex, setDroneToCustomizeIndex] = useState(0);
  const [DroneGearCustomizationIndex, setDroneGearCustomizationIndex] = useState(0)
  const handleModalDrone = (index) => {
    setOpenDrone(true);
    setDroneToCustomizeIndex(index);
    setDroneToCustomize(props.Drones[index]);
  }

  const handleDroneCustomizationGearChange = (event) => {
    setDroneGearCustomizationIndex(event.target.value);
  }

  const DroneGearCustomizationAdd = () => {
    const editedDrone = [...props.Drones];
    editedDrone[droneToCustomizeIndex].options.push(VehicleGear[DroneGearCustomizationIndex]);
    setDroneToCustomize(false);
    setDroneGearCustomizationIndex(0);
    props.onChangeDrones([...editedDrone]);
  }

  const removeDroneOption = (index, index2) => {
    const editedDrone = [...SelectedDrone];
    editedDrone[index].options.splice(index2,1);
    props.onChangeDrones([...editedDrone]);
  }

  const renderDronesNew = () => {
    return props.Drones.map((drone, index) => (
      <Card sx={{ minWidth: 275, marginTop: 2 }} key={index}>
      <CardContent>
        <Typography variant="h5" component="div">
          {drone.name}
        </Typography>
        <Typography variant="h5" component="div">
        {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(drone['$Cost'])}
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={2} xs={12}>
            <Item><strong>Handling</strong><br></br> {drone.Handling}</Item>
          </Grid>
          <Grid item md={2} xs={12}>
            <Item><strong>Speed/Accel</strong><br></br> {drone['Speed/Accel']}</Item>
          </Grid>
          <Grid item md={2} xs={12}>
            <Item><strong>Body/Armor</strong><br></br> {drone['Body/Armor']}</Item>
          </Grid>
          <Grid item md={2} xs={12}>
            <Item><strong>Sig/Autonav</strong><br></br> {drone['Sig/Autonav']}</Item>
          </Grid>
          <Grid item md={2} xs={12}>
            <Item><strong>Pilot/Sensor</strong><br></br> {drone['Pilot/Sensor']}</Item>
          </Grid>
          
          <Grid item  md={2} xs={12}>
            <Item><strong>Cargo/Load</strong><br></br> {drone['Cargo/Load']}</Item>
          </Grid>
          <Grid item md={12} xs={12}>
            <Item><strong>Notes</strong><br></br> {drone.Notes}</Item>
          </Grid>
          <Grid item md={12} xs={12}>
            <Item><strong>Options</strong>
            <ul>
              {drone.options.map( (opt, index2) => (
                    <li key={index}>
                      {opt.name} - {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(opt['$Cost'])}
                      <Button onClick={() => removeDroneOption(index, index2)}>Remove</Button>
                    </li>
                  )
                )
              }
             </ul>
            </Item>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleModalDrone(index)}>Customize</Button>
        <Button size="small" onClick={() => handleRemoveDrone(index)}>Remove</Button>
      </CardActions>
    </Card>))
  }

  const renderVehiclesNew = () => {
    return props.Vehicles.map((vehicle, index) => (
      <Card sx={{ minWidth: 275, marginTop: 2 }} key={index}>
      <CardContent>
        <Typography variant="h5" component="div">
          {vehicle.name}
        </Typography>
        <Typography variant="h5" component="div">
        {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(vehicle['$Cost'])}
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={2} xs={12}>
            <Item><strong>Handling</strong><br></br> {vehicle.Handling}</Item>
          </Grid>
          <Grid item md={2} xs={12}>
            <Item><strong>Speed/Accel</strong><br></br> {vehicle['Speed/Accel']}</Item>
          </Grid>
          <Grid item md={2} xs={12}>
            <Item><strong>Body/Armor</strong><br></br> {vehicle['Body/Armor']}</Item>
          </Grid>
          <Grid item md={2} xs={12}>
            <Item><strong>Sig/Autonav</strong><br></br> {vehicle['Sig/Autonav']}</Item>
          </Grid>
          <Grid item md={2} xs={12}>
            <Item><strong>Pilot/Sensor</strong><br></br> {vehicle['Pilot/Sensor']}</Item>
          </Grid>
          
          <Grid item  md={2} xs={12}>
            <Item><strong>Cargo/Load</strong><br></br> {vehicle['Cargo/Load']}</Item>
          </Grid>
          <Grid item md={2} xs={12}>
            <Item><strong>Seating</strong><br></br> {vehicle['Seating']}</Item>
          </Grid>
          <Grid item md={12} xs={12}>
            <Item><strong>Notes</strong><br></br> {vehicle.Notes}</Item>
          </Grid>
          <Grid item md={12} xs={12}>
            <Item><strong>Options</strong>
            <ul>
              {vehicle.options.map( (opt, index2) => (
                    <li key={index}>
                      {opt.name} - {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(opt['$Cost'])}
                      <Button onClick={() => removeVehicleOption(index, index2)}>Remove</Button>
                    </li>
                  )
                )
              }
             </ul>
            </Item>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleModalVehicle(index)}>Customize</Button>
        <Button size="small" onClick={() => handleRemoveVehicle(index)}>Remove</Button>
      </CardActions>
    </Card>)
    )
  }




    return ( <>
    <Box sx={{ width: '250px' }}>
        Nuyen Spent: {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(CalcTotalNuyenSpent())} 
    </Box>
    <h3>Vehicles</h3>
    <FormControl style={{ minWidth: 650, marginTop:20 }}>
        <InputLabel id="power-label">Vehicles</InputLabel>
        <Select
            id="power-dropdown"
            value={NewVehicleIndex}
            onChange={handleVehicleChange}>
              <MenuItem selected={NewVehicleIndex === -1} key={-1} value={-1}>Select A Vehicle</MenuItem>
            { 
                VehicleData.filter(item => props.BooksFilter.includes(item['Book.Page'].split('.')[0])).sort((a, b) => a - b).map( (gear, index) => (
                    <MenuItem selected={NewVehicleIndex === index} key={index} value={index}>{gear.name}</MenuItem>
                ))
            }
        </Select>
    </FormControl>

    {NewVehicle && (
        <div style={{marginTop:20 }}>
          <TextField style={{'width':'100px', 'marginRight':'20px'}} id="power-cost-input" disabled={true}  label="Cost" type="number" value={NewVehicleCost} />
          <Button variant="contained" color="primary" onClick={handleAddVehicle}>
            Add Vehicle
          </Button>
          <div>Notes:{NewVehicleDesc}</div>
        </div>
    )}
    <br></br><br></br>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
       {vehicleToCustomize.name}
       <hr></hr>
       <Select 
        value={VehicleGearCustomizationIndex}
        onChange={handleVehicleCustomizationGearChange}>
          { 
            VehicleGear.map( (gear, index) => (
                <MenuItem selected={VehicleGearCustomizationIndex === index} key={index} value={index}>{gear.name}</MenuItem>
            ))
          }
        </Select>
        <Button variant="contained" color="primary" onClick={VehicleGearCustomizationAdd}>
          Add Gear
        </Button>
        <hr></hr>
       <Button onClick={handleClose}>Close</Button>
      </Box>
     
    </Modal>
    {renderVehiclesNew()}
    <hr style={{marginTop:30, marginBottom:30}}></hr>
      <h3>Drones</h3>
      <FormControl style={{ minWidth: 650 }}>
        <InputLabel id="power-label">Drones</InputLabel>
        <Select
            id="power-dropdown"
            value={NewDroneIndex}
            onChange={handleDroneChange}>
              <MenuItem selected={NewDroneIndex === -1} key={-1} value={-1}>Select A Drone</MenuItem>
            { 
                DronesData.filter(item => props.BooksFilter.includes(item['Book.Page'].split('.')[0])).sort((a, b) => a - b).map( (gear, index) => (
                    <MenuItem selected={NewDroneIndex === index} key={index} value={index}>{gear.name}</MenuItem>
                ))
            }
        </Select>
    </FormControl>

    {NewDrone && (
        <div style={{marginTop:20 }}>
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
        </div>
    )}
    <br></br><br></br>
      {renderDronesNew()}
    <Modal
        open={openDrone}
        onClose={handleCloseDrone}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
       {droneToCustomize.name}
       <hr></hr>
       <Select 
        value={DroneGearCustomizationIndex}
        onChange={handleDroneCustomizationGearChange}>
          { 
            VehicleGear.map( (gear, index) => (
                <MenuItem selected={DroneGearCustomizationIndex === index} key={index} value={index}>{gear.name}</MenuItem>
            ))
          }
        </Select>
        <Button variant="contained" color="primary" onClick={DroneGearCustomizationAdd}>
          Add Gear
        </Button>
        <hr></hr>
       <Button onClick={handleCloseDrone}>Close</Button>
      </Box>
     
    </Modal>
    </>)

}