import React from "react";
import PropTypes from "prop-types";
import { Form, Spinner } from "react-bootstrap";
import { getFundations } from "../../../api/gill/resources";
import { useParams } from "react-router-dom";

export default function FundationSelector(props) {
  const [fundations, setFundations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { system_id, event_id } = useParams();

  React.useEffect(() => {
    getFundations({ system_id, event_id }).then(data => {
      setFundations(data.data);
      setLoading(false);
    });
  }, [event_id, system_id]);

  let options = [
    <option key='default' value='default'>
      Choose a fundation
    </option>
  ];
  fundations.map(fundation =>
    options.push(
      <option key={fundation.id} value={fundation.id}>
        {fundation.name}
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

FundationSelector.propTypes = {};
