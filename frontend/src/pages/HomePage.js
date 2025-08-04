import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  InputAdornment, 
  IconButton, 
  FormControlLabel, 
  Checkbox,
  Alert,
  Container,
  Paper,
  Link
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logo from '../assets/logo-cads.png';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';


const LoginContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#f8f9fa',
  padding: '20px',
});

const LoginForm = styled(Paper)({
  padding: '32px',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
  backgroundColor: '#fff',
});

const FormTitle = styled(Typography)({
  color: '#1a237e',
  fontWeight: '600',
  marginBottom: '24px',
  textAlign: 'center',
  fontSize: '1.5rem',
});

const HomePage = () => {
  const navigate = useNavigate();
  const { login: loginUser, error: authError, loading: authLoading } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // --- LOGOUT ---
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    if (location.state?.from === 'register') {
      setSuccessMessage('¡Registro exitoso! Por favor inicia sesión.');
      
      // Limpiar el mensaje después de 5 segundos
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSuccessMessage('');
    
    // Validación básica
    if (!email || !password) {
      setFormError('Por favor ingresa tu correo y contraseña');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Llamar a la función de login del contexto de autenticación
      const result = await loginUser(email, password);
      
      if (result.success) {
        setSuccessMessage('¡Inicio de sesión exitoso!');
        // Redirigir después de un breve retraso para mostrar el mensaje
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setFormError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: { xs: '40px', md: '80px' },
        width: '100%',
        maxWidth: '1200px',
        padding: '20px',
      }}>
        {/* Logo */}
        <Box sx={{ 
          width: { xs: '100%', md: '50%' },
          maxWidth: '500px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <img 
            src={Logo} 
            alt="Logo CADS" 
            style={{ 
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '300px',
              objectFit: 'contain'
            }} 
          />
        </Box>

        {/* Formulario de inicio de sesión */}
        <Box sx={{ 
          width: { xs: '100%', md: '50%' },
          maxWidth: '450px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <LoginForm elevation={3}>
            <Typography variant="h5" component="h1" sx={{ mb: 3, textAlign: 'center' }}>
              Iniciar Sesión
            </Typography>
            
            {(formError || authError) && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {formError || authError}
              </Alert>
            )}
            {successMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField
                label="Correo Electrónico"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                size="small"
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />
              
              <TextField
                label="Contraseña"
                variant="outlined"
                fullWidth
                margin="normal"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                size="small"
                sx={{ 
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3,
                mt: 1
              }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={rememberMe} 
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                      Recordarme
                    </Typography>
                  }
                  sx={{ margin: 0 }}
                />
                <Link 
                  href="#" 
                  variant="body2" 
                  sx={{ 
                    textDecoration: 'none',
                    color: '#1a73e8',
                    fontSize: '0.875rem',
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Box>
              
              <Button 
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting || authLoading}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.39)',
                }}
              >
                {(isSubmitting || authLoading) ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </Button>
              
              <Typography 
                variant="body2" 
                align="center" 
                sx={{ 
                  mt: 2,
                  color: '#5f6368',
                  fontSize: '0.875rem',
                }}
              >
                ¿No tienes una cuenta?{' '}
                <Link 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/registro');
                  }}
                  sx={{ 
                    textDecoration: 'none',
                    color: '#1a73e8',
                    fontWeight: '500',
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Regístrate
                </Link>
              </Typography>
            </form>
          </LoginForm>
        </Box>
      </Box>
    </LoginContainer>
  );
};

export default HomePage;
