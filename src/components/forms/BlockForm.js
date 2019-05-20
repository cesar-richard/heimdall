import React, { Component } from 'react';
import { reduxForm, Form } from 'redux-form';
import PropTypes from 'prop-types';

@reduxForm({
  form: 'BlockForm'
})
export default class BlockForm extends Component {
  handleFormSubmit(v) {
    const { onSubmit } = this.props;
    if (onSubmit) return onSubmit(v);
  }

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.props.children}
      </Form>
    );
  }
}

BlockForm.propTypes = {
  form: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}
