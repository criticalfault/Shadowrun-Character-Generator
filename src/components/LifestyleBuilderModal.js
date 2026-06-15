import React, { useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import LifestyleEdgesFlaws from '../data/SR3/SSGLifestyleEdgesFlaws.json';

// Lifestyle Costs Table from SSG p.128
const COST_TABLE = {
  '-1': 0, 0: 15, 1: 30, 2: 45, 3: 60, 4: 70, 5: 85,
  6: 100, 7: 250, 8: 400, 9: 550, 10: 700, 11: 850,
  12: 1000, 13: 1650, 14: 2350, 15: 3000, 16: 3650, 17: 4350,
  18: 5000, 19: 5850, 20: 6650, 21: 7500, 22: 8350, 23: 9150,
  24: 10000, 25: 25000, 26: 40000, 27: 55000, 28: 70000, 29: 85000,
  30: 100000, 31: 125000, 32: 150000,
};

const getBaseCost = (points) => {
  const clamped = Math.max(-1, Math.min(32, points));
  return COST_TABLE[clamped] ?? (clamped > 32 ? 150000 : 0);
};

const SR3_EQUIV = { '-1': 'Street', 6: 'Squatter', 12: 'Low', 18: 'Middle', 24: 'High', 30: 'Luxury' };
const getSR3Equiv = (points) => {
  const clamped = Math.max(-1, Math.min(32, points));
  const keys = Object.keys(SR3_EQUIV).map(Number).sort((a,b)=>a-b);
  let label = 'Street';
  for (const k of keys) { if (clamped >= k) label = SR3_EQUIV[k]; }
  return label;
};

const CATEGORIES = {
  Area: {
    label: 'Area',
    description: 'Security rating of the neighborhood you live in.',
    options: [
      { label: 'Z-Zone (–1 pt)', value: -1, description: 'Worst area possible. Law enforcement never comes. Ghouls and street-level desperation.' },
      { label: 'E-Rated (0 pts)', value: 0, description: 'Filled with transients, refugees, and gang activity. Police presence is spotty at best.' },
      { label: 'D-Rated (1 pt)', value: 1, description: 'Dirty, run-down business district. Crime is common.' },
      { label: 'C-Rated (2 pts)', value: 2, description: 'Residential area that has seen better times. Dilapidated buildings, petty crime.' },
      { label: 'B-Rated (3 pts)', value: 3, description: 'Business district in a better part of town. Some crime, but walkable at night.' },
      { label: 'A-Rated (4 pts)', value: 4, description: 'Corporate enclave or better residential area. Cops respond to calls.' },
      { label: 'AA-Rated (5 pts)', value: 5, description: 'Among the best neighborhoods. Solid security presence.' },
      { label: 'AAA-Rated (6 pts)', value: 6, description: 'Most prestigious part of town. Private security patrols, crime kept to minimum.' },
    ],
  },
  Comforts: {
    label: 'Comforts',
    description: 'Basic necessities: food, clothing, and household amenities.',
    options: [
      { label: 'Street (0 pts)', value: 0, description: 'Comfort is where you find it. You frequently go hungry or cold.' },
      { label: 'Squatter (1 pt)', value: 1, description: 'Power and water from portable sources. Food fills your stomach but barely.' },
      { label: 'Low (2 pts)', value: 2, description: 'Electricity and water in your apartment, though prone to outages.' },
      { label: 'Middle (3 pts)', value: 3, description: 'Water and power only go out during brownouts. Mix of real food and processed soy.' },
      { label: 'High (4 pts)', value: 4, description: 'Good, real food on the table. High-tech appliances and one or two people for the dirty work.' },
      { label: 'Luxury (5 pts)', value: 5, description: 'Just about everything that makes life more comfortable. Small staff maintains your home.' },
    ],
  },
  Entertainment: {
    label: 'Entertainment',
    description: 'What you have to do in your home. Cannot exceed Comforts level by more than 1.',
    options: [
      { label: 'Street (0 pts)', value: 0, description: 'No entertainment to speak of. Maybe a leftover magazine from a garbage can.' },
      { label: 'Squatter (1 pt)', value: 1, description: 'Dependent on elderly or malfunctioning devices. Drinking on the stoop.' },
      { label: 'Low (2 pts)', value: 2, description: 'Basic necessities of modern living. Basic Matrix access, home stereo, trideo.' },
      { label: 'Middle (3 pts)', value: 3, description: 'Well equipped to entertain. Premium Matrix access, simsense deck.' },
      { label: 'High (4 pts)', value: 4, description: 'More entertainment than most people see in their lives. High-speed Matrix, high-end simsense.' },
      { label: 'Luxury (5 pts)', value: 5, description: 'Just about nothing you don\'t have. Private club membership, complete home entertainment center.' },
    ],
  },
  Furnishings: {
    label: 'Furnishings',
    description: 'How your place is decorated. Independent of its size.',
    options: [
      { label: 'Street (0 pts)', value: 0, description: 'Furnishings? A coat, trousers, shoes, shirt.' },
      { label: 'Squatter (1 pt)', value: 1, description: 'A few bits and pieces. Ancient furniture constantly needing minor repairs.' },
      { label: 'Low (2 pts)', value: 2, description: 'Some cheap furniture, probably bought new. Enough to reasonably fill a small apartment.' },
      { label: 'Middle (3 pts)', value: 3, description: 'Decent furniture in a style of your taste. Mass-production art, S-Kea furniture.' },
      { label: 'High (4 pts)', value: 4, description: 'All the furnishings your heart desires. Good quality by designers with a name.' },
      { label: 'Luxury (5 pts)', value: 5, description: 'LOTS of furniture by prestigious designers using exotic materials. Gold-plated faucets.' },
    ],
  },
  Security: {
    label: 'Security',
    description: 'How difficult it is for others to gain access to your property.',
    options: [
      { label: 'Street (0 pts, Rating 1)', value: 0, description: 'No security except what you create yourself. Looking tough, tin can on a tripwire.' },
      { label: 'Squatter (1 pt, Rating 2)', value: 1, description: 'Can store valuables out of reach of common thieves. Simple mechanical lock.' },
      { label: 'Low (2 pts, Rating 3)', value: 2, description: 'Good enough to delay serious attempts. Average safe, big dog, payments to local gang.' },
      { label: 'Middle (3 pts, Rating 4)', value: 3, description: 'Keeps out casual and determined thieves. Decent maglocks, PANICBUTTON alarm.' },
      { label: 'High (4 pts, Rating 6)', value: 4, description: 'Good locks and alarms plus security company contract. Difficult for experienced thieves.' },
      { label: 'Luxury (5 pts, Rating 8)', value: 5, description: 'So good it sometimes gets in your way. Paranormal animals, guard spirits, automatic guns.' },
    ],
  },
  Space: {
    label: 'Space',
    description: 'The size of your dwelling. Interior decoration is covered by Furnishings.',
    options: [
      { label: 'Street (0 pts)', value: 0, description: 'No building at all. Park bench, doorway, under a highway overpass.' },
      { label: 'Squatter (1 pt)', value: 1, description: 'At least a roof over your head. Coffin hotel, cardboard box, shantytown hut.' },
      { label: 'Low (2 pts)', value: 2, description: 'Tiny apartment ~50m². One-bedroom apartment, council flat.' },
      { label: 'Middle (3 pts)', value: 3, description: 'Decent apartment ~100m² or small house with garden. Two- or three-bedroom apartment.' },
      { label: 'High (4 pts)', value: 4, description: 'Large apartment ~300m² or moderately-sized house with garden. Converted loft.' },
      { label: 'Luxury (5 pts)', value: 5, description: 'Multi-story penthouse or villa, 750m²+. More rooms than you\'ll ever really need.' },
    ],
  },
};

export default function LifestyleBuilderModal({ open, onClose, onPurchase }) {
  const defaultSelections = { Area: 3, Comforts: 3, Entertainment: 3, Furnishings: 3, Security: 3, Space: 3 };
  const [selections, setSelections] = useState(defaultSelections);
  const [months, setMonths] = useState(1);
  const [customName, setCustomName] = useState('');
  const [selectedEdges, setSelectedEdges] = useState([]);
  const [selectedFlaws, setSelectedFlaws] = useState([]);

  const totalPoints = useMemo(() =>
    Object.values(selections).reduce((s, v) => s + v, 0),
    [selections]
  );

  const baseMonthlyCost = getBaseCost(totalPoints);

  const edgeFlaw_modifier = useMemo(() => {
    const edgeSum = selectedEdges.reduce((s, id) => {
      const e = LifestyleEdgesFlaws.edges.find(x => x.id === id);
      return s + (e?.value ?? 0);
    }, 0);
    const flawSum = selectedFlaws.reduce((s, id) => {
      const f = LifestyleEdgesFlaws.flaws.find(x => x.id === id);
      return s + (f?.value ?? 0);
    }, 0);
    const total = edgeSum + flawSum;
    return Math.max(-0.5, Math.min(0.5, total));
  }, [selectedEdges, selectedFlaws]);

  const finalMonthlyCost = Math.round(baseMonthlyCost * (1 + edgeFlaw_modifier));
  const totalCost = finalMonthlyCost * months;

  const toggleEdge = (id) => {
    setSelectedEdges(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleFlaw = (id) => {
    setSelectedFlaws(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const isEdgeDisabled = (id) => {
    const edge = LifestyleEdgesFlaws.edges.find(x => x.id === id);
    if (!edge) return false;
    if (edge.incompatible_with?.some(inc => selectedEdges.includes(inc) || selectedFlaws.includes(inc))) return true;
    if (!selectedEdges.includes(id) && selectedEdges.length >= 5) return true;
    return false;
  };

  const isFlawDisabled = (id) => {
    const flaw = LifestyleEdgesFlaws.flaws.find(x => x.id === id);
    if (!flaw) return false;
    if (flaw.incompatible_with?.some(inc => selectedFlaws.includes(inc) || selectedEdges.includes(inc))) return true;
    if (!selectedFlaws.includes(id) && selectedFlaws.length >= 5) return true;
    return false;
  };

  const handlePurchase = () => {
    const sr3Equiv = getSR3Equiv(totalPoints);
    const categoryLabels = Object.entries(selections).map(([cat, val]) => {
      const opt = CATEGORIES[cat].options.find(o => o.value === val);
      return `${cat}: ${opt?.label?.split('(')[0].trim() ?? val}`;
    }).join(', ');

    const edgeNames = selectedEdges.map(id => LifestyleEdgesFlaws.edges.find(x => x.id === id)?.name).filter(Boolean);
    const flawNames = selectedFlaws.map(id => LifestyleEdgesFlaws.flaws.find(x => x.id === id)?.name).filter(Boolean);

    const name = customName.trim()
      ? `Custom Lifestyle: ${customName.trim()} (${months} month${months > 1 ? 's' : ''})`
      : `Custom Lifestyle (SSG) — ${sr3Equiv}-equiv, ${months} month${months > 1 ? 's' : ''}`;

    const notes = [
      `${totalPoints} pts | ${categoryLabels}`,
      edgeNames.length ? `Edges: ${edgeNames.join(', ')}` : '',
      flawNames.length ? `Flaws: ${flawNames.join(', ')}` : '',
      edgeFlaw_modifier !== 0 ? `Cost modifier: ${edgeFlaw_modifier >= 0 ? '+' : ''}${Math.round(edgeFlaw_modifier * 100)}%` : '',
      `Base: ${baseMonthlyCost.toLocaleString()}¥/mo → Final: ${finalMonthlyCost.toLocaleString()}¥/mo`,
    ].filter(Boolean).join(' | ');

    onPurchase({
      Name: name,
      Cost: String(totalCost),
      Amount: 1,
      Type: 'Lifestyles',
      BookPage: 'ssg.128',
      Availability: 'Always',
      'Street Index': '1',
      Notes: notes,
      _ssgLifestyle: true,
      _lifestyleData: { selections, months, edgeFlaw_modifier, finalMonthlyCost, totalPoints, sr3Equiv },
    });
    onClose();
  };

  const handleReset = () => {
    setSelections(defaultSelections);
    setMonths(1);
    setCustomName('');
    setSelectedEdges([]);
    setSelectedFlaws([]);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
      <DialogTitle>
        Custom Lifestyle Builder
        <span style={{ fontSize: '0.75em', fontWeight: 'normal', marginLeft: 12, color: '#aaa' }}>
          Sprawl Survival Guide pp.127–144
        </span>
      </DialogTitle>
      <DialogContent dividers>

        {/* ── Category pickers ── */}
        {Object.entries(CATEGORIES).map(([key, cat]) => (
          <div key={key} style={{ marginBottom: 20 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ fontWeight: 'bold' }}>
                {cat.label}
                <span style={{ fontWeight: 'normal', fontSize: '0.85em', marginLeft: 8, color: '#999' }}>
                  {cat.description}
                </span>
              </FormLabel>
              <RadioGroup
                row
                value={String(selections[key])}
                onChange={(e) => setSelections(prev => ({ ...prev, [key]: Number(e.target.value) }))}
              >
                {cat.options.map(opt => (
                  <Tooltip key={opt.value} title={opt.description} arrow placement="top">
                    <FormControlLabel
                      value={String(opt.value)}
                      control={<Radio size="small" />}
                      label={opt.label}
                      style={{ marginRight: 16 }}
                    />
                  </Tooltip>
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        ))}

        <Divider style={{ margin: '12px 0' }} />

        {/* ── Edges ── */}
        <div style={{ marginBottom: 16 }}>
          <strong>Lifestyle Edges</strong>
          <span style={{ fontSize: '0.8em', color: '#aaa', marginLeft: 8 }}>
            (max 5 — each raises monthly cost)
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {LifestyleEdgesFlaws.edges.map(edge => {
              const selected = selectedEdges.includes(edge.id);
              const disabled = !selected && isEdgeDisabled(edge.id);
              return (
                <Tooltip key={edge.id} title={`${edge.description}  |  Value: +${edge.value}`} arrow>
                  <span>
                    <Chip
                      label={`${edge.name} (+${edge.value})`}
                      onClick={() => !disabled && toggleEdge(edge.id)}
                      color={selected ? 'success' : 'default'}
                      variant={selected ? 'filled' : 'outlined'}
                      size="small"
                      disabled={disabled}
                      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
                    />
                  </span>
                </Tooltip>
              );
            })}
          </div>
        </div>

        {/* ── Flaws ── */}
        <div style={{ marginBottom: 16 }}>
          <strong>Lifestyle Flaws</strong>
          <span style={{ fontSize: '0.8em', color: '#aaa', marginLeft: 8 }}>
            (max 5 — each lowers monthly cost)
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {LifestyleEdgesFlaws.flaws.map(flaw => {
              const selected = selectedFlaws.includes(flaw.id);
              const disabled = !selected && isFlawDisabled(flaw.id);
              return (
                <Tooltip key={flaw.id} title={`${flaw.description}  |  Value: ${flaw.value}`} arrow>
                  <span>
                    <Chip
                      label={`${flaw.name} (${flaw.value})`}
                      onClick={() => !disabled && toggleFlaw(flaw.id)}
                      color={selected ? 'warning' : 'default'}
                      variant={selected ? 'filled' : 'outlined'}
                      size="small"
                      disabled={disabled}
                      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
                    />
                  </span>
                </Tooltip>
              );
            })}
          </div>
        </div>

        <Divider style={{ margin: '12px 0' }} />

        {/* ── Cost summary ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 8 }}>
          <div>
            <strong>Total Points:</strong> {totalPoints} pts
            &nbsp;&nbsp;
            <strong>Equiv:</strong> {getSR3Equiv(totalPoints)}
            &nbsp;&nbsp;
            <strong>Base Cost:</strong> {baseMonthlyCost.toLocaleString()}¥/mo
            {edgeFlaw_modifier !== 0 && (
              <>&nbsp;&nbsp;<strong>Modifier:</strong> {edgeFlaw_modifier >= 0 ? '+' : ''}{Math.round(edgeFlaw_modifier * 100)}%</>
            )}
            &nbsp;&nbsp;
            <strong>Final Monthly:</strong> {finalMonthlyCost.toLocaleString()}¥/mo
          </div>
        </div>

        {/* ── Purchase controls ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <TextField
            label="Months to purchase"
            type="number"
            size="small"
            value={months}
            onChange={(e) => setMonths(Math.max(1, parseInt(e.target.value) || 1))}
            style={{ width: 160 }}
            inputProps={{ min: 1 }}
          />
          <TextField
            label="Custom name (optional)"
            size="small"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="e.g. Wally's Apartment"
            style={{ width: 260 }}
          />
          <div style={{ fontSize: '1.1em' }}>
            <strong>Total: {totalCost.toLocaleString()}¥</strong>
            <span style={{ fontSize: '0.8em', color: '#aaa', marginLeft: 6 }}>
              ({months} × {finalMonthlyCost.toLocaleString()}¥)
            </span>
          </div>
        </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset} color="inherit">Reset</Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handlePurchase} variant="contained" color="primary">
          Add to Gear ({totalCost.toLocaleString()}¥)
        </Button>
      </DialogActions>
    </Dialog>
  );
}
