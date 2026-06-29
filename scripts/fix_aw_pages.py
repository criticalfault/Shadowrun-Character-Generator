import json, re

# Book page = PDF page - 1 (confirmed offset for Awakenings)
# Mapping: name pattern -> book page
PAGE_MAP = [
    # aw.115
    ('Blind Fighting',          'aw.115'),
    ('Counterstrike',           'aw.115'),
    ('Delay Damage',            'aw.115'),
    # aw.116
    ('Distance Strike',         'aw.116'),
    ('Empathic Sense',          'aw.116'),
    ('Enhanced Coordination',   'aw.116'),
    ('Flexibility',             'aw.116'),
    ('FreeFall',                'aw.116'),
    # aw.117
    ('Iron Will',               'aw.117'),
    ('Magic Resistance',        'aw.117'),
    ('Magic Sense',             'aw.117'),
    ('Missile Mastery',         'aw.117'),
    ('Nerve Strike',            'aw.117'),
    ('Quick Draw',              'aw.117'),
    # aw.118
    ('Quick Strike',            'aw.118'),
    ('Rapid Healing',           'aw.118'),
    ('Rooting',                 'aw.118'),
    ('Sixth Sense',             'aw.118'),
    ('Smashing Blow',           'aw.118'),
    # aw.119
    ('Spell Shroud',            'aw.119'),
    ('Temperature Tolerance',   'aw.119'),
    ('Traceless Walk',          'aw.119'),
]

with open('src/data/SR2/AdeptPowers.json', 'r', encoding='utf-8-sig') as f:
    powers = json.load(f)

fixed = 0
for power in powers:
    if power.get('BookPage', '').strip() != 'aw.???':
        continue
    name = power['Name'].strip()
    for pattern, page in PAGE_MAP:
        if name.startswith(pattern):
            power['BookPage'] = page
            fixed += 1
            break

print(f"Fixed: {fixed}")
remaining = sum(1 for p in powers if p.get('BookPage') == 'aw.???')
print(f"Still aw.???: {remaining}")
if remaining:
    for p in powers:
        if p.get('BookPage') == 'aw.???':
            print(f"  UNMATCHED: {p['Name'].strip()}")

with open('src/data/SR2/AdeptPowers.json', 'w', encoding='utf-8', newline='\n') as f:
    json.dump(powers, f, indent=2, ensure_ascii=False)
print("Done.")
