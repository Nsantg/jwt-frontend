import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import authService from '../services/authService';

const NavigationBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getUserRole();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">JWT Auth Demo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {isAuthenticated ? (
              <>
                {userRole === 'USER' && (
                  <Nav.Link as={Link} to="/user/profile">Mi Perfil</Nav.Link>
                )}
                {userRole === 'ADMIN' && (
                  <Nav.Link as={Link} to="/admin/dashboard">Panel Admin</Nav.Link>
                )}
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Registro</Nav.Link>
              </>
            )}
          </Nav>
          {isAuthenticated && (
            <Button variant="outline-light" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;