import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Alert from "@mui/material/Alert";

import WeaponModsData from "../data/SR3/WeaponMods.json";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(900px, 95vw)",
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "1px solid #555",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

// Parse damage string like "9M" or "10S" into { power, level }
function parseDamage(dmgStr) {
  if (!dmgStr) return null;
  const m = String(dmgStr).match(/^(\d+)([A-Z]+)(.*)$/);
  if (!m) return null;
  return { power: parseInt(m[1]), level: m[2], suffix: m[3] ?? "" };
}

export function applyWeaponMods(weapon, weaponMods = []) {
  const allMods = WeaponModsData.mods;
  let conceal = parseInt(weapon.Concealability ?? 0);
  let mode = weapon.Mode ?? "";
  let recoilComp = 0;
  let powerMod = 0;
  let tnMod = 0;

  for (const applied of weaponMods) {
    const def = allMods.find((d) => d.id === applied.id);
    if (!def) continue;

    // For mods with dpOptions (variable stats), use the chosen option's values if provided
    if (def.dpOptions && applied.dpOptionIndex != null) {
      const opt = def.dpOptions[applied.dpOptionIndex];
      if (opt?.concealMod != null) conceal += opt.concealMod;
      if (opt?.recoilCompMod != null) recoilComp += opt.recoilCompMod;
    } else {
      conceal += def.concealMod ?? 0;
      recoilComp += def.recoilCompMod ?? 0;
    }

    powerMod += def.powerMod ?? 0;
    tnMod += def.tnMod ?? 0;
    if (def.modeChange) mode = def.modeChange;
  }

  // Build modified damage string
  let damage = weapon.Damage ?? "";
  if (powerMod !== 0) {
    const parsed = parseDamage(damage);
    if (parsed) {
      damage = `${parsed.power + powerMod}${parsed.level}${parsed.suffix}`;
    }
  }

  return { conceal, mode, damage, recoilComp, tnMod };
}

function StatDelta({ base, modified, label, lowerIsBetter = false }) {
  if (base === modified) return <span>{base}</span>;
  const improved = lowerIsBetter ? modified < base : modified > base;
  return (
    <span>
      <span style={{ textDecoration: "line-through", opacity: 0.5 }}>{base}</span>{" "}
      <span style={{ color: improved ? "#4caf50" : "#f44336", fontWeight: "bold" }}>
        {modified}
      </span>
    </span>
  );
}

function getIncompatibleIds(selectedMods, allMods) {
  const blocked = new Set();
  for (const applied of selectedMods) {
    const def = allMods.find((d) => d.id === applied.id);
    if (def?.incompatibleWith) def.incompatibleWith.forEach((id) => blocked.add(id));
  }
  return blocked;
}

function getAlreadyInstalledIds(selectedMods) {
  return new Set(selectedMods.map((m) => m.id));
}

export default function WeaponModsModal({ open, weapon, weaponIndex, onClose, onSave }) {
  const [pendingId, setPendingId] = useState("");
  const [pendingOptionIndex, setPendingOptionIndex] = useState(null);
  const [pendingNote, setPendingNote] = useState("");
  const [mods, setMods] = useState(weapon?.weaponMods ?? []);

  // Re-sync mods when weapon changes (different row opened)
  React.useEffect(() => {
    setMods(weapon?.weaponMods ?? []);
    setPendingId("");
    setPendingOptionIndex(null);
    setPendingNote("");
  }, [weapon, weaponIndex]);

  if (!weapon) return null;

  const allMods = WeaponModsData.mods;
  const baseConceal = parseInt(weapon.Concealability ?? 0);
  const baseMode = weapon.Mode ?? "";
  const baseDamage = weapon.Damage ?? "";

  const { conceal, mode, damage, recoilComp, tnMod } = applyWeaponMods(weapon, mods);

  const blockedIds = getIncompatibleIds(mods, allMods);
  const installedIds = getAlreadyInstalledIds(mods);

  const pendingDef = allMods.find((d) => d.id === pendingId);
  const hasOptions = pendingDef?.dpOptions?.length > 0;

  const handleAdd = () => {
    if (!pendingId) return;
    const def = allMods.find((d) => d.id === pendingId);
    // Build label
    let label = def.name;
    let cost = def.costNuyen;
    if (def.dpOptions && pendingOptionIndex != null) {
      const opt = def.dpOptions[pendingOptionIndex];
      label = `${def.name} — ${opt.label}`;
      cost = opt.costNuyen;
    }
    const entry = {
      id: pendingId,
      label,
      cost: cost ?? 0,
      note: pendingNote || undefined,
      dpOptionIndex: pendingOptionIndex ?? undefined,
    };
    const next = [...mods, entry];
    setMods(next);
    setPendingId("");
    setPendingOptionIndex(null);
    setPendingNote("");
  };

  const handleRemove = (i) => setMods(mods.filter((_, idx) => idx !== i));

  const handleSave = () => {
    onSave(weaponIndex, mods);
    onClose();
  };

  const totalModCost = mods.reduce((s, m) => s + (m.cost ?? 0), 0);

  const categories = [...new Set(allMods.map((m) => m.category))];

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Modify: {weapon.Name}
        </Typography>

        {/* Stat preview */}
        <Paper variant="outlined" sx={{ p: 1.5, mb: 2, display: "flex", flexWrap: "wrap", gap: 3 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">Conceal</Typography>
            <Typography variant="body1" fontWeight="bold">
              <StatDelta base={baseConceal} modified={conceal} lowerIsBetter={false} />
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Mode</Typography>
            <Typography variant="body1" fontWeight="bold">
              <StatDelta base={baseMode} modified={mode} />
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Damage</Typography>
            <Typography variant="body1" fontWeight="bold">
              <StatDelta base={baseDamage} modified={damage} />
            </Typography>
          </Box>
          {recoilComp > 0 && (
            <Box>
              <Typography variant="caption" color="text.secondary">RC from Mods</Typography>
              <Typography variant="body1" fontWeight="bold" color="success.main">+{recoilComp}</Typography>
            </Box>
          )}
          {tnMod !== 0 && (
            <Box>
              <Typography variant="caption" color="text.secondary">TN Mod</Typography>
              <Typography variant="body1" fontWeight="bold" color={tnMod < 0 ? "success.main" : "error.main"}>
                {tnMod > 0 ? "+" : ""}{tnMod}
              </Typography>
            </Box>
          )}
          <Box>
            <Typography variant="caption" color="text.secondary">Mod Cost</Typography>
            <Typography variant="body1" fontWeight="bold">
              ¥{totalModCost.toLocaleString()}
            </Typography>
          </Box>
        </Paper>

        {/* Installed mods */}
        <Typography variant="subtitle1" gutterBottom>Installed Modifications ({mods.length})</Typography>
        {mods.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>None.</Typography>
        ) : (
          <Table size="small" sx={{ mb: 2 }}>
            <TableBody>
              {mods.map((m, i) => {
                const def = allMods.find((d) => d.id === m.id);
                return (
                  <TableRow key={i}>
                    <TableCell sx={{ fontWeight: "bold" }}>{m.label}</TableCell>
                    <TableCell sx={{ fontSize: "0.78rem", color: "text.secondary" }}>
                      {def?.notes ?? ""}
                      {m.note ? ` (${m.note})` : ""}
                    </TableCell>
                    <TableCell align="right">¥{(m.cost ?? 0).toLocaleString()}</TableCell>
                    <TableCell align="right">
                      <Button size="small" color="error" onClick={() => handleRemove(i)}>Remove</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Add mod picker */}
        <Typography variant="subtitle1" gutterBottom>Add Modification</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "flex-end", mb: 1 }}>
          <FormControl size="small" sx={{ minWidth: 260 }}>
            <InputLabel>Modification</InputLabel>
            <Select
              value={pendingId}
              label="Modification"
              onChange={(e) => { setPendingId(e.target.value); setPendingOptionIndex(null); setPendingNote(""); }}
            >
              <MenuItem value="">— choose —</MenuItem>
              {categories.map((cat) => [
                <MenuItem key={`cat-${cat}`} disabled sx={{ fontWeight: "bold", opacity: 1 }}>
                  — {allMods.find((m) => m.category === cat)
                      ? WeaponModsData.categories.find((c) => c.id === cat)?.name ?? cat
                      : cat} —
                </MenuItem>,
                ...allMods
                  .filter((m) => m.category === cat)
                  .map((m) => {
                    const isBlocked = blockedIds.has(m.id);
                    const isInstalled = installedIds.has(m.id);
                    const disabled = isBlocked || isInstalled;
                    const costLabel = m.dpOptions
                      ? `¥${m.dpOptions[0].costNuyen?.toLocaleString() ?? "var"}+`
                      : m.costNuyen != null ? `¥${m.costNuyen.toLocaleString()}` : "var";
                    return (
                      <MenuItem key={m.id} value={m.id} disabled={disabled}>
                        {m.name} ({costLabel})
                        {isInstalled ? " ✓" : ""}
                        {isBlocked ? " [conflict]" : ""}
                      </MenuItem>
                    );
                  }),
              ])}
            </Select>
          </FormControl>

          {pendingDef && hasOptions && (
            <FormControl size="small" sx={{ minWidth: 220 }}>
              <InputLabel>Option</InputLabel>
              <Select
                value={pendingOptionIndex ?? ""}
                label="Option"
                onChange={(e) => setPendingOptionIndex(Number(e.target.value))}
              >
                {pendingDef.dpOptions.map((opt, i) => (
                  <MenuItem key={i} value={i}>
                    {opt.label} {opt.costNuyen != null ? `(¥${opt.costNuyen.toLocaleString()})` : ""}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {pendingDef?.userInput && (
            <TextField
              size="small"
              label={pendingDef.userInput}
              value={pendingNote}
              onChange={(e) => setPendingNote(e.target.value)}
              sx={{ minWidth: 140 }}
            />
          )}

          <Button
            variant="outlined"
            size="small"
            onClick={handleAdd}
            disabled={!pendingId || (hasOptions && pendingOptionIndex == null)}
          >
            Add
          </Button>
        </Box>

        {/* Show description and restrictions for selected mod */}
        {pendingDef && (
          <Paper variant="outlined" sx={{ p: 1, mb: 2, fontSize: "0.82rem" }}>
            <strong>{pendingDef.name}</strong>
            {pendingDef.restrictions && (
              <Chip label={pendingDef.restrictions} size="small" color="warning" sx={{ ml: 1 }} />
            )}
            <br />
            {pendingDef.description}
            {pendingDef.notes && (
              <Box sx={{ mt: 0.5, color: "text.secondary" }}>
                <em>{pendingDef.notes}</em>
              </Box>
            )}
            <Box sx={{ mt: 0.5, color: "text.secondary", fontSize: "0.78rem" }}>
              Mount: {pendingDef.mount} | Tools: {pendingDef.tools} | Skill: {pendingDef.skill}
              {" "}| Install TN: {pendingDef.installTN} | Base Time: {pendingDef.baseTimeHours}h
            </Box>
          </Paper>
        )}

        {pendingDef?.incompatibleWith?.length > 0 && (
          <Alert severity="info" sx={{ mb: 1, fontSize: "0.8rem" }}>
            Incompatible with: {pendingDef.incompatibleWith
              .map((id) => allMods.find((m) => m.id === id)?.name ?? id)
              .join(", ")}
          </Alert>
        )}

        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save Modifications</Button>
        </Box>
      </Box>
    </Modal>
  );
}
