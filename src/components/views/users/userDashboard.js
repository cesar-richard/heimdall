import React from "react";
import PropTypes from "prop-types";
import DataTable from "./dataTable";
import ActionForm from "./actionForm";

function reducer(state, action) {
  switch (action.type) {
    case "addWallet":
      let tmp = state;
      if (0 === tmp.filter(x => x.id === action.wallet.id).length)
        tmp.push(action.wallet);
      return tmp;
    case "removeWallet":
      return state.filter(x => x.id !== action.wallet.id);
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
