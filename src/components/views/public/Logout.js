import React, { Component } from "react";
import { connect } from "react-redux";
import { clearSession } from "../../../actions/sessionActions";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentWillMount() {
    this.props.clearSession();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapStateToProps = state => ({
  isLoading: () => state.connect.loading
});

const mapDispatchToProps = dispatch => ({
  clearSession: () => dispatch(clearSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
