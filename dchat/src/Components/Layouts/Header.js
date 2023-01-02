import React, { useState } from "react";
import { Navbar, Nav, Container, Figure } from "react-bootstrap";
import classes from "./Header.module.css";
import logo from "./smallLogo.png";
import { useSelector } from "react-redux";

const Header = (props) => {
  const localUser = localStorage.getItem("loggedInUser")
  const storedUser = JSON.parse(localUser);
  // const isUserLoggedIn = useSelector(
  //   (state) => state.users.user
  // );
  // const isPasswordMatched = useSelector(
  //   (state) => state.users.isPasswordMatched
  // );
  return (
    <Navbar
      className={`${classes.header} ${
        !storedUser ? classes.modalOverlay : ""
      }`}
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="/" style={{ marginBottom: "-16px" }}>
          <Figure>
            <Figure.Image width={50} height={50} alt="171x180" src={logo} onClick={() => {
                props.handleNavItems("home")

              }} />
          </Figure>
        </Navbar.Brand>

        <Navbar.Brand className={classes.heading} href="/" onClick={() => {
                props.handleNavItems("home")

              }}>
          D CHAT
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            
            <Nav.Link
              onClick={() => {
                props.handleNavItems("people")
               
              }}
              className={classes.navItem}
              href="#people"
            >
              People
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                props.handleNavItems("profile")
              }}
              className={classes.navItem}
              href="#profile"
            >
              Profile
            </Nav.Link>
            <Nav.Link 
              onClick={() => {
                localStorage.removeItem("loggedInUser")

              }}
              className={classes.navItem}
              href="/"
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
