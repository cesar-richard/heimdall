import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { getSalesLocations } from "../../../api/gill/resources";
import { getAllBlocked } from "../../../api/gill/BLOCKED";
import SalesLocationModel from "../../../models/SalesLocationModel";
import SalesLocationItem from "./SalesLocationItem";
import { useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  ListGroup,
  Row,
  Spinner
} from "react-bootstrap";

export default function SalesLocationList(props) {
  const { fundationId } = props;
  const [isLocationsLoading, setLocationsLoading] = React.useState(true);
  const [salesLocations, setSalesLocations] = React.useState(null);
  const [valueFilter, setValueFilter] = React.useState("");
  const { system_id, event_id } = useParams();

  React.useEffect(() => {
    if (0 === fundationId) {
      setSalesLocations([]);
      setLocationsLoading(false);
      return;
    }
    getSalesLocations({ fundationId: fundationId, system_id, event_id }).then(
      datas => {
        setSalesLocations(datas.data);
        setLocationsLoading(false);
      }
    );
  }, [event_id, fundationId, system_id]);

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
    return 0 < salesLocations.length ? (
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
                fundationId={fundationId}
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
