import React from "react";
import PropTypes from "prop-types";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import { Spinner } from "react-bootstrap";
import { search } from "../../../api/gill/wallets";
import { find } from "../../../api/gill/wallets";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function DataRow(props) {
  const [loading, setLoading] = React.useState(true);
  const [wallet, setWallet] = React.useState(null);
  const [error, setError] = React.useState(null);
  const { cells, addWallet, removeWallet } = props;
  const { system_id } = useParams();

  let queryString = "";
  const walletId = cells[0].value;
  cells
    .slice(1)
    .map(cell => (queryString = queryString.concat(" ", cell.value).trim()));
  React.useEffect(() => {
    setLoading(true);
    if (walletId !== "") {
      find({ walletId, system_id })
        .then(data => {
          if (wallet) {
            removeWallet(wallet.id);
          }
          setWallet(data.data);
          addWallet(data.data.id);
          setError(null);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          if (wallet) {
            removeWallet(wallet.id);
          }
          setWallet(null);
          setError(`Error with gill: ${err.toString()}`);
        });
    } else if (queryString !== "") {
      search({ queryString, limit: 2, system_id })
        .then(data => {
          if (data.data.length === 0) {
            if (wallet) {
              removeWallet(wallet.id);
            }
            setWallet(null);
            setError("No wallet found");
          } else if (data.data.length > 1) {
            setWallet(null);
            setError("More than one wallet found");
          } else {
            setWallet(data.data[0]);
            addWallet(data.data[0].id);
            setError(null);
          }
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          setError(`Error with gill: ${err}`);
        });
    } else {
      if (wallet) {
        removeWallet(wallet.id);
      }
      setWallet(null);
      setError(null);
      setLoading(false);
    }
  }, [queryString, walletId]); // eslint-disable-line react-hooks/exhaustive-deps

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
          `${wallet.user ? wallet.user.username : wallet.name}(W${wallet.id})`
        ) : (
          "Empty string"
        )}
      </td>
    </tr>
  );
}

DataRow.propTypes = {};
