import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Navbar, Nav, NavLink, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../scss/BootstrapNavbar.scss';

export const BootstrapNavbar = () => {
  return (
    <nav>
      <Navbar collapseOnSelect variant='dark' bg='transparent' expand="lg">
        <Navbar.Brand>
          <p>FEATURE FLICKS<span style={{marginLeft: '20px'}}><FontAwesomeIcon icon={faTicket}/></span></p>
        </Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Nav className='me-auto'>
            <NavLink eventKey={1} as={Link} to='/'><p className='hover-underline-animation'>Home</p></NavLink>
            <NavLink eventKey={2} as={Link} to='/movies'><p className='hover-underline-animation'>Screenings</p></NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <hr/>
    </nav>
  )
}
