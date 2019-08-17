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
  Alert,
  Form,
  FormControl
} from "react-bootstrap";
import "moment/locale/fr";

export default function SalesLocationList(props) {
  const { fundation } = props;
  const [isLocationsLoading, setLocationsLoading] = React.useState(true);
  const [salesLocations, setSalesLocations] = React.useState(null);
  const [valueFilter, setValueFilter] = React.useState("");

  React.useEffect(() => {
    if (salesLocations) return;
    getSalesLocations(fundation.id).then(datas => {
      setSalesLocations(datas.data);
      setLocationsLoading(false);
    });
  });

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
    return salesLocations.length > 0 ? (
      <Card className='text-center'>
        <Card.Header>
          <h4>Points de vente</h4>
        </Card.Header>
        <ListGroup>
          <Form inline>
            <FormControl
              type='text'
              placeholder='Filtrer'
              onChange={val => setValueFilter(val.target.value)}
            />
          </Form>
          {salesLocations
            .filter(x => {
              return x.name.toLowerCase().includes(valueFilter.toLowerCase());
            })
            .map((item, key) => (
              <SalesLocationItem
                key={key}
                fundationId={fundation.id}
                salesLocation={item}
                salesLocations={salesLocations}
              />
            ))}
        </ListGroup>
      </Card>
    ) : (
      <Card className='text-center'>
        <Card.Header>
          <h4>Points de vente</h4>
        </Card.Header>
        <Alert variant='primary'>No sales locations !</Alert>
      </Card>
    );
  }
  return (
    <Card className='text-center'>
      <Card.Header>
        <h4>Points de vente</h4>
      </Card.Header>
      <Alert variant='danger'>Error !</Alert>
    </Card>
  );
}

SalesLocationList.propTypes = {
  fundation: PropTypes.object.isRequired
};
