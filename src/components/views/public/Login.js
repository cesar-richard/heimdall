import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSession } from "../../../actions/sessionActions";
import { getAllMyRightsEvents } from "../../../api/gill/USERRIGHT";
import { getCasUrl } from "../../../api/gill/ROSETTINGS";
import { login2, loginCas2 } from "../../../api/gill/MYACCOUNT";
import { getTicketGrantingTicket, getServiceTicket } from "../../../api/cas";
import {
  Button,
  Form,
  ProgressBar,
  Container,
  Row,
  Col,
  Spinner
} from "react-bootstrap";
import { waterfall } from "async";
import { setLoading } from "../../../actions/connectActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Switch from "react-bootstrap-switch";
import "react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.min.css";
import packagejson from "../../../../package.json";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusMessage: "",
      connectionSteps: 0,
      hasFetchedCas: false,
      casUrl: false,
      useCas: false
    };
    try {
      window.localStorage.removeItem("persist:root");
    } catch (e) {
      //do nothing
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitCas = this.handleSubmitCas.bind(this);
    this.handleSubmitWeez = this.handleSubmitWeez.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSwitch(elem, useCas) {
    this.setState({ useCas });
  }

  componentDidMount() {
    if (!this.state.hasFetchedCas) {
      getCasUrl().then(data => {
        if (data.status === 200) {
          this.setState({ casUrl: data.data, hasFetchedCas: true });
        }
      });
    }
  }

  async handleSubmitWeez(event) {
    event.preventDefault();
    this.props.setLoading(true);
    waterfall(
      [
        callback => {
          this.setState({
            statusMessage: "Logging into gill ...",
            connectionSteps: 0
          });
          login2(this.state.login, this.state.password).then(
            data => callback(null, data.data),
            callback
          );
        },
        (token, callback) => {
          this.setState({
            statusMessage: "Getting user's permissions ...",
            connectionSteps: 1
          });
          getAllMyRightsEvents(token.sessionid).then(
            data => callback(null, token, data.data),
            callback
          );
        },
        (token, callback) => {
          this.setState({
            statusMessage: "Creating session ...",
            connectionSteps: 2
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

  async handleSubmitCas(event) {
    event.preventDefault();
    this.props.setLoading(true);
    let formData = {
      service: "http://heimdal.crichard.fr/login",
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
      <Form
        onSubmit={
          this.state.useCas ? this.handleSubmitCas : this.handleSubmitWeez
        }
      >
        <Form.Group controlId='formLogin'>
          <Form.Control
            name='login'
            type='username'
            placeholder='Login'
            onChange={this.handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId='formPassword'>
          <Form.Control
            name='password'
            type='password'
            placeholder='Password'
            onChange={this.handleChange}
            required
          />
        </Form.Group>
        {this.state.casUrl !== "" ? (
          <Form.Group controlId='formAccountType'>
            <Form.Label>CAS : </Form.Label>
            <Switch
              onChange={(el, state) => this.handleSwitch(el, state)}
              name='accountType'
              animate
              value={this.state.useCas}
            />
          </Form.Group>
        ) : (
          ""
        )}
        <Button
          variant='primary'
          type='submit'
          disabled={this.props.isLoading() ? "disabled" : ""}
        >
          {this.props.isLoading() ? "Veuillez patienter..." : "Connexion"}
        </Button>
      </Form>
    );

    const now = Math.floor(
      (this.state.connectionSteps / (this.state.useCas ? 6 : 2)) * 100
    );
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
              <div className='text-center'>
                <div className={`block-center mt-xl wd-xl login-body `}>
                  <div className='panel panel-dark panel-flat'>
                    <div
                      className='panel-heading text-center'
                      id='login-page-container'
                    >
                      <h1>{packagejson.name}</h1>
                      <div />
                    </div>
                    <div className='panel-body'>
                      {this.state.hasFetchedCas ? (
                        loginBody
                      ) : (
                        <Spinner animation='border' role='status' size='sm'>
                          <span className='sr-only'>Loading...</span>
                        </Spinner>
                      )}
                    </div>
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

Login.propTypes = {
  isLoading: PropTypes.function,
  setLoading: PropTypes.function,
  createSession: PropTypes.function
};

const mapStateToProps = state => ({
  isLoading: () => state.connect.isLoading
});

const mapDispatchToProps = dispatch => ({
  createSession: auth => dispatch(createSession(auth)),
  setLoading: loading => dispatch(setLoading(loading))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
