import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { fundations } from "../../../actions/fetch";
import Moment from 'react-moment';
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
