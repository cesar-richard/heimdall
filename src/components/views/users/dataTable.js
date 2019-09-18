import React from "react";
import PropTypes from "prop-types";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import { Alert, Table } from "react-bootstrap";
import DataRow from "./dataRow";

export default function DataTable(props) {
  const {addWallet, removeWallet} = props;
  const initialTable = [];
  for (var i = 0; i < 25; i++) {
    initialTable.push([
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" }
    ]);
  }

  const [dataGrid, setDataGrid] = React.useState(initialTable);
  return (
    <ReactDataSheet
      data={dataGrid}
      valueRenderer={cell => cell.value}
      sheetRenderer={props => (
        <Table className={props.className} striped bordered hover>
          <thead>
            <tr>
              <th>Wallet ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{props.children}</tbody>
        </Table>
      )}
      rowRenderer={props => (
        <DataRow
          {...props}
          addWallet={wallet => addWallet(wallet)}
          removeWallet={wallet => removeWallet(wallet)}
        />
      )}
      onCellsChanged={(changes, additions) => {
        changes.forEach(({ cell, row, col, value }) => {
          dataGrid[row][col] = { ...dataGrid[row][col], value };
        });
        if (additions) {
          additions.forEach(({ row, col, value }) => {
            dataGrid[row] = dataGrid[row]
              ? dataGrid[row]
              : [{ value: "" }, { value: "" }, { value: "" }, { value: "" }];
            dataGrid[row][col] = { ...dataGrid[row][col], row, col, value };
          });
        }
        setDataGrid(dataGrid);
      }}
    />
  );
}

DataTable.propTypes = {};
