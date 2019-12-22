import React from "react";
import PropTypes from "prop-types";
import { Form, Spinner } from "react-bootstrap";
import { getCurrencies } from "../../../api/gill/resources";
import { useParams } from "react-router-dom";

export default function CurrencySelector(props) {
  const [currencies, setCurrencies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { system_id } = useParams();

  React.useEffect(() => {
    getCurrencies({ system_id }).then(data => {
      setCurrencies(data.data);
      setLoading(false);
    });
  }, [system_id]);

  let options = [
    <option key={0} value={null}>
      Choose a currency
    </option>
  ];
  currencies.map(currency => {
    // TODO: find a way to only fetch secondary currencies...
    if (1 !== currency.id) {
      options.push(
        <option key={currency.id} value={currency.id}>
          {currency.name}
        </option>
      );
    }
  });

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
