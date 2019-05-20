import React, { Component } from 'react';
import { Field } from 'redux-form';
import isArray from 'lodash/isArray';
import isUndefined from 'lodash/isUndefined'
import { translate } from 'react-i18next';

@translate()
export default class SelectField extends Component {
  render() {
    return (
      <Field {...this.props} component={SelectComponent} />
    );
  }
}

const SelectComponent = (props) => {
  const { input, name, title, placeholder, isLoading, render, showError, t } = props;
  const { valid, touched, error } = props.meta;
  const hasError = (touched && !valid);
  const valueKey = props.valueKey || 'value';
  const data = (!isArray(props.data) ? [] : props.data);
  let displayDefaultValue = props.hasOwnProperty('displayDefaultValue')? props.displayDefaultValue : true;

  return (
    <div className={"form-group" + (hasError ? " has-error" : "")}>
      {title && <label htmlFor={name}>{title}</label>}
      <select {...input} disabled={isLoading} id={name} className="form-control">

          {displayDefaultValue ? <option disabled={true} value="">{placeholder || t('global:selectField_labelSelect')}</option> : null}

        {data.map((v, index) => {
          if (isUndefined(v)) {
            return null
          }
          return (
            <option key={v[valueKey] + index} value={v[valueKey]}>
              {render ? render(v) : v[valueKey]}
            </option>
          )
        })}
      </select>
      {(hasError && error && showError !== false) && <span className="help-block m-b-none">{error}</span>}
    </div>
  );
}
