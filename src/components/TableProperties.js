import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableHeader from "./TableHeader";

export default function TableP(props) {
  console.log("🚀 ~ TableAttribute ~ props:", props);

  const columns = [
    { id: "attribute", label: "Attribute", minWidth: 120 },
    { id: "value", label: "Value", minWidth: 80 },
    { id: "racialModifier", label: "Racial Modifier", minWidth: 150 },
    { id: "cyberedBonus", label: "Cybered Bonus", minWidth: 120 },
    { id: "magicalBonus", label: "Magical Bonus", minWidth: 120 },
    { id: "total", label: "Total", minWidth: 120 },
  ];

  const rows = [
    {
      attribute: "Body",
      value: 8, // Replace with a default value
      racialModifier: 0,
      cyberedBonus: 0,
      magicalBonus: 0,
      total: 8,
    },
    {
      attribute: "Quickness",
      value: 6, // Replace with a default value
      racialModifier: 0,
      cyberedBonus: 0,
      magicalBonus: 0,
      total: 6,
    },
    {
      attribute: "Strength",
      value: 7, // Replace with a default value
      racialModifier: 0,
      cyberedBonus: 0,
      magicalBonus: 0,
      total: 7,
    },
    {
      attribute: "Charisma",
      value: 5, // Replace with a default value
      racialModifier: 0,
      cyberedBonus: 0,
      magicalBonus: 0,
      total: 5,
    },
    {
      attribute: "Intelligence",
      value: 4, // Replace with a default value
      racialModifier: 0,
      cyberedBonus: 0,
      magicalBonus: 0,
      total: 4,
    },
    {
      attribute: "Willpower",
      value: 3, // Replace with a default value
      racialModifier: 0,
      cyberedBonus: 0,
      magicalBonus: 0,
      total: 3,
    },
    {
      attribute: "Essence",
      value: 6,
      racialModifier: "N/A",
      cyberedBonus: "N/A",
      magicalBonus: "N/A",
      total: 6,
    },
    {
      attribute: "Magic",
      value: 0,
      racialModifier: "N/A",
      cyberedBonus: "N/A",
      magicalBonus: "N/A",
      total: 0,
    },
    {
      attribute: "Reaction",
      value: Math.floor((6 + 4) / 2), // Assuming default values for Quickness and Intelligence
      racialModifier: 0,
      cyberedBonus: 0,
      magicalBonus: 0,
      total: Math.floor((6 + 4) / 2),
    },
    {
      attribute: "Initative",
      value: "1d6",
      racialModifier: 0,
      cyberedBonus: 0,
      magicalBonus: 0,
      total: 1,
    },
  ];
  console.log("🚀 ~ TableAttribute ~ rows:", rows);

  // Rest of the component code remains the same...

  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }

  const TableContainerComponent = ({ children }) => {
    return (
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          {children}
        </Table>
      </TableContainer>
    );
  };

  const TableRowComponent = ({ row }) => {
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {column.format && typeof value === "number"
                ? column.format(value)
                : value}
            </TableCell>
          );
        })}
      </TableRow>
    );
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHeader columns={columns} /> {/* Render the TableHeader */}
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRowComponent key={row.code} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
