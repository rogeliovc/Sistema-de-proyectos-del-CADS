import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { 
  Box, 
  Drawer, 
  CssBaseline, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  IconButton,
  useMediaQuery
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MainSidebar from './MainSidebar';
import MainNavbar from './MainNavbar';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    [theme.breakpoints.up('md')]: {
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('md')]: {
    width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
    marginLeft: open ? `${drawerWidth}px` : 0,
    ...(open && {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '& .MuiTypography-root': {
    fontWeight: 600,
    fontSize: '1.25rem',
  },
}));

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Cerrar el drawer en móviles al cambiar de ruta
    if (isMobile) {
      setMobileOpen(false);
    } else {
      setOpen(true);
    }
  }, [isMobile]);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  const handleDrawerClose = () => {
    if (isMobile) {
      setMobileOpen(false);
    } else {
      setOpen(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        open={open}
        elevation={0}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <MainNavbar 
          onMenuClick={handleDrawerToggle} 
          open={isMobile ? mobileOpen : open} 
        />
      </AppBar>
      <Box
        component="nav"
        sx={{ 
          width: { md: open ? drawerWidth : 0 },
          flexShrink: { md: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 'none',
              boxShadow: theme.shadows[8],
            },
          }}
        >
          <DrawerHeader>
            <Typography variant="h6" noWrap component="div" sx={{ ml: 2 }}>
              CADS
            </Typography>
            <IconButton onClick={handleDrawerClose} color="inherit">
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <MainSidebar onItemClick={handleDrawerClose} />
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 'none',
              boxShadow: theme.shadows[1],
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <Typography variant="h6" noWrap component="div" sx={{ ml: 2 }}>
              CADS
            </Typography>
            <IconButton onClick={handleDrawerClose} color="inherit">
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <MainSidebar onItemClick={handleDrawerClose} />
        </Drawer>
      </Box>
      <Main open={open}>
        <Toolbar /> {/* Espacio para la AppBar */}
        <Box sx={{ 
          flexGrow: 1, 
          p: { xs: 2, md: 3 },
          backgroundColor: theme.palette.background.default,
          minHeight: 'calc(100vh - 64px)',
        }}>
          {children}
        </Box>
      </Main>
    </Box>
  );
};

export default MainLayout;
