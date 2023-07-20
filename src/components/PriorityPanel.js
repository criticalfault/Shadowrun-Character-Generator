import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Select } from '@mui/material';

export default function PriorityPanel(props) {

    const prorityChart = {
        'SR3':{
            "raceBonuses":{
                "Human":{ 'Body':0,'Quickness':0,'Strength':0,'Charisma':0,'Willpower':0,'Intelligence':0,"Notes":""},
                "Dwarf":{'Body':1,'Quickness':0,'Strength':2,'Charisma':0,'Willpower':0,'Intelligence':0,"Notes":"Thermographic Vision, Resistance (+2 Body) to any disease or toxin"},
                "Elf":{'Body':0,'Quickness':1,'Strength':0,'Charisma':2,'Willpower':0,'Intelligence':0,"Notes":"Low-light Vision"},
                "Ork":{'Body':3,'Quickness':0,'Strength':2,'Charisma':-1,'Willpower':0,'Intelligence':-1,"Notes":"Low-light Vision"},
                "Troll":{'Body':5,'Quickness':-1,'Strength':4,'Charisma':0,'Willpower':0,'Intelligence':-2,"Notes":"Thermographic Vision, +1 Reach for Armed/Unarmed Combat, Dermal Armor (+1 Body)"}
            },
            "race": {
                    "A":['Troll','Ork','Dwarf','Elf','Human'], 
                    "B":['Troll','Ork','Dwarf','Elf','Human'], 
                    "C":['Troll','Elf', 'Human'], 
                    "D":['Dwarf','Ork','Human'],
                    "E":['Human'],
                },
            "magic": {
                "A":["Full Magician"],
                "B":['Physical Adept',"Shamanist","Sorcerer"],
                "C":[],
                "D":[],
                "E":[]
            },
            "attributes":   {"A":30,     "B":27,    "C":24,   "D":21,   "E":18},
            "skills":       {"A":50,     "B":40,    "C":34,   "D":30,   "E":27},
            "nuyen":    {"A":1000000,"B":400000,"C":90000,"D":20000,"E":5000}
        },
        'SR2':{
            "raceBonuses":{
                "Human":{ 'Body':0,'Quickness':0,'Strength':0,'Charisma':0,'Willpower':0,'Intelligence':0,"Notes":""},
                "Dwarf":{'Body':1,'Quickness':-1,'Strength':2,'Charisma':0,'Willpower':1,'Intelligence':0,"Notes":"Thermographic Vision, Resistance (+2 Body) to any disease or toxin"},
                "Elf":{'Body':0,'Quickness':1,'Strength':0,'Charisma':2,'Willpower':0,'Intelligence':0,"Notes":"Low-light Vision"},
                "Ork":{'Body':3,'Quickness':-1,'Strength':2,'Charisma':-1,'Willpower':-1,'Intelligence':-1,"Notes":"Low-light Vision"},
                "troll":{'Body':5,'Quickness':-1,'Strength':4,'Charisma':-2,'Willpower':-1,'Intelligence':-2,"Notes":"Thermographic Vision, +1 Reach for Armed/Unarmed Combat, Dermal Armor (+1 Body)"}
            },
            "race": {
                "A":['Troll','Ork','Dwarf','Elf','Human'], 
                "B":['Human'], 
                "C":['Human'], 
                "D":['Human'],
                "E":['Human'],
            },
        "magic": {
                "A":["Human Full Magician"],
                "B":['Metahuman Full Magician','Human Physical Adept',"Human Shamanist"," Human Sorcerer"],
                "C":['Metahuman Physical Adept',"Metahuman Shamanist"," Metahuman Sorcerer"],
                "D":[],
                "E":[]
            },
            "attributes":   { "A":30, "B":24, "C":20, "D":17, "E":15},
            "skills":       { "A":40, "B":30, "C":24, "D":20, "E":17},
            "resources": {
                    "A":{"nuyen":1000000, "spell_points":50},
                    "B":{"nuyen":400000, "spell_points":35},
                    "C":{"nuyen":90000, "spell_points":25},
                    "D":{"nuyen":5000, "spell_points":15},
                    "E":{"nuyen":500, "spell_points":5} 
            }
        }
    }
    const [Race, setRace] = React.useState(['Human']);
    const [PriorityA, setPriorityA] = React.useState('');
    const [PriorityB, setPriorityB] = React.useState('');
    const [PriorityC, setPriorityC] = React.useState('');
    const [PriorityD, setPriorityD] = React.useState('');
    const [PriorityE, setPriorityE] = React.useState('');
    
    const handleRaceChange = (race) => {
        setRace(race.target.value);
        props.ChangeRace(race.target.value);
        props.ChangeRaceBonuses(prorityChart[props.Edition].raceBonuses[race.target.value]);
    }
    const handleChangePriority = (event, newPriority) => {
        let letter = event.target.dataset.code;
        if(newPriority ===  'race'){
            props.ChangeRaceChoices(prorityChart[props.Edition][newPriority][letter]);
        }else if(newPriority === 'magic'){
            props.ChangeMagicChoices(prorityChart[props.Edition][newPriority][letter]);
        }else if(newPriority === 'attributes'){
            props.ChangeMaxAttributes(prorityChart[props.Edition][newPriority][letter]);
        }else if(newPriority === 'skills'){
            props.ChangeMaxSkills(prorityChart[props.Edition][newPriority][letter]);
        }else if(newPriority === 'nuyen'){
            props.ChangeMaxCash(prorityChart[props.Edition][newPriority][letter]);
        }
        console.log(newPriority);
        switch(letter) {

            case "A":
                setPriorityA(newPriority);
            break;

            case "B":
                setPriorityB(newPriority);
            break

            case "C":
                setPriorityC(newPriority);
            break;

            case "D":
                setPriorityD(newPriority);
            break;

            case "E":
                setPriorityE(newPriority);
            break;

            default:
            break;
        }
        //props.ChangePriority({"A":PriorityA,"B":PriorityB,"C":PriorityC,"D":PriorityD,"E":PriorityE});
    };
    

    return (
        <div>
            <h2>MASTER CHARACTER CREATION TABLE</h2>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={2}>
                    <div>Priority</div>
                </Grid>
                <Grid item xs={2}>
                    <div>Race</div>
                </Grid>
                <Grid item xs={2}>
                    <div>Magic</div>
                </Grid>
                <Grid item xs={2}>
                    <div>Attributes</div>
                </Grid>
                <Grid item xs={2}>
                    <div>Skills</div>
                </Grid>
                <Grid item xs={2}>
                    <div>Resources</div>
                </Grid>
                <Grid item xs={2}>
                    <div>A</div>
                </Grid>
                <Grid item xs={10}>
                    <ToggleButtonGroup
                        color="primary"
                        value={PriorityA}
                        exclusive
                        onChange={handleChangePriority}
                        aria-label="Platform"
                        >
                        <ToggleButton style={{'width':'140px'}} data-code='A' value='race'      >-</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='A' value="magic"     > Full Magician</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='A' value="attributes">30</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='A' value="skills"    >50</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='A' value="nuyen"     >1,000,000¥</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                {
                    /*  Priority B Selections    */
                }
                
               
                <Grid item xs={2}>
                    <div>B</div>
                </Grid>
                <Grid item xs={10}>
                    <ToggleButtonGroup
                            color="primary"
                            value={PriorityB}
                            exclusive
                            onChange={handleChangePriority}
                            >
                        <ToggleButton style={{'width':'140px'}} data-code='B' value='race'>-</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='B' value="magic">Adept <br></br>Aspected</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='B' value="attributes">27</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='B' value="skills">40</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='B' value="nuyen">400,000¥</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={2}>
                    <div>C</div>
                </Grid>
                <Grid item xs={10}>
                    <ToggleButtonGroup
                            color="primary"
                            value={PriorityC}
                            exclusive
                            onChange={handleChangePriority}
                            >
                        <ToggleButton style={{'width':'140px'}} data-code='C' value="race">Troll / Elf</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='C' value='magic'>-</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='C' value="attributes">24</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='C' value="skills">34</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='C' value="nuyen">90,000¥</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={2}>
                    <div>D</div>
                </Grid>
                <Grid item xs={10}>
                    <ToggleButtonGroup
                            color="primary"
                            value={PriorityD}
                            exclusive
                            onChange={handleChangePriority}
                            >
                        <ToggleButton style={{'width':'140px'}} data-code='D' value="race">Dwarf / Ork</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='D' value='magic'>-</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='D' value="attributes">21</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='D' value="skills">30</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='D' value="nuyen">20,000¥</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={2}>
                    <div>E</div>
                </Grid>
                <Grid item xs={10}>
                    <ToggleButtonGroup
                            color="primary"
                            value={PriorityE}
                            exclusive
                            onChange={handleChangePriority}
                            >
                        <ToggleButton style={{'width':'140px'}} data-code='E' value="race">Human</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='E' value='magic'>-</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='E' value="attributes">18</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='E' value="skills">27</ToggleButton>
                        <ToggleButton style={{'width':'140px'}} data-code='E' value="nuyen">5,000¥</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
            <hr></hr>
            <FormControl fullWidth>
                <InputLabel id="race-select-label">Race</InputLabel>
                <Select
                    labelId="race-select-label"
                    id="race-select"
                    value={Race}
                    label="race"
                    onChange={handleRaceChange}
                >{
                    props.currentCharacter.availableRaces.map((race) => {
                        return (<MenuItem key={race} value={race}>{race}</MenuItem>)
                    })
                }
                </Select>
            </FormControl>
        </div>
  );
}