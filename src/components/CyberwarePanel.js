import { Switch } from '@mui/material';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
const CyberwareData = require('../data/SR3-Cyberware.json');
export default function CyberwarePanel(props) {

   
    
    return ( <>
        <pre>{CyberwareData.map((ware)=> (
            <div>{ware.Name}</div>
        ))}</pre>    

    </>)

}