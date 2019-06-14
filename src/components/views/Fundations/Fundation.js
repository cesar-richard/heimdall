import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllBlocked } from "../../../actions/fetch/blockedActions";
import { getSalesLocations } from "../../../actions/fetch/salesLocationsActions";
import { Col, Container, Row, ListGroup, Spinner } from "react-bootstrap";
import FundationModel from "../../../models/FundationModel";
import BlockedModel from "../../../models/BlockedModel";
import SalesLocationModel from "../../../models/SalesLocationModel";

class Fundation extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllBlocked(this.props.fundation.id);
    this.props.fetchSalesLocation(this.props.fundation.id);
  }

  handleClick() {
    console.log("click!", this.props.fundation.name);
  }

  render() {
    if (
      this.props.blocked.isLoading[this.props.fundation.id] &&
      this.props.salesLocations.isLoading[this.props.fundation.id]
    ) {
      return (
        <ListGroup.Item>
          <Container>
            <Row>
              <Col>{this.props.fundation.name}</Col>
              <Col>
                <Spinner animation='border' role='status' size='sm'>
                  <span className='sr-only'>Loading...</span>
                </Spinner>
              </Col>
              <Col>
                <Spinner animation='border' role='status' size='sm'>
                  <span className='sr-only'>Loading...</span>
                </Spinner>
              </Col>
            </Row>
          </Container>
        </ListGroup.Item>
      );
    }

    if (
      this.props.blocked.hasBeenFetched[this.props.fundation.id] ||
      this.props.salesLocations.hasBeenFetched[this.props.fundation.id]
    ) {
      const blockedCount = this.props.blocked.hasBeenFetched[
        this.props.fundation.id
      ]
        ? Object.values(this.props.blocked.data[this.props.fundation.id])
            .length
        : -1;
      let salesLocationsCount = -1;
      let activeSalesLocationsCount = -1;
      if (this.props.salesLocations.hasBeenFetched[this.props.fundation.id]) {
        salesLocationsCount = this.props.salesLocations.data[
          this.props.fundation.id
        ].length;
        activeSalesLocationsCount = this.props.salesLocations.data[
          this.props.fundation.id
        ].filter(item => {
          return item.enabled;
        }).length;
      }
      sessionStorage.blocked = JSON.stringify(this.props.blocked.data);
      return (
        <ListGroup.Item
          variant={blockedCount > 0 ? "danger" : "info"}
          action
          href={`/fundations/${this.props.fundation.id}`}
        >
          <Container>
            <Row>
              <Col>{this.props.fundation.name}</Col>
              <Col>
                {this.props.blocked.hasBeenFetched[this.props.fundation.id] ? (
                  blockedCount + " blocked"
                ) : (
                  <Spinner animation='border' role='status' size='sm'>
                    <span className='sr-only'>Loading...</span>
                  </Spinner>
                )}
              </Col>
              <Col>
                {this.props.salesLocations.hasBeenFetched[
                  this.props.fundation.id
                ] ? (
                  activeSalesLocationsCount === salesLocationsCount &&
                  salesLocationsCount === 0 ? (
                    "No sales locations"
                  ) : (
                    activeSalesLocationsCount +
                    "/" +
                    salesLocationsCount +
                    " active sales locations"
                  )
                ) : (
                  <Spinner animation='border' role='status' size='sm'>
                    <span className='sr-only'>Loading...</span>
                  </Spinner>
                )}
              </Col>
            </Row>
          </Container>
        </ListGroup.Item>
      );
    }
    if (this.props.blocked.hasErrored[this.props.fundation.id]) {
      return <ListGroup.Item variant='primary'>Error</ListGroup.Item>;
    }
    return <ListGroup.Item variant='warning'>Chelou</ListGroup.Item>;
    /*if (this.props.blocked().hasFetched) {
      list = Object.keys(this.props.blockedPeoples).map(key => {
        const blockedOne = this.props.blockedPeoples[key][1];

        return (
          <tr key={key}>
            <td>{blockedOne.blo_raison}</td>
            <td>{blockedOne.usr_firstname}</td>
            <td>{blockedOne.usr_lastname}</td>
            <td>{blockedOne.login}</td>
            <td>
              <Moment format="DD/MM/YYYY HH:mm">{blockedOne.blo_insert}</Moment>
            </td>
            <td>
              <Moment format="DD/MM/YYYY HH:mm">
                {blockedOne.blo_removed}
              </Moment>
            </td>
            <td>{this.props.name}</td>
          </tr>
        );
      });
    }*/
  }
}

const mapStateToProps = state => ({
  blocked: state.blocked,
  salesLocations: state.salesLocations
});

const mapDispatchToProps = dispatch => ({
  fetchAllBlocked: fundationId => dispatch(getAllBlocked(fundationId)),
  fetchSalesLocation: fundationId => dispatch(getSalesLocations(fundationId))
});

Fundation.propTypes = {
  fetchAllBlocked: PropTypes.func,
  fetchSalesLocation: PropTypes.func,
  fundation: PropTypes.instanceOf(FundationModel).isRequired,
  blocked: PropTypes.arrayOf(PropTypes.instanceOf(BlockedModel)),
  salesLocations: PropTypes.arrayOf(PropTypes.instanceOf(SalesLocationModel)),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fundation);
