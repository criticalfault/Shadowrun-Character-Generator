# Shadowrun Character Generator — Open TODOs

Last updated: 2026-06-29 (session 2)

---

## Recently Completed

- [x] **SR3 Spell Designer tab** — full MitS spell design rules (10-step process, drain power/level modifiers, overflow handling, design test TN, base design time). SR3 magicians/shamans can design and add custom spells. PR #179
- [x] **Totem BookPage tags** — all totems in `Totems.json` tagged with source page: MitS animal totems (mits.152–163), MitS non-animal totems (mits.157–161), LOA (mits.162–163), SR3 core animal totems Bear/Buffalo (sr3.163), Cat–Mouse (sr3.164), Owl–Wolf (sr3.166). PR #180
- [x] **Otaku tribe bonus to MP** — tribe membership grants +1 MP to Otaku characters. PR #179
- [x] **SR3 Programming language fixes** — corrected programming language data and Bug Test dice roller. PR #176
- [x] **Initiation / Metamagic** — confirmed fully implemented: karma cost formula (5+grade × multiplier), all 10 SR3 metamagics, magical group + strictures, ordeal modifier, grade benefits (metamagic/geas/signature), astral pool bonus.
- [x] **Sprites / Frames UI** — full sprite designer modal: frame core, Persona Points (core×3), Frame Points (core×4), Pilot/Initiative/CF payload allocation, add complex forms to payload, karma cost tracking. Confirmed in OtakuPanel.js.
- [x] **Submersion / Echoes tracker** — submersion grade tracking, karma cost `(grade×2)+10`, all incremental echoes (Improved I/O Speed, Hardening, MPCP, Persona, Reaction) and static echoes (Daemon Summoning, Ghosting, Info Sortilage, Neurofilter, Overclock, Resonance Link, Switch, Traceroute), undo support. Confirmed in OtakuPanel.js.
- [x] **Tribe resource level** — tribe registration UI, resource level affects free complex form Mp calculation. Confirmed in OtakuPanel.js.

---

## Otaku Panel (SR3)

All major features confirmed implemented. No open items.

---

## Sheet Display / Play-at-the-Table Features

- [ ] **One-click dice rolls on the sheet** — attributes and skills already have click-to-roll. Extend to dice pool chips (Combat Pool, Hacking Pool, etc.) so a player can roll directly from the sheet without entering pool size manually
- [ ] **Condition monitor on sheet** — interactive physical/stun boxes directly on the sheet display (currently separate tab). Should update damage state that persists with the character
- [ ] **Lifestyles on sheet** — show active lifestyle(s) in the sheet display (currently only in gear tab)

---

## Karma Advancement

- [ ] **Full karma advancement panel** — current `KarmaSkillAdvancement.js` handles skills. Expand to cover: attribute advancement (SR3: `new rating × 1.5` karma, round up), new skill purchase, specialization, spell learning (SR3: rating Force karma), initiation/submersion. Needs a proper post-chargen "advancement" mode distinct from chargen point-buy.

---

## Data — Page Numbers (display/reference only, no functionality impact)

- [ ] `ssc.???` — Street Samurai Catalog: ~1,400 items (cyberware, adept powers, firearms, gear) have correct book code but unknown page numbers. Needs SSC OCR or manual lookup.
- [ ] `gm2.???` — The Grimoire 2nd Ed: 188 spells. Need Grimoire 2nd Ed OCR.
- [ ] `fof.???` — Fields of Fire: ~60 gear/ammo/rocket items.
- [ ] `rbb.???` — Rigger Black Box: 4 Sentinel Pod entries.
- [ ] `grm` vs `gm2` reconciliation — both exist in Books.json for The Grimoire; data uses `grm` for confirmed Grimoire (SR2) content and `gm2` for unconfirmed Grimoire 2nd Ed spells. May overlap — resolve when Grimoire 2nd Ed OCR is available.

---

## SR3 Programming

- [ ] **Program cost table verification** — the `ProgramCosts` lookup table in `ProgrammingCalculator.js` may not match Matrix p.94 exactly (cost = Rating² × Multiplier × cost-per-Mp, varies by rating bracket). Verify and correct if needed.

---

## Codebase Cleanup

- [ ] **Delete `src/data/SR2/SpellsWithCats.json`** — unused file, not imported anywhere. Uses a legacy schema (`SR2.???` format). Safe to remove.
- [ ] **Resolve `SR3VehicleDesigner.js`** — component exists at `src/components/SR3VehicleDesigner.js` but is not wired into Dashboard. Determine if it should replace or supplement the existing Vehicle Designer for SR3.
- [ ] **Retire `ProgramCalculatorModal.js`** — older quick-calc modal predating the full `ProgrammingCalculator.js`. Confirm nothing still uses it and remove.

---

## SR2 Data Audit

- [ ] **`awk` — Awakenings** — adept powers, totems, critters. No OCR yet.
- [ ] **`gm2` — The Grimoire 2nd Ed** — 188 spells currently tagged `gm2.???`. Need OCR to get page numbers.
- [ ] **Other SR2 books in Books.json** not yet audited: `cs` (Corporate Security), `pna` (Paranormal Animals of NA), `src` (Shadowrun Companion), `sb` (Shadowbeat), `pl` (Paradise Lost), `n/sl` (NERPS: ShadowLore).

---

## Nice-to-Have / Future

- [ ] **SR2 gear book filtering** — SR2 gear is still missing all-book filtering support (noted in app changelog). Gear shows but filtering by book doesn't work for SR2.
- [ ] **Magical libraries (SR2)** — listed as planned in changelog but not yet done for SR2 (SR3 already has it).
- [ ] **Public sheet improvements** — `PublicSheetPage` exists but may be missing some sections added since it was written (e.g. custom decks, new vehicle mod display).
- [ ] **Test coverage** — test suite is minimal and acknowledged as a work in progress. Key panels (DeckingPanel, OtakuPanel, GearPanel) have no tests.
