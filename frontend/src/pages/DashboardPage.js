import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  IconButton,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  AppBar,
  Toolbar,
  CssBaseline,
  useTheme,
  useMediaQuery,
  InputBase,
  Badge,
  alpha,
  createTheme,
  ThemeProvider,
  Button
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  AttachMoney as AttachMoneyIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: '#ffffff',
  color: '#2d3436',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
  backgroundColor: '#2d3436',
  color: 'white',
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
  const customTheme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const isMobile = useMediaQuery(customTheme.breakpoints.down('sm'));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // Aquí irá la lógica de cierre de sesión
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarStyled position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ 
                mr: 2, 
                color: '#636e72',
                ...(open && { display: 'none' }) 
              }}
            >
              <MenuIcon />
            </IconButton>
            
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: '#636e72' }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Buscar…"
                inputProps={{ 'aria-label': 'buscar' }}
              />
            </Search>
            
            <Box sx={{ flexGrow: 1 }} />
            
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
        </AppBarStyled>
        
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#2d3436',
              color: 'white',
              border: 'none',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', p: 2 }}>
              <Avatar sx={{ bgcolor: '#6c5ce7', mr: 2, width: 36, height: 36 }}>C</Avatar>
              <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
                CADS
              </Typography>
            </Box>
            <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
              {customTheme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          
          <List sx={{ p: 2 }}>
            <ListItem 
              button 
              selected 
              sx={{
                borderRadius: 2,
                mb: 1,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" primaryTypographyProps={{ fontWeight: 500 }} />
            </ListItem>
            
            <ListItem 
              button 
              sx={{
                borderRadius: 2,
                mb: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }}><PeopleIcon /></ListItemIcon>
              <ListItemText 
                primary="Usuarios" 
                primaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.7)' }} 
              />
            </ListItem>
            
            <ListItem 
              button 
              sx={{
                borderRadius: 2,
                mb: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }}><AssignmentIcon /></ListItemIcon>
              <ListItemText 
                primary="Proyectos" 
                primaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.7)' }} 
              />
            </ListItem>
            
            <ListItem 
              button 
              sx={{
                borderRadius: 2,
                mb: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }}><SettingsIcon /></ListItemIcon>
              <ListItemText 
                primary="Configuración" 
                primaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.7)' }} 
              />
            </ListItem>
          </List>
          
          <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />
          
          <List sx={{ p: 2, mt: 'auto' }}>
            <ListItem 
              button 
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }}><LogoutIcon /></ListItemIcon>
              <ListItemText 
                primary="Cerrar sesión" 
                primaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.7)' }} 
              />
            </ListItem>
          </List>
        </Drawer>
        
        <Main open={open}>
          <DrawerHeader />
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#2d3436' }}>
                Panel de Control
              </Typography>
              <Box>
                <Typography variant="body2" sx={{ color: '#636e72', textAlign: 'right' }}>Bienvenido de nuevo,</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2d3436' }}>Administrador</Typography>
              </Box>
            </Box>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {/* Tarjeta de Usuarios */}
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  borderRadius: 2,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
                  },
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Typography color="textSecondary" gutterBottom sx={{ fontSize: '0.875rem', color: '#636e72' }}>Usuarios</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#2d3436' }}>1,250</Typography>
                        <Typography variant="caption" sx={{ color: '#00b894', display: 'flex', alignItems: 'center' }}>
                          <ArrowUpwardIcon sx={{ fontSize: '1rem', mr: 0.5 }} /> 12% desde el mes pasado
                        </Typography>
                      </div>
                      <Avatar sx={{ bgcolor: '#a8e6cf', width: 48, height: 48 }}>
                        <PeopleIcon sx={{ color: '#00b894' }} />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              {/* Tarjeta de Proyectos */}
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  borderRadius: 2,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
                  },
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Typography color="textSecondary" gutterBottom sx={{ fontSize: '0.875rem', color: '#636e72' }}>Proyectos</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#2d3436' }}>85</Typography>
                        <Typography variant="caption" sx={{ color: '#00b894', display: 'flex', alignItems: 'center' }}>
                          <ArrowUpwardIcon sx={{ fontSize: '1rem', mr: 0.5 }} /> 8% desde el mes pasado
                        </Typography>
                      </div>
                      <Avatar sx={{ bgcolor: '#d8f3dc', width: 48, height: 48 }}>
                        <AssignmentIcon sx={{ color: '#52b788' }} />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              {/* Tarjeta de Tareas */}
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  borderRadius: 2,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
                  },
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Typography color="textSecondary" gutterBottom sx={{ fontSize: '0.875rem', color: '#636e72' }}>Tareas</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#2d3436' }}>432</Typography>
                        <Typography variant="caption" sx={{ color: '#ff7675', display: 'flex', alignItems: 'center' }}>
                          <ArrowDownwardIcon sx={{ fontSize: '1rem', mr: 0.5 }} /> 3% desde la semana pasada
                        </Typography>
                      </div>
                      <Avatar sx={{ bgcolor: '#ffcdd2', width: 48, height: 48 }}>
                        <AssignmentIcon sx={{ color: '#e57373' }} />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              {/* Tarjeta de Ingresos */}
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ 
                  borderRadius: 2,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
                  },
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Typography color="textSecondary" gutterBottom sx={{ fontSize: '0.875rem', color: '#636e72' }}>Ingresos</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#2d3436' }}>$24,780</Typography>
                        <Typography variant="caption" sx={{ color: '#00b894', display: 'flex', alignItems: 'center' }}>
                          <ArrowUpwardIcon sx={{ fontSize: '1rem', mr: 0.5 }} /> 15% desde el mes pasado
                        </Typography>
                      </div>
                      <Avatar sx={{ bgcolor: '#e0f2f1', width: 48, height: 48 }}>
                        <AttachMoneyIcon sx={{ color: '#26a69a' }} />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            {/* Gráfico y Actividad Reciente */}
            <Grid container spacing={3}>
              {/* Gráfico */}
              <Grid item xs={12} md={8}>
                <Paper 
                  sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    height: '100%',
                    minHeight: 400,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#2d3436' }}>Resumen de Actividad</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        sx={{ 
                          textTransform: 'none', 
                          borderRadius: 4, 
                          borderColor: '#dfe6e9',
                          color: '#2d3436',
                          '&:hover': {
                            borderColor: '#b2bec3',
                            backgroundColor: 'transparent',
                          },
                        }}
                      >
                        Mensual
                      </Button>
                      <Button 
                        size="small" 
                        variant="contained" 
                        sx={{ 
                          textTransform: 'none', 
                          borderRadius: 4, 
                          backgroundColor: '#6c5ce7',
                          '&:hover': {
                            backgroundColor: '#5d4aec',
                          },
                        }}
                      >
                        Anual
                      </Button>
                    </Box>
                  </Box>
                  
                  {/* Aquí iría el componente de gráfico */}
                  <Box sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: '#f8f9fa',
                    borderRadius: 2,
                    p: 2,
                  }}>
                    <Typography variant="body2" color="textSecondary">
                      Gráfico de actividad se mostrará aquí
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              
              {/* Actividad Reciente */}
              <Grid item xs={12} md={4}>
                <Paper 
                  sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2d3436', mb: 3 }}>Actividad Reciente</Typography>
                  
                  <List sx={{ flex: 1, overflowY: 'auto', pr: 1, '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-track': { background: '#f1f1f1', borderRadius: '10px' }, '&::-webkit-scrollbar-thumb': { background: '#b2bec3', borderRadius: '10px' } }}>
                    {[
                      { 
                        id: 1, 
                        icon: <PersonIcon sx={{ color: '#6c5ce7' }} />, 
                        primary: 'Nuevo usuario registrado', 
                        secondary: 'Hace 5 minutos',
                        color: '#6c5ce7'
                      },
                      { 
                        id: 2, 
                        icon: <AssignmentIcon sx={{ color: '#00b894' }} />, 
                        primary: 'Nuevo proyecto creado', 
                        secondary: 'Hace 2 horas',
                        color: '#00b894'
                      },
                      { 
                        id: 3, 
                        icon: <AssignmentIcon sx={{ color: '#0984e3' }} />, 
                        primary: 'Tarea completada', 
                        secondary: 'Hace 1 día',
                        color: '#0984e3'
                      },
                      { 
                        id: 4, 
                        icon: <AttachMoneyIcon sx={{ color: '#00cec9' }} />, 
                        primary: 'Pago recibido', 
                        secondary: 'Hace 2 días',
                        color: '#00cec9'
                      },
                      { 
                        id: 5, 
                        icon: <SettingsIcon sx={{ color: '#a29bfe' }} />, 
                        primary: 'Configuración actualizada', 
                        secondary: 'Hace 3 días',
                        color: '#a29bfe'
                      },
                    ].map((item) => (
                      <React.Fragment key={item.id}>
                        <ListItem 
                          alignItems="flex-start"
                          sx={{
                            px: 2,
                            py: 1.5,
                            mb: 1,
                            borderRadius: 2,
                            '&:hover': {
                              backgroundColor: '#f8f9fa',
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={{ color: '#2d3436', fontWeight: 500 }}>
                                {item.primary}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="caption" sx={{ color: '#636e72' }}>
                                {item.secondary}
                              </Typography>
                            }
                          />
                        </ListItem>
                        {item.id < 5 && <Divider component="li" sx={{ my: 1 }} />}
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Main>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardPage;
