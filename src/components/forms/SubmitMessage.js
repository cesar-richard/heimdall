import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';

@connect((store, props) => {
  return {
    formState: store.form[props.form] || {}
  }
})
export default class SubmitMessage extends Component {
  render() {
    const { submitSucceeded, submitFailed, error } = this.props.formState;
    if (!submitSucceeded && !submitFailed) return null;
    const hasSucceeded = (submitSucceeded === true);
    // $("html, body").animate({ scrollTop: 0 }, "slow");
    return (
      <div className={"alert alert-" + (hasSucceeded ? "success" : "danger") + " alert-dismissable"}>
        {/* <button type="button" className="close"><span aria-hidden="true">×</span><span className="sr-only">Close alert</span></button> */}
        {hasSucceeded ? this.props.successText : error}
      </div>
    );
  }
}

SubmitMessage.propTypes = {
  form: PropTypes.string.isRequired,
  successText: PropTypes.string
}
