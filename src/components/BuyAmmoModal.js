import React, { useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

/**
 * Parse the weapon's Ammunition string and return all capacities to match against.
 * Handles formats like: "38(c)", "5(10)(c)", "2(b)", "1(B)", "6(cy)", "50(box)/Belt"
 * Returns an array of numbers, e.g. [38], [5, 10], [2], [6], [50]
 */
const parseCapacities = (ammoStr) => {
  if (!ammoStr) return [];
  const matches = ammoStr.match(/\d+/g);
  return matches ? [...new Set(matches.map(Number))] : [];
};

/**
 * Given a list of ammo entries (from Gear.json Ammunition.entries) and a weapon's
 * Ammunition string, return only the entries that match the weapon's capacity.
 */
const filterAmmoForWeapon = (entries, weaponAmmo) => {
  const capacities = parseCapacities(weaponAmmo);
  if (capacities.length === 0) return [];
  return entries.filter((entry) => {
    const m = entry.Name?.match(/^(\d+)-Rnd/);
    return m && capacities.includes(parseInt(m[1]));
  });
};

export default function BuyAmmoModal({ open, onClose, weapon, ammoEntries, onPurchase, booksFilter }) {
  const [filter, setFilter] = useState('');

  const matchingAmmo = useMemo(() => {
    if (!weapon?.Ammunition || !ammoEntries) return [];
    const matched = filterAmmoForWeapon(ammoEntries, weapon.Ammunition);
    // Apply book filter
    const bookFiltered = booksFilter
      ? matched.filter((e) => {
          const code = e.BookPage?.split('.')[0];
          return !code || booksFilter.includes(code);
        })
      : matched;
    return bookFiltered;
  }, [weapon, ammoEntries, booksFilter]);

  const displayed = filter.trim()
    ? matchingAmmo.filter((e) => e.Name.toLowerCase().includes(filter.toLowerCase()))
    : matchingAmmo;

  const fmt = (cost) =>
    new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(cost);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Buy Ammo — {weapon?.Name}
        <span style={{ marginLeft: 12, fontSize: '0.75em', color: '#aaa' }}>
          Ammo type: {weapon?.Ammunition}
        </span>
      </DialogTitle>
      <DialogContent>
        {matchingAmmo.length === 0 ? (
          <p>No standard ammunition found for this weapon's ammo type ({weapon?.Ammunition}).</p>
        ) : (
          <>
            <TextField
              size="small"
              label="Filter ammo"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ marginBottom: 12, width: 300 }}
              placeholder="e.g. APDS, Hollow Point..."
            />
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Cost</TableCell>
                  <TableCell align="right">Availability</TableCell>
                  <TableCell align="right">Source</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayed.map((entry, i) => (
                  <AmmoRow key={i} entry={entry} fmt={fmt} onPurchase={onPurchase} />
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

function AmmoRow({ entry, fmt, onPurchase }) {
  const [qty, setQty] = useState(1);
  return (
    <TableRow>
      <TableCell>{entry.Name}</TableCell>
      <TableCell align="right">{fmt(entry.Cost ?? 0)}</TableCell>
      <TableCell align="right">{entry.Availability ?? '—'}</TableCell>
      <TableCell align="right">{entry.BookPage ?? '—'}</TableCell>
      <TableCell align="right" style={{ width: 70 }}>
        <TextField
          type="number"
          size="small"
          value={qty}
          onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
          inputProps={{ min: 1, style: { width: 50 } }}
        />
      </TableCell>
      <TableCell align="right">
        <Button
          size="small"
          variant="contained"
          onClick={() => onPurchase({ ...entry, Amount: qty, Type: 'Ammunition' })}
        >
          Buy
        </Button>
      </TableCell>
    </TableRow>
  );
}
