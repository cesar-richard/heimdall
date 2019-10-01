import React from "react";
import PropTypes from "prop-types";
import { getTotalCreditByCurrency } from "../../../api/gill/TRESO";
import { Table, Spinner } from "react-bootstrap";

export default function DashboardCurrencies(props) {
  const [totalCredits, setTotalCredits] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setLoading(true);
    getTotalCreditByCurrency().then(data => {
      setTotalCredits(data.data);
      setLoading(false);
      setInterval(
        () =>
          getTotalCreditByCurrency().then(data => setTotalCredits(data.data)),
        5000
      );
    });
  }, []);
  let rows = [];
  totalCredits.map(el =>
    rows.push(
      <tr>
        <td>{el.currency_id}</td>
        <td>{el.currency__group__name}</td>
        <td>{el.currency__name}</td>
        <td>{el.sum_credit / 100.0}</td>
      </tr>
    )
  );
  return loading ? (
    <Spinner animation='border' role='status' size='sm'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  ) : (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Credits</th>
          <th>Currency group</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
DashboardCurrencies.propTypes = {};
