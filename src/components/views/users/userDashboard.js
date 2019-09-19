import React from "react";
import PropTypes from "prop-types";
import DataTable from "./dataTable";
import ActionForm from "./actionForm";

function reducer(state, action) {
  switch (action.type) {
    case "addWallet":
      if (!state.includes(action.wallet)) {
        state.push(action.wallet);
      }
      return state;
    case "removeWallet":
      if (state.includes(action.wallet)) {
        state.splice(state.indexOf(action.wallet), 1);
      }
      return state;
    default:
      return state;
  }
}

export default function UserDashboard(props) {
  const [walletList, dispatch] = React.useReducer(reducer, []);
  return (
    <>
      <ActionForm walletList={walletList} />
      <DataTable
        addWallet={wallet => dispatch({ type: "addWallet", wallet })}
        removeWallet={wallet => dispatch({ type: "removeWallet", wallet })}
      />
    </>
  );
}

UserDashboard.propTypes = {};
