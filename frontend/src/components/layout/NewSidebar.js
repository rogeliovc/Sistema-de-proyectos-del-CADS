import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  Collapse,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as ProjectIcon,
  Add as AddIcon,
  ListAlt as ListIcon,
  Assessment as ReportIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const menuItems = [
  { 
    text: 'Dashboard', 
    icon: <DashboardIcon />, 
    path: '/dashboard' 
  },
  { 
    text: 'Proyectos', 
    icon: <ProjectIcon />,
    submenu: [
      { text: 'Ver Proyectos', icon: <ListIcon />, path: '/proyectos' },
      { text: 'Seguimiento', icon: <ListIcon />, path: '/seguimiento-proyectos' },
      { text: 'Nueva Solicitud', icon: <AddIcon />, path: '/solicitud-proyecto' },
      { text: 'Mis Proyectos', icon: <ListIcon />, path: '/mis-proyectos' },
      { text: 'Reportes', icon: <ReportIcon />, path: '/reportes-proyectos' },
    ]
  },
  { 
    text: 'Usuarios', 
    icon: <PeopleIcon />, 
    path: '/usuarios' 
  },
];

const NewSidebar = ({ open, onClose, onToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [expanded, setExpanded] = React.useState({});

  const handleExpandClick = (itemText) => {
    setExpanded(prev => ({
      ...prev,
      [itemText]: !prev[itemText]
    }));
  };

  const drawer = (
    <div>
      <DrawerHeader>
        <Typography variant="h6" sx={{ flexGrow: 1, ml: 2, fontWeight: 'bold' }}>
          CADS
        </Typography>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem 
              button 
              onClick={() => {
                if (item.submenu) {
                  handleExpandClick(item.text);
                } else if (isMobile) {
                  onClose();
                }
              }}
              component={item.submenu ? 'div' : RouterLink}
              to={!item.submenu ? item.path : undefined}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {item.submenu && (
                expanded[item.text] ? <ExpandMoreIcon /> : <ChevronRightIcon />
              )}
            </ListItem>
            
            {item.submenu && (
              <Collapse in={expanded[item.text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.submenu.map((subItem) => (
                    <ListItem 
                      button 
                      key={subItem.text} 
                      component={RouterLink} 
                      to={subItem.path}
                      onClick={isMobile ? onClose : undefined}
                      sx={{ pl: 4 }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {subItem.icon}
                      </ListItemIcon>
                      <ListItemText primary={subItem.text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <Box>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
              width: open ? drawerWidth : 72,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: 'hidden',
            },
          }}
          open={open}
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};

export default NewSidebar;
