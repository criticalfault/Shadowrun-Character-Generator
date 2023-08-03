import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PriorityPanel from './PriorityPanel';
import IdentityPanel from './IdentityPanel';
import AttributesPanel from './AttributesPanel';
import SR2SkillsPanel from './SR2SkillsPanel';
import SR3SkillsPanel from './SR3SkillsPanel';
import MagicPanel from './MagicPanel';
import { Button } from '@mui/material';
import LoadCharacter from './LoadCharacter';
import Modal from '@mui/material/Modal';
//import Stepper from './Stepper';
import CyberwarePanel from './CyberwarePanel';
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
        priorities:{'Race':'E','Magic':'A','Attributes':'B','Skills':'C','Resources':'D'},
        maxSkillPoints: 34,
        maxAttributePoints: 27,
        name:'',
        street_name:'',
        availableRaces:['Human'],
        availableMagics:['Full Magician'],
        magicChoice:'None',
        race:'',
        cyberAttributeBonuses:{'Body':0,'Quickness':0,'Strength':0,'Charisma':0,'Willpower':0,'Intelligence':0},
        raceBonuses:{'Body':0,'Quickness':0,'Strength':0,'Charisma':0,'Willpower':0,'Intelligence':0},
        attributes:{'Body':1,'Quickness':1,'Strength':1,'Charisma':1,'Willpower':1,'Intelligence':1, 'Essence':6},
        characterTabs:{'Magic':false,'Decking':false,'Otaku':false,'Rigger':false},
        mods:[],
        cyberware:[],
        bioware:[],
        skills:[],
        gear:[],
        magical: false,
        magical_tradition: false,
        spells:[],
        powers:[],
        maxCash: 5000,
        cash:0
    }
    const [Edition, setEdition]= React.useState('SR3');
    const [value, setValue] = React.useState(0);
    const [Character, setCharacter] = React.useState(baseCharacter);
    const [selectedRace, setSelectedRace] = React.useState('Human');
    const [selectedPriority, setSelectedPriority] = React.useState({
      race: 'B',
      magic: 'C',
      attributes: 'D',
      skills: 'A',
      resources: 'E',
    });

    const handleChangePriorityRace = (event) => {
        const newRace = event.target.value;
        setSelectedRace(newRace);
        setCharacter((prevCharacter) => ({ ...prevCharacter, race: newRace }));
    };

    const handleChangePriority = (letter, newPriority) => {
        // setSelectedPriority((prevPriority) => ({
        //     ...prevPriority,
        //     [newPriority]: letter,
        // }));
        // Update the Character state with the selected priorities
        console.log(`${newPriority} -> ${letter}`);
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            priorities: { ...prevCharacter.priorities, [newPriority]: letter },
        }));
    };

    React.useEffect(() => {
        console.log(Character);
    },[Character])

    const handleChangeEdition =(edition) => {
        setEdition(edition);
    }

    const handleChangeCharacterTabs = (tabs) => {
        setCharacter({...Character,characterTabs:tabs});
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
        setCharacter({...Character,availableRaces:raceChoices})
    }

    const handleRaceChange = (race) =>{
        setCharacter({...Character,race:race})
    }

    const handleChangeMagic = (magicChoice) =>{
        setCharacter({...Character,magicChoice:magicChoice})
    }

    const handleChangeRaceBonuses = (bonuses) =>{
        setCharacter({...Character,raceBonuses:bonuses})
    }

    const handleSkillsUpdate = (updatedSkills) => {
        setCharacter({ ...Character, skills: updatedSkills });
    };

    const handleAttributesChange = (attribute,value) => {
        setCharacter((prevCharacter) =>{
            prevCharacter.attributes[attribute] = parseInt(value);
            return prevCharacter;
        })
    }

    const handleEssenceChange = (value) => {
        setCharacter((prevCharacter) =>{
            prevCharacter.attributes.Essence = parseInt(value);
            return prevCharacter;
        })
    }

    const SkillsPanelRender = (ed) => {
        if(ed === 'SR3'){
            return ( <SR3SkillsPanel characterSkills={Character.skills} onUpdateSkills={handleSkillsUpdate} activeSkillPoints={Character.maxSkillPoints} KnowledgeSkillsMax={(Character.attributes.Intelligence*5)} LanguageSkillsMax={(Math.floor(Character.attributes.Intelligence*1.5))} />)
        }else{
            return  (<SR2SkillsPanel characterSkills={Character.skills} onUpdateSkills={handleSkillsUpdate} maxSkillPoints={Character.maxSkillPoints} KnowledgeSkillsMax={(Character.attributes.Intelligence*5)} LanguageSkillsMax={(Math.floor(Character.attributes.Intelligence*1.5))} />)
        }
    }

    

    const handleLoadCharacter = (characterData) => {
        setCharacter(characterData);
    }


  return (
    <div className='dashboard'>
        <LoadCharacter Character={Character} loadCharacter={handleLoadCharacter}/>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons={true} allowScrollButtonsMobile>
                    <Tab label="Identity"   {...a11yProps(0)} />
                    <Tab label="Priorities" {...a11yProps(1)} />
                    <Tab label="Attributes" {...a11yProps(2)} />
                    <Tab label="Skills"     {...a11yProps(3)} />
                    <Tab label="Magic"      {...a11yProps(4)} disabled={!Character.characterTabs.Magic} />
                    <Tab label="Cyberware"  {...a11yProps(5)} />
                    <Tab label="Gear"       {...a11yProps(6)} />
                    <Tab label="Decking"    {...a11yProps(7)} disabled={!Character.characterTabs.Decking} />
                    <Tab label="Vehicles"   {...a11yProps(8)} disabled={!Character.characterTabs.Rigger} />
                    <Tab label="Karma"      {...a11yProps(9)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <IdentityPanel  
                    currentCharacter={Character}
                    characterTabs={Character.characterTabs}
                    ChangeCharacterTabs={handleChangeCharacterTabs}
                    ChangeEdition={handleChangeEdition} 
                    Edition={Edition}
                />
            </CustomTabPanel>
            
            <CustomTabPanel value={value} index={1}>
                <PriorityPanel  
                            ChangePriority={handleChangePriority}
                            CharacterPriorities={Character.priorities} 
                            magicalChoice={Character.magicalChoice}
                            ChangeRace={handleRaceChange}
                            selectedRace={selectedRace}
                            selectedPriority={selectedPriority}
                            onChangePriorityRace={handleChangePriorityRace}
                            onChangePriority={handleChangePriority}
                            ChangeRaceChoices={handleChangeAvailabileRaces} 
                            ChangeMaxAttributes={handleChangeMaxAttributes}
                            ChangeMaxSkills={handleChangeMaxSkills}
                            ChangeMaxCash={handleChangeMaxCash}
                            ChangeMagicChoices={handleChangeMagicChoices}
                            ChangeRaceBonuses={handleChangeRaceBonuses}
                            ChangeMagic={handleChangeMagic}
                            Edition={Edition}
                        />
            </CustomTabPanel>
            
            <CustomTabPanel value={value} index={2}>
                <AttributesPanel    ChangeAttributes={handleAttributesChange} 
                                    currentCharacter={Character}
                                    Edition={Edition}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                {SkillsPanelRender(Edition)}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                <MagicPanel 
                    spells={Character.spells}
                    powers={Character.powers}
                    onChangePowers={(powers) => setCharacter({ ...Character, powers})}
                    onChangeSpells={(spells) => setCharacter({ ...Character, spells })} 
                    magicalTraditions={Character.availableMagics}
                    magicalChoice={Character.magicChoice}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
                    <CyberwarePanel
                        Cyberware={Character.cyberware}
                        Bioware={Character.bioware}
                        Essence={Character.attributes.Essence}
                        onChangeCash={(cash) => setCharacter({ ...Character, cash:cash})}
                        onChangeCyberware={(cyberware) => setCharacter({ ...Character, cyberware:cyberware})}
                        onChangeBioware={(bioware) => setCharacter({ ...Character, bioware: bioware})}
                        onChangeEssence={handleAttributesChange}
                    />
            </CustomTabPanel>

            
        </Box>
    </div>
  );
}