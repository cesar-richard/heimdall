import React from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Button,
  Col,
  Container,
  ListGroup,
  Row,
  Spinner
} from "react-bootstrap";
import { initializeSocket, setMode, subscribeNfc } from "../../../api/scarlet";
import { createPairing } from "../../../api/gill/GESUSERS";
import { toast } from "react-toastify";
import Wallet from "../wallet";
import WalletAutocomplete from "../../WalletAutocomplete";
import { useParams } from "react-router-dom";

export default function Support(props) {
  const [readerState, setReaderState] = React.useState("warning");
  const [card, setCard] = React.useState(null);
  const [wallet, setWallet] = React.useState(null);
  const { system_id } = useParams();

  React.useEffect(() => {
    initializeSocket();
    subscribeNfc({
      onCard: card => {
        setReaderState("success");
        setWallet(null);
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
          onSuggestionSelected={sug => {
            setCard(null);
            setWallet(sug.suggestion);
          }}
        />
      </Row>
      <Row>
        {card || wallet ? (
          <>
            <Col>
              <Wallet wallet={wallet} card={card} setWalletCb={console.log} />
            </Col>
            <Col>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Button
                    variant='primary'
                    onClick={() =>
                      createPairing({ wallet: wallet.id, system_id }).then(() =>
                        toast("Done")
                      )
                    }
                  >
                    Reassocier
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    variant='danger'
                    onClick={() =>
                      setMode("erease")
                        .then(() => toast("Done"))
                        .catch(err => {
                          toast.error(err);
                        })
                    }
                  >
                    Effacer
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </>
        ) : (
          <></>
        )}
      </Row>
    </Container>
  );
}

Support.propTypes = {};
