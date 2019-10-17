import React from "react";
import PropTypes from "prop-types";
import { Nav, Navbar } from "react-bootstrap";
import packagejson from "../../../package.json";

export default function MyNavbar(props) {
  const { isLoggedIn, username } = props;
  return (
    <Navbar collapseOnSelect expand='sm' bg='primary' variant='dark'>
      <Navbar.Brand href='/'>{packagejson.name}</Navbar.Brand>
      {isLoggedIn ? (
        <>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse
            id='responsive-navbar-nav'
            className='justify-content-between'
          >
            <Nav className='mr-auto'>
              <Nav.Link href='/fundations'>Fundations</Nav.Link>
              <Nav.Link href='/users'>Users</Nav.Link>
              <Nav.Link href='/transferts'>Transferts</Nav.Link>
              <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
              <Nav.Link href='/support'>Support</Nav.Link>
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
