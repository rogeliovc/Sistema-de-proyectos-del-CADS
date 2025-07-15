import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ onMenuClick }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema de Proyectos CADS
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit">Iniciar Sesión</Button>
          <Button 
            variant="contained" 
            color="secondary" 
            sx={{ 
              backgroundColor: '#ff4081',
              '&:hover': {
                backgroundColor: '#f50057',
              }
            }}
          >
            Registrarse
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;