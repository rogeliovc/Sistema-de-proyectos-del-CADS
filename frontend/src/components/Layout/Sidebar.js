import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as ProjectIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const menuItems = [
  { text: 'Inicio', icon: <DashboardIcon /> },
  { text: 'Usuarios', icon: <PeopleIcon /> },
  { text: 'Proyectos', icon: <ProjectIcon /> },
  { text: 'Configuración', icon: <SettingsIcon /> }
];

const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5',
          borderRight: '1px solid #e0e0e0'
        },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} sx={{ py: 2, '&:hover': { backgroundColor: '#e3f2fd' } }}>
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
