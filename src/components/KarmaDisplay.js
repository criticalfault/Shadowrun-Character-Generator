import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@mui/material/Modal';

function KarmaDisplay(props) {
    
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen  = () => setOpen(true);
    const [Karma, setKarma] = useState(props.Karma);
    const MetaMagic = { "SR2": [
            {"Name":"Centering"},
            {"Name":"Dispelling"},
            {"Name":"Shielding"},
            {"Name":"Masking"},
            {"Name":"Quickening"},
            {"Name":"Anchoring"}
        ],
        "SR3": [
            {"Name":"Anchoring"},
            {"Name":"Centering"},
            {"Name":"Cleansing"},
            {"Name":"Divining"},
            {"Name":"Invoking"},
            {"Name":"Masking"},
            {"Name":"Possessing"},
            {"Name":"Quickening"},
            {"Name":"Reflecting"},
            {"Name":"Shielding"},
        ]
    }

    const renderLogList = function(){
        return (<>
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
    </Card>
                </>);
    }


    return (
        <>
            <h2>Character Improvements</h2>
            <p>Below is a list of Karma Improvements. Add logs with notes on adding Karma, Cash and Skill/Initations/Attribute improvements.</p>
            <Button onClick={handleOpen}>Add Improvement</Button>
            {renderLogList()}
        </>
    )

}

export default KarmaDisplay;