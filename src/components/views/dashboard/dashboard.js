import React from "react";
import PropTypes from "prop-types";
import { Card, CardDeck } from "react-bootstrap";
import DashboardCurrencies from "./dashboardCurrencies";
import DashboardZoneAccesses from "./dashboardZoneAccesses";

export default function Dashboard(props) {
  return (
    <CardDeck>
      <Card>
        <Card.Body>
          <Card.Title>Currencies</Card.Title>
          <Card.Text>
            <DashboardCurrencies />
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Zone accesses</Card.Title>
          <Card.Text>
            <DashboardZoneAccesses />
          </Card.Text>
        </Card.Body>
      </Card>
    </CardDeck>
  );
}
Dashboard.propTypes = {};
