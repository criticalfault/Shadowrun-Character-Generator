import React, { useState, useMemo } from 'react';
import {
  Button, Modal, Box, Typography, Chip,
  Accordion, AccordionSummary, AccordionDetails,
  List, ListItem, ListItemText, Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchableSelect from './SearchableSelect';

// Pre-import skill and spell lists for both editions
const allSkillsData   = import.meta.glob('../data/*/Skills.json',       { eager: true });
const allActiveSkills = import.meta.glob('../data/*/ActiveSkills.json', { eager: true });
const allSpellsData   = import.meta.glob('../data/*/Spells.json',       { eager: true });

const ATTR_ACRONYM = {
  QCK: 'Quickness', STR: 'Strength', BOD: 'Body',
  WIL: 'Willpower', INT: 'Intelligence', CHA: 'Charisma', RCT: 'Reaction',
};

// SR3 Skill Improvement Cost Table (multiplier × new rating, round up)
// Base Skill:         ≤ attr → 1.5 / 1   |  ≤ 2×attr → 2 / 1.5   |  > 2×attr → 2.5 / 2
// Specializations:   ≤ attr → 0.5 / 0.5  |  ≤ 2×attr → 1 / 1      |  > 2×attr → 1.5 / 1.5
const sr3SkillMultiplier = (newRating, attrRating, isActive) => {
  if (newRating <= attrRating)       return isActive ? 1.5 : 1;
  if (newRating <= attrRating * 2)   return isActive ? 2   : 1.5;
  return isActive ? 2.5 : 2;
};

const skillKarmaCost = (currentRating, type, edition, attrRating) => {
  const newRating = currentRating + 1;
  const isActive = type === 'Active';
  if (edition === 'SR3' && attrRating) {
    return Math.ceil(newRating * sr3SkillMultiplier(newRating, attrRating, isActive));
  }
  // SR2: flat 1.5 × new rating for active, 0.5 for knowledge/language (TODO: confirm from SR2 book)
  return Math.ceil(newRating * (isActive ? 1.5 : 0.5));
};

// SR2 concentrations — same formula as SR2 active for now
const concentrationKarmaCost = (currentRating) => Math.ceil((currentRating + 1) * 1.5);

// SR2 core p.132 & SR3 core: karma cost = desired Force of the spell
const spellKarmaCost = (force, _edition) => force;

const SPELL_CASTER_TYPES = [
  'Full Magician', 'Shaman', 'Mage', 'Hermetic Mage', 'Aspected Magician',
  'Physical Adept', // physical adepts typically can't learn spells, but kept for safety
];
const canLearnSpells = (magicalChoice) =>
  magicalChoice && magicalChoice !== 'None' && magicalChoice !== 'Adept' &&
  !magicalChoice.toLowerCase().includes('physical adept');

const modalSx = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TYPES = ['Active', 'Knowledge', 'Language'];

const RAISEABLE_ATTRS = ['Body', 'Quickness', 'Strength', 'Charisma', 'Willpower', 'Intelligence', 'Reaction'];

const attrKarmaCost = (currentRating) => Math.ceil((currentRating + 1) * 1.5);

export default function KarmaSkillAdvancement({
  skills,
  spells,
  karmaPool,
  karmaPoolBurned,
  onChangeKarmaPoolBurned,
  characterAttributes,
  raceBonuses,
  cyberAttributeBonuses,
  magicalAttributeBonuses,
  magicalChoice,
  magicRating,
  allowedBooks,
  Edition,
  karmaAvailable,
  step,
  onUpdateSkills,
  onUpdateAttributes,
  onChangeSpells,
  onSpendKarma,
  onChangeLog,
  Log,
  purchasedPowerPoints,
  onChangePurchasedPowerPoints,
}) {
  const [confirm, setConfirm]         = useState(null);
  const [attrConfirm, setAttrConfirm] = useState(null);
  const [newSkillModal, setNewSkillModal] = useState(false);
  const [newSkillIndex, setNewSkillIndex] = useState(0);
  const [newSkillData, setNewSkillData]   = useState(null);
  const [newSpellModal, setNewSpellModal] = useState(false);
  const [newSpellIndex, setNewSpellIndex] = useState(0);
  const [newSpellData, setNewSpellData]   = useState(null);
  const [spellForce, setSpellForce]       = useState(1);
  const [customType, setCustomType]       = useState('Quickening');
  const [customNote, setCustomNote]       = useState('');
  const [customAmount, setCustomAmount]   = useState(1);
  const [customConfirm, setCustomConfirm] = useState(false);

  if (step !== 'finalized') return null;

  const getAttrRating = (acronym) => {
    if (!acronym || !characterAttributes) return null;
    const name = ATTR_ACRONYM[acronym] ?? acronym;
    return (parseInt(characterAttributes[name]) || 0) +
           (parseInt(raceBonuses?.[name]) || 0);
  };

  // ── Skill data for "add new skill" ──────────────────────────────────
  const rawSkills = Edition === 'SR3'
    ? allActiveSkills[`../data/SR3/ActiveSkills.json`]?.default
    : allSkillsData[`../data/SR2/Skills.json`]?.default;

  // SR2 Skills.json is an object keyed by name; SR3 is an array of objects grouped by category
  const flatSkillList = useMemo(() => {
    if (!rawSkills) return [];
    // SR3: object keyed by category, each value is an array of skill objects
    // SR2: object keyed by skill name, each value is a skill object
    const values = Object.values(rawSkills);
    if (Array.isArray(values[0])) {
      return values.flat(); // SR3
    }
    return values; // SR2
  }, [rawSkills, Edition]);

  const existingSkillNames = new Set(skills.map((s) => s.name));
  const availableNewSkills = flatSkillList.filter(
    (s) => s && s.name && !existingSkillNames.has(s.name)
  );

  // New skill costs 2 karma (ceil(1 × 1.5) = 2)
  const newSkillCost = 2;

  // ── Spell data ──────────────────────────────────────────────────────
  const rawSpells = allSpellsData[`../data/${Edition}/Spells.json`]?.default ?? [];
  const existingSpellNames = new Set((spells ?? []).map((s) => s.Name?.trim()));
  const availableNewSpells = rawSpells.filter(
    (s) => s && s.Name && !existingSpellNames.has(s.Name.trim())
  );
  const spellCost = spellKarmaCost(spellForce, Edition);

  // ── Skill advancement confirm ────────────────────────────────────────
  const openConfirm = (skillIndex, concentrationIndex = null) => {
    const skill = skills[skillIndex];
    if (!skill) return;
    if (concentrationIndex !== null) {
      const conc = skill.selectedConcentrations[concentrationIndex];
      setConfirm({ skillIndex, concentrationIndex, label: `${skill.name} / ${conc.name}`, currentRating: conc.rating, cost: concentrationKarmaCost(conc.rating) });
    } else {
      setConfirm({ skillIndex, concentrationIndex: null, label: skill.name, currentRating: skill.rating, cost: skillKarmaCost(skill.rating, skill.type, Edition, getAttrRating(skill.attribute)) });
    }
  };

  const doAdvance = () => {
    if (!confirm) return;
    const { skillIndex, concentrationIndex, label, currentRating, cost } = confirm;
    const updatedSkills = skills.map((s, si) => {
      if (si !== skillIndex) return s;
      if (concentrationIndex !== null) {
        return { ...s, selectedConcentrations: s.selectedConcentrations.map((c, ci) => ci === concentrationIndex ? { ...c, rating: c.rating + 1 } : c) };
      }
      return { ...s, rating: s.rating + 1 };
    });
    onUpdateSkills(updatedSkills);
    onSpendKarma(cost);
    onChangeLog([...Log, { Type: 'IncreaseSkill', Date: Date.now(), Amount: -cost, Notes: `Increased ${label} from ${currentRating} to ${currentRating + 1} for ${cost} Karma.` }]);
    setConfirm(null);
  };

  // ── Attribute advancement ────────────────────────────────────────────
  const openAttrConfirm = (attr) => {
    const current = parseInt(characterAttributes?.[attr]) || 0;
    const cost = attrKarmaCost(current);
    const racialMax = 6 + (parseInt(raceBonuses?.[attr]) || 0);
    const cyberBonus = parseInt(cyberAttributeBonuses?.[attr]) || 0;
    const magicBonus = parseInt(magicalAttributeBonuses?.[attr]) || 0;
    setAttrConfirm({ attr, current, cost, racialMax, cyberBonus, magicBonus });
  };

  const doAdvanceAttr = () => {
    if (!attrConfirm) return;
    const { attr, current, cost } = attrConfirm;
    const updated = { ...characterAttributes, [attr]: current + 1 };
    onUpdateAttributes?.(updated);
    onSpendKarma(cost);
    onChangeLog([...Log, { Type: 'IncreaseAttribute', Date: Date.now(), Amount: -cost, Notes: `Raised ${attr} from ${current} to ${current + 1} for ${cost} Karma.` }]);
    setAttrConfirm(null);
  };

  // ── New skill ────────────────────────────────────────────────────────
  const doAddNewSkill = () => {
    if (!newSkillData) return;
    const skill = {
      name: newSkillData.name,
      rating: 1,
      totalCost: newSkillCost,
      type: 'Active',
      attribute: newSkillData.attribute ?? null,
      selectedConcentrations: [],
    };
    onUpdateSkills([...skills, skill]);
    onSpendKarma(newSkillCost);
    onChangeLog([...Log, { Type: 'NewSkill', Date: Date.now(), Amount: -newSkillCost, Notes: `Learned new skill: ${newSkillData.name} (Rating 1) for ${newSkillCost} Karma.` }]);
    setNewSkillModal(false);
    setNewSkillData(null);
    setNewSkillIndex(0);
  };

  // ── New spell ────────────────────────────────────────────────────────
  const doLearnSpell = () => {
    if (!newSpellData) return;
    const spell = { ...newSpellData, Rating: magicRating ?? 1, Fetish: false, Exclusive: false };
    onChangeSpells([...(spells ?? []), spell]);
    onSpendKarma(spellCost);
    onChangeLog([...Log, { Type: 'LearnSpell', Date: Date.now(), Amount: -spellCost, Notes: `Learned spell: ${newSpellData.Name?.trim()} at Force ${spellForce} for ${spellCost} Karma.` }]);
    setNewSpellModal(false);
    setNewSpellData(null);
    setNewSpellIndex(0);
  };

  // ── Custom karma spend ───────────────────────────────────────────────
  const CUSTOM_TYPES = {
    Quickening: {
      label: 'Quickening (MitS)',
      hint: 'Cost = spell Force to quicken; optionally spend up to 2× Force total to raise dispel resistance. Note which spell and Force.',
    },
    Anchoring: {
      label: 'Anchoring (MitS)',
      hint: 'Cost = Force of the anchoring focus being enchanted. Note focus type and Force.',
    },
    Other: {
      label: 'Other / Custom',
      hint: 'Free-form karma spend. Describe what it was in the note.',
    },
  };

  const doCustomSpend = () => {
    if (customAmount < 1 || !customNote.trim()) return;
    onSpendKarma(customAmount);
    onChangeLog([...Log, {
      Type: customType,
      Date: Date.now(),
      Amount: -customAmount,
      Notes: `${CUSTOM_TYPES[customType]?.label ?? customType}: ${customNote.trim()} (${customAmount} Karma)`,
    }]);
    setCustomConfirm(false);
    setCustomNote('');
    setCustomAmount(1);
  };

  // Group existing skills by type
  const grouped = TYPES.reduce((acc, t) => {
    acc[t] = skills.map((s, i) => ({ ...s, _index: i })).filter((s) => s.type === t);
    return acc;
  }, {});

  const showSpells = canLearnSpells(magicalChoice);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>Karma Advancement</Typography>
      <Chip
        label={`Karma available: ${karmaAvailable}`}
        color={karmaAvailable > 0 ? 'success' : 'error'}
        size="small"
        sx={{ mb: 2 }}
      />

      {/* ── Karma Pool tracker ── */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" sx={{ mb: 0.5 }}>Karma Pool</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Track permanently spent pool points (buying successes, p.191). Pool refreshes each scene except permanently burned points.
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography>
          Effective pool: <strong>{(karmaPool ?? 0) - (karmaPoolBurned ?? 0)}</strong> / {karmaPool ?? 0}
        </Typography>
        <Button
          size="small"
          variant="outlined"
          disabled={(karmaPoolBurned ?? 0) >= (karmaPool ?? 0)}
          onClick={() => onChangeKarmaPoolBurned((karmaPoolBurned ?? 0) + 1)}
        >
          Burn 1 (−1 permanent)
        </Button>
        <Button
          size="small"
          variant="outlined"
          disabled={(karmaPoolBurned ?? 0) <= 0}
          onClick={() => onChangeKarmaPoolBurned((karmaPoolBurned ?? 0) - 1)}
        >
          Undo
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />

      {/* ── Raise Attributes ── */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" sx={{ mb: 1 }}>Raise Attributes</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        Cost: ceil(new rating × 1.5) karma. Racial max = 6 + racial bonus. Cyberware bonuses are not counted toward the base rating.
      </Typography>
      <List dense disablePadding>
        {RAISEABLE_ATTRS.map((attr) => {
          const base = parseInt(characterAttributes?.[attr]) || 0;
          const racialMax = 6 + (parseInt(raceBonuses?.[attr]) || 0);
          const cost = attrKarmaCost(base);
          const atCap = base >= racialMax;
          return (
            <ListItem key={attr} secondaryAction={
              <Button
                size="small"
                variant="outlined"
                disabled={karmaAvailable < cost || atCap}
                onClick={() => openAttrConfirm(attr)}
              >
                {atCap ? 'At max' : `+1 (${cost} karma)`}
              </Button>
            }>
              <ListItemText
                primary={attr}
                secondary={`${base} / ${racialMax}`}
              />
            </ListItem>
          );
        })}
      </List>

      {/* ── Existing skills ── */}
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Improve Skills</Typography>
      {TYPES.map((type) => {
        const group = grouped[type];
        if (!group || group.length === 0) return null;
        return (
          <Accordion key={type} defaultExpanded={type === 'Active'}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>{type} Skills</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
              <List dense disablePadding>
                {group.map((skill) => {
                  const cost = skillKarmaCost(skill.rating, skill.type, Edition, getAttrRating(skill.attribute));
                  return (
                    <React.Fragment key={skill._index}>
                      <ListItem secondaryAction={
                        <Button size="small" variant="outlined" disabled={karmaAvailable < cost} onClick={() => openConfirm(skill._index)}>
                          +1 ({cost} karma)
                        </Button>
                      }>
                        <ListItemText primary={skill.name} secondary={`Rating ${skill.rating}`} />
                      </ListItem>
                      {skill.selectedConcentrations?.map((conc, ci) => {
                        const cc = concentrationKarmaCost(conc.rating);
                        return (
                          <ListItem key={ci} sx={{ pl: 4 }} secondaryAction={
                            <Button size="small" variant="outlined" disabled={karmaAvailable < cc} onClick={() => openConfirm(skill._index, ci)}>
                              +1 ({cc} karma)
                            </Button>
                          }>
                            <ListItemText primary={`↳ ${conc.name}`} secondary={`Rating ${conc.rating}`} primaryTypographyProps={{ fontSize: '0.85rem' }} />
                          </ListItem>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}

      {/* ── Buy new skill ── */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" sx={{ mb: 1 }}>Learn New Skill</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Cost: {newSkillCost} Karma (Rating 1)
      </Typography>
      <Button
        variant="outlined"
        disabled={karmaAvailable < newSkillCost || availableNewSkills.length === 0}
        onClick={() => setNewSkillModal(true)}
      >
        Learn New Skill…
      </Button>

      {/* ── Learn spell ── */}
      {showSpells && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>Learn New Spell</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Cost: Force karma (SR2 p.132 / SR3 confirmed)
          </Typography>
          <Button
            variant="outlined"
            disabled={karmaAvailable < spellCost || availableNewSpells.length === 0}
            onClick={() => setNewSpellModal(true)}
          >
            Learn New Spell…
          </Button>
        </>
      )}

      {/* ── Skill advance confirm ── */}
      <Modal open={!!confirm} onClose={() => setConfirm(null)}>
        <Box sx={modalSx}>
          {confirm && <>
            <Typography variant="h6" sx={{ mb: 1 }}>Advance Skill</Typography>
            <Typography>Increase <strong>{confirm.label}</strong> from <strong>{confirm.currentRating}</strong> to <strong>{confirm.currentRating + 1}</strong>?</Typography>
            <Typography sx={{ mt: 1, mb: 2 }}>Cost: <strong>{confirm.cost} Karma</strong></Typography>
            <Button variant="contained" disabled={karmaAvailable < confirm.cost} onClick={doAdvance} sx={{ mr: 1 }}>Confirm</Button>
            <Button onClick={() => setConfirm(null)}>Cancel</Button>
          </>}
        </Box>
      </Modal>

      {/* ── New skill modal ── */}
      <Modal open={newSkillModal} onClose={() => setNewSkillModal(false)}>
        <Box sx={modalSx}>
          <Typography variant="h6" sx={{ mb: 2 }}>Learn New Skill</Typography>
          <SearchableSelect
            items={availableNewSkills}
            value={newSkillIndex}
            onChange={(e) => { setNewSkillIndex(e.target.value); setNewSkillData(availableNewSkills[e.target.value]); }}
            label="Select Skill"
            getLabel={(s) => s.name}
          />
          <Typography sx={{ mt: 2, mb: 2 }}>
            Cost: <strong>{newSkillCost} Karma</strong>
          </Typography>
          <Button variant="contained" disabled={!newSkillData || karmaAvailable < newSkillCost} onClick={doAddNewSkill} sx={{ mr: 1 }}>
            Learn Skill
          </Button>
          <Button onClick={() => setNewSkillModal(false)}>Cancel</Button>
        </Box>
      </Modal>

      {/* ── New spell modal ── */}
      <Modal open={newSpellModal} onClose={() => setNewSpellModal(false)}>
        <Box sx={modalSx}>
          <Typography variant="h6" sx={{ mb: 2 }}>Learn New Spell</Typography>
          <SearchableSelect
            items={availableNewSpells}
            value={newSpellIndex}
            onChange={(e) => { setNewSpellIndex(e.target.value); setNewSpellData(availableNewSpells[e.target.value]); }}
            label="Select Spell"
            getLabel={(s) => s.Name?.trim()}
          />
          {newSpellData && (
            <Box sx={{ mt: 1, mb: 1, fontSize: '0.85rem', color: '#555' }}>
              <div>Type: {newSpellData.Type} | Class: {newSpellData.Class} | Duration: {newSpellData.Duration}</div>
              <div>Drain: {newSpellData.Drain}</div>
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, mb: 1 }}>
            <Typography>Force:</Typography>
            <input
              type="number"
              min={1}
              max={magicRating ?? 12}
              value={spellForce}
              onChange={(e) => setSpellForce(Math.max(1, parseInt(e.target.value) || 1))}
              style={{ width: 56, padding: '4px 6px' }}
            />
            <Typography variant="body2" color="text.secondary">
              (max Magic {magicRating ?? '?'})
            </Typography>
          </Box>
          <Typography sx={{ mb: 2 }}>
            Cost: <strong>{spellCost} Karma</strong>
          </Typography>
          <Button variant="contained" disabled={!newSpellData || karmaAvailable < spellCost} onClick={doLearnSpell} sx={{ mr: 1 }}>
            Learn Spell
          </Button>
          <Button onClick={() => setNewSpellModal(false)}>Cancel</Button>
        </Box>
      </Modal>

      {/* ── SR3 Adept: Buy Power Points ── */}
      {Edition === 'SR3' && magicalChoice && magicalChoice.toLowerCase().includes('adept') && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mb: 0.5 }}>Adept Power Points</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            Purchase additional Power Points at 20 karma each. (MitS)
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography>Purchased via karma: <strong>{purchasedPowerPoints ?? 0}</strong></Typography>
            <Button
              variant="outlined"
              size="small"
              disabled={karmaAvailable < 20}
              onClick={() => {
                const next = (purchasedPowerPoints ?? 0) + 1;
                onChangePurchasedPowerPoints?.(next);
                onSpendKarma?.(20);
                onChangeLog?.([...(Log ?? []), { type: 'Power Point', cost: 20, note: `Purchased Power Point #${next}` }]);
              }}
            >
              Buy Power Point (20 karma)
            </Button>
            {(purchasedPowerPoints ?? 0) > 0 && (
              <Button
                variant="text"
                size="small"
                color="warning"
                onClick={() => {
                  const next = (purchasedPowerPoints ?? 0) - 1;
                  onChangePurchasedPowerPoints?.(next);
                  onSpendKarma?.(-20);
                }}
              >
                Undo Last
              </Button>
            )}
          </Box>
        </>
      )}

      {/* ── Custom / one-off karma spend ── */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" sx={{ mb: 0.5 }}>Other Karma Spends</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        For metamagic uses, ritual costs, and other one-off karma expenses.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxWidth: 480 }}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {Object.entries(CUSTOM_TYPES).map(([key, { label }]) => (
            <Button
              key={key}
              size="small"
              variant={customType === key ? 'contained' : 'outlined'}
              onClick={() => setCustomType(key)}
            >
              {label}
            </Button>
          ))}
        </Box>

        <Typography variant="caption" color="text.secondary">
          {CUSTOM_TYPES[customType]?.hint}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Note (e.g. Fireball Force 6)"
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            style={{ flex: 1, padding: '6px 8px', fontSize: '0.9rem' }}
          />
          <input
            type="number"
            min={1}
            value={customAmount}
            onChange={(e) => setCustomAmount(Math.max(1, parseInt(e.target.value) || 1))}
            style={{ width: 60, padding: '6px 8px', fontSize: '0.9rem' }}
          />
          <Typography variant="body2">karma</Typography>
        </Box>

        <Button
          variant="outlined"
          disabled={!customNote.trim() || customAmount < 1 || karmaAvailable < customAmount}
          onClick={() => setCustomConfirm(true)}
          sx={{ alignSelf: 'flex-start' }}
        >
          Spend {customAmount} Karma
        </Button>
      </Box>

      {/* ── Attribute advance confirm ── */}
      <Modal open={!!attrConfirm} onClose={() => setAttrConfirm(null)}>
        <Box sx={modalSx}>
          {attrConfirm && <>
            <Typography variant="h6" sx={{ mb: 1 }}>Raise Attribute</Typography>
            <Typography>Increase <strong>{attrConfirm.attr}</strong> from <strong>{attrConfirm.current}</strong> to <strong>{attrConfirm.current + 1}</strong>?</Typography>
            {(attrConfirm.cyberBonus > 0 || attrConfirm.magicBonus > 0) && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Note: cyber/magic bonuses (+{attrConfirm.cyberBonus + attrConfirm.magicBonus}) are on top of this base rating.
              </Typography>
            )}
            <Typography sx={{ mt: 1, mb: 2 }}>Cost: <strong>{attrConfirm.cost} Karma</strong></Typography>
            <Button variant="contained" disabled={karmaAvailable < attrConfirm.cost} onClick={doAdvanceAttr} sx={{ mr: 1 }}>Confirm</Button>
            <Button onClick={() => setAttrConfirm(null)}>Cancel</Button>
          </>}
        </Box>
      </Modal>

      {/* Custom spend confirm */}
      <Modal open={customConfirm} onClose={() => setCustomConfirm(false)}>
        <Box sx={modalSx}>
          <Typography variant="h6" sx={{ mb: 1 }}>Confirm Karma Spend</Typography>
          <Typography><strong>{CUSTOM_TYPES[customType]?.label ?? customType}</strong></Typography>
          <Typography sx={{ mt: 0.5 }}>{customNote}</Typography>
          <Typography sx={{ mt: 1, mb: 2 }}>Cost: <strong>{customAmount} Karma</strong></Typography>
          <Button variant="contained" onClick={doCustomSpend} sx={{ mr: 1 }}>Confirm</Button>
          <Button onClick={() => setCustomConfirm(false)}>Cancel</Button>
        </Box>
      </Modal>
    </Box>
  );
}
