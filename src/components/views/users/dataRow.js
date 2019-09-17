import React from "react";
import PropTypes from "prop-types";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import { Spinner } from "react-bootstrap";
import { walletAutocomplete } from "../../../api/gill/GESUSERS";
import { find } from "../../../api/gill/wallets";
import { toast } from "react-toastify";

export default function DataRow(props) {
  const [loading, setLoading] = React.useState(true);
  const [wallet, setWallet] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [cells, setCells] = React.useState(null);

  let queryString = "";
  props.cells.map(
    cell => (queryString = queryString.concat(" ", cell.value).trim())
  );

  React.useEffect(() => {
    setLoading(true);
    if(wallet){
      props.updateWalletList(wallet.id,"remove");
    }
    if (queryString !== "") {
      walletAutocomplete({ queryString, limit: 2 })
        .then(data => {
          if (data.data.length === 0) {
            setWallet(null);
            setError("No wallet found");
          } else if (data.data.length > 1) {
            setWallet(null);
            setError("More than one wallet found");
          } else {
            setWallet(data.data[0]);
            props.updateWalletList(data.data[0].id,"add");
            setError(null);
          }
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          setError(`Error with gill: ${err}`);
        });
    } else {
      setWallet(null);
      setError(null);
      setLoading(false);
    }
  }, [queryString]);

  return (
    <tr>
      {props.children}
      <td
        style={
          wallet
            ? { backgroundColor: "#18BC9C", color: "#FFFFFF" }
            : error
            ? { backgroundColor: "#E74C3C", color: "#FFFFFF" }
            : {}
        }
      >
        {loading ? (
          <Spinner animation='border' role='status' size='sm'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        ) : error ? (
          `${error}`
        ) : wallet ? (
          `${wallet.name} (W${wallet.id})`
        ) : (
          "Empty string"
        )}
      </td>
    </tr>
  );
}

DataRow.propTypes = {};
