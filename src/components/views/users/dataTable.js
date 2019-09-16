import React from "react";
import PropTypes from "prop-types";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import { Alert, Table } from "react-bootstrap";
import DataRow from "./dataRow";

export default function DataTable(props) {
  const RenderRow = React.memo(props => {
    rows[props.row] = <DataRow {...props} />;
    return rows[props.row];
  });

  const initialTable = [];
  initialTable.push(
    [
      { hint: "Login", value: "" },
      { hint: "Nom", value: "" },
      { hint: "Prenom", value: "" }
    ],
    [
      { hint: "Login", value: "" },
      { hint: "Nom", value: "" },
      { hint: "Prenom", value: "" }
    ],
    [
      { hint: "Login", value: "" },
      { hint: "Nom", value: "" },
      { hint: "Prenom", value: "" }
    ],
    [
      { hint: "Login", value: "" },
      { hint: "Nom", value: "" },
      { hint: "Prenom", value: "" }
    ],
    [
      { hint: "Login", value: "" },
      { hint: "Nom", value: "" },
      { hint: "Prenom", value: "" }
    ]
  );
  const [dataGrid, setDataGrid] = React.useState(initialTable);
  let rows = [];
  return (
    <ReactDataSheet
      data={dataGrid}
      valueRenderer={cell => cell.value}
      sheetRenderer={props => (
        <Table className={props.className} striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{props.children}</tbody>
        </Table>
      )}
      rowRenderer={props => <RenderRow {...props} />}
      onCellsChanged={(changes, additions) => {
        changes.forEach(({ cell, row, col, value }) => {
          dataGrid[row][col] = { ...dataGrid[row][col], value };
        });
        if (additions) {
          additions.forEach(({ row, col, value }) => {
            dataGrid[row] = dataGrid[row]
              ? dataGrid[row]
              : [{ value: "" }, { value: "" }, { value: "" }];
            dataGrid[row][col] = { ...dataGrid[row][col], row, col, value };
          });
        }
        setDataGrid(dataGrid);
      }}
    />
  );
}

DataTable.propTypes = {};
