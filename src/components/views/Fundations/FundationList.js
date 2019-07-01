import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFundations } from "../../../actions/fetch";
import { Spinner, ListGroup } from "react-bootstrap";
import Fundation from "./Fundation";
import FundationModel from '../../../models/FundationModel';
import "moment/locale/fr";

class FundationList extends Component {
  componentDidMount() {
    if (!sessionStorage.hasOwnProperty("fundations")) {
      this.props.fetchFundations();
    }
  }

  render() {
    let fundationList = [];
    if (this.props.fundations.isLoading) {
      return (
        <Spinner animation='border' role='status' size='sm'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      );
    }

    if (
      this.props.fundations.hasBeenFetched ||
      sessionStorage.hasOwnProperty("fundations")
    ) {
      let fundations = [];
      if (sessionStorage.hasOwnProperty("fundations")) {
        fundations = Object.values(JSON.parse(sessionStorage.fundations).data);
      } else {
        fundations = Object.values(this.props.fundations.data);
        //sessionStorage.fundations = JSON.stringify(fundations);
      }
      fundationList = fundations.map((fundation, index) => (
        <Fundation key={fundation.id} fundation={fundation} />
      ));
      return <ListGroup>{[fundationList]}</ListGroup>;
    }
    if (this.props.fundations.hasErrored) {
      return "Error";
    }
    return "No datas";
  }
}

const mapStateToProps = state => ({
  isLoading: state.connect.loading,
  fundations: state.fundations
});

const mapDispatchToProps = dispatch => ({
  fetchFundations: () => dispatch(getFundations())
});

FundationList.propTypes = {
  fetchFundations: PropTypes.func.isRequired,
  fundations: PropTypes.arrayOf(PropTypes.instanceOf(FundationModel)),
  isLoading: PropTypes.bool
};

FundationList.defaultProps = {
  isLoading: false
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FundationList);
