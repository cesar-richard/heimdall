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

export default function Homepage(props) {
  const [loading, setLoading] = React.useState(false);
  const logger = React.useCallback(m => console.log(m), []);

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
              cb={() => logger("Transferts")}
              label='Transferts'
              icon='hand-holding-usd'
            />
            <HomepageNavItem
              cb={() => logger("Fundations")}
              label='Fundations'
              icon='building'
            />
            <HomepageNavItem
              cb={() => logger("Dora Live")}
              label='Dora Live'
              icon='suitcase'
            />
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

Homepage.propTypes = {};
