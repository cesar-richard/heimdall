import React from "react";
import { ListGroup, Container, Row, Col, Button, Card } from "react-bootstrap";
import { remove } from "../../../api/gill/BLOCKED";
import Moment from "react-moment";

export default function BlockedItem(props) {
  const { fundationId, blockedPeople, blockedPeoples } = props;
  const [isLoading, setLoading] = React.useState(false);
  const handleClick = e => {
    setLoading(true);
    remove(blockedPeople.blo_id, fundationId)
      .then(datas => {
        blockedPeoples.splice(
          blockedPeoples.findIndex(
            item => item.blo_id === blockedPeople.blo_id
          ),
          1
        );
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  };

  return (
    <ListGroup.Item key={blockedPeople.blo_id}>
      <Container>
        <Row>
          <Col>
            {blockedPeople.usr_firstname} {blockedPeople.usr_lastname} (
            {blockedPeople.login})
          </Col>
          <Col>{blockedPeople.blo_raison}</Col>
          <Col>
            <Moment format='DD/MM/YYYY HH:mm'>
              {blockedPeople.blo_insert}
            </Moment>
          </Col>
          <Col>
            <Moment format='DD/MM/YYYY HH:mm'>
              {blockedPeople.blo_removed}
            </Moment>
          </Col>
          <Col>
            <Button
              variant={isLoading ? "primary" : "success"}
              disabled={isLoading}
              onClick={handleClick}
            >
              Débloquer
            </Button>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
}
