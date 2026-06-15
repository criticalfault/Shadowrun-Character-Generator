import React, { useState, useEffect } from "react";
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

import VehicleModsData from "../data/SR3/VehicleMods.json";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(960px, 95vw)",
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "1px solid #555",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

// Parse "X/Y" stat strings like "4/0" into { a, b }
function parseSplit(str) {
  if (!str) return { a: null, b: null };
  const parts = String(str).split("/");
  return { a: parseFloat(parts[0]) || 0, b: parseFloat(parts[1]) || 0 };
}

// Compute modified stats from applied vehicleMods
export function applyVehicleMods(vehicle, vehicleMods = []) {
  const allMods = VehicleModsData.mods;

  const bodyArmor = parseSplit(vehicle["Body/Armor"]);
  const sigAutonav = parseSplit(vehicle["Sig/Autonav"]);
  const pilotSensor = parseSplit(vehicle["Pilot/Sensor"]);
  const baseHandling = parseFloat(vehicle.Handling) || 0;

  let handlingDelta = 0;
  let armorDelta = 0;
  let sigDelta = 0;
  let pilotRating = pilotSensor.a; // "-" stays as-is unless set
  let autonavRating = sigAutonav.b;
  let ecmRating = null;
  let eccmRating = null;
  let totalModCost = 0;

  for (const applied of vehicleMods) {
    const def = allMods.find((d) => d.id === applied.id);
    if (!def) continue;

    // Cost — rated mods use their rating row; vehicle-cost-% mods use $Cost; per-level mods multiply
    if (applied.rating != null && def.ratings) {
      const row = def.ratings.find((r) => r.rating === applied.rating);
      totalModCost += row?.costNuyen ?? applied.userCost ?? 0;
    } else if (def.vehicleCostFactor != null) {
      const baseCost = parseFloat(vehicle["$Cost"]) || 0;
      totalModCost += baseCost * def.vehicleCostFactor * (applied.levelCount ?? 1);
    } else if (typeof def.costNuyen === "number") {
      totalModCost += def.costNuyen * (applied.levelCount ?? 1);
    } else {
      totalModCost += applied.userCost ?? 0;
    }

    const sm = def.statMods ?? {};

    // Handling: mods express delta as "-1/level" etc — use applied.levelCount
    if (sm.handling) {
      const delta = parseHandlingDelta(sm.handling, applied.levelCount ?? 1);
      handlingDelta += delta;
    }

    // Armor: vehicle-armor / concealed-armor / ablative-armor
    if (sm.armor) {
      const delta = parseArmorDelta(sm.armor, applied.levelCount ?? 1);
      armorDelta += delta;
    }

    // Sig: thermal-baffles, RAM, turbocharging, active-thermal-masking
    if (sm.sig) {
      const delta = parseSigDelta(sm.sig, applied.levelCount ?? 1, applied.rating ?? 1);
      sigDelta += delta;
    }

    // Pilot rating override
    if (sm.pilot === "set to rating" && applied.rating != null) {
      pilotRating = applied.rating;
    }

    // Autonav rating override
    if (sm.autonav === "set to rating" && applied.rating != null) {
      autonavRating = applied.rating;
    }

    // ECM / ECCM
    if (sm.ecm === "set to rating" && applied.rating != null) ecmRating = applied.rating;
    if (sm.eccm === "set to rating" && applied.rating != null) eccmRating = applied.rating;
  }

  return {
    handlingDelta,
    armorDelta,
    sigDelta,
    pilotRating,
    autonavRating,
    ecmRating,
    eccmRating,
    totalModCost,
  };
}

function parseHandlingDelta(expr, levels) {
  // e.g. "-1/level (on-road)", "+1 when loaded (penalty)"
  const m = String(expr).match(/([+-]?\d+)/);
  if (!m) return 0;
  return parseInt(m[1]) * levels;
}

function parseArmorDelta(expr, levels) {
  const m = String(expr).match(/([+-]?\d+)/);
  if (!m) return 0;
  return parseInt(m[1]) * levels;
}

function parseSigDelta(expr, levels, rating) {
  // e.g. "+1/level", "-1/level"
  const m = String(expr).match(/([+-]?\d+)/);
  if (!m) return 0;
  return parseInt(m[1]) * (String(expr).includes("level") ? levels : rating);
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

// Does this mod need a rating selection?
function isRatedMod(def) {
  return Array.isArray(def?.ratings) && def.ratings.length > 0;
}

// Does this mod benefit from a "levels" count (e.g. vehicle-armor, thermal-baffles)?
function needsLevelCount(def) {
  if (!def) return false;
  if (def.vehicleCostFactor != null) return true;
  const sm = def.statMods ?? {};
  return (
    (sm.armor && String(sm.armor).includes("/point")) ||
    (sm.handling && (String(sm.handling).includes("/level") || String(sm.handling).includes("/increment"))) ||
    (sm.sig && String(sm.sig).includes("/level"))
  );
}

// Does this mod have a formula cost (string) that needs user input?
function needsUserCost(def) {
  if (!def) return false;
  if (isRatedMod(def)) return false;
  if (def.vehicleCostFactor != null) return false;
  return typeof def.costNuyen === "string";
}

export default function VehicleModsModal({ open, vehicle, vehicleIndex, onClose, onSave }) {
  const [mods, setMods] = useState(vehicle?.vehicleMods ?? []);
  const [pendingId, setPendingId] = useState("");
  const [pendingRating, setPendingRating] = useState(1);
  const [pendingLevelCount, setPendingLevelCount] = useState(1);
  const [pendingUserCost, setPendingUserCost] = useState("");

  useEffect(() => {
    setMods(vehicle?.vehicleMods ?? []);
    setPendingId("");
    setPendingRating(1);
    setPendingLevelCount(1);
    setPendingUserCost("");
  }, [vehicle, vehicleIndex]);

  if (!vehicle) return null;

  const allMods = VehicleModsData.mods.filter((m) => !m.designOnly);
  const categories = VehicleModsData.categories;

  const pendingDef = allMods.find((d) => d.id === pendingId);
  const pendingIsRated = isRatedMod(pendingDef);
  const pendingNeedsLevels = needsLevelCount(pendingDef);
  const pendingNeedsUserCost = needsUserCost(pendingDef);

  const stats = applyVehicleMods(vehicle, mods);

  // Parse base stat values for display
  const baseHandling = parseFloat(vehicle.Handling) || 0;
  const baseArmor = parseSplit(vehicle["Body/Armor"]).b;
  const baseSig = parseSplit(vehicle["Sig/Autonav"]).a;
  const baseAutonav = parseSplit(vehicle["Sig/Autonav"]).b;
  const basePilot = parseSplit(vehicle["Pilot/Sensor"]).a;

  const modifiedHandling = baseHandling + stats.handlingDelta;
  const modifiedArmor = baseArmor + stats.armorDelta;
  const modifiedSig = baseSig + stats.sigDelta;

  const handleAdd = () => {
    if (!pendingId || !pendingDef) return;
    let cost = 0;
    let label = pendingDef.name;

    if (pendingIsRated) {
      const row = pendingDef.ratings.find((r) => r.rating === pendingRating);
      cost = row?.costNuyen ?? 0;
      label = `${pendingDef.name} (Rating ${pendingRating})`;
    } else if (pendingNeedsLevels) {
      label = `${pendingDef.name} (×${pendingLevelCount})`;
      if (pendingDef.vehicleCostFactor != null) {
        cost = (parseFloat(vehicle["$Cost"]) || 0) * pendingDef.vehicleCostFactor * pendingLevelCount;
      } else if (typeof pendingDef.costNuyen === "number") {
        cost = pendingDef.costNuyen * pendingLevelCount;
      }
    } else if (pendingNeedsUserCost) {
      cost = parseInt(pendingUserCost) || 0;
    } else if (typeof pendingDef.costNuyen === "number") {
      cost = pendingDef.costNuyen;
    }

    const entry = {
      id: pendingId,
      label,
      cost,
      rating: pendingIsRated ? pendingRating : undefined,
      levelCount: pendingNeedsLevels ? pendingLevelCount : undefined,
      userCost: pendingNeedsUserCost ? (parseInt(pendingUserCost) || 0) : undefined,
    };
    setMods([...mods, entry]);
    setPendingId("");
    setPendingRating(1);
    setPendingLevelCount(1);
    setPendingUserCost("");
  };

  const handleRemove = (i) => setMods(mods.filter((_, idx) => idx !== i));

  const handleSave = () => {
    onSave(vehicleIndex, mods);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Modify: {vehicle.name}
        </Typography>

        {/* Stat preview */}
        <Paper variant="outlined" sx={{ p: 1.5, mb: 2, display: "flex", flexWrap: "wrap", gap: 3 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">Handling</Typography>
            <Typography variant="body1" fontWeight="bold">
              <StatDelta base={baseHandling} modified={modifiedHandling} lowerIsBetter={true} />
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Armor</Typography>
            <Typography variant="body1" fontWeight="bold">
              <StatDelta base={baseArmor} modified={modifiedArmor} />
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Sig</Typography>
            <Typography variant="body1" fontWeight="bold">
              <StatDelta base={baseSig} modified={modifiedSig} />
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Pilot</Typography>
            <Typography variant="body1" fontWeight="bold">
              <StatDelta base={basePilot} modified={stats.pilotRating} />
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Autonav</Typography>
            <Typography variant="body1" fontWeight="bold">
              <StatDelta base={baseAutonav} modified={stats.autonavRating} />
            </Typography>
          </Box>
          {stats.ecmRating != null && (
            <Box>
              <Typography variant="caption" color="text.secondary">ECM</Typography>
              <Typography variant="body1" fontWeight="bold" color="success.main">{stats.ecmRating}</Typography>
            </Box>
          )}
          {stats.eccmRating != null && (
            <Box>
              <Typography variant="caption" color="text.secondary">ECCM</Typography>
              <Typography variant="body1" fontWeight="bold" color="success.main">{stats.eccmRating}</Typography>
            </Box>
          )}
          <Box>
            <Typography variant="caption" color="text.secondary">Mod Cost</Typography>
            <Typography variant="body1" fontWeight="bold">¥{stats.totalModCost.toLocaleString()}</Typography>
          </Box>
        </Paper>

        {/* Installed mods */}
        <Typography variant="subtitle1" gutterBottom>
          Installed Modifications ({mods.length})
        </Typography>
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
                      {def?.restrictions ?? ""}
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
          <FormControl size="small" sx={{ minWidth: 280 }}>
            <InputLabel>Modification</InputLabel>
            <Select
              value={pendingId}
              label="Modification"
              onChange={(e) => {
                setPendingId(e.target.value);
                setPendingRating(1);
                setPendingLevelCount(1);
                setPendingUserCost("");
              }}
            >
              <MenuItem value="">— choose —</MenuItem>
              {categories
                .filter((cat) => allMods.some((m) => m.category === cat.id))
                .map((cat) => [
                  <MenuItem key={`cat-${cat.id}`} disabled sx={{ fontWeight: "bold", opacity: 1 }}>
                    — {cat.name} —
                  </MenuItem>,
                  ...allMods
                    .filter((m) => m.category === cat.id)
                    .map((m) => {
                      let costLabel = "";
                      if (Array.isArray(m.ratings)) {
                        costLabel = `¥${m.ratings[0].costNuyen.toLocaleString()}+`;
                      } else if (typeof m.costNuyen === "number") {
                        costLabel = `¥${m.costNuyen.toLocaleString()}`;
                      } else {
                        costLabel = "formula";
                      }
                      return (
                        <MenuItem key={m.id} value={m.id}>
                          {m.name} ({costLabel})
                        </MenuItem>
                      );
                    }),
                ])}
            </Select>
          </FormControl>

          {/* Rating selector for ECM/ECCM/ED and other rated mods */}
          {pendingIsRated && (
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Rating</InputLabel>
              <Select
                value={pendingRating}
                label="Rating"
                onChange={(e) => setPendingRating(Number(e.target.value))}
              >
                {pendingDef.ratings.map((row) => (
                  <MenuItem key={row.rating} value={row.rating}>
                    Rating {row.rating} — ¥{row.costNuyen.toLocaleString()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Level count for per-level mods like armor, thermal baffles, % cost mods */}
          {!pendingIsRated && pendingNeedsLevels && (
            <TextField
              size="small"
              label="Levels / Points"
              type="number"
              inputProps={{ min: 1, max: 20 }}
              value={pendingLevelCount}
              onChange={(e) => setPendingLevelCount(Math.max(1, parseInt(e.target.value) || 1))}
              sx={{ width: 130 }}
              helperText={
                pendingDef?.vehicleCostFactor != null
                  ? `¥${((parseFloat(vehicle["$Cost"]) || 0) * pendingDef.vehicleCostFactor * pendingLevelCount).toLocaleString()} total`
                  : typeof pendingDef?.costNuyen === "number"
                  ? `¥${(pendingDef.costNuyen * pendingLevelCount).toLocaleString()} total`
                  : ""
              }
            />
          )}

          {/* Manual cost for formula-based mods */}
          {pendingNeedsUserCost && (
            <TextField
              size="small"
              label="Cost (¥)"
              type="number"
              value={pendingUserCost}
              onChange={(e) => setPendingUserCost(e.target.value)}
              sx={{ width: 120 }}
              helperText={typeof pendingDef?.costNuyen === "string" ? pendingDef.costNuyen : ""}
            />
          )}

          <Button
            variant="outlined"
            size="small"
            onClick={handleAdd}
            disabled={!pendingId}
          >
            Add
          </Button>
        </Box>

        {/* Description panel for selected mod */}
        {pendingDef && (
          <Paper variant="outlined" sx={{ p: 1, mb: 2, fontSize: "0.82rem" }}>
            <strong>{pendingDef.name}</strong>
            {pendingDef.restrictions && (
              <Chip label={pendingDef.restrictions} size="small" color="warning" sx={{ ml: 1, maxWidth: 300, height: "auto", "& .MuiChip-label": { whiteSpace: "normal" } }} />
            )}
            <br />
            {pendingDef.description}
            {pendingDef.notes && (
              <Box sx={{ mt: 0.5, color: "text.secondary" }}>
                <em>{pendingDef.notes}</em>
              </Box>
            )}
            <Box sx={{ mt: 0.5, color: "text.secondary", fontSize: "0.78rem" }}>
              Equipment: {pendingDef.equipment} | Skill: {pendingDef.skill}
              {pendingDef.skillTN != null ? ` (TN ${pendingDef.skillTN})` : ""}
              {" "}| Base Time: {pendingDef.baseTimeHours}h
              {" "}| Avail: {pendingDef.availability} | SI: {pendingDef.streetIndex}
            </Box>
            {pendingIsRated && (() => {
              const row = pendingDef.ratings.find((r) => r.rating === pendingRating);
              return row ? (
                <Box sx={{ mt: 0.5, fontSize: "0.78rem" }}>
                  Rating {pendingRating}: CF (design/custom) {row.cfDesign}/{row.cfCustom} | Weight {row.weightKg} kg | Avail {row.availability} | SI {row.streetIndex}
                </Box>
              ) : null;
            })()}
          </Paper>
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
