// Helpers for "->" custom-description items, chip holders (chipjacks and
// skillsoft jukeboxes), the chips slotted into them, and the skills those
// chips grant.
//
// Slot assignments live in character.chipSlots:
//   { [holderKey]: [chipKey | null, ...] }
// Keys are an item's uid when it has one (everything bought after this
// change), otherwise "<list>#<index>:<name>" for older saved characters.
// A key that no longer matches an item is treated as an empty slot.

export const makeUid = () =>
  (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

// ── "->" items ──────────────────────────────────────────────────────────────

export const needsDescription = (name) =>
  typeof name === 'string' && name.trim().endsWith('->');

export const applyDescription = (item, description) => {
  const desc = (description ?? '').trim();
  if (!desc) return { ...item };
  return {
    ...item,
    Name: `${item.Name.trim()} ${desc}`,
    baseName: item.Name,
    customDescription: desc,
  };
};

// ── Ratings & types ─────────────────────────────────────────────────────────

const toInt = (v) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : null;
};

export const getChipRating = (item) => {
  const name = item?.baseName ?? item?.Name ?? '';
  const bracket = name.match(/\[(\d+)\]/);
  if (bracket) return toInt(bracket[1]);
  const rating = name.match(/Rating\s*(\d+)/i);
  if (rating) return toInt(rating[1]);
  return toInt(item?.Rating);
};

const SLOTTABLE = ['Active', 'Know', 'Lingua', 'Data'];

// The gear purchase used to overwrite Type with the category ("Chips"), so
// fall back to the item name for older saves.
export const getChipType = (item) => {
  const declared = item?.ChipType ?? (item?.Type !== 'Chips' ? item?.Type : null);
  if (declared && SLOTTABLE.some((t) => declared.includes(t))) {
    return SLOTTABLE.find((t) => declared.includes(t));
  }
  const name = item?.baseName ?? item?.Name ?? '';
  if (/activesoft|^active\b|ambidexterity|deathtrance|mister lover/i.test(name)) return 'Active';
  if (/linguasoft|language skill/i.test(name)) return 'Lingua';
  if (/datasoft/i.test(name)) return 'Data';
  if (/knowsoft|knowledge|visrec|recognition|digi-tone/i.test(name)) return 'Know';
  return null;
};

export const isSlottableChip = (item) => getChipType(item) !== null;

// ── Holders ─────────────────────────────────────────────────────────────────

export const getSlotCount = (item, source) => {
  const name = item?.Name ?? '';
  if (source === 'cyberware') {
    if (!/chip[jl]ack/i.test(name) || /expert|driver|dvr/i.test(name)) return 0;
    if (/multi-?slot/i.test(name)) {
      const n = name.match(/(\d+)/);
      return n ? toInt(n[1]) : 1;
    }
    return 1;
  }
  if (source === 'gear') {
    if (!/jukebox/i.test(name)) return 0;
    const ports = name.match(/(\d+)\s*(?:ports?|prts|pts)\b/i);
    return ports ? toInt(ports[1]) : 1;
  }
  return 0;
};

export const getSkillwiresRating = (cyberware = []) =>
  cyberware.reduce((best, item) => {
    const m = (item?.Name ?? '').match(/skillwires(?:\+|\s*plus)?\s*\[?(\d+)\]?/i);
    return m ? Math.max(best, toInt(m[1])) : best;
  }, 0);

const itemKey = (item, source, index) =>
  item.uid ?? `${source}#${index}:${item.Name}`;

export const getChipHolders = (character) => {
  const holders = [];
  ['cyberware', 'gear'].forEach((source) => {
    (character?.[source] ?? []).forEach((item, index) => {
      const slots = getSlotCount(item, source);
      if (slots > 0) holders.push({ key: itemKey(item, source, index), item, source, slots });
    });
  });
  return holders;
};

// Each chip appears once per copy owned (Amount), so two copies can sit in
// two different slots.
export const getOwnedChips = (character) => {
  const chips = [];
  (character?.gear ?? []).forEach((item, index) => {
    if (!isSlottableChip(item)) return;
    chips.push({
      key: itemKey(item, 'gear', index),
      item,
      copies: Math.max(1, toInt(item.Amount) ?? 1),
      type: getChipType(item),
      rating: getChipRating(item),
    });
  });
  return chips;
};

// ── Resolving slots & chipped skills ────────────────────────────────────────

export const resolveSlots = (character) => {
  const chipsByKey = Object.fromEntries(getOwnedChips(character).map((c) => [c.key, c]));
  const used = {};
  return getChipHolders(character).map((holder) => {
    const saved = character?.chipSlots?.[holder.key] ?? [];
    const slots = Array.from({ length: holder.slots }, (_, i) => {
      const chip = chipsByKey[saved[i]];
      if (!chip) return null;
      used[chip.key] = (used[chip.key] ?? 0) + 1;
      return used[chip.key] > chip.copies ? null : chip;
    });
    return { ...holder, slotted: slots };
  });
};

// "Shotguns" for "ActiveSoft Gen. [3]-> Shotguns", including older saves
// that only have the combined name.
export const chipSkillName = (item) => {
  if (item.customDescription) return item.customDescription;
  const name = item.baseName ?? item.Name ?? '';
  const after = (item.Name ?? '').split('->')[1]?.trim();
  return after || name.replace(/\s*->\s*$/, '');
};

// Every slotted chip with whether it currently works. ActiveSofts need
// Skillwires of at least the chip's rating; KnowSofts/LinguaSofts/DataSofts
// only need a jack.
export const getChippedSkills = (character) => {
  const wires = getSkillwiresRating(character?.cyberware);
  const out = [];
  resolveSlots(character).forEach((holder) => {
    holder.slotted.forEach((chip) => {
      if (!chip) return;
      const rating = chip.rating ?? 0;
      let active = true;
      let reason = '';
      if (chip.type === 'Active') {
        if (wires === 0) { active = false; reason = 'needs Skillwires'; }
        else if (rating > wires) { active = false; reason = `rating ${rating} exceeds Skillwires ${wires}`; }
      }
      out.push({
        name: chipSkillName(chip.item),
        rating,
        type: chip.type,
        holder: holder.item.Name,
        active,
        reason,
      });
    });
  });
  return out;
};
