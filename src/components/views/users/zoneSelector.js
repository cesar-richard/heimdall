import React from "react";
import PropTypes from "prop-types";
import { Form, Spinner } from "react-bootstrap";
import { getZones } from "../../../api/gill/resources";
import { useParams } from "react-router-dom";

export default function ZoneSelector(props) {
  const [zones, setZones] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { system_id } = useParams();

  React.useEffect(() => {
    getZones({ system_id }).then(data => {
      setZones(data.data);
      setLoading(false);
    });
  }, [system_id]);

  let options = [
    <option key={0} value={null}>
      Choose a zone
    </option>
  ];
  zones.map(zone =>
    options.push(
      <option key={zone.id} value={zone.id}>
        {zone.name}
      </option>
    )
  );

  return loading ? (
    <Spinner animation='border' role='status' size='sm'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  ) : (
    <Form.Control as='select' required {...props}>
      {options}
    </Form.Control>
  );
}

ZoneSelector.propTypes = {};
