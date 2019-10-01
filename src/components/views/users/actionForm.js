import React from "react";
import { Button, Col, Form, ProgressBar, Spinner } from "react-bootstrap";
import WalletGroupSelector from "./walletGroupSelector";
import CurrencySelector from "./currencySelector";
import ZoneSelector from "./zoneSelector";
import PeriodSelector from "./periodSelector";
import { batchAccess, batchRefill } from "../../../api/gill/wallets";
import { addWalletToWalletgroup } from "../../../api/gill/resources";
import PromisePool from "es6-promise-pool";
import PropTypes from "prop-types";

export default function ActionForm({ walletList }) {
  const [action, setAction] = React.useState("addWalletsToGroup");
  const [group, setGroup] = React.useState(null);
  const [currency, setCurrency] = React.useState(null);
  const [currencyQuantity, setCurrencyQuantity] = React.useState(0);
  const [zoneQuantity, setZoneQuantity] = React.useState(0);
  const [zone, setZone] = React.useState(null);
  const [period, setPeriod] = React.useState(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processState, setProcessState] = React.useState(0);
  const [method, setMethod] = React.useState("set");
  let count = 0;

  const CONCURENCY_LIMIT = 10;
  let walletsToProcess = [];
  const promiseProducer = function() {
    if (walletsToProcess.length === 0) {
      return null;
    }
    const wallet = walletsToProcess.shift();
    switch (action) {
      case "addZoneAccessToWallet":
        return batchAccess({
          walletIds: [wallet],
          quantity: zoneQuantity,
          kind: method,
          zones: [zone],
          periods: [period]
        }).then(() =>
          setProcessState(Math.floor((++count / walletList.length) * 100))
        );
      case "addWalletsToGroup":
        return addWalletToWalletgroup({
          walletGroupId: group,
          walletId: [wallet]
        }).then(() =>
          setProcessState(Math.floor((++count / walletList.length) * 100))
        );
      case "setCurrencyForWallet":
        return batchRefill({
          walletIds: [wallet],
          quantity: currencyQuantity * 100,
          currency
        }).then(() =>
          setProcessState(Math.floor((++count / walletList.length) * 100))
        );
      default:
    }
  };

  const pool = new PromisePool(promiseProducer, CONCURENCY_LIMIT);

  return (
    <Form
      onSubmit={synthEvent => {
        synthEvent.preventDefault();
        walletsToProcess = [];
        walletList.map(w => walletsToProcess.push(w));
        count = 0;
        setIsProcessing(true);
        pool
          .start()
          .then(() => {
            setIsProcessing(false);
          })
          .catch(console.error);
      }}
    >
      <Form.Row>
        <Col sm={2}>
          <Form.Group controlId='action'>
            <Form.Control
              as='select'
              onChange={synthEvent => {
                setAction(synthEvent.target.value);
              }}
              defaultValue='addWalletsToGroup'
              disabled={isProcessing}
              required
            >
              <option value='addWalletsToGroup'>Add wallets to group</option>
              <option value='setCurrencyForWallet'>
                Set currency value for wallets
              </option>
              <option value='addZoneAccessToWallet'>
                Add zone access to wallets
              </option>
            </Form.Control>
          </Form.Group>
        </Col>

        {action === "setCurrencyForWallet" ? (
          <>
            <Col sm={2}>
              <Form.Group controlId='selectCurrency' disabled={isProcessing}>
                <CurrencySelector
                  value={currency ? currency : ""}
                  onChange={synth => setCurrency(synth.target.value)}
                  disabled={isProcessing}
                />
              </Form.Group>
            </Col>
            <Col sm={1}>
              <Form.Group controlId='selectCurrencyQuantity'>
                <Form.Control
                  type='number'
                  onChange={synthEvent => {
                    setCurrencyQuantity(synthEvent.target.value);
                  }}
                  value={currencyQuantity}
                  disabled={isProcessing}
                  required
                />
              </Form.Group>
            </Col>
          </>
        ) : action === "addWalletsToGroup" ? (
          <Col sm={2}>
            <Form.Group controlId='selectGroup'>
              <WalletGroupSelector
                value={group ? group : ""}
                onChange={synth => setGroup(synth.target.value)}
                disabled={isProcessing}
              />
            </Form.Group>
          </Col>
        ) : (
          <>
            <Col sm={2}>
              <Form.Group controlId='selectZone'>
                <ZoneSelector
                  value={zone ? zone : ""}
                  onChange={synth => setZone(synth.target.value)}
                  disabled={isProcessing}
                />
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Form.Group controlId='selectPeriod'>
                <PeriodSelector
                  value={period ? period : ""}
                  onChange={synth => setPeriod(synth.target.value)}
                  disabled={isProcessing}
                />
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Form.Group controlId='method'>
                <Form.Control
                  as='select'
                  onChange={synthEvent => {
                    setMethod(synthEvent.target.value);
                  }}
                  defaultValue='set'
                  disabled={isProcessing}
                  required
                >
                  <option value='set'>Set</option>
                  <option value='add'>Add</option>
                  <option value='dec'>Remove</option>
                  <option value='delete'>Delete</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={1}>
              <Form.Group
                controlId='selectZoneQuantity'
                disabled={isProcessing}
              >
                <Form.Control
                  type='number'
                  onChange={synthEvent => {
                    setZoneQuantity(synthEvent.target.value);
                  }}
                  defaultValue={0}
                  value={zoneQuantity}
                  disabled={isProcessing}
                  required
                />
              </Form.Group>
            </Col>
          </>
        )}
        <Col sm={1}>
          <Button variant='primary' type='submit' disabled={isProcessing}>
            {!isProcessing ? (
              "Submit"
            ) : (
              <Spinner animation='border' role='status' size='sm'>
                <span className='sr-only'>Processing...</span>
              </Spinner>
            )}
          </Button>
        </Col>
        <Col>
          {isProcessing ? (
            <ProgressBar
              animated
              now={processState}
              label={`${processState}%`}
            />
          ) : (
            <></>
          )}
        </Col>
      </Form.Row>
    </Form>
  );
}
