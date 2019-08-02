import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { fundations } from "../../../actions/fetch";
import { getAllBlocked, unblock } from "../../../actions/fetch/blockedActions";
import BlockedModel from "../../../models/BlockedModel";
import Moment from "react-moment";
import {
  Spinner,
  ListGroup,
  Container,
  Row,
  Col,
  Button,
  Card,
} from "react-bootstrap";
import "moment/locale/fr";

class BlockedList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllBlocked(this.props.fundationId);
  }

  handleClick(e) {
    this.props.unblock(e.target.dataset.bloid, this.props.fundationId);
  }

  renderBody() {
    if (this.props.blocked.isLoading[this.props.fundationId]) {
      return (
        <Spinner animation='border' role='status' size='sm'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      );
    }
    if (this.props.blocked.hasBeenFetched[this.props.fundationId]) {
      let blockedPeoples = this.props.blocked.data[this.props.fundationId];
      let elementList = [];
      blockedPeoples.map(item => {
        elementList.push(
          <ListGroup.Item key={item.blo_id}>
            <Container>
              <Row>
                <Col>{item.usr_firstname} {item.usr_lastname} ({item.login})</Col>
                <Col>{item.blo_raison}</Col>
                <Col>
                  <Moment format='DD/MM/YYYY HH:mm'>{item.blo_insert}</Moment>
                </Col>
                <Col>
                  <Moment format='DD/MM/YYYY HH:mm'>{item.blo_removed}</Moment>
                </Col>
                <Col>
                  <Button
                    variant='success'
                    data-bloid={item.blo_id}
                    onClick={this.handleClick}
                  >
                    Débloquer
                  </Button>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
        );
      });
      return blockedPeoples.length > 0 ? (
        <ListGroup>
          {[elementList]}
        </ListGroup>
      ) : (
        "No datas"
      );
    }
    return "Debug";
  }

  render(){
    return(
      <Card className='text-center'>
        <Card.Header>
          <h4>Blocages</h4>
        </Card.Header>
        {this.renderBody()}
        <Card.Footer>
          FORM ADD
        </Card.Footer>
      </Card>);
  }
}

const mapStateToProps = state => ({
  blocked: state.blocked
});

const mapDispatchToProps = dispatch => ({
  fetchAllBlocked: fundationId => dispatch(getAllBlocked(fundationId)),
  unblock: (bloId, fundationId) => dispatch(unblock(bloId, fundationId))
});

BlockedList.propTypes = {
  fetchAllBlocked: PropTypes.func,
  blocked: PropTypes.arrayOf(PropTypes.instanceOf(BlockedModel)),
  fundationId: PropTypes.number
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockedList);
