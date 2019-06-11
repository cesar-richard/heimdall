import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { fundations } from "../../../actions/fetch";
import "moment/locale/fr";

class BlockedList extends Component {
  componentDidMount() {
    this.props.fetchFundations();
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Raison</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Login</th>
            <th>Start</th>
            <th>Stop</th>
            <th>Fondation</th>
          </tr>
        </thead>
        <tbody />
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: () => state.connect.loading,
  blockedPeoples: () => state.connect.blockedPeoples
});

const mapDispatchToProps = dispatch => ({
  fetchFundations: () => dispatch(fundations())
});

BlockedList.propTypes = {
  fetchFundations: PropTypes.function,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockedList);
