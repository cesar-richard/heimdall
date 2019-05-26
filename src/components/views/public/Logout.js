import React, { Component } from "react";
import { connect } from "react-redux";
import { clearSession } from "../../../actions/sessionActions";
import { clearAuthState } from "../../../actions/authActions";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentWillMount() {
    this.props.clearSession();
    this.props.clearAuthState();
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: () => state.connect.loading,
});

const mapDispatchToProps = dispatch => ({
  clearSession: () => dispatch(clearSession()),
  clearAuthState: () => dispatch(clearAuthState()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
