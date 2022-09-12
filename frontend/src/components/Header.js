import React from "react";
import { logout } from "../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        collapseOnSelect
        className="justify-content-between"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Vacunados Kruger</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="ml-auto mr-5">
              {userInfo ? (
                <NavDropdown
                  title={userInfo.userName}
                  id="username"
                  className="user"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Perfil</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Salir
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Inicia Sesion
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title="Administrador"
                  id="adminmenu"
                  className="user"
                >
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Empleados</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/register">
                    <NavDropdown.Item>Registrar empleado</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
