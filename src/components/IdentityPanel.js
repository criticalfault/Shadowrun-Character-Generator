import { Switch } from '@mui/material';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
const AllBooks = require('../data/Books.json');
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
    const [Tabs, setTabs] = React.useState(props.characterTabs);
    const [bookStates, setBookStates] = React.useState((props.Edition === 'SR3'?props.characterBooks3:props.characterBooks2));
    const handleBookCheckboxChange = (event) => {
            const { name, checked } = event.target;
            setBookStates(prevBookStates => ({
            ...prevBookStates,
            [name]: checked,
        }));
    }
    const handleChangeCharacterTabs = (event) => {
        let characterTabsPayload = { ...Tabs };
        characterTabsPayload[event.target.name] = event.target.checked;
        setTabs(characterTabsPayload);
        props.ChangeCharacterTabs(characterTabsPayload);
    }

    React.useEffect(function(){
       console.log(bookStates)
       props.ChangeAllowedBooks(bookStates);
    },[bookStates])

    return (<>
        Character Edition:
        SR2 <Switch checked={LocalEdition} onChange={handleSwitchEd} {...label} /> SR3
        <br></br>
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Tabs for this character</FormLabel>
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        value="top"
                        control={<Checkbox {...label} name="Magic" onChange={handleChangeCharacterTabs} checked={Tabs.Magic} />}
                        label="Magic Tab"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        value="top"
                        control={<Checkbox {...label} name="Decking" color="secondary" onChange={handleChangeCharacterTabs} checked={Tabs.Decking} />}
                        label="Decking Tab"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        value="top"
                        control={<Checkbox {...label} name="Otaku" color="success" onChange={handleChangeCharacterTabs} checked={Tabs.Otaku} />}
                        label="Otaku Tab"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        value="top"
                        control={<Checkbox {...label} name="Rigger" color="default" onChange={handleChangeCharacterTabs} checked={Tabs.Rigger} />}
                        label="Rigger / Vehicles Tab"
                        labelPlacement="end"
                    />
                </FormGroup>
            </FormControl>
        </div>
        <br></br>
        <FormControl component="fieldset">
                <FormLabel component="legend">Allowed Books for Character</FormLabel>
                <FormGroup aria-label="position" row>
                    {Object.keys(AllBooks)
                        .filter((book) => AllBooks[book].edition === props.Edition)
                        .sort((a, b) => a.loadByDefault - b.loadByDefault)
                        .map((book) => (
                            <div key={book}>
                            <FormControlLabel
                                value="top"
                                control={
                                    <Checkbox
                                        name={book}
                                        onChange={handleBookCheckboxChange}
                                        checked={bookStates[book] || false}
                                    />
                                }
                                label={AllBooks[book].name+" ("+book+")"}
                                labelPlacement="end"
                            />
                            </div>
                        ))
                    }
                </FormGroup>
            </FormControl>
        </>
    )
}