import React, { useState, useEffect } from 'react';
import { Container, Card, Alert, Row, Col, Table } from 'react-bootstrap';
import authService from '../services/authService';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Datos simulados para la tabla de usuarios
  const mockUsers = [
    { id: 1, username: 'user1', role: 'USER', lastLogin: '2025-03-20 14:30' },
    { id: 2, username: 'admin1', role: 'ADMIN', lastLogin: '2025-03-23 09:15' },
    { id: 3, username: 'user2', role: 'USER', lastLogin: '2025-03-22 11:45' },
    { id: 4, username: 'user3', role: 'USER', lastLogin: '2025-03-19 16:20' },
  ];

  useEffect(() => {
    const fetchAdminDashboard = async () => {
      try {
        const data = await authService.getAdminDashboard();
        setDashboardData(data);
      } catch (err) {
        console.error('Error fetching admin dashboard:', err);
        setError('No se pudo cargar la información del panel. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDashboard();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <p>Cargando panel de administración...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Panel de Administración</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row>
        <Col md={12} className="mb-4">
          <Card className="shadow">
            <Card.Header as="h5">Mensaje de Bienvenida</Card.Header>
            <Card.Body>
              <p className="lead">{dashboardData}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow text-center">
            <Card.Body>
              <h3>4</h3>
              <p>Total Usuarios</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow text-center bg-info text-white">
            <Card.Body>
              <h3>3</h3>
              <p>Usuarios Activos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow text-center bg-warning text-white">
            <Card.Body>
              <h3>1</h3>
              <p>Administradores</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card className="shadow mb-4">
        <Card.Header as="h5">Lista de Usuarios</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Último Acceso</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>
                    <span className={user.role === 'ADMIN' ? 'text-danger' : 'text-success'}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p className="text-muted">
            <small>Nota: Esta es una tabla con datos simulados para este demo.</small>
          </p>
        </Card.Body>
      </Card>

      <Card className="shadow">
        <Card.Header as="h5">Funcionalidades de Administración</Card.Header>
        <Card.Body>
          <p>Desde este panel podrías:</p>
          <ul>
            <li>Gestionar usuarios (crear, editar, eliminar)</li>
            <li>Asignar roles y permisos</li>
            <li>Monitorear la actividad del sistema</li>
            <li>Configurar parámetros de seguridad</li>
          </ul>
          <p className="text-muted">
            <small>
              Estas funcionalidades son ejemplos y no están implementadas
              completamente en este demo.
            </small>
          </p>
        </Card.Body>
        <Card.Footer className="text-muted text-center">
          Panel de Administrador - JWT Auth Demo
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default AdminDashboard;