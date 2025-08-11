import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticlesBackground from '../components/ParticlesBackground';
import AnimatedTypingText from '../components/AnimatedTypingText';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  useTheme,
  useMediaQuery,
  Paper,
  Divider,
  Chip,
  Avatar,
  Fade,
  Slide,
  Zoom,
  Grow,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  Link,
  IconButton
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import { 
  Computer as ComputerIcon,
  Storage as StorageIcon,
  Group as GroupIcon,
  Timeline as TimelineIcon,
  Login as LoginIcon,
  HowToReg as RegisterIcon,
  HowToReg as HowToRegIcon,
  School as SchoolIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  CloudUpload as CloudUploadIcon,
  BarChart as BarChartIcon,
  People as PeopleIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Facebook,
  Twitter,
  LinkedIn,
  YouTube,
  MenuBookOutlined,
  EmailOutlined
} from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FeatureCard = ({ icon, title, description, index }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.5,
            delay: index * 0.1
          } 
        },
        hidden: { 
          opacity: 0, 
          y: 50 
        }
      }}
    >
      <Card 
        elevation={0} 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          background: 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: '16px',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 40px rgba(99, 102, 241, 0.15)',
            borderColor: 'rgba(99, 102, 241, 0.5)',
            background: 'rgba(30, 41, 59, 0.8)',
            '& .feature-icon': {
              transform: 'scale(1.1) rotate(5deg)',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(59, 130, 246, 0.3))',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.2)',
            },
            '& .feature-title': {
              color: '#60a5fa',
            }
          },
          '& .feature-icon': {
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: 4, position: 'relative', zIndex: 1 }}>
          <Box 
            className="feature-icon"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              mb: 3,
              borderRadius: '18px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(59, 130, 246, 0.15))',
              color: '#60a5fa',
              fontSize: '2.2rem',
              boxShadow: '0 4px 15px rgba(96, 165, 250, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
            }}
          >
            {React.cloneElement(icon, { sx: { fontSize: '1.8rem' } })}
          </Box>
          <Typography 
            className="feature-title"
            variant="h5" 
            component="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              mb: 2.5,
              color: '#f8fafc',
              fontSize: '1.5rem',
              transition: 'color 0.3s ease',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: '40px',
                height: '3px',
                background: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
                borderRadius: '3px',
                transition: 'width 0.3s ease',
              },
              '&:hover::after': {
                width: '60px',
              }
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body1"
            sx={{ 
              color: '#e2e8f0',
              opacity: 0.9,
              lineHeight: 1.8,
              fontSize: '1.05rem',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const StatCard = ({ value, label, icon, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.5,
            delay: index * 0.1
          } 
        },
        hidden: { 
          opacity: 0, 
          y: 30 
        }
      }}
    >
      <Card 
        elevation={0}
        sx={{
          p: 4,
          height: '100%',
          borderRadius: '16px',
          background: 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
            opacity: 0.8,
          },
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 40px rgba(96, 165, 250, 0.15)',
            background: 'rgba(30, 41, 59, 0.8)',
            borderColor: 'rgba(99, 102, 241, 0.4)',
            '& .stat-icon': {
              transform: 'scale(1.1) rotate(5deg)',
              background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(37, 99, 235, 0.2))',
              boxShadow: '0 4px 20px rgba(96, 165, 250, 0.2)',
            },
            '&::after': {
              opacity: 0.1,
            }
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 30%, rgba(96, 165, 250, 0.1) 0%, transparent 100%)',
            opacity: 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box 
            className="stat-icon"
            sx={{
              width: 64,
              height: 64,
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 3,
              background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(37, 99, 235, 0.1))',
              color: '#60a5fa',
              fontSize: '2rem',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(96, 165, 250, 0.2)',
              boxShadow: '0 4px 15px rgba(96, 165, 250, 0.1)',
            }}
          >
            {React.cloneElement(icon, { sx: { fontSize: '1.8rem' } })}
          </Box>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h3" 
              component="div" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(90deg, #60a5fa, #3b82f6)', 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                lineHeight: 1.2,
                fontSize: { xs: '2.2rem', sm: '2.5rem' },
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {value}
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: '#e2e8f0',
                opacity: 0.95,
                fontWeight: 500,
                mt: 0.5,
                fontSize: '1.1rem',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              {label}
            </Typography>
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
};

const AnimatedButton = ({ children, ...props }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    {children}
  </motion.div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const features = [
    {
      icon: <SpeedIcon />,
      title: 'Alto Rendimiento',
      description: 'Potencia de cómputo de clase mundial con nuestra supercomputadora Leo Atrox, diseñada para proyectos de investigación avanzada.'
    },
    {
      icon: <SecurityIcon />,
      title: 'Seguridad Garantizada',
      description: 'Tus datos están protegidos con los más altos estándares de seguridad y respaldos periódicos.'
    },
    {
      icon: <PeopleIcon />,
      title: 'Colaboración',
      description: 'Trabaja en equipo con investigadores de toda la Universidad de Guadalajara y colabora en tiempo real.'
    },
    {
      icon: <BarChartIcon />,
      title: 'Análisis Avanzado',
      description: 'Herramientas poderosas para el procesamiento y análisis de grandes volúmenes de datos.'
    },
    {
      icon: <CloudUploadIcon />,
      title: 'Almacenamiento Escalable',
      description: 'Solución de almacenamiento de alta capacidad que crece con tus necesidades de investigación.'
    },
    {
      icon: <SchoolIcon />,
      title: 'Soporte Académico',
      description: 'Asesoría especializada para el desarrollo de proyectos de investigación con cómputo de alto rendimiento.'
    }
  ];

  const stats = [
    { value: '1.5+', label: 'PetaFLOPS de potencia de cómputo', icon: <SpeedIcon /> },
    { value: '500+', label: 'Investigadores activos', icon: <PeopleIcon /> },
    { value: '100+', label: 'Proyectos en ejecución', icon: <BarChartIcon /> },
    { value: '24/7', label: 'Soporte y disponibilidad', icon: <SecurityIcon /> },
  ];

  const testimonials = [
    {
      name: 'Dra. Ana Martínez',
      role: 'Investigadora en Ciencias de la Computación',
      content: 'La plataforma del CADS ha revolucionado mi investigación, permitiéndome procesar grandes volúmenes de datos en una fracción del tiempo que me tomaba antes.',
      avatar: '/images/avatar1.jpg'
    },
    {
      name: 'Dr. Carlos Rodríguez',
      role: 'Profesor de Ingeniería',
      content: 'La facilidad de uso y la potencia de cómputo disponible han hecho que mis proyectos de simulación sean mucho más eficientes y productivos.',
      avatar: '/images/avatar2.jpg'
    },
    {
      name: 'Mtra. Laura González',
      role: 'Estudiante de Doctorado',
      content: 'El soporte del equipo técnico es excepcional. Me han ayudado a optimizar mis algoritmos para aprovechar al máximo los recursos disponibles.',
      avatar: '/images/avatar3.jpg'
    }
  ];

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box 
        sx={{
          background: `linear-gradient(135deg, #0d1b5c 0%, #1a237e 50%, #303f9f 100%)`,
          color: 'white',
          py: { xs: 8, md: 15 },
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("/images/pattern.png")',
            opacity: 0.05,
            zIndex: 0,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '150px',
            background: 'linear-gradient(to top, rgba(5, 15, 35, 0.95), transparent)',
            zIndex: 1,
          }
        }}
      >
        {/* Fondo de partículas */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.6
        }}>
          <ParticlesBackground />
        </Box>

        {/* Elementos flotantes decorativos */}
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            style={{
              position: 'absolute',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(5px)',
              borderRadius: '50%',
              zIndex: 0,
            }}
            animate={{
              y: [0, 15, 0],
              x: [0, 5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: item * 0.5
            }}
            sx={{
              width: item % 2 === 0 ? '200px' : '300px',
              height: item % 2 === 0 ? '200px' : '300px',
              top: `${10 + item * 15}%`,
              left: item % 2 === 0 ? '5%' : 'auto',
              right: item % 2 !== 0 ? '5%' : 'auto',
              filter: 'blur(40px)',
              opacity: 0.2,
            }}
          />
        ))}

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <Chip 
                    label="Centro de Análisis de Datos y Supercómputo" 
                    color="secondary" 
                    sx={{ 
                      mb: 2, 
                      color: 'white', 
                      fontWeight: 'bold',
                      backdropFilter: 'blur(10px)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)'
                      },
                      transition: 'all 0.3s ease',
                    }}
                  />
                </motion.div>

                <Box sx={{ 
                  backdropFilter: 'blur(12px)',
                  backgroundColor: 'rgba(15, 23, 42, 0.7)',
                  borderRadius: 4,
                  p: 4,
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
                  mb: 4,
                  background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.7))',
                  '&:hover': {
                    borderColor: 'rgba(99, 102, 241, 0.5)',
                    boxShadow: '0 12px 40px 0 rgba(99, 102, 241, 0.15)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}>
                  <AnimatedTypingText 
                    text={['Potencia tu investigación con Leo Atrox', 'Supercómputo al alcance de tu mano', 'Innovación en análisis de datos']}
                    speed={50}
                    variant="h2"
                    color="#f8fafc"
                    highlightColor="#60a5fa"
                    highlightText={['Leo Atrox', 'Supercómputo', 'análisis de datos']}
                    sx={{
                      '& .highlight': {
                        color: '#60a5fa',
                        textShadow: '0 0 15px rgba(96, 165, 250, 0.7)',
                        fontWeight: 700,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: '2px',
                          left: 0,
                          width: '100%',
                          height: '4px',
                          background: 'rgba(96, 165, 250, 0.3)',
                          borderRadius: '2px',
                        }
                      },
                      '& .typing-text': {
                        textShadow: '0 2px 4px rgba(0,0,0,0.4)',
                        fontWeight: 600,
                        color: '#f8fafc',
                      }
                    }}
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mt: 3,
                        opacity: 0.95, 
                        fontSize: { xs: '1.1rem', md: '1.3rem' },
                        lineHeight: 1.8,
                        fontWeight: 400,
                        color: '#e2e8f0',
                        textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                      }}
                    >
                      Plataforma integral para la administración y seguimiento de proyectos de cómputo de alto rendimiento en la supercomputadora Leo Atrox de la UDG.
                    </Typography>
                  </motion.div>
                </Box>

                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 4 }}>
                  <AnimatedButton>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="contained" 
                        color="secondary" 
                        size="large"
                        endIcon={<LoginIcon />}
                        onClick={() => navigate('/login')}
                        sx={{ 
                          px: 4,
                          py: 1.5,
                          fontWeight: 'bold',
                          textTransform: 'none',
                          borderRadius: 2,
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                          fontSize: '1rem',
                          backdropFilter: 'blur(10px)',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          '&:hover': {
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                            transform: 'translateY(-2px)',
                            backgroundColor: 'secondary.main',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Iniciar Sesión
                      </Button>
                    </motion.div>
                  </AnimatedButton>
                  
                  <AnimatedButton>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="outlined" 
                        color="inherit" 
                        size="large"
                        endIcon={<RegisterIcon />}
                        onClick={() => navigate('/registro')}
                        sx={{ 
                          px: 4,
                          py: 1.5,
                          fontWeight: 'bold',
                          textTransform: 'none',
                          borderWidth: 2,
                          borderRadius: 2,
                          fontSize: '1rem',
                          color: 'white',
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          backdropFilter: 'blur(10px)',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          '&:hover': {
                            borderWidth: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderColor: 'white',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Registrarse
                      </Button>
                    </motion.div>
                  </AnimatedButton>
                </Box>
                
                {/* Trusted by section - Simplified */}
                <Box sx={{ mt: 6, mb: 4, textAlign: 'center' }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 3, 
                      color: '#94a3b8',
                      fontWeight: 500,
                      display: 'block'
                    }}
                  >
                    Confiado por investigadores de:
                  </Typography>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: { xs: 3, md: 4 },
                      '& img': {
                        height: { xs: 24, sm: 28 },
                        opacity: 0.8,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          opacity: 1,
                          transform: 'translateY(-2px)'
                        }
                      }
                    }}
                  >
                    <img src="/images/udg-logo.png" alt="UDG" />
                    <img src="/images/conacyt-logo.png" alt="CONACYT" />
                    <img src="/images/red-mexsupe.png" alt="Red Mexsupe" />
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.4,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                style={{
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '20px',
                      background: 'linear-gradient(45deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      zIndex: -1,
                      top: 0,
                      left: 0,
                      transform: 'rotate(5deg)',
                      boxShadow: '0 8px 32px 0 rgba(13, 18, 48, 0.3)'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '20px',
                      background: 'linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      zIndex: -2,
                      top: 0,
                      left: 0,
                      transform: 'rotate(-5deg)',
                      boxShadow: '0 8px 32px 0 rgba(13, 18, 48, 0.3)'
                    },
                    '&:hover::before': {
                      transform: 'rotate(8deg) translateY(-5px)',
                      transition: 'all 0.3s ease',
                      background: 'linear-gradient(45deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))'
                    },
                    '&:hover::after': {
                      transform: 'rotate(-8deg) translateY(5px)',
                      transition: 'all 0.3s ease',
                      background: 'linear-gradient(45deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))'
                    },
                    '& .image-container': {
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '20px',
                        background: 'linear-gradient(45deg, rgba(30, 60, 150, 0.2), rgba(80, 30, 120, 0.2))',
                        top: '12px',
                        left: '12px',
                        zIndex: 0,
                        transition: 'all 0.3s ease',
                      },
                      '&:hover::before': {
                        top: '15px',
                        left: '15px',
                        background: 'linear-gradient(45deg, rgba(30, 80, 180, 0.25), rgba(90, 30, 150, 0.25))'
                      }
                    }
                  }}
                >
                  <Box 
                    className="image-container"
                    component="div"
                    sx={{
                      position: 'relative',
                      display: 'inline-block',
                      '& img': {
                        position: 'relative',
                        width: '100%',
                        maxWidth: '600px',
                        height: 'auto',
                        borderRadius: 3,
                        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        backgroundColor: 'rgba(26, 35, 126, 0.2)',
                        backdropFilter: 'blur(12px)',
                        zIndex: 1,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: 'translateZ(0)',
                        '&:hover': {
                          transform: 'translateY(-8px) translateZ(0)',
                          boxShadow: '0 30px 60px -10px rgba(0, 0, 0, 0.35)',
                          borderColor: 'rgba(255, 255, 255, 0.2)'
                        }
                      }
                    }}
                  >
                    <img
                      src="/images/leo-atrox-hero.png"
                      alt="Supercomputadora Leo Atrox"
                    />
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        
        {/* Animated background elements */}
        <Box 
          component={motion.div}
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          sx={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            top: '10%',
            left: '10%',
            zIndex: 0,
          }}
        />
        <Box 
          component={motion.div}
          animate={{
            y: [10, -10, 10],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          sx={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(156,39,176,0.1) 0%, rgba(156,39,176,0) 70%)',
            bottom: '5%',
            right: '5%',
            zIndex: 0,
          }}
        />
      </Box>

      {/* Stats Section */}
      <Container maxWidth="xl" sx={{ py: 10, position: 'relative' }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box 
            sx={{ 
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              borderRadius: 6,
              p: { xs: 3, md: 6 },
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("/images/pattern-dots.png")',
                opacity: 0.05,
                zIndex: 0,
              }
            }}
          >
            <Container maxWidth="lg">
              <Box textAlign="center" mb={6} position="relative" zIndex={1}>
                <Chip 
                  label="Nuestro Impacto" 
                  color="secondary" 
                  variant="outlined" 
                  sx={{ 
                    mb: 2, 
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    letterSpacing: '1px'
                  }}
                />
                <Typography 
                  variant="h3" 
                  component="h2" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'white',
                    mb: 2,
                    fontSize: { xs: '1.8rem', md: '2.5rem' }
                  }}
                >
                  Impulsando la investigación de vanguardia
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    maxWidth: '700px',
                    mx: 'auto',
                    fontSize: { xs: '1rem', md: '1.1rem' }
                  }}
                >
                  Nuestra plataforma está transformando la manera en que los investigadores acceden y utilizan recursos de cómputo de alto rendimiento.
                </Typography>
              </Box>
              
              <Grid container spacing={4} justifyContent="center" alignItems="stretch">
                {stats.map((stat, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <StatCard {...stat} index={index} />
                  </Grid>
                ))}
              </Grid>
              
              <Box textAlign="center" mt={6} pt={4} position="relative">
                <Box 
                  component={motion.div}
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    size="large"
                    onClick={() => navigate('/registro')}
                    sx={{
                      px: 6,
                      py: 1.5,
                      borderRadius: 3,
                      textTransform: 'none',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 25px rgba(0,0,0,0.3)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Únete a nuestra comunidad
                  </Button>
                </Box>
              </Box>
            </Container>
            
            {/* Decorative elements */}
            <Box 
              component={motion.div}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              sx={{
                position: 'absolute',
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: '50%',
                border: '2px dashed rgba(255, 255, 255, 0.1)',
                zIndex: 0,
              }}
            />
          </Box>
        </Box>
      </Container>

      {/* Features Section */}
      <Box sx={{ 
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`,
          zIndex: -2,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '150%',
          height: '150%',
          background: 'radial-gradient(circle, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0) 70%)',
          zIndex: -1,
        }
      }}>
        <Container maxWidth="lg">
          <Box 
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            textAlign="center" 
            mb={8}
          >
            <Chip 
              label="Características" 
              color="primary" 
              variant="outlined" 
              sx={{ 
                mb: 2, 
                fontWeight: 'bold',
                letterSpacing: '1px',
                fontSize: '0.8rem',
                height: 32,
                '& .MuiChip-label': {
                  px: 2,
                }
              }}
            />
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
                lineHeight: 1.2,
                color: theme.palette.text.primary
              }}
            >
              Potencia al alcance de tu investigación
            </Typography>
            <Typography 
              variant="subtitle1" 
              color="text.secondary" 
              maxWidth="700px" 
              margin="0 auto"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.7
              }}
            >
              El sistema de gestión de proyectos del CADS te ofrece herramientas poderosas para llevar a cabo investigaciones de vanguardia con la supercomputadora Leo Atrox.
            </Typography>
          </Box>
          
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                lg={4} 
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <FeatureCard 
                  {...feature} 
                  index={index}
                />
              </Grid>
            ))}
          </Grid>
          
          <Box textAlign="center" mt={8}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => navigate('/registro')}
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: 3,
                  borderWidth: 2,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  '&:hover': {
                    borderWidth: 2,
                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Descubre todas las características
              </Button>
            </motion.div>
          </Box>
        </Container>
        
        {/* Decorative elements */}
        <Box 
          component={motion.div}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          sx={{
            position: 'absolute',
            top: '20%',
            right: '-100px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            border: '2px dashed rgba(25, 118, 210, 0.1)',
            zIndex: -1,
          }}
        />
        <Box 
          component={motion.div}
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '-150px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            border: '2px dashed rgba(156, 39, 176, 0.1)',
            zIndex: -1,
          }}
        />
      </Box>

      {/* About Section */}
      <Box sx={{ 
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("/images/pattern-light.png")',
          opacity: 0.03,
          zIndex: 0,
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Chip 
                  label="Acerca de" 
                  color="primary" 
                  variant="outlined" 
                  sx={{ 
                    mb: 2, 
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    fontSize: '0.8rem',
                    height: 32,
                    '& .MuiChip-label': {
                      px: 2,
                    }
                  }}
                />
                <Typography 
                  variant="h3" 
                  component="h2" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: 3,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    lineHeight: 1.2,
                    color: theme.palette.text.primary
                  }}
                >
                  Innovación y tecnología para la investigación de <Box component="span" sx={{ color: 'primary.main' }}>alto impacto</Box>
                </Typography>
                <Box sx={{ mb: 4 }}>
                  <Typography paragraph sx={{ 
                    mb: 3, 
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: theme.palette.text.secondary
                  }}>
                    El <strong>Centro de Análisis de Datos y Supercómputo (CADS)</strong> de la Universidad de Guadalajara alberga a <strong>Leo Atrox</strong>, 
                    una de las supercomputadoras más potentes de México, diseñada para apoyar proyectos de investigación que requieren 
                    alto poder de cómputo y procesamiento de grandes volúmenes de datos.
                  </Typography>
                  <Typography paragraph sx={{ 
                    mb: 3, 
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: theme.palette.text.secondary
                  }}>
                    Nuestra misión es proporcionar a la comunidad académica y científica las herramientas tecnológicas necesarias 
                    para impulsar la investigación de vanguardia y fomentar la colaboración interdisciplinaria.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 3, mt: 5, flexWrap: 'wrap' }}>
                  <AnimatedButton
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<HowToRegIcon sx={{ fontSize: '1.4rem' }} />}
                    component={Link}
                    to="/register"
                    sx={{
                      px: 6,
                      py: 1.8,
                      borderRadius: 3,
                      fontWeight: 700,
                      textTransform: 'none',
                      fontSize: '1.2rem',
                      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
                      background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                      border: 'none',
                      color: 'white',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 8px 25px rgba(37, 99, 235, 0.5)',
                        background: 'linear-gradient(45deg, #2563eb, #1d4ed8)',
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    Comenzar ahora
                  </AnimatedButton>
                  <AnimatedButton
                    variant="outlined"
                    color="inherit"
                    size="large"
                    startIcon={<LoginIcon sx={{ fontSize: '1.4rem' }} />}
                    component={Link}
                    to="/login"
                    sx={{
                      px: 6,
                      py: 1.8,
                      borderRadius: 3,
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '1.2rem',
                      borderWidth: '2px',
                      borderColor: 'rgba(96, 165, 250, 0.5)',
                      color: '#e0f2fe',
                      backgroundColor: 'rgba(30, 58, 138, 0.2)',
                      backdropFilter: 'blur(8px)',
                      '&:hover': {
                        backgroundColor: 'rgba(30, 64, 175, 0.3)',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 8px 25px rgba(37, 99, 235, 0.2)',
                        borderColor: 'rgba(96, 165, 250, 0.8)',
                        color: '#ffffff',
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    Iniciar sesión
                  </AnimatedButton>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ position: 'relative' }}
              >
                <Box 
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '20px',
                      background: `linear-gradient(45deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`,
                      top: '20px',
                      left: '20px',
                      zIndex: 0,
                      transition: 'all 0.4s ease',
                    },
                  }}
                >
                  <Box 
                    component="img"
                    src="/images/cads-building.jpg"
                    alt="Centro de Análisis de Datos y Supercómputo UDG"
                    sx={{
                      position: 'relative',
                      width: '100%',
                      borderRadius: 4,
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.4s ease',
                      zIndex: 1,
                      '&:hover': {
                        transform: 'translate(-5px, -5px)',
                        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.2)',
                        '& + .about-image-decoration': {
                          transform: 'translate(10px, 10px)',
                        }
                      },
                    }}
                  />
                </Box>
                <Box 
                  className="about-image-decoration"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: 4,
                    border: `2px dashed ${theme.palette.primary.main}30`,
                    transition: 'all 0.4s ease',
                    zIndex: 0,
                  }}
                />
                
                {/* Decorative elements */}
                <Box 
                  component={motion.div}
                  animate={{
                    y: [0, 15, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  sx={{
                    position: 'absolute',
                    top: -30,
                    right: -30,
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${theme.palette.primary.light}20 0%, ${theme.palette.primary.light}00 70%)`,
                    zIndex: 0,
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 10, bgcolor: 'primary.main', color: 'white' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            ¿Listo para comenzar tu proyecto?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
            Únete a la comunidad de investigadores que ya están aprovechando el poder de Leo Atrox para impulsar sus investigaciones.
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            endIcon={<HowToRegIcon />}
            onClick={() => navigate('/registro')}
            sx={{ 
              px: 6,
              py: 1.5,
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: 2,
              fontSize: '1.1rem',
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s',
            }}
          >
            Crear una cuenta
          </Button>
        </Container>
      </Box>

      {/* Footer - Simplified */}
      <Box 
        component="footer" 
        sx={{ 
          bgcolor: '#0f172a',
          color: '#e2e8f0',
          py: 6,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Logo y descripción */}
            <Grid item xs={12} md={6}>
              <Box mb={3}>
                <Box display="flex" alignItems="center" mb={2}>
                  <img
                    src="/images/logo-udg.png"
                    alt="UDG Logo"
                    style={{ 
                      height: 40, 
                      marginRight: 12,
                      filter: 'brightness(0) invert(1)'
                    }}
                  />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: '#ffffff'
                    }}
                  >
                    CADS UDG
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#94a3b8',
                    lineHeight: 1.6,
                    fontSize: '0.9rem'
                  }}
                >
                  Centro de Análisis de Datos y Supercómputo de la Universidad de Guadalajara.
                  Proporcionando infraestructura de cómputo de alto rendimiento para la investigación científica.
                </Typography>
              </Box>
              
              <Box display="flex" gap={2}>
                {[
                  { icon: <Facebook />, url: 'https://facebook.com', label: 'Facebook' },
                  { icon: <Twitter />, url: 'https://twitter.com', label: 'Twitter' },
                  { icon: <LinkedIn />, url: 'https://linkedin.com', label: 'LinkedIn' },
                  { icon: <YouTube />, url: 'https://youtube.com', label: 'YouTube' },
                ].map((social, index) => (
                  <IconButton 
                    key={index}
                    aria-label={social.label}
                    sx={{ 
                      color: '#94a3b8',
                      '&:hover': {
                        color: '#60a5fa',
                        backgroundColor: 'rgba(96, 165, 250, 0.1)'
                      }
                    }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Grid>
            
            {/* Enlaces rápidos */}
            <Grid item xs={12} sm={6} md={3}>
              <Box mb={4}>
                <Typography 
                  variant="subtitle1" 
                  component="h3"
                  sx={{ 
                    color: '#ffffff',
                    fontWeight: 600,
                    mb: 2,
                    fontSize: '1rem',
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: '24px',
                      height: '2px',
                      backgroundColor: '#60a5fa',
                      borderRadius: '2px',
                    }
                  }}
                >
                  Enlaces Rápidos
                </Typography>
                <Box component="nav">
                  {[
                    { text: 'Iniciar sesión', action: () => navigate('/login') },
                    { text: 'Registrarse', action: () => navigate('/registro') },
                    { text: 'Sitio web del CADS', action: () => window.open('https://www.cadsc.udg.mx', '_blank') },
                    { text: 'Documentación', action: () => {} },
                  ].map((item, index) => (
                    <Box 
                      key={item.text}
                      onClick={item.action}
                      sx={{
                        color: '#94a3b8',
                        fontSize: '0.9rem',
                        py: 1,
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: '#60a5fa',
                          transform: 'translateX(4px)'
                        },
                        '&:not(:last-child)': {
                          mb: 1
                        }
                      }}
                    >
                      <ChevronRightIcon sx={{ fontSize: '1rem', mr: 1 }} />
                      {item.text}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
            
            {/* Contacto */}
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Typography 
                  variant="subtitle1" 
                  component="h3"
                  sx={{ 
                    color: '#ffffff',
                    fontWeight: 600,
                    mb: 2,
                    fontSize: '1rem',
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: '24px',
                      height: '2px',
                      backgroundColor: '#60a5fa',
                      borderRadius: '2px',
                    }
                  }}
                >
                  Contacto
                </Typography>
                <Box>
                  {[
                    { 
                      text: 'contacto@cadsc.udg.mx',
                      icon: <EmailOutlined sx={{ fontSize: '1rem', color: '#60a5fa' }} />,
                      action: 'mailto:contacto@cads.udg.mx'
                    },
                    { 
                      text: '+52 33 1234 5678',
                      icon: <PhoneOutlined sx={{ fontSize: '1rem', color: '#60a5fa' }} />,
                      action: 'tel:+523312345678'
                    },
                    { 
                      text: 'Av. Juárez 976, Col. Centro, Guadalajara, Jalisco, México',
                      icon: <LocationOnOutlined sx={{ fontSize: '1rem', color: '#60a5fa' }} />,
                      action: 'https://goo.gl/maps/example'
                    }
                  ].map((item, index) => (
                    <Box 
                      key={index}
                      component="a"
                      href={item.action}
                      target={item.action.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        mb: 2,
                        textDecoration: 'none',
                        color: '#94a3b8',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: '#60a5fa'
                        }
                      }}
                    >
                      <Box sx={{ mr: 1.5, mt: '2px' }}>{item.icon}</Box>
                      <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                        {item.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
        
        {/* Elemento decorativo */}
        <Box 
          component={motion.div}
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.palette.primary.light}10 0%, ${theme.palette.primary.light}00 70%)`,
            zIndex: 0,
            opacity: 0.7,
          }}
        />
      </Box>
    </Box>
  );
};

export default LandingPage;
