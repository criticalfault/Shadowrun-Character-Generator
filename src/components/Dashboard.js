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
import GearPanel from './GearPanel';
import LoadCharacter from './LoadCharacter';
import ChargenBox from './ChargenBox';
import CyberwarePanel from './CyberwarePanel';
import VehiclesPanel from './VehiclesPanel';
import ContactsPanel from './ContactsPanel';
import SheetDisplay from './SheetDisplay';
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
        allowedBooks:['cc', 'mits','sr2','sr3','mm','mat','r3'],
        bookTogglesSR3:{'cc':true, 'mits':true, 'sr3':true,'mm':true,'mat':true,'r3':true},
        bookTogglesSR2:{'sr2':true},
        step:'chargen',
        priorities:{'Magic':'A','Attributes':'B','Skills':'C','Resources':'D','Race':'E'},
        maxSkillPoints: 34,
        maxAttributePoints: 27,
        name:'',
        street_name:'New Runner',
        availableRaces:['Human'],
        availableMagics:['Full Magician'],
        magicChoice:'None',
        race:'',
        bodyIndex:2,
        cyberAttributeBonuses:{'Body':0, 'Quickness':0, 'Strength':0, 'Charisma':0, 'Willpower':0, 'Intelligence':0, 'Reaction':0, 'Initative':0, 'Impact':0, 'Ballastic':0},
        raceBonuses:{'Body':0,'Quickness':0,'Strength':0,'Charisma':0,'Willpower':0,'Intelligence':0},
        attributes:{'Body':1,'Quickness':1,'Strength':1,'Charisma':1,'Willpower':1,'Intelligence':1, 'Essence':6,'Initative':1},
        characterTabs:{'Magic':false,'Decking':false,'Otaku':false,'Rigger':false},
        inventory:[],
        weapons:[],
        vehicles:[],
        contacts:[  { Name: 'Contact 1', Type:"free", Archtype: 'Fixer', Level: 1, GeneralInfo: 'Helps with gear' },
                    { Name: 'Contact 2', Type:"free", Archtype: 'Street Shaman', Level: 1, GeneralInfo: 'Provides magical advice' }],
        mods:[],
        cyberware:[],
        bioware:[],
        skills:[],
        gear:[],
        magical: false,
        magical_tradition: false,
        spells:[],
        powers:[],
        chargenCash: 20000,
        cashSpent:0,
        cash:0,
        log:[]
    }
    const [Edition, setEdition]= React.useState('SR3');
    const [value, setValue] = React.useState(0);
    const [Character, setCharacter] = React.useState(baseCharacter);
    const [selectedRace, setSelectedRace] = React.useState('Human');
    const [NuyenSpent, setNuyenSpent] = React.useState(0.00);

    const handleChangePriorityRace = (event) => {
        const newRace = event.target.value;
        setSelectedRace(newRace);
        setCharacter((prevCharacter) => ({ ...prevCharacter, race: newRace }));
    };

    const handleChangePriorities = (newPriorities) => {
        // Update the Character state with the selected priorities
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            priorities: { ...newPriorities},
        }));
    };

    React.useEffect(() => {
        let tempCashSpent = 0;

        Character.cyberware.forEach(function(cyber){
            tempCashSpent+=parseFloat(cyber.Cost);
        });
        
        Character.bioware.forEach(function(bio){
            tempCashSpent+= parseFloat(bio.Cost);
        });

        Character.gear.forEach(function(gear){
            tempCashSpent+=parseFloat(gear.Cost);
        });

        Character.vehicles.forEach(function(vehicle){
            tempCashSpent+=parseFloat(vehicle['$Cost']);
        });

        Character.contacts.forEach(function(contact){
            if(Edition === 'SR3'){
                if(contact.Type !== 'free'){
                    switch(contact.Level) {
                        case 1:
                            tempCashSpent += 5000;
                            break;
                        case 2:
                            tempCashSpent += 10000;
                            break;
                        case 3:
                            tempCashSpent += 200000;
                            break;
                        default:
                            break;
                    }
                }
            }else  if(Edition === 'SR2'){
                if(contact.Type !== 'free'){
                    switch(contact.Level) {
                        case 1:
                            tempCashSpent += 5000;
                            break;
                        case 2:
                            tempCashSpent += 10000;
                            break;
                        case 3:
                            tempCashSpent += 200000;
                            break;
                        default:
                            break;
                    }
                }
            }
        });

        console.log(Character);
        setNuyenSpent(tempCashSpent);
    },[Character])

    const handleChangeEdition =(edition) => {
        setEdition(edition);
    }

    const handleChangeCharacterTabs = (tabs) => {
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            characterTabs:tabs})
        );
    }

    const handleChangeAllowedBooks = (books) => {
        if(Edition === 'SR3'){
            setCharacter((prevCharacter) => ({
                ...prevCharacter,
                allowedBooks:Object.keys(books),
                bookTogglesSR3:books
                })
            );
        }else if(Edition === 'SR2'){
            setCharacter((prevCharacter) => ({
                ...prevCharacter,
                allowedBooks:Object.keys(books),
                bookTogglesSR2:books
                })
            );
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handleChangeMaxCash = (Cash) =>{
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            chargenCash:Cash})
        )
    }

    const handleChangeMaxSpellPoints = (Points) =>{
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            maxSpellPoints:Points})
        )
    }

    const handleChangeMaxSkills = (maxSkills) =>{
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            maxSkillPoints:maxSkills
        }))
    }

    const handleChangeMaxAttributes = (maxAttributes) =>{
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            maxAttributePoints: maxAttributes,
        }));
    }

    const handleChangeMagicChoices = (magicChoices) =>{
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            availableMagics:magicChoices})
        )
    }

    const handleChangeAvailabileRaces =(raceChoices) =>{
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
             availableRaces:raceChoices})
        )
    }

    const handleRaceChange = (race) =>{
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            race:race})
        )
    }

    const handleChangeMagic = (newMagicChoice) =>{
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
             magicChoice:newMagicChoice})
        )
    }

    const handleChangeRaceBonuses = (bonuses) =>{
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            raceBonuses:bonuses})
        )
    }

    const handleSkillsUpdate = (updatedSkills) => {
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
             skills: updatedSkills })
        )
    };

    const handleContactsUpdate = (updatedContacts) => {
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
             contacts: updatedContacts })
        )
    };

    const handleAttributesChange = (attribute,value) => {
        setCharacter((prevCharacter) =>{
            prevCharacter.attributes[attribute] = parseInt(value);
            return prevCharacter;
        })
    }

    const handleEssenceChange = (value) => {
        setCharacter((prevCharacter) =>{
            prevCharacter.attributes['Essence'] = parseFloat(value);
            return prevCharacter;
        })
    }

    const handleBodyIndexChange = (value) => {
        setCharacter((prevCharacter) =>{
            prevCharacter.bodyIndex = parseFloat(value);
            return prevCharacter;
        })
    }

    const handleCyberAttributeUpdates = (cyberAttributeBonuses) => {
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            cyberAttributeBonuses:cyberAttributeBonuses
        }));
    }

    const SkillsPanelRender = (ed) => {
        if(ed === 'SR3'){
            return ( <SR3SkillsPanel    characterSkills={Character.skills} 
                                        onUpdateSkills={handleSkillsUpdate} 
                                        activeSkillPoints={Character.maxSkillPoints} 
                                        KnowledgeSkillsMax={(Character.attributes.Intelligence*5)} 
                                        LanguageSkillsMax={(Math.floor(Character.attributes.Intelligence*1.5))} />)
        }else{
            return  (<SR2SkillsPanel    characterSkills={Character.skills} 
                                        onUpdateSkills={handleSkillsUpdate} 
                                        maxSkillPoints={Character.maxSkillPoints} />)
        }
    }

    const handleLoadCharacter = (characterData) => {
        setCharacter(characterData);
    }

  return (
    <div className='dashboard'>
        <ChargenBox
            currentCharacter={Character}
            Edition={Edition}
            NuyenSpent={NuyenSpent}
        />
        <LoadCharacter Character={Character} loadCharacter={handleLoadCharacter}/>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons={true} allowScrollButtonsMobile>
                    <Tab label="Identity"      {...a11yProps(0)} />
                    <Tab label="Priorities"    {...a11yProps(1)} />
                    <Tab label="Attributes"    {...a11yProps(2)} />
                    <Tab label="Skills"        {...a11yProps(3)} />
                    <Tab label="Magic"         {...a11yProps(4)} />
                    <Tab label="Cyberware"     {...a11yProps(5)} />
                    <Tab label="Gear"          {...a11yProps(6)} />
                    <Tab label="Decking"       {...a11yProps(7)} disabled={!Character.characterTabs.Decking} />
                    <Tab label="Vehicles"      {...a11yProps(8)} />
                    <Tab label="Contacts"      {...a11yProps(9)} />
                    <Tab label="Karma"         {...a11yProps(10)}/>
                    <Tab label="Sheet Display" {...a11yProps(11)}/>
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <IdentityPanel  
                    currentCharacter={Character}
                    characterTabs={Character.characterTabs}
                    characterBooks3={Character.bookTogglesSR3}
                    characterBooks2={Character.bookTogglesSR2}
                    ChangeCharacterTabs={handleChangeCharacterTabs}
                    ChangeAllowedBooks={handleChangeAllowedBooks}
                    ChangeEdition={handleChangeEdition} 
                    Edition={Edition}
                />
            </CustomTabPanel>
            
            <CustomTabPanel value={value} index={1}>
                <PriorityPanel
                    BooksFilter={Character.allowedBooks}
                    ChangePriorities={handleChangePriorities}
                    CharacterPriorities={Character.priorities} 
                    magicalChoice={Character.magicalChoice}
                    ChangeRace={handleRaceChange}
                    selectedRace={selectedRace}
                    Race={Character.race}
                    onChangePriorityRace={handleChangePriorityRace}
                    ChangeRaceChoices={handleChangeAvailabileRaces} 
                    ChangeMaxAttributes={handleChangeMaxAttributes}
                    ChangeMaxSkills={handleChangeMaxSkills}
                    ChangeMaxCash={handleChangeMaxCash}
                    ChangeMaxSpellPoints={handleChangeMaxSpellPoints}
                    ChangeMagicChoices={handleChangeMagicChoices}
                    ChangeRaceBonuses={handleChangeRaceBonuses}
                    ChangeMagic={handleChangeMagic}
                    Edition={Edition}
                />
            </CustomTabPanel>
            
            <CustomTabPanel value={value} index={2}>
                <AttributesPanel    
                    ChangeAttributes={handleAttributesChange} 
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
                    BooksFilter={Character.allowedBooks}
                    Edition={Edition}
                    maxSpellPoints={Character.maxSpellPoints}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
                <CyberwarePanel
                    CashOnHand={Character.chargenCash}
                    Cyberware={Character.cyberware}
                    Bioware={Character.bioware}
                    Edition={Edition}
                    Essence={Character.attributes.Essence}
                    onChangeCash={(cash) => setCharacter({ ...Character, cash:cash})}
                    onChangeCyberware={(cyberware) => setCharacter({ ...Character, cyberware:cyberware})}
                    onChangeBioware={(bioware) => setCharacter({ ...Character, bioware: bioware})}
                    onChangeEssence={handleEssenceChange}
                    onChangeBodyIndex={handleBodyIndexChange}
                    onChangeCyberAttributes={handleCyberAttributeUpdates}  
                    BooksFilter={Character.allowedBooks}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={6}>
                <GearPanel
                    Gear={Character.gear}
                    Edition={Edition}
                    onChangeCash={(cash) => setCharacter({ ...Character, cash:cash})}
                    onChangeGear={(gear) => setCharacter({ ...Character, gear:gear})}
                    BooksFilter={Character.allowedBooks}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={7}>
               {/*
                Decking
               */}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={8}>
                <VehiclesPanel
                    Vehicles={Character.vehicles}
                    Edition={Edition}
                    CashOnHand={Character.chargenCash}
                    onChangeCash={(cash) => setCharacter({ ...Character, cash:cash})}
                    onChangeVehicle={(vehicles) => setCharacter({ ...Character, vehicles:vehicles})}
                    BooksFilter={Character.allowedBooks}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={9}>
                <ContactsPanel 
                    updateContacts={handleContactsUpdate}
                    Contacts={Character.contacts}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={10}>
                 <span>Coming Soon!</span>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={11}>
                <SheetDisplay currentCharacter={Character} />
            </CustomTabPanel>
        </Box>
    </div>
  );
}