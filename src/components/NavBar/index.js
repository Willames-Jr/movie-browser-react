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

  const showAvatar = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token) {
      return (
        <div>
          <NavbarText id="user-icon">
            <Link to = "/dashboard" style = {{textDecoration: "none"}}>
              <img src={user.avatar} className = "avatar-icon" alt = "user avatar" />
              <b id = "user-name">{user.name}</b>
            </Link><br/>
            <Link to="/logout">
              <Button id = "logout-button" color="danger">Logout</Button>
            </Link>
          </NavbarText>

        </div>
      );
    }
    return (
      <NavbarText>
        <Link to="/login">
          <Button color="success" className = "mr-2">Login</Button>
        </Link>
        <Link to="/singin">
          <Button color="primary">Sing In</Button>
        </Link>
      </NavbarText>
    );
  }

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md" fixed="top" >
        <Link to="/">
          <NavbarBrand>
            <h3><i className="fa fa-film mr-2"></i>Movie App</h3>
          </NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="#"><h5>Reviews</h5></NavLink>
            </NavItem>
          </Nav>
          {showAvatar()}
        </Collapse>
      </Navbar>
    </div >
  );
}

export default NavBar;