import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Row } from "react-bootstrap";

class Forbiden extends Component {
  render() {
    return (
      <Container
        fluid
        style={{
          backgroundColor: "#2C3E50",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Row>
          <img src='/img/forbiden.png' style={{ width: "100%" }} />
        </Row>
      </Container>
    );
  }
}

export default Forbiden;
