import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

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
    const SaveCharacter = () => {
        let characterJSON = JSON.stringify(props.Character);
        const blob = new Blob([characterJSON], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
      
        // Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'SRCharacter.json';
        link.click();
      
        // Clean up by revoking the object URL
        URL.revokeObjectURL(url);
    }

    const LoadCharacter = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileData = e.target.result;
          props.loadCharacter(JSON.parse(fileData));
          setOpen(false);
        }    
        reader.readAsText(file); 
    }

    return (
      <div>
        <Button onClick={SaveCharacter} variant="contained">Save</Button>&nbsp;&nbsp;
        <Button onClick={handleOpen} variant="contained">Load</Button>
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
      </div>
    );
  }