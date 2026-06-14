import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";

import EdgesFlawsData from "../data/SR3/EdgesAndFlaws.json";

const MAX_EDGES = 5;
const MAX_FLAWS = 5;
const MAX_POINTBUY_BP = 6;

// Returns the point value for an item given its selection (which may include a chosen cost option)
function getItemCost(item, chosenCost) {
  if (item.costOptions) return chosenCost ?? item.costOptions[0].value;
  return item.cost;
}

function findDefinition(id, type) {
  return (type === "edge" ? EdgesFlawsData.edges : EdgesFlawsData.flaws).find(
    (x) => x.id === id
  );
}

function CostBadge({ value }) {
  const display = value > 0 ? `+${value}` : `${value}`;
  return (
    <Chip
      label={display}
      size="small"
      color={value > 0 ? "success" : "error"}
      sx={{ fontWeight: "bold", minWidth: 42 }}
    />
  );
}

function ItemPicker({ type, selectedItems, onAdd, cgmethod }) {
  const pool = type === "edge" ? EdgesFlawsData.edges : EdgesFlawsData.flaws;
  const [selectedId, setSelectedId] = useState("");
  const [chosenCost, setChosenCost] = useState(null);
  const [userInput, setUserInput] = useState("");

  const currentDef = pool.find((x) => x.id === selectedId);

  const handleSelectChange = (id) => {
    setSelectedId(id);
    setChosenCost(null);
    setUserInput("");
  };

  const handleAdd = () => {
    if (!selectedId) return;
    const def = pool.find((x) => x.id === selectedId);
    const cost = getItemCost(def, chosenCost);
    onAdd({ id: selectedId, cost, note: userInput || undefined });
    setSelectedId("");
    setChosenCost(null);
    setUserInput("");
  };

  const atMax =
    selectedItems.filter((x) => x.type === type).length >= MAX_EDGES;

  const label = type === "edge" ? "Edge" : "Flaw";

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "flex-end" }}>
      <FormControl size="small" sx={{ minWidth: 220 }}>
        <InputLabel>Add {label}</InputLabel>
        <Select
          value={selectedId}
          label={`Add ${label}`}
          onChange={(e) => handleSelectChange(e.target.value)}
        >
          <MenuItem value="">— choose —</MenuItem>
          {pool.map((item) => {
            const baseCost = item.costOptions
              ? `${item.costOptions[0].value}…`
              : item.cost;
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.name} ({baseCost > 0 ? `+${baseCost}` : baseCost})
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {currentDef?.costOptions && (
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Level</InputLabel>
          <Select
            value={chosenCost ?? ""}
            label="Level"
            onChange={(e) => setChosenCost(Number(e.target.value))}
          >
            {currentDef.costOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label} ({opt.value > 0 ? `+${opt.value}` : opt.value})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {currentDef?.userInput && (
        <TextField
          size="small"
          label={currentDef.userInput}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          sx={{ minWidth: 160 }}
        />
      )}

      <Button
        variant="outlined"
        size="small"
        onClick={handleAdd}
        disabled={
          !selectedId ||
          (currentDef?.costOptions && chosenCost === null) ||
          atMax
        }
      >
        Add {label}
      </Button>
    </Box>
  );
}

export default function EdgesFlawsPanel(props) {
  const { edges, flaws, cgmethod, onChangeEdges, onChangeFlaws } = props;

  const edgeCount = edges.length;
  const flawCount = flaws.length;

  const edgeBP = edges.reduce((sum, e) => sum + e.cost, 0);
  const flawBP = flaws.reduce((sum, f) => sum + f.cost, 0);
  const netBP = edgeBP + flawBP; // flaws are negative, so net = edges - |flaws|

  const isPriority = cgmethod === "priorities";

  let balanceValid = true;
  let balanceMessage = "";
  if (isPriority) {
    if (netBP !== 0) {
      balanceValid = false;
      balanceMessage = `In Priority creation, Edges and Flaws must net to 0 BP. Current net: ${netBP > 0 ? "+" : ""}${netBP} BP.`;
    }
  } else {
    // Point Buy: can spend up to 6 BP on edges (gaining from flaws) or gain up to 6 BP from flaws
    if (netBP > MAX_POINTBUY_BP) {
      balanceValid = false;
      balanceMessage = `Edges exceed Flaws by ${netBP} BP. Max net spend in Point Buy is ${MAX_POINTBUY_BP} BP.`;
    } else if (netBP < -MAX_POINTBUY_BP) {
      balanceValid = false;
      balanceMessage = `Flaws exceed Edges by ${Math.abs(netBP)} BP. Max net gain in Point Buy is ${MAX_POINTBUY_BP} BP.`;
    }
  }

  const handleAddEdge = (item) => {
    const def = findDefinition(item.id, "edge");
    onChangeEdges([...edges, { ...item, type: "edge", name: def.name }]);
  };

  const handleAddFlaw = (item) => {
    const def = findDefinition(item.id, "flaw");
    onChangeFlaws([...flaws, { ...item, type: "flaw", name: def.name }]);
  };

  const handleRemoveEdge = (index) => {
    onChangeEdges(edges.filter((_, i) => i !== index));
  };

  const handleRemoveFlaw = (index) => {
    onChangeFlaws(flaws.filter((_, i) => i !== index));
  };

  const categories = [
    "Attributes",
    "Skills",
    "Physical",
    "Mental",
    "Social",
    "Magical",
    "Matrix",
    "Miscellaneous",
  ];

  return (
    <Box sx={{ p: 2, maxWidth: 900 }}>
      <Typography variant="h5" gutterBottom>
        Edges &amp; Flaws
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Max 5 Edges and 5 Flaws.{" "}
        {isPriority
          ? "In Priority creation, total BP must net to zero."
          : `In Point Buy, net spend/gain is capped at ${MAX_POINTBUY_BP} BP.`}
      </Typography>

      {/* Balance summary */}
      <Paper
        variant="outlined"
        sx={{ p: 1.5, mb: 2, display: "flex", gap: 3, flexWrap: "wrap", alignItems: "center" }}
      >
        <Box>
          <Typography variant="caption" color="text.secondary">
            Edges
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {edgeCount} / {MAX_EDGES} ({edgeBP > 0 ? "+" : ""}{edgeBP} BP)
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Flaws
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {flawCount} / {MAX_FLAWS} ({flawBP} BP)
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Net
          </Typography>
          <Typography
            variant="body1"
            fontWeight="bold"
            color={balanceValid ? "success.main" : "error.main"}
          >
            {netBP > 0 ? "+" : ""}{netBP} BP
          </Typography>
        </Box>
        {!balanceValid && (
          <Alert severity="warning" sx={{ flex: 1 }}>
            {balanceMessage}
          </Alert>
        )}
      </Paper>

      {/* Selected Edges */}
      <Typography variant="h6" gutterBottom>
        Selected Edges
      </Typography>
      {edges.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          No edges selected.
        </Typography>
      ) : (
        <Box sx={{ mb: 1 }}>
          {edges.map((e, i) => {
            const def = findDefinition(e.id, "edge");
            return (
              <Paper
                key={i}
                variant="outlined"
                sx={{
                  p: 1,
                  mb: 0.5,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                }}
              >
                <CostBadge value={e.cost} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {e.name}
                    {e.note ? ` (${e.note})` : ""}
                  </Typography>
                  {def && (
                    <Typography variant="caption" color="text.secondary">
                      {def.description}
                    </Typography>
                  )}
                </Box>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleRemoveEdge(i)}
                >
                  Remove
                </Button>
              </Paper>
            );
          })}
        </Box>
      )}

      {edges.length < MAX_EDGES && (
        <Box sx={{ mb: 2 }}>
          <ItemPicker
            type="edge"
            selectedItems={edges}
            onAdd={handleAddEdge}
            cgmethod={cgmethod}
          />
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Selected Flaws */}
      <Typography variant="h6" gutterBottom>
        Selected Flaws
      </Typography>
      {flaws.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          No flaws selected.
        </Typography>
      ) : (
        <Box sx={{ mb: 1 }}>
          {flaws.map((f, i) => {
            const def = findDefinition(f.id, "flaw");
            return (
              <Paper
                key={i}
                variant="outlined"
                sx={{
                  p: 1,
                  mb: 0.5,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                }}
              >
                <CostBadge value={f.cost} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    {f.name}
                    {f.note ? ` (${f.note})` : ""}
                  </Typography>
                  {def && (
                    <Typography variant="caption" color="text.secondary">
                      {def.description}
                    </Typography>
                  )}
                </Box>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleRemoveFlaw(i)}
                >
                  Remove
                </Button>
              </Paper>
            );
          })}
        </Box>
      )}

      {flaws.length < MAX_FLAWS && (
        <Box sx={{ mb: 2 }}>
          <ItemPicker
            type="flaw"
            selectedItems={flaws}
            onAdd={handleAddFlaw}
            cgmethod={cgmethod}
          />
        </Box>
      )}

      {/* Browse all Edges & Flaws */}
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" gutterBottom>
        Reference
      </Typography>
      {categories.map((cat) => {
        const catEdges = EdgesFlawsData.edges.filter((e) => e.category === cat);
        const catFlaws = EdgesFlawsData.flaws.filter((f) => f.category === cat);
        if (!catEdges.length && !catFlaws.length) return null;
        return (
          <Box key={cat} sx={{ mb: 1.5 }}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              {cat}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {catEdges.map((e) => (
                <Chip
                  key={e.id}
                  size="small"
                  color="success"
                  variant="outlined"
                  label={`${e.name} (${e.costOptions ? e.costOptions.map((o) => o.value).join("/") : "+" + e.cost})`}
                  title={e.description + (e.restrictions ? " [" + e.restrictions + "]" : "")}
                />
              ))}
              {catFlaws.map((f) => (
                <Chip
                  key={f.id}
                  size="small"
                  color="error"
                  variant="outlined"
                  label={`${f.name} (${f.costOptions ? f.costOptions.map((o) => o.value).join("/") : f.cost})`}
                  title={f.description + (f.restrictions ? " [" + f.restrictions + "]" : "")}
                />
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
