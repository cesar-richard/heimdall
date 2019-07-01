import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFundations } from "../../../actions/fetch";
import { getSalesLocations } from "../../../actions/fetch/salesLocationsActions";
import FundationModel from "../../../models/FundationModel";
import BlockedList from "./BlockedList";
import { Spinner, ListGroup, Container, Row, Col } from "react-bootstrap";
import Moment from "react-moment";
import "moment/locale/fr";

class FundationDetails extends Component {
  componentDidMount() {
    const { fundationId } = this.props.match.params;
    //if (!sessionStorage.hasOwnProperty("fundations")) {
    this.props.fetchFundations();
    //}
    //if (!sessionStorage.hasOwnProperty("salesLocations")) {
    this.props.fetchSalesLocation(fundationId);
    //}
  }

  render() {
    const { fundationId } = this.props.match.params;
    if (
      this.props.fundations.hasBeenFetched ||
      sessionStorage.hasOwnProperty("fundations")
    ) {
      const fundation = this.props.fundations.data.find(
        item => item.id === parseInt(fundationId)
      );
      return (
        <Container>
          <Row>
            <h1>{fundation.name}</h1>
          </Row>
          <Row>
            <BlockedList fundationId={fundation.id} />
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
  fetchFundations: () => dispatch(getFundations()),
  fetchSalesLocation: fundationId => dispatch(getSalesLocations(fundationId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FundationDetails);
