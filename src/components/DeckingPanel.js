import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { MenuItem } from '@mui/material';
import ConditionMonitor from './ConditionMonitor';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import './DeckingPanel.css';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
}));
export default function DeckingPanel(props) {
    const rawCyberdecks = require('../data/'+props.Edition+'/Cyberdeck.json');
    const [NewCyberdeck, setNewCyberdeck] = useState();
    const [SelectedCyberdecks, setSelectedCyberdecks] = useState(props.Decks);
    const [NewcyberdeckIndex, setNewcyberdeckIndex] = useState('');
    const [loaded, setLoaded] = React.useState([]);
    const handleCyberdeckChange = (event) => {
        const TempCyberdeck = rawCyberdecks[event.target.value];
        setNewCyberdeck(TempCyberdeck);
        setNewcyberdeckIndex(event.target.value)
    }

    const CalcTotalNuyenSpent = () =>{
        let TotalNuyen = 0;
        props.Decks.forEach(function(deck){
            TotalNuyen += parseInt(deck['Cost']);
        });
        return TotalNuyen;
    }

    const removeCyberdeck =(index) => {
        const editedcyberdecks = [...SelectedCyberdecks];
        let CyberdeckRemoved = editedcyberdecks.splice(index, 1);
        setSelectedCyberdecks(editedcyberdecks);
        props.onChangeDeck(editedcyberdecks);
    }

    const handleAddCyberdeck = () => {
        if (NewCyberdeck) {
          const cyberdeckToAdd = {...NewCyberdeck};
          cyberdeckToAdd.Bod=1;
          cyberdeckToAdd.Evasion=1;
          cyberdeckToAdd.Sensors=1;
          cyberdeckToAdd.Masking=1;
          cyberdeckToAdd.ProgramsInStorage = [];
          cyberdeckToAdd.ProgramsActive = [];
          setSelectedCyberdecks(prevCyberdecks => [...prevCyberdecks, cyberdeckToAdd]);
          setNewCyberdeck('');
          setNewcyberdeckIndex('');
          props.onChangeDeck([...SelectedCyberdecks, cyberdeckToAdd]);
        }
      }

    const handlePersonaChange = (index) => {

    }

    const handleToggle = (value) => () => {
        const currentIndex = loaded.indexOf(value);
        const newChecked = [...loaded];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setLoaded(newChecked);
      };

    const RenderSelectedCyberdeck = () => {
        
        if(SelectedCyberdecks.length !== 0){
            return(
             <div>
                { 
                    SelectedCyberdecks.map((cyberdeck, index) => (
                    <Box className='cyberdeckCard'>
                        <h3>{cyberdeck.Name}</h3>
                        <Grid container spacing={2}>
                            <Grid item xs={5} className='cyberDeckTable'>
                            <div>Persona Points Left: {(parseInt(cyberdeck.Persona)*3)-(cyberdeck.Bod-cyberdeck.Evasion-cyberdeck.Masking-cyberdeck.Sensors)}</div>
                            <table className="">
                                <thead>
                                    <tr>
                                        <th>Attribute</th>
                                        <th>Current Value</th>
                                        <th>Max Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>MPCP</td>
                                        <td>{cyberdeck.Persona}</td>
                                        <td>{cyberdeck.Persona}</td>
                                    </tr>
                                    <tr>
                                        <td>Bod</td>
                                        <td><input type='number' name="Bod" max={cyberdeck.Persona} value={cyberdeck.Bod} onChange={handlePersonaChange(index)}/></td>
                                        <td>{cyberdeck.Persona}</td>
                                    
                                    </tr>
                                    <tr>
                                        <td>Sensor</td>
                                        <td><input type='number' name="Sensor" max={cyberdeck.Persona} value={cyberdeck.Sensors} onChange={handlePersonaChange(index)}/></td>
                                        <td>{cyberdeck.Persona}</td>
                                    </tr>
                                    <tr>
                                        <td>Masking</td>
                                        <td><input type='number' name="Masking" max={cyberdeck.Persona} value={cyberdeck.Masking} onChange={handlePersonaChange(index)}/></td>
                                        <td>{cyberdeck.Persona}</td>
                                    </tr>
                                    <tr>
                                        <td>Evasion</td>
                                        <td><input type='number' name="Evasion" max={cyberdeck.Persona} value={cyberdeck.Evasion} onChange={handlePersonaChange(index)}/></td>
                                        <td>{cyberdeck.Persona}</td>
                                    </tr>
                                    <tr>
                                        <td>Hardening</td>
                                        <td>{cyberdeck.Hardening}</td>
                                        <td></td>
                                    </tr>    
                                    <tr>
                                        <td>Memory</td>
                                        <td>{cyberdeck.Memory}</td>
                                        <td>{cyberdeck.Memory}</td>
                                        
                                    </tr>
                                    <tr>
                                        <td>Storage</td>
                                        <td>{cyberdeck.Storage}</td>
                                        <td>{cyberdeck.Storage}</td>
                                    </tr>
                                    <tr>
                                        <td>I/O:</td>
                                        <td>{cyberdeck["I/O Speed"]}</td>
                                        <td>{cyberdeck["I/O Speed"]}</td>
                                    </tr>
                                    <tr>
                                        <td>Response Increase:</td>
                                        <td>{parseInt(cyberdeck['Response Increase'])}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </Grid>
                        <Grid item xs={7} className=''>
                            <h4>Programs</h4>
                             <List>
                             { cyberdeck.ProgramsInStorage.map((program, index) => (
                                <ListItem>
                                    <Switch
                                        edge="end"
                                        onChange={handleToggle('wifi')}
                                        checked={loaded.indexOf('wifi') !== -1}
                                        inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                                    />
                                    Testing Test
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem> )
                            )}
                            </List> 
                        </Grid>
                       
                        <Button onClick={() => removeCyberdeck(index)}>Remove Cyberdeck</Button>
                        </Grid>
                    </Box> 
                    ))
                }  
        </div>)
        
    }else{
        return (
            <div>No Deck Selected</div>
        )
    }
    }

    const showCyberdeckDropdown = () =>{
        return (
            <Box sx={{ width: '250px' }}>
                <FormControl style={{'width':'200px'}}>
                    <InputLabel  id="gear-label">Cyberdecks</InputLabel>
                    <Select
                        id="cyberdeck-dropdown"
                        value={NewCyberdeck}
                        onChange={handleCyberdeckChange}>
                        { rawCyberdecks.map( (deck, index) => (
                            <MenuItem key={index} value={index}>{deck.Name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleAddCyberdeck}>
                    Add Cyberdeck
                </Button>
            </Box>
        )
    }
   
    return(
        <>
        <Box sx={{ width: '250px', 'margin-bottom':'20px' }}>
            Nuyen Spent: {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(CalcTotalNuyenSpent())} 
        </Box>
        {showCyberdeckDropdown()}
        <hr></hr>
        {RenderSelectedCyberdeck()}
        </>
    )
    
}