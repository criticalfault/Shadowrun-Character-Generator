import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

/**
 * A Select with a live text filter above it.
 *
 * Props:
 *   items        - pre-sorted array of objects to display
 *   value        - currently selected index (into `items`)
 *   onChange     - called with a synthetic {target:{value: originalIndex}} event
 *   label        - Select label
 *   getLabel     - fn(item) => string used for filtering (defaults to item.Name ?? item.name)
 *   renderItem   - fn(item, originalIndex) => MenuItem element
 *   style        - passed to FormControl (e.g. { minWidth: 650 })
 */
export default function SearchableSelect({
  items,
  value,
  onChange,
  label,
  getLabel,
  renderItem,
  style,
}) {
  const [filter, setFilter] = useState('');

  const resolveLabel = getLabel ?? ((item) => item.Name ?? item.name ?? '');
  const defaultRenderItem = (item, originalIndex, filteredIdx) => (
    <MenuItem key={filteredIdx} value={filteredIdx}>{resolveLabel(item)}</MenuItem>
  );
  const resolvedRenderItem = renderItem ?? defaultRenderItem;

  const safeItems = items ?? [];
  const filteredItems = safeItems
    .map((item, originalIndex) => ({ item, originalIndex }))
    .filter(({ item }) => {
      if (!filter.trim()) return true;
      return resolveLabel(item).toLowerCase().includes(filter.toLowerCase());
    });

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSelectChange = (e) => {
    onChange({ target: { value: filteredItems[e.target.value]?.originalIndex ?? e.target.value } });
  };

  // Find the filtered position of the current value so Select highlights correctly.
  const filteredIndex = filteredItems.findIndex((f) => f.originalIndex === value);

  return (
    <>
      <TextField
        size="small"
        style={{ width: style?.minWidth ?? 400, marginBottom: 8, display: 'block' }}
        label={`Filter ${label}`}
        value={filter}
        onChange={handleFilterChange}
        placeholder="Type to search..."
      />
      <Box sx={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '6px' }}>
        {filteredItems.length} / {safeItems.length} item{safeItems.length !== 1 ? 's' : ''}
      </Box>
      <FormControl style={style}>
        <InputLabel shrink>{label}</InputLabel>
        <Select
          value={filteredIndex >= 0 ? filteredIndex : ''}
          onChange={handleSelectChange}
        >
          {filteredItems.map(({ item, originalIndex }, filteredIdx) =>
            resolvedRenderItem(item, originalIndex, filteredIdx)
          )}
        </Select>
      </FormControl>
    </>
  );
}
