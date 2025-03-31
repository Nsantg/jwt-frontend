import axios from 'axios';

const API_URL = 'https://despliegue-autenticacion.onrender.com';

// Configurar interceptor para incluir el token en las peticiones
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Servicio de autenticación
const authService = {
  // Registro de usuario
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  // Login de usuario
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout de usuario
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  },

  // Obtener el rol del usuario actual
  getUserRole: () => {
    return localStorage.getItem('role');
  },

  // Obtener información del perfil de usuario
  getUserProfile: async () => {
    try {
      const response = await axios.get(`${API_URL}/user/profile`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener información del panel de administración
  getAdminDashboard: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/dashboard`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default authService;