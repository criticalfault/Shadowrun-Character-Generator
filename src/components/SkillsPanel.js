import {React, useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function SkillsPanel(props) {
    const [skillsData, setSkillsData] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [newSkillRating, setNewSkillRating] = useState(1);
    const [newSkillSpecialization, setNewSkillSpecialization] = useState('');
    const [newSkillConcentration, setNewSkillConcentration] = useState('');


    useEffect(() => {
        // Fetch the JSON data when the component mounts
        fetch('/skills.json')
          .then((response) => response.json())
          .then((data) => setSkillsData(data))
          .catch((error) => console.error('Error fetching skills data:', error));
      }, []);

    const handleSkillChange = (event) => {
        const selectedSkill = event.target.value;
        setNewSkill(selectedSkill);

        // If the selected skill has specializations, load them into the specialization dropdown
        const skillWithSpecializations = skillsData.find(skill => skill.name === selectedSkill);
        if (skillWithSpecializations && skillWithSpecializations.specializations) {
            setSpecializations(['None', ...skillWithSpecializations.specializations]);
        } else {
            setSpecializations(['None']);
        }
    };
    

  const handleAddSkill = () => {
    if (newSkill && newSkillRating > 0 && newSkillRating <= 6) {
      const newSkillEntry = {
        skill: newSkill,
        rating: newSkillRating,
        specialization: newSkillSpecialization || null,
        concentration: newSkillConcentration || null,
      };

      props.onChangeSkills([...props.skills, newSkillEntry]);
      setNewSkill('');
      setNewSkillRating(1);
      setNewSkillSpecialization('');
      setNewSkillConcentration('');
    }
  };

  const handleEditSkill = (index, editedSkill) => {
    const updatedSkills = [...props.skills];
    updatedSkills[index] = editedSkill;
    props.onChangeSkills(updatedSkills);
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = props.skills.filter((_, i) => i !== index);
    props.onChangeSkills(updatedSkills);
  };

  return (
    <div>
      <h2>Skills</h2>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <div>
      <FormControl>
        <InputLabel id="skill-label">Skill</InputLabel>
        <Select
          labelId="skill-label"
          id="skill-dropdown"
          value={newSkill}
          onChange={handleSkillChange}
        >
          {skillsData.map(skill => (
            <MenuItem key={skill.name} value={skill.name}>{skill.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {newSkill && (
        <FormControl>
          <InputLabel id="specialization-label">Specialization</InputLabel>
          <Select
            labelId="specialization-label"
            id="specialization-dropdown"
            value={selectedSpecialization}
            onChange={handleSpecializationChange}
          >
            {specializations.map(spec => (
              <MenuItem key={spec} value={spec}>{spec}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
      </Box>
      <Button variant="contained" onClick={handleAddSkill}>
        Add Skill
      </Button>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
     
        {props.skills.map((skill, index) => (
            <>
             <ListItem component="li">
                <div>
                    {skill.skill} (Rating: {skill.rating})
                    {skill.specialization && ` - Specialization: ${skill.specialization}`}
                    {skill.concentration && ` - Concentration: ${skill.concentration}`}
                </div>
                <Button variant="contained" onClick={() => handleEditSkill(index, skill)}>
                Edit
                </Button>
                <Button variant="contained" onClick={() => handleRemoveSkill(index)}>
                Remove
                </Button>
            </ListItem >
            <Divider variant="inset" component="li" />
            </>
        ))}
    </List>
    </div>
  );
}
