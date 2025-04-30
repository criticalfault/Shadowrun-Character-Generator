import React, { useState, useEffect } from 'react';
import { MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from '@mui/material/LinearProgress';
const skillsData = require('../data/SR2/Skills.json');
//const LanguageSkillsData = require('../data/SR2/LanguageSkills.json');

function SR2SkillsPanel({characterSkills, onUpdateSkills, maxSkillPoints}) {
  const [selectedSkills, setSelectedSkills] = useState(characterSkills);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);
  const [selectedConcentration, setSelectedConcentration] = useState('');
  const [open, setOpen] = React.useState(false);
  const [specializationModalOpen, setSpecializationModalOpen] = useState(false);
  const [newSpecialization, setNewSpecialization] = useState('');
  const [currentSkillIndex, setCurrentSkillIndex] = useState(null);
  const [currentConcentrationIndex, setCurrentConcentrationIndex] = useState(null);

  const CalcTotalSkillsRatings = (skillsList) =>{
    let totalRatings = 0;
    skillsList.forEach(function(skill){
      totalRatings += skill.rating;
    })
    return totalRatings;
  }
  const [skillPointsSpent, setSkillPointsSpent] = useState(CalcTotalSkillsRatings(characterSkills));
  const handleOpen = (skillIndex) => {
    setSelectedSkillIndex(skillIndex);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

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

  useEffect(() => {
    //Update bar graphs for each category
    setSkillPointsSpent(CalcTotalSkillsRatings([...selectedSkills]));
  }, [selectedSkills])

  const handleAddSkill = () => {
    const selectedSkillData = { ...skillsData[selectedSkill] };
    selectedSkillData.rating = 1;
    selectedSkillData.totalCost = 1;
    selectedSkillData.selectedConcentrations = [];
    selectedSkillData.type = 'Active';
    if(selectedSkillData.requiresConcentration === true){
      selectedSkillData.rating = 1;
      selectedSkillData.totalCost = 2;
      const newConcentration = {
        name: selectedSkillData.requiredConcentration,
        rating: selectedSkillData.rating + 1,
        specializations: []
      };
      selectedSkillData.selectedConcentrations = [newConcentration]
    }
    setSelectedSkills(prevSkills => [...prevSkills, selectedSkillData]);
    onUpdateSkills(selectedSkills);
  };

  const handleRemoveSkill = index => {
    const editedSkills = [...selectedSkills];
    editedSkills.splice(index, 1);
    setSelectedSkills(editedSkills);
    onUpdateSkills(editedSkills);
  };

  // const handleRemoveConcentration = (skillIndex,conIndex) => {
  //   const editedSkills = [...selectedSkills];
  //   const skill = editedSkills[skillIndex];
  //   skill.selectedConcentrations.splice(conIndex, 1);
  //   setSelectedSkills(editedSkills);
  //   onUpdateSkills(editedSkills);
  // }

  const handleSkillChange = event => {
    setSelectedSkill(skillsData[event.target.value].name);
  };

  const handleRatingChange = (event, index) => {
    const rating = parseInt(event.target.value);
    if (!isNaN(rating) && rating >= 1 && rating <= 6) {
      const editedSkills = [...selectedSkills];
      let hasConcentrations = 0;
      if(editedSkills[index].selectedConcentrations.length > 0) {
        hasConcentrations = 1;
        editedSkills[index].selectedConcentrations.forEach(element => {
          element.rating = rating + 2;
          if(element.specializations.length > 0){
            element.specializations.forEach(special => {
              special.rating = element.rating + 2;
            })
          }
          
        });
      }
      if(rating === 6 && hasConcentrations === 1){
        return;
      }
      editedSkills[index].rating = rating;
      editedSkills[index].totalCost = rating + hasConcentrations;
      setSelectedSkills(editedSkills);
      onUpdateSkills(editedSkills);
    }
  };

  const handleAddConcentration = (skillIndex,name) => {
    const editedSkills = [...selectedSkills];
    const skill = editedSkills[skillIndex];
    if (skill.rating > 1) {
      const newConcentration = {
        name: name,
        rating: skill.rating + 1,
        specializations: []
      };
      skill.rating = skill.rating - 1;
      skill.selectedConcentrations.push(newConcentration);
      setSelectedSkills(editedSkills);
      onUpdateSkills(editedSkills);
      setOpen(false);
    }
  };

  const handleSelectedConcentrationChange = (event) => {
    setSelectedConcentration(event.target.value);
  }

  const handleOpenSpecializationModal = (skillIndex, concentrationIndex) => {
    setCurrentSkillIndex(skillIndex);
    setCurrentConcentrationIndex(concentrationIndex);
    setSpecializationModalOpen(true);
  };
  
  const handleCloseSpecializationModal = () => {
    setSpecializationModalOpen(false);
    setNewSpecialization('');
  };
  
  const handleAddNewSpecialization = () => {
  if (newSpecialization.trim() !== '') {
    const updatedSkills = [...selectedSkills];
    const skill = updatedSkills[currentSkillIndex];
    const concentration = skill.selectedConcentrations[currentConcentrationIndex];

    // Set the specialization rating to Concentration rating + 1
    const specializationRating = concentration.rating + 1;

    const newSpecializationData = {
      name: newSpecialization,
      rating: specializationRating
    };

    concentration.specializations.push(newSpecializationData);
    setSelectedSkills(updatedSkills);
    onUpdateSkills(updatedSkills);

    setNewSpecialization('');
    setSpecializationModalOpen(false);
  }
};


  const showConcentrations = () => {
    
    if(selectedSkills.length > 0 && selectedSkills[selectedSkillIndex] !== undefined && selectedSkills[selectedSkillIndex].hasOwnProperty('Concentrations')){

      if(selectedSkills[selectedSkillIndex].hasOwnProperty('requiresConcentration') && selectedSkills[selectedSkillIndex].requiresConcentration === true){
          return (<>
            Required Concentration: {selectedSkills[selectedSkillIndex].requiredConcentration}
          </>)
      }else{
        return (<>
          <Select id="concentration-dropdown" 
            onChange={handleSelectedConcentrationChange}
            value={selectedConcentration} 
            
            >
            {selectedSkills[selectedSkillIndex].Concentrations.map((con, conIndex) => {
            return (<MenuItem key={con.name} value={con.name}>
                      {con.name}
                    </MenuItem>)
            })}
          </Select>
          <br></br>
          <Button onClick={() => handleAddConcentration(selectedSkillIndex, selectedConcentration)}>Add Concentration</Button>
        </>
        )
      }
    }else{
      return (<span>No Concentrations for this skill</span>)
    }
  }

  return (
    <div>
      <Box sx={{ width: '250px', marginBottom:'20px' }}>Skill Points {skillPointsSpent}/{maxSkillPoints}
        <LinearProgress variant="determinate" value={skillPointsSpent/maxSkillPoints*100} />
      </Box>
      <FormControl style={{ width: '200px' }}>
        <InputLabel id="skill-label">Skills</InputLabel>
        <Select id="skill-dropdown" value={selectedSkill} onChange={handleSkillChange}>
          {Object.values(skillsData).map(skill => (
            <MenuItem key={skill.name} value={skill.name}>
              {skill.name}
            </MenuItem>
          ))}
        </Select>
        <br />
        <Button variant="contained" color="primary" style={{ display: 'inline-block' }} onClick={handleAddSkill}>
          Add Skill
        </Button>
      </FormControl>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Add Concentration
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {showConcentrations()}
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={specializationModalOpen}
        onClose={handleCloseSpecializationModal}
        aria-labelledby="specialization-modal-title"
        aria-describedby="specialization-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}> {/* Adjust the styling as needed */}
          <Typography id="specialization-modal-title" variant="h6" component="h2">
            Add New Specialization
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="new-specialization"
            label="Specialization"
            type="text"
            fullWidth
            variant="standard"
            value={newSpecialization}
            onChange={(e) => setNewSpecialization(e.target.value)}
          />
          <Button onClick={handleAddNewSpecialization} color="primary">
            Add
          </Button>
        </Box>
      </Modal>
      <hr />
      <List>
        {selectedSkills.map((skill, skillIndex) => (
          <ListItem key={skillIndex} style={{width: '400px', display:'inline-block'}}>
             <Card variant="outlined">
                <CardHeader  title={skill.name}></CardHeader>
                <CardContent>
                  {
                    (skill.requiresConcentration === true ? (<><span style={{color:'blue', position: 'absolute',top: '75px'}}>Concentration Only</span><br></br></>) :'')
                  }
                  <TextField
                    style={{ width: '90px', marginRight: '10px', display: 'inline-block' }}
                    id="rating-input"
                    label="Rating (1-6)"
                    type="number"
                    value={skill.rating}
                    onChange={event => handleRatingChange(event, skillIndex)}
                    inputProps={{
                      min: 1,
                      max: 6
                    }}
                  />
                  

                <h5>Concentrations</h5>
                  <List>
                    { skill.selectedConcentrations.map((concentration, concentrationIndex) => (
                    <ListItem key={concentrationIndex}>
                    <ListItemText primary={`${concentration.name} (${concentration.rating})`} />
                      <List>
                        {concentration.specializations.map((specialization, specializationIndex) => (
                            <ListItem key={specializationIndex}>
                              <ListItemText primary={`${specialization.name} (Rating: ${specialization.rating})`} />
                              {/* Add more controls as needed */}
                            </ListItem>
                          ))}
                      </List>

                      <Button color="primary" onClick={() => handleOpenSpecializationModal(skillIndex, concentrationIndex)}>
                        Add Specialization
                      </Button>
                  </ListItem>
                  
                    ))}
                  </List>
                </CardContent>
                <CardActions>
                {(skill.rating > 1 || skill.selectedConcentrations.length > 0 ? (
                  <Button color="primary" onClick={() => handleOpen(skillIndex)}>
                    Add Concentration
                  </Button>):'')}
                <Button color="secondary" onClick={() => handleRemoveSkill(skillIndex)}>
                  Remove
                </Button> 
                </CardActions>
              </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default SR2SkillsPanel;
