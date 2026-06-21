import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";

// ── Ally Spirit rules from MitS pp.107–113 ──────────────────────────────────
// Force costs 5 × currentForce Karma per +1 (first Force: 1 Magic Point free)
// Physical attributes start at Force (free); +1 costs currentRating Karma
// Mental attributes = creator's at time of creation (immutable)
// Sorcery skill: creator's rating at creation (free)
// Other skills: 1 Karma/point at creation; currentRating Karma per +1 later
// Sense Link: 5 Karma (one-time)
// Additional spells: Force × Karma each
// Additional Karma Pool: 1 Karma/point (max = 2 × Force)
// Forms: first is free; additional = 1 Karma each (inhabiting spirits have no forms)
// ─────────────────────────────────────────────────────────────────────────────

const FREE_POWERS = [
  "Aid Power",
  "Inhabiting",
  "Materialization",
  "Sorcery",
  "Telepathic Link",
  "3D Movement",
];

const PHYSICAL_ATTRS = ["Body", "Quickness", "Strength", "Charisma"];
const MENTAL_ATTRS = ["Intelligence", "Willpower"];

function karmaCostForce(currentForce) {
  return 5 * currentForce;
}

function karmaCostAttr(currentRating) {
  return currentRating;
}

function calcTotalKarma(ally) {
  if (!ally) return 0;
  let k = 0;

  // Force upgrades beyond first (first is the Magic Point, not Karma)
  for (let f = 1; f < ally.force; f++) {
    k += karmaCostForce(f);
  }

  // Physical attribute upgrades (free up to baseForce)
  const baseAttr = ally.baseForce ?? 1;
  for (const attr of PHYSICAL_ATTRS) {
    const rating = ally.physicalAttributes[attr] ?? baseAttr;
    for (let r = baseAttr; r < rating; r++) {
      k += karmaCostAttr(r);
    }
  }

  // Extra skills (beyond free Sorcery): costPaid stored at time of purchase
  for (const sk of ally.skills) {
    if (!sk.free) {
      k += sk.costPaid ?? sk.rating;
    }
    // Post-creation raises stored as raiseCost
    if (sk.raiseCost) k += sk.raiseCost;
  }

  // Sense Link
  if (ally.senseLink) k += 5;

  // Extra spells (first is free); costPaid = ally.force at time of adding
  for (let i = 1; i < ally.spells.length; i++) {
    k += ally.spells[i].costPaid ?? ally.force;
  }

  // Extra Karma Pool (1 free)
  const extraKP = (ally.karmaPool ?? 1) - 1;
  if (extraKP > 0) k += extraKP;

  // Extra forms (1 free; each additional = 1 Karma)
  const extraForms = (ally.forms ?? 1) - 1;
  if (extraForms > 0) k += extraForms;

  return k;
}

function defaultAlly(creatorIntelligence, creatorWillpower, creatorSorcery = 0, force = 1) {
  return {
    name: "",
    nativePlane: "",
    force,
    baseForce: force,
    physicalAttributes: {
      Body: force,
      Quickness: force,
      Strength: force,
      Charisma: force,
    },
    mentalAttributes: {
      Intelligence: creatorIntelligence,
      Willpower: creatorWillpower,
    },
    skills: [{ name: "Sorcery", rating: creatorSorcery, free: true }],
    senseLink: false,
    spells: [],
    karmaPool: 1,
    forms: 1,
  };
}

export default function AllySection({ ally, onChangeAlly, creatorIntelligence, creatorWillpower, creatorSorcery = 0, onSpendKarma }) {
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillRating, setNewSkillRating] = useState(1);
  const [newSpellName, setNewSpellName] = useState("");
  const [creationForce, setCreationForce] = useState(1);

  const totalKarma = calcTotalKarma(ally);
  const formulaComplexity = ally ? Math.round(totalKarma / 5) : 0;

  const update = (patch) => onChangeAlly({ ...ally, ...patch });

  if (!ally) {
    return (
      <Box sx={{ mt: 3 }}>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6" gutterBottom>Ally Spirit</Typography>
        <Alert severity="info" sx={{ mb: 2 }}>
          An ally spirit costs 1 permanent Magic Point to create. Only one ally spirit may be bound per magician.
          The ritual requires Force × 1,000 nuyen in materials. Physical attributes begin at the chosen Force for free.
        </Alert>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Typography variant="subtitle2">Starting Force:</Typography>
          <Button size="small" variant="outlined" onClick={() => setCreationForce(f => Math.max(1, f - 1))} disabled={creationForce <= 1}>−</Button>
          <Typography variant="h6" sx={{ minWidth: 24, textAlign: "center" }}>{creationForce}</Typography>
          <Button size="small" variant="outlined" onClick={() => setCreationForce(f => f + 1)}>+</Button>
          <Typography variant="caption" color="text.secondary">
            Material cost: ¥{(creationForce * 1000).toLocaleString()}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={() => onChangeAlly(defaultAlly(creatorIntelligence ?? 3, creatorWillpower ?? 3, creatorSorcery, creationForce))}
        >
          Create Ally Spirit (costs 1 Magic Point)
        </Button>
      </Box>
    );
  }

  const maxKarmaPool = 2 * ally.force;

  const handleForceChange = (delta) => {
    const newForce = Math.max(1, ally.force + delta);
    if (delta > 0) {
      const cost = karmaCostForce(ally.force);
      onSpendKarma?.(cost);
    }
    const newPhys = { ...ally.physicalAttributes };
    update({ force: newForce, physicalAttributes: newPhys });
  };

  const handleAttrChange = (attr, delta) => {
    const current = ally.physicalAttributes[attr] ?? ally.baseForce;
    const next = Math.max(ally.baseForce, current + delta);
    if (delta > 0) onSpendKarma?.(karmaCostAttr(current));
    update({ physicalAttributes: { ...ally.physicalAttributes, [attr]: next } });
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const rating = Math.max(1, newSkillRating);
    const cost = rating; // 1 Karma per point at creation
    const skill = { name: newSkillName.trim(), rating, free: false, costPaid: cost };
    update({ skills: [...ally.skills, skill] });
    onSpendKarma?.(cost);
    setNewSkillName("");
    setNewSkillRating(1);
  };

  const handleRaiseSkill = (i) => {
    const sk = ally.skills[i];
    const cost = karmaCostAttr(sk.rating); // current rating Karma per +1 post-creation
    onSpendKarma?.(cost);
    const updated = ally.skills.map((s, idx) =>
      idx === i ? { ...s, rating: s.rating + 1, raiseCost: (s.raiseCost ?? 0) + cost } : s
    );
    update({ skills: updated });
  };

  const handleRemoveSkill = (i) => {
    update({ skills: ally.skills.filter((_, idx) => idx !== i) });
  };

  const handleToggleSenseLink = () => {
    if (!ally.senseLink) onSpendKarma?.(5);
    update({ senseLink: !ally.senseLink });
  };

  const handleAddSpell = () => {
    if (!newSpellName.trim()) return;
    const isFirst = ally.spells.length === 0;
    const costPaid = ally.force;
    if (!isFirst) onSpendKarma?.(costPaid);
    update({ spells: [...ally.spells, { name: newSpellName.trim(), costPaid }] });
    setNewSpellName("");
  };

  const handleRemoveSpell = (i) => {
    update({ spells: ally.spells.filter((_, idx) => idx !== i) });
  };

  const handleKarmaPoolChange = (delta) => {
    const next = Math.max(1, Math.min(maxKarmaPool, (ally.karmaPool ?? 1) + delta));
    if (delta > 0) onSpendKarma?.(1);
    update({ karmaPool: next });
  };

  const handleFormsChange = (delta) => {
    const next = Math.max(1, (ally.forms ?? 1) + delta);
    if (delta > 0) onSpendKarma?.(1);
    update({ forms: next });
  };


  return (
    <Box sx={{ mt: 3 }}>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
        <Typography variant="h6">Ally Spirit</Typography>
        <Chip label={`${totalKarma} Karma spent`} size="small" color="primary" />
        <Chip label={`Formula Complexity: ${formulaComplexity}`} size="small" variant="outlined" />
        <Button
          size="small"
          color="error"
          sx={{ ml: "auto" }}
          onClick={() => onChangeAlly(null)}
        >
          Remove Ally
        </Button>
      </Box>

      <Alert severity="warning" sx={{ mb: 2, fontSize: "0.82rem" }}>
        Creating this ally required 1 permanent Magic Point. Materials cost: ¥{(ally.force * 1000).toLocaleString()}.
        {ally.force > 5 && " Ally Force exceeds 5 — failure to maintain may cause spirit to become independent."}
      </Alert>

      {/* Identity */}
      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <TextField
          size="small"
          label="Ally True Name"
          value={ally.name}
          onChange={(e) => update({ name: e.target.value })}
          sx={{ minWidth: 200 }}
        />
        <TextField
          size="small"
          label="Native Plane"
          value={ally.nativePlane}
          onChange={(e) => update({ nativePlane: e.target.value })}
          sx={{ minWidth: 180 }}
        />
      </Box>

      {/* Force */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Typography variant="subtitle2">Force:</Typography>
        <Button size="small" variant="outlined" onClick={() => handleForceChange(-1)} disabled={ally.force <= 1}>−</Button>
        <Typography variant="h6" sx={{ minWidth: 24, textAlign: "center" }}>{ally.force}</Typography>
        <Button size="small" variant="outlined" onClick={() => handleForceChange(1)}>+</Button>
        <Typography variant="caption" color="text.secondary">
          (next +1 costs {karmaCostForce(ally.force)} Karma)
        </Typography>
      </Box>

      {/* Physical Attributes */}
      <Typography variant="subtitle2" sx={{ mb: 1 }}>Physical Attributes (base = Force {ally.baseForce})</Typography>
      <Paper variant="outlined" sx={{ mb: 2, p: 1 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Attribute</TableCell>
              <TableCell align="center">Rating</TableCell>
              <TableCell align="center">Actions</TableCell>
              <TableCell align="center">Next cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PHYSICAL_ATTRS.map((attr) => {
              const rating = ally.physicalAttributes[attr] ?? ally.baseForce;
              return (
                <TableRow key={attr}>
                  <TableCell>{attr}</TableCell>
                  <TableCell align="center"><strong>{rating}</strong></TableCell>
                  <TableCell align="center">
                    <Button size="small" onClick={() => handleAttrChange(attr, -1)} disabled={rating <= ally.baseForce}>−</Button>
                    <Button size="small" onClick={() => handleAttrChange(attr, 1)}>+</Button>
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "0.78rem", color: "text.secondary" }}>
                    {karmaCostAttr(rating)} Karma
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      {/* Mental Attributes (locked) */}
      <Typography variant="subtitle2" sx={{ mb: 1 }}>Mental Attributes (locked to creator's at creation)</Typography>
      <Paper variant="outlined" sx={{ mb: 2, p: 1 }}>
        <Table size="small">
          <TableBody>
            {MENTAL_ATTRS.map((attr) => (
              <TableRow key={attr}>
                <TableCell>{attr}</TableCell>
                <TableCell align="center"><strong>{ally.mentalAttributes[attr] ?? "?"}</strong></TableCell>
                <TableCell sx={{ fontSize: "0.75rem", color: "text.secondary" }}>Cannot be raised</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Skills */}
      <Typography variant="subtitle2" sx={{ mb: 1 }}>Skills</Typography>
      <Paper variant="outlined" sx={{ mb: 2, p: 1 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Skill</TableCell>
              <TableCell align="center">Rating</TableCell>
              <TableCell align="center">Actions</TableCell>
              <TableCell align="center">Raise cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ally.skills.map((sk, i) => (
              <TableRow key={i}>
                <TableCell>
                  {sk.name}
                  {sk.free && <Chip label="free" size="small" sx={{ ml: 1, height: 16, fontSize: "0.65rem" }} />}
                </TableCell>
                <TableCell align="center"><strong>{sk.rating}</strong></TableCell>
                <TableCell align="center">
                  {!sk.free && (
                    <>
                      <Button size="small" onClick={() => handleRaiseSkill(i)}>
                        Raise (+{karmaCostAttr(sk.rating)} K)
                      </Button>
                      <Button size="small" color="error" onClick={() => handleRemoveSkill(i)}>✕</Button>
                    </>
                  )}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "0.78rem", color: "text.secondary" }}>
                  {sk.free ? "creator's rating" : `${karmaCostAttr(sk.rating)} Karma`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ display: "flex", gap: 1, mt: 1, alignItems: "center", flexWrap: "wrap" }}>
          <TextField
            size="small"
            label="New skill name"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            sx={{ minWidth: 180 }}
          />
          <TextField
            size="small"
            label="Rating"
            type="number"
            value={newSkillRating}
            onChange={(e) => setNewSkillRating(Math.max(1, parseInt(e.target.value) || 1))}
            sx={{ width: 70 }}
          />
          <Button size="small" variant="outlined" onClick={handleAddSkill} disabled={!newSkillName.trim()}>
            Add ({Math.max(1, newSkillRating)} Karma)
          </Button>
        </Box>
      </Paper>

      {/* Powers */}
      <Typography variant="subtitle2" sx={{ mb: 1 }}>Powers</Typography>
      <Paper variant="outlined" sx={{ mb: 2, p: 1 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
          {FREE_POWERS.map((p) => (
            <Chip key={p} label={p} size="small" color="success" variant="outlined" />
          ))}
          <Chip
            label={`Sense Link${ally.senseLink ? " ✓" : " (5 Karma)"}`}
            size="small"
            color={ally.senseLink ? "primary" : "default"}
            onClick={handleToggleSenseLink}
            variant={ally.senseLink ? "filled" : "outlined"}
            sx={{ cursor: "pointer" }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary">
          Free powers granted to all ally spirits. Click Sense Link to purchase it (5 Karma).
        </Typography>
      </Paper>

      {/* Spells */}
      <Typography variant="subtitle2" sx={{ mb: 1 }}>Spells</Typography>
      <Paper variant="outlined" sx={{ mb: 2, p: 1 }}>
        {ally.spells.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            No spells. First spell is free (random at creation).
          </Typography>
        ) : (
          <Table size="small" sx={{ mb: 1 }}>
            <TableHead>
              <TableRow>
                <TableCell>Spell</TableCell>
                <TableCell align="center">Cost</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {ally.spells.map((sp, i) => (
                <TableRow key={i}>
                  <TableCell>
                    {sp.name}
                    {i === 0 && <Chip label="free" size="small" sx={{ ml: 1, height: 16, fontSize: "0.65rem" }} />}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "0.78rem", color: "text.secondary" }}>
                    {i === 0 ? "—" : `${sp.costPaid ?? ally.force} K`}
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" color="error" onClick={() => handleRemoveSpell(i)}>✕</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 1 }}>
          <TextField
            size="small"
            label="Spell name"
            value={newSpellName}
            onChange={(e) => setNewSpellName(e.target.value)}
            sx={{ minWidth: 180 }}
          />
          <Button size="small" variant="outlined" onClick={handleAddSpell} disabled={!newSpellName.trim()}>
            Add {ally.spells.length > 0 ? `(${ally.force} Karma)` : "(free)"}
          </Button>
        </Box>
        <Typography variant="caption" color="text.secondary">
          Additional spells cost Karma equal to the ally's current Force. Spells are cast at the ally's Force.
        </Typography>
      </Paper>

      {/* Karma Pool & Forms */}
      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", mb: 2 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Karma Pool (max {maxKarmaPool})</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button size="small" variant="outlined" onClick={() => handleKarmaPoolChange(-1)} disabled={(ally.karmaPool ?? 1) <= 1}>−</Button>
            <Typography><strong>{ally.karmaPool ?? 1}</strong></Typography>
            <Button size="small" variant="outlined" onClick={() => handleKarmaPoolChange(1)} disabled={(ally.karmaPool ?? 1) >= maxKarmaPool}>+</Button>
            <Typography variant="caption" color="text.secondary">(1 Karma each beyond 1)</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>Forms</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button size="small" variant="outlined" onClick={() => handleFormsChange(-1)} disabled={(ally.forms ?? 1) <= 1}>−</Button>
            <Typography><strong>{ally.forms ?? 1}</strong></Typography>
            <Button size="small" variant="outlined" onClick={() => handleFormsChange(1)}>+</Button>
            <Typography variant="caption" color="text.secondary">(first free; 1 Karma each additional)</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
            Allies with Inhabiting have no physical form.
          </Typography>
        </Box>
      </Box>

      {/* Summary */}
      <Paper variant="outlined" sx={{ p: 1.5, bgcolor: "background.default" }}>
        <Typography variant="subtitle2" gutterBottom>Ritual Summary</Typography>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", fontSize: "0.85rem" }}>
          <Box><strong>Force:</strong> {ally.force}</Box>
          <Box><strong>Karma Spent:</strong> {totalKarma}</Box>
          <Box><strong>Formula Complexity:</strong> {formulaComplexity}</Box>
          <Box><strong>Material Cost:</strong> ¥{(ally.force * 1000).toLocaleString()}</Box>
          <Box><strong>Karma Pool:</strong> {ally.karmaPool ?? 1}</Box>
          <Box><strong>Forms:</strong> {ally.forms ?? 1}</Box>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
          Ally Charisma vs creator's Charisma: if ally's Charisma ever exceeds creator's, the ally may become independent.
          Ally Intelligence vs creator's: determines if ally can resist control (MitS p.112).
        </Typography>
      </Paper>
    </Box>
  );
}
