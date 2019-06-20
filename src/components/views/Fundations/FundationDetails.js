import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFundations } from "../../../actions/fetch";
import { getAllBlocked } from "../../../actions/fetch/blockedActions";
import { getSalesLocations } from "../../../actions/fetch/salesLocationsActions";
import FundationModel from "../../../models/FundationModel";
import BlockedModel from "../../../models/BlockedModel";
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
    //if (!sessionStorage.hasOwnProperty("blocked")) {
    this.props.fetchAllBlocked(fundationId);
    //}
  }

  render() {
    const { fundationId } = this.props.match.params;
    if (
      this.props.fundations.hasBeenFetched ||
      sessionStorage.hasOwnProperty("fundations")
    ) {
      let elementList = [];
      let fundations = [];
      /*if (sessionStorage.hasOwnProperty("fundations")) {
        fundations = JSON.parse(sessionStorage.fundations);
      } else {*/
      fundations = this.props.fundations.data;
      //  sessionStorage.fundations = JSON.stringify(fundations);
      //}
      if (this.props.blocked.hasBeenFetched[fundationId]) {
        let blockedPeoples = this.props.blocked.data[fundationId];
        const fundation = fundations.filter(
          item => item.id === parseInt(fundationId)
        )[0];
        blockedPeoples.map(item => {
          elementList.push(
            <ListGroup.Item key={item.blo_id}>
              <Container>
                <Row>
                  <Col>{item.usr_firstname}</Col>
                  <Col>{item.usr_lastname}</Col>
                  <Col>{item.login}</Col>
                  <Col>{item.blo_raison}</Col>
                  <Col>
                    <Moment format='DD/MM/YYYY HH:mm'>{item.blo_insert}</Moment>
                  </Col>
                  <Col>
                    <Moment format='DD/MM/YYYY HH:mm'>
                      {item.blo_removed}
                    </Moment>
                  </Col>
                </Row>
              </Container>
            </ListGroup.Item>
          );
        });
        return (
          <Container>
            <Row>{fundation.name}</Row>
            <Row>
              <ListGroup>{[elementList]}</ListGroup>
            </Row>
          </Container>
        );
      }
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
  blocked: PropTypes.arrayOf(PropTypes.instanceOf(BlockedModel)),
  match: PropTypes.object
};

const mapStateToProps = state => ({
  blocked: state.blocked,
  fundations: state.fundations,
  salesLocations: state.salesLocations
});

const mapDispatchToProps = dispatch => ({
  fetchFundations: () => dispatch(getFundations()),
  fetchAllBlocked: fundationId => dispatch(getAllBlocked(fundationId)),
  fetchSalesLocation: fundationId => dispatch(getSalesLocations(fundationId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FundationDetails);
