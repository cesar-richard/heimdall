import React, { Component } from "react";
import { connect } from "react-redux";
import { generateAuthState } from "../../../actions/authActions";
import { createSession } from "../../../actions/sessionActions";
import { setLoading } from "../../../actions/connectActions";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import queryString from "query-string";
import axios from "axios";
import { waterfall } from "async";

class Login extends Component {
  constructor(props) {
    super(props);
    //try {
    // delete old token handled by redux's Persist...
    //window.localStorage.removeItem('persist:root');
    //} catch(e) {
    // do nothing
    //}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.props.setLoading(true);
    const SYSTEM_ID = 80405;
    let formData = {
      service: "http://heimdal",
      username: this.state.login,
      password: this.state.password
    };

    waterfall(
      [
        callback => {
          axios({
            url: "https://api.nemopay.net/services/ROSETTINGS/getCasUrl",
            method: "POST",
            params: {
              system_id: SYSTEM_ID
            },
            headers: {
              "Content-Type": "application/json",
              "Nemopay-Version": "2017-12-15"
            }
          }).then(data => callback(null, data));
        },
        (casUrl, callback) => {
          axios({
            url:
              "https://cors-anywhere.herokuapp.com/" +
              casUrl.data +
              "/v1/tickets/",
            method: "POST",
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
              Accept: "text/plain"
            },
            data: queryString.stringify(formData)
          }).then(data => callback(null, casUrl, data));
        },
        (casUrl, tgt, callback) => {
          axios({
            url:
              "https://cors-anywhere.herokuapp.com/" +
              casUrl.data +
              "/v1/tickets/" +
              tgt.data,
            method: "POST",
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
              Accept: "text/plain"
            },
            data: queryString.stringify(formData)
          }).then(data => callback(null, data));
        },
        (st, callback) => {
          axios({
            url: "https://api.nemopay.net/services/MYACCOUNT/loginCas2",
            method: "POST",
            params: {
              system_id: SYSTEM_ID
            },
            headers: {
              "Content-Type": "application/json",
              "Nemopay-Version": "2017-12-15"
            },
            data: {
              ticket: st.data,
              service: formData.service
            }
          }).then(data => callback(null, data));
        },
        (token, callback) => {
          this.props.setLoading(false);
          this.props.generateAuthState();
          this.props.createSession({
            access_token: token.data
          });
        }
      ],
      (err, res) => {
        if (err) console.error(err);
        if (res) console.log(res);
        this.props.setLoading(false);
      }
    );
  }

  render() {
    let loginBody = (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formLogin">
          <Form.Control
            name="login"
            type="login"
            placeholder="Login"
            onChange={this.handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={this.props.isLoading() ? "disabled" : ""}
        >
          {this.props.isLoading() ? "Veuillez patienter..." : "Connexion"}
        </Button>
      </Form>
    );

    return (
      <React.Fragment>
        <div className="text-center">
          <div className={`block-center mt-xl wd-xl login-body `}>
            <div className="panel panel-dark panel-flat">
              <div
                className="panel-heading text-center"
                id="login-page-container"
              >
                <h1>Heimdal</h1>
              </div>
              <div className="panel-body">{loginBody}</div>
              <br />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: () => state.connect.loading,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  setLoading: loading => dispatch(setLoading(loading)),
  createSession: auth => dispatch(createSession(auth)),
  generateAuthState: () => dispatch(generateAuthState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
