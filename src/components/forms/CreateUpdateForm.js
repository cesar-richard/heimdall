import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import { withRouter } from 'react-router-dom';
import BlockForm from './BlockForm';
import cloneDeep from 'lodash/cloneDeep';
import { translate } from 'react-i18next';
import { toastError, toastSuccess } from 'src/components/commons/Toast/notify';

@connect((store, props) => {
  return { ...store[props.context] }
}, (dispatch, props) => {
  return {
    fetchData: (id) => dispatch(props.read.apply(null, [id, ...(props.readParams || [])])),
    initialize: (formValues) => dispatch(initialize(props.form, formValues))
  }
})
@withRouter
@translate()
export default class CreateUpdateForm extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.fetchData(id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoading, hasBeenFetched, data, onBeforeInitialize } = this.props;
    if (prevProps.isLoading !== isLoading && hasBeenFetched) {
      let formValues = data;
      if (onBeforeInitialize) {
        formValues = onBeforeInitialize(cloneDeep(formValues)) || formValues;
      }
      this.props.initialize(formValues);
    }
  }

  handleFormSubmit(v) {
    const { t, onBeforeSubmit, onSubmissionSuccess, formatSuccess, formatError, toastOnSuccess} = this.props;

    let toastColorOnSuccess = toastSuccess;
    if(toastOnSuccess){
        toastColorOnSuccess = toastOnSuccess;
    }
    const { id } = this.props.match.params;

    let params = null;
    let buyer = null;
    if (onBeforeSubmit) {
      v = onBeforeSubmit(cloneDeep(v)) || v;

      if(v.params){
          params = v.params;
          delete v.params;
      }

      if(v.buyer){
          buyer = v.buyer;
          delete v.buyer;
      }

      if(v.content){
          v = v.content;
      }
    }

    return (
        id
            ?
            (
                params ?
                    ( // Case Update with params
                        buyer ?
                            this.props.update.apply(null, [id, ...(this.props.updateParams || []), v, buyer, params])
                            :
                            this.props.update.apply(null, [id, ...(this.props.updateParams || []), v, params]) //TODO normalement il passe pas ici vu qu'on renvoit tout le temps un buyer
                    )
                    :
                    ( // Case Update without params
                        buyer ?
                            this.props.update.apply(null, [id, ...(this.props.updateParams || []), v, buyer])
                            :
                            this.props.update.apply(null, [id, ...(this.props.updateParams || []), v])
                    )
            )
            :
            (
                params ?
                    ( // Case Create with params
                        buyer ?
                            this.props.create.apply(null, [...(this.props.createParams || []), v, buyer, params])
                            :
                            this.props.create.apply(null, [...(this.props.createParams || []), v, params])
                    )
                    :
                    ( // Case Create without params
                        buyer ?
                            this.props.create.apply(null, [...(this.props.createParams || []), v, buyer])
                            :
                            this.props.create.apply(null, [...(this.props.createParams || []), v])
                    )
            )
    )
      .then((v) => {
        let message = t('global:createUpdateForm_modal_message_success');
        if (formatSuccess) {
          message = formatSuccess();
        }

        if (onSubmissionSuccess) {
          onSubmissionSuccess();
          toastColorOnSuccess(message);
        }
      }).catch((err) => {
        let { message } = err;
        if (formatError) {
          message = formatError(err, message) || message;
        }

        toastError(message);
      });
  }

  render() {
    const { t } = this.props;
    if (this.props.isLoading) {
      return <div>{t('global:createUpdateForm_loading')}</div>
    }

    if (this.props.hasErrored) {
      return <div>{t('global:createUpdateForm_modale_message_error')}</div>
    }
    return (
      <BlockForm
        form={this.props.form}
        validate={this.props.validate}
        initialValues={this.props.initialValues}
        onSubmit={this.handleFormSubmit.bind(this)}
      >
        {this.props.children}
      </BlockForm>
    );
  }
}
