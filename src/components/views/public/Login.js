import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateAuthState } from '../../../actions/authActions';
import { createSession } from '../../../actions/sessionActions';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Login extends Component {
  constructor(props) {
    super(props);

    let { enterpriseId, agencyId } = this.props.match.params;
    const { resource } = this.props;

    if(resource && resource.uuid &&
      enterpriseId !== resource.uuid && agencyId !== resource.uuid) {
      try {
        // delete old token handled by redux's Persist...
        window.localStorage.removeItem('persist:root');
      } catch(e) {
        // do nothing
      }
    }

    this.state = {
      isLoading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      //let [result] = await getMalcolmAuth(this.props.resourceId, this.state.password);
      let [result] = [];
      if (result && result.length && (typeof result === 'string')) {
        const [algo, payload, signature] = result.split('.');
        const decoded = JSON.parse(atob(payload));
        this.props.dispatch(generateAuthState());
        this.props.dispatch(createSession({
          access_token: result
        }));
      } else {
        throw new Error('Auth did not return any information');
      }

    } catch (error) {
      let wrongPasswordMessage = 'wrongPasswordMessage';
      let errorTryagain = 'errorTryagain';
      let message = error.status && error.status === 403 ? wrongPasswordMessage : (error.message || errorTryagain);
      console.error(message);
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render() {
      let loginBody = (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formLogin">
            <Form.Control type="login" placeholder="Login" />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            {this.state.isLoading ? "Veuillez patienter..." : "Connexion"}
          </Button>
        </Form>
      );

    return (
      <React.Fragment>
        <div className="text-center">
          <div className={`block-center mt-xl wd-xl login-body `}>
            <div className="panel panel-dark panel-flat">
              <div className="panel-heading text-center" id="login-page-container">
                <h1>Heimdal</h1>
              </div>
              <div className="panel-body">
                {loginBody}
              </div>
              <br />
            </div>
            <div>
              
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect((store) => {
  return {
    auth: store.auth
  }
})(Login);
