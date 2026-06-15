import React, { useState } from 'react';
import FilteredMenuItem from './FilteredMenuItem';
import SearchableSelect from './SearchableSelect';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

//New Vehicle Display
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// Pre-import all edition data so Vite can bundle them (no runtime require)
const allVehicles = import.meta.glob('../data/*/Vehicles.json', { eager: true });
const allDrones = import.meta.glob('../data/*/Drones.json', { eager: true });
import VehicleModsModal, { applyVehicleMods } from './VehicleModsModal';

export default function VehiclesPanel(props) {
  const VehicleData = allVehicles[`../data/${props.Edition}/Vehicles.json`]?.default;
  const DronesData = allDrones[`../data/${props.Edition}/Drones.json`]?.default;

  const CalcTotalNuyenSpent = () => {
    let TotalNuyen = 0;
    props.Vehicles.forEach(function(vehicle) {
      TotalNuyen += parseInt(vehicle['$Cost']) || 0;
      (vehicle.vehicleMods || []).forEach(function(mod) {
        TotalNuyen += parseInt(mod.cost) || 0;
      });
    });
    props.Drones.forEach(function(drone) {
      TotalNuyen += parseInt(drone['$Cost']) || 0;
      (drone.vehicleMods || []).forEach(function(mod) {
        TotalNuyen += parseInt(mod.cost) || 0;
      });
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
    const TempDrone = DronesData[event.target.value];
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
      DroneToAdd.vehicleMods = [];
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
    const TempVehicle = VehicleData[event.target.value];
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
      VehicleToAdd.vehicleMods = [];
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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  // Vehicle mods modal state
  const [vehicleModsOpen, setVehicleModsOpen] = useState(false);
  const [vehicleModsTarget, setVehicleModsTarget] = useState(null);
  const [vehicleModsIndex, setVehicleModsIndex] = useState(-1);

  const handleOpenVehicleMods = (index) => {
    setVehicleModsTarget(props.Vehicles[index]);
    setVehicleModsIndex(index);
    setVehicleModsOpen(true);
  };

  const handleSaveVehicleMods = (index, mods) => {
    const edited = [...props.Vehicles];
    edited[index] = { ...edited[index], vehicleMods: mods };
    setSelectedVehicle(edited);
    props.onChangeVehicle(edited);
    setVehicleModsOpen(false);
  };

  // Drone mods modal state
  const [droneModsOpen, setDroneModsOpen] = useState(false);
  const [droneModsTarget, setDroneModsTarget] = useState(null);
  const [droneModsIndex, setDroneModsIndex] = useState(-1);

  const handleOpenDroneMods = (index) => {
    setDroneModsTarget(props.Drones[index]);
    setDroneModsIndex(index);
    setDroneModsOpen(true);
  };

  const handleSaveDroneMods = (index, mods) => {
    const edited = [...props.Drones];
    edited[index] = { ...edited[index], vehicleMods: mods };
    setSelectedDrone(edited);
    props.onChangeDrones(edited);
    setDroneModsOpen(false);
  };

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
          <Grid item size={{ xs: 12, md:2 }}>
            <Item><strong>Handling</strong><br></br> {drone.Handling}</Item>
          </Grid>
          <Grid item size={{ xs: 12, md:2 }}>
            <Item><strong>Speed/Accel</strong><br></br> {drone['Speed/Accel']}</Item>
          </Grid>
          <Grid item size={{ xs: 12, md:2 }}>
            <Item><strong>Body/Armor</strong><br></br> {drone['Body/Armor']}</Item>
          </Grid>
          <Grid item size={{ xs: 12, md:2 }}>
            <Item><strong>Sig/Autonav</strong><br></br> {drone['Sig/Autonav']}</Item>
          </Grid>
          <Grid item size={{ xs: 12, md:2 }}>
            <Item><strong>Pilot/Sensor</strong><br></br> {drone['Pilot/Sensor']}</Item>
          </Grid>
          
          <Grid item  size={{ xs: 12, md:2 }}>
            <Item><strong>Cargo/Load</strong><br></br> {drone['Cargo/Load']}</Item>
          </Grid>
          <Grid item size={{ xs: 12, md:2 }}>
            <Item><strong>Notes</strong><br></br> {drone.Notes}</Item>
          </Grid>
          <Grid item size={{ xs: 12, md:12 }}>
            <Item><strong>Mods</strong>
            <ul>
              {(drone.vehicleMods || []).map((mod, index2) => (
                <li key={index2}>{mod.label} — {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(mod.cost)}</li>
              ))}
             </ul>
            </Item>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleOpenDroneMods(index)}>Modify</Button>
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
          <Grid item size={{ xs: 12, md:2 }}>
            <Item><strong>Handling</strong><br></br> {vehicle.Handling}</Item>
          </Grid>
          <Grid item size={{ xs: 12, md:2 }}>
            <Item><strong>Speed/Accel</strong><br></br> {vehicle['Speed/Accel']}</Item>
          </Grid>
          <Grid item size={{ xs: 12, md:2 }}>
            <Item><strong>Body/Armor</strong><br></br> {vehicle['Body/Armor']}</Item>
          </Grid>
          <Grid item size={{ xs: 12, md:2 }}>
            <Item><strong>Sig/Autonav</strong><br></br> {vehicle['Sig/Autonav']}</Item>
          </Grid>
          <Grid item size={{ xs: 12, md:2 }}>
            <Item><strong>Pilot/Sensor</strong><br></br> {vehicle['Pilot/Sensor']}</Item>
          </Grid>
          
          <Grid item  size={{ xs: 12, md:2 }}>
            <Item><strong>Cargo/Load</strong><br></br> {vehicle['Cargo/Load']}</Item>
          </Grid>
          <Grid item size={{ xs: 12, md:2 }}>
            <Item><strong>Seating</strong><br></br> {vehicle['Seating']}</Item>
          </Grid>
          <Grid item size={{ xs: 12, md:12 }}>
            <Item><strong>Notes</strong><br></br> {vehicle.Notes}</Item>
          </Grid>
          <Grid item size={{ xs: 12, md:12 }}>
            <Item><strong>Mods</strong>
            <ul>
              {(vehicle.vehicleMods || []).map((mod, index2) => (
                <li key={index2}>{mod.label} — {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(mod.cost)}</li>
              ))}
            </ul>
            </Item>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleOpenVehicleMods(index)}>Modify</Button>
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
    <SearchableSelect
      items={VehicleData}
      value={NewVehicleIndex}
      onChange={handleVehicleChange}
      label="Vehicles"
      getLabel={(v) => v.name}
      renderItem={(vehicle, i) => (
        <FilteredMenuItem
          allowed={props.BooksFilter.includes(vehicle['Book.Page'].split('.')[0])}
          bookCode={vehicle['Book.Page'].split('.')[0]}
          key={i} value={i}
        >
          {vehicle.name}
        </FilteredMenuItem>
      )}
      style={{ minWidth: 650, marginTop: 20 }}
    />

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
    <VehicleModsModal
      open={vehicleModsOpen}
      vehicle={vehicleModsTarget}
      vehicleIndex={vehicleModsIndex}
      onClose={() => setVehicleModsOpen(false)}
      onSave={handleSaveVehicleMods}
    />
    {renderVehiclesNew()}
    <hr style={{marginTop:30, marginBottom:30}}></hr>
      <h3>Drones</h3>
      <SearchableSelect
        items={DronesData}
        value={NewDroneIndex}
        onChange={handleDroneChange}
        label="Drones"
        getLabel={(d) => d.name}
        renderItem={(drone, i) => (
          <FilteredMenuItem
            allowed={props.BooksFilter.includes(drone['Book.Page'].split('.')[0])}
            bookCode={drone['Book.Page'].split('.')[0]}
            key={i} value={i}
          >
            {drone.name}
          </FilteredMenuItem>
        )}
        style={{ minWidth: 650 }}
      />

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
    <VehicleModsModal
      open={droneModsOpen}
      vehicle={droneModsTarget}
      vehicleIndex={droneModsIndex}
      onClose={() => setDroneModsOpen(false)}
      onSave={handleSaveDroneMods}
    />
    </>)

}