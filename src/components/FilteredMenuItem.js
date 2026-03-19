import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

/**
 * A MenuItem that renders normally if `allowed` is true,
 * or greyed-out + disabled with a tooltip if false.
 */
const FilteredMenuItem = ({ allowed, children, ...props }) => {
  if (allowed) {
    return <MenuItem {...props}>{children}</MenuItem>;
  }
  return (
    <Tooltip title="Enable the required sourcebook in Identity to unlock this item" placement="right" arrow>
      <span>
        <MenuItem {...props} disabled sx={{ opacity: 0.4, fontStyle: 'italic', ...props.sx }}>
          {children}
        </MenuItem>
      </span>
    </Tooltip>
  );
};

export default FilteredMenuItem;
