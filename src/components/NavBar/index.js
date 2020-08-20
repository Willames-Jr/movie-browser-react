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

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Movie App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="#">Pesquisar</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            <Button color = "success" href = "/login">Login</Button>{' '}
            <Button color = "primary">Cadastre-se</Button>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;