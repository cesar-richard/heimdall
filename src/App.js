import React, { Component } from "react";
import { connect } from "react-redux";
import { clearSession } from "./actions/sessionActions";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import Login from "./components/views/public/Login";
import Logout from "./components/views/public/Logout";
import FundationList from "./components/views/Blocked/FundationList";
import PosList from "./components/views/PosList";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "./App.css";

class App extends Component {
  renderLogin(props) {
    return (
      <div className="App">
        <header className="App-header">
          <Login {...props} />
        </header>
        <span>&copy;2019 - C.Richard</span>
        <br />
        <span>Version 0.1</span>
        <br />
      </div>
    );
  }
  renderMain() {
    const { session } = this.props;
    const isLoggedIn = session && session.access_token;

    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={props =>
              !isLoggedIn ? this.renderLogin(props) : this.renderLabel(props)
            }
          />
          <Route
            path="/blocked/"
            exact
            render={props =>
              !isLoggedIn ? this.renderLogin(props) : this.renderLabel(props)
            }
          />
          <Route
            path="/blocked/:fundationId"
            exact
            render={props => (!isLoggedIn ? this.renderLogin(props) : "Puteuh")}
          />
          <Route
            path="/pos/"
            exact
            render={props =>
              !isLoggedIn ? this.renderLogin(props) : this.renderLabel(props)
            }
          />
          <Route path="/logout" component={Logout} />
        </Switch>
      </Router>
    );
  }

  renderLabel() {
    return (
      <div className="App">
        <h3>
          I used to be a student like you, then I took an arrow in the knee...
        </h3>
        <div>
          <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="blocked">
              <Row>
                <Col sm={1}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="blocked">Blocages</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="pos">Points de vente</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={11}>
                  <Tab.Content>
                    <Tab.Pane eventKey="blocked">
                      <FundationList />
                    </Tab.Pane>
                    <Tab.Pane eventKey="pos">
                      <PosList />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
          <footer>
            <div>
              <a title="Logout" href="/logout">
                Logout
              </a>
            </div>
            <div>
              <span>&copy;2019 - C.Richard</span>
              <br />
              <span>Version 0.1</span>
            </div>
            <br />
          </footer>
        </div>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderMain()}
        <ToastContainer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session
});

const mapDispatchToProps = dispatch => ({
  clearSession: () => dispatch(clearSession())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
