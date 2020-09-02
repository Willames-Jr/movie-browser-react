import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button
} from 'reactstrap';
import './styles.css';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="top">
        <Link to = "/">
          <NavbarBrand>Movie App</NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="#">Search</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            <Link to = "/login">
              <Button color="success">Login</Button>{' '}
            </Link>
            <Link to = "/singin">
              <Button color="primary">Sing In</Button>
            </Link>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div >
  );
}

export default NavBar;