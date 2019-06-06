import React, { Component } from "react";
import { connect } from "react-redux";
import { getFundations } from "../../../actions/fetch";
import { Table, Spinner,ListGroup } from "react-bootstrap";
import Fundation from "./Fundation";
import "moment/locale/fr";

class FundationList extends Component {
  componentDidMount() {
    this.props.fetchFundations();
  }

  render() {
    let fundationList = [];
    if (this.props.fundations().isLoading) {
      return (
        <Spinner animation="border" role="status" size="sm">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    if (this.props.fundations().hasBeenFetched) {
      const fundations = this.props.fundations().data.data;

      fundationList = fundations.map((fundation, index) => (
        <Fundation key={fundation.id} fundation={fundation} />
      ));
      fundationList.push(
        <Fundation key={0} fundation={{ id: 0, name: "System" }} />
      );
      return (
        <ListGroup>
          {[fundationList]}
        </ListGroup>
      );
    }
    if (this.props.fundations().hasErrored) {
      return "Error";
    }
    return "chelou";
  }
}

const mapStateToProps = state => ({
  isLoading: () => state.connect.loading,
  fundations: () => state.fundations
});

const mapDispatchToProps = dispatch => ({
  fetchFundations: () => dispatch(getFundations())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FundationList);
