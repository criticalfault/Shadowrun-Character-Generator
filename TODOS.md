# Shadowrun Character Generator — Open TODOs

Last updated: 2026-06-29

---

## Partial / Needs Finish

- [ ] **Tribe resource level Mp bonus** — OtakuPanel has tribe name, resource level (Squatter/Low/Middle/High/Luxury), and resonance well tracked, but the +50 Mp per resource level above Squatter is never added to the free complex form Mp total. One formula line missing.
- [ ] **Dice pool chip click-to-roll** — attributes and skills on the sheet already support click-to-roll. DicePools.js renders Combat Pool, Spell Pool, Hacking Pool, Control Pool, etc. as static tables with no onClick. Add the same `dice.openRoll()` handler so players can roll any pool directly from the sheet.
- [ ] **Karma advancement — specializations & initiation** — KarmaSkillAdvancement.js covers skill advancement, attribute +1, new skill purchase, and spell learning. Missing: skill specialization purchase, initiation (Initiate grade karma cost, metamagic selection), submersion handled separately in OtakuPanel but not linked here.

---

## Codebase Cleanup (safe deletes)

- [ ] **Delete `src/data/SR2/SpellsWithCats.json`** — not imported anywhere, uses legacy schema, safe to remove.
- [ ] **Delete `src/components/ProgramCalculatorModal.js`** — predates ProgrammingCalculator.js, not imported anywhere, safe to remove.
- [ ] **Resolve `src/components/SR3VehicleDesigner.js`** — exists but not wired into Dashboard.js. Either connect it or delete it; currently dead code.

---

## SR2 Gaps

- [ ] **SR2 gear book filtering** — SR3 gear filters by active book toggles; SR2 gear does not. GearPanel needs to apply the same `allowedBooks` filter for SR2 characters.
- [ ] **Magical libraries (SR2)** — SR3 already has magical library support in MagicPanel. SR2 does not. Listed in the app changelog as planned.

---

## Data — Page Numbers (reference only, no functionality impact)

- [ ] `ssc.???` — Street Samurai Catalog: ~1,400 items with correct book code but unknown page numbers. Needs SSC OCR.
- [ ] `gm2.???` — The Grimoire 2nd Ed: 188 spells. Needs Grimoire 2nd Ed OCR.
- [ ] `fof.???` — Fields of Fire: ~60 gear/ammo/rocket items.
- [ ] `rbb.???` — Rigger Black Box: 4 Sentinel Pod entries.
- [ ] `grm` vs `gm2` reconciliation — both exist in Books.json for The Grimoire. Resolve once Grimoire 2nd Ed OCR is available.

---

## SR2 Data Audit — Books Not Yet Audited

- [ ] `awk` — Awakenings (adept powers, totems, critters)
- [ ] `gm2` — The Grimoire 2nd Ed (188 spells at `gm2.???`)
- [ ] `cs`, `pna`, `src`, `sb`, `pl`, `n/sl` — in Books.json but not yet audited

---

## Nice-to-Have

- [ ] **SR3 program cost display** — ProgrammingCalculator shows size and time but not nuyen cost. Matrix p.94 gives cost = Rating² × Multiplier × cost-per-Mp (bracket by rating). Could add a cost column to the output.
- [ ] **Public sheet audit** — PublicSheetPage delegates to SheetDisplay and picks up most sections, but worth a full pass to confirm nothing new (custom decks, vehicle mods, etc.) is missing.
- [ ] **Test coverage** — DeckingPanel and GearPanel have no test files; OtakuPanel has a minimal stub. Low priority but worth expanding.
