import React from "react";
import PropTypes from "prop-types";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { walletAutocomplete } from "../../../api/gill/GESUSERS";
import { find } from "../../../api/gill/wallets";
import Balances from "./balances";

export default function Wallet(props) {
  const [loading, setLoading] = React.useState(true);
  const [wallet, setWallet] = React.useState(null);
  const [walletInfos, setWalletInfos] = React.useState(null);
  const { uid, setWalletCb } = props;

  React.useEffect(() => {
    setLoading(true);
    walletAutocomplete({ queryString: uid, limit: 2 })
      .then(data => {
        if (data.data.length === 0) {
          toast.error(`No wallet found for ${uid}`);
          setWallet(null);
          setWalletCb(null);
          setWalletInfos(null);
        } else if (data.data.length > 1) {
          toast.error(`More than one wallet found for ${uid}`);
          setWallet(null);
          setWalletCb(null);
          setWalletInfos(null);
        } else {
          setWallet(data.data[0]);
          find({ walletId: data.data[0].id }).then(data2 => {
            setWalletCb(data2.data);
            setWalletInfos(data2.data);
          });
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        toast.error(`Error with gill: ${err}`);
      });
  }, [uid, setWalletCb]);
  return loading ? (
    <Spinner animation='border' role='status' size='sm'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  ) : wallet ? (
    <Card>
      <Card.Body>
        <Card.Title>{wallet.name}</Card.Title>
        <Card.Subtitle>{wallet.username}</Card.Subtitle>
      </Card.Body>
      <ListGroup variant='flush'>
        <ListGroup.Item>W{wallet.id}</ListGroup.Item>
        <ListGroup.Item>U{wallet.user_id}</ListGroup.Item>
        <ListGroup.Item>{wallet.email}</ListGroup.Item>
        <ListGroup.Item>{wallet.wallet_name}</ListGroup.Item>
        <ListGroup.Item>{wallet.tag}</ListGroup.Item>
        <ListGroup.Item variant={walletInfos?!walletInfos.is_credit_consistent?'danger':false:false}>
          <Balances walletId={wallet.id} />
        </ListGroup.Item>
      </ListGroup>
    </Card>
  ) : (
    <></>
  );
}

Wallet.propTypes = {
  uid: PropTypes.string.isRequired,
  setWalletCb: PropTypes.func.isRequired
};
