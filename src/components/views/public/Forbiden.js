import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Row } from "react-bootstrap";

class Forbiden extends Component {
  render() {
    return (
      <Container>
        <Row>
          <img src='/img/forbiden.png' />
        </Row>
      </Container>
    );
  }
}

export default Forbiden;
