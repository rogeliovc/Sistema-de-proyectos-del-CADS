import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  LinearProgress,
  Divider,
  Chip
} from '@mui/material';
import { 
  Memory as MemoryIcon,
  Storage as StorageIcon,
  Speed as SpeedIcon,
  Info as InfoIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Category as CategoryIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registrar componentes de Chart.js
ChartJS.register(...registerables);

// Datos de ejemplo para las gráficas
const generateCpuData = () => {
  const labels = [];
  const data = [];
  
  // Generar datos para las últimas 24 horas
  for (let i = 23; i >= 0; i--) {
    const hour = new Date();
    hour.setHours(hour.getHours() - i);
    labels.push(hour.getHours() + ':00');
    // Datos aleatorios para el ejemplo
    data.push(Math.floor(Math.random() * 100));
  }
  
  return { labels, data };
};

// Componente de tarjeta de métricas mejorado
const MetricCard = ({ title, value, icon: Icon, color = 'primary', unit = '', trend = 0 }) => {
  const trendColor = trend > 0 ? 'success.main' : trend < 0 ? 'error.main' : 'text.secondary';
  const trendIcon = trend > 0 ? '↑' : trend < 0 ? '↓' : '→';
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        transition: 'all 0.3s ease',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        borderRadius: '12px',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '12px',
              bgcolor: `${color}.50`,
              color: `${color}.main`,
              mr: 2
            }}
          >
            <Icon />
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
              {title}
            </Typography>
            <Box display="flex" alignItems="flex-end">
              <Typography variant="h5" component="div" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                {value}
              </Typography>
              {unit && (
                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5, mb: 0.25, fontSize: '0.875rem' }}>
                  {unit}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        {trend !== 0 && (
          <Box display="flex" alignItems="center" mt={1}>
            <Typography 
              variant="caption" 
              sx={{ 
                color: trendColor,
                display: 'flex',
                alignItems: 'center',
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
            >
              {trendIcon} {Math.abs(trend)}% vs ayer
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
const DashboardPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Estado para los datos del proyecto
  const [projectData, setProjectData] = useState({
    name: 'Simulación de Dinámica Molecular',
    description: 'Análisis de estructuras moleculares complejas para investigación farmacéutica',
    startDate: '2025-01-15',
    endDate: '2025-12-31',
    status: 'Activo',
    owner: 'Dr. Juan Pérez',
    department: 'Bioquímica',
    cpuAllocated: 256,
    memoryAllocated: 1024,
    storageAllocated: 5000
  });
  
  // Estado para los datos de consumo
  const [usageData, setUsageData] = useState({
    cpu: generateCpuData(),
    memory: 78, // %
    storage: 65, // %
    activeNodes: 12,
    totalNodes: 16
  });
  
  // Configuración de la gráfica de CPU
  const cpuChartData = {
    labels: usageData.cpu.labels,
    datasets: [
      {
        label: 'Uso de CPU (%)',
        data: usageData.cpu.data,
        borderColor: theme.palette.primary.main,
        backgroundColor: `${theme.palette.primary.main}20`,
        tension: 0.4,
        fill: true
      }
    ]
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Uso (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Hora'
        }
      }
    },
    maintainAspectRatio: false
  };
  
  // Actualizar datos cada minuto (solo para demostración)
  useEffect(() => {
    const interval = setInterval(() => {
      const newCpuData = generateCpuData();
      setUsageData(prev => ({
        ...prev,
        cpu: newCpuData,
        memory: Math.min(100, Math.max(0, prev.memory + (Math.random() * 4 - 2))).toFixed(1),
        storage: Math.min(100, Math.max(0, prev.storage + (Math.random() * 2 - 1))).toFixed(1)
      }));
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ 
      p: { xs: 2, md: 3 },
      maxWidth: '1600px',
      mx: 'auto'
    }}>
      <Box sx={{ mb: 5 }}>
        <Box sx={{
          background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)',
          borderRadius: '16px',
          p: { xs: 3, md: 4 },
          mb: 4,
          border: '1px solid rgba(0, 0, 0, 0.03)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
        }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 800,
              color: 'text.primary',
              mb: 1,
              fontSize: { xs: '1.75rem', md: '2.125rem' },
              background: 'linear-gradient(90deg, #3a7bd5 0%, #00d1b2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            Hola, {currentUser?.name || 'Usuario'}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary',
              fontWeight: 400,
              fontSize: '1.1rem',
              mt: 1
            }}
          >
            Panel de control del proyecto: <Box component="span" sx={{ color: 'primary.main', fontWeight: 500 }}>{projectData.name}</Box>
          </Typography>
        </Box>
      </Box>
      
      {/* Tarjetas de métricas mejoradas */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard 
            title="Nodos Activos"
            value={`${usageData.activeNodes}`}
            subtitle={`de ${usageData.totalNodes} nodos`}
            icon={MemoryIcon}
            color="info"
            trend={2.5}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard 
            title="Uso de Memoria"
            value={usageData.memory}
            unit="%"
            icon={StorageIcon}
            color="warning"
            trend={-1.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard 
            title="Almacenamiento"
            value={usageData.storage}
            unit="%"
            icon={StorageIcon}
            color="success"
            trend={0.8}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard 
            title="CPU Asignado"
            value={projectData.cpuAllocated}
            unit="núcleos"
            icon={SpeedIcon}
            color="primary"
            trend={0}
          />
        </Grid>
      </Grid>
      

      
      <Grid container spacing={3}>
        {/* Gráfica de uso de CPU */}
        <Grid item xs={12} lg={8}>
          <Card 
            sx={{ 
              height: '100%',
              borderRadius: '16px',
              boxShadow: '0 4px 20px 0 rgba(0,0,0,0.03)',
              border: '1px solid rgba(0, 0, 0, 0.03)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 10px 25px 0 rgba(0,0,0,0.05)'
              }
            }}
          >
            <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ 
                p: 3, 
                pb: 2, 
                borderBottom: '1px solid rgba(0, 0, 0, 0.03)',
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2
              }}>
                <Box display="flex" alignItems="center">
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    bgcolor: 'primary.50',
                    color: 'primary.main',
                    mr: 2
                  }}>
                    <SpeedIcon />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                      Uso de CPU
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                      Últimas 24 horas
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{
                  display: 'flex',
                  gap: 1,
                  '& .MuiChip-root': {
                    borderRadius: '8px',
                    fontWeight: 500,
                    fontSize: '0.7rem',
                    height: '24px'
                  }
                }}>
                  <Chip label="24h" color="primary" variant="outlined" size="small" />
                  <Chip label="7d" variant="outlined" size="small" />
                  <Chip label="30d" variant="outlined" size="small" />
                </Box>
              </Box>
              <Box sx={{ 
                p: 3, 
                pt: 2, 
                flex: 1,
                minHeight: '300px',
                position: 'relative'
              }}>
                <Line data={cpuChartData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Información del proyecto */}
        <Grid item xs={12} lg={4}>
          <Card 
            sx={{ 
              height: '100%',
              borderRadius: '16px',
              boxShadow: '0 4px 20px 0 rgba(0,0,0,0.03)',
              border: '1px solid rgba(0, 0, 0, 0.03)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 10px 25px 0 rgba(0,0,0,0.05)'
              }
            }}
          >
            <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ 
                p: 3, 
                pb: 2, 
                borderBottom: '1px solid rgba(0, 0, 0, 0.03)'
              }}>
                <Box display="flex" alignItems="center">
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    bgcolor: 'info.50',
                    color: 'info.main',
                    mr: 2
                  }}>
                    <InfoIcon />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Información del Proyecto
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box mb={3}>
                  <Typography variant="h6" fontWeight={700} gutterBottom sx={{ lineHeight: 1.3 }}>
                    {projectData.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      mb: 2,
                      lineHeight: 1.6
                    }}
                  >
                    {projectData.description}
                  </Typography>
                  
                  <Chip 
                    label={projectData.status} 
                    color={projectData.status === 'Activo' ? 'success' : 'default'}
                    size="small"
                    sx={{ 
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      height: '24px',
                      '& .MuiChip-label': { px: 1.5 }
                    }}
                  />
                </Box>
                
                <Box sx={{ 
                  mt: 'auto',
                  '& > div': {
                    display: 'flex',
                    alignItems: 'center',
                    p: 1.5,
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    },
                    '&:not(:last-child)': {
                      mb: 1
                    },
                    '& svg': {
                      color: 'text.secondary',
                      mr: 2,
                      opacity: 0.8
                    },
                    '& .MuiTypography-body2': {
                      fontSize: '0.9rem',
                      '& strong': {
                        color: 'text.primary',
                        fontWeight: 500,
                        mr: 1
                      }
                    }
                  }
                }}>
                  <Box>
                    <PersonIcon fontSize="small" />
                    <Typography variant="body2">
                      <strong>Responsable:</strong> {projectData.owner}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <CategoryIcon fontSize="small" />
                    <Typography variant="body2">
                      <strong>Departamento:</strong> {projectData.department}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <CalendarIcon fontSize="small" />
                    <Typography variant="body2">
                      <strong>Inicio:</strong> {new Date(projectData.startDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <CalendarIcon fontSize="small" />
                    <Typography variant="body2">
                      <strong>Fin estimado:</strong> {new Date(projectData.endDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      

    </Box>
  );
};

export default DashboardPage;
