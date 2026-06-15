import React, { useState } from "react";
import { MenuItem } from "@mui/material";
import SearchableSelect from "./SearchableSelect";
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
import AllySection from "./AllySection";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Pre-import all edition data so Vite can bundle them (no runtime require)
const allSpells = import.meta.glob('../data/*/Spells.json', { eager: true });
const allAdeptPowers = import.meta.glob('../data/*/AdeptPowers.json', { eager: true });
const allTotems = import.meta.glob('../data/*/Totems.json', { eager: true });

function MagicPanel(props) {
  const spellsData = allSpells[`../data/${props.Edition}/Spells.json`]?.default;
  const AdeptPowers = allAdeptPowers[`../data/${props.Edition}/AdeptPowers.json`]?.default;
  const Totems = allTotems[`../data/${props.Edition}/Totems.json`]?.default;

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
      description: "Rather than devoting all their time to magical study, magician adepts channel some of their power into physical abilities like standard adepts while reserving the rest for Sorcery and Conjuring. They purchase the Magical Power adept power (1 Power Point per level), which grants an effective Magic Attribute for magical skills equal to their level. They must choose a shamanic or hermetic tradition at character creation. (MitS, p. 22)",
      conjures: "Elementals or Spirits (by tradition)",
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
      description: "The native Australians have a rich tradition dating back tens of thousands of years rooted in the Dreamtime, a timeless realm of magic similar to the metaplanes. Aboriginal shamans are skilled astral travelers with deep knowledge of dealing with astral powers. Almost exclusively shamans, they follow totems such as Badger, Crocodile, Scorpion, Shark and Snake, or nature totems like Sun, Moon, Sea and Mountain. Many are wilderness shamans.",
      conjures: "Nature Spirits",
      totemList: "TOTEMS",
    },
    "Aztec Magic": {
      name: "Aztec Magic",
      "book.page": "mits.24",
      description: "A revival of ancient Aztec traditions reconstructed from historical sources, focused on the gods and totems of the culture. Animal and human sacrifice is a predominant theme, making blood magic common among initiates. Shamanic tradition with common totems including Bat, Eagle, Jaguar, Lizard, Moon, Plumed Serpent, Puma, Snake and Sun. Use elaborate ceremonial costumes and obsidian knives in ritual magic.",
      conjures: "Spirits",
      totemList: "TOTEMS",
    },
    "Black Magic": {
      name: "Black Magic",
      "book.page": "mits.24",
      description: "Despite their reputation, most black magic groups follow a philosophy of freedom from social constraints combined with a will to power, steeped in Christian, hermetic and pagan symbolism. Hermetic black magic practitioners tend to be strict and disciplined. Shamanic practitioners often follow idols such as the Adversary, the Horned Man or the Seductress. Truly evil blood-sacrifice variants are a rarer exception.",
      conjures: "Elementals or Spirits (by tradition)",
      totemList: "TOTEMS",
    },
    "Chaos Magic": {
      name: "Chaos Magic",
      "book.page": "mits.24",
      description: "A highly eclectic and post-modern magical system designed to be free of dogma, incorporating symbols and ideas from many cultures including qabbalistic, runic and shamanic elements. Usually hermetic, though chaos mages may interact with many spirit beings during astral quests. Practitioners are often technophiles who incorporate technology such as CD players and LCD screens into their magic.",
      conjures: "Elementals",
      totemList: "none",
    },
    "Christian Magic": {
      name: "Christian Magic",
      description: "Also called Christian Theurgy. Magic flows through sincere faith in Christian doctrine. Practitioners call on saints and angels rather than casting spells in a traditional sense. Healing and protection are their greatest strengths; causing harm runs against their beliefs.",
      conjures: "Angels (Spirits of Man)",
      totemList: "none",
      diceBonus: [
        { category: "Health spells", bonus: "+2 dice" },
        { category: "Combat spells", bonus: "-1 die" },
      ],
    },
    "Druid Magic": {
      name: "Druid Magic",
      description: "An ancient Celtic nature-based tradition that sits between shamanic and hermetic practice. Druids venerate the cycles of nature, sacred groves, and the turning of the year. They work closely with the land and its spirits rather than imposing order on the magical world.",
      conjures: "Nature Spirits",
      totemList: "none",
    },
    "Egyptian Magic": {
      name: "Egyptian Magic",
      description: "Based on ancient Egyptian magical practices drawn from the traditions of the old priesthoods. Hermetic in approach, with elaborate ritual and the invocation of the Egyptian gods (Ra, Thoth, Isis, Osiris, etc.). Very structured and ceremonially demanding.",
      conjures: "Elementals",
      totemList: "none",
    },
    "Gypsy Magic": {
      name: "Gypsy Magic",
      description: "The Romani magical tradition, passed down through bloodlines. Shamanic in approach, emphasizing divination, warding, and curses. Romani mages maintain their own spirit contacts and traditions separate from established magical institutions.",
      conjures: "Nature Spirits",
      totemList: "none",
    },
    "Hawai'ian Magic": {
      name: "Hawai'ian Magic",
      description: "Based on traditional Hawaiian magical practice (Huna). Closely tied to the natural world of the islands — ocean, volcano, and wind. Practitioners follow the spiritual presence of place and nature, working with Aumakua (ancestor spirits) and Aumea (nature spirits).",
      conjures: "Nature Spirits",
      totemList: "none",
    },
    "Hindu Magic": {
      name: "Hindu Magic",
      description: "Draws on the vast traditions of Hindu spiritual practice. Practitioners invoke aspects of the Hindu pantheon — Brahma, Vishnu, Shiva, and their many forms. The tradition encompasses both ascetic and devotional paths and has unique spirit types not found in other systems.",
      conjures: "Devas & Asuras (Spirits)",
      totemList: "none",
    },
    "Islamic Magic": {
      name: "Islamic Magic",
      description: "Also called Sufi Magic. Rooted in Islamic mystical practice, specifically Sufism — the inner, esoteric dimension of Islam. Hermetic in method, the tradition invokes the 99 names of God and works through divine attributes. Very disciplined and ritualistic.",
      conjures: "Elementals",
      totemList: "none",
    },
    "Norse Magic": {
      name: "Norse Magic",
      description: "Also called Asatru Magic. Based on Norse/Viking magical practices including rune magic (galdr) and shamanic spirit journeying (seiðr). Practitioners follow the Norse pantheon and connect with spirits of land, sea, and sky. Rune carving and chanting are central practices.",
      conjures: "Nature Spirits",
      totemList: "none",
    },
    "Qabbalistic Magic": {
      name: "Qabbalistic Magic",
      description: "Based on Jewish mystical tradition, the Qabbalah. Hermetic in practice, the tradition maps reality through the Tree of Life and works with the divine names and the Sephirot. Practitioners invoke angelic presences and divine emanations. Extremely intellectual and disciplined.",
      conjures: "Elementals (Angels of the Sephirot)",
      totemList: "none",
    },
    "Rastafarian Magic": {
      name: "Rastafarian Magic",
      description: "Grounded in Rastafarian spiritual practice and deeply connected to African spiritual roots. Shamanic in character, emphasizing communal connection, natural living, and African ancestral spirits. Practitioners often use music and ritual to achieve magical focus.",
      conjures: "Nature Spirits",
      totemList: "none",
    },
    "Shinto Magic": {
      name: "Shinto Magic",
      description: "Based on Japanese Shinto practices. Practitioners work with Kami — spirits that inhabit all things: mountains, rivers, trees, ancestors, and natural phenomena. Purity, ritual cleansing, and respect for place are central to the tradition.",
      conjures: "Nature Spirits (Kami)",
      totemList: "none",
    },
    Witchcraft: {
      name: "Witchcraft",
      description: "European folk magic tradition with both shamanic and hermetic roots. Witches work with cycles of nature, herbal magic, divination, and spirit contact. The tradition emphasizes harmony with natural forces rather than imposing control over them. Health and protective magic come naturally; harm does not.",
      conjures: "Nature Spirits",
      totemList: "none",
      diceBonus: [
        { category: "Health & Detection spells", bonus: "+1 die" },
        { category: "Combat spells", bonus: "-1 die" },
      ],
    },
    Voodoo: {
      name: "Voodoo",
      description: "A Caribbean spiritual tradition rooted in West African religious practices. Practitioners work with the Loa — powerful spirits that serve as intermediaries between the divine and the human. Voodoo mages invite the Loa to 'ride' them, granting power in exchange for service and devotion.",
      conjures: "Loa (unique spirits)",
      totemList: "LOA",
    },
    "Elemental Mage": {
      name: "Elemental Mage",
      description: "A hermetic mage who has specialized deeply in a single element: Fire, Water, Air, or Earth. They gain greater affinity with their chosen element's spells and spirits at the cost of being weakened against the opposing element.",
      conjures: "Elementals",
      totemList: "ELEMENTS",
      diceBonus: [
        { category: "Chosen element spells & spirits", bonus: "+2 dice" },
        { category: "Opposing element spells & spirits", bonus: "-1 die" },
      ],
    },
    Wujen: {
      name: "Wujen",
      description: "An East Asian magical tradition based on Wuxing — the five transformative phases (Wood, Fire, Earth, Metal, Water). Hermetic in structure but drawing on Taoist cosmology rather than Western symbolism. Each Wujen works with one primary element and its relationships to the others.",
      conjures: "Elementals (Wuxing spirits)",
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
        Cost: 135000,
        Force: 3,
        KarmaCost: 3,
      },
      {
        Name: "Specific Spell Focus lvl 4",
        NeedsExtra: true,
        Rating: 4,
        Cost: 180000,
        Force: 4,
        KarmaCost: 4,
      },
      {
        Name: "Specific Spell Focus lvl 5",
        NeedsExtra: true,
        Rating: 5,
        Cost: 225000,
        Force: 5,
        KarmaCost: 5,
      },
      {
        Name: "Specific Spell Focus lvl 6",
        NeedsExtra: true,
        Rating: 6,
        Cost: 270000,
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
        Cost: 135000,
        Force: 3,
        KarmaCost: 3,
      },
      {
        Name: "Specific Spell Focus lvl 4",
        NeedsExtra: true,
        Rating: 4,
        Cost: 180000,
        Force: 4,
        KarmaCost: 4,
      },
      {
        Name: "Specific Spell Focus lvl 5",
        NeedsExtra: true,
        Rating: 5,
        Cost: 225000,
        Force: 5,
        KarmaCost: 5,
      },
      {
        Name: "Specific Spell Focus lvl 6",
        NeedsExtra: true,
        Rating: 6,
        Cost: 270000,
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
  const spellPointsMax = props.maxSpellPoints + (props.purchasedSpellPoints ?? 0);
  const [magicalTradition, setMagicalTradition] = useState(
    props.chosenTradition.name
  );
  const [magicalTotem, setMagicalTotem] = useState(props.magicalTotem?.name);
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

  // ── Initiation state ──────────────────────────────────────────
  const [initiateGrade, setInitiateGrade] = useState(props.initiateGrade ?? 0);
  const [initiations, setInitiations] = useState(props.initiations ?? []);
  const [useGroup, setUseGroup] = useState(!!(props.magicalGroup));
  const [useOrdeal, setUseOrdeal] = useState(false);
  const [pendingBenefit, setPendingBenefit] = useState('metamagic');
  const [pendingMetamagic, setPendingMetamagic] = useState('');

  // ── Magical Group state ───────────────────────────────────────
  const blankGroup = { name: '', type: 'Initiatory', resources: 'Low', strictures: [], patron: '' };
  const [magicalGroup, setMagicalGroup] = useState(props.magicalGroup ?? null);
  const [editingGroup, setEditingGroup] = useState(false);
  const [groupDraft, setGroupDraft] = useState(props.magicalGroup ?? blankGroup);

  // Magician's Way: total levels of "Magical Power" purchased → spell budget = levels × 6
  const magicalPowerLevel = selectedPowers
    .filter(p => p.Name && p.Name.includes('Magical Power'))
    .reduce((sum, p) => sum + (parseInt(p.Rating) || 1), 0);
  const magicianSpellBudget = magicalPowerLevel * 6;

  const label = { inputProps: { "aria-label": "Edition Switch" } };

  const findTotemID = (totem) => {
    if (totem && totem.hasOwnProperty("id")) {
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
      var powerToAdd;
      if (newPowerHasRating) {
        powerToAdd = { ...newPower, Rating: newPowerRating };
        setNewPowerRating(1);
      } else {
        powerToAdd = { ...newPower };
      }

      const costToAdd = powerToAdd.HasLevels
        ? parseFloat(newPower.Cost) * powerToAdd.Rating
        : parseFloat(newPower.Cost);

      setSelectedPowers((prevPowers) => [...prevPowers, powerToAdd]);
      setAdeptPointsSpent((prev) => parseFloat(prev) + costToAdd);
      setNewPower("");
      setNewPowerIndex("");
      props.onChangePowers([...selectedPowers, powerToAdd]);
      CalcPowerAttributeChanges();
    }
  };

  const handleRemovePower = (index) => {
    const editedPowers = [...selectedPowers];
    let PowerRemoved = editedPowers.splice(index, 1);
    const costToRemove = PowerRemoved[0].HasLevels
      ? parseFloat(PowerRemoved[0].Cost) * PowerRemoved[0].Rating
      : parseFloat(PowerRemoved[0].Cost);

    setAdeptPointsSpent((prev) => prev - costToRemove);
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
    if (!list[tradition]) return null;
    const t = list[tradition];
    return (
      <>
        <h4>Tradition</h4>
        <div>
          <strong>Name:</strong> {t.name}
        </div>
        <div style={{ margin: '4px 0' }}>
          <strong>Description:</strong> {t.description || <em>No description available.</em>}
        </div>
        {t.conjures && t.conjures !== "none" && (
          <div style={{ margin: '4px 0' }}>
            <strong>Conjures:</strong> {t.conjures}
          </div>
        )}
        {t.diceBonus && t.diceBonus.length > 0 && (
          <div style={{ margin: '6px 0' }}>
            <strong>Dice Modifiers:</strong>
            <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
              {t.diceBonus.map((b, i) => (
                <li key={i}>{b.category}: <strong>{b.bonus}</strong></li>
              ))}
            </ul>
          </div>
        )}
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
        <SearchableSelect
          items={AdeptPowers.slice().sort((a, b) => a.Name.localeCompare(b.Name))}
          value={NewPowerIndex}
          onChange={handlePowerChange}
          label="Adept Powers"
          renderItem={(power, i) => (
            <MenuItem key={i} value={i}>
              {power.Name} - PP: {power.Cost}
            </MenuItem>
          )}
          style={{ width: "400px" }}
        />
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
        {magicalTradition === "Magician's Way" && magicalPowerLevel > 0 && (
          <>
            <hr></hr>
            <h3>Magician's Way — Spells</h3>
            <p style={{ fontSize: '0.85em', color: '#888' }}>
              Magical Power level {magicalPowerLevel} grants {magicianSpellBudget} Spell Points (MitS p.22).
              Effective Magic Attribute = {magicalPowerLevel} for Sorcery and Conjuring.
            </p>
            <Box sx={{ width: "100%" }}>
              Spell Points {spellPointsSpent}/{magicianSpellBudget}
              <LinearProgress
                variant="determinate"
                value={Math.min((spellPointsSpent / magicianSpellBudget) * 100, 100)}
              />
            </Box>
            <br />
            <FormControl style={{ width: "200px" }}>
              <InputLabel id="adept-spell-label">{selectedCategory || "Select Spell"}</InputLabel>
              <Select
                id="adept-spell-dropdown"
                value={newSpellIndex}
                onChange={handleSpellChange}
              >
                {(spellsData ?? [])
                  .sort((a, b) => {
                    if (a.hasOwnProperty("Name")) return a.Name.localeCompare(b.Name);
                    return a > b;
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
                  id="adept-spell-rating-input"
                  label="Rating (1-6)"
                  type="number"
                  value={spellRating}
                  onChange={handleRatingChange}
                  InputProps={{ inputProps: { min: 1, max: 6 } }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddSpell}
                  disabled={spellPointsSpent + spellRating > magicianSpellBudget}
                >
                  Add Spell
                </Button>
                <div>Notes: {newSpell.Notes ?? newSpell.Description ?? ''}</div>
              </>
            )}
            <hr></hr>
            <h3>Learned Spells</h3>
            <List style={{ maxWidth: "600px" }}>
              {selectedSpells.map((spell, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${spell.Name} (Rating ${spell.Rating})`}
                    secondary={`Category: ${spell.Category ?? '—'}  Drain: ${spell.Drain ?? '—'}`}
                  />
                  <Button color="secondary" onClick={() => handleRemoveSpell(index)}>
                    Remove
                  </Button>
                </ListItem>
              ))}
            </List>
          </>
        )}
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
    if (FociRemoved[0].Bound === "Yes") {
      setSpellPointsSpent((prevSpells) => prevSpells - FociRemoved[0].KarmaCost);
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

  const RenderSpellPointPurchase = () => {
    if (props.Edition !== "SR3") return null;
    const purchased = props.purchasedSpellPoints ?? 0;
    const maxPurchasable = 50 - props.maxSpellPoints;
    const cost = purchased * 25000;

    const handleAdd = () => {
      if (purchased < maxPurchasable) {
        props.onChangePurchasedSpellPoints(purchased + 1);
      }
    };

    const handleRemove = () => {
      if (purchased > 0) {
        props.onChangePurchasedSpellPoints(purchased - 1);
      }
    };

    return (
      <Box sx={{ border: '1px solid #555', borderRadius: 1, padding: '12px', marginBottom: '16px', maxWidth: '500px' }}>
        <strong>Purchase Spell Points</strong>
        <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '8px' }}>
          25,000¥ per point · max {maxPurchasable} purchasable (cap: 50 total)
        </div>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button variant="outlined" size="small" onClick={handleRemove} disabled={purchased === 0}>−</Button>
          <span>{purchased} purchased ({new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(cost)})</span>
          <Button variant="outlined" size="small" onClick={handleAdd} disabled={purchased >= maxPurchasable}>+</Button>
        </Box>
      </Box>
    );
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
        {RenderSpellPointPurchase()}
        <SearchableSelect
          items={(spellsData ?? []).slice().sort((a, b) => (a.Name ?? '').localeCompare(b.Name ?? ''))}
          value={newSpellIndex}
          onChange={handleSpellChange}
          label="Spells"
          renderItem={(spell, i) => (
            <MenuItem key={i} value={i}>{spell.Name}</MenuItem>
          )}
          style={{ width: "400px" }}
        />
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
        <SearchableSelect
          items={MagicalItems[props.Edition].slice().sort((a, b) => (a.Name ?? '').localeCompare(b.Name ?? ''))}
          value={newFociIndex}
          onChange={handleFociChange}
          label="Foci"
          renderItem={(foci, i) => (
            <MenuItem key={i} value={i}>{foci.Name}</MenuItem>
          )}
          style={{ width: "400px" }}
        />
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

  // ── Initiation helpers ───────────────────────────────────────
  const calcInitiationCost = (targetGrade, inGroup, withOrdeal) => {
    const base = 5 + targetGrade;
    let mult;
    if (inGroup)       mult = withOrdeal ? 1.5 : 2;
    else               mult = withOrdeal ? 2.5 : 3;
    return Math.floor(base * mult);
  };

  const isAdept = ['Physical Adept','Human Physical Adept','Metahuman Physical Adept']
    .includes(props.magicalChoice);

  const handleInitiate = () => {
    if (!pendingBenefit) return;
    if (pendingBenefit === 'metamagic' && !pendingMetamagic) return;
    const nextGrade = initiateGrade + 1;
    const cost = calcInitiationCost(nextGrade, useGroup && !!magicalGroup, useOrdeal);
    const newEntry = {
      grade: nextGrade,
      benefit: pendingBenefit,
      metamagicName: pendingBenefit === 'metamagic' ? pendingMetamagic : '',
    };
    const newGrade = nextGrade;
    const newInitiations = [...initiations, newEntry];
    setInitiateGrade(newGrade);
    setInitiations(newInitiations);
    setPendingMetamagic('');
    props.onSpendKarma?.(cost);
    props.onChangeInitiations?.(newGrade, newInitiations);
  };

  const handleRemoveLastInitiation = () => {
    if (initiations.length === 0) return;
    const last = initiations[initiations.length - 1];
    const cost = calcInitiationCost(last.grade, useGroup && !!magicalGroup, false);
    const newGrade = initiateGrade - 1;
    const newInitiations = initiations.slice(0, -1);
    setInitiateGrade(newGrade);
    setInitiations(newInitiations);
    props.onSpendKarma?.(-cost);
    props.onChangeInitiations?.(newGrade, newInitiations);
  };

  const saveGroup = () => {
    setMagicalGroup(groupDraft);
    setUseGroup(true);
    setEditingGroup(false);
    props.onChangeMagicalGroup?.(groupDraft);
  };

  const removeGroup = () => {
    setMagicalGroup(null);
    setUseGroup(false);
    props.onChangeMagicalGroup?.(null);
  };

  const ALL_STRICTURES = [
    'Attendance','Belief','Deed','Exclusive Membership','Exclusive Ritual',
    'Fraternity','Geasa','Obedience','Sacrifice','Secrecy',
    'Limited Membership','Material Link','Oath',
  ];

  const toggleStricture = (s) => {
    const cur = groupDraft.strictures ?? [];
    const next = cur.includes(s) ? cur.filter(x => x !== s) : [...cur, s];
    setGroupDraft({ ...groupDraft, strictures: next });
  };

  const RenderInitiationSection = () => {
    const nextGrade = initiateGrade + 1;
    const inGroup = useGroup && !!magicalGroup;
    const cost = calcInitiationCost(nextGrade, inGroup, useOrdeal);
    const metamagicList = MetaMagic[props.Edition] ?? MetaMagic['SR3'];
    const learnedMeta = initiations.filter(i => i.benefit === 'metamagic').map(i => i.metamagicName);
    const availableMeta = metamagicList.filter(m => !learnedMeta.includes(m.Name));

    return (
      <>
        <hr />
        <h3>Initiation</h3>

        {/* Current grade summary */}
        <Box sx={{ mb: 2 }}>
          <strong>Grade:</strong> {initiateGrade}&nbsp;&nbsp;
          <strong>Astral Pool:</strong> {initiateGrade} dice&nbsp;&nbsp;
          {isAdept
            ? <strong>Bonus Power Points: {initiateGrade}</strong>
            : <strong>Magic bonus from initiation: +{initiateGrade}</strong>
          }
        </Box>

        {/* Earned initiations list */}
        {initiations.length > 0 && (
          <TableContainer component={Paper} sx={{ mb: 2, maxWidth: 550 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Grade</TableCell>
                  <TableCell>Benefit</TableCell>
                  <TableCell>Detail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {initiations.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.grade}</TableCell>
                    <TableCell style={{ textTransform: 'capitalize' }}>{row.benefit}</TableCell>
                    <TableCell>{row.metamagicName || '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Buy next initiation */}
        <Box sx={{ border: '1px solid #444', borderRadius: 1, p: 2, maxWidth: 500, mb: 2 }}>
          <strong>Next Initiation — Grade {nextGrade}</strong>
          <Box sx={{ mt: 1 }}>
            <FormControlLabel
              control={<Checkbox checked={inGroup} onChange={e => setUseGroup(e.target.checked)} disabled={!magicalGroup} />}
              label={magicalGroup ? `Group initiation (${magicalGroup.name})` : 'Group initiation (no group set)'}
            />
            <FormControlLabel
              control={<Checkbox checked={useOrdeal} onChange={e => setUseOrdeal(e.target.checked)} />}
              label="Ordeal (reduces cost by ×0.5)"
            />
          </Box>
          <Box sx={{ mt: 1, mb: 1 }}>
            <strong>Karma cost: {cost}</strong>
            {useOrdeal && <span style={{ fontSize: '0.8em', color: '#888' }}> (with ordeal)</span>}
          </Box>
          <Box sx={{ mt: 1 }}>
            <strong>Benefit:</strong>{' '}
            <select value={pendingBenefit} onChange={e => setPendingBenefit(e.target.value)}
              style={{ marginLeft: 8 }}>
              <option value="metamagic">Learn Metamagic</option>
              <option value="geas">Shed a Geas</option>
              <option value="signature">Alter Astral Signature</option>
            </select>
          </Box>
          {pendingBenefit === 'metamagic' && (
            <Box sx={{ mt: 1 }}>
              <FormControl size="small" style={{ minWidth: 220 }}>
                <InputLabel>Metamagic Technique</InputLabel>
                <Select value={pendingMetamagic} onChange={e => setPendingMetamagic(e.target.value)}
                  label="Metamagic Technique">
                  {availableMeta.map(m => (
                    <MenuItem key={m.Name} value={m.Name}>{m.Name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleInitiate}
              disabled={pendingBenefit === 'metamagic' && !pendingMetamagic}>
              Spend {cost} Karma &amp; Initiate to Grade {nextGrade}
            </Button>
            {initiations.length > 0 && (
              <Button color="secondary" sx={{ ml: 2 }} onClick={handleRemoveLastInitiation}>
                Undo Last Initiation
              </Button>
            )}
          </Box>
        </Box>

        {/* Magical Group */}
        <h3>Magical Group</h3>
        {!magicalGroup && !editingGroup && (
          <Button variant="outlined" onClick={() => { setGroupDraft(blankGroup); setEditingGroup(true); }}>
            Join / Found a Group
          </Button>
        )}
        {magicalGroup && !editingGroup && (
          <Box sx={{ border: '1px solid #666', borderRadius: 1, p: 2, maxWidth: 500 }}>
            <strong>{magicalGroup.name}</strong>
            <Box sx={{ fontSize: '0.85em', mt: 0.5 }}>
              <div>Type: {magicalGroup.type}</div>
              <div>Resources: {magicalGroup.resources}</div>
              {magicalGroup.patron && <div>Patron: {magicalGroup.patron}</div>}
              {magicalGroup.strictures?.length > 0 && (
                <div>Strictures: {magicalGroup.strictures.join(', ')}</div>
              )}
              <div style={{ color: '#888', fontSize: '0.9em', marginTop: 4 }}>
                Group initiation: base × 2 (× 1.5 with ordeal)
              </div>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Button size="small" onClick={() => { setGroupDraft({ ...magicalGroup }); setEditingGroup(true); }}>
                Edit
              </Button>
              <Button size="small" color="secondary" sx={{ ml: 1 }} onClick={removeGroup}>
                Leave Group
              </Button>
            </Box>
          </Box>
        )}
        {editingGroup && (
          <Box sx={{ border: '1px solid #666', borderRadius: 1, p: 2, maxWidth: 500 }}>
            <TextField size="small" fullWidth label="Group Name" value={groupDraft.name}
              onChange={e => setGroupDraft({ ...groupDraft, name: e.target.value })}
              sx={{ mb: 1 }} />
            <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
              <FormControl size="small" style={{ minWidth: 160 }}>
                <InputLabel>Type</InputLabel>
                <Select value={groupDraft.type} label="Type"
                  onChange={e => setGroupDraft({ ...groupDraft, type: e.target.value })}>
                  <MenuItem value="Initiatory">Initiatory</MenuItem>
                  <MenuItem value="Dedicated">Dedicated</MenuItem>
                  <MenuItem value="Conspiratorial">Conspiratorial</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" style={{ minWidth: 160 }}>
                <InputLabel>Resources</InputLabel>
                <Select value={groupDraft.resources} label="Resources"
                  onChange={e => setGroupDraft({ ...groupDraft, resources: e.target.value })}>
                  {['Street','Squatter','Low','Middle','High','Luxury'].map(r => (
                    <MenuItem key={r} value={r}>{r}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField size="small" fullWidth label="Patron (optional)" value={groupDraft.patron}
              onChange={e => setGroupDraft({ ...groupDraft, patron: e.target.value })}
              sx={{ mb: 1 }} />
            <Box sx={{ mb: 1 }}>
              <strong style={{ fontSize: '0.85em' }}>Strictures:</strong>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
                {ALL_STRICTURES.map(s => (
                  <FormControlLabel key={s} label={s} sx={{ width: '48%' }}
                    control={
                      <Checkbox size="small"
                        checked={(groupDraft.strictures ?? []).includes(s)}
                        onChange={() => toggleStricture(s)} />
                    } />
                ))}
              </Box>
            </Box>
            <Box>
              <Button variant="contained" size="small" onClick={saveGroup}
                disabled={!groupDraft.name.trim()}>Save Group</Button>
              <Button size="small" sx={{ ml: 1 }} onClick={() => setEditingGroup(false)}>Cancel</Button>
            </Box>
          </Box>
        )}
      </>
    );
  };

  return (
    <div>
      <h3>Magical Talents ( {props.magicalChoice} )</h3>
      {renderTraditionList()}
      <hr></hr>
      {RenderWindow()}
      {RenderFociList()}
      {props.magicalChoice !== 'Not Magical' && RenderInitiationSection()}
      {(props.magicalChoice === 'Full Magician' ||
        props.magicalChoice === 'Human Full Magician' ||
        props.magicalChoice === 'Metahuman Full Magician') && (
        <AllySection
          ally={props.ally}
          onChangeAlly={props.onChangeAlly}
          creatorIntelligence={props.creatorIntelligence}
          creatorWillpower={props.creatorWillpower}
          onSpendKarma={props.onSpendKarma}
        />
      )}
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
