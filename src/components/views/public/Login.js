import React, { Component } from "react";

import { connect } from "react-redux";
import { createSession } from "../../../actions/sessionActions";
import { getAllMyRightsEvents } from "../../../api/gill/USERRIGHT";
import { getCasUrl } from "../../../api/gill/ROSETTINGS";
import { loginCas2 } from "../../../api/gill/MYACCOUNT";
import { getTicketGrantingTicket, getServiceTicket } from "../../../api/cas";
import {
  Button,
  Form,
  ProgressBar,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { waterfall } from "async";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusMessage: "",
      connectionSteps: 0
    };
    try {
      window.localStorage.removeItem("persist:root");
    } catch (e) {
      //do nothing
    }
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
    let formData = {
      service: "http://heimdal",
      username: this.state.login,
      password: this.state.password
    };

    waterfall(
      [
        callback => {
          this.setState({
            statusMessage: "Getting CAS url ...",
            connectionSteps: 0
          });
          getCasUrl().then(data => callback(null, data), callback);
        },
        (casUrl, callback) => {
          this.setState({
            statusMessage: "Getting CAS Ticket Granting Ticket ...",
            connectionSteps: 1
          });
          getTicketGrantingTicket(
            casUrl,
            formData.username,
            formData.password,
            formData.service
          ).then(data => callback(null, casUrl, data), callback);
        },
        (casUrl, tgt, callback) => {
          this.setState({
            statusMessage: "Getting CAS Service Ticket ...",
            connectionSteps: 2
          });
          getServiceTicket(
            casUrl,
            tgt.data,
            formData.username,
            formData.password,
            formData.service
          ).then(data => callback(null, data), callback);
        },
        (st, callback) => {
          this.setState({
            statusMessage: "Logging into gill ...",
            connectionSteps: 3
          });
          loginCas2(st.data, formData.service).then(
            data => callback(null, data.data),
            callback
          );
        },
        (token, callback) => {
          this.setState({
            statusMessage: "Getting user's permissions ...",
            connectionSteps: 5
          });
          getAllMyRightsEvents(token.sessionid).then(
            data => callback(null, token, data.data),
            callback
          );
        },
        (token, callback) => {
          this.setState({
            statusMessage: "Creating session ...",
            connectionSteps: 6
          });
          this.props.setLoading(false);
          this.props.createSession({
            access_token: token
          });
        }
      ],
      (err, res) => {
        this.setState({ statusMessage: "", connectionSteps: 0 });
        if (err) toast.error(err.message);
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
            type="username"
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

    const now = Math.floor((this.state.connectionSteps / 6) * 100);
    const connectionSteps = (
      <div sm={6}>
        <div>
          <ProgressBar animated now={now} label={`${now}%`} />
        </div>
        <div>{this.state.statusMessage}</div>
      </div>
    );

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col />
            <Col sm={3}>
              <div className="text-center">
                <div className={`block-center mt-xl wd-xl login-body `}>
                  <div className="panel panel-dark panel-flat">
                    <div
                      className="panel-heading text-center"
                      id="login-page-container"
                    >
                      <h1>Heimdal</h1>
                      <div />
                    </div>
                    <div className="panel-body">{loginBody}</div>
                    <br />
                    {this.props.isLoading() ? <h6>{connectionSteps}</h6> : []}
                    <br />
                  </div>
                </div>
              </div>
            </Col>
            <Col />
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: () => state.connect.loading
});

const mapDispatchToProps = dispatch => ({
  createSession: auth => dispatch(createSession(auth))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
