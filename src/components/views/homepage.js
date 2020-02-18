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
import { useParams } from "react-router-dom";
import { getEvents } from "../../api/gill/resources";

export default function Homepage(props) {
  const goTo = React.useCallback(m => window.location.assign(m), []);
  const { system_id, event_id } = useParams();
  retur(
    <Container fluid style={{ padding: 0 }}>
      <Row>
        <Col style={{ padding: 0 }}>
          <CardGroup>
            <HomepageNavItem
              cb={() => goTo(`/${system_id}/${event_id}/transferts`)}
              label='Transferts'
              icon='hand-holding-usd'
            />
            <HomepageNavItem
              cb={() => goTo(`/${system_id}/${event_id}/fundations`)}
              label='Fundations'
              icon='building'
            />
            <HomepageNavItem
              cb={() => goTo(`/${system_id}/${event_id}/users`)}
              label='Users'
              icon='user'
            />
            <HomepageNavItem
              cb={() => goTo(`/${system_id}/${event_id}/dashboard`)}
              label='Dashboard'
              icon='traffic-light'
            />
            <HomepageNavItem
              cb={() => goTo(`/${system_id}/${event_id}/support`)}
              label='Support'
              icon='ambulance'
            />
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

Homepage.propTypes = {};
