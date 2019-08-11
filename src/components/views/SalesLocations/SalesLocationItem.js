import React from "react";
import {
  ListGroup,
  Container,
  Row,
  Col,
  Button,
  Card,
} from "react-bootstrap";
import { getSalesLocations } from "../../../actions/fetch/salesLocationsActions";

export default function SalesLocationItem(salesLocation, salesLocations, setSalesLocations) {
  const handleClick = e => {
    console.log(
      "Handled click",
      e.target.dataset.slid,
      e.target.dataset.enabled,
      e.target.dataset.name
    );
    //this.props.fetchSalesLocation(2);
  }

  return (
    <ListGroup.Item key={salesLocation.id}>
      <Container>
        <Row>
          <Col>{salesLocation.name}</Col>
          <Col>
            <Button
              variant={salesLocation.enabled ?'danger':'success'}
              data-slid={salesLocation.id}
              data-enabled={salesLocation.enabled}
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
