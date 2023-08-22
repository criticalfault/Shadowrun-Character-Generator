import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
//import ListItemText from '@mui/material/ListItemText';
// const contactArchTypes = [
//     "Fixer",
//     "Street Shaman",
//     "Street Samurai",
//     "Decker",
//     "Rigger",
//     "Mage",
//     "Adept",
//     "Face",
//     "Bounty Hunter",
//     "Smuggler",
//     "Corporation Executive",
//     "Journalist",
//     "Police Officer",
//     "Doctor",
//     "Hacker",
//     "Gang Leader"
//   ]
function ContactsPanel(props) {
  const [contacts, setContacts] = useState([...props.Contacts]);

  const handleAddContact = () => {
    const newContact = { Name: '', Type:"purchased", Archtype: '', Level: 1, GeneralInfo: '' };
    setContacts(prevContacts => [...prevContacts, newContact]);
    props.updateContacts(contacts)
  };

  const handleRemoveContact = index => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
    props.updateContacts(updatedContacts)
  };

  const handleContactChange = (event, index, property) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][property] = event.target.value;
    setContacts(updatedContacts);
    props.updateContacts(updatedContacts)
  };


  const handleNameChange = (event, contactId) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === contactId ? { ...contact, name: event.target.value } : contact
    );
    setContacts(updatedContacts);
    props.updateContacts(updatedContacts)
  };
  return (
    <div>
      <h2>Contacts</h2>
      <Button variant="contained" color="primary" onClick={handleAddContact}>
        Add Contact
      </Button>
      <List>
        {contacts.map((contact, index) => (
          <ListItem key={index}>

            <TextField
                label="Contact Name"
                type="text"
                value={contact.Name}
                onChange={event => handleNameChange(event, contact.id)}
            />
            <FormControl>
              <InputLabel>Level</InputLabel>
              <Select
                value={contact.Level}
                onChange={event => handleContactChange(event, index, 'Level')}
              >
                <MenuItem value={1}>1 - Contact</MenuItem>
                <MenuItem value={2}>2 - Buddy</MenuItem>
                <MenuItem value={3}>3 - Friend For Life</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="General Info"
              value={contact.GeneralInfo}
              onChange={event => handleContactChange(event, index, 'GeneralInfo')}
            />
            <Button color="secondary" onClick={() => handleRemoveContact(index)}>
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ContactsPanel;
