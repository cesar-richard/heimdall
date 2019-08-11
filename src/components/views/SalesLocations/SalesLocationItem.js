import React from "react";
import { ListGroup, Container, Row, Col, Button, Card } from "react-bootstrap";
import {
  getSalesLocations,
  putSalesLocations
} from "../../../api/gill/resources";

export default function SalesLocationItem(
  fundationId,
  salesLocation,
  salesLocations,
  setSalesLocations
) {
  const handleClick = e => {
    putSalesLocations(
      fundationId,
      e.target.dataset.slid,
      e.target.dataset.name,
      e.target.dataset.enabled
    ).then(datas => {
      salesLocations[salesLocations.findIndex(x => x.id === datas.data.id)] =
        datas.data;
    });
  };

  return (
    <ListGroup.Item key={salesLocation.id}>
      <Container>
        <Row>
          <Col>{salesLocation.name}</Col>
          <Col>
            <Button
              variant={salesLocation.enabled ? "danger" : "success"}
              data-slid={salesLocation.id}
              data-enabled={!salesLocation.enabled}
              data-name={salesLocation.name}
              onClick={handleClick}
            >
              {salesLocation.enabled ? "Disable" : "Enable"}
            </Button>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
}
