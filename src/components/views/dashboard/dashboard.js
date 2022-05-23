import React from "react";
import PropTypes from "prop-types";
import { Card, CardGroup } from "react-bootstrap";
import DashboardCurrencies from "./dashboardCurrencies";
import DashboardZoneAccesses from "./dashboardZoneAccesses";

export default function Dashboard(props) {
  return (
    <CardGroup>
      <Card>
        <Card.Header>Currencies</Card.Header>
        <DashboardCurrencies />
      </Card>
      <Card>
        <Card.Header>Zone accesses</Card.Header>
        <DashboardZoneAccesses />
      </Card>
    </CardGroup>
  );
}
Dashboard.propTypes = {};
