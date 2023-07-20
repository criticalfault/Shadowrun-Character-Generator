import { Switch } from '@mui/material';
import * as React from 'react';
export default function IdentityPanel() {
    const label = { inputProps: { 'aria-label': 'Edition Switch' } };
    return ( <>
        Character Edition:
        SR2 <Switch {...label} defaultChecked /> SR3
        
    </>)

}