import React, {useState} from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PriorityPanel from "./PriorityPanel";
import PointBuyPanel from "./PointBuyPanel";
import IdentityPanel from "./IdentityPanel";
import AttributesPanel from "./AttributesPanel";
import SR2SkillsPanel from "./SR2SkillsPanel";
import SR3SkillsPanel from "./SR3SkillsPanel";
import OtakuPanel from "./OtakuPanel";
import MagicPanel from "./MagicPanel";
import GearPanel from "./GearPanel";
import LoadCharacter from "./LoadCharacter";
import ChargenBox from "./ChargenBox";
import FinalizedBox from "./FinalizedBox";
import CyberwarePanel from "./CyberwarePanel";
import DeckingPanel from "./DeckingPanel";
import VehiclesPanel from "./VehiclesPanel";
import ContactsPanel from "./ContactsPanel";
import SheetDisplay from "./SheetDisplay";
import KarmaDisplay from "./KarmaDisplay";
import "./SheetDisplay.css";
import DiceRollerTray from "./DiceRollerTray";
import SignInPopup from "./SignInPopup";
import { Grid } from "@mui/material";
// import TableAttribute from "./CustomTable";
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
        <Box sx={{ paddingTop: 5 }}>
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const baseCharacter = {
    allowedBooks: ["cc", "mits", "sr2", "sr3", "mm", "mat", "r3"],
    age: 18,
    bookTogglesSR3: {
      cc: true,
      mits: true,
      sr3: true,
      mm: true,
      mat: true,
      r3: true,
    },
    bookTogglesSR2: { sr2: true },
    edition: "SR2",
    cgmethod:"priorities",
    step: "chargen",
    plevel:2,
    priorities: {
      Magic: "A",
      Attributes: "B",
      Skills: "C",
      Resources: "D",
      Race: "E",
    },
    maxSkillPoints: 34,
    maxAttributePoints: 27,
    pointbuySkillPoints:1,
    pointbuyAttributePoints:1,
    pointbuyExtraForce:0,
    pointsRemaining:0,
    name: "",
    street_name: "New Runner",
    availableRaces: ["Human"],
    availableMagics: ["Full Magician"],
    magicalChoice: "None",
    maxSpellPoints: 25,
    race: "Human",
    bodyIndex: 2,
    magicalAttributeBonuses: {
      Body: 0,
      Quickness: 0,
      Strength: 0,
      Charisma: 0,
      Willpower: 0,
      Intelligence: 0,
      Reaction: 0,
      Initative: 0,
      Impact: 0,
      Ballastic: 0,
    },
    cyberAttributeBonuses: {
      Body: 0,
      Quickness: 0,
      Strength: 0,
      Charisma: 0,
      Willpower: 0,
      Intelligence: 0,
      Reaction: 0,
      Initative: 0,
      Impact: 0,
      Ballastic: 0,
    },
    raceBonuses: {
      Body: 0,
      Quickness: 0,
      Strength: 0,
      Charisma: 0,
      Willpower: 0,
      Intelligence: 0,
    },
    attributes: {
      Body: 1,
      Quickness: 1,
      Strength: 1,
      Charisma: 1,
      Willpower: 1,
      Intelligence: 1,
      Essence: 6,
      Initative: 1,
      Magic: 6,
    },
    characterTabs: {
      Magic: false,
      Decking: false,
      Otaku: false,
      Rigger: false,
    },
    inventory: [],
    weapons: [],
    vehicles: [],
    drones: [],
    contacts: [
      {
        Name: "Contact 1",
        Type: "free",
        Archtype: "Fixer",
        Level: 1,
        GeneralInfo: "Helps with gear",
      },
      {
        Name: "Contact 2",
        Type: "free",
        Archtype: "Street Shaman",
        Level: 1,
        GeneralInfo: "Provides magical advice",
      },
    ],
    mods: [],
    decks: [],
    selectedDeckIndex: false,
    cyberware: [],
    bioware: [],
    skills: [],
    gear: [],
    isOtaku: false,
    isGhoul: false,
    isMetaVariant: false,
    metaVariantType:'',
    otakuPath:"Technoshaman",
    complexForms:[],
    karma: 0,
    karmaPool: 1,
    karmaSpent: 0,
    magical: true,
    initation: false,
    submerison: false,
    magicalTradition: false,
    magicalTotem: false,
    moreMetahumansOption:false,
    foci: [],
    spells: [],
    powers: [],
    chargenCash: 5000,
    cashSpent: 0,
    cash: 0,
    log: [],
    description: "",
    notes: "",
  };
  const [Edition, setEdition] = React.useState("SR2");
  const [CGMethod, setCGMethod] = React.useState('priorities');
  const [value, setValue] = React.useState(0);
  const [Character, setCharacter] = React.useState(baseCharacter);
  const [selectedRace, setSelectedRace] = React.useState("Human");
  const [NuyenSpent, setNuyenSpent] = React.useState(0.0);
  const ProgramCosts = {
    1: 100,
    2: 100,
    3: 100,
    4: 200,
    5: 200,
    6: 200,
    7: 500,
    8: 500,
    9: 500,
    10: 1000,
    11: 1000,
    12: 1000,
  };

  const [user, setUser] = useState(null);
  const handleSignIn = (user) => {
    setUser(user);
    // Handle character save/load here
  };

  const handleChangePriorityRace = (event) => {
    const newRace = event.target.value;
    setSelectedRace(newRace);
    setCharacter((prevCharacter) => ({ ...prevCharacter, race: newRace }));
  };

  const handleChangePriorities = (newPriorities) => {
    // Update the Character state with the selected priorities
    if (newPriorities.Magic === "A" || newPriorities.Magic === "B") {
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        magical: true,
        attributes: { ...prevCharacter.attributes, Magic: 6 },
        priorities: { ...newPriorities },
      }));
    } else {
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        magical: false,
        attributes: { ...prevCharacter.attributes, Magic: 0 },
        priorities: { ...newPriorities },
      }));
    }
  };

  const handleChangePowerLevel = (powerLevel) => {
    setCharacter((prevCharacter) => ({
        ...prevCharacter,
        plevel: powerLevel,
      }));
  }

  React.useEffect(() => {
    let tempCashSpent = 0;

    Character.cyberware.forEach(function (cyber) {
      tempCashSpent += parseFloat(cyber.Cost);
    });

    Character.bioware.forEach(function (bio) {
      tempCashSpent += parseFloat(bio.Cost);
    });

    Character.gear.forEach(function (gear) {
      let amount = gear.Amount ?? 1;
      tempCashSpent += parseFloat(gear.Cost * amount);
    });

    Character.decks.forEach(function (deck) {
      tempCashSpent += parseFloat(deck.Cost);
      deck.ProgramsInStorage.forEach(function (program) {
        tempCashSpent +=
          program.Rating *
          program.Rating *
          program.Multiplyer *
          ProgramCosts[program.Rating];
      });
    });

    Character.vehicles.forEach(function (vehicle) {
      tempCashSpent += parseFloat(vehicle["$Cost"]);
      if (vehicle.hasOwnProperty("options")) {
        vehicle.options.forEach(function (option) {
          tempCashSpent += parseInt(option["$Cost"]);
        });
      }
    });

    Character.drones.forEach(function (drone) {
      tempCashSpent += parseFloat(drone["$Cost"]);
      if (drone.hasOwnProperty("options")) {
        drone.options.forEach(function (option) {
          tempCashSpent += parseInt(option["$Cost"]);
        });
      }
    });

    Character.foci.forEach(function (foci) {
      tempCashSpent += parseFloat(foci.Cost);
    });

    Character.contacts.forEach(function (contact) {
      if (Edition === "SR3") {
        switch (contact.Level) {
          case 1:
            if (contact.Type === "free") {
              tempCashSpent += 0;
            } else {
              tempCashSpent += 5000;
            }
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
      } else if (Edition === "SR2") {
        if (contact.Type !== "free") {
          switch (contact.Level) {
            case 1:
              if (contact.Type !== "free") {
                tempCashSpent += 5000;
              } else {
                tempCashSpent += 0;
              }
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
    console.log("Edition: " + Edition);
    console.log("CGMethod: "  + CGMethod);
    console.log(Character);
    setNuyenSpent(tempCashSpent);
  }, [Character]);

  const handleChangeEdition = (edition) => {
    setEdition(edition);
     setCharacter((prevCharacter) => ({ ...prevCharacter, Edition:edition }));
  };
  
  const handleChangeCGMethod = (method) => {
    setCGMethod(method);
    setCharacter((prevCharacter) => ({ ...prevCharacter, cgmethod:method }));
  }

  const handleChangeMoreMetahumansOption = (options) => {
    setCharacter((prevCharacter) => ({ ...prevCharacter, moreMetahumansOption:!prevCharacter.moreMetahumansOption }));
  };

  const handleChangeIsOtakuOption = (isOtaku) => {
    setCharacter((prevCharacter) => ({ ...prevCharacter, isOtaku:isOtaku }));
  };

  const onChangeOtakuPath = (otakuPath) => {
    setCharacter((prevCharacter) => ({ ...prevCharacter, otakuPath:otakuPath }));
  };

  const handleChangeIsGhoulOption = (isGhoul) => {
    setCharacter((prevCharacter) => ({ ...prevCharacter, isGhoul:isGhoul }));
  };

  const handleChangeIsMetavariantOption = (isMetaVariant) => {
    setCharacter((prevCharacter) => ({ ...prevCharacter, isMetaVariant:isMetaVariant }));
  };

   const onChangeMetaVariantType = (metaVariantType) => {
    setCharacter((prevCharacter) => ({ ...prevCharacter, metaVariantType:metaVariantType }));
  };

  const onChangePointbuySkillPoints = (pointbuySkillPoints) => {
    setCharacter((prevCharacter) => ({ ...prevCharacter, pointbuySkillPoints:pointbuySkillPoints }));
  }

  const onChangePointbuyAttributePoints = (pointbuyAttributePoints) => {
    setCharacter((prevCharacter) => ({ ...prevCharacter, pointbuyAttributePoints:pointbuyAttributePoints }));
  }

  const onChangePointbuyExtraForce = (pointbuyExtraForce) => {
    setCharacter((prevCharacter) => ({ ...prevCharacter, pointbuyExtraForce:pointbuyExtraForce }));
  }

  const handleChangeCharacterTabs = (tabs) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      characterTabs: tabs,
    }));
  };

  const handleChangeAllowedBooks = (books) => {
    if (Edition === "SR3") {
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        allowedBooks: Object.keys(books),
        bookTogglesSR3: books,
      }));
    } else if (Edition === "SR2") {
      setCharacter((prevCharacter) => ({
        ...prevCharacter,
        allowedBooks: Object.keys(books),
        bookTogglesSR2: books,
      }));
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeMaxCash = (Cash) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      chargenCash: Cash,
    }));
  };

  const handleChangeMaxSpellPoints = (Points) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      maxSpellPoints: Points,
    }));
  };

  const handleChangeMaxSkills = (maxSkills) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      maxSkillPoints: maxSkills,
    }));
  };

  const handlePointsRemaining = (points) => {
     setCharacter((prevCharacter) => ({
      ...prevCharacter,
      pointsRemaining: points,
    }));
  }

  const handleChangeMaxAttributes = (maxAttributes) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      maxAttributePoints: maxAttributes,
    }));
  };

  const handleChangeMagicChoices = (magicChoices) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      availableMagics: magicChoices,
    }));
  };

  const handleChangeAvailabileRaces = (raceChoices) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      availableRaces: raceChoices,
    }));
  };

  const handleRaceChange = (race) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      race: race,
    }));
  };

  const handleChangeMagic = (newMagicChoice) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      magicalChoice: newMagicChoice,
    }));
  };

  const handleChangeRaceBonuses = (bonuses) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      raceBonuses: bonuses,
    }));
  };

  const handleSkillsUpdate = (updatedSkills) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      skills: updatedSkills,
    }));
  };

  const handleComplexFormUpdate = (updatedComplexForms) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      complexForms: updatedComplexForms,
    }));
  }

  const handleContactsUpdate = (updatedContacts) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      contacts: updatedContacts,
    }));
  };

  const handleAttributesChange = (attribute, value) => {
    setCharacter((prevCharacter) => {
      prevCharacter.attributes[attribute] = parseInt(value);
      return prevCharacter;
    });
  };

  const handleEssenceChange = (value) => {
    setCharacter((prevCharacter) => {
      prevCharacter.attributes["Essence"] = parseFloat(value);
      return prevCharacter;
    });
  };

  const handleBodyIndexChange = (value) => {
    setCharacter((prevCharacter) => {
      prevCharacter.bodyIndex = parseFloat(value);
      return prevCharacter;
    });
  };

  const handleCyberAttributeUpdates = (cyberAttributeBonuses) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      cyberAttributeBonuses: cyberAttributeBonuses,
    }));
  };

  const handleMagicAttributeUpdates = (magicalAttributeBonuses) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      magicalAttributeBonuses: magicalAttributeBonuses,
    }));
  };

  const handleMagicalTraditionChange = (tradition) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      magicalTradition: tradition,
    }));
  };

  const handleMagicalTotemChange = (totem) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      magicalTotem: totem,
    }));
  };

  const SkillsPanelRender = (ed) => {
    if (ed === "SR3") {
      return (
        <SR3SkillsPanel
          currentCharacter={Character}
          characterSkills={Character.skills}
          onUpdateSkills={handleSkillsUpdate}
          activeSkillPoints={Character.maxSkillPoints}
          KnowledgeSkillsMax={Character.attributes.Intelligence * 5}
          LanguageSkillsMax={Math.floor(
            Character.attributes.Intelligence * 1.5
          )}
        />
      );
    } else {
      return (
        <SR2SkillsPanel
          isOtaku={(Character.magicalChoice === 'Otaku')}
          characterSkills={Character.skills}
          onUpdateSkills={handleSkillsUpdate}
          maxSkillPoints={Character.maxSkillPoints}
        />
      );
    }
  };

  const handleLoadCharacter = (characterData) => {
    setCharacter(characterData);
  };

  const displayBox = () => {
    if (Character.step === "chargen") {
      return (
        <ChargenBox
          currentCharacter={Character}
          Edition={Edition}
          NuyenSpent={NuyenSpent}
        />
      );
    } else {
      return <FinalizedBox currentCharacter={Character} Edition={Edition} />;
    }
  };

  return (
    <div className="dashboard">
      {displayBox()}
       <Grid container spacing={2} style={{"width":"100%"}}>
        <Grid item size={{ sm: 12, md: 4}}>
          <LoadCharacter
            Character={Character}
            loadCharacter={handleLoadCharacter}
            BaseCharacter={baseCharacter}
            Edition={Edition}
            ChangeEdition={handleChangeEdition}
            CGMethod = {CGMethod}
          />
        </Grid>
        <Grid item size={{ sm: 12, md: 7}}>
          <SignInPopup
            user={user} 
            onSignIn={handleSignIn}
            setUser={setUser}
            Character={Character}
            loadCharacter={handleLoadCharacter}
            BaseCharacter={baseCharacter}
            Edition={Edition}
            ChangeEdition={handleChangeEdition}
            CGMethod = {CGMethod}
          />
        </Grid>
      </Grid>
      <DiceRollerTray showDice={value} />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab label="Identity" {...a11yProps(0)} />
            {(Character.cgmethod === 'priorities') ? 
            <Tab label="Priorities" {...a11yProps(1)} />
            :
             <Tab label="Point Buy" {...a11yProps(1)} />
            }
            <Tab label="Attributes" {...a11yProps(2)} />
            <Tab label="Skills" {...a11yProps(3)} />
            
            {(Character.isOtaku) ? 
            <Tab label="Otaku" {...a11yProps(4)} />
            :
            <Tab label="Magic" {...a11yProps(4)} /> }
            
            <Tab label="Cyberware" {...a11yProps(5)} />
            <Tab label="Gear" {...a11yProps(6)} />
            <Tab label="Decking" {...a11yProps(7)} />
            <Tab label="Vehicles" {...a11yProps(8)} />
            <Tab label="Contacts" {...a11yProps(9)} />
            <Tab label="Karma" {...a11yProps(10)} />
            <Tab label="Sheet Display" {...a11yProps(11)} />
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
            ChangeCGMethod={handleChangeCGMethod}
            Edition={Character.Edition}
            CGMethod={Character.cgmethod}
            ChangePowerLevel={handleChangePowerLevel}
          />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
           {(Character.cgmethod === 'priorities') ? 
          <PriorityPanel
            BooksFilter={Character.allowedBooks}
            ChangePriorities={handleChangePriorities}
            CharacterPriorities={Character.priorities}
            magicalChoice={Character.magicalChoice}
            moreMetahumansOption={Character.moreMetahumansOption}
            IsOtaku={Character.isOtaku}
            ChangeRace={handleRaceChange}
            ChangeMagic={handleChangeMagic}
            PowerLevel={Character.plevel}
            ChangePowerLevel={handleChangePowerLevel}
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
            ChangeMoreMetahumansOption={handleChangeMoreMetahumansOption}
            ChangeIsOtakuOption={handleChangeIsOtakuOption}
            Edition={Edition}
          /> 
          : 
          <PointBuyPanel
            BooksFilter={Character.allowedBooks}
            ChangePriorities={handleChangePriorities}
            CharacterPriorities={Character.priorities}
            magicalChoice={Character.magicalChoice}
            moreMetahumansOption={Character.moreMetahumansOption}
            IsOtaku={Character.isOtaku}
            IsGhoul={Character.isGhoul}
            IsMetaVariant={Character.isMetaVariant}
            ChangeMetaVariantType={onChangeMetaVariantType}
            metaVariantType={Character.metaVariantType}
            ChangeRace={handleRaceChange}
            ChangeMagic={handleChangeMagic}
            selectedRace={selectedRace}
            Race={Character.race}
            pointbuySkillPoints={Character.pointbuySkillPoints}
            pointbuyAttributePoints={Character.pointbuyAttributePoints}
            pointbuyExtraForce={Character.pointbuyExtraForce}
            chargenCash={Character.chargenCash}
            onChangePriorityRace={handleChangePriorityRace}
            ChangeRaceChoices={handleChangeAvailabileRaces}
            ChangeMaxAttributes={handleChangeMaxAttributes}
            ChangeMaxSkills={handleChangeMaxSkills}
            ChangeMaxCash={handleChangeMaxCash}
            ChangeMaxSpellPoints={handleChangeMaxSpellPoints}
            ChangeMagicChoices={handleChangeMagicChoices}
            ChangeRaceBonuses={handleChangeRaceBonuses}
            ChangePointBuyAttributes={onChangePointbuyAttributePoints}
            ChangePointBuySkills={onChangePointbuySkillPoints}
            ChangePointBuyExtraForce={onChangePointbuyExtraForce}
            ChangeMoreMetahumansOption={handleChangeMoreMetahumansOption}
            ChangeIsOtakuOption={handleChangeIsOtakuOption}
            ChangeIsGhoulOption={handleChangeIsGhoulOption}
            ChangeIsMetavariantOption={handleChangeIsMetavariantOption}
            ChangePointsRemaining={handlePointsRemaining}
            Edition={Edition}
          />
        }
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <AttributesPanel
            ChangeAttributes={handleAttributesChange}
            currentCharacter={Character}
            Edition={Edition}
            onChangeLog={(log) => setCharacter({ ...Character, log: log })}
            onSpendKarma={(karma) => {
              let karmaSpentToSave = (Character.karmaSpent += karma);
              setCharacter({ ...Character, karmaSpent: karmaSpentToSave });
            }}
            Log={Character.log}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          {SkillsPanelRender(Edition)}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          {(Character.isOtaku) ? 
          <OtakuPanel
            Edition={Edition}
            currentCharacter={Character}
            complexForms={Character.complexForms}
            onChangeComplexForm={handleComplexFormUpdate}
            onChangeOtakuPath={onChangeOtakuPath}
          /> 
          : 
          <MagicPanel
            spells={Character.spells}
            powers={Character.powers}
            foci={Character.foci}
            onChangePowers={(powers) => setCharacter({ ...Character, powers })}
            onChangeSpells={(spells) => setCharacter({ ...Character, spells })}
            onChangeFoci={(foci) => setCharacter({ ...Character, foci: foci })}
            magicalTraditions={Character.availableMagics}
            chosenTradition={Character.magicalTradition}
            magicalTotem={Character.magicalTotem}
            onChangeMagicalTradition={handleMagicalTraditionChange}
            onChangeMagicalTotem={handleMagicalTotemChange}
            magicalChoice={Character.magicalChoice}
            BooksFilter={Character.allowedBooks}
            Edition={Edition}
            maxSpellPoints={Character.maxSpellPoints}
            onChangeMagicalAttributes={handleMagicAttributeUpdates}
          />
        }
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <CyberwarePanel
            CashOnHand={Character.chargenCash}
            Cyberware={Character.cyberware}
            Bioware={Character.bioware}
            Edition={Edition}
            Essence={Character.attributes.Essence}
            onChangeCash={(cash) => setCharacter({ ...Character, cash: cash })}
            onChangeCyberware={(cyberware) =>
              setCharacter({ ...Character, cyberware: cyberware })
            }
            onChangeBioware={(bioware) =>
              setCharacter({ ...Character, bioware: bioware })
            }
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
            onChangeCash={(cash) => setCharacter({ ...Character, cash: cash })}
            onChangeGear={(gear) => setCharacter({ ...Character, gear: gear })}
            BooksFilter={Character.allowedBooks}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={7}>
          <DeckingPanel
            Decks={Character.decks}
            onChangeCash={(cash) => setCharacter({ ...Character, cash: cash })}
            onChangeDeck={(decks) =>
              setCharacter({ ...Character, decks: decks })
            }
            Edition={Edition}
            BooksFilter={Character.allowedBooks}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={8}>
          <VehiclesPanel
            Vehicles={Character.vehicles}
            Drones={Character.drones}
            Edition={Edition}
            CashOnHand={Character.chargenCash}
            onChangeCash={(cash) => setCharacter({ ...Character, cash: cash })}
            onChangeVehicle={(vehicles) =>
              setCharacter({ ...Character, vehicles: vehicles })
            }
            onChangeDrones={(drones) =>
              setCharacter({ ...Character, drones: drones })
            }
            BooksFilter={Character.allowedBooks}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={9}>
          <ContactsPanel
            onChangeCash={(cash) => setCharacter({ ...Character, cash: cash })}
            updateContacts={handleContactsUpdate}
            Contacts={Character.contacts}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={10}>
          <KarmaDisplay
            onFinalization={(step) => {
              setCharacter({ ...Character, step: step });
            }}
            skills={Character.skills}
            attributes={Character.attributes}
            step={Character.step}
            race={Character.race}
            Edition={Edition}
            onChangeKarmaStuff={(cash, karma, karmaPool) =>
              setCharacter({
                ...Character,
                cash: cash,
                karma: karma,
                karmaPool: karmaPool,
              })
            }
            onChangeLog={(log) => setCharacter({ ...Character, log: log })}
            Log={Character.log}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={11}>
          <SheetDisplay
            onChangeStreetName={(name) =>
              setCharacter({ ...Character, street_name: name })
            }
            onChangeAge={(age) => setCharacter({ ...Character, age: age })}
            onChangeDescription={(description) =>
              setCharacter({ ...Character, description: description })
            }
            onChangeNotes={(notes) =>
              setCharacter({ ...Character, notes: notes })
            }
            Edition={Edition}
            currentCharacter={Character}
            onChangeDeck={(decks) =>
              setCharacter({ ...Character, decks: decks })
            }
          />
        </CustomTabPanel>
      </Box>
    </div>
  );
}
