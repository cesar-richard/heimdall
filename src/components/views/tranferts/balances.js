import React from "react";
import PropTypes from "prop-types";
import { Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { getBalances } from "../../../api/gill/GESUSERS";

export default function Balances(props) {
  const [loading, setLoading] = React.useState(true);
  const [balances, setBalances] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    getBalances({ wallet_id: props.walletId })
      .then(data => {
        setBalances(data.data);
        setLoading(false);
      })
      .catch(err => {
        setBalances([]);
        setLoading(false);
        toast.error(`Error with gill: ${err}`);
      });
  }, [props.walletId]);

  return loading ? (
    <Spinner animation='border' role='status' size='sm'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  ) : balances.length > 0 ? (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Currency</th>
          <th>Credit</th>
          <th>Card credit</th>
        </tr>
      </thead>
      <tbody>
        {balances.map(balance => {
          return (
            <tr key={balance.id}>
              <td>{balance.currency.name}</td>
              <td>
                {balance.credit / 100.0}
                {balance.currency.group.symbol}
              </td>
              <td>
                {balance.card_credit / 100.0}
                {balance.currency.group.symbol}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  ) : (
    <></>
  );
}

Balances.propTypes = {
  walletId: PropTypes.number.isRequired
};
