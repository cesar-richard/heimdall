import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Nav, Navbar } from "react-bootstrap";
import packagejson from "../../../package.json";

export default function MyNavbar(props) {
  const isLoggedIn = localStorage.hasOwnProperty("accessToken");
  const username = isLoggedIn
    ? JSON.parse(localStorage.getItem("accessToken")).username
    : null;
  const { system_id, event_id } = useParams();
  return (
    <Navbar collapseOnSelect expand='sm' bg='primary' variant='dark'>
      <Navbar.Brand href={`/${system_id}`}>{packagejson.name}</Navbar.Brand>
      {isLoggedIn ? (
        <>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse
            id='responsive-navbar-nav'
            className='justify-content-between'
          >
            <Nav className='mr-auto'>
              {undefined !== event_id ? (
                <>
                  <Nav.Link href={`/${system_id}/${event_id}/fundations`}>
                    Fundations
                  </Nav.Link>
                  <Nav.Link href={`/${system_id}/${event_id}/users`}>
                    Users
                  </Nav.Link>
                  <Nav.Link href={`/${system_id}/${event_id}/transferts`}>
                    Transferts
                  </Nav.Link>
                  <Nav.Link href={`/${system_id}/${event_id}/dashboard`}>
                    Dashboard
                  </Nav.Link>
                  <Nav.Link href={`/${system_id}/${event_id}/support`}>
                    Support
                  </Nav.Link>
                </>
              ) : (
                <></>
              )}
              <Nav.Link href='/logout'>Logout</Nav.Link>
            </Nav>
            <Navbar.Text>
              Signed in as: <a href='#login'>{username}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </>
      ) : (
        <></>
      )}
    </Navbar>
  );
}
