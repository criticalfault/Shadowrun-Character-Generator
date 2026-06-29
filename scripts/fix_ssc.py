import re

with open('src/data/SR2/Gear.json', 'r', encoding='utf-8') as f:
    content = f.read()

mappings = [
    ('Raecor Sting', 'fof.89'),
    ('Walther Palm Pistol', 'fof.89'),
    ('Streetline Special', 'fof.89'),
    ('AET NN8[^0-9]', 'fof.89'),
    ('AET Dealanach', 'fof.89'),
    ('Ares.?Light.?Fire 70', 'fof.89'),
    ('Beretta.?200ST', 'fof.89'),
    ('Beretta.?101T', 'fof.89'),
    ('Ceska.?vz.?120', 'fof.89'),
    ('Colt.?American.?L36', 'fof.89'),
    ('Executive Action', 'fof.89'),
    ('Fichetti.?Security.?500a', 'fof.89'),
    ('Fichetti.?Security.?500[^a]', 'fof.89'),
    ('Seco LD.?120', 'fof.89'),
    ('Ares.?Crusader', 'fof.89'),
    ('Ceska.?Black.?Scorpion', 'fof.89'),
    ('Ares.?Predator', 'fof.89'),
    ('Browning.?Ultra.?Power', 'fof.89'),
    ('Browning Max.?Power', 'fof.89'),
    ('Colt.?Manhunter', 'fof.89'),
    ('Hammerli.?610S', 'fof.89'),
    ('Remington.?Roomsweeper', 'fof.89'),
    ('Ruger.?Super.?Warhawk', 'fof.89'),
    ('Defiance.?Super.?Shock', 'fof.89'),
    ('Bracer\\b', 'fof.89'),
    ('Gun Cane\\b', 'fof.89'),
    ('Narcoject Pistol', 'fof.89'),
    ('Narcoject Rifle', 'fof.89'),
    ('Net Gun', 'fof.89'),
    ('Yamaha Pulsar', 'fof.89'),
    ('Tiffani.?Self.?Defender', 'fof.89'),
    ('Tiffani.?Needler', 'fof.89'),
    ('Walther PB.?120', 'fof.89'),
    ('Fichetti Military XI Smart', 'fof.89'),
    ('Fichetti Military XI\\b', 'fof.89'),
    ('Fichetti Tiffani Needler', 'fof.89'),
    ('Fichetti Executive Action', 'fof.89'),
    ('Morrissey Elan', 'fof.89'),
    ('Morrissey Alta', 'fof.89'),
    ('Morrissey Elite', 'fof.89'),
    ('Morrissey\\b', 'fof.89'),
    ('Savalette Guardian', 'fof.89'),
    ('Ares Viper', 'fof.89'),
    # FoF page 90
    ('H.?K.?HK.?227\\b', 'fof.90'),
    ('HK.?227.?S\\b', 'fof.90'),
    ('Ingram.?Warrior', 'fof.90'),
    ('Uzi III\\b', 'fof.90'),
    ('AET NN22', 'fof.90'),
    ('Colt.?Cobra\\b', 'fof.90'),
    ('Berretta.?Model.?70', 'fof.90'),
    # FoF page 91
    ('MGL.?12\\b', 'fof.91'),
    ('MCGL.?6\\b', 'fof.91'),
    ('Multi.Launcher', 'fof.91'),
    ('Arbelast II MAW', 'fof.91'),
    # FoF other pages
    ('ArmTech Mini.?6', 'fof.47'),
    ('ArmTech MGL', 'fof.47'),
    ('Ingram Super.?Mach', 'fof.31'),
    ('Colt M.?23\\b', 'fof.32'),
    ('Ares Alpha', 'fof.33'),
    ('Remington 990', 'fof.36'),
    ('Franchi.?SPAS.?22', 'fof.37'),
    ('Ares HV MP', 'fof.38'),
    ('Great Dragon ATGM', 'fof.41'),
    ('Ballista Multi.Role', 'fof.42'),
    ('M.12 Man.Portable Mortar', 'fof.44'),
    ('Light Military Armor', 'fof.54'),
    ('Medium Military Armor', 'fof.54'),
    ('Heavy Military Armor', 'fof.54'),
    ('Military Helmet', 'fof.54'),
    ('Rapier\\b', 'fof.81'),
    ('Fineblade Knife', 'fof.88'),
    ('Whip\\b', 'fof.88'),
    # FoF page 95
    ('Sony Beautiful Dreamer II', 'fof.95'),
    ('Sony Beautiful Dreamer\\b', 'fof.95'),
    ('Truman Paradiso', 'fof.95'),
    ('Fuchi Dreamliner', 'fof.95'),
    ('Fuchi RealSense.*MasterSim', 'fof.95'),
    ('Fuchi RealSense.*Kosmos', 'fof.95'),
    ('Truman Dreambox', 'fof.95'),
    # FoF page 96
    ('AZT Micro30', 'fof.96'),
    ('Bionome Tridlink', 'fof.96'),
    ('Fuchi.*Holo.Edit', 'fof.96'),
    ('Fuchi.*I.C.U', 'fof.96'),
    ('Kodak GAC.25', 'fof.96'),
    ('Cable Signal Formatter', 'fof.96'),
    ('Ares CyberMed', 'fof.96'),
    ('Galil Ruach', 'fof.96'),
    ('Holotank', 'fof.96'),
    # FoF page 97
    ('Sense Patch Injector', 'fof.97'),
    ('Signal Peak Controller', 'fof.97'),
    ('Truman Reality.500', 'fof.97'),
    # FoF page 98
    ('Body Mike', 'fof.98'),
    ('Hand Mike', 'fof.98'),
    ('Mike Stand', 'fof.98'),
    ('Mike Boom', 'fof.98'),
    ('Microcorder', 'fof.98'),
    ('Minicorder', 'fof.98'),
    ('Sprawl Blaster', 'fof.98'),
    ('Sprawl Fuserr', 'fof.98'),
    # FoF page 99
    ('Data Codebreaker', 'fof.99'),
    # SSC stats table page 111
    ('Ares Monosword', 'ssc.111'),
    ('Centurion Laser Axe', 'ssc.111'),
    ('AZ.?150 Stun Baton', 'ssc.111'),
    ('Forearm Snap Blades', 'ssc.111'),
    ('Improved Hand Blades', 'ssc.111'),
    ('Shock Glove', 'ssc.111'),
    ('Ranger.X\\b', 'ssc.111'),
    ('Tiffani Self.Defender', 'ssc.111'),
    ('Enfield AS7', 'ssc.111'),
    ('Defiance T.250', 'ssc.111'),
    ('Mossberg.*CMDT', 'ssc.111'),
    ('Sandler TMP', 'ssc.111'),
    ('SCK.?Model.?100', 'ssc.111'),
    ('Ingram.?Smartgun', 'ssc.111'),
    ('Steyr.?AUG.?CSL', 'ssc.111'),
    ('H.?K.?MP.?5TX', 'ssc.111'),
    ('Beretta.?Model.?70\\b', 'ssc.111'),
    ('Form.Fitting Body Armor', 'ssc.111'),
    # SSC page 112
    ('Ruger.?100\\b', 'ssc.112'),
    ('Walther.?MA.?2100', 'ssc.112'),
    ('Colt.?M22A2', 'ssc.112'),
    ('H.?K.?G12A3z', 'ssc.112'),
    ('Samopal.?vz.?88V', 'ssc.112'),
    ('Ares.?MP.?LMG', 'ssc.112'),
    ('Vindicator Minigun', 'ssc.112'),
    ('Panther.?Assault.?Cannon', 'ssc.112'),
    ('FN.?MAG', 'ssc.112'),
    ('Stoner.?Ares.?M107', 'ssc.112'),
]

def fix(content, name_pat, new_page):
    pattern = r'("Name":\s*"[^"]*' + name_pat + r'[^"]*"\s*(?:,\s*"[^"]*":\s*"[^"]*"\s*)*,\s*)"BookPage":\s*"ssc\.\?\?\?"'
    replacement = r'\g<1>"BookPage": "' + new_page + '"'
    return re.sub(pattern, replacement, content, flags=re.DOTALL|re.IGNORECASE)

total = 0
for pat, page in mappings:
    before = content.count('"ssc.???"')
    content = fix(content, pat, page)
    after = content.count('"ssc.???"')
    if before != after:
        total += (before - after)

print(f"Total fixed: {total}")
print(f"Remaining ssc.???: {content.count(chr(34) + 'ssc.???' + chr(34))}")

with open('src/data/SR2/Gear.json', 'w', encoding='utf-8', newline='') as f:
    f.write(content)
print("Done.")
