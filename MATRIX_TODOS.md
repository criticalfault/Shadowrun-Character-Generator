# Matrix Book — SR3 Character Creator TODOs

Reference: *The Matrix* (SR3 supplement, 2000). All rules are SR3-only unless noted.

---

## DECKING PANEL

### Done
- [x] SearchableSelect on cyberdeck and program dropdowns
- [x] All direct state mutations fixed (addProgram, removeProgram, handlePersonaChange, handleProgramRatingChange, handleProgramToggle)
- [x] Persona cap enforced: total Bod+Evasion+Masking+Sensor ≤ MPCP × 3

### TODO
- [ ] **Hacking Pool display** — show `(MPCP + INT) ÷ 3` (round down) on the deck card (book p.26)
- [ ] **Matrix Reaction display** — show the decker's Matrix Reaction. Running pure DNI: Reaction = INT. Otherwise: normal Reaction. Response Increase adds +2 per level (book p.20, p.160)
- [ ] **Matrix Initiative display** — `Matrix Reaction + Response Increase bonus + hot ASIST bonus + DNI bonus` + dice. Cap: +10 Reaction, +5D6 total (book p.24)
- [ ] **Response Increase cap** — enforce max RI level = `floor(MPCP ÷ 4)`, max 3 levels. Currently the deck JSON stores it but the panel doesn't validate this (book p.20)
- [ ] **Program cost table** — The current `ProgramCosts` lookup table (100/100/100/200/200/200/500...) needs verification against book p.94. Book says cost = Rating² × Multiplier × cost-per-Mp (varies by rating bracket). Confirm the table matches.
- [ ] **Program size display** — The Program Size Table (book p.78) is `Rating² × Multiplier`. This is already computed correctly (`Rating * Rating * Multiplyer`). ✓
- [ ] **Programming calculator tab/section** — Major new feature (see Programming section below)
- [ ] **Memory vs Storage distinction** — Active Memory (programs currently loaded) vs Storage Memory (all programs on chip). Currently tracked correctly with Loaded checkbox. ✓

---

## PROGRAMMING (New Feature — Decker)

This is the big one from the book. Deckers can design and program their own utilities.

### Key formulas (book p.76–82)
- **Program Size** = `Rating² × Multiplier` (already used in program display)
- **Base Programming Time** = Size in days
- **Computer Test** = Computer (Programming) skill vs unmodified program rating
- **Task Period** = Base Time ÷ successes
- **Modifiers to test TN**:
  - Computer has double required memory: –2
  - Each success from program plan: –1
  - No program plan: +2
  - Mainframe (blue/green/orange/red): –1/–2/–3/–4
- **Program Plan** — reduces TN by 1 per success; takes `(rating + options) × multiplier` hours
- **Max rating** a character can program = their Computer (Programming) skill

### What to build
- [ ] **Programming Calculator** panel/tab for SR3 deckers
  - Input: program type (select from Programs.json list), desired rating, options
  - Output: program size (Mp), base time (days), estimated time (if skill known)
  - Optionally: show if character has enough memory
  - Reference: Programs.json multipliers already defined
- [ ] **Track owned source code** — programs the character has *designed* (vs bought). Source code is needed to upgrade later.
- [ ] **Upgrade time calculator** — (new size base time) − (current size base time). Minimum = 25% of scratch time.

---

## OTAKU PANEL

### Done
- [x] Living Persona table formulas verified against book (MPCP, Bod, Sensor, Masking, Evasion, Hardening, Matrix Reaction, Matrix Initiative, I/O Speed)
- [x] Hacking Pool: `(MPCP + INT) ÷ 3` round down
- [x] Free complex forms at char gen: `Computer(Programming) × 50 Mp`
- [x] Starting channel points = MPCP
- [x] Path descriptions corrected (Cyberadept / Technoshaman)
- [x] Complex form size: `Rating² × Multiplier` ✓
- [x] SearchableSelect on complex forms modal
- [x] Armor row delete button removed (permanent free form)

### TODO
- [ ] **Sprites section** — "Still Pending". Rules from book p.141:
  - Frame core is a complex form with multiplier 5
  - Persona Points = frame core rating × 3 (divide among Bod/Evasion/Masking/Sensor; no attribute > core rating)
  - Frame Points = frame core rating × 4 (used for Pilot rating, Initiative dice, complex form payload)
  - Pilot rating: each point costs 2 Frame Points; max = otaku's Computer(Programming) skill; min 1
  - Initiative dice: auto 1D6; extra dice cost 3 Frame Points each; max 4D6 total
  - Complex form payload: 1 point per Frame Point; combined CF ratings ≤ payload
  - Karma cost to create = frame core rating (Good Karma Points)
  - Build a sprite designer UI (probably a modal similar to complex forms)
- [ ] **Submersion / Echoes tracker** — book p.143–146
  - Track submersion grade (1+)
  - Cost per dive: `(grade × 2) + 10` Karma Points
  - Echoes (incremental): Improved I/O Speed (+100 Mp, max INT×200), Improved Hardening (+1, max WIL), Improved MPCP (+1, max INT×2), Improved Persona (+1 to one attribute, max MPCP×1.5), Improved Reaction (+1, max MPCP×1.5)
  - Echoes (static, once each): Daemon Summoning, Ghosting (+1 DF), Info Sortilage, Neurofilter, Overclock (+1D6 init, max +5D6), Resonance Link (repeatable), Switch, Traceroute
  - Track which echoes the character has
- [ ] **Detection Factor display** — `ceil((Masking + Sleaze) ÷ 2) + 1` (otaku get +1 bonus, book p.137). Need to determine how Sleaze is tracked/available.
- [ ] **Tribe / Resources tracking** — free complex forms = `Computer(Programming) × 50 Mp` + `+50 Mp per tribe resource level above Squatter`. Currently only the base formula is shown; tribe resources level not tracked.
- [ ] **Channel skill display** — show the 5 channel skills (Access/Control/Index/Files/Slave) and their current ratings pulled from the character's skills list.
- [ ] **Complex form karma cost display** — currently shows "X Karma" but should clarify this is the cost *to create* the form (1 Good Karma per form, book p.139), not an ongoing cost.
- [ ] **Fading tracker** — when character age ≥ 21, show Fading Test reminder: roll `(submersion grade + 1)` dice vs TN `5 + (age - 21)` annually (book p.146).

---

## GENERAL MATRIX / SHEET DISPLAY

- [ ] **Matrix stats on Sheet Display** — when a character has a deck selected, show a brief Matrix block (MPCP, persona attributes, hacking pool, programs loaded). Similar to how Living Persona shows for Otaku.
- [ ] **Program list on Sheet Display** — list programs loaded into active memory with their ratings and sizes.
- [ ] **Cyberdeck nuyen cost** — decks already deduct cost. Programs also deduct (CalcTotalNuyenSpent already handles this). ✓

---

## DATA FILES (SR3)

- [ ] **SR3 Programs.json** — verify all programs exist and have correct multipliers vs book p.68–73
- [ ] **SR3 Cyberdeck.json** — verify deck stats (MPCP, Hardening, Memory, Storage, I/O, Response Increase) against Matrix book tables p.160
- [ ] **SR3 ComplexForms.json** — appears to be same as SR2; verify multipliers against SR3 rules (complex forms use same multipliers as equivalent utilities, book p.139)

---

## PRIORITY ORDER SUGGESTION

1. **Programming Calculator** — most impactful new feature for deckers
2. **Sprites UI** — completes Otaku panel
3. **Submersion/Echoes tracker** — important Otaku advancement feature
4. **Matrix stats on Sheet Display** — presentation polish
5. **Tribe/resources tracking** — minor but affects char gen free Mp
6. **Data file audit** — SR3 deck/program verification
