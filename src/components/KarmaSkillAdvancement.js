import React, { useState } from 'react';
import {
  Button, Modal, Box, Typography, Chip,
  Accordion, AccordionSummary, AccordionDetails,
  List, ListItem, ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// SR2 & SR3: Active = ceil(newRating × 1.5), Knowledge/Language = ceil(newRating × 0.5)
const skillKarmaCost = (currentRating, type) => {
  const newRating = currentRating + 1;
  if (type === 'Active') return Math.ceil(newRating * 1.5);
  return Math.ceil(newRating * 0.5); // Knowledge / Language
};

// SR2 concentrations are sub-skills — treat like active skills
const concentrationKarmaCost = (currentRating) => Math.ceil((currentRating + 1) * 1.5);

const modalSx = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TYPES = ['Active', 'Knowledge', 'Language'];

export default function KarmaSkillAdvancement({
  skills,
  karmaAvailable,
  step,
  onUpdateSkills,
  onSpendKarma,
  onChangeLog,
  Log,
}) {
  const [confirm, setConfirm] = useState(null);
  // confirm = { skillIndex, label, currentRating, cost, isConcentration, concentrationIndex }

  if (step !== 'finalized') return null;

  const openConfirm = (skillIndex, concentrationIndex = null) => {
    const skill = skills[skillIndex];
    if (!skill) return;

    if (concentrationIndex !== null) {
      const conc = skill.selectedConcentrations[concentrationIndex];
      const cost = concentrationKarmaCost(conc.rating);
      setConfirm({
        skillIndex,
        concentrationIndex,
        label: `${skill.name} / ${conc.name}`,
        currentRating: conc.rating,
        cost,
      });
    } else {
      const cost = skillKarmaCost(skill.rating, skill.type);
      setConfirm({
        skillIndex,
        concentrationIndex: null,
        label: skill.name,
        currentRating: skill.rating,
        cost,
      });
    }
  };

  const doAdvance = () => {
    if (!confirm) return;
    const { skillIndex, concentrationIndex, label, currentRating, cost } = confirm;

    const updatedSkills = skills.map((s, si) => {
      if (si !== skillIndex) return s;
      if (concentrationIndex !== null) {
        const newConcs = s.selectedConcentrations.map((c, ci) =>
          ci === concentrationIndex ? { ...c, rating: c.rating + 1 } : c
        );
        return { ...s, selectedConcentrations: newConcs };
      }
      return { ...s, rating: s.rating + 1 };
    });

    onUpdateSkills(updatedSkills);
    onSpendKarma(cost);
    const entry = {
      Type: 'IncreaseSkill',
      Date: new Date().getTime(),
      Amount: -cost,
      Notes: `Increased ${label} from ${currentRating} to ${currentRating + 1} for ${cost} Karma.`,
    };
    onChangeLog([...Log, entry]);
    setConfirm(null);
  };

  // Group skills by type for display
  const grouped = TYPES.reduce((acc, t) => {
    acc[t] = skills
      .map((s, i) => ({ ...s, _index: i }))
      .filter((s) => s.type === t);
    return acc;
  }, {});

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Skill Advancement
      </Typography>
      <Chip
        label={`Karma available: ${karmaAvailable}`}
        color={karmaAvailable > 0 ? 'success' : 'error'}
        size="small"
        sx={{ mb: 2 }}
      />

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
                  const canAfford = karmaAvailable >= cost;
                  return (
                    <React.Fragment key={skill._index}>
                      <ListItem
                        secondaryAction={
                          <Button
                            size="small"
                            variant="outlined"
                            disabled={!canAfford}
                            onClick={() => openConfirm(skill._index)}
                          >
                            +1 ({cost} karma)
                          </Button>
                        }
                      >
                        <ListItemText
                          primary={skill.name}
                          secondary={`Rating ${skill.rating}`}
                        />
                      </ListItem>

                      {/* SR2 concentrations */}
                      {skill.selectedConcentrations?.map((conc, ci) => {
                        const concCost = concentrationKarmaCost(conc.rating);
                        const concAfford = karmaAvailable >= concCost;
                        return (
                          <ListItem
                            key={ci}
                            sx={{ pl: 4 }}
                            secondaryAction={
                              <Button
                                size="small"
                                variant="outlined"
                                disabled={!concAfford}
                                onClick={() => openConfirm(skill._index, ci)}
                              >
                                +1 ({concCost} karma)
                              </Button>
                            }
                          >
                            <ListItemText
                              primary={`↳ ${conc.name}`}
                              secondary={`Rating ${conc.rating}`}
                              primaryTypographyProps={{ fontSize: '0.85rem' }}
                            />
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

      {/* Confirm modal */}
      <Modal open={!!confirm} onClose={() => setConfirm(null)}>
        <Box sx={modalSx}>
          {confirm && (
            <>
              <Typography variant="h6" sx={{ mb: 1 }}>Advance Skill</Typography>
              <Typography>
                Increase <strong>{confirm.label}</strong> from{' '}
                <strong>{confirm.currentRating}</strong> to{' '}
                <strong>{confirm.currentRating + 1}</strong>?
              </Typography>
              <Typography sx={{ mt: 1, mb: 2 }}>
                Cost: <strong>{confirm.cost} Karma</strong>
                {karmaAvailable < confirm.cost && (
                  <Chip label="Not enough karma" color="error" size="small" sx={{ ml: 1 }} />
                )}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                disabled={karmaAvailable < confirm.cost}
                onClick={doAdvance}
                sx={{ mr: 1 }}
              >
                Confirm
              </Button>
              <Button onClick={() => setConfirm(null)}>Cancel</Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
