import React from 'react';
import { 
  Box, 
  Typography, 
  IconButton,
  Avatar,
  createTheme,
  ThemeProvider,
  Button,
  AppBar,
  Toolbar,
  CssBaseline,
  Badge
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom';

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: '#f5f7fa',
  minHeight: '100vh',
  marginLeft: 0,
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#6c5ce7',
    },
    secondary: {
      main: '#a29bfe',
    },
    background: {
      default: '#f5f7fa',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ 
          backgroundColor: '#ffffff',
          color: '#2d3436',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Avatar sx={{ bgcolor: '#6c5ce7', mr: 2, width: 36, height: 36 }}>C</Avatar>
              <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
                CADS
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" sx={{ color: '#636e72' }}>
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Avatar sx={{ width: 36, height: 36, bgcolor: '#6c5ce7' }}>
                  <PersonIcon />
                </Avatar>
                <Typography variant="body2" sx={{ ml: 1, color: '#2d3436', fontWeight: 500 }}>
                  Admin
                </Typography>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        
        <Main>
          <Toolbar />
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#2d3436' }}>
                Panel de Control
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                component={Link} 
                to="/solicitud-proyecto"
                sx={{ 
                  textTransform: 'none',
                  borderRadius: 2,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 6px 10px rgba(0,0,0,0.15)',
                  }
                }}
              >
                Nueva Solicitud de proyecto
              </Button>
            </Box>
            
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#2d3436' }}>
                Bienvenido al Sistema de Gestión de Proyectos CADS
              </Typography>
              <Typography variant="body1" sx={{ color: '#636e72' }}>
                Seleccione una opción del menú para comenzar.
              </Typography>
            </Box>
          </Box>
        </Main>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardPage;
