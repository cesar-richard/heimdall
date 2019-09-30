import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardGroup,
  Col,
  Container,
  Row,
  Spinner,
  Table
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomepageNavItem from "../HomepageNavItem";
import { toast } from "react-toastify";

export default function Homepage(props) {
  const [loading, setLoading] = React.useState(false);
  const goTo = React.useCallback(m => window.location.assign(m), []);

  return loading ? (
    <Spinner animation='border' role='status' size='sm'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  ) : (
    <Container fluid style={{ padding: 0 }}>
      <Row>
        <Col style={{ padding: 0 }}>
          <CardGroup>
            <HomepageNavItem
              cb={() => goTo("/transferts")}
              label='Transferts'
              icon='hand-holding-usd'
            />
            <HomepageNavItem
              cb={() => goTo("/fundations")}
              label='Fundations'
              icon='building'
            />
            <HomepageNavItem
              cb={() => goTo("/users")}
              label='Users'
              icon='user'
            />
            <HomepageNavItem
              cb={() => goTo("/dashboard")}
              label='Dashboard'
              icon='traffic-light'
            />
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

Homepage.propTypes = {};
