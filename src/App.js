import React, { Component } from "react";
import * as Sentry from "@sentry/browser";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearSession } from "./actions/sessionActions";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  withRouter
} from "react-router-dom";
import Login from "./components/views/public/Login";
import Logout from "./components/views/public/Logout";
import Forbiden from "./components/views/public/Forbiden";
import FundationList from "./components/views/Fundations/FundationList";
import FundationDetails from "./components/views/Fundations/FundationDetails";
import Transferts from "./components/views/tranferts/transferts";
import Dashboard from "./components/views/dashboard/dashboard";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import MyNavbar from "./components/views/navbar";
import Homepage from "./components/views/homepage";
import { init as initApm } from "@elastic/apm-rum";
import { ApmRoute } from "@elastic/apm-rum-react";
import UserDashboard from "./components/views/users/userDashboard";
import Support from "./components/views/support/support";
import "./App.css";
import packagejson from "../package.json";
import heimdalConfig from "./config";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAmbulance,
  faBuilding,
  faHandHoldingUsd,
  faKey,
  faSuitcase,
  faTrafficLight,
  faUser
} from "@fortawesome/free-solid-svg-icons";

Sentry.init({
  dsn: heimdalConfig.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: `${packagejson.name}@${packagejson.version}`
});

Sentry.configureScope(function(scope) {
  scope.setTag("NEMOPAY_VERSION", heimdalConfig.NEMOPAY_VERSION);
  scope.setTag("EVENT_ID", heimdalConfig.EVENT_ID);
});

const apm = initApm({
  serviceName: packagejson.name,
  serverUrl: "http://apm.crichard.fr",
  serviceVersion: packagejson.version,
  environment: process.env.NODE_ENV
});

library.add(
  faBuilding,
  faSuitcase,
  faKey,
  faHandHoldingUsd,
  faUser,
  faTrafficLight,
  faAmbulance
);

class App extends Component {
  renderMain() {
    const { session } = this.props;
    const isLoggedIn = session && session.access_token;
    if (session && !isLoggedIn) {
      console.log("clear");
      clearSession();
    }
    return (
      <Router>
        <Switch>
          <ApmRoute path='/:system_id/login' exact component={Login} />
          <ApmRoute
            path='/:system_id'
            exact
            session={session}
            component={Homepage}
          />
          <ApmRoute
            session={session}
            path='/:system_id/fundations'
            exact
            component={FundationList}
          />
          <ApmRoute
            session={session}
            path='/:system_id/users'
            exact
            component={UserDashboard}
          />
          <ApmRoute
            session={session}
            path='/:system_id/transferts'
            exact
            component={Transferts}
          />
          <ApmRoute
            session={session}
            path='/:system_id/fundations/:fundationId'
            exact
            component={FundationDetails}
          />
          <ApmRoute
            session={session}
            path='/:system_id/dashboard'
            exact
            component={Dashboard}
          />
          <ApmRoute
            path='/:system_id/support'
            session={session}
            exact
            component={Support}
          />
          <ApmRoute path='/403' session={session} exact component={Forbiden} />
          <ApmRoute path='/logout' session={session} exact component={Logout} />
        </Switch>
      </Router>
    );
  }

  render() {
    const { session } = this.props;
    const isLoggedIn = session && session.access_token;
    const username = isLoggedIn ? session.access_token.username : null;
    apm.setUserContext({ username });
    return (
      <React.Fragment>
        <MyNavbar isLoggedIn={isLoggedIn} username={username} />
        <div className='App'>
          {this.renderMain()}
          <ToastContainer />
          <footer className='text-center'>
            <span>
              I used to be a engineer like you, then I took an arrow in the
              knee...
            </span>
            <br />
            <span>&copy;{new Date().getFullYear()} - C.Richard</span>
            <br />
            <span>
              {packagejson.name}@{packagejson.version}
            </span>
          </footer>
        </div>
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

App.propTypes = {
  session: PropTypes.shape({
    access_token: PropTypes.object
  })
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
