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
import Switch from "react-bootstrap-switch";
import Wallet from "../wallet";
import TransfertCard from "./transfertCard";
import { useParams } from "react-router-dom";

export default function Transferts(props) {
  const READER_SOURCE = "source";
  const READER_DESTINATION = "destination";
  const [readerState, setReaderState] = React.useState("warning");
  const [sourceCard, setSourceCard] = React.useState(null);
  const [destinationCard, setDestinationCard] = React.useState(null);
  const [handledCard, setHandledCard] = React.useState(READER_SOURCE);
  const [walletSource, setWalletSource] = React.useState(null);
  const [walletDestination, setWalletDestination] = React.useState(null);

  const onCardHandler = React.useRef();
  const { system_id } = useParams();

  React.useEffect(() => {
    if (handledCard === READER_SOURCE) {
      onCardHandler.current = setSourceCard;
    } else if (handledCard === READER_DESTINATION) {
      onCardHandler.current = setDestinationCard;
    }
  }, [handledCard]);

  React.useEffect(() => {
    initializeSocket({ system_id });
    subscribeNfc({
      onCard: card => {
        setReaderState("success");
        onCardHandler.current(card);
      },
      onError: error => {
        toast.error(error);
        setReaderState("danger");
      },
      onStart: () => setReaderState("success"),
      onEnd: () => setReaderState("dark")
    });
  }, [system_id]);
  return (
    <Container>
      <Row>
        <Alert variant={readerState}>Lecteur NFC</Alert>
      </Row>
      <Row>
        <Col>Carte source</Col>
        <Col>
          <Switch
            onChange={(el, state) =>
              setHandledCard(state ? READER_DESTINATION : READER_SOURCE)
            }
            name='handledCard'
            animate
            inverse
            value={handledCard === READER_DESTINATION}
            onColor='default'
            offColor='default'
            onText='Destination'
            offText='Source'
          />
        </Col>
        <Col>Carte destination</Col>
      </Row>
      <Row>
        <Col md={4}>
          {sourceCard ? (
            <Wallet uid={sourceCard.uid} setWalletCb={setWalletSource} />
          ) : (
            <></>
          )}
        </Col>
        <Col md={4}>
          {sourceCard && destinationCard ? (
            walletSource && walletDestination ? (
              <TransfertCard
                walletSource={walletSource}
                walletDestination={walletDestination}
                transfertCallback={() => {
                  toast.success("Transfert done");
                  setWalletDestination(null);
                  setWalletSource(null);
                  setSourceCard(null);
                  setDestinationCard(null);
                  setHandledCard(READER_SOURCE);
                }}
              />
            ) : (
              <Spinner animation='border' role='status' size='sm'>
                <span className='sr-only'>Loading...</span>
              </Spinner>
            )
          ) : (
            <></>
          )}
        </Col>
        <Col md={4}>
          {destinationCard ? (
            <Wallet
              uid={destinationCard.uid}
              setWalletCb={setWalletDestination}
            />
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Container>
  );
}

Transferts.propTypes = {};
