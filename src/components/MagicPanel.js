import React, { useState } from "react";
import { MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function MagicPanel(props) {
  const spellsData = require("../data/" + props.Edition + "/Spells.json");
  const AdeptPowers = require("../data/" + props.Edition + "/AdeptPowers.json");
  const Totems = require("../data/" + props.Edition + "/Totems.json");

  const AdeptPaths = {
    None: {
      name: "None",
      description: "Please select a Tradition",
      conjures: "none",
      totemList: "none",
    },
    "Athelete's Way": {
      name: "Athelete's Way",
      description: "Some adepts channel their abilities into excellence in athletics. Devoted to their chosen sport, they are driven to excel just as were champion athletes of the past, except their dedication is backed by the power of their magic.",
      conjures: "none",
      totemList: "none",
    },
    "Artist's Way": {
      name: "Artist's Way",
      description: "These adepts have the intense focus their art gives them. They never lack for a means to center themselves on their way because the performance of their art provides them with a Centering Skill to use as an initiate.",
      conjures: "none",
      totemList: "none",
    },
    "Warriors's Way": {
      name: "Warriors's Way",
      description: "The warrior's way is the image that comes to mind when most people think of adepts. Warrior adepts range from masters of the martial arts to swordsmen, from Zen archers to those who have an uncanny facility for modern firearms.",
      conjures: "none",
      totemList: "none",
    },
    "Invisible Way": {
      name: "Invisible Way",
      description: "Adepts of the invisible way are masters of stealth. Some can walk through a crowd without being seen or stalk across snow or sand and leave no trace of their passing. They often make their way into otherwise secure places; most are able climbers and athletes as well as being skilled in deception and sleight of hand.",
      conjures: "none",
      totemList: "none",
    },
    "Spirit Way": {
      name: "Spirit Way",
      description: "Followers of the spirit way often become specialists in dealing with the inhabitants of astral space. They find work as ghost hunters, aura readers and magical bodyguards able to detect astral threats to their clients.",
      conjures: "none",
      totemList: "none",
    },
    "Totem Way": {
      name: "Totem Way",
      description: "Followers of the totem way may choose an astral quest as an ordeal for initiation (see Initiation MiTs, p. 57). Though an adept does not possess the ability to astrally project or travel to the metaplanes, the totem opens the way for the adept for the duration of the ordeal and guides the adept safely back when it is finished. The adept cannot travel to the metaplanes except to perform the astral quest ordeal.",
      conjures: "none",
      totemList: "none",
    },
    "Magician's Way": {
      name: "Magician's Way",
      description: "THIS IS STILL PENDING",
      conjures: "none",
      totemList: "none",
    },
};
  const [openModal, setOpenModal] = React.useState(false);
  const [modalExtra, setModalExtra] = React.useState("");
  const [modalExtraIndex, setModalExtraIndex] = React.useState(0);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const MetaMagic = {
    SR2: [
      { Name: "Centering" },
      { Name: "Dispelling" },
      { Name: "Shielding" },
      { Name: "Masking" },
      { Name: "Quickening" },
      { Name: "Anchoring" },
    ],
    SR3: [
      { Name: "Anchoring" },
      { Name: "Centering" },
      { Name: "Cleansing" },
      { Name: "Divining" },
      { Name: "Invoking" },
      { Name: "Masking" },
      { Name: "Possessing" },
      { Name: "Quickening" },
      { Name: "Reflecting" },
      { Name: "Shielding" },
    ],
  };

  const CalcTotalSpellRatings = (spellList, fociList) => {
    let totalRatings = 0;
    spellList.forEach(function (spell) {
      totalRatings += spell.Rating;
    });
    fociList.forEach(function (foci) {
      if (foci.Bound === "Yes") {
        totalRatings += foci.KarmaCost;
      }
    });

    return totalRatings;
  };

  const CalcTotalPowerRatings = (powerList) => {
    let totalCost = 0;
    powerList.forEach(function (power) {
      if (power.HasLevels) {
        totalCost += parseFloat(power.Cost) * power.Rating;
      } else {
        totalCost += parseFloat(power.Cost);
      }
    });
    return totalCost;
  };

  const AspectedTraditions = {
    None: {
      name: "None",
      description: "Please select a Tradition",
      conjures: "none",
      totemList: "none",
    },
    Shamanist: {
      name:"Shamanist",
      description:
        "Must be a shaman. Can only cast spells and summon spirits for which they receive a totem advantage.",
      conjures: "Spirits",
      totemList: "TOTEMS",
    },
    Conjurer: {
      name:"Conjurer",
      description: "Cannot use Sorcery only Conjuring skills.",
      conjures: "Spirits or Elementals",
      totemList: "none",
    },
    Elementalist: {
      name:"Elementalist",
      description:
        "Must be a mage. Can only cast spells and summon spirits related in one hemetic element (fire, water, air, or earth).  Must subtract one die from thier skill for spells or spirits of their opposing element.",
      conjures: "Elementals",
      totemList: "none",
    },
    Sorcerer: {
      name:"Sorcerer",
      description: "Can only use the Sorcery skill but cannot use Conjuring.",
      conjures: "none",
      totemList: "none",
    },
    WuFa: {
      name:"WuFa",
      description:
        "These aspected magicians must follow the path of Wuxing. Can only cast spells and summon spirits related to one wuxing element (wood, fire, earth, metal, or water). Conjurers can only summon spirits and sorcerers may only cast spells.",
      conjures: "Elementals",
      totemList: "none",
    },
  };
  //Cannot use Sorcery only Conjuring skills.
  const FullMageTraditions = {
    None: {
      name: "None",
      description: "Please select a Tradition",
      conjures: "none",
      totemList: "none",
    },
    Mage: {
      name: "Mage",
      description:
        "Can use Sorcery and Conjuring skills, access the astral plane, and use foci.",
      conjures: "Elementals",
      totemList: "none",
    },
    Shaman: {
      name: "Shaman",
      description:
        "Can use Sorcery and Conjuring skills, access the astral plane, and use foci.  Plus the benefits and disadvantages of their totem/tradition. ",
      conjures: "Spirits",
      totemList: "TOTEMS",
    },
    Psionicist: {
      name: "Psionicist",
      description:
        'Form of full magician.  Can only cast spells that fit into the psionic belief "power of the mind."  They cannot learn spell from "magical" characters. Cannot use any foci.  Cannot accept any geas of a "mystical" or "magical" bent.  Cannot summon spirits or elementals, only thought forms.',
      conjures: "Thought Forms",
      totemList: "none",
    },
    "Aboriginal Magic": {
      name: "Aboriginal Magic",
      "book.page": "mits.24",
      description: "",
      conjures: "",
      totemList: "ANIMAL TOTEMS",
    },
    "Aztec Magic": {
      name: "Aztec Magic",
      description: "",
      conjures: "",
      totemList: "ANIMAL TOTEMS",
    },
    "Black Magic": {
      name: "Black Magic",
      description: "",
      conjures: "",
      totemList: "none",
    },
    "Chaos Magic": {
      name: "Chaos Magic",
      description: "",
      conjures: "",
      totemList: "none",
    },
    "Christian Magic": {
      name: "Christian Magic",
      description: "",
      conjures: "",
      totemList: "none",
    },
    "Druid Magic": {
      name: "Druid Magic",
      description: "",
      conjures: "",
      totemList: "none",
    },
    "Egyptian Magic": {
      name: "Egyptian Magic",
      description: "",
      conjures: "",
      totemList: "none",
    },
    "Gypsy Magic": {
      name: "Gypsy Magic",
      description: "",
      conjures: "",
      totemList: "none",
    },
    "Hawai'ian Magic": {
      name: "Hawai'ian Magic",
      description: "",
      conjures: "",
      totemList: "none",
    },
    "Hindu Magic": {
      name: "Hindu Magic",
      description: "",
      conjures: "",
      totemList: "none",
    },
    "Islamic Magic": {
      name: "Islamic Magic",
      description: "",
      conjures: "",
      totemList: "none",
    },
    "Norse Magic": {
      name: "Norse Magic",
      description: "",
      conjures: "",
      totemList: "none",
    },
    "Qabbalistic Magic": {
      name: "Qabbalistic Magic",
      description: "",
      conjures: "",
      totemList: "none",
    },
    "Rastafarian Magic": {
      name: "Rastafarian Magic",
      description: "",
      conjures: "",
      totemList: "none",
    },
    "Shinto Magic": {
      name: "Shinto Magic",
      description: "",
      conjures: "",
      totemList: "none",
    },
    Witchcraft: {
      name: "Witchcraft",
      description: "",
      conjures: "",
      totemList: "none",
    },
    Voodoo: {
      name: "Voodoo",
      description: "",
      conjures: "none",
      totemList: "LOA",
    },
    "Elemental Mage": {
      name: "Elemental Mage",
      description: "Mages specializing in a specific Element",
      conjures: "Elementals",
      totemList: "ELEMENTS",
    },
    Wujen: {
      name: "Wujen",
      description: "",
      conjures: "",
      totemList: "none",
    },
  };
  /*
    SR3
    Foci                            Availability  Cost                Street Index  Bonding Cost
    --------------------------------------------------------------------------------------------
    Anchoring Focus, Expendable*    4/48 hrs      Force x 3,000¥            2         1 x Force X
    Anchoring Focus, Reusable*      5/48 hrs      Force x 30,000¥           2         3 x Force X
    Centering Focus                 5/48 hrs      Force x 75,000¥           2         3 x Force X
    Expendable Spell Focus          3/26 hrs      Force x 1,500¥            1         0         X
    Power Focus                     6/72 hrs      Force x 105,000¥          2         5 x Force X
    Shielding Focus                 6/72 hrs      Force x 95,000¥           2         4 x Force X
    Specific Spell Focus            4/48 hrs      Force x 45,000¥           2         1 x Force X
    Spell Category Focus            5/48 hrs      Force x 75,000¥           2         3 x Force 
    Spell Defense Focus             5/48 hrs      Force x 75,000¥           2         3 x Force
    Spirit Focus                    4/48 hrs      Force x 60,000¥           2         2 x Force
    Sustaining Focus                2/48 hrs      Force x 15,000¥           2         1 x Force X
    Weapon Focus                    8/72 hrs      [(Reach +1) x 100,000¥] +Force x 90,000¥ 2 (3 + Reach) x Force
   */

  /*
    SR2

    Fetish                None
    Fetish Focus          None
    Specific Spell Focus  1 x Rating
    Spell Category Focus  3 x Rating
    Spirit Focus          2 x Rating
    Power Focus           5 x Rating
    Weapon Focus          6 x Rating
    Spell Lock            1

    */

  const MagicalItems = {
    SR3: [
      {
        Name: "Anchoring Focus, Expendable lvl 1",
        Rating: 1,
        Cost: 3000,
        Force: 1,
        KarmaCost: 1,
      },
      {
        Name: "Anchoring Focus, Expendable lvl 2",
        Rating: 2,
        Cost: 6000,
        Force: 2,
        KarmaCost: 2,
      },
      {
        Name: "Anchoring Focus, Expendable lvl 3",
        Rating: 3,
        Cost: 9000,
        Force: 3,
        KarmaCost: 3,
      },
      {
        Name: "Anchoring Focus, Expendable lvl 4",
        Rating: 4,
        Cost: 12000,
        Force: 4,
        KarmaCost: 4,
      },
      {
        Name: "Anchoring Focus, Expendable lvl 5",
        Rating: 5,
        Cost: 15000,
        Force: 5,
        KarmaCost: 5,
      },
      {
        Name: "Anchoring Focus, Expendable lvl 6",
        Rating: 6,
        Cost: 18000,
        Force: 6,
        KarmaCost: 6,
      },
      {
        Name: "Anchoring Focus, Reusable lvl 1",
        Rating: 1,
        Cost: 30000,
        Force: 1,
        KarmaCost: 3,
      },
      {
        Name: "Anchoring Focus, Reusable lvl 2",
        Rating: 2,
        Cost: 60000,
        Force: 2,
        KarmaCost: 6,
      },
      {
        Name: "Anchoring Focus, Reusable lvl 3",
        Rating: 3,
        Cost: 90000,
        Force: 3,
        KarmaCost: 9,
      },
      {
        Name: "Anchoring Focus, Reusable lvl 4",
        Rating: 4,
        Cost: 120000,
        Force: 4,
        KarmaCost: 12,
      },
      {
        Name: "Anchoring Focus, Reusable lvl 5",
        Rating: 5,
        Cost: 150000,
        Force: 5,
        KarmaCost: 15,
      },
      {
        Name: "Anchoring Focus, Reusable lvl 6",
        Rating: 6,
        Cost: 180000,
        Force: 6,
        KarmaCost: 18,
      },
      {
        Name: "Centering Focus lvl 1",
        Rating: 1,
        Cost: 75000,
        Force: 1,
        KarmaCost: 3,
      },
      {
        Name: "Centering Focus lvl 2",
        Rating: 2,
        Cost: 150000,
        Force: 2,
        KarmaCost: 6,
      },
      {
        Name: "Centering Focus lvl 3",
        Rating: 3,
        Cost: 225000,
        Force: 3,
        KarmaCost: 9,
      },
      {
        Name: "Centering Focus lvl 4",
        Rating: 4,
        Cost: 300000,
        Force: 4,
        KarmaCost: 12,
      },
      {
        Name: "Centering Focus lvl 5",
        Rating: 5,
        Cost: 375000,
        Force: 5,
        KarmaCost: 15,
      },
      {
        Name: "Centering Focus lvl 6",
        Rating: 6,
        Cost: 450000,
        Force: 6,
        KarmaCost: 18,
      },
      {
        Name: "Expendable Spell Focus lvl 1",
        Rating: 1,
        Cost: 1500,
        Force: 1,
        KarmaCost: 0,
      },
      {
        Name: "Expendable Spell Focus lvl 2",
        Rating: 2,
        Cost: 3000,
        Force: 2,
        KarmaCost: 0,
      },
      {
        Name: "Expendable Spell Focus lvl 3",
        Rating: 3,
        Cost: 4500,
        Force: 3,
        KarmaCost: 0,
      },
      {
        Name: "Expendable Spell Focus lvl 4",
        Rating: 4,
        Cost: 6000,
        Force: 4,
        KarmaCost: 0,
      },
      {
        Name: "Expendable Spell Focus lvl 5",
        Rating: 5,
        Cost: 7500,
        Force: 5,
        KarmaCost: 0,
      },
      {
        Name: "Expendable Spell Focus lvl 6",
        Rating: 6,
        Cost: 9000,
        Force: 6,
        KarmaCost: 0,
      },
      {
        Name: "Power Focus lvl 1",
        Rating: 1,
        Cost: 105000,
        Force: 1,
        KarmaCost: 5,
      },
      {
        Name: "Power Focus lvl 2",
        Rating: 2,
        Cost: 210000,
        Force: 2,
        KarmaCost: 10,
      },
      {
        Name: "Power Focus lvl 3",
        Rating: 3,
        Cost: 315000,
        Force: 3,
        KarmaCost: 15,
      },
      {
        Name: "Power Focus lvl 4",
        Rating: 4,
        Cost: 420000,
        Force: 4,
        KarmaCost: 20,
      },
      {
        Name: "Power Focus lvl 5",
        Rating: 5,
        Cost: 525000,
        Force: 5,
        KarmaCost: 25,
      },
      {
        Name: "Power Focus lvl 6",
        Rating: 6,
        Cost: 630000,
        Force: 6,
        KarmaCost: 30,
      },
      {
        Name: "Shielding Focus lvl 1",
        Rating: 1,
        Cost: 95000,
        Force: 1,
        KarmaCost: 4,
      },
      {
        Name: "Shielding Focus lvl 2",
        Rating: 2,
        Cost: 190000,
        Force: 2,
        KarmaCost: 8,
      },
      {
        Name: "Shielding Focus lvl 3",
        Rating: 3,
        Cost: 285000,
        Force: 3,
        KarmaCost: 12,
      },
      {
        Name: "Shielding Focus lvl 4",
        Rating: 4,
        Cost: 380000,
        Force: 4,
        KarmaCost: 16,
      },
      {
        Name: "Shielding Focus lvl 5",
        Rating: 5,
        Cost: 475000,
        Force: 5,
        KarmaCost: 20,
      },
      {
        Name: "Shielding Focus lvl 6",
        Rating: 6,
        Cost: 570000,
        Force: 6,
        KarmaCost: 24,
      },
      {
        Name: "Specific Spell Focus lvl 1",
        NeedsExtra: true,
        Rating: 1,
        Cost: 45000,
        Force: 1,
        KarmaCost: 1,
      },
      {
        Name: "Specific Spell Focus lvl 2",
        NeedsExtra: true,
        Rating: 2,
        Cost: 90000,
        Force: 2,
        KarmaCost: 2,
      },
      {
        Name: "Specific Spell Focus lvl 3",
        NeedsExtra: true,
        Rating: 3,
        Cost: 4500,
        Force: 3,
        KarmaCost: 3,
      },
      {
        Name: "Specific Spell Focus lvl 4",
        NeedsExtra: true,
        Rating: 4,
        Cost: 6000,
        Force: 4,
        KarmaCost: 4,
      },
      {
        Name: "Specific Spell Focus lvl 5",
        NeedsExtra: true,
        Rating: 5,
        Cost: 7500,
        Force: 5,
        KarmaCost: 5,
      },
      {
        Name: "Specific Spell Focus lvl 6",
        NeedsExtra: true,
        Rating: 6,
        Cost: 9000,
        Force: 6,
        KarmaCost: 6,
      },
      {
        Name: "Spell Category Focus lvl 1",
        NeedsExtra: true,
        Rating: 1,
        Cost: 75000,
        Force: 1,
        KarmaCost: 3,
      },
      {
        Name: "Spell Category Focus lvl 2",
        NeedsExtra: true,
        Rating: 2,
        Cost: 150000,
        Force: 2,
        KarmaCost: 6,
      },
      {
        Name: "Spell Category Focus lvl 3",
        NeedsExtra: true,
        Rating: 3,
        Cost: 225000,
        Force: 3,
        KarmaCost: 9,
      },
      {
        Name: "Spell Category Focus lvl 4",
        NeedsExtra: true,
        Rating: 4,
        Cost: 300000,
        Force: 4,
        KarmaCost: 12,
      },
      {
        Name: "Spell Category Focus lvl 5",
        NeedsExtra: true,
        Rating: 5,
        Cost: 375000,
        Force: 5,
        KarmaCost: 15,
      },
      {
        Name: "Spell Category Focus lvl 6",
        NeedsExtra: true,
        Rating: 6,
        Cost: 450000,
        Force: 6,
        KarmaCost: 18,
      },
      {
        Name: "Spell Defense Focus lvl 1",
        Rating: 1,
        Cost: 75000,
        Force: 1,
        KarmaCost: 3,
      },
      {
        Name: "Spell Defense Focus lvl 2",
        Rating: 2,
        Cost: 150000,
        Force: 2,
        KarmaCost: 6,
      },
      {
        Name: "Spell Defense Focus lvl 3",
        Rating: 3,
        Cost: 225000,
        Force: 3,
        KarmaCost: 9,
      },
      {
        Name: "Spell Defense Focus lvl 4",
        Rating: 4,
        Cost: 300000,
        Force: 4,
        KarmaCost: 12,
      },
      {
        Name: "Spell Defense Focus lvl 5",
        Rating: 5,
        Cost: 375000,
        Force: 5,
        KarmaCost: 15,
      },
      {
        Name: "Spell Defense Focus lvl 6",
        Rating: 6,
        Cost: 450000,
        Force: 6,
        KarmaCost: 18,
      },
      {
        Name: "Spirit Focus lvl 1",
        Rating: 1,
        Cost: 60000,
        Force: 1,
        KarmaCost: 2,
      },
      {
        Name: "Spirit Focus lvl 2",
        Rating: 2,
        Cost: 120000,
        Force: 2,
        KarmaCost: 4,
      },
      {
        Name: "Spirit Focus lvl 3",
        Rating: 3,
        Cost: 180000,
        Force: 3,
        KarmaCost: 6,
      },
      {
        Name: "Spirit Focus lvl 4",
        Rating: 4,
        Cost: 240000,
        Force: 4,
        KarmaCost: 8,
      },
      {
        Name: "Spirit Focus lvl 5",
        Rating: 5,
        Cost: 300000,
        Force: 5,
        KarmaCost: 10,
      },
      {
        Name: "Spirit Focus lvl 6",
        Rating: 6,
        Cost: 360000,
        Force: 6,
        KarmaCost: 12,
      },
      {
        Name: "Sustaining Spell Focus lvl 1",
        Rating: 1,
        Cost: 15000,
        Force: 1,
        KarmaCost: 1,
      },
      {
        Name: "Sustaining Spell Focus lvl 2",
        Rating: 2,
        Cost: 30000,
        Force: 2,
        KarmaCost: 2,
      },
      {
        Name: "Sustaining Spell Focus lvl 3",
        Rating: 3,
        Cost: 45000,
        Force: 3,
        KarmaCost: 3,
      },
      {
        Name: "Sustaining Spell Focus lvl 4",
        Rating: 4,
        Cost: 60000,
        Force: 4,
        KarmaCost: 4,
      },
      {
        Name: "Sustaining Spell Focus lvl 5",
        Rating: 5,
        Cost: 75000,
        Force: 5,
        KarmaCost: 5,
      },
      {
        Name: "Sustaining Spell Focus lvl 6",
        Rating: 6,
        Cost: 90000,
        Force: 6,
        KarmaCost: 6,
      },
    ],
    SR2: [
      {
        Name: "Expendable Spell Focus lvl 1",
        Rating: 1,
        Cost: 1500,
        Force: 1,
        KarmaCost: 0,
      },
      {
        Name: "Expendable Spell Focus lvl 2",
        Rating: 2,
        Cost: 3000,
        Force: 2,
        KarmaCost: 0,
      },
      {
        Name: "Expendable Spell Focus lvl 3",
        Rating: 3,
        Cost: 4500,
        Force: 3,
        KarmaCost: 0,
      },
      {
        Name: "Expendable Spell Focus lvl 4",
        Rating: 4,
        Cost: 6000,
        Force: 4,
        KarmaCost: 0,
      },
      {
        Name: "Expendable Spell Focus lvl 5",
        Rating: 5,
        Cost: 7500,
        Force: 5,
        KarmaCost: 0,
      },
      {
        Name: "Expendable Spell Focus lvl 6",
        Rating: 6,
        Cost: 9000,
        Force: 6,
        KarmaCost: 0,
      },
      {
        Name: "Power Focus lvl 1",
        Rating: 1,
        Cost: 105000,
        Force: 1,
        KarmaCost: 5,
      },
      {
        Name: "Power Focus lvl 2",
        Rating: 2,
        Cost: 210000,
        Force: 2,
        KarmaCost: 10,
      },
      {
        Name: "Power Focus lvl 3",
        Rating: 3,
        Cost: 315000,
        Force: 3,
        KarmaCost: 15,
      },
      {
        Name: "Power Focus lvl 4",
        Rating: 4,
        Cost: 420000,
        Force: 4,
        KarmaCost: 20,
      },
      {
        Name: "Power Focus lvl 5",
        Rating: 5,
        Cost: 525000,
        Force: 5,
        KarmaCost: 25,
      },
      {
        Name: "Power Focus lvl 6",
        Rating: 6,
        Cost: 630000,
        Force: 6,
        KarmaCost: 30,
      },
      {
        Name: "Specific Spell Focus lvl 1",
        NeedsExtra: true,
        Rating: 1,
        Cost: 45000,
        Force: 1,
        KarmaCost: 1,
      },
      {
        Name: "Specific Spell Focus lvl 2",
        NeedsExtra: true,
        Rating: 2,
        Cost: 90000,
        Force: 2,
        KarmaCost: 2,
      },
      {
        Name: "Specific Spell Focus lvl 3",
        NeedsExtra: true,
        Rating: 3,
        Cost: 4500,
        Force: 3,
        KarmaCost: 3,
      },
      {
        Name: "Specific Spell Focus lvl 4",
        NeedsExtra: true,
        Rating: 4,
        Cost: 6000,
        Force: 4,
        KarmaCost: 4,
      },
      {
        Name: "Specific Spell Focus lvl 5",
        NeedsExtra: true,
        Rating: 5,
        Cost: 7500,
        Force: 5,
        KarmaCost: 5,
      },
      {
        Name: "Specific Spell Focus lvl 6",
        NeedsExtra: true,
        Rating: 6,
        Cost: 9000,
        Force: 6,
        KarmaCost: 6,
      },
      {
        Name: "Spell Category Focus lvl 1",
        NeedsExtra: true,
        Rating: 1,
        Cost: 75000,
        Force: 1,
        KarmaCost: 3,
      },
      {
        Name: "Spell Category Focus lvl 2",
        NeedsExtra: true,
        Rating: 2,
        Cost: 150000,
        Force: 2,
        KarmaCost: 6,
      },
      {
        Name: "Spell Category Focus lvl 3",
        NeedsExtra: true,
        Rating: 3,
        Cost: 225000,
        Force: 3,
        KarmaCost: 9,
      },
      {
        Name: "Spell Category Focus lvl 4",
        NeedsExtra: true,
        Rating: 4,
        Cost: 300000,
        Force: 4,
        KarmaCost: 12,
      },
      {
        Name: "Spell Category Focus lvl 5",
        NeedsExtra: true,
        Rating: 5,
        Cost: 375000,
        Force: 5,
        KarmaCost: 15,
      },
      {
        Name: "Spell Category Focus lvl 6",
        NeedsExtra: true,
        Rating: 6,
        Cost: 450000,
        Force: 6,
        KarmaCost: 18,
      },
      {
        Name: "Spirit Focus lvl 1",
        Rating: 1,
        Cost: 60000,
        Force: 1,
        KarmaCost: 2,
      },
      {
        Name: "Spirit Focus lvl 2",
        Rating: 2,
        Cost: 120000,
        Force: 2,
        KarmaCost: 4,
      },
      {
        Name: "Spirit Focus lvl 3",
        Rating: 3,
        Cost: 180000,
        Force: 3,
        KarmaCost: 6,
      },
      {
        Name: "Spirit Focus lvl 4",
        Rating: 4,
        Cost: 240000,
        Force: 4,
        KarmaCost: 8,
      },
      {
        Name: "Spirit Focus lvl 5",
        Rating: 5,
        Cost: 300000,
        Force: 5,
        KarmaCost: 10,
      },
      {
        Name: "Spirit Focus lvl 6",
        Rating: 6,
        Cost: 360000,
        Force: 6,
        KarmaCost: 12,
      },
      { Name: "Spell Lock", Rating: 1, Cost: 45000, Force: 1, KarmaCost: 1 },
    ],
  };

  const [newSpell, setNewSpell] = useState("");
  const [newFoci, setNewFoci] = useState("");
  const [newFociIndex, setNewFociIndex] = useState("");
  const [newSpellIndex, setNewSpellIndex] = useState("");
  const [selectedSpells, setSelectedSpells] = useState(props.spells);
  const [selectedFoci, setSelectedFoci] = useState(props.foci);
  const [selectedFociToAdd, setSelectedFociToAdd] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [spellRating, setSpellRating] = useState(1);
  const [spellPointsSpent, setSpellPointsSpent] = useState(
    CalcTotalSpellRatings(props.spells, props.foci)
  );
  const spellPointsMax = props.maxSpellPoints;
  const [magicalTradition, setMagicalTradition] = useState(
    props.chosenTradition.name
  );
  const [magicalTotem, setMagicalTotem] = useState(props.magicalTotem.name);
  const [AdeptPointsSpent, setAdeptPointsSpent] = useState(
    CalcTotalPowerRatings(props.powers)
  );
  const [AdeptPointsMax, setAdeptPointsMax] = useState(6);
  const [newPower, setNewPower] = useState("");
  const [newPowerCost, setNewPowerCost] = useState(0.0);
  const [newPowerDesc, setNewPowerDesc] = useState("");
  const [newPowerHasRating, setNewPowerHasRating] = useState(false);
  const [NewPowerIndex, setNewPowerIndex] = useState("");
  const [newPowerRating, setNewPowerRating] = useState(1);
  const [selectedPowers, setSelectedPowers] = useState(props.powers);
  const [spellFetish, setSpellFetish] = useState(false);
  const [spellExclusive, setSpellExclusive] = useState(false);

  const label = { inputProps: { "aria-label": "Edition Switch" } };

  const findTotemID = (totem) => {
    if (totem.hasOwnProperty("id")) {
      return totem.id;
    }
    return 0;
  };
  const [NewTotemIndex, setNewTotemIndex] = useState(
    findTotemID(props.magicalTotem)
  );

  var TraditionList = {};
  const SpellCategories = {
    C: "Combat",
    M: "Manipulation",
    H: "Health",
    D: "Detection",
    I: "Illusion",
    Z: "Transformation",
  };

  const convertModsToAttributes = (mods) => {
    const ModToAttributes = {
      BOD: "Body",
      RBOD: "Body",
      STR: "Strength",
      RSTR: "Strength",
      QCK: "Quickness",
      RQCK: "Quickness",
      INT: "Intelligence",
      CHA: "Charisma",
      WIL: "Willpower",
      RCT: "Reaction",
      INI: "Initative",
      IMP: "Impact",
      BAL: "Ballastic",
      CPL: "Combat_Pool",
      TAS: "Task_Pool",
      HAC: "Hacking_Pool",
      VNI: "Vehicle_Initative",
      VCT: "Vehicle_Control_Reaction",
      VCR: "Vehicle_Control_Rig_Level",
    };

    return mods
      .map((mod) => {
        const matches = mod.match(/([+-])(\d)([A-Z]\w+)/);
        if (matches) {
          const [, sign, amount, modPart] = matches;
          const attribute = ModToAttributes[modPart] || modPart;
          const value = sign === "-" ? parseInt(amount) * -1 : parseInt(amount);
          return { [attribute]: value };
        }
        return null;
      })
      .filter((mod) => mod !== null);
  };

  const CalcPowerAttributeChanges = () => {
    let magicalAttributeBonuses = {
      Body: 0,
      Quickness: 0,
      Strength: 0,
      Charisma: 0,
      Willpower: 0,
      Intelligence: 0,
      Reaction: 0,
      Initative: 0,
    };
    let magicModsTotals = [];
    selectedPowers.forEach(function (power) {
      if (power.Mods !== "") {
        magicModsTotals.push(power);
      }
    });
    magicModsTotals.forEach(function (power) {
      let mod = power.Mods;
      let AttributesToMod = convertModsToAttributes(mod.split(","));
      for (let i = 0; i < AttributesToMod.length; i++) {
        if (
          !magicalAttributeBonuses.hasOwnProperty(
            Object.keys(AttributesToMod[i])[0]
          )
        ) {
          magicalAttributeBonuses[Object.keys(AttributesToMod[i])[0]] = 0;
        }
        if (power.HasLevels) {
          magicalAttributeBonuses[Object.keys(AttributesToMod[i])[0]] +=
            parseInt(Object.values(AttributesToMod[i])[0]) * power.Rating;
        } else {
          magicalAttributeBonuses[Object.keys(AttributesToMod[i])[0]] +=
            parseInt(Object.values(AttributesToMod[i])[0]);
        }
      }
    });
    props.onChangeMagicalAttributes(magicalAttributeBonuses);
  };

  const handleAddPower = () => {
    if (newPower) {
      var powerToAdd = { ...newPower };
      if (newPowerHasRating) {
        powerToAdd.Cost = newPower.Cost * newPowerRating;
        powerToAdd = { ...newPower, Rating: newPowerRating };
        setNewPowerRating(1);
      } else {
        powerToAdd = { ...newPower };
      }

      setSelectedPowers((prevPowers) => [...prevPowers, powerToAdd]);
      setAdeptPointsSpent(
        (prevPowersPointsSpent) =>
          parseFloat(prevPowersPointsSpent) + parseFloat(powerToAdd.Cost)
      );
      setNewPower("");
      setNewPowerIndex("");
      props.onChangePowers([...selectedPowers, powerToAdd]);
      CalcPowerAttributeChanges();
    }
  };

  const handleRemovePower = (index) => {
    const editedPowers = [...selectedPowers];
    let PowerRemoved = editedPowers.splice(index, 1);
    if (PowerRemoved.HasLevels) {
      setAdeptPointsSpent(
        (prevPowers) => prevPowers - PowerRemoved[0].Cost * PowerRemoved.Rating
      );
    } else {
      setAdeptPointsSpent((prevPowers) => prevPowers - PowerRemoved[0].Cost);
    }

    setSelectedPowers(editedPowers);
    props.onChangePowers(editedPowers);
    CalcPowerAttributeChanges();
  };

  const handlePowerChange = (event) => {
    const TempPower = AdeptPowers[event.target.value];
    setNewPower(TempPower);
    setNewPowerIndex(event.target.value);
    setNewPowerCost(TempPower.Cost);
    setNewPowerDesc(TempPower.Notes);
    if (TempPower.HasLevels) {
      setNewPowerHasRating(true);
    } else {
      setNewPowerHasRating(false);
    }
  };

  const handlePowerRatingChange = (event) => {
    const rating = parseInt(event.target.value);
    setNewPowerRating(rating);
  };

  const renderPowerListItem = (power) => {
    if (power.HasLevels) {
      return (
        <ListItemText
          primary={`${power.Name}`}
          secondary={"Cost: " + power.Cost + " - Rating: " + power.Rating}
        />
      );
    } else {
      return (
        <ListItemText
          primary={`${power.Name}`}
          secondary={"Cost: " + power.Cost}
        />
      );
    }
  };

  const handleTotemChange = (event) => {
    setNewTotemIndex(event.target.value);
    let totem = Totems[props.chosenTradition.totemList][event.target.value];
    setMagicalTotem(totem);
    totem.id = event.target.value;
    props.onChangeMagicalTotem(totem);
  };

  const renderTotems = (type) => {
    if (type !== "none") {
      return (
        <Select
          id="totem-dropdown"
          value={NewTotemIndex}
          onChange={handleTotemChange}
        >
          <MenuItem key={-1}>Choose A Totem</MenuItem>
          {Totems[type]
            .sort(function (a, b) {
              return a.name.localeCompare(b.name);
            })
            .map((totem, index) => (
              <MenuItem key={index} data-type={type} value={index}>
                {totem.name}
              </MenuItem>
            ))}
        </Select>
      );
    }
  };

  const renderTraditionBonuses = (tradition) => {
    let list = {};
    switch (props.magicalChoice) {
      case "Full Magician":
      case "Human Full Magician":
      case "Metahuman Full Magician":
        list = FullMageTraditions;
        break;

      case "Physical Adept":
      case "Human Physical Adept":
      case "Metahuman Physical Adept":
        list = AdeptPaths;
        break;
      case "Metahuman Shamanist":
      case "Human Shamanist":
      case "Metahuman Sorcerer":
      case "Human Sorcerer":
      case "Aspected":
        list = AspectedTraditions;
        break;

      default:
        break;
    }
    return (
      <>
        <h4>Tradition</h4>
        <div>
          <strong>Name:</strong> {list[tradition].name}
        </div>
        <div>
          <strong>Description:</strong> {list[tradition].description}
        </div>
        <div>
          <strong>Conjures:</strong> {list[tradition].conjures}
        </div>
      </>
    );
  };

  const renderTotemBonuses = (totem) => {
    if (props.chosenTradition.totemList !== "none") {
      return (
        <>
          <h4>Path of {totem.name}</h4>
          <div>
            <strong>Name:</strong> {totem.name}
          </div>
          <div>
            <strong>Environment:</strong> {totem.environment}
          </div>
          <div>
            <strong>Advantages:</strong> {totem.advantages}
          </div>
          <div>
            <strong>Disadvantages:</strong> {totem.disadvantages}
          </div>
        </>
      );
    }
  };

  const RenderPhysicalAdepts = () => {
    return (
      <>
        <h3>Adept Powers</h3>
        <Box sx={{ width: "100%" }}>
          Power Points {AdeptPointsSpent}/{AdeptPointsMax}
          <LinearProgress
            variant="determinate"
            value={(AdeptPointsSpent / 6) * 100}
          />
        </Box>
        <br></br>
        <FormControl style={{ width: "400px" }}>
          <InputLabel id="power-label">{selectedCategory}</InputLabel>
          <Select
            id="power-dropdown"
            value={NewPowerIndex}
            onChange={handlePowerChange}
          >
            {AdeptPowers.sort((a, b) => a.Name.localeCompare(b.Name)).map(
              (power, index) => (
                <MenuItem key={index} value={index}>
                  {power.Name} - PP: {power.Cost}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
        {newPower && (
          <>
            <TextField
              style={{ width: "100px", marginRight: "20px" }}
              id="power-cost-input"
              disabled={true}
              label="Cost"
              type="number"
              value={newPowerCost * newPowerRating}
            />
            {newPowerHasRating && (
              <TextField
                style={{ width: "100px", marginRight: "20px" }}
                id="power-rating-input"
                label="Rating"
                type="number"
                value={newPowerRating}
                onChange={(event) => handlePowerRatingChange(event)}
                inputProps={{
                  min: 1,
                  max: 6,
                }}
              />
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddPower}
            >
              Add Power
            </Button>
            <div>Notes:{newPowerDesc}</div>
          </>
        )}
        <hr></hr>
        <h3>Powers</h3>
        <List style={{ maxWidth: "500px" }}>
          {selectedPowers.map((power, index) => (
            <ListItem key={index}>
              {renderPowerListItem(power)}
              <Button
                color="secondary"
                onClick={() => handleRemovePower(index)}
              >
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
      </>
    );
  };

  const handleRatingChange = (event) => {
    const rating = parseInt(event.target.value);
    if (!isNaN(rating) && rating >= 1 && rating <= 6) {
      setSpellRating(rating);
    }
  };

  const handleSpellChange = (event) => {
    const TempSpell = spellsData[event.target.value];
    setNewSpell(TempSpell);
    setNewSpellIndex(event.target.value);
  };

  const handleAddSpell = () => {
    if (newSpell) {
      const spellToAdd = {
        ...newSpell,
        Rating: spellRating,
        Fetish: spellFetish,
        Exclusive: spellExclusive,
      };
      setSelectedSpells((prevSpells) => [...prevSpells, spellToAdd]);
      setSpellPointsSpent((prevSpells) => prevSpells + spellRating);
      setNewSpell("");
      setNewSpellIndex("");
      setSpellFetish(false);
      setSpellExclusive(false);
      props.onChangeSpells([...selectedSpells, spellToAdd]);
    }
  };

  const handleFociChange = (event) => {
    const TempFoci = MagicalItems[props.Edition][event.target.value];
    setNewFoci(TempFoci);
    setNewFociIndex(event.target.value);
  };

  const handleSetExtraFociModal = (event) => {
    const editedFoci = [...selectedFoci];
    editedFoci[modalExtraIndex].Extra = modalExtra;
    setSelectedFoci(editedFoci);
    props.onChangeFoci(editedFoci);
    handleCloseModal();
  };

  const handleAddFoci = () => {
    if (newFoci) {
      const fociToAdd = { ...newFoci };
      fociToAdd.Bound = "No";
      fociToAdd.Extra = "";
      setSelectedFoci((prevFoci) => [...prevFoci, fociToAdd]);
      setNewFoci("");
      setNewFociIndex("");
      props.onChangeFoci([...selectedFoci, fociToAdd]);
    }
  };

  const handleRemoveSpell = (index) => {
    const editedSpells = [...selectedSpells];
    let SpellRemoved = editedSpells.splice(index, 1);
    setSpellPointsSpent((prevSpells) => prevSpells - SpellRemoved[0].Rating);
    setSelectedSpells(editedSpells);
    props.onChangeSpells(editedSpells);
  };

  const handleRemoveFoci = (index) => {
    const editedFoci = [...selectedFoci];
    let FociRemoved = editedFoci.splice(index, 1);
    setSelectedFoci(editedFoci);
    props.onChangeFoci(editedFoci);
    if (editedFoci.Bound === "Yes") {
      setSpellPointsSpent(
        (prevSpells) => prevSpells - editedFoci[index].KarmaCost
      );
    }
  };

  const handleBindFoci = (index) => {
    const editedFoci = [...selectedFoci];
    if (editedFoci[index].Bound === "No") {
      editedFoci[index].Bound = "Yes";
      setSelectedFoci(editedFoci);
      props.onChangeFoci(editedFoci);
      setSpellPointsSpent(
        (prevSpells) => prevSpells + editedFoci[index].KarmaCost
      );
    }
  };

  const handleUnbindFoci = (index) => {
    const editedFoci = [...selectedFoci];
    if (editedFoci[index].Bound === "Yes") {
      editedFoci[index].Bound = "No";
      setSelectedFoci(editedFoci);
      props.onChangeFoci(editedFoci);
      setSpellPointsSpent(
        (prevSpells) => prevSpells - editedFoci[index].KarmaCost
      );
    }
  };

  const handleSetFociExtras = (index) => {
    handleClickOpenModal();
    setModalExtraIndex(index);
  };

  const handleChangeSpellFetish = (event) => {
    setSpellFetish(event.target.checked);
  };

  const handleChangeSpellExclusive = (event) => {
    setSpellExclusive(event.target.checked);
  };

  const isFetishSpell = (spell) => {
    if (spell) {
      return <span>F&nbsp;</span>;
    }
  };

  const isExclusiveSpell = (spell) => {
    if (spell) {
      return <span>E&nbsp;</span>;
    }
  };

  const CalcSpellRating = (spell) => {
    let tempRating = spell.Rating;
    let limitedSpell = false;
    if (spell.Fetish) {
      limitedSpell = true;
      tempRating += 1;
    }
    if (spell.Exclusive) {
      limitedSpell = true;
      tempRating += 2;
    }
    if (limitedSpell) {
      return <span>&nbsp;({tempRating})</span>;
    } else {
      return;
    }
  };

  const RenderMagicianWithSpells = () => {
    return (
      <>
        <Box sx={{ width: "100%" }}>
          Spells {spellPointsSpent}/{spellPointsMax}
          <LinearProgress
            variant="determinate"
            value={(spellPointsSpent / spellPointsMax) * 100}
          />
        </Box>
        <br></br>
        <FormControl style={{ width: "200px" }}>
          <InputLabel id="spell-label">{selectedCategory}</InputLabel>
          <Select
            id="spell-dropdown"
            value={newSpellIndex}
            onChange={handleSpellChange}
          >
            {spellsData
              .sort((a, b) => {
                if (a.hasOwnProperty("Name")) {
                  return a.Name.localeCompare(b.Name);
                } else {
                  return a > b;
                }
              })
              .map((spell, index) => (
                <MenuItem key={index} value={index}>
                  {spell.Name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {newSpell && (
          <>
            <TextField
              style={{ width: "100px", marginRight: "20px" }}
              id="rating-input"
              label="Rating (1-6)"
              type="number"
              value={spellRating}
              onChange={handleRatingChange}
              InputProps={{
                inputProps: { min: 1, max: 6 },
              }}
            />
          </>
        )}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FormControlLabel
          value="top"
          control={
            <Checkbox
              {...label}
              name="Fetish"
              color="default"
              onChange={handleChangeSpellFetish}
              checked={spellFetish}
            />
          }
          label="Fetish?"
          labelPlacement="end"
        />
        <FormControlLabel
          value="top"
          control={
            <Checkbox
              {...label}
              name="Exclusive"
              color="default"
              onChange={handleChangeSpellExclusive}
              checked={spellExclusive}
            />
          }
          label="Exclusive?"
          labelPlacement="end"
        />
        <br></br>
        <br></br>
        <Button variant="contained" color="primary" onClick={handleAddSpell}>
          Add Spell
        </Button>
        <hr></hr>
        <FormControl style={{ width: "200px" }}>
          <InputLabel id="foci-label">{selectedFociToAdd}</InputLabel>
          <Select
            id="foci-dropdown"
            value={newFociIndex}
            onChange={handleFociChange}
          >
            {MagicalItems[props.Edition]
              .sort((a, b) => {
                if (a.hasOwnProperty("Name")) {
                  return a.Name.localeCompare(b.Name);
                } else {
                  return a > b;
                }
              })
              .map((foci, index) => (
                <MenuItem key={index} value={index}>
                  {foci.Name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <br></br>
        <br></br>
        <Button variant="contained" color="primary" onClick={handleAddFoci}>
          Add Foci
        </Button>
        <hr></hr>
        <h3>Spells</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Spell Name</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Target</TableCell>
                <TableCell align="right">Duration</TableCell>
                <TableCell align="right">Drain Code</TableCell>
                <TableCell align="right">Options</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedSpells.map((spell, index) => (
                <TableRow key={spell.Name}>
                  <TableCell component="th" scope="row">
                    {spell.Name}
                  </TableCell>
                  <TableCell align="right">
                    {spell.Rating} {CalcSpellRating(spell)}
                  </TableCell>
                  <TableCell align="right">{spell.Type}</TableCell>
                  <TableCell align="right">
                    {SpellCategories[spell.Class]}
                  </TableCell>
                  <TableCell align="right">{spell.Target}</TableCell>
                  <TableCell align="right">{spell.Duration}</TableCell>
                  <TableCell align="right">{spell.Drain}</TableCell>
                  <TableCell align="right">
                    {isFetishSpell(spell.Fetish)}{" "}
                    {isExclusiveSpell(spell.Exclusive)}
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleRemoveSpell(index)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  const handleTraditionChange = (event) => {
    setMagicalTradition(TraditionList[event.target.value].name);
    props.onChangeMagicalTradition(TraditionList[event.target.value]);
  };

  const RenderFociList = () => {
    return (
      <>
        <h3>Foci</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Foci Name</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">Nuyen Cost</TableCell>
                <TableCell align="right">Binding Cost</TableCell>
                <TableCell align="right">Bound</TableCell>
                <TableCell align="right">Notes</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedFoci.map((foci, index) => (
                <TableRow key={foci.Name}>
                  <TableCell component="th" scope="row">
                    {foci.Name}
                    {foci.Extra !== "" ? "(" + foci.Extra + ")" : ""}
                  </TableCell>
                  <TableCell align="right">{foci.Rating}</TableCell>
                  <TableCell align="right">
                    {new Intl.NumberFormat("ja-JP", {
                      style: "currency",
                      currency: "JPY",
                    }).format(foci.Cost)}
                  </TableCell>
                  <TableCell align="right">{foci.KarmaCost}</TableCell>
                  <TableCell align="right">{foci.Bound}</TableCell>
                  <TableCell align="right">{foci.Notes}</TableCell>
                  <TableCell align="right">
                    {foci.NeedsExtra ? (
                      <Button onClick={() => handleSetFociExtras(index)}>
                        Set Foci
                      </Button>
                    ) : (
                      ""
                    )}
                    <Button onClick={() => handleBindFoci(index)}>Bind</Button>
                    <Button onClick={() => handleUnbindFoci(index)}>
                      Unbind
                    </Button>
                    <Button onClick={() => handleRemoveFoci(index)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  const renderTraditionList = () => {
    console.log("Render Tradition List fired");
    console.log("Magical Choice: "+props.magicalChoice);
    var list = [];
    switch (props.magicalChoice) {
      case "Full Magician":
      case "Human Full Magician":
      case "Metahuman Full Magician":
        list = FullMageTraditions;
        break;

      case "Physical Adept":
      case "Human Physical Adept":
      case "Metahuman Physical Adept":
        list = AdeptPaths;
        break;
      case "Metahuman Shamanist":
      case "Human Shamanist":
      case "Metahuman Sorcerer":
      case "Human Sorcerer":
      case "Aspected":
        list = AspectedTraditions;
        break;

      default:
        
        break;
    }
    TraditionList = list;
    return (
      <>
        <FormControl style={{ width: "200px" }}>
          <Select
            id="TraditionList-dropdown"
            value={magicalTradition}
            onChange={handleTraditionChange}
          >
            {Object.keys(list).map((path, index) => (
              <MenuItem key={index} value={path}>
                {path}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {props.chosenTradition.totemList &&
          renderTotems(props.chosenTradition.totemList)}
        {magicalTradition && renderTraditionBonuses(magicalTradition)}
        {props.magicalTotem && renderTotemBonuses(props.magicalTotem)}
      </>
    );
  };

  const RenderWindow = () => {
    switch (props.magicalChoice) {
      case "Full Magician":
      case "Human Full Magician":
      case "Metahuman Full Magician":
        return RenderMagicianWithSpells();
      case "Physical Adept":
      case "Human Physical Adept":
      case "Metahuman Physical Adept":
        return RenderPhysicalAdepts();
      case "Aspected":
      case "Human Shamanist":
      case "Human Sorcerer":
      case "Metahuman Sorcerer":
      case "Metahuman Shamanist":
        return RenderMagicianWithSpells();

      default:
        return <div>Not Magical</div>;
    }
  };

  return (
    <div>
      <h3>Magical Talents ( {props.magicalChoice} )</h3>
      {renderTraditionList()}
      <hr></hr>
      {RenderWindow()}
      {RenderFociList()}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Set Foci</DialogTitle>
        <DialogContent>
          <DialogContentText>Set Foci's Extra Description</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            value={modalExtra}
            label="Foci Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setModalExtra(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button type="submit" onClick={handleSetExtraFociModal}>
            Add Extra
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MagicPanel;
