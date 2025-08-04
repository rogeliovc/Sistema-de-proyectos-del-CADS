import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crear el contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Verificar si hay un usuario autenticado al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Configurar el token por defecto en axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Obtener información del usuario
      const fetchUser = async () => {
        try {
          // Aquí iría la llamada a tu API para obtener la información del usuario
          // const response = await axios.get('/api/auth/me');
          // setCurrentUser(response.data);
        } catch (err) {
          console.error('Error al cargar el usuario:', err);
          // Si hay un error (token inválido, expirado, etc.), limpiar el token
          delete axios.defaults.headers.common['Authorization'];
          localStorage.removeItem('token');
        } finally {
          setLoading(false);
        }
      };
      
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Iniciar sesión
  const login = async (email, password) => {
    try {
      setError('');
      // Simulamos una llamada exitosa
      // En producción, reemplazar con la llamada real a la API
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockUser = {
            id: '1',
            email,
            name: 'Usuario de Prueba',
            role: 'admin'
          };
          const mockToken = 'mock-jwt-token';
          
          // Guardar en el estado
          setCurrentUser(mockUser);
          localStorage.setItem('token', mockToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
          
          resolve({ success: true, user: mockUser });
        }, 1000);
      });
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError(err.response?.data?.message || 'Error al iniciar sesión');
      return { success: false, error: err.response?.data?.message || 'Error al iniciar sesión' };
    }
  };

  // Cerrar sesión
  const logout = () => {
    // Limpiar el estado
    setCurrentUser(null);
    
    // Eliminar el token de localStorage
    localStorage.removeItem('token');
    
    // Eliminar el token de los headers de axios
    delete axios.defaults.headers.common['Authorization'];
    
    return { success: true };
  };

  // Registrar un nuevo usuario
  const register = async (userData) => {
    try {
      setError('');
      // Simulamos una respuesta exitosa
      // En producción, reemplazar con la llamada real a la API
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockUser = {
            id: '1',
            email: userData.email,
            name: userData.nombre || 'Nuevo Usuario',
            role: 'user'
          };
          const mockToken = 'mock-jwt-token';
          
          // Guardar en el estado
          setCurrentUser(mockUser);
          localStorage.setItem('token', mockToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
          
          resolve({ success: true, user: mockUser });
        }, 1000);
      });
    } catch (err) {
      console.error('Error al registrar el usuario:', err);
      setError(err.response?.data?.message || 'Error al registrar el usuario');
      return { success: false, error: err.response?.data?.message || 'Error al registrar el usuario' };
    }
  };

  // Valor del contexto
  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export default AuthContext;
