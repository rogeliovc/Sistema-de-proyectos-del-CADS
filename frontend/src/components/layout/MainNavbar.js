import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Badge, 
  Box, 
  Avatar, 
  Menu, 
  MenuItem, 
  Tooltip,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const MainNavbar = ({ onMenuClick, open }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  
  const isMenuOpen = Boolean(anchorEl);
  const isNotificationsOpen = Boolean(notificationsAnchorEl);
  
  const handleProfileMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleNotificationsOpen = (event) => {
    event.stopPropagation();
    setNotificationsAnchorEl(event.currentTarget);
  };
  
  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
    handleMenuClose();
  };

  const notifications = [
    { id: 1, text: 'Nueva solicitud de proyecto', time: 'Hace 5 minutos' },
    { id: 2, text: 'Tienes un mensaje sin leer', time: 'Hace 1 hora' },
    { id: 3, text: 'Recordatorio: Reunión a las 3 PM', time: 'Hace 2 horas' },
  ];

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar disableGutters sx={{ 
        px: { xs: 2, md: 3 }, 
        width: '100%',
        position: 'relative',
        zIndex: 1300, // Asegurar que esté por encima de otros elementos
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Box 
            component="button"
            onClick={(e) => {
              console.log('Botón de menú clickeado - Box');
              e.stopPropagation();
              if (onMenuClick) onMenuClick(e);
            }}
            sx={{
              background: 'none',
              border: 'none',
              padding: '8px',
              marginRight: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'inherit',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '50%',
              },
            }}
          >
            <MenuIcon />
          </Box>
          
          <Box 
            component="img"
            src="/logo.png" 
            alt="Logo" 
            sx={{ 
              height: 40, 
              mr: 2,
              display: { xs: 'none', sm: 'block' } 
            }} 
          />
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              display: { xs: 'none', sm: 'block' },
              fontWeight: 700,
              color: 'primary.main',
            }}
          >
            CADS
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Notificaciones">
            <IconButton
              size="large"
              edge="end"
              aria-label="Notificaciones"
              aria-haspopup="true"
              aria-controls={isNotificationsOpen ? 'notifications-menu' : undefined}
              aria-expanded={isNotificationsOpen ? 'true' : undefined}
              id="notifications-button"
              color="inherit"
              onClick={handleNotificationsOpen}
              sx={{ color: 'text.primary' }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <IconButton
            edge="end"
            aria-label="Cuenta de usuario"
            aria-controls={isMenuOpen ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? 'true' : undefined}
            onClick={handleProfileMenuOpen}
            color="inherit"
            sx={{ ml: 1 }}
          >
            <Avatar 
              alt={currentUser?.name || 'Usuario'} 
              src={currentUser?.avatar} 
              sx={{ width: 36, height: 36 }}
            >
              {currentUser?.name?.[0] || <PersonIcon />}
            </Avatar>
            <Box sx={{ ml: 1, display: { xs: 'none', md: 'block' } }}>
              <Typography variant="subtitle2" color="text.primary">
                {currentUser?.name || 'Usuario'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {currentUser?.role || 'Rol no definido'}
              </Typography>
            </Box>
            <ArrowDropDownIcon sx={{ ml: 0.5, color: 'text.secondary' }} />
          </IconButton>
        </Box>
      </Toolbar>
      
      {/* Menú de notificaciones */}
      <Menu
        anchorEl={notificationsAnchorEl}
        id="notifications-menu"
        open={isNotificationsOpen}
        onClose={handleNotificationsClose}
        onClick={handleNotificationsClose}
        PaperProps={{
          elevation: 3,
          sx: {
            width: 360,
            maxWidth: '100%',
            mt: 1.5,
            borderRadius: 2,
            overflow: 'hidden',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Notificaciones
          </Typography>
        </Box>
        
        {notifications.length > 0 ? (
          <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
            {notifications.map((notification) => (
              <MenuItem key={notification.id} onClick={handleNotificationsClose}>
                <Box sx={{ width: '100%' }}>
                  <Typography variant="body2">
                    {notification.text}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Box>
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No hay notificaciones nuevas
            </Typography>
          </Box>
        )}
      </Menu>
      
      {/* Menú de usuario */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isMenuOpen}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            width: 240,
            mt: 1.5,
            borderRadius: 2,
            overflow: 'hidden',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {currentUser?.name || 'Usuario'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentUser?.email || 'usuario@ejemplo.com'}
          </Typography>
        </Box>
        
        <MenuItem onClick={() => navigate('/perfil')}>
          <AccountCircleIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
          <Typography variant="body2">Mi perfil</Typography>
        </MenuItem>
        
        <MenuItem onClick={() => navigate('/configuracion')}>
          <SettingsIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
          <Typography variant="body2">Configuración</Typography>
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
          <Typography variant="body2">Cerrar sesión</Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default MainNavbar;
