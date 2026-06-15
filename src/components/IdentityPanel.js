import { Switch } from '@mui/material';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AllBooks from '../data/Books.json';

export default function IdentityPanel(props) {
    const label = { inputProps: { 'aria-label': 'Edition Switch' } };
    const label2 = { inputProps: { 'aria-label': 'Creation Method Switch' } };
    const [LocalEdition, setLocalEdition] = React.useState((props.Edition === 'SR3'?true:false));
    const handleSwitchEd = (event) => {
        setLocalEdition(event.target.checked);
        if(event.target.checked){
            props.ChangeEdition('SR3');
        }else{
            props.ChangePowerLevel(2);
            props.ChangeEdition('SR2');
        }
    }
    const [LocalMethod, setLocalMethod] = React.useState((props.CGMethod === 'pointbuy'?true:false));
    const handleSwitchMethod = (event) => {
        setLocalMethod(event.target.checked);
        if(event.target.checked){
            props.ChangeCGMethod('pointbuy')
        }else{
            props.ChangeCGMethod('priorities')
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
            I'll list the known issues below, but feel free to poke and prod. See what you can get it to do. I'm going to continue to work on this as I get reports of breaks and the likes.</p>
            <p>Thanks for your consideration and time in testing! -D (dean 'at' nullsheen.com)</p>
            
            <h3>Added Point Buy!</h3>
            <p>This is extremely experimental! So if you run into a problem, drop me an email. DO NOT try to mix the two systems. It will break some stuff on your character!</p>
            
            <h5>Known Issues (As of 06-15-26)</h5>
            <ul>
                <li>SR2 gear is still missing all books, so filtering doesnt work. Also temporarily removing "cars" from the gear section as I fix up the vehicles tab for SR2 specifically</li>
                <li>Some issues with Knowledge and Langauge skills being edited or removed</li>
                <li>Still need to add "improvements" and tracking Nuyen post finalization.</li>
                <li>All nesting of improvements (Weapon / Deck / Vehicle accessories and building). These will be handled in a completely different way, but I promise it will feel awesome to do!</li>
                <li>Decker programming calculator (design and program your own utilities) not yet implemented</li>
                <li>Remote Control Decks from Rigger 3 not yet implemented</li>
            </ul>
        </div>
        <hr/>
        <h5>Resolved Issues</h5>
        <ul>
            <li>Control Pool now displayed in Dice Pools (SR3 p.148: Reaction + VCR bonus dice). Only shown when a VCR is installed; label includes VCR level (e.g. "Control (VCR 1)")</li>
            <li>SR3 Rigger 3 skills added — Vehicle Tactics (Technical, INT), Semiballistic/Suborbital/Tracks/Walkers/Mechanical Arm Operation B/R skills, and all matching Background knowledge skills (r3.24)</li>
            <li>SR3 Rigger 3 drone audit — audited all 52 drone entries against Rigger 3; removed duplicate Dalmatian entry, corrected names/costs/availability/speed on ~20 entries</li>
            <li>SR3 Rigger 3 vehicle audit — corrected ~34 vehicle entries (costs, availability, handling, split stats); added 2 missing vehicles; Rigger 3 VehicleMods system with 81 mods across 8 categories; full mod picker UI on vehicle and drone cards; sheet display shows modified stats with strikethrough base values</li>
            <li>Ally Spirit section added (MitS pp.107–113) — force, physical/mental attributes, skills, powers, spells, Sense Link, Karma Pool, forms, and karma cost tracker. Displays on the sheet display tab with full stats summary</li>
            <li>Edges &amp; Flaws system (Shadowrun Companion) — full implementation with all ~65 Edges and Flaws, picker UI, variable-cost tiers, and balance enforcement (net-zero for Priority, ±6 BP cap for Point Buy)</li>
            <li>Otaku Submersion grades, Echoes, and Tribe tracker added (mirroring the Initiation system). Costs follow Matrix book formula: (grade × 2) + 10 Karma</li>
            <li>Otaku Sprites section fully implemented with SearchableSelect dropdowns and Living Persona formula display</li>
            <li>SR3 Giants Body stat corrected to 5 (was 4); racial limits added to Attributes panel (were entirely missing)</li>
            <li>SR3 and SR2 Ogre notes corrected — Ogres do NOT have Low-Light Vision unlike other Orks</li>
            <li>Cloud Save button redesigned to match the Save/Load row style and opens a modal instead of an accordion</li>
            <li>All magical tradition descriptions, conjure types, and dice bonuses filled in from the Magic in the Shadows sourcebook</li>
            <li>Full SR3 Cannon Companion weapons audit — corrected concealability and ammo capacity on modular weapon systems (HK G38, Steyr AUG-CSL), Ares Thunderer concealability, and weapon type classifications for Hammerli 610S and Morrissey Elite</li>
            <li>SR3 Decking Panel — fixed all direct state mutations (addProgram, removeProgram, persona changes, program rating/toggle). Added SearchableSelect dropdowns to cyberdeck and program selectors</li>
            <li>SR3 Otaku Panel — all Living Persona formulas verified against the Matrix book (MPCP, Bod, Sensor, Masking, Evasion, Hardening, Matrix Reaction, Matrix Initiative, I/O Speed, Hacking Pool). Fixed several previously invented/incorrect formulas</li>
            <li>SR3 Programs.json — added missing Doorstop and Laser Link programs; split Erosion into 4 correct named variants (Blinder, Poison, Restrict, Reveal). All 54 program multipliers verified against the Matrix book</li>
            <li>SR3 Cyberdeck.json — fixed placeholder "?" values on Kirama LPD-12, Zetatech Parraline 5750, SGI Technologies Elysia, and CATCo Babel</li>
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
        Character Creation Method:
        Priorities <Switch checked={LocalMethod} onChange={handleSwitchMethod} {...label2} /> Point Buy
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
                        disabled={false}
                    />
                    <FormControlLabel
                        value="top"
                        control={<Checkbox {...label} name="Rigger" color="default" onChange={handleChangeCharacterTabs} checked={Tabs.Rigger} />}
                        label="Rigger / Vehicles Tab"
                        labelPlacement="end"
                        disabled={false}
                    />
                </FormGroup>
            </FormControl>
        </div>
        <br></br>
        <FormControl component="fieldset">
                <FormLabel component="legend">Allowed Books for Character</FormLabel>
                <FormGroup aria-label="position" row>
                    {Object.keys(AllBooks)
                        .filter((book) => AllBooks[book].edition == props.Edition)
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
