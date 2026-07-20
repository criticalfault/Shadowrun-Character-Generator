import { Switch } from '@mui/material';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AllBooks from '../data/Books.json';

export default function IdentityPanel(props) {
    const label = { inputProps: { 'aria-label': 'Edition Switch' } };
    const label2 = { inputProps: { 'aria-label': 'Creation Method Switch' } };
    const [LocalEdition, setLocalEdition] = React.useState((props.Edition === 'SR3'?true:false));
    const handleSwitchEd = (event) => {
        setLocalEdition(event.target.checked);
        if(event.target.checked){
            props.ChangeEdition('SR3');
            setBookStates(props.characterBooks3);
        }else{
            props.ChangePowerLevel(2);
            props.ChangeEdition('SR2');
            setBookStates(props.characterBooks2);
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
    const [showFanBooks, setShowFanBooks] = React.useState(false);
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
        {/* ── Character Configuration ── */}
        <div style={{ marginBottom: 16 }}>
            <h3 style={{ marginTop: 0 }}>Character Setup</h3>

            <div style={{ marginBottom: 12 }}>
                <strong>Edition:</strong>&nbsp;
                SR2 <Switch checked={LocalEdition} onChange={handleSwitchEd} {...label} /> SR3
            </div>

            <div style={{ marginBottom: 12 }}>
                <strong>Creation Method:</strong>&nbsp;
                Priorities <Switch checked={LocalMethod} onChange={handleSwitchMethod} {...label2} /> Point Buy
            </div>

            <FormControl component="fieldset" style={{ marginBottom: 12 }}>
                <FormLabel component="legend">Optional Tabs</FormLabel>
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        value="top"
                        control={<Checkbox {...label} name="VehicleDesigner" color="default" onChange={handleChangeCharacterTabs} checked={Tabs.VehicleDesigner ?? false} />}
                        label="Vehicle Designer Tab"
                        labelPlacement="end"
                        disabled={false}
                    />
                    <FormControlLabel
                        value="top"
                        control={<Checkbox {...label} name="WeaponDesigner" color="default" onChange={handleChangeCharacterTabs} checked={Tabs.WeaponDesigner ?? false} />}
                        label="Weapon Designer Tab"
                        labelPlacement="end"
                        disabled={false}
                    />
                    <FormControlLabel
                        value="top"
                        control={<Checkbox {...label} name="CyberdeckDesigner" color="default" onChange={handleChangeCharacterTabs} checked={Tabs.CyberdeckDesigner ?? false} />}
                        label="Cyberdeck Designer Tab"
                        labelPlacement="end"
                        disabled={false}
                    />
                    <FormControlLabel
                        value="top"
                        control={<Checkbox {...label} name="ProgrammingCalculator" color="default" onChange={handleChangeCharacterTabs} checked={Tabs.ProgrammingCalculator ?? false} />}
                        label="Programming Calculator Tab"
                        labelPlacement="end"
                        disabled={false}
                    />
                </FormGroup>
            </FormControl>

            <FormControl component="fieldset">
                <FormLabel component="legend">Allowed Books</FormLabel>
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
                <div style={{ marginTop: 8 }}>
                    <span
                        onClick={() => setShowFanBooks(v => !v)}
                        style={{ cursor: 'pointer', fontSize: '0.85em', color: '#aaa', userSelect: 'none' }}
                    >
                        {showFanBooks ? '▾' : '▸'} Fan / Conversion Books
                    </span>
                    {showFanBooks && (
                        <FormGroup aria-label="fan books" row style={{ marginTop: 4 }}>
                            {Object.keys(AllBooks)
                                .filter((book) => !AllBooks[book].edition)
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
                    )}
                </div>
            </FormControl>
        </div>

        <hr/>

        {/* ── About / Intro ── */}
        <Accordion defaultExpanded={false} disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <strong>About This App</strong>
            </AccordionSummary>
            <AccordionDetails>
                <p style={{ marginTop: 0 }}>It is in <strong>Beta</strong>, now that its a lot more stable. There is a bunch of fixes still pending as well as a lot of known missing parts which will be added once this thing is partially stable.
                I'll list the known issues below, but feel free to poke and prod. See what you can get it to do. I'm going to continue to work on this as I get reports of breaks and the likes.</p>
                <p>Point Buy is now available! This is extremely experimental — do NOT try to mix the two systems mid-character.</p>
                <p>Thanks for your consideration and time in testing! -D (dean 'at' nullsheen.com)</p>
            </AccordionDetails>
        </Accordion>

        {/* ── Known Issues ── */}
        <Accordion defaultExpanded={true} disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <strong>Known Issues&ensp;<span style={{ color: '#aaa', fontWeight: 'normal', fontSize: '0.85em' }}>(as of 06-15-26)</span></strong>
            </AccordionSummary>
            <AccordionDetails>
                <ul style={{ marginTop: 0 }}>
                    <li>SR2 gear is still missing all books, so filtering doesnt work. Also temporarily removing "cars" from the gear section as I fix up the vehicles tab for SR2 specifically</li>
                    <li>Some issues with Knowledge and Langauge skills being edited or removed</li>
                    <li>Still need to add "improvements" and tracking Nuyen post finalization.</li>
                    <li>All nesting of improvements (Weapon / Deck / Vehicle accessories and building). These will be handled in a completely different way, but I promise it will feel awesome to do!</li>
                    <li>Decker programming calculator (design and program your own utilities) not yet implemented</li>
                </ul>
            </AccordionDetails>
        </Accordion>

        {/* ── Resolved Issues ── */}
        <Accordion defaultExpanded={false} disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <strong>Resolved Issues&ensp;<span style={{ color: '#aaa', fontWeight: 'normal', fontSize: '0.85em' }}>(changelog)</span></strong>
            </AccordionSummary>
            <AccordionDetails>
                <ul style={{ marginTop: 0 }}>
                    <li>Remote Control Deck sheet added to Sheet Display — Signal Condition Monitor (3 clickable damage tracks), all RCD stats, Flux Ranges table, Subscribed Drones table auto-populated from character drones, per-drone Autosofts/Standing Orders, and Drone Weapons table. Toggle on/off with a button.</li>
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
            </AccordionDetails>
        </Accordion>
    </>)
}
