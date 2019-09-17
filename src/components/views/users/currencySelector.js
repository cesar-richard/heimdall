import React from "react";
import PropTypes from "prop-types";
import { Form, Spinner } from "react-bootstrap";
import { getCurrencies } from "../../../api/gill/resources";

export default function CurrencySelector(props) {
  const [currencies, setCurrencies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getCurrencies().then(data => {
      setCurrencies(data.data);
      setLoading(false);
    });
  });

  let options = [];
  currencies.map(currency =>
    options.push(
      <option key={currency.id} value={currency.id}>
        {currency.name}
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

CurrencySelector.propTypes = {};
