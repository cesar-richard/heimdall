import React from "react";
import PropTypes from "prop-types";
import DataTable from "./dataTable";
import { Button, Col, Form } from "react-bootstrap";
import WalletGroupSelector from "./walletGroupSelector";
import CurrencySelector from "./currencySelector";

export default function UserDashboard(props) {
  const [action, setAction] = React.useState("addWalletsToGroup");
  const [group, setGroup] = React.useState(null);
  const [currency, setCurrency] = React.useState(null);
  return (
    <>
      <Form>
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
                <option value='addAccessRightsToWallet'>
                  Add access rights to wallets
                </option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm={5}>
            {action === "setCurrencyForWallet" ? (
              <Form.Group controlId='exampleForm.ControlSelect1'>
                <CurrencySelector
                  value={currency ? currency : ""}
                  onChange={synth => setCurrency(synth.target.value)}
                />
              </Form.Group>
            ) : action === "addWalletsToGroup" ? (
              <Form.Group controlId='exampleForm.ControlSelect1'>
                <WalletGroupSelector
                  value={group ? group : ""}
                  onChange={synth => setGroup(synth.target.value)}
                />
              </Form.Group>
            ) : (
              <span>Not yet implemented</span>
            )}
          </Col>
          <Col sm={2}>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Col>
        </Form.Row>
      </Form>
      <DataTable />
    </>
  );
}

UserDashboard.propTypes = {};
