import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PriorityPanel from './PriorityPanel';
import IdentityPanel from './IdentityPanel';
import AttributesPanel from './AttributesPanel';

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
        totalSkillPoints: 0,
        maxAttributePoints: 0,
        name:'',
        availableRaces:[],
        race:'',
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
    const SkillMax = React.useState(6);
    const AttributesMax = React.useState({'Body':6,'Quickness':6,'Strength':6,'Charisma':6,'Willpower':6,'Intelligence':6});

    React.useEffect(() => {
        console.log(Character);
    },[Character])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangePriority = (priority, newValue) => {
        setCharacter((prevCharacter) =>{
            return prevCharacter.priorities[priority] = value;
        })
    }

    const handleChangeMaxAttributes = (maxAttributes) =>{
        setCharacter((prevCharacter) =>{
            return prevCharacter.maxAttributePoints = maxAttributes;
        })
    }

    const handleChangeAvailabileRaces = (races) => {
        setCharacter((prevCharacter) =>{
            return prevCharacter.races = races;
        })
    }

    const handleSkillsChange = (skill, newValue) => {
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
                <IdentityPanel  currentCharacter={Character} 
                                Edition={Edition}/>
            </CustomTabPanel>
            
            <CustomTabPanel value={value} index={1}>
                <PriorityPanel  ChangePriority={handleChangePriority} 
                                ChangeAvailabileRaces={handleChangeAvailabileRaces} 
                                ChangeMaxAttributes={handleChangeMaxAttributes}
                                currentCharacter={Character}
                                Edition={Edition}
                                />
            </CustomTabPanel>
            
            <CustomTabPanel value={value} index={2}>
                <AttributesPanel    ChangeAttributes={handleAttributesChange} 
                                    currentCharacter={Character}
                                    Edition={Edition}/>
            </CustomTabPanel>
        </Box>
    </div>
  );
}