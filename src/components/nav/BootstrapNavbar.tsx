import React from 'react'
import { Navbar, Nav, NavLink, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../scss/BootstrapNavbar.scss';

export const BootstrapNavbar = () => {
  return (
    <nav>
      <Navbar collapseOnSelect variant='light' bg='transparent' expand="lg">
        <Navbar.Brand>
          <p>FEATURE FLICKS</p>
        </Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Nav className='me-auto'>
            <NavLink eventKey={1} as={Link} to='/home'><p>HOME</p></NavLink>
            <NavLink eventKey={2} as={Link} to='/movies'><p>MOVIES</p></NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <hr/>
    </nav>
  )
}
