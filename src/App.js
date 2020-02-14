import React, { Component, Fragment } from "react";
import * as Sentry from "@sentry/browser";
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
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
import SystemHomepage from "./components/views/SystemHomepage";
import "./App.css";
import packagejson from "../package.json";
import heimdalConfig from "./config";
import ComponentWrapper from "./components/ComponentWrapper";

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
});

const apm = initApm(heimdalConfig.APM);

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
  render() {
    const isLoggedIn = localStorage.hasOwnProperty("accessToken");
    const username = isLoggedIn
      ? JSON.parse(localStorage.getItem("accessToken")).username
      : null;
    apm.setUserContext({ username });
    return (
      <Fragment key='App'>
        <div className='App'>
          <Router>
            <ComponentWrapper
              pathSuffix='forbiden'
              exact
              navbar
              component={Forbiden}
            />
            <ComponentWrapper
              pathSuffix='logout'
              exact
              navbar
              component={Logout}
            />
            <ComponentWrapper
              pathSuffix='login'
              exact
              systemAware
              component={Login}
            />
            <ComponentWrapper
              pathSuffix=''
              systemAware
              exact
              navbar
              component={SystemHomepage}
            />
            <ComponentWrapper
              pathSuffix=''
              eventAware
              exact
              navbar
              component={Homepage}
            />
            <ComponentWrapper
              pathSuffix='fundations'
              eventAware
              exact
              navbar
              component={FundationList}
            />
            <ComponentWrapper
              pathSuffix='users'
              exact
              navbar
              eventAware
              component={UserDashboard}
            />
            <ComponentWrapper
              pathSuffix='transferts'
              eventAware
              exact
              navbar
              component={Transferts}
            />
            <ComponentWrapper
              pathSuffix='fundations/:fundationId(\d+)'
              eventAware
              exact
              navbar
              component={FundationDetails}
            />
            <ComponentWrapper
              pathSuffix='dashboard'
              eventAware
              exact
              navbar
              component={Dashboard}
            />
            <ComponentWrapper
              pathSuffix='support'
              eventAware
              exact
              navbar
              component={Support}
            />
          </Router>
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
      </Fragment>
    );
  }
}

export default App;
