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
  Button,
  Card,
  Alert,
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

  renderBody(){
    if (this.props.salesLocations.isLoading[this.props.fundationId]){
      return (
        <ListGroup.Item>
          <Spinner animation='border' role='status' size='sm'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        </ListGroup.Item>
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
          {[elementList]}
        </ListGroup>
      ) : (
        <Alert variant='primary'>
          No sales locations !
        </Alert>
      );
    }
    return (
      <Alert variant='danger'>
        Error !
      </Alert>
    );
  }

  render() {
    return(
      <Card className='text-center'>
        <Card.Header>
          <h4>Points de vente</h4>
        </Card.Header>
        {this.renderBody()}
      </Card>);
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
