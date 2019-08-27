import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar } from 'react-bootstrap';

export default function MyNavbar() {
  return (
    <Navbar bg='primary' variant='dark'>
      <Navbar.Brand href='/'>Heimdal</Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link href='/fundations'>Fundations</Nav.Link>
        <Nav.Link href='/transferts'>Transferts</Nav.Link>
      </Nav>
    </Navbar>
  );
};
