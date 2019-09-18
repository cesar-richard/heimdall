import React from "react";
import PropTypes from "prop-types";
import DataTable from "./dataTable";
import { Button, Col, Form } from "react-bootstrap";
import WalletGroupSelector from "./walletGroupSelector";
import CurrencySelector from "./currencySelector";
import ZoneSelector from "./zoneSelector";
import { batchRefill } from "../../../api/gill/wallets";

function reducer(state, action) {
  switch (action.type) {
    case "addWallet":
      if (!state.includes(action.wallet)) {
        state.push(action.wallet);
      }
      return state;
    case "removeWallet":
      if (state.includes(action.wallet)) {
        state.splice(state.indexOf(action.wallet), 1);
      }
      return state;
    default:
      return state;
  }
}

export default function UserDashboard(props) {
  const [action, setAction] = React.useState("addWalletsToGroup");
  const [group, setGroup] = React.useState(null);
  const [currency, setCurrency] = React.useState(null);
  const [currencyQuantity, setCurrencyQuantity] = React.useState(0);
  const [zoneQuantity, setZoneQuantity] = React.useState(0);
  const [zone, setZone] = React.useState(null);
  const [walletList, dispatch] = React.useReducer(reducer, []);
  return (
    <>
      <Form
        onSubmit={synthEvent => {
          synthEvent.preventDefault();
          if (action === "setCurrencyForWallet") {
            batchRefill({
              walletIds: walletList,
              quantity: currencyQuantity * 100,
              currency
            })
              .then(data => console.log(data.data))
              .catch(err => console.error(err));
          }
        }}
      >
        <Form.Row>
          <Col sm={5}>
            <Form.Group controlId='action'>
              <Form.Control
                as='select'
                onChange={synthEvent => {
                  setAction(synthEvent.target.value);
                }}
                defaultValue='addWalletsToGroup'
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
              <Col sm={4}>
                <Form.Group controlId='selectCurrency'>
                  <CurrencySelector
                    value={currency ? currency : ""}
                    onChange={synth => setCurrency(synth.target.value)}
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
                    defaultValue='addWalletsToGroup'
                    required
                  />
                </Form.Group>
              </Col>
            </>
          ) : action === "addWalletsToGroup" ? (
            <Col sm={5}>
              <Form.Group controlId='selectGroup'>
                <WalletGroupSelector
                  value={group ? group : ""}
                  onChange={synth => setGroup(synth.target.value)}
                />
              </Form.Group>
            </Col>
          ) : (
            <>
              <Col sm={4}>
                <Form.Group controlId='selectZone'>
                  <ZoneSelector
                    value={zone ? zone : ""}
                    onChange={synth => setZone(synth.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col sm={1}>
                <Form.Group controlId='selectZoneQuantity'>
                  <Form.Control
                    type='number'
                    onChange={synthEvent => {
                      setZoneQuantity(synthEvent.target.value);
                    }}
                    defaultValue='addWalletsToGroup'
                    required
                  />
                </Form.Group>
              </Col>
            </>
          )}
          <Col sm={2}>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Col>
        </Form.Row>
      </Form>
      <DataTable
        addWallet={wallet => dispatch({ type: "addWallet", wallet })}
        removeWallet={wallet => dispatch({ type: "removeWallet", wallet })}
      />
    </>
  );
}

UserDashboard.propTypes = {};
