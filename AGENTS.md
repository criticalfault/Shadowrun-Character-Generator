# AGENTS.md — Shadowrun Character Generator

This file defines AI agents for use with Claude Code against this repository.
Each agent has a clear role, scope, inputs, outputs, and known limitations.
Invoke an agent by pasting its **Invocation Prompt** into Claude Code.

---

## Agent Index

| Agent | Purpose | Primary Targets |
|---|---|---|
| [Rules Auditor](#rules-auditor) | Verify JSON data against sourcebook rules; fill `???` page numbers | `src/data/SR2/`, `src/data/SR3/` |

---

## Rules Auditor

### Role

The Rules Auditor verifies that items in the game data JSON files are accurate
and complete. It works through a target data file entry by entry, checking each
item against a provided sourcebook reference (PDF, OCR text, or pasted excerpt),
and produces a structured audit report of what passed, what failed, and what
still needs a human eye.

Its secondary job is resolving `???` page numbers. If it can confirm an item
exists on a specific page of the provided source material, it fills in the
correct `BookPage` value and flags it for commit.

### Scope

**In scope:**
- Any JSON file under `src/data/SR2/` or `src/data/SR3/`
- Verifying item stats against provided source material
- Filling in `???` page numbers when source material is available
- Flagging stat mismatches, missing fields, or schema inconsistencies
- Identifying duplicate entries

**Out of scope:**
- Inferring correct stats without source material (never guess)
- Modifying component logic or UI files
- Making judgment calls on ambiguous rules — flag for human review instead

### Known High-Priority Targets

These files have the most outstanding `???` page numbers:

| File | Book | Outstanding |
|---|---|---|
| `src/data/SR2/Cyberware.json` | Street Samurai Catalog (`ssc`) | ~1,400+ items |
| `src/data/SR2/AdeptPowers.json` | Street Samurai Catalog (`ssc`) | unknown |
| `src/data/SR2/Firearms.json` | Street Samurai Catalog (`ssc`) | unknown |
| `src/data/SR2/Spells.json` | The Grimoire 2nd Ed (`gm2`) | 188 spells |
| `src/data/SR2/Gear.json` | Fields of Fire (`fof`) | ~60 items |

### Data Schema Reference

All items follow this base schema. Additional fields vary by category.

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

`BookPage` format is `{bookCode}.{pageNumber}` — e.g. `sr3.285`, `ssc.47`, `vr2.107`.
Book codes are defined in `src/data/Books.json`.
Placeholder for unknown pages: `{bookCode}.???` — e.g. `ssc.???`.

### Audit Report Format

The agent outputs a markdown audit report for each run. Save it as
`audits/YYYY-MM-DD-{file}-audit.md`.

```markdown
# Audit: {filename} — {date}
Source material: {book name, edition, format}

## Summary
- Items audited: N
- Passed: N
- Failed (stat mismatch): N
- Page numbers resolved: N
- Flagged for human review: N
- Duplicates found: N

## Passed
- Item Name (BookPage confirmed: ssc.47)
- ...

## Failed — Stat Mismatches
### Item Name
- Field: Cost
- File value: 450
- Source value: 500
- Action: Update file

### ...

## Page Numbers Resolved
- Item Name: ssc.??? → ssc.47
- ...

## Flagged for Human Review
### Item Name
- Reason: Item appears in both `grm` and `gm2` — which edition is correct?

## Duplicates
- Item Name appears at index 14 and index 203 — verify and remove one
```

### Workflow

The agent runs in a loop over the target file. For each item:

1. **Read** the item from the JSON file
2. **Search** the provided source material for the item by name
3. **Compare** each field against the source (Name, Cost, Availability, stats)
4. **Classify** as: Pass / Fail / Needs Review
5. **Resolve** `???` page number if the item is found on a specific page
6. **Append** result to the audit report
7. **Move to next item**

After completing the file, the agent proposes a diff of suggested JSON changes
for human review before anything is written to disk.

**The agent never modifies JSON files directly without showing the diff first.**

### Invocation Prompt

Paste this into Claude Code to start a Rules Auditor session:

```
You are the Rules Auditor agent for the Shadowrun Character Generator.
Read AGENTS.md for your full role definition before doing anything else.

Your task today:
- Target file: src/data/SR2/Cyberware.json   ← change this to your target
- Source material: [paste OCR text here, or attach PDF]

Work through the file entry by entry. For each item:
1. Find it in the source material by name
2. Compare Name, Cost, Availability, Street Index, Legal, and any stat fields
3. Classify as Pass, Fail, or Needs Review
4. If BookPage is ???, resolve it if you can find the page
5. Never modify files — output a proposed diff at the end

Produce an audit report in the format defined in AGENTS.md.
Save it to audits/YYYY-MM-DD-{filename}-audit.md.

Do not guess stats. If you cannot find an item in the source material, flag it
as Needs Review and move on.
```

### Tips for Getting Good Results

- **Provide source material as OCR text when possible.** A PDF attachment works
  but OCR text in the prompt gives the agent faster, more reliable lookup.
- **Run one file at a time.** Large JSON files (1,400+ items) should be chunked
  into logical sections (e.g. by category or letter range) if context gets long.
- **Review the diff before committing.** The agent will propose changes — read
  them. It will occasionally misread a stat due to OCR artifacts.
- **Start with a small known-good section.** Before auditing all 1,400 SSC
  items, run 20 items you can verify manually. Confirm the agent's output is
  accurate before trusting it at scale.
- **The `grm` vs `gm2` problem is a human decision.** If the agent flags an
  item as appearing in both, you need to decide which book code is canonical.
  Do not let the agent resolve this automatically.

### Limitations

- The agent cannot read physical books — it needs digital source material.
- OCR quality affects accuracy. Low-quality scans will produce more false
  mismatches.
- It cannot resolve genuine rules ambiguities — those get flagged, not decided.
- Context window limits mean very large files need to be chunked manually.
