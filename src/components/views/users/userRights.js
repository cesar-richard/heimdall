import React from "react";
import PropTypes from "prop-types";
import { Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { getAllMyRightsEvents } from "../../../api/gill/USERRIGHT";
import { useParams } from "react-router-dom";

export default function UserRights(props) {
  const [loading, setLoading] = React.useState(true);
  const [balances, setBalances] = React.useState([]);
  const { system_id } = useParams();

  React.useEffect(() => {
    setLoading(true);
    getAllMyRightsEvents({ wallet_id: props.walletId, system_id })
      .then(data => {
        setBalances(data.data);
        setLoading(false);
      })
      .catch(err => {
        setBalances([]);
        setLoading(false);
        toast.error(`Error with gill: ${err}`);
      });
  }, [props.walletId, system_id]);

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
    </Table>
  ) : (
    <></>
  );
}

UserRights.propTypes = {
  walletId: PropTypes.number.isRequired
};
