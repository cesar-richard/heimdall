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
import PosList from "./components/views/PosList";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "./App.css";

class App extends Component {
  renderLogin(props) {
    return (
      <div className='App'>
        <header className='App-header'>
          <Login {...props} />
        </header>
        <span>
          I used to be an engineer like you, then I took an arrow in the knee...
        </span>
        <br />
        <span>&copy;2019 - C.Richard</span>
        <br />
        <span>Version 0.3</span>
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
            path='/'
            exact
            render={props =>
              !isLoggedIn ? this.renderLogin(props) : this.renderLabel(props)
            }
          />
          <Route
            path='/fundations/'
            exact
            render={props =>
              !isLoggedIn ? this.renderLogin(props) : this.renderLabel(props)
            }
          />
          <Route
            path='/fundations/:fundationId'
            exact
            component={FundationDetails}
          />
          <Route
            path='/403'
            exact
            component={Forbiden}
          />
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

  renderLabel() {
    return (
      <div className='App'>
        <div>
          <div>
            <FundationList />
          </div>
          <footer>
            <div>
              <a title='Logout' href='/logout'>
                Logout
              </a>
            </div>
            <div>
              <span>
                I used to be a engineer like you, then I took an arrow in the
                knee...
              </span>
              <br />
              <span>&copy;2019 - C.Richard</span>
              <br />
              <span>Version 0.3</span>
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
