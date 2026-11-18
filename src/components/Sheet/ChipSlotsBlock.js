import React from 'react';
import { Grid, Select, MenuItem } from '@mui/material';
import SRSection from './SRSection';
import {
  getOwnedChips,
  getSkillwiresRating,
  resolveSlots,
  getChippedSkills,
} from '../../utils/chipware';

const TYPE_LABEL = { Active: 'ActiveSoft', Know: 'KnowSoft', Lingua: 'LinguaSoft', Data: 'DataSoft' };

const selectSx = {
  fontSize: '0.8rem',
  backgroundColor: '#fff',
  '& .MuiSelect-select': { py: '4px', px: '8px' },
  '& fieldset': { borderColor: '#aaa' },
};

// Interactive chip slots for every chipjack / jukebox the runner owns.
// Hidden when the character has none. Working chipped skills also appear in
// the Skills block; this shows where each chip is slotted and why any isn't working.
const ChipSlotsBlock = ({ character, onChangeChipSlots }) => {
  const holders = resolveSlots(character);
  if (holders.length === 0) return null;

  const chips = getOwnedChips(character);
  const wires = getSkillwiresRating(character.cyberware);
  const problems = getChippedSkills(character).filter((s) => !s.active);

  const inUse = {};
  holders.forEach((h) => h.slotted.forEach((c) => { if (c) inUse[c.key] = (inUse[c.key] ?? 0) + 1; }));

  const setSlot = (holder, slotIndex, chipKey) => {
    const next = Array.from({ length: holder.slots }, (_, i) => holder.slotted[i]?.key ?? null);
    next[slotIndex] = chipKey || null;
    onChangeChipSlots?.({ ...(character.chipSlots ?? {}), [holder.key]: next });
  };

  return (
    <Grid size={12}>
      <SRSection keepTogether title="Chip Slots">
        <div style={{ padding: '0 10px' }}>
          <div className="sr-chip-note">
            Skillwires: <strong>{wires || 'none'}</strong>
            {chips.length === 0 && ' · buy ActiveSofts / KnowSofts on the Gear tab (Chips)'}
          </div>

          {holders.map((holder) => (
            <div key={holder.key} style={{ marginBottom: 8 }}>
              <div className="shadowrun-label" style={{ marginBottom: 4 }}>
                {holder.item.Name}{' '}
                <span style={{ fontWeight: 400, color: '#666' }}>({holder.slots})</span>
              </div>
              {holder.slotted.map((slotted, i) => (
                <div key={i} className="sr-chip-slot">
                  <span className="sr-chip-slot-num">{i + 1}</span>
                  <Select
                    size="small"
                    fullWidth
                    displayEmpty
                    value={slotted?.key ?? ''}
                    onChange={(e) => setSlot(holder, i, e.target.value)}
                    renderValue={(v) => (v
                      ? chips.find((c) => c.key === v)?.item.Name
                      : <span style={{ color: '#999' }}>Empty</span>)}
                    sx={selectSx}
                  >
                    <MenuItem value=""><em>Empty</em></MenuItem>
                    {chips.map((chip) => {
                      const here = slotted?.key === chip.key;
                      const full = !here && (inUse[chip.key] ?? 0) >= chip.copies;
                      return (
                        <MenuItem key={chip.key} value={chip.key} disabled={full} sx={{ fontSize: '0.85rem' }}>
                          {chip.item.Name}
                          <span style={{ marginLeft: 8, fontSize: '0.8em', color: '#777' }}>
                            {TYPE_LABEL[chip.type]}{full ? ' · in use' : ''}
                          </span>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
              ))}
            </div>
          ))}

          {problems.map((s, i) => (
            <div key={i} className="sr-chip-warning">
              {s.name} ({s.rating}) not active: {s.reason}
            </div>
          ))}
        </div>
      </SRSection>
    </Grid>
  );
};

export default ChipSlotsBlock;
