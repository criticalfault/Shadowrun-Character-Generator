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
        <div>
            <h3>Welcome To the SR 2/3 Character Creator</h3>
            <p>It is in <strong>Alpha</strong> at the moment.<br></br> So be prepared if it decideds to randomly die. There is a bunch of fixes still pending as well as a lot of known missing parts which will be added once this thing is partially stable.
            I'll list the known issues below, but feel free to poke and prod. See what you can get it to do. I'm going to continue to work on this as i get reports of breaks and the likes.</p>
            <p>Thanks for your consideration and time in testing! -D (dean 'at' nullsheen.com)</p>
            <h5>Known Issues (As of 04-20-24 - 10:40am CDT)</h5>
            <ul>
                <li>Still need to add "improvements" and tracking Nuyen post finalization.</li>
                <li>All nesting of improvements (Weapon / Deck / Vehicle accessories and building). These will be handled in a completely different way, but I promise it will feel awesome to do!</li>
            </ul>
        </div>
        <hr/>
        <h5>Resolved Issues</h5>
        <ul>
            <li>Added Karma and Karma Pool tracking. Its very basic but for now it should be fine to carry us forward until I can spend a lot more time on it.</li>
            <li>Fixed totem errors. Missed the elemental mage attributes which were causing the issue.</li>
            <li>LocalStorage save/load for faster and easier character handling</li>
            <li>Finally fixed Etiquette for SR2!!!!</li>
            <li>Fixed a bunch of dice pools. Hopefully those are looking much better!</li>
        </ul>
        <hr/>

        Character Edition:
        SR2 <Switch checked={LocalEdition} onChange={handleSwitchEd} {...label} /> SR3
        <br></br>
        <div>
            
            <FormControl component="fieldset">
                <FormLabel component="legend">Tabs for this character</FormLabel>
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        value="top"
                        control={<Checkbox {...label} name="Decking" color="secondary" onChange={handleChangeCharacterTabs} checked={Tabs.Decking} />}
                        label="Decking Tab"
                        labelPlacement="end"
                        disabled={true}
                    />
                    <FormControlLabel
                        value="top"
                        control={<Checkbox {...label} name="Otaku" color="success" onChange={handleChangeCharacterTabs} checked={Tabs.Otaku} />}
                        label="Otaku Tab"
                        labelPlacement="end"
                        disabled={true}
                    />
                    <FormControlLabel
                        value="top"
                        control={<Checkbox {...label} name="Rigger" color="default" onChange={handleChangeCharacterTabs} checked={Tabs.Rigger} />}
                        label="Rigger / Vehicles Tab"
                        labelPlacement="end"
                        disabled={true}
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