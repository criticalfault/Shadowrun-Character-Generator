import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";

const TableRowComponent = ({ columns, rows }) => {
  return (
    <>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth }}
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      {rows.map((row) => (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
          {columns.map((column) => {
            const value = row[column.id];
            return (
              <React.Fragment key={column.id}>
                {column.id === value ? (
                  <TableCell key={column.id} align={column.align}>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) =>
                        handleInputChange(row.code, column.id, e.target.value)
                      }
                    />
                  </TableCell>
                ) : (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === "number"
                      ? column.format(value)
                      : value}
                  </TableCell>
                )}
              </React.Fragment>
            );
          })}
        </TableRow>
      ))}
    </>
  );
};

export default TableRowComponent;
