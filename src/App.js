import React, {Component} from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Login from './components/views/public/Login';
import './App.css';

class App extends Component {

  renderLogin(props) {
    return (
      <div className = "App" >
        <header className = "App-header" >
          <Login {...props}/>
        </header>
        <span>&copy;2019 - C.Richard</span>
        <br />
        <span>Version 0.1</span>
        <br />
      </div>
    );
  }
  renderMain() {
    const {auth} = this.props;
    const isLoggedIn = auth && auth.authState;

    if (!isLoggedIn) {
      return (
        <Router>
          <Switch>
            <Route path="/" render={(props) => this.renderLogin(props)} />
          </Switch>
        </Router>
      );
    } else {
      return this.renderLabel();
    }
  }
  

renderLabel(){
  return (
    <div className="App">
    <header className="App-header">
      I used to be a student like you, then I took an arrow in the knee...
    </header>
    <span>&copy;2019 - C.Richard</span>
    <br />
    <span>Version 0.1</span>
    <br />
  </div>)
}

  render() {
    return (
      <React.Fragment>
        {this.renderMain()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
