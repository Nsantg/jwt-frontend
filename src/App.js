import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Componentes
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

// Servicio de autenticación
import authService from './services/authService';

// Componente para proteger rutas
const ProtectedRoute = ({ element, requiredRole }) => {
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getUserRole();

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene, redirigir a home
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  // Si todo está bien, mostrar el componente
  return element;
};

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rutas protegidas */}
          <Route 
            path="/user/profile" 
            element={<ProtectedRoute element={<UserDashboard />} requiredRole="USER" />} 
          />
          <Route 
            path="/admin/dashboard" 
            element={<ProtectedRoute element={<AdminDashboard />} requiredRole="ADMIN" />} 
          />
          
          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;