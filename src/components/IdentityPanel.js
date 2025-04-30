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
            <p>It is in <strong>Beta</strong>, now that its a lot more stable. There is a bunch of fixes still pending as well as a lot of known missing parts which will be added once this thing is partially stable.
            I'll list the known issues below, but feel free to poke and prod. See what you can get it to do. I'm going to continue to work on this as i get reports of breaks and the likes.</p>
            <p>Thanks for your consideration and time in testing! -D (dean 'at' nullsheen.com)</p>
            <h5>Known Issues (As of 04-29-25 - 10:15pm CST)</h5>
            <ul>
                <li>SR2 gear is still missing all books, so filtering doesnt work. Also temporarily removing "cars" from the gear section as I fix up the vehicles tab for SR2 specifically</li>
                <li>Some issues with Knowledge and Langauge skills being edited or removed</li>
                <li>Still need to add "improvements" and tracking Nuyen post finalization.</li>
                <li>All nesting of improvements (Weapon / Deck / Vehicle accessories and building). These will be handled in a completely different way, but I promise it will feel awesome to do!</li>
            </ul>
        </div>
        <hr/>
        <h5>Resolved Issues</h5>
        <ul>
            <li>Fixed a ton of problems in the gear sections of SR2 Gear. You should see new categories now to make it much easier to find things.</li>
            <li>Corrected well over 100 items descriptions for "Stuff With Ratings" in the gear section. Also corrected an index mismatch due to book filtering for that same dropdown</li>
            <li>Added magical libraries to 3rd edition. Still need to do that for 2nd edition</li>
            <li>Fixed a bunch of gear items having bad display names, if you find more please let me know and i can fix them!</li>
            <li>Added Foci to the Sheet display</li>
            <li>Added some 3 dozen totems for Shamans.</li>
            <li>Fixed some issues with Physical Adept powers/traditions</li>
            <li>Added magical initative bonuses to the sheet display</li>
            <li>Added increasing attributes with Karma... so it begins</li>
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
