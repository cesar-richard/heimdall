import React, { Component } from "react";
import { connect } from "react-redux";
import { clearAuthState } from "./actions/authActions";
import { clearSession } from "./actions/sessionActions";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import Login from "./components/views/public/Login";
import Logout from "./components/views/public/Logout";
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
    const { auth } = this.props;
    const isLoggedIn = auth && auth.authState;

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
          <Route path="/logout" component={Logout} />
        </Switch>
      </Router>
    );
  }

  renderLabel() {
    return (
      <div className="App">
        <header className="App-header">
          I used to be a student like you, then I took an arrow in the knee...
          <a
            title="Logout"
            href="/logout"
            onClick={event => {
              event.preventDefault();
              this.props.clearSession();
              this.props.clearAuthState();
            }}
          >
            Logout
          </a>
        </header>
        <span>&copy;2019 - C.Richard</span>
        <br />
        <span>Version 0.1</span>
        <br />
      </div>
    );
  }

  render() {
    return <React.Fragment>{this.renderMain()}</React.Fragment>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  clearAuthState: () => dispatch(clearAuthState()),
  clearSession: () => dispatch(clearSession())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
