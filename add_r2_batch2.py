import json

with open('src/data/SR2/Vehicles.json', encoding='utf-8') as f:
    vehicles = json.load(f)
with open('src/data/SR2/Drones.json', encoding='utf-8') as f:
    drones = json.load(f)

existing_v = {v['name'] for v in vehicles}
existing_d = {d['name'] for d in drones}

new_vehicles = [
    # DocWagon variants
    {
        "name": "DocWagon Citymaster Variant",
        "Handling": "5/11",
        "Speed/Accel": "120/3",
        "Body/Armor": "5/10",
        "Sig/Autonav": "2/3",
        "Pilot/Sensor": "-/0",
        "Cargo/Load": "25/525",
        "Seating": "2 bucket + 2 folding bench (x2)",
        "$Cost": "589000",
        "Notes": "Armored heavy transport ambulance. Fuel: Diesel (250L), 5.2km/L. Anti-theft system (6), enviroseal (gas), life support (20 man-hours), medical treatment gear (2 patients), small turret (weapon not included).",
        "Book.Page": "nagrl.???"
    },
    {
        "name": "DocWagon CRT Ambulance",
        "Handling": "4/10",
        "Speed/Accel": "75/6",
        "Body/Armor": "5/0",
        "Sig/Autonav": "2/2",
        "Pilot/Sensor": "-/0",
        "Cargo/Load": "8/500",
        "Seating": "2 bucket",
        "$Cost": "98800",
        "Notes": "Medium transport ambulance. Fuel: Diesel (250L), 4km/L. Anti-theft system (6), medical treatment gear (4 patients).",
        "Book.Page": "nagrl.???"
    },
    {
        "name": "DocWagon CRT Air Unit",
        "Handling": "5",
        "Speed/Accel": "320/10",
        "Body/Armor": "6/0",
        "Sig/Autonav": "4/3",
        "Pilot/Sensor": "-/1",
        "Cargo/Load": "15/350",
        "Seating": "2 bucket",
        "$Cost": "411000",
        "Notes": "VTOL (ambulance tilt-wing). Fuel: Jet (750L), 0.6km/L. Anti-theft system (6), medical treatment gear (4 patients).",
        "Book.Page": "nagrl.???"
    },
    {
        "name": "DocWagon Osprey II",
        "Handling": "5",
        "Speed/Accel": "380/12",
        "Body/Armor": "6/3",
        "Sig/Autonav": "4/3",
        "Pilot/Sensor": "-/1",
        "Cargo/Load": "12/300",
        "Seating": "2 bucket",
        "$Cost": "817000",
        "Notes": "VTOL (armed ambulance tilt-wing). Fuel: Jet (600L), 0.6km/L. Anti-theft system (6), 2 external hardpoints (weapons not included), medical treatment gear (2 patients).",
        "Book.Page": "nagrl.???"
    },
    {
        "name": "DocWagon SRT Ambulance",
        "Handling": "4/10",
        "Speed/Accel": "80/8",
        "Body/Armor": "4/0",
        "Sig/Autonav": "2/2",
        "Pilot/Sensor": "-/0",
        "Cargo/Load": "6/250",
        "Seating": "2 bucket",
        "$Cost": "48800",
        "Notes": "Ambulance van. Fuel: Gasoline (95L), 5km/L. Anti-theft system (6), medical treatment gear (1 patient).",
        "Book.Page": "rbb1.???"
    },
    {
        "name": "DocWagon SRT Helicopter",
        "Handling": "5",
        "Speed/Accel": "250/18",
        "Body/Armor": "4/0",
        "Sig/Autonav": "3/3",
        "Pilot/Sensor": "-/1",
        "Cargo/Load": "5/350",
        "Seating": "2 bucket",
        "$Cost": "386000",
        "Notes": "VTOL (ambulance utility helicopter). Fuel: Jet (1,250L), 0.2km/L. Anti-theft system (6), medical treatment gear (1 patient).",
        "Book.Page": "nagrl.???"
    },
    {
        "name": "DocWagon WK-2 Stallion Variant",
        "Handling": "5",
        "Speed/Accel": "190/14",
        "Body/Armor": "4/6",
        "Sig/Autonav": "3/3",
        "Pilot/Sensor": "-/1",
        "Cargo/Load": "4/50",
        "Seating": "2 bucket",
        "$Cost": "455000",
        "Notes": "VTOL (ambulance utility helicopter). Fuel: Jet (1,250L), 0.2km/L. Anti-theft system (6), 2 external hardpoints (weapons not included), medical treatment gear (1 patient).",
        "Book.Page": "nagrl.???"
    },
    # Other vehicles
    {
        "name": "Embraer-Dassault Mistral",
        "Handling": "4",
        "Speed/Accel": "300/21",
        "Body/Armor": "6/0",
        "Sig/Autonav": "4/2",
        "Pilot/Sensor": "-/1",
        "Cargo/Load": "12/600",
        "Seating": "2 bucket front, 3 rear (x5)",
        "$Cost": "281000",
        "Notes": "VSTOL (twin-engine prop). Low speed 135km/h. Fuel: Jet (2,000L), 1km/L.",
        "Book.Page": "rbb1.???"
    },
    {
        "name": "Entertainment Systems Papoose",
        "Handling": "3/6",
        "Speed/Accel": "90/3",
        "Body/Armor": "2/0",
        "Sig/Autonav": "5/0",
        "Pilot/Sensor": "-/-",
        "Cargo/Load": "1/35",
        "Seating": "1 bucket",
        "$Cost": "6000",
        "Notes": "Electric racing scooter. Fuel: Electric (75 PF), 0.5km/PF.",
        "Book.Page": "rbb1.???"
    },
    {
        "name": "Federated Boeing Commuter",
        "Handling": "5",
        "Speed/Accel": "320/10",
        "Body/Armor": "6/0",
        "Sig/Autonav": "3/3",
        "Pilot/Sensor": "-/1",
        "Cargo/Load": "10/850",
        "Seating": "2 bucket front, 3 rear (x5)",
        "$Cost": "378000",
        "Notes": "VTOL (tilt-wing). Fuel: Jet (750L), 0.6km/L. 32 CF cargo when configured for freight.",
        "Book.Page": "sr2.???"
    },
    {
        "name": "Federated Boeing Eagle",
        "Handling": "3",
        "Speed/Accel": "1800/75",
        "Body/Armor": "7/10",
        "Sig/Autonav": "5/3",
        "Pilot/Sensor": "-/8",
        "Cargo/Load": "2/500",
        "Seating": "1 ejection",
        "$Cost": "49000000",
        "Notes": "VTOL (jump jet fighter). Fuel: Jet (2,500L), 0.1km/L. ECM 7, ECCM 8, external fixed hardpoints (weapons not included), 6 missile mounts (1,800kg ordnance).",
        "Book.Page": "sr2.???"
    },
    {
        "name": "Ferrari Appaloosa Light Scout",
        "Handling": "2/3",
        "Speed/Accel": "125/12",
        "Body/Armor": "7/9",
        "Sig/Autonav": "5/2",
        "Pilot/Sensor": "-/6",
        "Cargo/Load": "5/625",
        "Seating": "1 bucket + 2 bucket + 1 folding bench",
        "$Cost": "1430000",
        "Notes": "APC. Fuel: Diesel (800L), 2km/L. ECM 5, ECCM 5, medium turret (weapon not included), micro-turret (weapon not included), RAM 1 and Thermal Baffles 1 (both factored in).",
        "Book.Page": "rbb1.???"
    },
    {
        "name": "Fiat-Fokker Cloud Nine",
        "Handling": "4",
        "Speed/Accel": "200/21",
        "Body/Armor": "4/0",
        "Sig/Autonav": "4/2",
        "Pilot/Sensor": "-/1",
        "Cargo/Load": "8/325",
        "Seating": "2 folding bucket, 4 reinforced folding bench",
        "$Cost": "223000",
        "Notes": "VSTOL (single-engine prop). Low speed 60km/h. Fuel: Jet (250L), 1km/L. Flotation package, reinforced boat hull.",
        "Book.Page": "rbb1.???"
    },
    {
        "name": "Gaz-Niki White Eagle",
        "Handling": "3/3",
        "Speed/Accel": "140/4",
        "Body/Armor": "2/0",
        "Sig/Autonav": "2/0",
        "Pilot/Sensor": "-/-",
        "Cargo/Load": "2/30",
        "Seating": "2 bucket (1 front, 1 rear)",
        "$Cost": "15000",
        "Notes": "Off-road. Fuel: Gasoline (35L), 10km/L.",
        "Book.Page": "rbb1.???"
    },
    {
        "name": "Gaz-Willys Nomad",
        "Handling": "3/3",
        "Speed/Accel": "100/9",
        "Body/Armor": "4/0",
        "Sig/Autonav": "2/2",
        "Pilot/Sensor": "-/0",
        "Cargo/Load": "18/750",
        "Seating": "2 bucket, 2 folding bench",
        "$Cost": "41000",
        "Notes": "Pickup. Fuel: Diesel (90L), 7.8km/L. Roll bars.",
        "Book.Page": "rbb1.???"
    },
    {
        "name": "General Products COP",
        "Handling": "4/8",
        "Speed/Accel": "90/5",
        "Body/Armor": "3/1",
        "Sig/Autonav": "4/1",
        "Pilot/Sensor": "-/0",
        "Cargo/Load": "2/15",
        "Seating": "1 bucket + 1 bucket",
        "$Cost": "66000",
        "Notes": "Armored sedan. Fuel: Electric (200 PF), 1km/PF. Gridlink, Turbocharging 1 (factored in).",
        "Book.Page": "rbb1.???"
    },
    {
        "name": "GM-Nissan Spotter",
        "Handling": "3",
        "Speed/Accel": "200/15",
        "Body/Armor": "2/0",
        "Sig/Autonav": "6/2",
        "Pilot/Sensor": "-/1",
        "Cargo/Load": "0/10",
        "Seating": "None",
        "$Cost": "15400",
        "Notes": "VSTOL (med. fixed-wing UAV). Low speed 40km/h. Setup: 5 min. Fuel: Jet (120L), 0.5km/L. Remote control interface, rigger adaptation. Stealth/surveillance configuration.",
        "Book.Page": "sr2.???"
    },
    {
        "name": "GMC 4201",
        "Handling": "3/7",
        "Speed/Accel": "85/3",
        "Body/Armor": "6/2",
        "Sig/Autonav": "2/2",
        "Pilot/Sensor": "-/0",
        "Cargo/Load": "122/6500",
        "Seating": "2 bucket, 1 folding bench",
        "$Cost": "74800",
        "Notes": "Heavy transport (jeep-truck). Fuel: Diesel (500L), 3km/L.",
        "Book.Page": "rbb1.???"
    },
    {
        "name": "GMC Beachcraft Vacationer",
        "Handling": "4",
        "Speed/Accel": "105/7",
        "Body/Armor": "4/0",
        "Sig/Autonav": "2/3",
        "Pilot/Sensor": "-/0",
        "Cargo/Load": "6/300",
        "Seating": "2 folding bucket, 4 reinforced folding bucket",
        "$Cost": "200000",
        "Notes": "Medium hovercraft. Fuel: Gasoline (400L), 0.5km/L. Hovercraft water seals, living amenities (Basic).",
        "Book.Page": "rbb1.???"
    },
    {
        "name": "GMC Bulldog Step-Van",
        "Handling": "4/8",
        "Speed/Accel": "85/4",
        "Body/Armor": "4/2",
        "Sig/Autonav": "2/2",
        "Pilot/Sensor": "-/0",
        "Cargo/Load": "50/1165",
        "Seating": "1 bucket, 1 folding bench",
        "$Cost": "35000",
        "Notes": "Van. Concealed armor (standard).",
        "Book.Page": "rbb1.???"
    },
    {
        "name": "GMC Bulldog Step-Van (Ballistic Cloth Variant)",
        "Handling": "4/6",
        "Speed/Accel": "85/4",
        "Body/Armor": "4/5",
        "Sig/Autonav": "2/2",
        "Pilot/Sensor": "-/0",
        "Cargo/Load": "50/1125",
        "Seating": "1 bucket, 1 folding bench",
        "$Cost": "60000",
        "Notes": "Van. Ballistic cloth concealed armor variant.",
        "Book.Page": "rbb1.???"
    },
    {
        "name": "GMC Harpy Scout LAV",
        "Handling": "3",
        "Speed/Accel": "850/45",
        "Body/Armor": "6/15",
        "Sig/Autonav": "6/2",
        "Pilot/Sensor": "-/5",
        "Cargo/Load": "25/600",
        "Seating": "1 ejection + 2 ejection",
        "$Cost": "9600000",
        "Notes": "VSTOL (Thunderbird). Low speed 250km/h. Fuel: Jet (7,500L), 0.05km/L. ECM 3, ECCM 3, 2 external missile mounts (2 Landshark missiles each), RAM 2 (factored in), small turret with Vanquisher minigun.",
        "Book.Page": "ls.???"
    },
    {
        "name": "GMC MPUV",
        "Handling": "4/3",
        "Speed/Accel": "120/8",
        "Body/Armor": "4/6",
        "Sig/Autonav": "2/0",
        "Pilot/Sensor": "-/-",
        "Cargo/Load": "11/745",
        "Seating": "2 bucket + 1 bench",
        "$Cost": "58700",
        "Notes": "Armored pickup (multi-purpose utility). Fuel: Diesel (100L), 6km/L. Electronics port (with radio), pintle mount (weapon not included), spotlight (white light).",
        "Book.Page": "ff.???"
    },
    {
        "name": "GMC Riverine",
        "Handling": "3",
        "Speed/Accel": "90/5",
        "Body/Armor": "5/6",
        "Sig/Autonav": "2/2",
        "Pilot/Sensor": "-/1",
        "Cargo/Load": "10/250",
        "Seating": "2 bucket + 2 folding bench (x5)",
        "$Cost": "202000",
        "Notes": "Armed sport cruiser. Fuel: Diesel (200L), 2km/L. Ring mount.",
        "Book.Page": "sr2.???"
    },
    {
        "name": "GMC Riverine (Police Model)",
        "Handling": "3",
        "Speed/Accel": "90/5",
        "Body/Armor": "5/6",
        "Sig/Autonav": "2/2",
        "Pilot/Sensor": "-/1",
        "Cargo/Load": "45/1290",
        "Seating": "2 bucket + 2 folding bench",
        "$Cost": "240000",
        "Notes": "Armed sport cruiser. Fuel: Diesel (200L), 2km/L. External fixed hardpoint (weapon not included), living amenities (Basic), 2 ring mounts.",
        "Book.Page": "rbb1.???"
    },
    {
        "name": "GMC Riverine (Security Model)",
        "Handling": "3",
        "Speed/Accel": "90/5",
        "Body/Armor": "5/6",
        "Sig/Autonav": "2/2",
        "Pilot/Sensor": "-/1",
        "Cargo/Load": "36/1230",
        "Seating": "2 bucket + 2 folding bench",
        "$Cost": "300000",
        "Notes": "Armed sport variant. Fuel: Diesel (200L), 2km/L. Living amenities (Basic), 2 micro-turrets (weapons not included), mini-turret (weapon not included).",
        "Book.Page": "rbb1.???"
    },
]

new_drones = [
    {
        "name": "Cyberspace Systems Wolfhound Advanced Recon Aircraft",
        "Handling": "3",
        "Speed/Accel": "210/12",
        "Body/Armor": "2/0",
        "Sig/Autonav": "5/-",
        "Pilot/Sensor": "2/1",
        "Cargo/Load": "3/80",
        "Seating": "-",
        "$Cost": "31000",
        "Notes": "VTOL (sm. vectored-thrust UAV). Setup: 5 min. Fuel: Jet (300L), 0.72km/L (Idle: 5min/L). Remote control interface, rigger adaptation, Robotic Learning Pool 2 (Avoid Detection).",
        "Book.Page": "r2.???"
    },
    {
        "name": "Ferret RPD-VI Perimeter Drone",
        "Handling": "3/5",
        "Speed/Accel": "30/2",
        "Body/Armor": "1/3",
        "Sig/Autonav": "6/-",
        "Pilot/Sensor": "3/4",
        "Cargo/Load": "3/50",
        "Seating": "-",
        "$Cost": "65000",
        "Notes": "Medium wheeled crawler. Setup: 3 min. Fuel: Electric (40 PF), 2km/PF (Idle: 1hr/PF). Remote control interface, rigger adaptation, spotlight (white light).",
        "Book.Page": "ls.???"
    },
]

added_v = 0
for v in new_vehicles:
    if v['name'] not in existing_v:
        vehicles.append(v)
        added_v += 1
        print(f"Added vehicle: {v['name']}")
    else:
        print(f"Skipped (exists): {v['name']}")

added_d = 0
for d in new_drones:
    if d['name'] not in existing_d:
        drones.append(d)
        added_d += 1
        print(f"Added drone: {d['name']}")
    else:
        print(f"Skipped (exists): {d['name']}")

with open('src/data/SR2/Vehicles.json', 'w', encoding='utf-8') as f:
    json.dump(vehicles, f, ensure_ascii=False, indent=2)
with open('src/data/SR2/Drones.json', 'w', encoding='utf-8') as f:
    json.dump(drones, f, ensure_ascii=False, indent=2)

print(f"\nVehicles added: {added_v} (total: {len(vehicles)})")
print(f"Drones added: {added_d} (total: {len(drones)})")
