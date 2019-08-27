import React from "react";
import PropTypes from "prop-types";
import { Nav, Navbar } from "react-bootstrap";

export default function MyNavbar(props) {
  const { isLoggedIn } = props;
  return (
    <Navbar bg='primary' variant='dark'>
      <Navbar.Brand href='/'>Heimdal</Navbar.Brand>
      {isLoggedIn ? (
        <Nav className='mr-auto'>
          <Nav.Link href='/fundations'>Fundations</Nav.Link>
          <Nav.Link href='/transferts'>Transferts</Nav.Link>
          <Nav.Link href='/logout'>Logout</Nav.Link>
        </Nav>
      ) : (
        <></>
      )}
    </Navbar>
  );
}
