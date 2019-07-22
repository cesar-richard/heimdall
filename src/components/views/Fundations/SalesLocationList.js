import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { getFundations, getSalesLocations } from "../../../actions/fetch";
import SalesLocationModel from "../../../models/SalesLocationModel";
import {
  Spinner,
  ListGroup,
  Container,
  Row,
  Col,
  Button
} from "react-bootstrap";
import "moment/locale/fr";

class SalesLocationList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchSalesLocation(this.props.fundationId);
  }

  handleClick(e) {
    console.log(
      "Handled click",
      e.target.dataset.slid,
      e.target.dataset.enabled,
      this.props.fundationId
    );
  }

  render() {
    if (this.props.salesLocations.isLoading[this.props.fundationId]) {
      return (
        <Spinner animation='border' role='status' size='sm'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      );
    }
    if (this.props.salesLocations.hasBeenFetched[this.props.fundationId]) {
      let salesLocations = this.props.salesLocations.data[
        this.props.fundationId
      ];
      let elementList = [];
      salesLocations.map(item => {
        elementList.push(
          <ListGroup.Item key={item.id}>
            <Container>
              <Row>
                <Col>{item.name}</Col>
                <Col>{item.enabled ? "Enabled" : "Disabled"}</Col>
                <Col>
                  <Button
                    variant={item.enabled ?'danger':'success'}
                    data-slid={item.id}
                    data-enabled={item.enabled}
                    onClick={this.handleClick}
                  >
                    {item.enabled ? "Disable" : "Enable"}
                  </Button>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
        );
      });
      return salesLocations.length > 0 ? (
        <ListGroup>
          <ListGroup.Item>
            <Container>
              <Row>
                <Col>Nom</Col>
                <Col>Status</Col>
                <Col>Command</Col>
              </Row>
            </Container>
          </ListGroup.Item>
          {[elementList]}
        </ListGroup>
      ) : (
        "No datas"
      );
    }
    return "Debug";
  }
}

const mapStateToProps = state => ({
  salesLocations: state.salesLocations
});

const mapDispatchToProps = dispatch => ({
  fetchSalesLocation: fundationId => dispatch(getSalesLocations(fundationId))
});

SalesLocationList.propTypes = {
  fetchSalesLocation: PropTypes.func,
  salesLocations: PropTypes.arrayOf(PropTypes.instanceOf(SalesLocationModel)),
  fundationId: PropTypes.number
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesLocationList);
