import { Switch } from '@mui/material';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
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
        <br></br>
        <div>
        <FormControl component="fieldset">
            <FormLabel component="legend">Tabs for this character</FormLabel>
            <FormGroup aria-label="position" row>
                <FormControlLabel
                    value="top"
                    control={<Checkbox {...label} defaultChecked />}
                    label="Magic Tab"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value="top"
                    control={<Checkbox {...label} defaultChecked color="secondary" />}
                    label="Decking Tab"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value="top"
                    control={<Checkbox {...label} defaultChecked color="success" />}
                    label="Otaku Tab"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value="top"
                    control={<Checkbox {...label} defaultChecked color="default" />}
                    label="Rigger / Vehicles Tab"
                    labelPlacement="end"
                />
            </FormGroup>
        </FormControl>
        </div>
        
    </>)

}