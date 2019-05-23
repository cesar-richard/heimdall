import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { generateAuthState } from '../../../actions/authActions';
//import { createSession } from '../../../actions/sessionActions';
import { setLoading } from '../../../actions/connectActions';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import queryString from 'query-string';

class Login extends Component {
  constructor(props) {
    super(props);
      //try {
        // delete old token handled by redux's Persist...
        //window.localStorage.removeItem('persist:root');
      //} catch(e) {
        // do nothing
      //}
    this.handleSubmit = this.handleSubmit.bind(this);
  }  
  
  async handleSubmit(event) {
    //event.preventDefault();
    this.props.setLoading(true);
    
    try {
      //let [result] = await getMalcolmAuth(this.props.resourceId, this.state.password);
      const SYSTEM_ID = ***REMOVED***
  let formData = {
    service: "http://heimdal",
    username: "",
    password: "",
  }

  fetch("https://api.nemopay.net/services/ROSETTINGS/getCasUrl?system_id=" + SYSTEM_ID, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Nemopay-Version': '2017-12-15',
      }
    })
    .then(casUrl => {
      casUrl.text().then(casUrlText => {
        casUrlText = casUrlText.replace(/"/g,"");
        fetch(casUrlText + "/v1/tickets/", {
            method: "POST",
            mode: 'no-cors',
            headers: {
              'Content-type': 'application/x-www-form-urlencoded',
              'Accept': 'text/plain'
            },
            body: queryString.stringify(formData)
          })
          .then(response =>
            console.log(response.body)
          )
          .catch(console.error);
      })
    })
    .catch(console.error);
  let [result] = "test";
      if (result && result.length && (typeof result === 'string')) {
        //const [algo, payload, signature] = result.split('.');
        //const decoded = JSON.parse(atob(payload));
        //this.props.dispatch(generateAuthState());
        //this.props.dispatch(createSession({
        //  access_token: result
        //}));
      } else {
        throw new Error('Auth did not return any information');
      }

    } catch (error) {
      let wrongPasswordMessage = 'wrongPasswordMessage';
      let errorTryagain = 'errorTryagain';
      let message = error.status && error.status === 403 ? wrongPasswordMessage : (error.message || errorTryagain);
      console.error(message);
    } finally {
      this.props.setLoading(false);
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
            {this.props.isLoading() ? "Veuillez patienter..." : "Connexion"}
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


const mapStateToProps = (state) => ({
  isLoading: () => state.connect.loading,
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  setLoading: (loading) => dispatch(setLoading(loading))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
