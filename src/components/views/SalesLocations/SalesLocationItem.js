import React from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import {
  getSalesLocations,
  putSalesLocations
} from "../../../api/gill/resources";
import { useParams } from "react-router-dom";

export default function SalesLocationItem(props) {
  const { fundationId, salesLocation } = props;
  const [salesLocationData, setSalesLocationData] = React.useState(
    salesLocation
  );
  const [isLoading, setLoading] = React.useState(false);
  const { system_id } = useParams();
  const handleClick = e => {
    setLoading(true);
    putSalesLocations({
      fundationId,
      salesLocationId: e.target.dataset.slid,
      name: e.target.dataset.name,
      enabled: e.target.dataset.enabled,
      system_id
    })
      .then(datas => {
        setSalesLocationData(datas.data);
      })
      .catch()
      .finally(() => setLoading(false));
  };
  let buttonText = isLoading
    ? "Loading"
    : salesLocation.enabled
    ? "Disable"
    : "Enable";
  let buttonVariant = isLoading
    ? "primary"
    : salesLocation.enabled
    ? "danger"
    : "success";
  return (
    <ListGroup.Item key={salesLocation.id}>
      <Container>
        <Row>
          <Col>{salesLocation.name}</Col>
          <Col>
            <Button
              variant={buttonVariant}
              data-slid={salesLocation.id}
              data-enabled={!salesLocation.enabled}
              data-name={salesLocation.name}
              onClick={handleClick}
              disabled={isLoading}
            >
              {buttonText}
            </Button>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
}
