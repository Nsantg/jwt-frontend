import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    country: '',
    role: 'USER' // Por defecto, el rol es USER
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.register(userData);
      console.log('Registration successful:', response);
      
      // Redirigir según el rol
      if (response.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/profile');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Error al registrarse. Intente con otro nombre de usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Header as="h3" className="text-center">Registrarse</Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Elija un nombre de usuario"
                    value={userData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Elija una contraseña"
                    value={userData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstname"
                        placeholder="Ingrese su nombre"
                        value={userData.firstname}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastname"
                        placeholder="Ingrese su apellido"
                        value={userData.lastname}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>País</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    placeholder="Ingrese su país"
                    value={userData.country}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Rol</Form.Label>
                  <Form.Select 
                    name="role" 
                    value={userData.role}
                    onChange={handleChange}
                  >
                    <option value="USER">Usuario</option>
                    <option value="ADMIN">Administrador</option>
                  </Form.Select>
                  <Form.Text className="text-muted">
                    En un entorno real, la asignación de roles debería ser manejada por administradores.
                  </Form.Text>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="success" type="submit" disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrarse'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;