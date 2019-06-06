import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllBlocked } from "../../../actions/fetch/blockedActions";
import { Col, Container, Row, ListGroup, Spinner } from "react-bootstrap";

class Fundation extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllBlocked(this.props.fundation.id);
  }

  handleClick() {
    console.log("click!", this.props.fundation.name);
  }

  render() {
    if (this.props.blocked().isLoading[this.props.fundation.id]) {
      return (
        <ListGroup.Item>
          <Container>
            <Row>
              <Col>{this.props.fundation.name}</Col>
              <Col>
                <Spinner animation="border" role="status" size="sm">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </Col>
            </Row>
          </Container>
        </ListGroup.Item>
      );
    }

    if (this.props.blocked().hasBeenFetched[this.props.fundation.id]) {
      const blockedCount = Object.values(
        this.props.blocked().data[this.props.fundation.id].data
      ).length;
      return (
        <ListGroup.Item
          variant={blockedCount > 0 ? "danger" : "info"}
          action
          href={`/blocked/${this.props.fundation.id}`}
        >
          <Container>
            <Row>
              <Col>{this.props.fundation.name}</Col>
              <Col>{blockedCount} blocked</Col>
            </Row>
          </Container>
        </ListGroup.Item>
      );
    }
    if (this.props.blocked().hasErrored[this.props.fundation.id]) {
      return "error";
    }
    return "chelou";
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
  blocked: () => state.blocked
});

const mapDispatchToProps = dispatch => ({
  fetchAllBlocked: fundationId => dispatch(getAllBlocked(fundationId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fundation);
