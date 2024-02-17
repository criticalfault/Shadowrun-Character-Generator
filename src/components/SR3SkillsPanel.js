import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
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
function SR3SkillsPanel({currentCharacter, characterSkills, onUpdateSkills, activeSkillPoints, KnowledgeSkillsMax, LanguageSkillsMax }) {
  const ActiveSkills = ['Combat skills','Build/Repair skills','Physical skills','Magical skills','Social skills','Survival skills','Technical skills','Vehicle skills','Otaku (MATRIX) skills','Martial Arts(MA)']
  const KnowledgeSkills = ['6th World (SW)','Academic Skills (AC)','Area Knowledge (AK)','Background (BK)','Interests (IN)','Program Design (PD)','Street (ST)','Survival (SV)', 'System Familiarity (SF)']
  const skillCategory = Object.keys(skillsData);
  const CalcTotalSkillsRatings = (skillsList) =>{
    let totalRatings = 0;
    skillsList.forEach(function(skill){
      totalRatings += skill.cost;
    })
    return totalRatings;
  }

  const AcronymToAttribute = {
    'QCK':"Quickness",
    'STR':"Strength",
    'BOD':"Body",
    'WIL':"Willpower",
    'INT':"Intelligence",
    'CHA':"Charisma",
    'RCT':"Reaction",
  }

  //Active Skills
  const [selectedSpecialization, setSelectedSpecialization] = useState('None');
  const [selectedSkills, setSelectedSkills] = useState(characterSkills.filter(skill => skill.type === 'Active'));
  const [selectedCategory, setSelectedCategory] = useState('Combat skills');
  const [skillRating, setSkillRating] = useState(1);
  const [skillPointsSpent, setSkillPointsSpent] = useState(CalcTotalSkillsRatings(characterSkills.filter(skill => skill.type === 'Active')));
  const [newSkill, setNewSkill] = useState('Assault Rifles');
  const [newSkillAttribute, setNewSkillAttribute] = useState('INT');

  //Knowledge Skills
  const [selectedKnowledgeSpecialization, setKnowledgeSelectedSpecialization] = useState('');
  const [selectedKnowledgeSkills, setKnowledgeSelectedSkills] = useState(characterSkills.filter(skill => skill.type === 'Knowledge'));
  const [selectedKnowledgeCategory, setKnowledgeSelectedCategory] = useState('Street (ST)');
  const [skillKnowledgeRating, setKnowledgeSkillRating] = useState(1);
  const [skillKnowledgePointsSpent, setKnowledgeSkillPointsSpent] = useState(CalcTotalSkillsRatings(characterSkills.filter(skill => skill.type === 'Knowledge')));
  const [newKnowledgeSkill, setKnowledgeNewSkill] = useState('ST:Arms Dealers');

  //Language Skills
  const [selectedLanguageSpecialization, setLanguageSelectedSpecialization] = useState('');
  const [selectedLanguageSkills, setLanguageSelectedSkills] = useState(characterSkills.filter(skill => skill.type === 'Language'));
  const [skillLanguageRating, setLanguageSkillRating] = useState(1);
  const [skillLanguagePointsSpent, setLanguageSkillPointsSpent] = useState(0);
  const [newLanguageSkill, setLanguageNewSkill] = useState('English');


  useEffect(() => {
    //Actually remove the skills when they are deleted.
    onUpdateSkills([...selectedSkills,...selectedKnowledgeSkills,...selectedLanguageSkills]);
    //Update bar graphs for each category
    setSkillPointsSpent(CalcTotalSkillsRatings([...selectedSkills]));
    setKnowledgeSkillPointsSpent(CalcTotalSkillsRatings([...selectedKnowledgeSkills]))
    setLanguageSkillPointsSpent(CalcTotalSkillsRatings([...selectedLanguageSkills]));
  }, [selectedSkills,selectedKnowledgeSkills,selectedLanguageSkills])

 // Handle CategoryChange events
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  const handleKnowledgeCategoryChange = (event) => {
    setKnowledgeSelectedCategory(event.target.value);
  }

  //Handle Skill Change events
  const handleSkillChange = (event) => {
    let skill = event.target.value;
    let skillsReMap ={};
    skillsData[selectedCategory].map((element) => {
      skillsReMap[element.name] = element;
    });
    setNewSkill(skill);
    setNewSkillAttribute(skillsReMap[skill].attribute);
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

  const AddSkillRating = (event) => {
    const rating = skillRating + 1;
    if (!isNaN(rating) && rating >= 1 && rating <= 6) {
      setSkillRating(rating);
    }
  }

  const RemoveSkillRating = (event) => {
    const rating = skillRating - 1;
    if (!isNaN(rating) && rating >= 1 && rating <= 6) {
      setSkillRating(rating);
    }
  }

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

  const AddKnowledgeRating = (event) => {
    const rating = skillKnowledgeRating + 1;
    if (!isNaN(rating) && rating >= 1 && rating <= 6) {
      setKnowledgeSkillRating(rating);
    }
  }

  const RemoveKnowledgeRating = (event) => {
    const rating = skillKnowledgeRating - 1;
    if (!isNaN(rating) && rating >= 1 && rating <= 6) {
      setKnowledgeSkillRating(rating);
    }
  }

  const handleLanguageRatingChange = (event) => {
    const rating = parseInt(event.target.value);
    if (!isNaN(rating) && rating >= 1 && rating <= 6) {
      setLanguageSkillRating(rating);
    }
  };

  const AddLanguageRating = (event) => {
    const rating = skillLanguageRating + 1;
    if (!isNaN(rating) && rating >= 1 && rating <= 6) {
      setLanguageSkillRating(rating);
    }
  }

  const RemoveLanguageRating = (event) => {
    const rating = skillLanguageRating - 1;
    if (!isNaN(rating) && rating >= 1 && rating <= 6) {
      setLanguageSkillRating(rating);
    }
  }

  const getSpecializationsForSkill = (skillName) => {
    const skill = skillsData[selectedCategory].find((skill) => skill.name === skillName);
    return skill ? skill.specializations.map((spec) => spec.name) : [];
  };

  const handleAddSkill = () => {
    if (newSkill) {
      let costDiff = (parseInt(skillRating)-parseInt(currentCharacter.attributes[AcronymToAttribute[newSkillAttribute]]))
      let cost = skillRating
      if(costDiff > 0) {
        cost += costDiff;
      }
    
      const skillToAdd = { name: newSkill, cost:cost, rating:skillRating, attribute:newSkillAttribute, specialization: selectedSpecialization, type:'Active' };
      setSelectedSkills(prevSkills => [...prevSkills, skillToAdd]);
      setSkillPointsSpent(prevSkills => (prevSkills + skillRating));
      setNewSkill('');
      setSelectedSpecialization('');
      setNewSkillAttribute('INT');

      // Update the characterSkills array with the new skill
      const updatedSkills = [...characterSkills, skillToAdd];
      // Call the onUpdateSkills function to update the character state in the Dashboard component
      onUpdateSkills(updatedSkills);
    }
  };

  const handleKnowledgeAddSkill = () => {
    if (newKnowledgeSkill) {
      let costDiff = (skillKnowledgeRating-currentCharacter.attributes['Intelligence'])
      let cost = skillKnowledgeRating;
      if(costDiff > 0) {
        cost += costDiff;
      }
      const skillToAdd = { name: newKnowledgeSkill, cost:cost, rating:skillKnowledgeRating, attribute:'INT', specialization: selectedKnowledgeSpecialization, type:'Knowledge' };
      setKnowledgeSelectedSkills(prevSkills => [...prevSkills, skillToAdd]);
      setKnowledgeSkillPointsSpent(prevSkills => (prevSkills + skillKnowledgeRating));
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
      let costDiff = (skillLanguageRating-currentCharacter.attributes['Intelligence'])
      let cost = skillLanguageRating
      if(costDiff > 0) {
        cost += costDiff;
      }
      const skillToAdd = { name: newLanguageSkill, cost:cost, rating:skillLanguageRating, attribute:'INT', specialization: selectedLanguageSpecialization, type:'Language' };
      setLanguageSelectedSkills(prevSkills => [...prevSkills, skillToAdd]);
      setLanguageSkillPointsSpent(prevSkills => (prevSkills + skillLanguageRating));
      setLanguageNewSkill('');
      setLanguageSkillRating(1);
      // Update the characterSkills array with the new skill
      const updatedSkills = [...characterSkills, skillToAdd];
      // Call the onUpdateSkills function to update the character state in the Dashboard component
      onUpdateSkills(updatedSkills);
    }
  };

  const handleEditSkill = (index, type) => {
    try{
      let editedSkills = null;
      let skillToEdit = null;
      switch(type) {
        case "Active":
          editedSkills = [...selectedSkills];
          skillToEdit = editedSkills[index];
          setSelectedSpecialization(skillToEdit.specialization);
          setNewSkill(skillToEdit.name);
          setSkillRating(skillToEdit.rating);
          setNewSkillAttribute(skillToEdit.attribute);
          editedSkills.splice(index, 1);
          setSelectedSkills(editedSkills);
          break;

        case "Knowledge":
          editedSkills = [...selectedKnowledgeSkills];
          skillToEdit = editedSkills[index];
          console.log(editedSkills);
          console.log(skillToEdit);
          if(skillToEdit !== undefined) {
            setKnowledgeSelectedSpecialization(skillToEdit.specialization??'None');
            setKnowledgeNewSkill(skillToEdit.name);
            setKnowledgeSkillRating(skillToEdit.rating);
            editedSkills.splice(index, 1);
            setKnowledgeSelectedSkills(editedSkills);
          }
          break;

        case "Language":
          editedSkills = [...selectedKnowledgeSkills];
          skillToEdit = editedSkills[index];
          setLanguageSelectedSpecialization(skillToEdit.specialization??'None');
          setLanguageNewSkill(skillToEdit.name);
          setLanguageSkillRating(skillToEdit.rating);
          editedSkills.splice(index, 1);
          setLanguageSelectedSkills(editedSkills);
          break;

          default:
            break;
      }
    }catch(err) {
      console.log(err);
      alert('There was an error editing the skill. This has been reported to the developer.');
    }
  };

  const handleRemoveSkill = (index, type) => {
    let editedSkills = null;

    switch(type) {
      case "Active":
        editedSkills = [...selectedSkills];
        editedSkills.splice(index, 1);
        setSelectedSkills(editedSkills);
        onUpdateSkills([...selectedSkills,...selectedKnowledgeSkills,...selectedLanguageSkills]);
        break;
      case "Knowledge":
        editedSkills = [...selectedKnowledgeSkills];
        editedSkills.splice(index, 1);
        setKnowledgeSelectedSkills(editedSkills);
        onUpdateSkills([...selectedSkills,...selectedKnowledgeSkills,...selectedLanguageSkills]);
        break;
      case "Language":
        editedSkills = [...selectedLanguageSkills];
        editedSkills.splice(index, 1);
        setLanguageSelectedSkills(editedSkills);
        onUpdateSkills([...selectedSkills,...selectedKnowledgeSkills,...selectedLanguageSkills]);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Box sx={{ width: '250px' }}>Active Skills {skillPointsSpent}/{activeSkillPoints}
        <LinearProgress variant="determinate" value={skillPointsSpent/activeSkillPoints*100} />
      </Box>
      
      <Box sx={{ width: '250px' }}>Knowledge Skills {skillKnowledgePointsSpent}/{KnowledgeSkillsMax}
        <LinearProgress variant="determinate" value={skillKnowledgePointsSpent/KnowledgeSkillsMax*100} />
      </Box>
      
      <Box sx={{ width: '250px' }}>Language Skills {skillLanguagePointsSpent}/{LanguageSkillsMax}
        <LinearProgress variant="determinate" value={skillLanguagePointsSpent/LanguageSkillsMax*100} />
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
          data-attribute={newSkillAttribute}
          onChange={handleSkillChange}
        >
          {skillsData[selectedCategory].map(skill => (
            <option key={skill.name} value={skill.name} >{skill.name}</option>
          ))}
        </NativeSelect>
      </FormControl>
    )}
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
          <Button onClick={ AddSkillRating} variant="contained" color="primary" className='btn'>+</Button> &nbsp;&nbsp;
          <Button onClick={ RemoveSkillRating} variant="contained" color="primary" className='btn'>-</Button>
        </>
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
      <FormControl style={{'width':'200px', 'marginBottom':'20px'}}>
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
          <Button onClick={ AddKnowledgeRating } variant="contained" color="primary" className='btn'>+</Button> &nbsp;&nbsp;
          <Button onClick={ RemoveKnowledgeRating} variant="contained" color="primary" className='btn'>-</Button>
        </>
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
          <Button onClick={AddLanguageRating}  variant="contained" color="primary" className='btn'>+</Button> &nbsp;&nbsp;
          <Button onClick={RemoveLanguageRating} variant="contained" color="primary" className='btn'>-</Button>
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
              primary={skill.specialization ? `${skill.name} (${skill.rating-1}) ->  ${skill.specialization} (${skill.rating + 1}) Cost:[${skill.cost}]`:`${skill.name} (${skill.rating}) Cost:[${skill.cost}]`}
            />
            <Button color="primary" onClick={() => handleEditSkill(index, skill.type)}>
              Edit
            </Button>
            <Button color="secondary" onClick={() => handleRemoveSkill(index, skill.type)}>
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
      
    </div>
  );
}

export default SR3SkillsPanel;
