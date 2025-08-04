import React from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  Assessment as AssessmentIcon,
  NotificationsActive as NotificationsActiveIcon,
  EventNote as EventNoteIcon,
  FolderShared as FolderSharedIcon,
  BarChart as BarChartIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Componente de tarjeta del dashboard
const DashboardCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'primary',
  onClick 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Paper 
      onClick={onClick}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
      }}
      elevation={3}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          color: theme.palette[color].main,
        }}
      >
        <Icon fontSize={isMobile ? 'medium' : 'large'} />
        <Typography 
          variant={isMobile ? 'subtitle2' : 'h6'} 
          sx={{ 
            ml: 1,
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
      </Box>
      <Typography 
        variant={isMobile ? 'h5' : 'h4'} 
        sx={{ 
          fontWeight: 700,
          color: theme.palette[color].dark,
          mt: 'auto',
          textAlign: 'right',
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
};
const DashboardPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  // Datos de ejemplo para las tarjetas del dashboard
  const stats = [
    { 
      title: 'Proyectos Activos', 
      value: '12', 
      icon: AssignmentIcon, 
      color: 'primary',
      path: '/proyectos'
    },
    { 
      title: 'Usuarios', 
      value: '45', 
      icon: GroupIcon, 
      color: 'secondary',
      path: '/usuarios'
    },
    { 
      title: 'Tareas Pendientes', 
      value: '8', 
      icon: AssessmentIcon, 
      color: 'warning',
      path: '/tareas'
    },
    { 
      title: 'Notificaciones', 
      value: '5', 
      icon: NotificationsActiveIcon, 
      color: 'error',
      path: '/notificaciones'
    },
  ];
  
  // Proyectos recientes
  const recentProjects = [
    { id: 1, name: 'Sistema de Gestión CADS', progress: 75, status: 'En progreso' },
    { id: 2, name: 'Plataforma de Cursos', progress: 30, status: 'En progreso' },
    { id: 3, name: 'Aplicación Móvil', progress: 90, status: 'Finalizando' },
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontWeight: 700,
          color: 'text.primary',
          mb: 4
        }}
      >
        Hola, {currentUser?.name || 'Usuario'}
      </Typography>
      
      <Typography 
        variant="subtitle1" 
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Aquí tienes un resumen de la actividad reciente
      </Typography>
      
      {/* Tarjetas de estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardCard 
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              onClick={() => handleCardClick(stat.path)}
            />
          </Grid>
        ))}
      </Grid>
      
      {/* Sección de proyectos recientes */}
      <Paper 
        sx={{ 
          p: 3, 
          mb: 4,
          borderRadius: 2,
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)'
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Proyectos Recientes
          </Typography>
          <Typography 
            variant="body2" 
            color="primary"
            sx={{ 
              cursor: 'pointer',
              fontWeight: 500,
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
            onClick={() => navigate('/proyectos')}
          >
            Ver todos
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {recentProjects.map((project) => (
            <Grid item xs={12} md={4} key={project.id}>
              <Paper 
                sx={{ 
                  p: 2, 
                  height: '100%',
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  '&:hover': {
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {project.name}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Progreso:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {project.progress}%
                  </Typography>
                </Box>
                <Box sx={{ width: '100%', bgcolor: 'grey.200', borderRadius: 1, mb: 1.5 }}>
                  <Box 
                    sx={{
                      height: 8,
                      width: `${project.progress}%`,
                      bgcolor: 'primary.main',
                      borderRadius: 1,
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    {project.status}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="primary"
                    sx={{ 
                      cursor: 'pointer',
                      fontWeight: 500,
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Ver detalles
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
      
      {/* Otra sección de actividad reciente */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: 2,
              boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Actividad Reciente
            </Typography>
            
            {/* Lista de actividades */}
            <Box>
              {[1, 2, 3].map((item) => (
                <Box 
                  key={item} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start',
                    mb: 2,
                    pb: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': {
                      mb: 0,
                      pb: 0,
                      borderBottom: 'none'
                    }
                  }}
                >
                  <Box 
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.contrastText',
                      mr: 2,
                      flexShrink: 0
                    }}
                  >
                    <EventNoteIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Nueva tarea asignada
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Se te ha asignado una nueva tarea en el proyecto "Sistema de Gestión CADS"
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Hace 2 horas
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: 2,
              boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Próximos Eventos
            </Typography>
            
            {/* Lista de eventos */}
            <Box>
              {[1, 2].map((item) => (
                <Box 
                  key={item} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start',
                    mb: 2,
                    pb: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': {
                      mb: 0,
                      pb: 0,
                      borderBottom: 'none'
                    }
                  }}
                >
                  <Box 
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: 'secondary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'secondary.contrastText',
                      mr: 2,
                      flexShrink: 0
                    }}
                  >
                    <FolderSharedIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Revisión de Proyecto
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Reunión de seguimiento del proyecto "Plataforma de Cursos"
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Mañana, 10:00 AM
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
