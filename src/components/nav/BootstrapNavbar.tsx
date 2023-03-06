import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Navbar, Nav, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../scss/BootstrapNavbar.scss';

/**
 * This is the navbar component that is static across pages
 * and does not need to be rendered on every page.
 * @returns: Navbar Component built with react-bootstrap
 */
export const BootstrapNavbar = () => {

  const [navOpened, setNavOpened] = useState(false);
  const toggleNav = () => setNavOpened(!navOpened);
  
  const handleNavLinkClick = () => setNavOpened(false); // function to handle nav link click

  return (
    <nav>
      <Navbar collapseOnSelect variant='dark' bg='transparent' expand="lg">
        <Navbar.Brand>
          <div className='d-flex'>
            <p>FEATURE FLICKS</p>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle onClick={toggleNav}><FontAwesomeIcon style={{color: '#FEFEFE'}} icon={navOpened ? faXmark : faBars} size='lg'/></Navbar.Toggle>
        <Navbar.Collapse>
          <Nav>
            <NavLink eventKey={1} as={Link} to='/' onClick={handleNavLinkClick}><p className='hover-underline-animation'>Home</p></NavLink>
            <NavLink eventKey={2} as={Link} to='/screenings' onClick={handleNavLinkClick}><p className='hover-underline-animation'>Screenings</p></NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <hr/>
    </nav>
  )
}
