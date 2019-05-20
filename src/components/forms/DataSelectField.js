import React, { Component } from 'react';
import SelectField from './SelectField';
import isFunction from 'lodash/isFunction';
import isEqual from 'lodash/isEqual';

export default class DataSelectField extends Component {
  render() {
    return (
      <SelectField {...this.props} />
    );
  }
}
