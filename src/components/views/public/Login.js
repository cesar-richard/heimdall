import React, { Component } from "react";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Switch from "react-bootstrap-switch";
import "react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.min.css";
import packagejson from "../../../../package.json";
import heimdalConfig from "../../../config";


export default function Login(props) {
  const [casUrl, setCasUrl] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const [usingCAS, setUsingCAS] = React.useState(true);
  const [processStep, setProcessStep] = React.useState(0);
  const [statusMessage, setStatusMessage] = React.useState("");
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { system_id } = useParams();
  let navigate = useNavigate();

  React.useEffect(() => {
    getCasUrl(system_id).then(url => {
      setCasUrl(url.data);
    });
  }, [system_id]);
  if (localStorage.hasOwnProperty("accessToken"))
    navigate(`/${system_id}`);

  let handleSubmitWeez = event => {
    event.preventDefault();
    setLoading(true);
    localStorage.removeItem("accessToken");
    waterfall(
      [
        callback => {
          setStatusMessage("Logging into gill ...");
          setProcessStep(0);
          login2(system_id, login, password).then(
            data => callback(null, data.data),
            callback
          );
        },
        (token, callback) => {
          setStatusMessage("Getting user's permissions ...");
          setProcessStep(1);
          getAllMyRightsEvents(system_id, token.sessionid).then(
            data => callback(null, token, data.data),
            callback
          );
        },
        (token, callback) => {
          setStatusMessage("Creating session ...");
          setProcessStep(2);
          setLoading(false);
          localStorage.setItem("accessToken", JSON.stringify(token));
          navigate(`/${system_id}`);
        }
      ],
      (err, res) => {
        setStatusMessage("");
        setProcessStep(0);
        if (err) toast.error(err.message);
        setLoading(false);
      }
    );
  };

  let handleSubmitCas = event => {
    event.preventDefault();
    setLoading(true);
    localStorage.removeItem("accessToken");
    let formData = {
      service: `http://heimdal.crichard.fr/${system_id}`,
      username: login,
      password
    };
    waterfall(
      [
        callback => {
          setStatusMessage("Getting CAS Ticket Granting Ticket ...");
          setProcessStep(1);
          getTicketGrantingTicket(
            casUrl,
            formData.username,
            formData.password,
            formData.service
          ).then(data => callback(null, casUrl, data.data), callback);
        },
        (casUrl, tgt, callback) => {
          setStatusMessage("Getting CAS Service Ticket ...");
          setProcessStep(2);
          getServiceTicket(
            casUrl,
            tgt,
            formData.username,
            formData.password,
            formData.service
          ).then(data => callback(null, data.data), callback);
        },
        (st, callback) => {
          setStatusMessage("Logging into gill ...");
          setProcessStep(3);
          loginCas2(system_id, st, formData.service).then(
            data => callback(null, data.data),
            callback
          );
        },
        (token, callback) => {
          setStatusMessage("Getting user's permissions ...");
          setProcessStep(5);
          getAllMyRightsEvents(system_id, token.sessionid).then(
            data => callback(null, token, data.data),
            callback
          );
        },
        (token, callback) => {
          setStatusMessage("Creating session ...");
          setProcessStep(6);
          //apm.setUserContext({ username: token.username });
          setLoading(false);
          localStorage.setItem("accessToken", JSON.stringify(token));
          navigate(`/${system_id}`);
        }
      ],
      (err, res) => {
        setStatusMessage("");
        setProcessStep(0);
        if (err) toast.error(err.message);
        setLoading(false);
      }
    );
  };

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
                      {null !== casUrl ? (
                        <Form
                          onSubmit={
                            usingCAS ? handleSubmitCas : handleSubmitWeez
                          }
                        >
                          <Form.Group controlId='formLogin'>
                            <Form.Control
                              name='login'
                              type='username'
                              placeholder='Login'
                              onChange={event => setLogin(event.target.value)}
                              required
                            />
                          </Form.Group>

                          <Form.Group controlId='formPassword'>
                            <Form.Control
                              name='password'
                              type='password'
                              placeholder='Password'
                              onChange={event =>
                                setPassword(event.target.value)}
                              required
                            />
                          </Form.Group>
                          {"" !== casUrl ? (
                            <Form.Group controlId='formAccountType'>
                              <Form.Label>CAS : </Form.Label>
                              <Switch
                                onChange={(el, state) => setUsingCAS(state)}
                                name='accountType'
                                animate
                                value={usingCAS}
                              />
                            </Form.Group>
                          ) : null}
                          <Button
                            variant='primary'
                            type='submit'
                            disabled={isLoading ? "disabled" : ""}
                          >
                            {isLoading ? "Veuillez patienter..." : "Connexion"}
                          </Button>
                        </Form>
                      ) : (
                        <Spinner animation='border' role='status' size='sm'>
                          <span className='sr-only'>Loading...</span>
                        </Spinner>
                      )}
                    </div>
                    <br />
                    {isLoading ? (
                      <>
                        <h6>
                          <div sm={6}>
                            <div>
                              <ProgressBar
                                animated
                                now={Math.floor(
                                  (processStep / (usingCAS ? 6 : 2)) * 100
                                )}
                                label={`${Math.floor(
                                  (processStep / (usingCAS ? 6 : 2)) * 100
                                )}%`}
                              />
                            </div>
                            <div>{statusMessage}</div>
                          </div>
                        </h6>
                        <br />
                      </>
                    ) : null}
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
