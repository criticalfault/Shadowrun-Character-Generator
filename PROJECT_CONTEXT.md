# Shadowrun Character Generator — Project Context

> Hand this document to a new Claude instance to get up to speed without reading the codebase.  
> Last updated: 2026-06-23

---

## What This Is

A web-based character generator for **Shadowrun 2nd Edition (SR2)** and **Shadowrun 3rd Edition (SR3)** tabletop RPG. It covers the full character creation workflow — priorities/point-buy, attributes, skills, cyberware, gear, magic, decking, vehicles, contacts — and also outputs a printable character sheet. There is no backend; everything runs in the browser.

The live app is hosted via Firebase. The repo is at `https://github.com/criticalfault/Shadowrun-Character-Generator`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (functional components + hooks throughout) |
| Build tool | Vite 5 |
| UI library | MUI v7 (Material UI) — `@mui/material`, `@mui/icons-material` |
| Dice | `@3d-dice/dice-box` (3D animated dice) + `@dice-roller/rpg-dice-roller` |
| Auth / hosting | Firebase 11 (`firebase/auth`, `firebase/analytics`) |
| Analytics | GA4 via `window.gtag` (thin wrapper in `src/analytics.js`) |
| Error tracking | Sentry (`@sentry/react`) |
| Drag-and-drop | `react-beautiful-dnd` |
| Routing | `react-router-dom` v7 |
| Tests | Jest + `@testing-library/react` |
| Language | JavaScript (no TypeScript) |

---

## Repository Structure

```
src/
├── App.js                          # Root: router, Firebase init, Sentry boundary
├── analytics.js                    # GA4 event helpers (all tracking calls go here)
├── components/
│   ├── Dashboard.js                # ★ Central hub — all tabs, all state, edition switching
│   ├── DrawerAppBar.js             # Top nav bar
│   ├── LoadCharacter.js            # Save/load: file export, localStorage slots, Firebase cloud
│   ├── SheetDisplay.js             # Printable character sheet assembler
│   ├── Sheet/                      # Individual sheet section components (read-only display)
│   │   ├── AttributesBlock.js
│   │   ├── SkillsBlock.js
│   │   ├── WeaponsTable.js
│   │   ├── ArmorTable.js
│   │   ├── CyberwareTable.js
│   │   ├── GearTable.js
│   │   ├── LifestylesTable.js
│   │   ├── SpellsTable.js
│   │   ├── FociTable.js
│   │   ├── VehiclesTable.js
│   │   ├── DronesTable.js
│   │   ├── CustomWeaponsTable.js
│   │   ├── CustomVehiclesTable.js
│   │   ├── CustomDecksTable.js
│   │   ├── CyberdeckTable.js
│   │   ├── ConditionMonitorBlock.js
│   │   ├── ConditionMonitorBlockCyberDeck.js
│   │   ├── PersonaConditionMonitor.js
│   │   ├── VehicleConditionMonitor.js
│   │   ├── DicePools.js
│   │   ├── AllyTable.js
│   │   ├── PhysicalAdeptPowers.js
│   │   └── RunnerInfo.js
│   ├── PriorityPanel.js            # SR3 priority system
│   ├── PointBuyPanel.js            # SR2 point-buy system
│   ├── AttributesPanel.js          # Attribute spending
│   ├── SR2SkillsPanel.js           # SR2 skills (active/language/knowledge)
│   ├── SR3SkillsPanel.js           # SR3 skills
│   ├── MagicPanel.js               # Spells, foci, traditions, totems
│   ├── OtakuPanel.js               # Otaku / complex forms
│   ├── CyberwarePanel.js           # Cyberware + bioware
│   ├── GearPanel.js                # Weapons, armor, gear, lifestyles
│   ├── DeckingPanel.js             # Cyberdeck + programs
│   ├── VehiclesPanel.js            # Vehicles + drones
│   ├── ContactsPanel.js            # Contacts
│   ├── KarmaDisplay.js             # Karma totals display
│   ├── KarmaSkillAdvancement.js    # Post-chargen karma spend
│   ├── ConditionMonitor.js         # Physical/stun monitor (editable)
│   ├── LifestyleBuilderModal.js    # Lifestyle purchase modal
│   ├── VehicleDesigner.js          # SR2 custom vehicle builder
│   ├── SR3VehicleDesigner.js       # SR3 custom vehicle builder (Rigger 3 rules)
│   ├── WeaponDesigner.js           # Custom weapon builder
│   ├── WeaponModsModal.js          # Weapon mod picker modal
│   ├── CyberdeckDesigner.js        # SR2 cyberdeck builder (VR2 rules)
│   ├── MatrixCyberdeckDesigner.js  # SR3 + C² cranial cyberterminal designer
│   ├── ProgrammingCalculator.js    # SR3 programming calculator (4 sub-tabs)
│   ├── SR2ProgrammingCalculator.js # SR2 programming calculator (VR2 rules, 4 sub-tabs)
│   ├── ProgramCalculatorModal.js   # Quick program time modal (older, still present)
│   ├── AllySection.js              # Ally spirit section
│   ├── EdgesFlawsPanel.js          # SR3 edges & flaws
│   ├── FinalizedBox.js             # Post-finalization locked view
│   ├── ChargenBox.js               # Running chargen point totals display
│   ├── IdentityPanel.js            # Name, metatype, race, misc identity fields
│   ├── SignInPopup.js              # Firebase auth UI
│   ├── PublicSheetPage.js          # Shareable public sheet (read-only URL)
│   └── firebase.js                 # Firebase app + analytics init
├── data/
│   ├── Books.json                  # All sourcebook codes, names, editions
│   ├── SR2/                        # SR2 game data
│   │   ├── Firearms.json
│   │   ├── Gear.json
│   │   ├── Cyberware.json
│   │   ├── Bioware.json
│   │   ├── Cyberdeck.json
│   │   ├── Programs.json
│   │   ├── VirtualRealityPrograms.json
│   │   ├── Vehicles.json
│   │   ├── VehicleMods.json
│   │   ├── Drones.json
│   │   ├── Skills.json
│   │   ├── Spells.json
│   │   ├── AdeptPowers.json
│   │   ├── Totems.json
│   │   ├── ComplexForms.json
│   │   ├── LanguageSkills.json
│   │   ├── OtakuSkills.json
│   │   ├── Rigger2.json            # Rigger 2 vehicle/weapon data
│   │   ├── ProgrammingRules.js     # SR2/VR2 programming helpers + data
│   │   └── VR2CyberdeckDesign.js   # SR2 cyberdeck construction data
│   └── SR3/                        # SR3 game data (parallel structure)
│       ├── ActiveSkills.json
│       ├── Firearms.json
│       ├── Gear.json               # Includes Miscellaneous Components (sr3.302)
│       ├── Cyberware.json
│       ├── Bioware.json
│       ├── Cyberdeck.json
│       ├── CyberdeckParts.json
│       ├── Programs.json
│       ├── Vehicles.json
│       ├── VehicleMods.json
│       ├── VehicleGear.json
│       ├── VehicleWeapons.json
│       ├── Drones.json
│       ├── Spells.json
│       ├── AdeptPowers.json
│       ├── Totems.json
│       ├── EdgesAndFlaws.json
│       ├── SSGIDEdgesFlaws.json
│       ├── SSGLifestyleEdgesFlaws.json
│       ├── Lifestyles.json
│       ├── LanguageSkills.json
│       ├── WeaponMods.json
│       ├── MatrixCyberdeckDesign.js  # SR3 deck construction data
│       ├── ProgrammingRules.js       # SR3 programming helpers + language data
│       ├── Rigger3Chassis.js
│       ├── Rigger3Mods.js
│       ├── Rigger3PowerPlants.js
│       ├── Rigger3VehicleWeapons.js
│       ├── WeaponFrames.js
│       ├── WeaponModifications.js
│       └── WeaponOptions.js
├── dice/
│   ├── DiceContext.js              # React context for dice state
│   ├── diceBoxManager.js           # @3d-dice/dice-box wrapper
│   ├── rollSR.js                   # SR dice pool logic (count successes ≥ TN)
│   └── useRollDice.js              # Hook: roll + show overlay
├── hooks/
│   └── useDicePreference.js        # 2D vs 3D dice preference
└── vehicle/
    ├── parseDat.js                 # Parser for .dat vehicle files
    ├── evalExpr.js                 # Expression evaluator for vehicle formulas
    └── vehicleData.js              # Parsed vehicle data cache
```

---

## Architecture

### State Management

There is **no Redux or Zustand**. All character state lives in a single large `Character` object in `Dashboard.js` via `useState`. Every panel receives what it needs as props and calls a setter passed down from Dashboard.

```js
// Simplified shape of Character
{
  name, age, metatype, race, gender,
  edition,                          // 'SR2' | 'SR3'
  bookTogglesSR3: { cc, mits, sr3, mm, mat, r3, ... },
  bookTogglesSR2: { sr2: true },
  characterTabs: {                  // which optional tabs are enabled
    VehicleDesigner, WeaponDesigner, CyberdeckDesigner, ProgrammingCalculator
  },
  attributes: { body, quickness, strength, charisma, intelligence, willpower, essence, magic, reaction },
  skills: [...],
  cyberware: [...],
  bioware: [...],
  gear: [...],
  firearms: [...],
  armor: [...],
  vehicles: [...],
  drones: [...],
  spells: [...],
  foci: [...],
  contacts: [...],
  programs: [...],
  cyberdeck: {...},
  lifestyles: [...],
  customVehicles: [...],    // from Vehicle Designer
  customWeapons: [...],     // from Weapon Designer
  customDecks: [...],       // from Cyberdeck Designer
  karma: 0,
  nuyen: 0,
  ...
}
```

### Edition Switching

`Edition` is a separate `useState` at the Dashboard level (not inside `Character`). When the user switches editions, both `Edition` state and `Character.Edition` are updated. Panels that differ between editions receive `Edition` as a prop and branch internally, or Dashboard renders a different component entirely:

```jsx
// Dashboard renders different components based on edition
{Edition === 'SR2' ? <SR2ProgrammingCalculator /> : <ProgrammingCalculator />}
{Edition === 'SR2' ? <SR2SkillsPanel /> : <SR3SkillsPanel />}
```

### Tab System

Dashboard uses MUI `Tabs` with integer indexes. Tabs 0–12 are always present. Tabs 13–16 are **optional** — controlled by `Character.characterTabs` flags:

| Index | Tab | Notes |
|---|---|---|
| 0 | Identity | Always shown |
| 1 | Priorities (SR3) / Point Buy (SR2) | Edition-conditional |
| 2 | Edges & Flaws (SR3 only) | |
| 3 | Attributes | |
| 4 | Skills | |
| 5 | Otaku or Magic | Mutually exclusive, character-type conditional |
| 6 | Cyberware | |
| 7 | Gear | |
| 8 | Decking | |
| 9 | Vehicles | |
| 10 | Contacts | |
| 11 | Karma | |
| 12 | Sheet Display | |
| 13 | Vehicle Designer | Optional, flag-gated |
| 14 | Weapon Designer | Optional, flag-gated |
| 15 | Cyberdeck Designer | Optional, flag-gated |
| 16 | Programming Calculator | Optional, flag-gated |

### Data Format

All JSON data files use a consistent item schema:

```json
{
  "Name": "Ares Predator II",
  "Cost": 450,
  "Availability": "4/48hrs",
  "Street Index": 1,
  "Legal": "Restricted",
  "BookPage": "sr3.285"
}
```

`BookPage` format is `{bookCode}.{pageNumber}` — e.g. `sr3.285`, `cc.14`, `vr2.107`. The `bookCode` matches keys in `Books.json`. Items with unknown page numbers use `{code}.???` as a placeholder.

Book toggles in the character (`bookTogglesSR2`, `bookTogglesSR3`) control which items appear in gear/cyberware/etc. pickers. Items are filtered client-side by checking whether their `BookPage` prefix is in the active toggle set.

### Save / Load

Three save mechanisms:
1. **File export** — JSON download via `URL.createObjectURL` (the primary format)
2. **localStorage** — 3 named slots
3. **Firebase cloud save** — tied to Google auth via `SignInPopup`

Character JSON includes the `edition` field so it restores correctly on load.

### Analytics

All GA4 events funnel through `src/analytics.js`. Never call `window.gtag` directly — always add a named export to that file. The wrapper silently swallows errors (blocked by ad blockers, etc.).

Current events:

| Event | Dimensions | Trigger |
|---|---|---|
| `character_saved` | `edition` | File export or localStorage save |
| `character_loaded` | — | File or localStorage load |
| `edition_changed` | `edition` | Edition dropdown change |
| `character_finalized` | `edition`, `race` | Finalizing character |
| `tab_viewed` | `tab_name` | Tab navigation |
| `dice_rolled` | `dice_count` | Any dice roll |
| `custom_vehicle_saved` | `edition` | Vehicle designer → Save |
| `custom_weapon_saved` | `edition` | Weapon designer → Save |
| `custom_deck_saved` | `edition` | Cyberdeck designer → Save |

### Dice System

Two dice modes selectable per user (`useDicePreference`):
- **2D mode** — `@dice-roller/rpg-dice-roller`, results shown in `DiceResultOverlay`
- **3D mode** — `@3d-dice/dice-box` (WebGL animated dice), managed by `diceBoxManager`

`rollSR.js` implements Shadowrun dice pool logic: roll N d6, count successes (≥ TN), handle rule-of-six (6s reroll and add). The `useRollDice` hook is consumed by sheet blocks (`AttributesBlock`, `SkillsBlock`) to trigger rolls from the sheet.

---

## What's Working

### Character Creation
- Full SR2 point-buy and SR3 priority selection
- All attributes, skills (active/language/knowledge), edges & flaws
- Metatype, race, gender, identity fields
- Karma tracking and post-chargen karma advancement (`KarmaSkillAdvancement`)

### Cyberware & Gear
- Cyberware and bioware (cyberware grades, essence costs)
- Full gear browser with book toggles — weapons, armor, gear, lifestyles, vehicles, drones, programs
- Weapon and vehicle mod modals
- Lifestyle builder modal

### Magic / Otaku
- Spells, foci, traditions, totems for all SR2/SR3 traditions
- Physical adept powers
- Otaku complex forms and skills
- Ally spirit section

### Designers (optional tabs)
- **Vehicle Designer** — SR2 rules + SR3 Rigger 3 rules (separate components, edition-conditional)
- **Weapon Designer** — custom weapon builder with mod selection
- **Cyberdeck Designer** — SR2 VR2 construction rules + SR3 Matrix book rules + SR3 C² cranial cyberterminal mode
- **Programming Calculator (SR3)** — 4 sub-tabs: Utility/IC Programs, Frames & Agents, Worms, Command Sets. IC rating multiplier auto-fill. Programming language effects shown inline.
- **Programming Calculator (SR2)** — 4 sub-tabs: Utility Programs (with upgrade mode + program prices), Frames (dumb/smart, attribute allocation, frame loading), Program Size Table, Command Sets (full VR2 rules). Source: VR2 pp.101–107.

### Sheet Display
- Printable sheet with all sections rendered: attributes, skills, dice pools, cyberware, bioware, gear, weapons, armor, vehicles, drones, spells, foci, lifestyles, condition monitors, ally, custom designs
- Shareable public sheet via URL (`PublicSheetPage`)
- Condition monitors (physical, stun, cyberdeck persona, vehicle)

### Dice
- Click-to-roll from AttributesBlock and SkillsBlock on the sheet
- Roll dialog asks for TN and pool size
- 2D (overlay) and 3D (WebGL) modes

---

## Known Incomplete / Broken

### Data Page Numbers
Many items have correct book codes but unknown page numbers (`???`). All functionality still works — these are display/reference gaps only.

| Code | Book | Scope |
|---|---|---|
| `ssc.???` | Street Samurai Catalog | ~1,400+ cyberware/adept powers/firearms/gear |
| `gm2.???` | The Grimoire 2nd Ed | 188 spells |
| `fof.???` | Fields of Fire | ~60 gear/ammo/rocket items |
| `rbb.???` | Rigger Black Box | 4 Sentinel Pod entries |

### `SpellsWithCats.json` (SR2)
Unused file at `src/data/SR2/SpellsWithCats.json`. Not imported anywhere. Can be safely deleted. Uses a different schema (capital `SR2.???` format) that predates the current convention.

### `grm` vs `gm2`
Both `grm` (The Grimoire) and `gm2` (The Grimoire 2nd Ed) exist in `Books.json`. Data uses `grm` for confirmed Grimoire content; 188 spells use `gm2` for unconfirmed Grimoire 2nd Ed content. These may overlap — needs reconciliation once Grimoire 2nd Ed OCR is available.

### SR3VehicleDesigner
Lives at `src/components/SR3VehicleDesigner.js` but is **not wired into Dashboard**. The generic `VehicleDesigner` at index 13 handles both editions. SR3VehicleDesigner exists as a standalone component — unclear whether it was intended as a replacement or an alternative entry point.

### ProgramCalculatorModal
`src/components/ProgramCalculatorModal.js` is an older quick-calc modal that predates `ProgrammingCalculator.js`. Still present in the codebase; its current usage scope is unclear.

---

## Key Design Decisions

### Single large `Character` object in Dashboard
Deliberately avoided Redux/Zustand to keep the codebase simple. All state passes as props. The downside is Dashboard.js is very large (~1,100 lines). Decision was made to live with this rather than introduce a state library.

### Edition rendered as two separate component trees, not flags
Rather than passing `edition` deep into every component and branching everywhere, edition-specific components (SR2SkillsPanel vs SR3SkillsPanel, SR2ProgrammingCalculator vs ProgrammingCalculator) are swapped at the Dashboard level. This keeps individual components clean but duplicates some structure.

### Designer tabs are opt-in
Vehicle Designer, Weapon Designer, Cyberdeck Designer, and Programming Calculator tabs are hidden by default and enabled via `Character.characterTabs` flags in the Identity panel. This prevents overwhelming new users.

### Book toggles filter gear client-side
Items are not split into separate files per book. Everything for an edition lives in one JSON file (e.g. `SR3/Gear.json`). Book toggles filter at render time by checking `item.BookPage` against the active book set. This makes adding new books easy (add items to the JSON, add the book to `Books.json`) but means large JSON files.

### BookPage convention: `{code}.{page}`
Page references format `sr3.285` / `vr2.107` / `ssc.???` serve double duty: they identify which book the item came from (for filtering) and provide the page citation for the user. The `???` placeholder keeps filtering working even when page numbers are unknown.

### Analytics wrapper pattern
`window.gtag` is never called directly. All calls go through named functions in `src/analytics.js`. This makes it easy to audit what's tracked, keeps event names consistent, and silently handles ad-blocker failures.

### No TypeScript
Project is plain JavaScript. Types are inferred by convention. If adding TypeScript, start with the data layer (`src/data/`) since schemas are well-defined.

---

## Active Branches (as of 2026-06-23)

| Branch | Status |
|---|---|
| `main` | Production |
| `feature/programming-calculator` | **Open PR #166** — SR2/SR3 programming calculators, cyberdeck designers, analytics events |
| `feature/shareable-sheet-links` | Shareable public sheet — status unknown |
| `feature/vehicle-designer` | Merged into main via PR #164 |
| `RiggerAudit` | SR2 book data audit work — largely complete, may have residual commits |

---

## Source Books Implemented

### SR2
Core book, Virtual Realities 2.0 (VR2), Street Samurai Catalog (SSC), Shadowtech, CyberTechnology, Fields of Fire, The Grimoire, Rigger 2, Street Samurai Catalog 2nd Ed, Paradise Lost, NERPS: ShadowLore

### SR3
Core book, Cannon Companion, Magic in the Shadows, Man and Machine, Matrix, Rigger 3, State of the Art 2063/2064, Seattle Sourcebook, Target: Awakened Lands, Target: Wastelands, Year of the Comet, Sprawl Survival Guide, plus various sourcebooks and Neo-Anarchist Guide to Everything Else issues

---

## Running Locally

```bash
npm install
npm start        # Vite dev server on localhost:5173
npm test         # Jest test suite
npm run build    # Production build
```

Firebase config is in `src/components/firebase.js`. Analytics and cloud save require the Firebase project to be configured — they fail silently in dev.
