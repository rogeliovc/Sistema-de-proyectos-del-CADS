import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Box, CircularProgress } from '@mui/material';
import { SnackbarProvider } from 'notistack';

// Pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';
import SolicitudProyectoPage from './pages/SolicitudProyectoPage';

// Components
import MainLayout from './components/layout/MainLayout';

// Theme
import theme from './styles/theme';

// Auth Context
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

// Componente para rutas públicas cuando ya estás autenticado
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider 
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={5000}
      >
        <AuthProvider>
          <Router>
            <Routes>
              <Route 
                path="/" 
                element={
                  <PublicRoute>
                    <HomePage />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/registro" 
                element={
                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <DashboardPage />
                    </MainLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/solicitud-proyecto" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <SolicitudProyectoPage />
                    </MainLayout>
                  </ProtectedRoute>
                } 
              />
              {/* Ruta para manejar cualquier otra ruta no definida */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
