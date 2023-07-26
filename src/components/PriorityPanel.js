import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import { Select } from '@mui/material';

export default function PriorityPanel(props) {
    const Priorities = ['A', 'B', 'C', 'D', 'E'];
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
                    "A":[], 
                    "B":[], 
                    "C":['Troll','Elf'], 
                    "D":['Dwarf','Ork'],
                    "E":['Human'],
                },
            "magic": {
                "A":["Full Magician"],
                "B":['Physical Adept',"Aspected"],
                "C":[],
                "D":[],
                "E":[]
            },
            "attributes":   {"A":30,     "B":27,    "C":24,   "D":21,   "E":18},
            "skills":       {"A":50,     "B":40,    "C":34,   "D":30,   "E":27},
            "resources":    {
                                "A":{"nuyen":1000000, "spell_points":50},
                                "B":{"nuyen":400000, "spell_points":35},
                                "C":{"nuyen":90000, "spell_points":25},
                                "D":{"nuyen":20000, "spell_points":15},
                                "E":{"nuyen":5000, "spell_points":5} 
                            }
                            
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
                "B":['Metahuman Full Magician','Human Physical Adept',"Human Shamanist","Human Sorcerer"],
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
    const [AvailableRaces, setAvailableRaces] = React.useState(['Human']);
    const [PriorityRace, setPriorityRace] = React.useState('E');
    const [PriorityAttributes, setPriorityAttributes] = React.useState('D');
    const [PriorityMagic, setPriorityMagic] = React.useState('C');
    const [PrioritySkills, setPrioritySkills] = React.useState('B');
    const [PriorityResources, setPriorityResources] = React.useState('A');
    
    const handleRaceChange = (race) => {
        setRace(race.target.value);
        props.ChangeRace(race.target.value);
        props.ChangeRaceBonuses(prorityChart[props.Edition].raceBonuses[race.target.value]);
    }

    const handleChangePriorityRace = (event) => {
        const newPriorityRace = event.target.value;
        setPriorityRace(newPriorityRace);
        setAvailableRaces(prorityChart[props.Edition].race[newPriorityRace]);
        props.ChangeRaceChoices(prorityChart[props.Edition].race[newPriorityRace]);
      };
    
      const handleChangePriorityMagic = (event) => {
        const newPriorityMagic = event.target.value;
        setPriorityMagic(newPriorityMagic);
        props.ChangeMagicChoices(prorityChart[props.Edition].magic[newPriorityMagic]);
      };
    
      const handleChangePriorityAttributes = (event) => {
        const newPriorityAttributes = event.target.value;
        setPriorityAttributes(newPriorityAttributes);
        props.ChangeMaxAttributes(prorityChart[props.Edition].attributes[newPriorityAttributes]);
      };
    
      const handleChangePrioritySkills = (event) => {
        const newPrioritySkills = event.target.value;
        setPrioritySkills(newPrioritySkills);
        props.ChangeMaxSkills(prorityChart[props.Edition].skills[newPrioritySkills]);
      };
    
      const handleChangePriorityResources = (event) => {
        const newPriorityResources = event.target.value;
        setPriorityResources(newPriorityResources);
        props.ChangeMaxCash(prorityChart[props.Edition].resources[newPriorityResources].nuyen);
      };


    const TableRender = function (edition){
        return (
            <table className="">
                <thead>
                    <tr>
                        <th>Priority</th>
                        <th>Race</th>
                        <th>Magic</th>
                        <th>Attributes</th>
                        <th>Skills</th>
                        <th>Resources</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Priorities.map((letter)=>{
                            return (
                                <tr key={letter}>
                                    <td>{letter}</td>
                                    <td><label><Radio
                                        checked={PriorityRace === letter}
                                        onChange={handleChangePriorityRace}
                                        value={letter}
                                        name="race-buttons"
                                        inputProps={{ 'aria-label': letter }}
                                        />{prorityChart[props.Edition]['race'][letter]}</label>
                                        </td>
                                    <td><label><Radio
                                        checked={PriorityMagic === letter}
                                        onChange={handleChangePriorityMagic}
                                        value={letter}
                                        name="magic-buttons"
                                        inputProps={{ 'aria-label': letter }}
                                        />{prorityChart[props.Edition]['magic'][letter]}</label></td>
                                    <td><label><Radio
                                        checked={PriorityAttributes === letter}
                                        onChange={handleChangePriorityAttributes}
                                        value={letter}
                                        name="attributes-buttons"
                                        inputProps={{ 'aria-label': letter }}
                                        />{prorityChart[props.Edition]['attributes'][letter]}</label></td>
                                    <td><label><Radio
                                        checked={PrioritySkills === letter}
                                        onChange={handleChangePrioritySkills}
                                        value={letter}
                                        name="skills-buttons"
                                        inputProps={{ 'aria-label': letter }}
                                        />{prorityChart[props.Edition]['skills'][letter]}</label></td>
                                    <td><label><Radio
                                        checked={PriorityResources === letter}
                                        onChange={handleChangePriorityResources}
                                        value={letter}
                                        name="resources-buttons"
                                        inputProps={{ 'aria-label': letter }}
                                        />{prorityChart[props.Edition]['resources'][letter]['nuyen']}</label></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
    return (
        <div>
            <h2>MASTER CHARACTER CREATION TABLE</h2>
            { TableRender()}
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
                    AvailableRaces.map((race) => {
                        return (<MenuItem key={race} value={race}>{race}</MenuItem>)
                    })
                }
                </Select>
            </FormControl>
        </div>
  );
}