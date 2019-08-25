import React from "react";
import PropTypes from "prop-types";
import { Button, Card, ListGroup, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { getBalances, transfer } from "../../../api/gill/GESUSERS";

export default function TransfertCard(props) {
  const { transfertCallback, walletDestination, walletSource } = props;
  const [isLoading, setLoading] = React.useState(false);
  return (
    <Card border='primary'>
      <Card.Header>Transfert</Card.Header>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          Source credit : <b>{walletSource.credit / 100.0}</b>
        </ListGroup.Item>
        <ListGroup.Item>
          Destination credit : <b>{walletDestination.credit / 100.0}</b>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button
            variant='success'
            disabled={isLoading}
            onClick={() => {
              setLoading(true);
              transfer({
                wallet_src: walletSource.id,
                wallet_dst: walletDestination.id,
                amount: walletSource.credit,
                message: "Maintenance SiMDE (Heimdal)"
              })
                .then(data => {
                  setLoading(false);
                  return transfertCallback();
                })
                .catch(err => {
                  setLoading(false);
                  toast.error(err.rawData.error.message);
                });
            }}
          >
            Transfert
            {isLoading ? (
              <Spinner animation='border' role='status' size='sm'>
                <span className='sr-only'>Loading...</span>
              </Spinner>
            ) : (
              ""
            )}
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

TransfertCard.propTypes = {
  transfertCallback: PropTypes.func.isRequired,
  walletSource: PropTypes.object.isRequired,
  walletDestination: PropTypes.object.isRequired
};
