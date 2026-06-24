import json, re

# ── Gear.json ──────────────────────────────────────────────────────────────
with open('src/data/SR2/Gear.json', 'r', encoding='utf-8-sig') as f:
    gear = json.load(f)

known_gear   = {}
unknown_gear = {}

for cat_key, cat_val in gear.items():
    known_entries   = []
    unknown_entries = []
    for entry in cat_val.get('entries', []):
        bp = entry.get('BookPage', '')
        # treat both ssc.??? and already-unknown as unknown
        if bp in ('ssc.???', 'unknown'):
            entry['BookPage'] = 'unknown'
            unknown_entries.append(entry)
        else:
            known_entries.append(entry)

    if known_entries:
        known_cat = dict(cat_val)
        known_cat['entries'] = known_entries
        known_gear[cat_key] = known_cat

    if unknown_entries:
        unknown_cat = dict(cat_val)
        unknown_cat['entries'] = unknown_entries
        unknown_gear[cat_key] = unknown_cat

print(f"Gear  known cats: {len(known_gear)}, unknown cats: {len(unknown_gear)}")
total_unknown = sum(len(v['entries']) for v in unknown_gear.values())
total_known   = sum(len(v['entries']) for v in known_gear.values())
print(f"Gear  known entries: {total_known}, unknown entries: {total_unknown}")

with open('src/data/SR2/Gear.json', 'w', encoding='utf-8', newline='') as f:
    json.dump(known_gear, f, indent=2, ensure_ascii=False)

with open('src/data/SR2/GearUnknown.json', 'w', encoding='utf-8', newline='') as f:
    json.dump(unknown_gear, f, indent=2, ensure_ascii=False)

print("Gear.json and GearUnknown.json written.")

# ── Firearms.json ──────────────────────────────────────────────────────────
# Skip if FirearmsUnknown.json already exists and has entries
import os
if os.path.exists('src/data/SR2/FirearmsUnknown.json'):
    with open('src/data/SR2/FirearmsUnknown.json', 'r', encoding='utf-8') as f:
        existing = json.load(f)
    if existing:
        print(f"FirearmsUnknown.json already has {len(existing)} entries, skipping.")
        exit(0)

with open('src/data/SR2/Firearms.json', 'r', encoding='utf-8-sig') as f:
    firearms = json.load(f)

known_firearms   = []
unknown_firearms = []

for entry in firearms:
    bp = entry.get('BookPage', '')
    if bp in ('ssc.???', 'unknown'):
        entry['BookPage'] = 'unknown'
        unknown_firearms.append(entry)
    else:
        known_firearms.append(entry)

print(f"Firearms known: {len(known_firearms)}, unknown: {len(unknown_firearms)}")

with open('src/data/SR2/Firearms.json', 'w', encoding='utf-8', newline='') as f:
    json.dump(known_firearms, f, indent=2, ensure_ascii=False)

with open('src/data/SR2/FirearmsUnknown.json', 'w', encoding='utf-8', newline='') as f:
    json.dump(unknown_firearms, f, indent=2, ensure_ascii=False)

print("Firearms.json and FirearmsUnknown.json written.")
