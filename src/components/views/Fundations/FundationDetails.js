import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFundations } from "../../../actions/fetch";
import FundationModel from "../../../models/FundationModel";
import BlockedList from "../blockedPeoples/BlockedList";
import SalesLocationList from "../SalesLocations/SalesLocationList";
import {
  CardGroup,
  Col,
  Container,
  ListGroup,
  Row,
  Spinner
} from "react-bootstrap";
import Moment from "react-moment";
import "moment/locale/fr";

class FundationDetails extends Component {
  componentDidMount() {
    this.props.fetchFundations();
  }

  render() {
    const { fundationId, system_id } = this.props.match.params;
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
  fundations: PropTypes.object,
  match: PropTypes.object
};

const mapStateToProps = state => ({
  fundations: state.fundations,
  salesLocations: state.salesLocations
});

const mapDispatchToProps = dispatch => ({
  fetchFundations: ({ system_id }) => dispatch(getFundations({ system_id }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FundationDetails);
