import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllMyRightsEvents } from "../../../api/gill/USERRIGHT";
import { getCasUrl } from "../../../api/gill/ROSETTINGS";
import { login2, loginCas2 } from "../../../api/gill/MYACCOUNT";
import { getServiceTicket, getTicketGrantingTicket } from "../../../api/cas";
import {
  Button,
  Col,
  Container,
  Form,
  ProgressBar,
  Row,
  Spinner
} from "react-bootstrap";
import { waterfall } from "async";
import { setLoading } from "../../../actions/connectActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Switch from "react-bootstrap-switch";
import "react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.min.css";
import packagejson from "../../../../package.json";
import { Redirect } from "react-router-dom";
import { init as initApm } from "@elastic/apm-rum";
import heimdalConfig from "../../../config";

const apm = initApm(heimdalConfig.APM);

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
      getCasUrl(this.props.match.params.system_id).then(data => {
        if (200 === data.status) {
          this.setState({ casUrl: data.data, hasFetchedCas: true });
        }
      });
    }
  }

  async handleSubmitWeez(event) {
    event.preventDefault();
    this.props.setLoading(true);
    localStorage.removeItem("accessToken");
    waterfall(
      [
        callback => {
          this.setState({
            statusMessage: "Logging into gill ...",
            connectionSteps: 0
          });
          login2(
            this.props.match.params.system_id,
            this.state.login,
            this.state.password
          ).then(data => callback(null, data.data), callback);
        },
        (token, callback) => {
          this.setState({
            statusMessage: "Getting user's permissions ...",
            connectionSteps: 1
          });
          getAllMyRightsEvents(
            this.props.match.params.system_id,
            token.sessionid
          ).then(data => callback(null, token, data.data), callback);
        },
        (token, callback) => {
          this.setState({
            statusMessage: "Creating session ...",
            connectionSteps: 2
          });
          apm.setUserContext({ username: token.username });
          this.props.setLoading(false);
          localStorage.setItem("accessToken", JSON.stringify(token));
          window.location = `/${this.props.match.params.system_id}`;
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
    localStorage.removeItem("accessToken");
    let formData = {
      service: `http://heimdal.crichard.fr/${this.props.match.params.system_id}`,
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
          getCasUrl(this.props.match.params.system_id).then(
            data => callback(null, data),
            callback
          );
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
          loginCas2(
            this.props.match.params.system_id,
            st.data,
            formData.service
          ).then(data => callback(null, data.data), callback);
        },
        (token, callback) => {
          this.setState({
            statusMessage: "Getting user's permissions ...",
            connectionSteps: 5
          });
          getAllMyRightsEvents(
            this.props.match.params.system_id,
            token.sessionid
          ).then(data => callback(null, token, data.data), callback);
        },
        (token, callback) => {
          this.setState({
            statusMessage: "Creating session ...",
            connectionSteps: 6
          });
          apm.setUserContext({ username: token.username });
          this.props.setLoading(false);
          localStorage.setItem("accessToken", JSON.stringify(token));
          window.location = `/${this.props.match.params.system_id}`;
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
        {"" !== this.state.casUrl ? (
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
          <></>
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
      <header className='App-header'>
        <React.Fragment key='Login'>
          <Container>
            <Row>
              <Col />
              <Col sm={3}>
                <div className='text-center'>
                  <div className='block-center mt-xl wd-xl login-body'>
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
      </header>
    );
  }
}

Login.propTypes = {};

const mapStateToProps = state => ({
  isLoading: () => state.connect.isLoading
});

const mapDispatchToProps = dispatch => ({
  setLoading: loading => dispatch(setLoading(loading))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
