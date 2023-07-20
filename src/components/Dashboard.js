import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PriorityPanel from './PriorityPanel';
import IdentityPanel from './IdentityPanel';
import AttributesPanel from './AttributesPanel';
import { render } from '@testing-library/react';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
    const baseCharacter = {
        step:'chargen',
        priorities:[],
        maxSkillPoints: 0,
        maxAttributePoints: 0,
        name:'',
        street_name:'',
        availableRaces:['Human'],
        availableMagics:[],
        race:'',
        cyberAttributeBonuses:{'Body':0,'Quickness':0,'Strength':0,'Charisma':0,'Willpower':0,'Intelligence':0},
        raceBonuses:{'Body':0,'Quickness':0,'Strength':0,'Charisma':0,'Willpower':0,'Intelligence':0},
        attributes:{'Body':1,'Quickness':1,'Strength':1,'Charisma':1,'Willpower':1,'Intelligence':1},
        skills:{},
        gear:[],
        magical: false,
        magical_tradition: false,
        spells:[],
        maxCash: 5000,
        cash:0
    }
    const [Edition, setEdition]= React.useState('SR3');
    const [value, setValue] = React.useState(0);
    const [Character, setCharacter] = React.useState(baseCharacter);

    React.useEffect(() => {
        console.log(Character);
    },[Character])

    const handleChangeEdition =(edition) => {
        setEdition(edition);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleChangePriority = (priority) => {
        setCharacter({...Character,priorities:priority})
    }

    const handleChangeMaxCash = (Cash) =>{
        setCharacter({...Character,maxCash:Cash})
    }

    const handleChangeMaxSkills = (maxSkills) =>{
        setCharacter({...Character,maxSkillPoints:maxSkills})
    }

    const handleChangeMaxAttributes = (maxAttributes) =>{
        setCharacter({...Character,maxAttributePoints:maxAttributes})
    }

    const handleChangeMagicChoices = (magicChoices) =>{
        setCharacter({...Character,availableMagics:magicChoices})
    }

    const handleChangeAvailabileRaces =(raceChoices) =>{
        console.log(raceChoices);
        setCharacter({...Character,availableRaces:raceChoices})
    }

    const handleRaceChange = (race) =>{
        setCharacter({...Character,race:race})
    }

    const handleChangeRaceBonuses = (bonuses) =>{
        setCharacter({...Character,raceBonuses:bonuses})
    }

    const handleSkillsChange = (skill) => {
        setCharacter((prevCharacter) =>{
            return prevCharacter.skills[skill] = parseInt(value);
        })
    }

    const handleAttributesChange = (attribute,value) => {
        setCharacter((prevCharacter) =>{
            prevCharacter.attributes[attribute] = parseInt(value);
            return prevCharacter;
        })
    }

  return (
    <div className='dashboard'>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Identity" {...a11yProps(0)} />
                    <Tab label="Priorities" {...a11yProps(1)} />
                    <Tab label="Attributes" {...a11yProps(2)} />
                    <Tab label="Skills" {...a11yProps(3)} />
                    <Tab label="Magic" {...a11yProps(4)} />
                    <Tab label="Gear" {...a11yProps(5)} />
                    <Tab label="Karma" {...a11yProps(6)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <IdentityPanel  
                    currentCharacter={Character}
                    ChangeEdition={handleChangeEdition} 
                    Edition={Edition}
                />
            </CustomTabPanel>
            
            <CustomTabPanel value={value} index={1}>
                <PriorityPanel  ChangePriority={handleChangePriority} 
                                ChangeRaceChoices={handleChangeAvailabileRaces} 
                                ChangeMaxAttributes={handleChangeMaxAttributes}
                                ChangeMaxSkills={handleChangeMaxSkills}
                                ChangeMaxCash={handleChangeMaxCash}
                                ChangeMagicChoices={handleChangeMagicChoices}
                                ChangeRace={handleRaceChange}
                                ChangeRaceBonuses={handleChangeRaceBonuses}
                                currentCharacter={Character}
                                Edition={Edition}
                                />
            </CustomTabPanel>
            
            <CustomTabPanel value={value} index={2}>
                <AttributesPanel    ChangeAttributes={handleAttributesChange} 
                                    currentCharacter={Character}
                                    Edition={Edition}
                />
            </CustomTabPanel>
        </Box>
    </div>
  );
}