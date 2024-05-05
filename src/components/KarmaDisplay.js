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
    
    const KarmaCosts = {
      "SR3":{
      "skillCosts":{
        "baseSkill":{
          "active":[1.5,2,2.5],
          "knowledge":[1,1.5,2]
        },
        "specialization": {
          "active":[.5,1,1.5],
          "knowledge":[.5,1,1.5]
        },
        "attributeCosts":{
          "limit":2,
          "max":3
        }
       
      },
      "racialLimits":{
        "Elf":{
          "bodyLimit":6,
          "bodyMax":9,
          "quicknessLimit":7,
          "quicknessMax":11,
          "strengthLimit":6,
          "strengthMax":9,
          "charimasLimit":8,
          "charimasMax":12,
          "intelligenceLimit":6,
          "intelligenceMax":9,
          "willpowerLimit":6,
          "willpowerMax":9,
        },
        "Dwarf":{
          "bodyLimit":7,
          "bodyMax":11,
          "quicknessLimit":6,
          "quicknessMax":9,
          "strengthLimit":8,
          "strengthMax":12,
          "charimasLimit":6,
          "charimasMax":9,
          "intelligenceLimit":6,
          "intelligenceMax":9,
          "willpowerLimit":7,
          "willpowerMax":11,
        },
        "Ork":{
          "bodyLimit":9,
          "bodyMax":14,
          "quicknessLimit":6,
          "quicknessMax":9,
          "strengthLimit":8,
          "strengthMax":12,
          "charimasLimit":5,
          "charimasMax":8,
          "intelligenceLimit":5,
          "intelligenceMax":8,
          "willpowerLimit":6,
          "willpowerMax":9,
        },
        "Troll":{
          "bodyLimit":11,
          "bodyMax":17,
          "quicknessLimit":5,
          "quicknessMax":8,
          "strengthLimit":10,
          "strengthMax":15,
          "charimasLimit":4,
          "charimasMax":6,
          "intelligenceLimit":4,
          "intelligenceMax":6,
          "willpowerLimit":6,
          "willpowerMax":9,
        },
        "Human":{
          "bodyLimit":6,
          "bodyMax":9,
          "quicknessLimit":6,
          "quicknessMax":9,
          "strengthLimit":6,
          "strengthMax":9,
          "charimasLimit":6,
          "charimasMax":9,
          "intelligenceLimit":6,
          "intelligenceMax":9,
          "willpowerLimit":6,
          "willpowerMax":9,
        }
      }
    },
    "SR2":{

    }
  }
    const [Logs, setLogs] = useState(props.Log);
    const [open, setOpen] = useState(false);
    const [openSkillImprove, setOpenSkillImprove] = useState(false);
    const [openAttributeImprove, setOpenAttributeImprove] = useState(false);
    const [improvementChoice, setImprovementChoice] = useState('addNuyen');
    const [improvementChoiceSkill, setImprovementChoiceSkill] = useState(0);
    const [improvementChoiceAttribute, setImprovementChoiceAttribute] = useState(0);
    const [Notes, setNotes] = useState('');
    const [Amount, setAmount] = useState(0);
    const [NotesSkills, setNotesSkills] = useState('');
    const [AmountSkills, setAmountSkills] = useState(0);
    const [NotesAttributes, setNotesAttributes] = useState('');
    const [AmountAttributes, setAmountAttributes] = useState(0);
    const handleClose = () => setOpen(false);
    const handleOpen  = () => setOpen(true);
    const handleOpenSkillImprove = () => setOpenSkillImprove(true);
    const handleCloseSkillImprove = () => setOpenSkillImprove(false);
    const handleOpenAttributeImprove = () => setOpen(true);
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

    const MetaMagic = {
      "SR2": [  
          { "Name" : "Centering"   },
          { "Name" : "Dispelling"  },
          { "Name" : "Shielding"   },
          { "Name" : "Masking"     },
          { "Name" : "Quickening"  },
          { "Name" : "Anchoring"   }
      ], 
      "SR3": [
          { "Name" : "Anchoring"   },
          { "Name" : "Centering"   },
          { "Name" : "Cleansing"   },
          { "Name" : "Divining"    },
          { "Name" : "Invoking"    },
          { "Name" : "Masking"     },
          { "Name" : "Possessing"  },
          { "Name" : "Quickening"  },
          { "Name" : "Reflecting"  },
          { "Name" : "Shielding"   },
      ]
    }


    const handleAmountChange = (event) => {
      let value = event.target.value;
      setAmount(value);
    }

    const handleImprovementChange = (event) => {
      setImprovementChoice(event.target.value);
    }

    const handleImprovementChangeSkill = (event) => {
      setImprovementChoiceSkill(event.target.value);
    }

    const handleImprovementChangeAttribute = (event) => {
      setImprovementChoiceAttribute(event.target.value);
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

    const addSkillImprovement = () => {
      const event = new Date();
      let improvementLog = {
        "Type": 'skillImprovement',
        "Date": event.getTime(),
        "Amount": AmountSkills,
        "Notes":  Notes
      }
      
      setLogs([...Logs, improvementLog]);
      setAmountSkills(0);
      setNotesSkills('');
      setImprovementChoiceSkill(0);
      props.onChangeLog([...Logs, improvementLog]);
    }

    const handleNoteChange = (event) =>{
      setNotes(event.target.value);
    }

    const handleSkillNoteChange = (event) =>{
      setNotesSkills(event.target.value);
    }

    const handleAttributeNoteChange = (event) =>{
      setNotesAttributes(event.target.value);
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
            <Button onClick={handleOpenSkillImprove}>Improve Skill</Button>
            <Button onClick={handleOpenAttributeImprove}>Improve Attribute</Button>
            <ul>
             {Logs.map( (log, index) => (
                    <li key={index}>
                     <Card sx={{ minWidth: 275, marginTop: 2 }}>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {log.Notes} - {log.Type.replace(/add/,'Added ')}
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
            {
              //Skill Improvement
            }
            <Modal
              open={openSkillImprove}
              onClose={handleCloseSkillImprove}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <FormControl fullWidth>
                  <h3>Improve A Skill</h3>
                  <InputLabel>What To Add</InputLabel>
                  <Select id='WhatToAdd'
                    value={improvementChoiceSkill}
                    onChange={handleImprovementChangeSkill}>
                    {props.skills.map((skill, index) => (
                          <MenuItem value={index}>{skill.name}</MenuItem>
                        )
                      )
                    }
                    </Select>
                  </FormControl>
                  <InputLabel id="demo-simple-select-label">Amount</InputLabel>
                    <input type="number" placeholder="Amount To Add" value={Amount} onChange={handleAmountChange} ></input>
                  <br></br>
                  <InputLabel>Notes:</InputLabel>
                  <input type="text" placeholder="Notes" value={Notes} onChange={handleSkillNoteChange}></input>
                  <br></br>
                  <Button variant="contained" color="primary" onClick={addSkillImprovement}>Add</Button>
              <hr></hr>
              <Button onClick={handleCloseSkillImprove}>Close</Button>
            </Box>
          </Modal>

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