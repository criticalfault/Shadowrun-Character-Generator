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

const skillsDataFromFile = require('../data/SR2/Skills.json');
const LanguageSkillsData = require('../data/SR2/LanguageSkills.json');

function SR2SkillsPanel() {
  const [skillsData, setSkillsData] = useState(skillsDataFromFile);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');

  useEffect(() => {
    console.log(selectedSkills);
  }, [selectedSkills]);

  const handleAddSkill = () => {
    const selectedSkillData = { ...skillsData[selectedSkill] };
    selectedSkillData.rating = 1;
    selectedSkillData.totalCost = 1;
    selectedSkillData.selectedConcentrations = [];
    setSelectedSkills(prevSkills => [...prevSkills, selectedSkillData]);
  };

  const handleRemoveSkill = index => {
    const editedSkills = [...selectedSkills];
    editedSkills.splice(index, 1);
    setSelectedSkills(editedSkills);
  };

  const handleSkillChange = event => {
    setSelectedSkill(skillsData[event.target.value].name);
  };

  const handleRatingChange = (event, index) => {
    const rating = parseInt(event.target.value);
    if (!isNaN(rating) && rating >= 1 && rating <= 6) {
      const editedSkills = [...selectedSkills];
      editedSkills[index].rating = rating;
      editedSkills[index].totalCost = rating;
      setSelectedSkills(editedSkills);
    }
  };

  const handleAddConcentration = skillIndex => {
    const editedSkills = [...selectedSkills];
    const skill = editedSkills[skillIndex];
    if (skill.rating > 1) {
      const newConcentration = {
        name: '',
        rating: skill.rating - 1,
        specializations: []
      };
      skill.selectedConcentrations.push(newConcentration);
      setSelectedSkills(editedSkills);
    }
  };

  const handleAddSpecialization = (skillIndex, concentrationIndex) => {
    const editedSkills = [...selectedSkills];
    const skill = editedSkills[skillIndex];
    const concentration = skill.selectedConcentrations[concentrationIndex];
    concentration.specializations.push('');
    setSelectedSkills(editedSkills);
  };

  const handleSpecializationChange = (event, skillIndex, concentrationIndex, specializationIndex) => {
    const editedSkills = [...selectedSkills];
    const skill = editedSkills[skillIndex];
    const concentration = skill.selectedConcentrations[concentrationIndex];
    concentration.specializations[specializationIndex] = event.target.value;
    setSelectedSkills(editedSkills);
  };

  return (
    <div>
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
      <hr />
      <List style={{ maxWidth: '500px' }}>
        {selectedSkills.map((skill, skillIndex) => (
          <ListItem key={skillIndex}>
            <ListItemText primary={skill.name} secondary={`Rating: ${skill.rating}`} />
            <TextField
              style={{ width: '50px', marginRight: '10px', display: 'inline-block' }}
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
            <Button color="primary" onClick={() => handleAddConcentration(skillIndex)}>
              Add Concentration
            </Button>
            {skill.selectedConcentrations.map((concentration, concentrationIndex) => (
              <div key={concentrationIndex}>
                <ListItemText primary={`- ${concentration.name || 'No Concentration'} (${concentration.rating})`} />
                <Button
                  color="primary"
                  onClick={() => handleAddSpecialization(skillIndex, concentrationIndex)}
                >
                  Add Specialization
                </Button>
                {concentration.specializations.map((specialization, specializationIndex) => (
                  <TextField
                    key={specializationIndex}
                    label="Specialization"
                    value={specialization}
                    onChange={event =>
                      handleSpecializationChange(
                        event,
                        skillIndex,
                        concentrationIndex,
                        specializationIndex
                      )
                    }
                  />
                ))}
              </div>
            ))}
            <Button color="secondary" onClick={() => handleRemoveSkill(skillIndex)}>
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default SR2SkillsPanel;
