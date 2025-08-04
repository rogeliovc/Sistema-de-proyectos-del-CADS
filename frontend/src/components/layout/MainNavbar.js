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
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleNotificationsOpen = (event) => {
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
  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 3,
        sx: {
          width: 250,
          mt: 1,
          borderRadius: 2,
          overflow: 'visible',
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
    >
      <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {currentUser?.name || 'Usuario'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {currentUser?.email || 'usuario@ejemplo.com'}
        </Typography>
      </Box>
      <MenuItem 
        onClick={() => {
          navigate('/perfil');
          handleMenuClose();
        }}
        sx={{ py: 1.5 }}
      >
        <AccountCircleIcon sx={{ mr: 2, color: 'text.secondary' }} />
        <Typography variant="body2">Perfil</Typography>
      </MenuItem>
      <MenuItem 
        onClick={() => {
          navigate('/configuracion');
          handleMenuClose();
        }}
        sx={{ py: 1.5 }}
      >
        <SettingsIcon sx={{ mr: 2, color: 'text.secondary' }} />
        <Typography variant="body2">Configuración</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
        <LogoutIcon sx={{ mr: 2, color: 'error.main' }} />
        <Typography variant="body2" color="error">
          Cerrar sesión
        </Typography>
      </MenuItem>
    </Menu>
  );
  
  const notifications = [
    { id: 1, title: 'Nueva tarea asignada', message: 'Tienes una nueva tarea en el proyecto X', time: 'Hace 2 horas' },
    { id: 2, title: 'Recordatorio', message: 'Reunión de equipo en 15 minutos', time: 'Hace 5 horas' },
    { id: 3, title: 'Actualización', message: 'El proyecto Y ha sido actualizado', time: 'Ayer' },
  ];
  
  const renderNotifications = (
    <Menu
      anchorEl={notificationsAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id="notifications-menu"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isNotificationsOpen}
      onClose={handleNotificationsClose}
      PaperProps={{
        elevation: 3,
        sx: {
          width: 360,
          maxWidth: '100%',
          mt: 1,
          borderRadius: 2,
          overflow: 'hidden',
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
    >
      <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Notificaciones
        </Typography>
        <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
          Marcar todas como leídas
        </Typography>
      </Box>
      <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <MenuItem 
              key={notification.id} 
              sx={{ 
                px: 2, 
                py: 1.5,
                borderBottom: 1, 
                borderColor: 'divider',
                '&:last-child': {
                  borderBottom: 'none',
                },
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {notification.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {notification.message}
                </Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <NotificationsIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              No hay notificaciones nuevas
            </Typography>
          </Box>
        )}
      </Box>
      {notifications.length > 0 && (
        <Box sx={{ p: 1.5, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
          <Typography 
            variant="body2" 
            color="primary" 
            sx={{ 
              cursor: 'pointer',
              fontWeight: 500,
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Ver todas las notificaciones
          </Typography>
        </Box>
      )}
    </Menu>
  );

  return (
    <>
      <Toolbar disableGutters sx={{ px: { xs: 2, md: 3 }, width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
            edge="start"
            sx={{ 
              mr: 2,
              color: 'text.primary',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          
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
              aria-label="show new notifications" 
              color="inherit"
              onClick={handleNotificationsOpen}
              sx={{ color: 'text.primary' }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              ml: 1,
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
            onClick={handleProfileMenuOpen}
          >
            <Avatar 
              alt={currentUser?.name || 'Usuario'} 
              src={currentUser?.avatar}
              sx={{ 
                width: 36, 
                height: 36,
                bgcolor: 'primary.main',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </Avatar>
            {!isMobile && (
              <Box sx={{ ml: 1, textAlign: 'left' }}>
                <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>
                  {currentUser?.name || 'Usuario'}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {currentUser?.role || 'Usuario'}
                </Typography>
              </Box>
            )}
            <ArrowDropDownIcon sx={{ color: 'text.secondary' }} />
          </Box>
        </Box>
      </Toolbar>
      {renderMenu}
      {renderNotifications}
    </>
  );
};

export default MainNavbar;
