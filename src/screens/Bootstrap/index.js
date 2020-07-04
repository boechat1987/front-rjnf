import React from "react";
import "./styles.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ReactComponent as Logo } from "../../assets/logo.svg";

import "bootstrap/dist/css/bootstrap.min.css";

export default function bootstrapMenu() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <Logo
          alt=""
          width="20"
          height="20"
          className="d-inline-block align-top"
        />
        {/* <Navbar.Text>Malha RJNF</Navbar.Text> */}
        Malha RJNF
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/Signin">Login</Nav.Link>
          <Nav.Link href="/Program">Programação de Técnicos</Nav.Link>
          <Nav.Link href="/Transport">Programação de Carros</Nav.Link>
          <NavDropdown title="Administrativo" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/Register">Cadastrar Usuário</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/Drop">Imputar Programação</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
