import React, {Fragment} from "react";
import {BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from "./components/views/public/Login";
import Logout from "./components/views/public/Logout";
import Forbiden from "./components/views/public/Forbiden";
import FundationList from "./components/views/Fundations/FundationList";
import FundationDetails from "./components/views/Fundations/FundationDetails";
import Transferts from "./components/views/tranferts/transferts";
import Dashboard from "./components/views/dashboard/dashboard";
import {ToastContainer} from "react-toastify";
import Homepage from "./components/views/homepage";
import UserDashboard from "./components/views/users/userDashboard";
import Support from "./components/views/support/support";
import SystemHomepage from "./components/views/SystemHomepage";
import "./App.css";
import packagejson from "../package.json";

import {library} from "@fortawesome/fontawesome-svg-core";
import {
  faAmbulance,
  faBuilding,
  faHandHoldingUsd,
  faKey,
  faSuitcase,
  faTrafficLight,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import {Navigate} from "react-router";

library.add(
    faBuilding,
    faSuitcase,
    faKey,
    faHandHoldingUsd,
    faUser,
    faTrafficLight,
    faAmbulance
);

function App() {
    return (
      <Fragment key='App'>
        <div className='App'>
          <BrowserRouter>
            <Routes>
              <Route path='/' exact element={<Navigate to='/80405/login' />} />
              <Route path=':system_id' exact>
                <Route path='' exact element={<SystemHomepage />} />
                <Route path='login' exact element={<Login />} />
                <Route path=':event_id' exact>
                  <Route path='' exact element={<Homepage />} />
                  <Route path='users' exact element={<UserDashboard />} />
                  <Route path='transferts' exact element={<Transferts />} />
                  <Route path='dashboard' exact element={<Dashboard />} />
                  <Route path='support' exact element={<Support />} />
                  <Route path='fundations' exact>
                    <Route path='' exact element={<FundationList />} />
                    <Route path=':fundationId' exact element={<FundationDetails />} />
                  </Route>
                </Route>
              </Route>
              <Route path='/logout' exact element={<Logout />} />
              <Route path='*' element={<Forbiden />} />
            </Routes>
          </BrowserRouter>
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

export default App;
