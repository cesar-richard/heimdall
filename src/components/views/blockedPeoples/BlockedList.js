import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { getAllBlocked } from "../../../api/gill/BLOCKED";
import BlockedModel from "../../../models/BlockedModel";
import BlockedItem from "./BlockedItem";
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
import { useParams } from "react-router-dom";
import "moment/locale/fr";

export default function BlockedList(props) {
  const { fundationId } = props;
  const [blocked, setBlocked] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const { system_id } = useParams();

  React.useEffect(() => {
    if (blocked) return;
    getAllBlocked({ fundationId, system_id }).then(datas => {
      setBlocked(Object.values(datas.data).map(item => new BlockedModel(item)));
      setLoading(false);
    });
  });

  if (blocked) {
    0 < blocked.length ? (
      <ListGroup>
        {blocked.map((item, key) => {
          <ListGroup.Item>{item.login}</ListGroup.Item>;
        })}
      </ListGroup>
    ) : (
      <Alert variant='success'>Nobody !</Alert>
    );
  }

  if (isLoading) {
    return (
      <ListGroup.Item>
        <Spinner animation='border' role='status' size='sm'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      </ListGroup.Item>
    );
  }

  return (
    <Card className='text-center'>
      <Card.Header>
        <h4>Blocages</h4>
      </Card.Header>
      {
        <ListGroup>
          {blocked.map((item, key) => {
            return (
              <BlockedItem
                key={key}
                fundationId={fundationId}
                blockedPeople={item}
                blockedPeoples={blocked}
              />
            );
          })}
        </ListGroup>
      }
      <Card.Footer>
        <Form inline>
          <FormControl type='text' placeholder='Login' className='mr-sm-2' />
          <FormControl type='text' placeholder='Motif' className='mr-sm-2' />
          <Button variant='outline-danger'>Bloquer</Button>
        </Form>
      </Card.Footer>
    </Card>
  );
}
