import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFundations } from "../../../actions/fetch";
import FundationModel from "../../../models/FundationModel";
import BlockedList from "./BlockedList";
import SalesLocationList from "../SalesLocations/SalesLocationList";
import {
  Spinner,
  ListGroup,
  Container,
  Row,
  Col,
  CardGroup
} from "react-bootstrap";
import { ArcGauge } from "@progress/kendo-react-gauges";
import Moment from "react-moment";
import "moment/locale/fr";

class FundationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Math.floor(Math.random() * 101)
    };
  }

  componentDidMount() {
    const { fundationId } = this.props.match.params;
    this.props.fetchFundations();
    this.intervalID = setInterval(() => {
      this.setState({ value: Math.floor(Math.random() * 101) });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const colors = [
      { from: 0, to: 25, color: "red" },
      { from: 25, to: 75, color: "orange" },
      { from: 75, to: 100, color: "lime" }
    ];

    const arcOptions = {
      value: this.state.value,
      colors
    };

    const arcCenterRenderer = (value, color) => {
      return <h3 style={{ color: color }}>{value}%</h3>;
    };

    const { fundationId } = this.props.match.params;
    if (
      this.props.fundations.hasBeenFetched ||
      sessionStorage.hasOwnProperty("fundations")
    ) {
      const fundation = this.props.fundations.data.find(
        item => item.id === parseInt(fundationId)
      );
      return (
        <Container fluid>
          <Row>
            <h1>{fundation.name}</h1>
          </Row>
          <Row>
            <CardGroup>
              <BlockedList fundationId={fundation.id} />
              <SalesLocationList fundation={fundation} />
            </CardGroup>
          </Row>
          <Row>
            <ArcGauge {...arcOptions} arcCenterRender={arcCenterRenderer} />
          </Row>
        </Container>
      );
    }
    return (
      <Spinner animation='border' role='status' size='sm'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    );
  }
}

FundationDetails.propTypes = {
  fetchFundations: PropTypes.func.isRequired,
  fundations: PropTypes.arrayOf(PropTypes.instanceOf(FundationModel)),
  match: PropTypes.object
};

const mapStateToProps = state => ({
  fundations: state.fundations,
  salesLocations: state.salesLocations
});

const mapDispatchToProps = dispatch => ({
  fetchFundations: () => dispatch(getFundations())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FundationDetails);
