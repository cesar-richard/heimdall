import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFundations } from "../../../api/gill/resources";
import FundationModel from "../../../models/FundationModel";
import BlockedList from "../blockedPeoples/BlockedList";
import SalesLocationList from "../SalesLocations/SalesLocationList";
import { getAllBlocked } from "../../../api/gill/BLOCKED";
import { getSalesLocations } from "../../../api/gill/resources";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CardGroup,
  Col,
  Container,
  ListGroup,
  Row,
  Spinner
} from "react-bootstrap";
import Moment from "react-moment";
import "moment/locale/fr";

export default function FundationDetails(props) {
  const [isLoading, setLoading] = React.useState(true);
  const [fundation, setFundation] = React.useState(null);
  const { fundationId, system_id } = useParams();

  React.useEffect(() => {
    getFundations({ system_id })
      .then(data => {
        setFundation(data.data.find(item => item.id === parseInt(fundationId)));
      })
      .catch(data => toast.error(data))
      .finally(() => setLoading(false));
  }, [fundationId, system_id]);

  if (isLoading) {
    return (
      <Spinner animation='border' role='status' size='sm'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    );
  }
  return (
    <Container fluid>
      <Row>
        <h1>{fundation.name}</h1>
      </Row>
      <Row>
        <CardGroup>
          <BlockedList fundationId={fundation.id} />
          <SalesLocationList fundationId={fundation.id} />
        </CardGroup>
      </Row>
    </Container>
  );
}
