import React from "react";
import PropTypes from "prop-types";
import { Form, Spinner } from "react-bootstrap";
import { getPeriods } from "../../../api/gill/resources";
import { useParams } from "react-router-dom";

export default function PeriodSelector(props) {
  const [periods, setPeriods] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { system_id } = useParams();

  React.useEffect(() => {
    getPeriods({ system_id }).then(data => {
      setPeriods(data.data);
      setLoading(false);
    });
  }, [system_id]);

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
