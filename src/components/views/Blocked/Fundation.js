import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllBlocked } from "../../../actions/fetch/blockedActions";
import { Spinner } from "react-bootstrap";

class Fundation extends Component {
  componentDidMount() {
    this.props.fetchAllBlocked(this.props.fundation.id);
  }

  render() {
    if (this.props.blocked().isLoading[this.props.fundation.id]) {
      return (
        <tr>
          <td sm={11}>{this.props.fundation.name}</td>
          <td>
            <Spinner animation="border" role="status" size="sm">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </td>
        </tr>
      );
    }

    if (this.props.blocked().hasBeenFetched[this.props.fundation.id]) {
      const blockedCount = Object.values(
        this.props.blocked().data[this.props.fundation.id].data
      ).length;
      return (
        <tr className={blockedCount > 0 ? "table-danger" : "table-info"}>
          <td>{this.props.fundation.name}</td>
          <td>{blockedCount}</td>
        </tr>
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
