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

function MagicPanel(props) {
  const [spellsData, setSpellsData] = useState();
  const [newSpell, setNewSpell] = useState('');
  const [selectedSpells, setSelectedSpells] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [spellRating, setSpellRating] = useState(1);
  const [spellPointsSpent, setSpellPointsSpent] = useState(0);
  const [spellCategory, setSpellCategory] = useState(Object.keys(spellsData));

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  const handleSpellChange = (event) => {
    setNewSpell(event.target.value);
  };

  const handleRatingChange = (event) => {
    const rating = parseInt(event.target.value);
    if (!isNaN(rating) && rating >= 1 && rating <= 6) {
      setSpellRating(rating);
    }
  };

  const handleAddSpell = () => {
    if (newSpell) {
      const spellToAdd = { name: newSpell, rating:spellRating, };
      setSelectedSpells(prevSpells => [...prevSpells, spellToAdd]);
      setSpellPointsSpent(prevSpells => (prevSpells + spellRating));
      setNewSpell('');
    }
  };

  const handleEditSpell = (index) => {
    const editedSpells = [...selectedSpells];
    const spellToEdit = editedSpells[index];
    setNewSpell(spellToEdit.name);
    setSpellRating(spellToEdit.rating);
    editedSpells.splice(index, 1);
    setSelectedSpells(editedSpells);
  };

  const handleRemoveSpell = (index) => {
    const editedSpells = [...selectedSpells];
    editedSpells.splice(index, 1);
    setSelectedSpells(editedSpells);
  };

  console.log(selectedSpells)

  return (
    <div>
      <FormControl style={{'width':'200px'}}>
        <InputLabel  id="spell-label">Spells Categories</InputLabel>
        <Select
          labelId="spell-label"
          id="spell-dropdown"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {spellCategory.map(catName => (
            <MenuItem key={catName} value={catName}>{catName}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br></br>
      <br></br>
    {selectedCategory && (  
      <FormControl style={{'width':'200px'}}>
        <InputLabel  id="spell-label">{selectedCategory}</InputLabel>
        <Select
          labelId="spell-label"
          id="spell-dropdown"
          value={newSpell}
          onChange={handleSpellChange}
        >
          {spellsData[selectedCategory].map(spell => (
            <MenuItem key={spell.name} value={spell.name}>{spell.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )}
      {newSpell && (
        <>
          <TextField style={{'width':'100px', 'marginRight':'20px'}}
            id="rating-input"
            label="Rating (1-6)"
            type="number"
            value={spellRating}
            onChange={handleRatingChange}
            InputProps={{
              inputProps: { min: 1, max: 6 },
            }}
          />
        </>
      )}
      <Button variant="contained" color="primary" onClick={handleAddSpell}>
        Add Spell
      </Button>

      <List style={{maxWidth:'500px'}}>
        {selectedSpells.map((spell, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${spell.name} (${spell.rating})`}
            />
            <Button color="primary" onClick={() => handleEditSpell(index)}>
              Edit
            </Button>
            <Button color="secondary" onClick={() => handleRemoveSpell(index)}>
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default MagicPanel;