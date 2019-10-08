import React from "react";
import PropTypes from "prop-types";
import { Form, Spinner } from "react-bootstrap";
import { getPeriods } from "../../../api/gill/resources";

export default function PeriodSelector(props) {
  const [periods, setPeriods] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getPeriods({}).then(data => {
      setPeriods(data.data);
      setLoading(false);
    });
  }, []);

  let options = [
    <option key={0} value={null}>
      Choose a period
    </option>
  ];
  periods.map(period =>
    options.push(
      <option key={period.id} value={period.id}>
        {period.name}
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

PeriodSelector.propTypes = {};
