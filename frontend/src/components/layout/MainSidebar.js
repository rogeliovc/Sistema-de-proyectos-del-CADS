import React, { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Collapse,
  useTheme,
  useMediaQuery,
  Tooltip,
  Stack,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as ProjectIcon,
  Task as TaskIcon,
  CalendarToday as CalendarIcon,
  Assessment as ReportIcon,
  Settings as SettingsIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Business as OrganizationIcon,
  GroupAdd as TeamIcon,
  Description as DocumentIcon,
  Notifications as NotificationIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 280;
const collapsedWidth = 72;

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: open ? drawerWidth : collapsedWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  '& .MuiDrawer-paper': {
    width: open ? drawerWidth : collapsedWidth,
    borderRight: 'none',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.action.hover,
      borderRadius: 10,
    },
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 2),
  height: 64,
  minHeight: 64,
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'nested',
})(({ theme, nested }) => ({
  borderRadius: 12,
  margin: theme.spacing(0.5, 1.5),
  padding: theme.spacing(1, 1.5, 1, nested ? 4 : 1.5),
  minHeight: 44,
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.lighter,
    color: theme.palette.primary.main,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.lighter,
    },
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 40,
    color: 'inherit',
    '&.Mui-selected': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiListItemText-primary': {
    fontWeight: 'inherit',
    fontSize: '0.875rem',
  },
  '& .MuiListItemText-root': {
    opacity: 1,
    transition: 'opacity 0.2s',
  },
}));

const menuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
  },
  {
    text: 'Proyectos',
    icon: <ProjectIcon />,
    path: '/proyectos',
    children: [
      { text: 'Todos los proyectos', path: '/proyectos' },
      { text: 'Nuevo proyecto', path: '/proyectos/nuevo' },
      { text: 'Categorías', path: '/proyectos/categorias' },
    ],
  },
  {
    text: 'Tareas',
    icon: <TaskIcon />,
    path: '/tareas',
    children: [
      { text: 'Mis tareas', path: '/tareas/mis-tareas' },
      { text: 'Todas las tareas', path: '/tareas' },
      { text: 'Tablero', path: '/tareas/tablero' },
    ],
  },
  {
    text: 'Equipo',
    icon: <PeopleIcon />,
    path: '/equipo',
  },
  {
    text: 'Clientes',
    icon: <OrganizationIcon />,
    path: '/clientes',
  },
  {
    text: 'Documentos',
    icon: <DocumentIcon />,
    path: '/documentos',
  },
  {
    text: 'Calendario',
    icon: <CalendarIcon />,
    path: '/calendario',
  },
  {
    text: 'Reportes',
    icon: <ReportIcon />,
    path: '/reportes',
  },
  {
    text: 'Configuración',
    icon: <SettingsIcon />,
    path: '/configuracion',
  },
];

const MainSidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expandedItems, setExpandedItems] = useState({});
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleToggleExpand = (text) => {
    setExpandedItems((prev) => ({
      ...prev,
      [text]: !prev[text],
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderMenuItems = (items, isNested = false) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isItemActive = isActive(item.path);
      const isExpanded = expandedItems[item.text];

      return (
        <React.Fragment key={item.path}>
          <Tooltip title={!open && !isNested ? item.text : ''} placement="right">
            <StyledListItemButton
              selected={isItemActive}
              nested={isNested ? 1 : 0}
              onClick={() => {
                if (isMobile) onClose();
                if (hasChildren) {
                  handleToggleExpand(item.text);
                } else {
                  navigate(item.path);
                }
              }}
              sx={{
                pl: isNested ? 4 : 2,
                '&:hover': {
                  backgroundColor: isItemActive 
                    ? theme.palette.primary.lighter 
                    : theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{
                  opacity: open ? 1 : 0,
                  transition: 'opacity 0.2s',
                }}
              />
              {hasChildren && (
                <Box sx={{ opacity: open ? 1 : 0, transition: 'opacity 0.2s' }}>
                  {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Box>
              )}
            </StyledListItemButton>
          </Tooltip>
          
          {hasChildren && (
            <Collapse 
              in={isExpanded && open} 
              timeout="auto" 
              unmountOnExit
              sx={{
                '& .MuiCollapse-wrapperInner': {
                  pl: 1,
                },
              }}
            >
              <List component="div" disablePadding>
                {renderMenuItems(item.children, true)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <DrawerHeader>
        <Box 
          component={RouterLink} 
          to="/dashboard" 
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <Box
            component="img"
            src="/logo-icon.png"
            alt="Logo"
            sx={{ 
              height: 32, 
              mr: open ? 1 : 0,
              transition: 'margin 0.2s',
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              opacity: open ? 1 : 0,
              transition: 'opacity 0.2s',
              width: open ? 'auto' : 0,
              overflow: 'hidden',
            }}
          >
            CADS
          </Typography>
        </Box>
        {!isMobile && (
          <IconButton 
            onClick={onClose} 
            size="small"
            sx={{
              backgroundColor: theme.palette.action.hover,
              '&:hover': {
                backgroundColor: theme.palette.action.selected,
              },
            }}
          >
            {open ? (
              <ChevronLeftIcon fontSize="small" />
            ) : (
              <ChevronRightIcon fontSize="small" />
            )}
          </IconButton>
        )}
      </DrawerHeader>
      
      <Divider />
      
      <Box sx={{ 
        flexGrow: 1, 
        overflowY: 'auto',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.divider,
          borderRadius: '3px',
        },
      }}>
        <List>
          {renderMenuItems(menuItems.filter(item => !item.hidden))}
        </List>
      </Box>
      
      <Box 
        sx={{ 
          p: 2, 
          borderTop: `1px solid ${theme.palette.divider}`,
          opacity: open ? 1 : 0,
          transition: 'opacity 0.2s',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <IconButton size="small" color="inherit">
            <HelpIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="inherit">
            <NotificationIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="inherit" onClick={handleLogout}>
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Stack>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              mr: 1.5,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" noWrap>
              {currentUser?.name || 'Usuario'}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {currentUser?.role || 'Rol'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </StyledDrawer>
  );
};

export default MainSidebar;
