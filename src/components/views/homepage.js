import React from "react";
import PropTypes from "prop-types";
import { Card, CardGroup, Spinner, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WalletAutocomplete from "../WalletAutocomplete";

export default function Homepage(props) {
  const [loading, setLoading] = React.useState(false);
  const logger = React.useCallback(m => console.log(m), []);

  return loading ? (
    <Spinner animation='border' role='status' size='sm'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  ) : (
    <CardGroup>
      <Card
        bg='primary'
        text='white'
        className='text-center'
        onClick={() => logger(1)}
      >
        <blockquote className='blockquote card-body'>
          <FontAwesomeIcon icon='hand-holding-usd' size={"5x"} />
          <p>Transferts</p>
        </blockquote>
      </Card>
      <Card
        bg='primary'
        text='white'
        className='text-center'
        onClick={() => logger(2)}
      >
        <blockquote className='blockquote card-body'>
          <FontAwesomeIcon icon='building' size={"5x"} />
          <p>Fundations</p>
        </blockquote>
      </Card>
    </CardGroup>
  );
}

Homepage.propTypes = {};
