import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const Home = () => {
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getUserRole();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="text-center shadow">
            <Card.Header as="h2">Sistema de Autenticación JWT</Card.Header>
            <Card.Body>
              <Card.Title>Bienvenido a la demostración de JWT</Card.Title>
              <Card.Text>
                Esta aplicación demuestra la implementación de autenticación basada en JWT con Spring Boot y React.
                {isAuthenticated ? (
                  <p className="mt-3">
                    Estás autenticado como: <strong>{userRole}</strong>
                  </p>
                ) : (
                  <p className="mt-3">
                    Por favor, inicia sesión o regístrate para acceder a las funciones protegidas.
                  </p>
                )}
              </Card.Text>
              {!isAuthenticated ? (
                <div className="d-flex justify-content-center gap-2">
                  <Button as={Link} to="/login" variant="primary">Iniciar Sesión</Button>
                  <Button as={Link} to="/register" variant="success">Registrarse</Button>
                </div>
              ) : userRole === 'USER' ? (
                <Button as={Link} to="/user/profile" variant="info">Ir a Mi Perfil</Button>
              ) : (
                <Button as={Link} to="/admin/dashboard" variant="danger">Ir al Panel de Administrador</Button>
              )}
            </Card.Body>
            <Card.Footer className="text-muted">
              JWT Authentication Demo
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;