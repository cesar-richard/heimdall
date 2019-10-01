import React from "react";
import PropTypes from "prop-types";
import { getZoneAccesses } from "../../../api/gill/resources";
import { Table, Spinner } from "react-bootstrap";

export default function DashboardZoneAccesses(props) {
  const computeTotalZoneAccesses = zoneAccesses => {
    let tmp = [];
    zoneAccesses.map(el => {
      if (!tmp[el.zone]) {
        tmp[el.zone] = {zone_id:el.zone, zone_name: "TODO", wallet_count: 0, quantity: 0, quantity_unlimited: 0};
      }
      tmp[el.zone].quantity_unlimited+= el.unlimited?1:0;
      tmp[el.zone].quantity+= el.count>0?el.count:0;
      tmp[el.zone].wallet_count+=1;
    });
    return tmp;
  };

  const [zoneAccesses, setZoneAccesses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setLoading(true);
    getZoneAccesses({}).then(data => {
      setZoneAccesses(computeTotalZoneAccesses(data.data));
      setLoading(false);
      setInterval(
        () =>
          getZoneAccesses({}).then(data =>
            setZoneAccesses(computeTotalZoneAccesses(data.data))
          ),
        5000
      );
    });
  }, []);
  let rows = [];
  zoneAccesses.map(el =>
    rows.push(
      <tr>
        <td>{el.zone_id}</td>
        <td>{el.zone_name}</td>
        <td>{el.wallet_count}</td>
        <td>{el.quantity}</td>
        <td>{el.quantity_unlimited}</td>
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
          <th>Wallets count</th>
          <th>Quantity</th>
          <th>Quantity unlimited</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
DashboardZoneAccesses.propTypes = {};
