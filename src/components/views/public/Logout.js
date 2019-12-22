import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearSession } from "../../../actions/sessionActions";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentWillMount() {
    this.props.clearSession();
  }

  render() {
    sessionStorage.clear();
    return <Redirect to={`/${this.props.match.params.system_id}/login`} />;
  }
}

const mapStateToProps = state => ({
  isLoading: () => state.connect.loading
});

const mapDispatchToProps = dispatch => ({
  clearSession: () => dispatch(clearSession())
});

Logout.propTypes = {
  clearSession: PropTypes.function
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
