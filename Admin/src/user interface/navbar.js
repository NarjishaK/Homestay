import React from "react";
import { Navbar, Nav, Container, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import logo from "assets/images/logomain.jpg";

function navbar() {
  return (
    <div>
      <div style={{ textAlign: "center", height: "100px" }}>
        <img
          src={logo}
          className="d-inline-block align-top"
          alt="Logo"
          style={{ width: "125px", height: "114px" }}
        />
      </div>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="light"
        style={{ backgroundColor: "#9bdee8", fontFamily: "serif", fontSize: "medium" }}
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">HOME</Nav.Link>
              <Nav.Link href="#about">ABOUT</Nav.Link>
              <Nav.Link href="#about">HOME STAYS</Nav.Link>
              <Nav.Link href="#contact">CONTACT</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#cart">
                <FontAwesomeIcon icon={faShoppingCart} />
              </Nav.Link>
              <Nav.Link href="#profile">
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default navbar;
