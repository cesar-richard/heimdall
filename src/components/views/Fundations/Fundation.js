import React, { Component } from "react";
import PropTypes from "prop-types";

import { getAllBlocked } from "../../../api/gill/BLOCKED";
import { getSalesLocations } from "../../../api/gill/resources";
import { Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import FundationModel from "../../../models/FundationModel";
import BlockedModel from "../../../models/BlockedModel";
import SalesLocationModel from "../../../models/SalesLocationModel";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Fundation(props) {
  const [isLoadingSalesLoc, setLoadingSalesLoc] = React.useState(true);
  const [isLoadingBlocked, setLoadingBlocked] = React.useState(true);
  const [blocked, setBlocked] = React.useState([]);
  const [salesLocations, setSalesLocations] = React.useState([]);
  const { system_id, event_id } = useParams();
  const {
    fundation: { id, name }
  } = props;
  React.useEffect(() => {
    if (0 == id) {
      return setLoadingSalesLoc(false);
    }
    getSalesLocations({ fundationId: id, system_id, event_id })
      .then(data => {
        setSalesLocations(data.data);
      })
      .catch(data => toast.error(data))
      .finally(() => setLoadingSalesLoc(false));
  }, [event_id, id, system_id]);

  React.useEffect(() => {
    getAllBlocked({ fundationId: id, system_id })
      .then(data => {
        setBlocked(Object.values(data.data));
      })
      .catch(data => toast.error(data))
      .finally(() => setLoadingBlocked(false));
  }, [id, system_id]);

  const activeSalesLocationsCount = salesLocations.filter(item => {
    return item.enabled;
  }).length;
  const blockedBody = isLoadingBlocked ? (
    <Spinner animation='border' role='status' size='sm'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  ) : (
    blocked.length + " blocked"
  );
  const salesLocationsBody = isLoadingSalesLoc ? (
    <Spinner animation='border' role='status' size='sm'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  ) : activeSalesLocationsCount === salesLocations.length &&
    0 === salesLocations.length ? (
    "No sales locations"
  ) : (
    activeSalesLocationsCount +
    "/" +
    salesLocations.length +
    " active sales locations"
  );

  return (
    <ListGroup.Item
      variant={0 < blocked.length ? "danger" : "info"}
      action
      href={`/${system_id}/${event_id}/fundations/${id}`}
    >
      <Container>
        <Row>
          <Col>{name}</Col>
          <Col>{blockedBody}</Col>
          <Col>{salesLocationsBody}</Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
}

Fundation.propTypes = {
  fundation: PropTypes.instanceOf(FundationModel).isRequired
};
