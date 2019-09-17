import React from "react";
import PropTypes from "prop-types";
import DataTable from "./dataTable";
import { Col, Form } from "react-bootstrap";
import { getCurrencies, getWalletGroups } from "../../../api/gill/resources";

export default function UserDashboard(props) {
  const [action, setAction] = React.useState('addWalletsToGroup');
  const [groups, setGroups] = React.useState(null);
  const [currencies, setCurrencies] = React.useState(null);
  React.useEffect(() => {getWalletGroups().then(data => setGroups(data.data))});
  React.useEffect(() => {getCurrencies().then(data => setCurrencies(data.data))});
  return (
    <>
      <Form>
        <Form.Row>
          <Col>
            <Form.Group controlId='action'>
              <Form.Label>Action</Form.Label>
              <Form.Control
                as='select'
                onChange={synthEvent => setAction(synthEvent.target.value)}
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
          <Col>
            <Form.Group controlId='exampleForm.ControlSelect1'>
              <Form.Label>Currency</Form.Label>
              <Form.Control
                as='select'
                onChange={() => console.log(groups,currencies,action)}
                required
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>

      <DataTable />
    </>
  );
}

UserDashboard.propTypes = {};
