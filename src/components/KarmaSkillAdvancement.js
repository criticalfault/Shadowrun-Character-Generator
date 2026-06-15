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

// SR2 & SR3: Active = ceil(newRating × 1.5), Knowledge/Language = ceil(newRating × 0.5)
const skillKarmaCost = (currentRating, type) => {
  const newRating = currentRating + 1;
  if (type === 'Active') return Math.ceil(newRating * 1.5);
  return Math.ceil(newRating * 0.5);
};

const concentrationKarmaCost = (currentRating) => Math.ceil((currentRating + 1) * 1.5);

// SR2 (confirmed, core p.132): karma = desired Force of the spell
// SR3: TODO — confirm from SR3 core book; using Force as placeholder until verified
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

export default function KarmaSkillAdvancement({
  skills,
  spells,
  karmaPool,
  karmaPoolBurned,
  onChangeKarmaPoolBurned,
  magicalChoice,
  magicRating,
  allowedBooks,
  Edition,
  karmaAvailable,
  step,
  onUpdateSkills,
  onChangeSpells,
  onSpendKarma,
  onChangeLog,
  Log,
}) {
  const [confirm, setConfirm]         = useState(null);
  const [newSkillModal, setNewSkillModal] = useState(false);
  const [newSkillIndex, setNewSkillIndex] = useState(0);
  const [newSkillData, setNewSkillData]   = useState(null);
  const [newSpellModal, setNewSpellModal] = useState(false);
  const [newSpellIndex, setNewSpellIndex] = useState(0);
  const [newSpellData, setNewSpellData]   = useState(null);
  const [spellForce, setSpellForce]       = useState(1);

  if (step !== 'finalized') return null;

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
      setConfirm({ skillIndex, concentrationIndex: null, label: skill.name, currentRating: skill.rating, cost: skillKarmaCost(skill.rating, skill.type) });
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

  // ── New skill ────────────────────────────────────────────────────────
  const doAddNewSkill = () => {
    if (!newSkillData) return;
    const skill = {
      name: newSkillData.name,
      rating: 1,
      totalCost: newSkillCost,
      type: 'Active',
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
                  const cost = skillKarmaCost(skill.rating, skill.type);
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
            Cost: Force karma (SR2 confirmed; SR3 TBD — same formula used as placeholder)
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
    </Box>
  );
}
