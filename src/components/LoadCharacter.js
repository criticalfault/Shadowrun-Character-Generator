import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
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

export default function LoadCharacter(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openLocalStorage, setOpenLocalStorage] = React.useState(false);
    const handleOpenLocalStorage = () => setOpenLocalStorage(true);
    const handleCloseLocalStorage = () => setOpenLocalStorage(false);
    
    const fixOlderCharactersMissingProperties = (characterObject) => {
      let characterObjectFixed = {...props.BaseCharacter,...characterObject};
      return characterObjectFixed;
    }
    const SaveCharacter = () => {
        let Char = props.Character;
        Char.edition = props.Edition
        let characterJSON = JSON.stringify(Char);
        const blob = new Blob([characterJSON], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
      
        // Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'SRCharacter.json';
        link.click();
      
        // Clean up by revoking the object URL
        URL.revokeObjectURL(url);
        try{
          fathom.trackEvent('Save Character'); // eslint-disable-line
        }catch(err){
            console.log(err);
            console.log("Fathom wasn't found. Prolly a blocker");
        }
    }

    const LoadCharacter = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileData = e.target.result;
          const characterToLoad = fixOlderCharactersMissingProperties(JSON.parse(fileData));
          props.loadCharacter(characterToLoad);
          console.log(characterToLoad.edition)
          props.ChangeEdition(characterToLoad.edition);
          setOpen(false);
        }    
        reader.readAsText(file); 
        try{
          fathom.trackEvent('Load Character'); // eslint-disable-line
        }catch(err){
            console.log(err);
            console.log("Fathom wasn't found. Prolly a blocker");
        }
    }

    const localStroageSave = (saveSlot) => {
      let Char = props.Character;
      Char.edition = props.Edition
      let characterJSON = JSON.stringify(Char);
      localStorage.setItem('characterSlot'+saveSlot, characterJSON);
      setOpenLocalStorage(false);
    }

    const localStroageLoad = (saveSlot) => {
      let characterJSON = localStorage.getItem('characterSlot'+saveSlot);
      let characterToLoad = fixOlderCharactersMissingProperties(JSON.parse(characterJSON));
      props.loadCharacter(characterToLoad);
      props.ChangeEdition(characterToLoad.edition);
      console.log(characterToLoad.edition)
      setOpenLocalStorage(false);
    }

    const getSaveDescription = (saveSlot) => {
      let characterJSON = localStorage.getItem('characterSlot'+saveSlot);
      if(characterJSON !== null) {
        let tempCharacter = JSON.parse(characterJSON);
        return ( <span style={{'text-transform': 'capitalize'}}> - {tempCharacter.street_name}</span>
        )
      }
    }

    return (
      <div>
        <Button onClick={SaveCharacter} variant="contained">Save</Button>&nbsp;&nbsp;
        <Button onClick={handleOpen} variant="contained">Load</Button>&nbsp;&nbsp;
        <Button onClick={handleOpenLocalStorage} variant="contained">Local Storage Save/Load</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <label>
                    Import Character<br></br><br></br>
                    <input type='file' name='characterLoad' onChange={LoadCharacter}/> 
                </label>
            </Box>
        </Modal>
        <Modal
            open={openLocalStorage}
            onClose={handleCloseLocalStorage}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  This uses your browsers storage mechanism to save/load characters. This is PER computer and PER browser. So its not for instance available on your phone if you saved it on your PC. You'll need to use the file save for that, but then you can save it on your phone!
                </Grid>
                <Grid item xs={12} md={6}>
                    Save Character
                    <hr></hr>
                    <Button onClick={function(event){ localStroageSave(1)} }>Save 1 </Button><br></br>
                    <Button onClick={function(event){ localStroageSave(2)} }>Save 2 </Button><br></br>
                    <Button onClick={function(event){ localStroageSave(3)} }>Save 3 </Button><br></br>
                    <Button onClick={function(event){ localStroageSave(4)} }>Save 4 </Button><br></br>
                    <Button onClick={function(event){ localStroageSave(5)} }>Save 5 </Button><br></br>
                </Grid>
                <Grid item xs={12} md={6}>
                    Load Character
                    <hr></hr>
                    <Button onClick={function(event){ localStroageLoad(1)} }>Load {getSaveDescription(1)}</Button><br></br>
                    <Button onClick={function(event){ localStroageLoad(2)} }>Load {getSaveDescription(2)}</Button><br></br>
                    <Button onClick={function(event){ localStroageLoad(3)} }>Load {getSaveDescription(3)}</Button><br></br>
                    <Button onClick={function(event){ localStroageLoad(4)} }>Load {getSaveDescription(4)}</Button><br></br>
                    <Button onClick={function(event){ localStroageLoad(5)} }>Load {getSaveDescription(5)}</Button><br></br>
                </Grid>
              </Grid>
            </Box>
        </Modal>
      </div>
    );
  }