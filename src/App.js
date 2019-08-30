import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearSession } from "./actions/sessionActions";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  Redirect
} from "react-router-dom";
import Login from "./components/views/public/Login";
import Logout from "./components/views/public/Logout";
import Forbiden from "./components/views/public/Forbiden";
import FundationList from "./components/views/Fundations/FundationList";
import FundationDetails from "./components/views/Fundations/FundationDetails";
import Transferts from "./components/views/tranferts/transferts";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import MyNavbar from "./components/views/navbar";
import Homepage from "./components/views/homepage";
import "./App.css";
import packagejson from "../package.json";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBuilding, faKey, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';

library.add(faBuilding, faKey, faHandHoldingUsd);


class App extends Component {
  renderLogin(props) {
    return (
      <header className='App-header'>
        <Login {...props} />
      </header>
    );
  }
  renderMain() {
    const { session } = this.props;
    const isLoggedIn = session && session.access_token;
    return (
      <Router>
        <Switch>
          <Route
            path='/'
            exact
            render={props =>
              !isLoggedIn ? this.renderLogin(props) : <Homepage />
            }
          />
          <Route
            path='/fundations/'
            exact
            render={props =>
              !isLoggedIn ? this.renderLogin(props) : <FundationList />
            }
          />
          <Route
            path='/transferts/'
            exact
            render={props =>
              !isLoggedIn ? this.renderLogin(props) : <Transferts />
            }
          />
          <Route
            path='/fundations/:fundationId'
            exact
            component={FundationDetails}
          />
          <Route path='/403' exact component={Forbiden} />
          <Route path='/logout' exact component={Logout} />
          <Route
            path='/'
            render={() => {
              return <Redirect to='/' />;
            }}
          />
        </Switch>
      </Router>
    );
  }

  render() {
    const { session } = this.props;
    const isLoggedIn = session && session.access_token;
    const username = isLoggedIn ? session.access_token.username:null;
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
            <span>Version {packagejson.version}</span>
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
  }).isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
