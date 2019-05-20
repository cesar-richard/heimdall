import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LaddaButton, { XL, EXPAND_RIGHT } from 'react-ladda';

@connect((store, props) => {
  return {
    formState: store.form[props.form] || {}
  }
})
export default class SubmitButton extends Component {
  render() {
    const { style, size } = this.props;
    return (
      <LaddaButton
        className="btn btn btn-primary"
        loading={this.props.formState.submitting}
        type="submit"
        data-size={size || XL}
        data-style={style || EXPAND_RIGHT}
      >
        {this.props.children}
      </LaddaButton>
    );
  }
}

SubmitButton.propTypes = {
  form: PropTypes.string.isRequired
}
