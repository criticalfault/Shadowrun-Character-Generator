import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Modal from '@mui/material/Modal';
import './DeckingPanel.css';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
}));
const modalStyle = {
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
export default function DeckingPanel(props) {
    const rawCyberdecks = require('../data/'+props.Edition+'/Cyberdeck.json');
    const rawPrograms = require('../data/'+props.Edition+'/Programs.json');
    const [NewCyberdeck, setNewCyberdeck] = useState();
    const [SelectedCyberdecks, setSelectedCyberdecks] = useState(props.Decks);
    const [NewCyberdeckIndex, setNewCyberdeckIndex] = useState();
    const [NewCyberdeckProgram, setNewCyberdeckProgram] = useState();
    const [NewCyberdeckProgramIndex, setNewCyberdeckProgramIndex] = useState();
    const [loaded, setLoaded] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [modalCurrentTarget, setModalCurrentTarget] = useState(0);
    const handleOpenModal = (index) =>{
        setOpenModal(true);
        setModalCurrentTarget(index);
    } 
    const handleCloseModal = () => setOpenModal(false);
    const ProgramCosts = { 
        1:100,
        2:100,
        3:100,
        4:200,
        5:200,
        6:200,
        7:500,
        8:500,
        9:500,
        10:1000,
        11:1000,
        12:1000
    }    
    const handleCyberdeckChange = (event) => {
        const TempCyberdeck = rawCyberdecks[event.target.value];
        setNewCyberdeck(TempCyberdeck);
        setNewCyberdeckIndex(event.target.value)
    }

    const handleCyberdeckProgramChange = (event) => {
        const TempProgram = rawPrograms[event.target.value];
        setNewCyberdeckProgram(TempProgram);
        setNewCyberdeckProgramIndex(event.target.value)
    }

    const CalcTotalNuyenSpent = () =>{
        let TotalNuyen = 0;
        props.Decks.forEach(function(deck){
            TotalNuyen += parseInt(deck['Cost']);
            deck.ProgramsInStorage.forEach(function(program){
                TotalNuyen += (program.Rating*program.Rating)*program.Multiplyer*ProgramCosts[program.Rating];
            });
        });
        return TotalNuyen;
    }

    const removeCyberdeck =(index) => {
        const editedcyberdecks = [...SelectedCyberdecks];
        editedcyberdecks.splice(index, 1);
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
            setNewCyberdeckIndex('');
            props.onChangeDeck([...SelectedCyberdecks, cyberdeckToAdd]);
        }
    }

    const handlePersonaChange = (event) => {
        let value           = event.target.value;
        let index           = event.target.attributes.getNamedItem("data-index").value;
        let attribute       = event.target.name;
        let maxAttribute    = SelectedCyberdecks[index].Persona
        let maxAttributes   = parseInt(SelectedCyberdecks[index].Persona)*3;
        let AttributeSum    = (
                                parseInt(SelectedCyberdecks[index].Bod)+
                                parseInt(SelectedCyberdecks[index].Evasion)+
                                parseInt(SelectedCyberdecks[index].Sensors)+
                                parseInt(SelectedCyberdecks[index].Masking)
                            );
        if(value > maxAttribute){
            value = maxAttribute;
        }
        
        //No attribute can be negative
        if(value < 0){
            value = 0;
        }

        //Need a better check to make sure the attributes max points arent negative.
        if(parseInt(AttributeSum)-maxAttributes >= 0){
            if(SelectedCyberdecks[index][attribute] < value){
                return;
            } 
        }

        const editedcyberdecks = [...SelectedCyberdecks];
        editedcyberdecks[index][attribute] = value;
        props.onChangeDeck(editedcyberdecks);
    }

    const handleToggle = (value) => () => {
        const currentIndex = loaded.indexOf(value);
        const newChecked = [...loaded];
    
        if (currentIndex === -1) {
            newChecked.push(value);
        }else{
            newChecked.splice(currentIndex, 1);
        }
        setLoaded(newChecked);
    };

    const addProgram = () => {
        const editedcyberdecks = [...SelectedCyberdecks];
        let Program = {
                        'Name':NewCyberdeckProgram.Name, 
                        'Multiplyer':NewCyberdeckProgram.Multiplyer,
                        "Rating":1,
                        "Loaded":false,
                        "Size":NewCyberdeckProgram.Multiplyer
                    };
        editedcyberdecks[modalCurrentTarget].ProgramsInStorage.push(Program);
        props.onChangeDeck(editedcyberdecks);
        setNewCyberdeckProgram(false);
        setNewCyberdeckIndex(0);
        setOpenModal(false);
    }

    const removeProgram = (index,index2) => {
        let cyberdeckIndex = index;
        let programIndex = index2;
        const editedcyberdecks = [...SelectedCyberdecks];
        let programSliced = editedcyberdecks[cyberdeckIndex].ProgramsInStorage.splice(programIndex,1);
        setSelectedCyberdecks(editedcyberdecks);
        props.onChangeDeck(editedcyberdecks);
    }

    const handleProgramRatingChange = (event,index,index2) =>{
        let cyberdeckIndex = index;
        let programIndex = index2;
        const editedcyberdecks = [...SelectedCyberdecks];
        let program = editedcyberdecks[cyberdeckIndex].ProgramsInStorage[programIndex];
        editedcyberdecks[cyberdeckIndex].ProgramsInStorage[programIndex].Rating = event.target.value;
        editedcyberdecks[cyberdeckIndex].ProgramsInStorage[programIndex].Size = (program.Rating*program.Rating)*program.Multiplyer
        setSelectedCyberdecks(editedcyberdecks);
        props.onChangeDeck(editedcyberdecks);
    }

    const handleProgramToggle = (index,index2) => {
        let cyberdeckIndex = index;
        let programIndex = index2;
        const editedcyberdecks = [...SelectedCyberdecks];
        editedcyberdecks[cyberdeckIndex].ProgramsInStorage[programIndex].Loaded = !editedcyberdecks[cyberdeckIndex].ProgramsInStorage[programIndex].Loaded;
        setSelectedCyberdecks(editedcyberdecks);
        props.onChangeDeck(editedcyberdecks);
    }

    const CalcMemoryUsed = (index) =>{
        let memoryUsed = 0;
        SelectedCyberdecks[index].ProgramsInStorage.forEach(function(prog){
            if(prog.Loaded){
                memoryUsed += prog.Size;
            }
        })
        return memoryUsed;
    }

    const CalcStorageUsed = (index) =>{
        let storageUsed = 0;
        SelectedCyberdecks[index].ProgramsInStorage.forEach(function(prog){
            storageUsed += prog.Size;
        })
        return storageUsed;
    }

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
                            <div>Persona Points Left: {(parseInt(cyberdeck.Persona)*3)-(parseInt(cyberdeck.Bod)+parseInt(cyberdeck.Evasion)+parseInt(cyberdeck.Masking)+parseInt(cyberdeck.Sensors))}</div>
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
                                        <td><input type='number' name="Bod" data-index={index} min={1} max={cyberdeck.Persona} value={cyberdeck.Bod} onChange={handlePersonaChange}/></td>
                                        <td>{cyberdeck.Persona}</td>
                                    
                                    </tr>
                                    <tr>
                                        <td>Sensors</td>
                                        <td><input type='number' name="Sensors" data-index={index} min={1} max={cyberdeck.Persona} value={cyberdeck.Sensors} onChange={handlePersonaChange}/></td>
                                        <td>{cyberdeck.Persona}</td>
                                    </tr>
                                    <tr>
                                        <td>Masking</td>
                                        <td><input type='number' name="Masking" data-index={index} min={1} max={cyberdeck.Persona} value={cyberdeck.Masking} onChange={handlePersonaChange}/></td>
                                        <td>{cyberdeck.Persona}</td>
                                    </tr>
                                    <tr>
                                        <td>Evasion</td>
                                        <td><input type='number' name="Evasion" data-index={index} min={1} max={cyberdeck.Persona} value={cyberdeck.Evasion} onChange={handlePersonaChange}/></td>
                                        <td>{cyberdeck.Persona}</td>
                                    </tr>
                                    <tr>
                                        <td>Hardening</td>
                                        <td>{cyberdeck.Hardening}</td>
                                        <td></td>
                                    </tr>    
                                    <tr>
                                        <td>Memory</td>
                                        <td>{CalcMemoryUsed(index)}</td>
                                        <td>{cyberdeck.Memory}</td>
                                        
                                    </tr>
                                    <tr>
                                        <td>Storage</td>
                                        <td>{CalcStorageUsed(index)}</td>
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
                            <div>
                                <Button style={{marginBottom:10}} variant="contained" color="primary" data-index={index} onClick={() => handleOpenModal(index)}>Add Program</Button>
                            </div>
                            <table className="">
                                <thead>
                                    <tr>
                                        <th>Loaded</th>
                                        <th>Name</th>
                                        <th>Rating</th>
                                        <th>Multiplyer</th>
                                        <th>Size</th>
                                        <th>Cost</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                            { 
                                cyberdeck.ProgramsInStorage.map((program, index2) => 
                                (
                                    <tr key={index2}>
                                        <td>
                                            <Switch
                                                edge="end"
                                                onChange={() => handleProgramToggle(index,index2)}
                                                checked={ program.Loaded === true }
                                                inputProps={{ 'aria-labelledby': 'switch-list-label-'+program.Name }}
                                            />
                                        </td>
                                        <td>
                                            {program.Name}
                                        </td>
                                        <td>
                                            <input type='number' name="Sensors" data-index={index} value={program.Rating} min={1} max={cyberdeck.Persona} onChange={(event) => handleProgramRatingChange(event,index,index2)}/>   
                                           
                                        </td>
                                        <td>
                                            {program.Multiplyer}
                                        </td>
                                        <td>
                                            {program.Size}
                                        </td>
                                        <td>
                                            {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format((program.Rating*program.Rating)*program.Multiplyer*ProgramCosts[program.Rating])}
                                        </td>
                                        <td>
                                            <IconButton edge="end" aria-label="delete" onClick={() => removeProgram(index,index2)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </td>
                                    </tr> 
                                ))
                            }
                            </tbody>
                            </table> 
                        </Grid>
                       
                        <Button style={{'marginLeft':15, marginTop:10}} variant="contained" color="primary" onClick={() => removeCyberdeck(index)}>Remove Cyberdeck</Button>
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
                        value={NewCyberdeckIndex}
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

    const RenderProgramSelectionModal = () => {
        return (
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <FormControl style={{'width':'200px'}}>
                        <InputLabel  id="gear-label">Programs</InputLabel>
                        <Select
                            id="program-dropdown"
                            value={NewCyberdeckProgramIndex}
                            onChange={handleCyberdeckProgramChange}>
                            { rawPrograms.map( (prog, index) => (
                                <MenuItem key={index} value={index}>{prog.Name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={addProgram}>Add Program</Button>
                </Box>
            </Modal>
        )
    }
   
    return(
        <>
        <Box sx={{ width: '250px', 'marginBottom':'20px' }}>
            Nuyen Spent: {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(CalcTotalNuyenSpent())} 
        </Box>
        {showCyberdeckDropdown()}
        <hr></hr>
        {RenderSelectedCyberdeck()}
        {RenderProgramSelectionModal()}    
        </>
    )
    
}