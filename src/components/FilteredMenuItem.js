import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Books from '../data/Books.json';

/**
 * A MenuItem that renders normally if `allowed` is true,
 * or greyed-out + disabled with a tooltip showing the required book if false.
 * Pass `bookCode` (e.g. "cc") to get a named tooltip like "Cannon Companion".
 */
const FilteredMenuItem = ({ allowed, bookCode, children, ...props }) => {
  if (allowed) {
    return <MenuItem {...props}>{children}</MenuItem>;
  }
  const bookName = bookCode && Books[bookCode]?.name;
  const tooltip = bookName
    ? `Enable the required sourcebook (${bookName}) in Identity to unlock this item`
    : 'Enable the required sourcebook in Identity to unlock this item';

  return (
    <Tooltip title={tooltip} placement="right" arrow>
      <span>
        <MenuItem {...props} disabled sx={{ opacity: 0.4, fontStyle: 'italic', ...props.sx }}>
          {children}
        </MenuItem>
      </span>
    </Tooltip>
  );
};

export default FilteredMenuItem;
