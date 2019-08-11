import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { getFundations } from "../../../actions/fetch";
import { getSalesLocations } from "../../../api/gill/resources";
import { getAllBlocked } from "../../../api/gill/BLOCKED";
import SalesLocationModel from "../../../models/SalesLocationModel";
import SalesLocationItem from "./SalesLocationItem";
import {
  Spinner,
  ListGroup,
  Container,
  Row,
  Col,
  Button,
  Card,
  Alert
} from "react-bootstrap";
import "moment/locale/fr";

export default function SalesLocationList(props) {
  const { fundation } = props;
  const [isLocationsLoading, setLocationsLoading] = React.useState(true);
  const [isBlockedLoading, setBlockedLoading] = React.useState(true);
  const [blocked, setBlocked] = React.useState(null);
  const [salesLocations, setSalesLocations] = React.useState(null);

  React.useEffect(() => {
    if (salesLocations && blocked) return;
    Promise.all([
      getSalesLocations(fundation.id),
      getAllBlocked(fundation.id)
    ]).then(datas => {
      setSalesLocations(datas[0].data);
      setLocationsLoading(false);
      setBlocked(datas[1].data);
      setBlockedLoading(false);
    });
  });

  const renderBody = () => {
    if (isLocationsLoading) {
      return (
        <ListGroup.Item>
          <Spinner animation='border' role='status' size='sm'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        </ListGroup.Item>
      );
    }

    if (salesLocations) {
      let elementList = [];
      salesLocations.map(item => {
        elementList.push(SalesLocationItem(fundation.id,item, salesLocations, setSalesLocations, setLocationsLoading));
      });
      return salesLocations.length > 0 ? (
        <ListGroup>{[elementList]}</ListGroup>
      ) : (
        <Alert variant='primary'>No sales locations !</Alert>
      );
    }
    return <Alert variant='danger'>Error !</Alert>;
  };

  const render = () => {
    return (
      <Card className='text-center'>
        <Card.Header>
          <h4>Points de vente</h4>
        </Card.Header>
        {renderBody()}
      </Card>
    );
  };

  return render();
}

SalesLocationList.propTypes = {
  fundationId: PropTypes.number
};
