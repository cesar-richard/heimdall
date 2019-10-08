import React from "react";
import PropTypes from "prop-types";
import { Form, Spinner } from "react-bootstrap";
import { getWalletGroups } from "../../../api/gill/resources";

export default function WalletGroupSelector(props) {
  const [walletGroups, setWalletGroups] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getWalletGroups({}).then(data => {
      setWalletGroups(data.data);
      setLoading(false);
    });
  }, []);

  let options = [
    <option key={0} value={null}>
      Choose a wallet group
    </option>
  ];
  walletGroups.map(walletGroup =>
    options.push(
      <option key={walletGroup.id} value={walletGroup.id}>
        {walletGroup.name}
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

WalletGroupSelector.propTypes = {};
