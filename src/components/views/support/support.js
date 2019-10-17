import React from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Button,
  Card,
  Container,
  ListGroup,
  Row,
  Col,
  Spinner
} from "react-bootstrap";
import { initializeSocket, subscribeNfc } from "../../../api/scarlet";
import { toast } from "react-toastify";
import Wallet from "../wallet";
import WalletAutocomplete from "../../WalletAutocomplete";

export default function Support(props) {
  const [readerState, setReaderState] = React.useState("warning");
  const [card, setCard] = React.useState(null);
  const [wallet, setWallet] = React.useState(null);

  React.useEffect(() => {
    initializeSocket();
    subscribeNfc({
      onCard: card => {
        setReaderState("success");
        setCard(card);
      },
      onError: error => {
        toast.error(error);
        setReaderState("danger");
      },
      onStart: () => setReaderState("success"),
      onEnd: () => setReaderState("dark")
    });
  }, []);
  return (
    <Container>
      <Row>
        <Alert variant={readerState}>Lecteur NFC</Alert>
        <WalletAutocomplete
          value={wallet}
          onSuggestionSelected={sug => setWallet(sug.suggestion)}
        />
      </Row>
      <Row>
        {card || wallet ? (
          <Wallet wallet={wallet} uid={card} setWalletCb={console.log} />
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
}

Support.propTypes = {};
