import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HomepageNavItem(props) {
  return (
    <Col md={6} style={{ padding: 0 }}>
      <Card
        bg='primary'
        text='white'
        className='text-center'
        onClick={() => props.cb()}
      >
        <blockquote className='blockquote card-body'>
          <FontAwesomeIcon icon={props.icon} size='5x' />
          <p>{props.label}</p>
        </blockquote>
      </Card>
    </Col>
  );
}
