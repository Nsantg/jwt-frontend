import React, { useState, useEffect } from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import authService from '../services/authService';

const UserDashboard = () => {
  const [profile, setProfile] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await authService.getUserProfile();
        setProfile(data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('No se pudo cargar la información del perfil. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <p>Cargando perfil de usuario...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Header as="h3" className="text-center">Mi Perfil de Usuario</Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {!error && (
            <div>
              <p className="lead">{profile}</p>
              <hr />
              <p>Este es tu perfil de usuario. Desde aquí podrías:</p>
              <ul>
                <li>Ver y editar tu información personal</li>
                <li>Cambiar tu contraseña</li>
                <li>Gestionar tus preferencias</li>
                <li>Ver tu historial de actividad</li>
              </ul>
              <p className="text-muted">
                <small>
                  Estas funcionalidades son ejemplos y no están implementadas
                  completamente en este demo.
                </small>
              </p>
            </div>
          )}
        </Card.Body>
        <Card.Footer className="text-muted text-center">
          Perfil de Usuario - JWT Auth Demo
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default UserDashboard;