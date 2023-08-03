import React, { useState } from 'react';
import { MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
const skillsData = require('../data/SR3/ActiveSkills.json');
const LanguageSkillsData = require('../data/SR3/LanguageSkills.json');
function SR3SkillsPanel({characterSkills, onUpdateSkills, activeSkillPoints, KnowledgeSkillsMax, LanguageSkillsMax }) {
  const ActiveSkills = ['Build/Repair skills','Physical skills','Magical skills','Social skills','Survival skills','Technical skills','Vehicle skills','Otaku (MATRIX) skills','Martial Arts(MA)']
  const KnowledgeSkills = ['6th World (SW)','Academic Skills (AC)','Area Knowledge (AK)','Background (BK)','Interests (IN)','Program Design (PD)','Street (ST)','Survival (SV)', 'System Familiarity (SF)']

  //Active Skills
  const [selectedSpecialization, setSelectedSpecialization] = useState('None');
  const [selectedSkills, setSelectedSkills] = useState(characterSkills);
  const [selectedCategory, setSelectedCategory] = useState('Martial Arts(MA)');
  const [skillRating, setSkillRating] = useState(1);
  const [skillPointsSpent, setSkillPointsSpent] = useState(0);
  const [skillCategory, setSkillCategory] = useState(Object.keys(skillsData));
  const [newSkill, setNewSkill] = useState('MA:Aikido');

  //Knowledge Skills
  const [selectedKnowledgeSpecialization, setKnowledgeSelectedSpecialization] = useState('');
  const [selectedKnowledgeSkills, setKnowledgeSelectedSkills] = useState([]);
  const [selectedKnowledgeCategory, setKnowledgeSelectedCategory] = useState('Street (ST)');
  const [skillKnowledgeRating, setKnowledgeSkillRating] = useState(1);
  const [skillKnowledgePointsSpent, setKnowledgeSkillPointsSpent] = useState(0);
  const [skillKnowledgeCategory, setKnowledgeSkillCategory] = useState(Object.keys(skillsData));
  const [newKnowledgeSkill, setKnowledgeNewSkill] = useState('ST:Arms Dealers');

  //Language Skills
  const [selectedLanguageSpecialization, setLanguageSelectedSpecialization] = useState('');
  const [selectedLanguageSkills, setLanguageSelectedSkills] = useState([]);
  const [selectedLanguageCategory, setLanguageSelectedCategory] = useState(0);
  const [skillLanguageRating, setLanguageSkillRating] = useState(1);
  const [skillLanguagePointsSpent, setLanguageSkillPointsSpent] = useState(0);
  const [skillLanguageCategory, setLanguageSkillCategory] = useState(Object.keys(skillsData));
  const [newLanguageSkill, setLanguageNewSkill] = useState('English');

 // Handle CategoryChange events
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  const handleKnowledgeCategoryChange = (event) => {
    setKnowledgeSelectedCategory(event.target.value);
  }

  const handleLanguageCategoryChange = (event) => {
    setLanguageSelectedCategory(event.target.value);
  }

  //Handle Skill Change events
  const handleSkillChange = (event) => {
    setNewSkill(event.target.value);
    setSelectedSpecialization(''); // Reset selected specialization when a new skill is selected
  };

  const handleKnowledgeSkillChange = (event) => {
    setKnowledgeNewSkill(event.target.value);
    setKnowledgeSelectedSpecialization(''); // Reset selected specialization when a new skill is selected
  };

  const handleSpecializationChange = (event) => {
    setSelectedSpecialization(event.target.value);
  };


  const handleLanguageSkillChange = (event) => {
    setLanguageNewSkill(event.target.value);
    setLanguageSelectedSpecialization(''); // Reset selected specialization when a new skill is selected
  };

  
  const handleRatingChange = (event) => {
    const rating = parseInt(event.target.value);
    if (!isNaN(rating) && rating >= 1 && rating <= 6) {
      setSkillRating(rating);
    }
  };

  const handleKnowledgeRatingChange = (event) => {
    const rating = parseInt(event.target.value);
    if (!isNaN(rating) && rating >= 1 && rating <= 6) {
      setKnowledgeSkillRating(rating);
    }
  };

  const handleLanguageRatingChange = (event) => {
    const rating = parseInt(event.target.value);
    if (!isNaN(rating) && rating >= 1 && rating <= 6) {
      setLanguageSkillRating(rating);
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

      // Update the characterSkills array with the new skill
      const updatedSkills = [...characterSkills, skillToAdd];
      // Call the onUpdateSkills function to update the character state in the Dashboard component
      onUpdateSkills(updatedSkills);
    }
  };

  const handleKnowledgeAddSkill = () => {
    if (newKnowledgeSkill) {
      const skillToAdd = { name: newKnowledgeSkill, rating:skillKnowledgeRating, specialization: selectedKnowledgeSpecialization };
      setKnowledgeSelectedSkills(prevSkills => [...prevSkills, skillToAdd]);
      setKnowledgeSkillPointsSpent(prevSkills => (prevSkills + skillRating));
      setKnowledgeNewSkill('');
      setKnowledgeSkillRating(1);
      // Update the characterSkills array with the new skill
      const updatedSkills = [...characterSkills, skillToAdd];
      // Call the onUpdateSkills function to update the character state in the Dashboard component
      onUpdateSkills(updatedSkills);
    }
  };

  const handleLanguageAddSkill = () => {
    if (newLanguageSkill) {
      const skillToAdd = { name: newLanguageSkill, rating:skillLanguageRating, specialization: selectedLanguageSpecialization };
      setLanguageSelectedSkills(prevSkills => [...prevSkills, skillToAdd]);
      setLanguageSkillPointsSpent(prevSkills => (prevSkills + skillRating));
      setLanguageNewSkill('');
      setLanguageSkillRating(1);
      // Update the characterSkills array with the new skill
      const updatedSkills = [...characterSkills, skillToAdd];
      // Call the onUpdateSkills function to update the character state in the Dashboard component
      onUpdateSkills(updatedSkills);
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
    let RemovedSkill = editedSkills.splice(index, 1);
    skillPointsSpent(prevSkills => (prevSkills - RemovedSkill[0].rating));
    setSelectedSkills(editedSkills);
  };

  return (
    <div>
      <Box sx={{ width: '100%' }}>Active Skills {skillPointsSpent}/{activeSkillPoints}
        <LinearProgress variant="determinate" value={skillPointsSpent} />
      </Box>
      
      <Box sx={{ width: '100%' }}>Knowledge Skills {skillKnowledgePointsSpent}/{KnowledgeSkillsMax}
        <LinearProgress variant="determinate" value={skillKnowledgePointsSpent} />
      </Box>
      
      <Box sx={{ width: '100%' }}>Language Skills {skillLanguagePointsSpent}/{LanguageSkillsMax}
        <LinearProgress variant="determinate" value={skillLanguagePointsSpent} />
      </Box>

      <br></br>
      <br></br>
      <h3>Active Skills</h3>
      <FormControl style={{'width':'200px'}}>
        <InputLabel  id="skill-label">Skills Categories</InputLabel>
        <NativeSelect
          id="skill-dropdown"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {skillCategory.filter(cat => ActiveSkills.includes(cat)).map(catName => (
            <option key={catName} value={catName}>{catName}</option>
          ))}
        </NativeSelect>
      </FormControl>
      <br></br>
      <br></br>
    {selectedCategory && (  
      <FormControl style={{'width':'200px'}}>
        <InputLabel  id="skill-label">{selectedCategory}</InputLabel>
        <NativeSelect
          id="skill-dropdown"
          value={newSkill}
          onChange={handleSkillChange}
        >
          {skillsData[selectedCategory].map(skill => (
            <option key={skill.name} value={skill.name}>{skill.name}</option>
          ))}
        </NativeSelect>
      </FormControl>
    )}
      {newSkill && (
        <>
          <FormControl style={{'width':'200px','marginLeft':'20px'}}>
            <InputLabel id="specialization-label">Specialization</InputLabel>
            <NativeSelect
              id="specialization-dropdown"
              value={selectedSpecialization}
              onChange={handleSpecializationChange}
            >
              <option value="">None</option>
              {getSpecializationsForSkill(newSkill).map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </NativeSelect>
          </FormControl>

          <TextField style={{'width':'100px', 'marginRight':'20px','marginLeft':'20px'}}
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
      <Button variant="contained" color="primary" style={{'marginLeft':'20px'}} onClick={handleAddSkill}>
        Add Skill
      </Button>

      <h3>Knowledge Skills</h3>
      <FormControl style={{'width':'200px'}}>
        <InputLabel  id="skill-label">Skills Categories</InputLabel>
        <NativeSelect
          id="skill-dropdown"
          value={selectedKnowledgeCategory}
          onChange={handleKnowledgeCategoryChange}
        >
          {skillCategory.filter(cat => KnowledgeSkills.includes(cat)).map(catName => (
            <option key={catName} value={catName}>{catName}</option>
          ))}
        </NativeSelect>
      </FormControl>
      <br></br>
      <br></br>
    {selectedKnowledgeCategory && (  
      <FormControl style={{'width':'200px'}}>
        <InputLabel  id="skill-label">{selectedKnowledgeCategory}</InputLabel>
        <NativeSelect
          id="skill-dropdown"
          value={newKnowledgeSkill}
          onChange={handleKnowledgeSkillChange}
        >
          {skillsData[selectedKnowledgeCategory].map(skill => (
            <option key={skill.name} value={skill.name}>{skill.name}</option>
          ))}
        </NativeSelect>
      </FormControl>
    )}
      {newSkill && (
        <>
          <TextField style={{'width':'100px', 'marginRight':'20px', 'marginLeft':'20px'}}
            id="rating-input"
            label="Rating (1-6)"
            type="number"
            value={skillKnowledgeRating}
            onChange={handleKnowledgeRatingChange}
            InputProps={{
              inputProps: { min: 1, max: 6 },
            }}
          />
        </>
      )}
      <Button variant="contained" color="primary" style={{'marginLeft':'20px'}} onClick={handleKnowledgeAddSkill}>
        Add Skill
      </Button>

      <h3>Language Skills</h3>

      <FormControl style={{'width':'200px'}}>
        <InputLabel  id="skill-label"></InputLabel>
        <NativeSelect
          id="skill-dropdown"
          value={newLanguageSkill}
          onChange={handleLanguageSkillChange}
        >
          {LanguageSkillsData.map(skill => (
            <option key={skill.name} value={skill.name}>{skill.name}</option>
          ))}
        </NativeSelect>
      </FormControl>
        <>
          <TextField style={{'width':'100px', 'marginRight':'20px', 'marginLeft':'20px'}}
            id="rating-input"
            label="Rating (1-6)"
            type="number"
            value={skillLanguageRating}
            onChange={handleLanguageRatingChange}
            InputProps={{
              inputProps: { min: 1, max: 6 },
            }}
          />
        </>
      <Button variant="contained" color="primary" style={{'marginLeft':'20px'}} onClick={handleLanguageAddSkill}>
        Add Skill
      </Button>
      <hr></hr>
      <h3>Skills</h3>
      <List style={{maxWidth:'500px'}}>
        {characterSkills.map((skill, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={skill.specialization ? `${skill.name} (${skill.rating-1}) ->  ${skill.specialization} (${skill.rating + 1})`:`${skill.name} (${skill.rating})`}
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

export default SR3SkillsPanel;
