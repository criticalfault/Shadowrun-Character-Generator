import { Switch } from '@mui/material';
import * as React from 'react';
export default function IdentityPanel(props) {
    const label = { inputProps: { 'aria-label': 'Edition Switch' } };
    const [LocalEdition, setLocalEdition] = React.useState((props.Edition === 'SR3'?true:false));
    const handleSwitchEd = (event) => {
        setLocalEdition(event.target.checked);
        if(event.target.checked){
            props.ChangeEdition('SR3')
        }else{
            props.ChangeEdition('SR2')
        }
    }
    return ( <>
        Character Edition:
        SR2 <Switch checked={LocalEdition} onChange={handleSwitchEd} {...label} /> SR3
        <br></br><br></br>
        
        
    </>)

}