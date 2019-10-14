import React from "react";
import PropTypes from "prop-types";
import { getZoneAccesses, getZones } from "../../../api/gill/resources";
import { Table, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export default function DashboardZoneAccesses(props) {
  const [zoneAccesses, setZoneAccesses] = React.useState([]);
  const [loadingZoneAccesses, setLoadingZoneAccesses] = React.useState(true);
  const computeTotalZoneAccesses = (accesses, zones = []) => {
    let tmp = [];
    accesses.map(el => {
      if (!tmp[el.zone]) {
        const zone = zones.find(zone => zone.id === el.zone);
        tmp[el.zone] = {
          zone_id: el.zone,
          zone_name: zone ? zone.name : "N/A",
          wallet_count: 0,
          quantity: 0,
          quantity_unlimited: 0
        };
      }
      tmp[el.zone].quantity_unlimited += el.unlimited ? 1 : 0;
      tmp[el.zone].quantity += el.count > 0 ? el.count : 0;
      tmp[el.zone].wallet_count += 1;
    });
    return tmp;
  };

  React.useEffect(() => {
    setLoadingZoneAccesses(true);
    getZones({})
      .then(dataZones => {
        getZoneAccesses({})
          .then(data => {
            setZoneAccesses(
              computeTotalZoneAccesses(data.data, dataZones.data)
            );
            setLoadingZoneAccesses(false);
            setInterval(
              () =>
                getZones({}).then(dataZones =>
                  getZoneAccesses().then(data =>
                    setZoneAccesses(
                      computeTotalZoneAccesses(data.data, dataZones.data)
                    )
                  )
                ),
              5000
            );
          })
          .catch(data => toast.error(data));
      })
      .catch(data => toast.error(data));
  }, []);
  let rows = [];
  zoneAccesses.map(el =>
    rows.push(
      <tr key={el.zone_id}>
        <td>{el.zone_id}</td>
        <td>{el.zone_name}</td>
        <td>{el.wallet_count}</td>
        <td>{el.quantity}</td>
        <td>{el.quantity_unlimited}</td>
      </tr>
    )
  );
  return loadingZoneAccesses ? (
    <Spinner animation='border' role='status' size='sm'>
      <span className='sr-only'>loadingZoneAccesses...</span>
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
