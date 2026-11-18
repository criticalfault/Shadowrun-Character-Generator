import {
  needsDescription, applyDescription, getChipRating, getChipType,
  getSlotCount, getSkillwiresRating, getChipHolders, getChippedSkills, resolveSlots,
} from './chipware';

describe('"->" items', () => {
  test('detects names ending in ->', () => {
    expect(needsDescription('ActiveSoft Gen. [1]->')).toBe(true);
    expect(needsDescription('Skillwires [3] MP ->')).toBe(true);
    expect(needsDescription('Nano Cyberware Repair Unit-> 1')).toBe(false);
    expect(needsDescription('Medkit')).toBe(false);
  });

  test('appends the description and keeps the original name', () => {
    const out = applyDescription({ Name: 'ActiveSoft Gen. [1]->' }, '  Shotguns ');
    expect(out.Name).toBe('ActiveSoft Gen. [1]-> Shotguns');
    expect(out.baseName).toBe('ActiveSoft Gen. [1]->');
    expect(out.customDescription).toBe('Shotguns');
  });
});

describe('chips', () => {
  test('rating from brackets, "Rating N", or the Rating field', () => {
    expect(getChipRating({ Name: 'ActiveSoft Gen. [7]-> Pistols', baseName: 'ActiveSoft Gen. [7]->' })).toBe(7);
    expect(getChipRating({ Name: 'Active General Skill Chip Rating 3' })).toBe(3);
    expect(getChipRating({ Name: 'Something', Rating: '4' })).toBe(4);
  });

  test('type from ChipType, else from the name (older saves have Type "Chips")', () => {
    expect(getChipType({ Name: 'x', ChipType: 'Know' })).toBe('Know');
    expect(getChipType({ Name: 'ActiveSoft Gen. [1]-> Clubs', Type: 'Chips' })).toBe('Active');
    expect(getChipType({ Name: 'LinguaSoft Gen.  [3]-> Japanese', Type: 'Chips' })).toBe('Lingua');
    expect(getChipType({ Name: 'Medkit', Type: 'Biotech' })).toBe(null);
  });
});

describe('holders', () => {
  test('slot counts', () => {
    expect(getSlotCount({ Name: 'Chipjack' }, 'cyberware')).toBe(1);
    expect(getSlotCount({ Name: 'Chipjack, Multi-slot 4' }, 'cyberware')).toBe(4);
    expect(getSlotCount({ Name: 'Chiplack, Multi-slot 3' }, 'cyberware')).toBe(3);
    expect(getSlotCount({ Name: 'MultiSlot Chipjack 2' }, 'cyberware')).toBe(2);
    expect(getSlotCount({ Name: 'Expert Chipjack Dvr [2]' }, 'cyberware')).toBe(0);
    expect(getSlotCount({ Name: 'SkillSoft Jukebox 12MP 10 prts' }, 'gear')).toBe(10);
    expect(getSlotCount({ Name: 'SkillSoft Jukebox 3MP 4 ports' }, 'gear')).toBe(4);
  });

  test('skillwires rating across naming styles', () => {
    expect(getSkillwiresRating([{ Name: 'Skillwires [3] MP 27' }])).toBe(3);
    expect(getSkillwiresRating([{ Name: 'Skillwires 2' }, { Name: 'Skillwires+ 5' }])).toBe(5);
    expect(getSkillwiresRating([{ Name: 'Skillwires Plus [4]' }])).toBe(4);
    expect(getSkillwiresRating([{ Name: 'Datajack' }])).toBe(0);
  });
});

describe('chipped skills', () => {
  const character = {
    cyberware: [
      { uid: 'jack', Name: 'Chipjack, Multi-slot 3' },
      { uid: 'wires', Name: 'Skillwires [3] MP 27' },
    ],
    gear: [
      { uid: 'a3', Name: 'ActiveSoft Gen. [3]-> Shotguns', baseName: 'ActiveSoft Gen. [3]->', customDescription: 'Shotguns', ChipType: 'Active', Amount: 1 },
      { uid: 'a5', Name: 'ActiveSoft Gen. [5]-> Pistols', baseName: 'ActiveSoft Gen. [5]->', customDescription: 'Pistols', ChipType: 'Active', Amount: 1 },
      { uid: 'k6', Name: 'KnowSoft Gen.[6]-> Seattle Gangs', baseName: 'KnowSoft Gen.[6]->', customDescription: 'Seattle Gangs', ChipType: 'Know', Amount: 1 },
    ],
    chipSlots: { jack: ['a3', 'a5', 'k6'] },
  };

  test('finds the holder and resolves each slot', () => {
    expect(getChipHolders(character)).toHaveLength(1);
    expect(resolveSlots(character)[0].slotted.map((c) => c?.key)).toEqual(['a3', 'a5', 'k6']);
  });

  test('ActiveSofts over the Skillwires rating are inactive; KnowSofts always work', () => {
    const skills = getChippedSkills(character);
    expect(skills.map((s) => [s.name, s.rating, s.active])).toEqual([
      ['Shotguns', 3, true],
      ['Pistols', 5, false],
      ['Seattle Gangs', 6, true],
    ]);
  });

  test('no Skillwires means no ActiveSofts', () => {
    const noWires = { ...character, cyberware: [character.cyberware[0]] };
    expect(getChippedSkills(noWires).filter((s) => s.active).map((s) => s.name)).toEqual(['Seattle Gangs']);
  });

  test('older saves without customDescription use the text after ->', () => {
    const legacy = {
      ...character,
      gear: [{ uid: 'a3', Name: 'ActiveSoft Gen. [3]-> Shotguns', Type: 'Chips', Amount: 1 }, ...character.gear.slice(1)],
    };
    expect(getChippedSkills(legacy)[0]).toMatchObject({ name: 'Shotguns', rating: 3, active: true, type: 'Active' });
  });

  test('a removed chip leaves its slot empty', () => {
    const removed = { ...character, gear: character.gear.slice(1) };
    expect(resolveSlots(removed)[0].slotted[0]).toBe(null);
  });

  test('one copy of a chip cannot fill two slots', () => {
    const doubled = { ...character, chipSlots: { jack: ['a3', 'a3', null] } };
    expect(resolveSlots(doubled)[0].slotted.map((c) => c?.key ?? null)).toEqual(['a3', null, null]);
  });
});
