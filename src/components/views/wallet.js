import React from "react";
import PropTypes from "prop-types";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { walletAutocomplete } from "../../api/gill/GESUSERS";
import { find } from "../../api/gill/wallets";
import Balances from "./tranferts/balances";
import { useParams } from "react-router-dom";

export default function Wallet(props) {
  const [loading, setLoading] = React.useState(true);
  const [currentWallet, setCurrentWallet] = React.useState(null);
  const [walletInfos, setWalletInfos] = React.useState(null);
  const { card, setWalletCb, wallet } = props;
  const { system_id } = useParams();

  React.useEffect(() => {
    setLoading(true);
    if (card) {
      walletAutocomplete({ queryString: card.uid, limit: 2, system_id })
        .then(data => {
          if (0 === data.data.length) {
            toast.error(`No wallet found for ${card.uid}`);
            setCurrentWallet(null);
            setWalletCb(null);
            setWalletInfos(null);
          } else if (1 < data.data.length) {
            toast.error(`More than one wallet found for ${card.uid}`);
            setCurrentWallet(null);
            setWalletCb(null);
            setWalletInfos(null);
          } else {
            setCurrentWallet(data.data[0]);
            find({ walletId: data.data[0].id, system_id })
              .then(data2 => {
                setWalletCb(data2.data);
                setWalletInfos(data2.data);
              })
              .catch(err => {
                toast.error(`Error: ${err}`);
              });
          }
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          toast.error(`Error with gill: ${err}`);
        });
    } else if (wallet) {
      setCurrentWallet(wallet);
      find({ walletId: wallet.id, system_id })
        .then(data2 => {
          setWalletCb(data2.data);
          setWalletInfos(data2.data);
        })
        .catch(err => {
          toast.error(`Error: ${err}`);
        });
      setLoading(false);
    } else {
      setCurrentWallet(null);
      setWalletCb(null);
      setWalletInfos(null);
      setLoading(false);
    }
  }, [wallet, card, setWalletCb, system_id]);
  return loading ? (
    <Spinner animation='border' role='status' size='sm'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  ) : currentWallet ? (
    <Card>
      <Card.Body>
        <Card.Title>{currentWallet.name}</Card.Title>
        <Card.Subtitle>{currentWallet.username}</Card.Subtitle>
      </Card.Body>
      <ListGroup variant='flush'>
        <ListGroup.Item
          variant={
            walletInfos
              ? !walletInfos.is_credit_consistent
                ? "danger"
                : false
              : false
          }
        >
          W{currentWallet.id}
        </ListGroup.Item>
        <ListGroup.Item>U{currentWallet.user_id}</ListGroup.Item>
        <ListGroup.Item>{currentWallet.email}</ListGroup.Item>
        <ListGroup.Item>{currentWallet.wallet_name}</ListGroup.Item>
        <ListGroup.Item>{currentWallet.tag}</ListGroup.Item>
        <Balances walletId={currentWallet.id} />
      </ListGroup>
    </Card>
  ) : (
    <></>
  );
}

Wallet.propTypes = {
  card: PropTypes.object,
  wallet: PropTypes.object,
  setWalletCb: PropTypes.func.isRequired
};
