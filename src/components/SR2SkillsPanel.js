import React, { useState } from 'react';
import { MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
function SR2SkillsPanel() {
  const [skillsData, setSkillsData] = useState();

  const [newSkill, setNewSkill] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [skillRating, setSkillRating] = useState(1);
  const [skillPointsSpent, setSkillPointsSpent] = useState(0);
  const [skillCategory, setSkillCategory] = useState(Object.keys(skillsData));

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  const handleSkillChange = (event) => {
    setNewSkill(event.target.value);
    setSelectedSpecialization(''); // Reset selected specialization when a new skill is selected
  };

  const handleSpecializationChange = (event) => {
    setSelectedSpecialization(event.target.value);
  };

  const handleRatingChange = (event) => {
    const rating = parseInt(event.target.value);
    if (!isNaN(rating) && rating >= 1 && rating <= 6) {
      setSkillRating(rating);
    }
  };

  const getSpecializationsForSkill = (skillName) => {
    const skill = skillsData[selectedCategory].find((skill) => skill.name === skillName);
    return skill ? skill.specializations.map((spec) => spec.name) : [];
  };

  const handleAddSkill = () => {
    if (newSkill) {
      const skillToAdd = { name: newSkill, rating:skillRating, specialization: selectedSpecialization };
      setSelectedSkills(prevSkills => [...prevSkills, skillToAdd]);
      setSkillPointsSpent(prevSkills => (prevSkills + skillRating));
      setNewSkill('');
      setSelectedSpecialization('');
    }
  };

  const handleEditSkill = (index) => {
    const editedSkills = [...selectedSkills];
    const skillToEdit = editedSkills[index];
    setSelectedSpecialization(skillToEdit.specialization);
    setNewSkill(skillToEdit.name);
    setSkillRating(skillToEdit.rating);
    editedSkills.splice(index, 1);
    setSelectedSkills(editedSkills);
  };

  const handleRemoveSkill = (index) => {
    const editedSkills = [...selectedSkills];
    editedSkills.splice(index, 1);
    setSelectedSkills(editedSkills);
  };

  console.log(selectedSkills)

  return (
    <div>
      <FormControl style={{'width':'200px'}}>
        <InputLabel  id="skill-label">Skills Categories</InputLabel>
        <Select
          id="skill-dropdown"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {skillCategory.map(catName => (
            <MenuItem key={catName} value={catName}>{catName}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br></br>
      <br></br>
    {selectedCategory && (  
      <FormControl style={{'width':'200px'}}>
        <InputLabel  id="skill-label">{selectedCategory}</InputLabel>
        <Select
          id="skill-dropdown"
          value={newSkill}
          onChange={handleSkillChange}
        >
          {skillsData[selectedCategory].map(skill => (
            <MenuItem key={skill.name} value={skill.name}>{skill.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )}
      {newSkill && (
        <>
          <FormControl style={{'width':'200px'}}>
            <InputLabel id="specialization-label">Specialization</InputLabel>
            <Select
              id="specialization-dropdown"
              value={selectedSpecialization}
              onChange={handleSpecializationChange}
            >
              <MenuItem value="">None</MenuItem>
              {getSpecializationsForSkill(newSkill).map(spec => (
                <MenuItem key={spec} value={spec}>{spec}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField style={{'width':'100px', 'marginRight':'20px'}}
            id="rating-input"
            label="Rating (1-6)"
            type="number"
            value={skillRating}
            onChange={handleRatingChange}
            InputProps={{
              inputProps: { min: 1, max: 6 },
            }}
          />
        </>
      )}
      <Button variant="contained" color="primary" onClick={handleAddSkill}>
        Add Skill
      </Button>

      <List style={{maxWidth:'500px'}}>
        {selectedSkills.map((skill, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={skill.specialization ? `${skill.name} (${skill.rating-1})`:`${skill.name} (${skill.rating})`}
              secondary={skill.specialization ? `${skill.specialization} (${skill.rating + 1})` : 'None'}
            />
            <Button color="primary" onClick={() => handleEditSkill(index)}>
              Edit
            </Button>
            <Button color="secondary" onClick={() => handleRemoveSkill(index)}>
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default SR2SkillsPanel;
