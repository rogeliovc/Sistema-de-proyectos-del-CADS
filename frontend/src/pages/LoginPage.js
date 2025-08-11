import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper, 
  Link, 
  Divider, 
  InputAdornment, 
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Lock as LockIcon, 
  Visibility, 
  VisibilityOff,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('No se pudo iniciar sesión. Verifica tus credenciales.');
      console.error('Error al iniciar sesión:', err);
    }
    
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
        py: 8,
      }}
    >
      <Container maxWidth="sm">
        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2, color: 'white' }}
        >
          Volver al inicio
        </Button>
        
        <Paper 
          elevation={6} 
          sx={{ 
            p: isMobile ? 3 : 5, 
            borderRadius: 4,
            background: 'white',
          }}
        >
          <Box textAlign="center" mb={4}>
            <Box 
              sx={{
                width: 80,
                height: 80,
                margin: '0 auto 16px',
                borderRadius: '50%',
                backgroundColor: theme.palette.primary.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <LockIcon fontSize="large" />
            </Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Iniciar Sesión
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Ingresa tus credenciales para acceder al sistema
            </Typography>
          </Box>

          {error && (
            <Box 
              sx={{ 
                backgroundColor: theme.palette.error.light, 
                color: theme.palette.error.contrastText,
                p: 2,
                borderRadius: 2,
                mb: 3,
                textAlign: 'center',
              }}
            >
              {error}
            </Box>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 1 }}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Link 
                component={RouterLink} 
                to="/recuperar-contrasena" 
                variant="body2"
                sx={{ textDecoration: 'none' }}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                mt: 2,
                mb: 3,
              }}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
            
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                O
              </Typography>
            </Divider>
            
            <Box textAlign="center" mt={3}>
              <Typography variant="body2" color="text.secondary">
                ¿No tienes una cuenta?{' '}
                <Link 
                  component={RouterLink} 
                  to="/registro" 
                  variant="body2"
                  sx={{ fontWeight: 'bold', textDecoration: 'none' }}
                >
                  Regístrate
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
        
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="white">
            © {new Date().getFullYear()} CADS UDG. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
