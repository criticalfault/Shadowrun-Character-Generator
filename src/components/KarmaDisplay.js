import React, { useState, useEffect } from 'react';
import { MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

function KarmaDisplay(props) {

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
    
    const [Logs, setLogs] = useState(props.Log);
    const [open, setOpen] = useState(false);
    const [improvementChoice, setImprovementChoice] = useState('addNuyen');
    const [Notes, setNotes] = useState('');
    const [Amount, setAmount] = useState(0);
    const handleClose = () => setOpen(false);
    const handleOpen  = () => setOpen(true);
    const [openFinalizeCharacterModal, setOpenFinalizeCharacterModal] = useState(false);
    const handleOpenFinalizeCharacterModal = () => setOpenFinalizeCharacterModal(true);
    const handleCloseFinalizeCharacterModal = () => setOpenFinalizeCharacterModal(false);
    useEffect(() => {
      let finalKarma = 0;
      let tempKarma = 0;
      let tempCash = 0;
      let tempKarmaPool = 1;

      Logs.forEach(function(log) {
        console.log(log);
        if(log.Type === 'addNuyen'){
          tempCash += parseFloat(log.Amount);
        }else if(log.Type === 'addKarma'){
          tempKarma += parseInt(log.Amount);
        }
        return;
      });
      
      if(props.race === 'Human'){
        tempKarmaPool += Math.floor(tempKarma/10);
      }else{
        tempKarmaPool += Math.floor(tempKarma/20);
      }

      finalKarma = tempKarma-(tempKarmaPool-1);
      props.onChangeKarmaStuff( tempCash, finalKarma, tempKarmaPool );
    },[Logs])

    const handleAmountChange = (event) => {
      let value = event.target.value;
      setAmount(value);
    }

    const handleImprovementChange = (event) => {
      setImprovementChoice(event.target.value);
    }
    const addImprovement = () => {
      const event = new Date();
      let improvementLog = {
        "Type": improvementChoice,
        "Date": event.getTime(),
        "Amount": Amount,
        "Notes":  Notes
      }
      
      setLogs([...Logs, improvementLog]);
      setAmount(0);
      setNotes('');
      setImprovementChoice('addNuyen');
      props.onChangeLog([...Logs, improvementLog]);
      handleClose();
    }

    const handleNoteChange = (event) =>{
      setNotes(event.target.value);
    }

    const renderCardValues = (log) => {
      if(log.Type === 'addNuyen'){
        return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(log.Amount);
      }else{
        return log.Amount + ' Karma';
      }
    }

    const renderDate = (date) => {
      const myUnixTimestamp = date; // start with a Unix timestamp
      const myDate = new Date(myUnixTimestamp); // convert timestamp to milliseconds and construct Date object
      return (
        <span>{myDate.toLocaleString()}</span>
      )
    }

    const handleRemoveLog = (index) => {
      let newLogs = [...Logs];
      newLogs.splice(index, 1);
      props.onChangeLog(newLogs);
      setLogs(newLogs);
    }

    const handleFinalizeCharacter = () => {
      props.onFinalization('finalized');
      setOpenFinalizeCharacterModal(false);
    }

    const displayFinalizedCharacter = () => {
      return (
        <>
            <h2>Character Karma/Cash</h2>
            <p>Below is a list of Karma / Cash Additions with timestamps of when it was added. This money can then be used to buy near gear.</p>
            <Button onClick={handleOpen}>Add Improvement</Button>
            <ul>
             {Logs.map( (log, index) => (
                    <li key={index}>
                     <Card sx={{ minWidth: 275, marginTop: 2 }}>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {log.Notes}
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                          {renderDate(log.Date)}
                        </Typography>
                        <Typography variant="body1" component="div">
                          {renderCardValues(log)}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={() => handleRemoveLog(index)}>Remove</Button>
                      </CardActions>
                    </Card>
                  </li>
                  )
                )
              }

            </ul>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <FormControl fullWidth>
                  <InputLabel>What To Add</InputLabel>
                  <Select id='WhatToAdd'
                    value={improvementChoice}
                    onChange={handleImprovementChange}>
                      <MenuItem value='addNuyen'>
                        Add Nuyen
                      </MenuItem>
                      <MenuItem value='addKarma'>
                        Add Karma
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <InputLabel id="demo-simple-select-label">Amount</InputLabel>
                    <input type="number" placeholder="Amount To Add" value={Amount} onChange={handleAmountChange} ></input>
                  <br></br>
                  <InputLabel>Notes:</InputLabel>
                  <input type="text" placeholder="Notes" value={Notes} onChange={handleNoteChange}></input>
                  <br></br>
                  <Button variant="contained" color="primary" onClick={addImprovement}>Add</Button>
              <hr></hr>
              <Button onClick={handleClose}>Close</Button>
            </Box>
          </Modal>
        </>
      )
    }

    const displayChargenCharacter = () => {
      return (
        <>
           <Modal
              open={openFinalizeCharacterModal}
              onClose={handleCloseFinalizeCharacterModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
              <Button variant="contained" color="primary" onClick={handleFinalizeCharacter}>Finalize Character</Button>
              <hr></hr>
              <Button onClick={handleCloseFinalizeCharacterModal}>Close</Button>
            </Box>
          </Modal>
          <p>Finalizing your character switches it over to allowing you to do things like advance skills, improve attributes, initate, etc. This cannot be undone. If you want to continue to edit, make a save pre-finalized first.</p>
          <Button size='large' color="primary" onClick={handleOpenFinalizeCharacterModal} >Finalize Character?</Button>
        </>
      )
    }

    const determineWhichDisplay = () => {
        if(props.step === 'chargen'){
          return displayChargenCharacter();
        }else{
          return displayFinalizedCharacter();
        }
    }

    return (
      determineWhichDisplay()
    )
}

export default KarmaDisplay;