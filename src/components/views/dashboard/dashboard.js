import React from "react";
import PropTypes from "prop-types";
import { Card, CardColumns } from "react-bootstrap";
import DashboardCurrencies from "./dashboardCurrencies";
import DashboardZoneAccesses from "./dashboardZoneAccesses";

export default function Dashboard(props) {
  return (
    <CardColumns>
      <Card>
        <Card.Header>Currencies</Card.Header>
        <DashboardCurrencies />
      </Card>
      <Card>
        <Card.Header>Zone accesses</Card.Header>
        <DashboardZoneAccesses />
      </Card>
    </CardColumns>
  );
}
Dashboard.propTypes = {};
