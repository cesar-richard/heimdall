
import React, { Component } from 'react';
import { Field } from 'redux-form';

export default class InputField extends Component {
  render() {
    return (
      <Field {...this.props} component={InputComponent} />
    );
  }
}

const InputComponent = (props) => {
  const { input, type, name, title, placeholder, showError, checked, defaultChecked } = props;
  const { valid, touched, error } = props.meta;
  const hasError = (touched && !valid);

  return (
    <div className={"form-group" + (hasError ? " has-error" : "")}>
      {title && <label htmlFor={name}>{title}</label>}
      <input {...input} id={name} type={type} placeholder={placeholder} checked={checked} defaultChecked={defaultChecked} className="form-control" disabled={props.disabled} />
      {(hasError && error && showError !== false) && <span className="help-block m-b-none">{error}</span>}
    </div>
  );
}
