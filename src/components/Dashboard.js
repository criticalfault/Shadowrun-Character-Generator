import React, {useState} from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PriorityPanel from "./PriorityPanel";
import PointBuyPanel from "./PointBuyPanel";
import EdgesFlawsPanel from "./EdgesFlawsPanel";
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
import VehicleDesigner from "./VehicleDesigner";
import WeaponDesigner from "./WeaponDesigner";
import ContactsPanel from "./ContactsPanel";
import SheetDisplay from "./SheetDisplay";
import KarmaDisplay from "./KarmaDisplay";
import KarmaSkillAdvancement from "./KarmaSkillAdvancement";
import "./SheetDisplay.css";
import DiceRollerTray from "./DiceRollerTray";
import SignInPopup from "./SignInPopup";
import { Grid } from "@mui/material";
import { trackEditionChanged, trackTabChanged, trackCharacterFinalized } from '../analytics';
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
    allowedBooks: ["sr2"],
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
    purchasedSpellPoints: 0,
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
      VehicleDesigner: false,
      WeaponDesigner: false,
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
    agents: [],
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
    sprites:[],
    stunDamage: 0,
    physicalDamage: 0,
    karma: 0,
    karmaPool: 1,
    karmaSpent: 0,
    karmaPoolBurned: 0,
    purchasedPowerPoints: 0,
    magical: true,
    initation: false,
    submerison: false,
    submersionGrade: 0,
    submersions: [],
    otakuTribe: null,
    initiateGrade: 0,
    initiations: [],
    magicalGroup: null,
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
    edges: [],
    flaws: [],
    ally: null,
    rcd: { maxFlux: '', currentFlux: '', eccm: '', encryptionModule: '', decryptionModule: '', protocolEmulation: '', rating: '', flux: '', ivisMaster: false, fddmMaster: false, subscribedCurrent: '', maxActive: '', maxSubscribed: '', networkNotes: '', damage: {}, droneExtras: [] },
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
    tempCashSpent += (Character.purchasedSpellPoints ?? 0) * 25000;
    setNuyenSpent(tempCashSpent);
  }, [Character]);

  const handleChangeEdition = (edition) => {
    setEdition(edition);
    setCharacter((prevCharacter) => ({ ...prevCharacter, Edition:edition }));
    trackEditionChanged(edition);
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

  const tabNames = ['Identity','Priorities','Edges & Flaws','Attributes','Skills','Magic/Otaku','Cyberware','Gear','Decking','Vehicles','Contacts','Karma','Sheet','Vehicle Designer','Weapon Designer'];
  const handleChange = (event, newValue) => {
    setValue(newValue);
    trackTabChanged(tabNames[newValue] ?? `Tab ${newValue}`);
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
      purchasedSpellPoints: 0,
    }));
  };

  const handleChangePurchasedSpellPoints = (points) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      purchasedSpellPoints: points,
    }));
  };

  const handleChangePurchasedPowerPoints = (points) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      purchasedPowerPoints: points,
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
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      attributes: { ...prevCharacter.attributes, [attribute]: parseInt(value) },
    }));
  };

  const handleEssenceChange = (value) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      attributes: { ...prevCharacter.attributes, Essence: parseFloat(value) },
    }));
  };

  const handleBodyIndexChange = (value) => {
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      bodyIndex: parseFloat(value),
    }));
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
      <div className="no-print">{displayBox()}</div>
       <Grid container spacing={2} style={{"width":"100%"}} className="no-print">
        <Grid size={{ sm: 12 }}>
          <LoadCharacter
            Character={Character}
            loadCharacter={handleLoadCharacter}
            BaseCharacter={baseCharacter}
            Edition={Edition}
            ChangeEdition={handleChangeEdition}
            CGMethod = {CGMethod}
          />
          <SignInPopup className={'mr-2'}
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
      <DiceRollerTray showDice={value} className="no-print" />
      <Box sx={{ width: "100%" }} className="no-print-tabs">
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
            <Tab label="Edges &amp; Flaws" {...a11yProps(2)} />
            <Tab label="Attributes" {...a11yProps(3)} />
            <Tab label="Skills" {...a11yProps(4)} />

            {(Character.isOtaku) ?
            <Tab label="Otaku" {...a11yProps(5)} />
            :
            <Tab label="Magic" {...a11yProps(5)} /> }

            <Tab label="Cyberware" {...a11yProps(6)} />
            <Tab label="Gear" {...a11yProps(7)} />
            <Tab label="Decking" {...a11yProps(8)} />
            <Tab label="Vehicles" {...a11yProps(9)} />
            <Tab label="Contacts" {...a11yProps(10)} />
            <Tab label="Karma" {...a11yProps(11)} />
            <Tab label="Sheet Display" {...a11yProps(12)} />
            {Character.characterTabs?.VehicleDesigner && <Tab label="Vehicle Designer" value={13} {...a11yProps(13)} />}
            {Character.characterTabs?.WeaponDesigner && <Tab label="Weapon Designer" value={14} {...a11yProps(14)} />}
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
            Edition={Edition}
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
          <EdgesFlawsPanel
            edges={Character.edges ?? []}
            flaws={Character.flaws ?? []}
            cgmethod={Character.cgmethod}
            onChangeEdges={(edges) => setCharacter({ ...Character, edges })}
            onChangeFlaws={(flaws) => setCharacter({ ...Character, flaws })}
          />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={3}>
          <AttributesPanel
            ChangeAttributes={handleAttributesChange}
            currentCharacter={Character}
            Edition={Edition}
            onChangeLog={(log) => setCharacter({ ...Character, log: log })}
            onSpendKarma={(karma) => {
              setCharacter((prev) => ({ ...prev, karmaSpent: prev.karmaSpent + karma }));
            }}
            Log={Character.log}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          {SkillsPanelRender(Edition)}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          {(Character.isOtaku) ? 
          <OtakuPanel
            Edition={Edition}
            currentCharacter={Character}
            complexForms={Character.complexForms}
            sprites={Character.sprites}
            onChangeComplexForm={handleComplexFormUpdate}
            onChangeOtakuPath={onChangeOtakuPath}
            onChangeSprites={(sprites) => setCharacter({ ...Character, sprites })}
            submersionGrade={Character.submersionGrade}
            submersions={Character.submersions}
            otakuTribe={Character.otakuTribe}
            onChangeSubmersions={(submersionGrade, submersions) =>
              setCharacter({ ...Character, submersionGrade, submersions })
            }
            onChangeOtakuTribe={(otakuTribe) =>
              setCharacter({ ...Character, otakuTribe })
            }
            onSpendKarma={(karma) => {
              let karmaSpentToSave = (Character.karmaSpent += karma);
              setCharacter({ ...Character, karmaSpent: karmaSpentToSave });
            }}
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
            purchasedSpellPoints={Character.purchasedSpellPoints ?? 0}
            onChangePurchasedSpellPoints={handleChangePurchasedSpellPoints}
            onChangeMagicalAttributes={handleMagicAttributeUpdates}
            initiateGrade={Character.initiateGrade}
            initiations={Character.initiations}
            magicalGroup={Character.magicalGroup}
            onChangeInitiations={(initiateGrade, initiations) =>
              setCharacter({ ...Character, initiateGrade, initiations })
            }
            onChangeMagicalGroup={(magicalGroup) =>
              setCharacter({ ...Character, magicalGroup })
            }
            ally={Character.ally}
            onChangeAlly={(ally) => setCharacter({ ...Character, ally })}
            creatorIntelligence={Character.attributes.Intelligence}
            creatorWillpower={Character.attributes.Willpower}
            creatorSorcery={Character.skills?.find(s => s.name === 'Sorcery')?.rating ?? 0}
            step={Character.step}
            purchasedPowerPoints={Character.purchasedPowerPoints ?? 0}
            onChangePurchasedPowerPoints={handleChangePurchasedPowerPoints}
            onSpendKarma={(karma) => {
              let karmaSpentToSave = (Character.karmaSpent += karma);
              setCharacter({ ...Character, karmaSpent: karmaSpentToSave });
            }}
          />
        }
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
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
        <CustomTabPanel value={value} index={7}>
          <GearPanel
            Gear={Character.gear}
            Edition={Edition}
            onChangeCash={(cash) => setCharacter({ ...Character, cash: cash })}
            onChangeGear={(gear) => setCharacter({ ...Character, gear: gear })}
            BooksFilter={Character.allowedBooks}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={8}>
          <DeckingPanel
            Decks={Character.decks}
            Agents={Character.agents}
            onChangeCash={(cash) => setCharacter({ ...Character, cash: cash })}
            onChangeDeck={(decks) =>
              setCharacter({ ...Character, decks: decks })
            }
            onChangeAgents={(agents) =>
              setCharacter({ ...Character, agents: agents })
            }
            Edition={Edition}
            BooksFilter={Character.allowedBooks}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={9}>
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
            rcd={Character.rcd}
            onChangeRCD={(rcd) => setCharacter({ ...Character, rcd })}
            BooksFilter={Character.allowedBooks}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={10}>
          <ContactsPanel
            onChangeCash={(cash) => setCharacter({ ...Character, cash: cash })}
            updateContacts={handleContactsUpdate}
            Contacts={Character.contacts}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={11}>
          <KarmaDisplay
            onFinalization={(step) => {
              setCharacter({ ...Character, step: step });
              if (step !== 'chargen') trackCharacterFinalized(Edition, Character.race);
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
          <KarmaSkillAdvancement
            skills={Character.skills}
            spells={Character.spells}
            karmaPool={Character.karmaPool}
            karmaPoolBurned={Character.karmaPoolBurned ?? 0}
            onChangeKarmaPoolBurned={(burned) => setCharacter({ ...Character, karmaPoolBurned: burned })}
            characterAttributes={Character.attributes}
            raceBonuses={Character.raceBonuses}
            magicalChoice={Character.magicalChoice}
            magicRating={
              (parseInt(Character.attributes?.Magic) || 0) +
              (parseInt(Character.magicalAttributeBonuses?.Magic) || 0)
            }
            allowedBooks={Character.allowedBooks}
            Edition={Edition}
            karmaAvailable={Character.karma}
            step={Character.step}
            onUpdateSkills={handleSkillsUpdate}
            onChangeSpells={(spells) => setCharacter({ ...Character, spells })}
            onSpendKarma={(karma) =>
              setCharacter((prev) => ({ ...prev, karmaSpent: prev.karmaSpent + karma }))
            }
            onChangeLog={(log) => setCharacter({ ...Character, log: log })}
            Log={Character.log}
            purchasedPowerPoints={Character.purchasedPowerPoints ?? 0}
            onChangePurchasedPowerPoints={handleChangePurchasedPowerPoints}
            cyberAttributeBonuses={Character.cyberAttributeBonuses}
            magicalAttributeBonuses={Character.magicalAttributeBonuses}
            onUpdateAttributes={(attrs) => setCharacter({ ...Character, attributes: attrs })}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={12}>
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
            onChangeRCD={(rcd) => setCharacter({ ...Character, rcd })}
            onChangeConditionMonitor={({ stunDamage, physicalDamage }) =>
              setCharacter({ ...Character, stunDamage, physicalDamage })
            }
            onChangeVehicles={(vehicles) => setCharacter({ ...Character, vehicles })}
            onChangeDrones={(drones) => setCharacter({ ...Character, drones })}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={13}>
          <VehicleDesigner
            edition={Edition}
            onSave={(design) => {
              const customVehicles = [...(Character.customVehicles ?? []), design];
              setCharacter({ ...Character, customVehicles });
            }}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={14}>
          <WeaponDesigner
            edition={Edition}
            onSave={(design) => {
              const customWeapons = [...(Character.customWeapons ?? []), design];
              setCharacter({ ...Character, customWeapons });
            }}
          />
        </CustomTabPanel>
      </Box>
    </div>
  );
}
