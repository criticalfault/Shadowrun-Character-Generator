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

export default function TableAttribute(props) {
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
      value: props?.currentCharacter?.attributes?.Body,
      racialModifier: props?.currentCharacter?.raceBonuses.Body,
      cyberedBonus: props?.currentCharacter?.cyberAttributeBonuses?.Body,
      magicalBonus: props?.currentCharacter?.magicalAttributeBonuses?.Body,
      total:
        props?.currentCharacter?.attributes?.Body +
        props?.currentCharacter?.raceBonuses?.Body +
        props?.currentCharacter?.cyberAttributeBonuses?.Body +
        props?.currentCharacter?.magicalAttributeBonuses?.Body,
    },
    {
      attribute: "Quickness",
      value: props?.currentCharacter?.attributes?.Quickness,
      racialModifier: props?.currentCharacter?.raceBonuses?.Quickness,
      cyberedBonus: props?.currentCharacter?.cyberAttributeBonuses?.Quickness,
      magicalBonus: props?.currentCharacter?.magicalAttributeBonuses?.Quickness,
      total:
        props?.currentCharacter?.attributes?.Quickness +
        props?.currentCharacter?.raceBonuses?.Quickness +
        props?.currentCharacter?.cyberAttributeBonuses?.Quickness +
        props?.currentCharacter?.magicalAttributeBonuses?.Quickness,
    },
    {
      attribute: "Strength",
      value: props?.currentCharacter?.attributes?.Strength,
      racialModifier: props?.currentCharacter?.raceBonuses?.Strength,
      cyberedBonus: props?.currentCharacter?.cyberAttributeBonuses?.Strength,
      magicalBonus: props?.currentCharacter.magicalAttributeBonuses?.Strength,
      total:
        (props?.currentCharacter?.attributes?.Strength ?? 0) +
        (props?.currentCharacter?.raceBonuses?.Strength ?? 0) +
        (props.currentCharacter.cyberAttributeBonuses?.Strength ?? 0) +
        (props?.currentCharacter?.magicalAttributeBonuses?.Strength ?? 0),
    },
    {
      attribute: "Charisma",
      value: props?.currentCharacter?.attributes?.Charisma,
      racialModifier: props?.currentCharacter?.raceBonuses?.Charisma,
      cyberedBonus: props?.currentCharacter?.cyberAttributeBonuses?.Charisma,
      magicalBonus: props?.currentCharacter?.magicalAttributeBonuses?.Charisma,
      total:
        (props?.currentCharacter?.attributes?.Charisma ?? 0) +
        (props?.currentCharacter?.raceBonuses?.Charisma ?? 0) +
        (props?.currentCharacter?.cyberAttributeBonuses?.Charisma ?? 0) +
        (props?.currentCharacter?.magicalAttributeBonuses?.Charisma ?? 0),
    },
    {
      attribute: "Intelligence",
      value: props?.currentCharacter?.attributes?.Intelligence,
      racialModifier: props?.currentCharacter?.raceBonuses?.Intelligence,
      cyberedBonus:
        props?.currentCharacter?.cyberAttributeBonuses?.Intelligence,
      magicalBonus:
        props?.currentCharacter?.magicalAttributeBonuses?.Intelligence,
      total:
        (props?.currentCharacter?.attributes?.Intelligence ?? 0) +
        (props?.currentCharacter?.raceBonuses?.Intelligence ?? 0) +
        (props?.currentCharacter?.cyberAttributeBonuses?.Intelligence ?? 0) +
        (props?.currentCharacter?.magicalAttributeBonuses?.Intelligence ?? 0),
    },
    {
      attribute: "Willpower",
      value: props?.currentCharacter?.attributes?.Willpower,
      racialModifier: props?.currentCharacter?.raceBonuses?.Willpower,
      cyberedBonus: props?.currentCharacter?.cyberAttributeBonuses?.Willpower,
      magicalBonus: props?.currentCharacter?.magicalAttributeBonuses?.Willpower,
      total:
        (props?.currentCharacter?.attributes?.Willpower ?? 0) +
        (props?.currentCharacter?.raceBonuses?.Willpower ?? 0) +
        (props?.currentCharacter?.cyberAttributeBonuses?.Willpower ?? 0) +
        (props?.currentCharacter?.magicalAttributeBonuses?.Willpower ?? 0),
    },
    // Repeat this pattern for other attributes...
    {
      attribute: "Essence",
      value: props.currentCharacter.essence ?? 6,
      racialModifier: "N/A",
      cyberedBonus: "N/A",
      magicalBonus: "N/A",
      total: props.currentCharacter.essence ?? 6,
    },
    {
      attribute: "Magic",
      value: props.currentCharacter.magic ?? 0,
      racialModifier: "N/A",
      cyberedBonus: "N/A",
      magicalBonus: "N/A",
      total: props.currentCharacter.magic ?? 0,
    },
    {
      attribute: "Reaction",
      value:
        Math.floor(
          ((props.currentCharacter.attributes?.Quickness ?? 0) +
            (props.currentCharacter.attributes?.Intelligence ?? 0)) /
            2
        ) +
        (props.currentCharacter.raceBonuses?.Reaction ?? 0) +
        (props.currentCharacter.cyberAttributeBonuses?.Reaction ?? 0) +
        (props.currentCharacter.magicalAttributeBonuses?.Reaction ?? 0),
      racialModifier: props.currentCharacter.raceBonuses?.Reaction,
      cyberedBonus: props.currentCharacter.cyberAttributeBonuses?.Reaction,
      magicalBonus: props.currentCharacter.magicalAttributeBonuses?.Reaction,
      total:
        Math.floor(
          ((props.currentCharacter.attributes?.Quickness ?? 0) +
            (props.currentCharacter.attributes?.Intelligence ?? 0)) /
            2
        ) +
        (props.currentCharacter.raceBonuses?.Reaction ?? 0) +
        (props.currentCharacter.cyberAttributeBonuses?.Reaction ?? 0) +
        (props.currentCharacter.magicalAttributeBonuses?.Reaction ?? 0),
    },
    {
      attribute: "Initative",
      value: `${props.currentCharacter.attributes?.Initative ?? 1}d6`,
      racialModifier: props.currentCharacter.raceBonuses?.Initative,
      cyberedBonus: props.currentCharacter.cyberAttributeBonuses?.Initative,
      magicalBonus: props.currentCharacter.magicalAttributeBonuses?.Initative,
      total: props.currentCharacter.attributes?.Initative ?? 1,
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
