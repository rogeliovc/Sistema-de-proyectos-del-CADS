import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        elevation={3} 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease-in-out',
          borderRadius: 3,
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: `0 20px 40px -12px rgba(0,0,0,0.1)`,
            '& .feature-icon': {
              transform: 'scale(1.1)',
              backgroundColor: theme.palette.secondary.main,
            },
            '& .feature-title': {
              color: theme.palette.primary.main,
            }
          },
        }}
      >
        <Box sx={{ 
          p: 4, 
          textAlign: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Box 
            className="feature-icon"
            sx={{
              width: 80,
              height: 80,
              margin: '0 auto 24px',
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.light,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.palette.primary.contrastText,
              transition: 'all 0.3s ease-in-out',
              '& svg': {
                fontSize: '2rem'
              }
            }}
          >
            {React.cloneElement(icon, { fontSize: 'large' })}
          </Box>
          <Typography 
            className="feature-title"
            variant="h6" 
            component="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              mb: 2,
              transition: 'color 0.3s ease-in-out'
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              lineHeight: 1.7,
              flexGrow: 1
            }}
          >
            {description}
          </Typography>
        </Box>
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
          y: 20 
        }
      }}
    >
      <Box sx={{ 
        textAlign: 'center', 
        p: 3,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          '& .stat-value': {
            color: 'primary.main',
          },
          '& .stat-icon': {
            transform: 'scale(1.2)',
            color: 'secondary.main',
          }
        }
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          mb: 2,
          '& .stat-icon': {
            transition: 'all 0.3s ease-in-out',
            color: 'primary.main',
            fontSize: '2.5rem',
            mr: 2
          }
        }}>
          {React.cloneElement(icon, { className: 'stat-icon' })}
        </Box>
        <Typography 
          variant="h3" 
          component="div" 
          className="stat-value"
          sx={{ 
            fontWeight: 'bold',
            mb: 1,
            background: 'linear-gradient(45deg, #1a237e 30%, #283593 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          {value}
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{ 
            fontWeight: 500,
            maxWidth: 200,
            mx: 'auto'
          }}
        >
          {label}
        </Typography>
      </Box>
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
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: { xs: 8, md: 15 },
          position: 'relative',
          overflow: 'hidden',
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
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Chip 
                  label="Centro de Análisis de Datos y Supercómputo" 
                  color="secondary" 
                  sx={{ 
                    mb: 2, 
                    color: 'white', 
                    fontWeight: 'bold',
                    backdropFilter: 'blur(5px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                />
                <Typography 
                  variant="h2" 
                  component="h1" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: 3,
                    fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
                    lineHeight: 1.2,
                    textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                  }}
                >
                  Potencia tu investigación con <Box component="span" sx={{ color: 'secondary.main' }}>Leo Atrox</Box>
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 4, 
                    opacity: 0.9, 
                    maxWidth: '90%',
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    lineHeight: 1.7
                  }}
                >
                  Plataforma integral para la administración y seguimiento de proyectos de cómputo de alto rendimiento en la supercomputadora Leo Atrox de la UDG.
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 4 }}>
                  <AnimatedButton>
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
                        '&:hover': {
                          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Iniciar Sesión
                    </Button>
                  </AnimatedButton>
                  <AnimatedButton>
                    <Button 
                      variant="outlined" 
                      color="secondary" 
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
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        '&:hover': {
                          borderWidth: 2,
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          borderColor: 'white',
                        },
                      }}
                    >
                      Registrarse
                    </Button>
                  </AnimatedButton>
                </Box>
                
                {/* Trusted by section */}
                <Box sx={{ mt: 6, opacity: 0.8 }}>
                  <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.8)' }}>
                    Confiado por investigadores de:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
                    <Box component="img" src="/images/udg-logo.png" alt="UDG" sx={{ height: 30, filter: 'brightness(0) invert(1)' }} />
                    <Box component="img" src="/images/conacyt-logo.png" alt="CONACYT" sx={{ height: 25, filter: 'brightness(0) invert(1)' }} />
                    <Box component="img" src="/images/red-mexsupe.png" alt="Red Mexsupe" sx={{ height: 25, filter: 'brightness(0) invert(1)' }} />
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.2
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <Box 
                  component="div"
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '20px',
                      background: 'linear-gradient(45deg, rgba(25, 118, 210, 0.3), rgba(156, 39, 176, 0.3))',
                      top: '15px',
                      left: '15px',
                      zIndex: 0,
                      transition: 'all 0.3s ease',
                    },
                    '&:hover::before': {
                      top: '20px',
                      left: '20px',
                    }
                  }}
                >
                  <Box 
                    component="img"
                    src="/images/leo-atrox-hero.png"
                    alt="Supercomputadora Leo Atrox"
                    sx={{
                      position: 'relative',
                      width: '100%',
                      maxWidth: '600px',
                      height: 'auto',
                      borderRadius: 4,
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      zIndex: 1,
                      transition: 'all 0.3s ease',
                    }}
                  />
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
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4 }}>
                  <AnimatedButton>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      size="large"
                      onClick={() => window.open('https://www.cadsc.udg.mx', '_blank')}
                      sx={{ 
                        px: 4,
                        py: 1.5,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        borderRadius: 2,
                        boxShadow: '0 4px 14px rgba(25, 118, 210, 0.4)',
                        '&:hover': {
                          boxShadow: '0 6px 20px rgba(25, 118, 210, 0.5)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Conocer más sobre el CADS
                    </Button>
                  </AnimatedButton>
                  <AnimatedButton>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      size="large"
                      onClick={() => navigate('/registro')}
                      sx={{ 
                        px: 4,
                        py: 1.5,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        borderRadius: 2,
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                          backgroundColor: 'rgba(25, 118, 210, 0.04)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Empezar ahora
                    </Button>
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

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          bgcolor: 'background.paper', 
          pt: 8, 
          pb: 4,
          borderTop: `1px solid ${theme.palette.divider}`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Logo y descripción */}
            <Grid item xs={12} md={4}>
              <Box 
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Box display="flex" alignItems="center" mb={3}>
                  <Box 
                    component="img"
                    src="/images/logo-udg.png"
                    alt="UDG Logo"
                    sx={{ 
                      height: 50, 
                      mr: 2,
                      filter: 'grayscale(100%)',
                      opacity: 0.8,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        filter: 'grayscale(0%)',
                        opacity: 1,
                      }
                    }}
                  />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                    }}
                  >
                    CADS UDG
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    lineHeight: 1.7,
                    mb: 3,
                    fontSize: '0.95rem'
                  }}
                >
                  El Centro de Análisis de Datos y Supercómputo de la Universidad de Guadalajara provee infraestructura y servicios de cómputo de alto rendimiento para la investigación científica.
                </Typography>
                <Box display="flex" gap={2}>
                  {[
                    { icon: <Facebook />, url: 'https://facebook.com', label: 'Facebook' },
                    { icon: <Twitter />, url: 'https://twitter.com', label: 'Twitter' },
                    { icon: <LinkedIn />, url: 'https://linkedin.com', label: 'LinkedIn' },
                    { icon: <YouTube />, url: 'https://youtube.com', label: 'YouTube' },
                  ].map((social, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconButton 
                        aria-label={social.label}
                        sx={{ 
                          color: 'text.secondary',
                          backgroundColor: 'rgba(0, 0, 0, 0.03)',
                          '&:hover': {
                            color: theme.palette.primary.main,
                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.icon}
                      </IconButton>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </Grid>
            
            {/* Enlaces rápidos */}
            <Grid item xs={12} sm={6} md={2}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Typography 
                  variant="subtitle1" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{ 
                    color: theme.palette.text.primary,
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -5,
                      left: 0,
                      width: '40px',
                      height: '3px',
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      borderRadius: '3px',
                    }
                  }}
                >
                  Enlaces Rápidos
                </Typography>
                <List dense sx={{ mt: 2 }}>
                  {[
                    { text: 'Iniciar sesión', icon: <LoginIcon fontSize="small" sx={{ opacity: 0.7 }} />, action: () => navigate('/login') },
                    { text: 'Registrarse', icon: <HowToRegIcon fontSize="small" sx={{ opacity: 0.7 }} />, action: () => navigate('/registro') },
                    { text: 'Sitio web del CADS', icon: <SchoolIcon fontSize="small" sx={{ opacity: 0.7 }} />, action: () => window.open('https://www.cadsc.udg.mx', '_blank') },
                    { text: 'Documentación', icon: <MenuBookOutlined fontSize="small" sx={{ opacity: 0.7 }} />, action: () => {} },
                  ].map((item, index) => (
                    <motion.div
                      key={item.text}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <ListItem 
                        disableGutters 
                        sx={{ 
                          px: 0,
                          '&:not(:last-child)': { 
                            mb: 0.5 
                          } 
                        }}
                      >
                        <ListItemButton 
                          onClick={item.action}
                          sx={{
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.03)',
                              '& .MuiListItemIcon-root': {
                                color: theme.palette.primary.main,
                              },
                              '& .MuiTypography-root': {
                                color: theme.palette.primary.main,
                              }
                            }
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 32, color: 'text.secondary' }}>
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText 
                            primary={item.text}
                            primaryTypographyProps={{ 
                              variant: 'body2', 
                              color: 'text.secondary',
                              sx: { 
                                fontWeight: 500,
                                fontSize: '0.9rem',
                                transition: 'all 0.2s ease',
                              }
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              </motion.div>
            </Grid>
            
            {/* Contacto */}
            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Typography 
                  variant="subtitle1" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{ 
                    color: theme.palette.text.primary,
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -5,
                      left: 0,
                      width: '40px',
                      height: '3px',
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      borderRadius: '3px',
                    }
                  }}
                >
                  Contacto
                </Typography>
                <List dense sx={{ mt: 2 }}>
                  <ListItem disableGutters sx={{ alignItems: 'flex-start', mb: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: 0.5, color: 'primary.main' }}>
                      <EmailIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Correo electrónico"
                      primaryTypographyProps={{ 
                        variant: 'caption',
                        color: 'text.secondary',
                        sx: { fontWeight: 500 }
                      }}
                      secondary="contacto@cadsc.udg.mx"
                      secondaryTypographyProps={{ 
                        variant: 'body2',
                        color: 'text.primary',
                        sx: { 
                          fontWeight: 500,
                          fontSize: '0.9rem',
                          mt: 0.5,
                          display: 'block'
                        }
                      }}
                    />
                  </ListItem>
                  
                  <ListItem disableGutters sx={{ alignItems: 'flex-start', mb: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: 0.5, color: 'primary.main' }}>
                      <PhoneIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Teléfono"
                      primaryTypographyProps={{ 
                        variant: 'caption',
                        color: 'text.secondary',
                        sx: { fontWeight: 500 }
                      }}
                      secondary="+52 33 1234 5678"
                      secondaryTypographyProps={{ 
                        variant: 'body2',
                        color: 'text.primary',
                        sx: { 
                          fontWeight: 500,
                          fontSize: '0.9rem',
                          mt: 0.5,
                          display: 'block'
                        }
                      }}
                    />
                  </ListItem>
                  
                  <ListItem disableGutters sx={{ alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: 0.5, color: 'primary.main' }}>
                      <LocationIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Dirección"
                      primaryTypographyProps={{ 
                        variant: 'caption',
                        color: 'text.secondary',
                        sx: { fontWeight: 500 }
                      }}
                      secondary="Av. Juárez 976, Edificio de Rectoría General, Planta Baja, Colonia Centro, 44100, Guadalajara, Jalisco, México."
                      secondaryTypographyProps={{ 
                        variant: 'body2',
                        color: 'text.primary',
                        sx: { 
                          fontWeight: 500,
                          fontSize: '0.9rem',
                          mt: 0.5,
                          display: 'block'
                        }
                      }}
                    />
                  </ListItem>
                </List>
              </motion.div>
            </Grid>
            
            {/* Boletín informativo */}
            <Grid item xs={12} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Typography 
                  variant="subtitle1" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{ 
                    color: theme.palette.text.primary,
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -5,
                      left: 0,
                      width: '40px',
                      height: '3px',
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      borderRadius: '3px',
                    }
                  }}
                >
                  Boletín Informativo
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mt: 2,
                    mb: 3,
                    lineHeight: 1.7,
                    fontSize: '0.95rem'
                  }}
                >
                  Suscríbete para recibir las últimas noticias, actualizaciones y ofertas especiales directamente en tu bandeja de entrada.
                </Typography>
                <Box 
                  component="form" 
                  noValidate 
                  autoComplete="off"
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.palette.divider,
                      },
                      '&:hover fieldset': {
                        borderColor: `${theme.palette.primary.main} !important`,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: `${theme.palette.primary.main} !important`,
                      },
                    },
                  }}
                >
                  <TextField
                    size="small"
                    placeholder="Tu correo electrónico"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    InputProps={{
                      sx: {
                        borderRadius: 2,
                        backgroundColor: theme.palette.background.paper,
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        },
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlined sx={{ color: 'text.secondary', opacity: 0.7 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="contained" 
                      color="primary"
                      fullWidth
                      size="large"
                      sx={{
                        py: 1.2,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        fontSize: '0.95rem',
                        boxShadow: `0 4px 14px ${theme.palette.primary.main}40`,
                        '&:hover': {
                          boxShadow: `0 6px 20px ${theme.palette.primary.main}60`,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Suscribirse
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
          
          {/* Línea divisoria */}
          <Divider 
            sx={{ 
              my: 6,
              borderColor: 'divider',
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                width: '20px',
                height: '20px',
                backgroundColor: theme.palette.background.paper,
                borderRadius: '50%',
                transform: 'translateY(-50%)',
              },
              '&::before': {
                left: '-10px',
                boxShadow: 'inset -5px 0 5px -5px rgba(0,0,0,0.1)',
              },
              '&::after': {
                right: '-10px',
                boxShadow: 'inset 5px 0 5px -5px rgba(0,0,0,0.1)',
              },
            }} 
          />
          
          {/* Copyright y enlaces legales */}
          <Grid 
            container 
            spacing={2} 
            justifyContent="space-between" 
            alignItems="center"
            sx={{
              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column-reverse',
                alignItems: 'flex-start',
                gap: 2,
              }
            }}
          >
            <Grid item>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontSize: '0.85rem',
                  [theme.breakpoints.down('sm')]: {
                    textAlign: 'left',
                    width: '100%',
                  }
                }}
              >
                © {new Date().getFullYear()} Centro de Análisis de Datos y Supercómputo - UDG. Todos los derechos reservados.
              </Typography>
            </Grid>
            <Grid item>
              <Box 
                display="flex" 
                gap={3}
                sx={{
                  [theme.breakpoints.down('sm')]: {
                    width: '100%',
                    flexWrap: 'wrap',
                    gap: 2,
                  }
                }}
              >
                {[
                  { text: 'Términos y condiciones', url: '#' },
                  { text: 'Política de privacidad', url: '#' },
                  { text: 'Aviso legal', url: '#' },
                  { text: 'Cookies', url: '#' },
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href={item.url} 
                      variant="body2" 
                      color="text.secondary"
                      underline="hover"
                      sx={{
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        '&:hover': {
                          color: theme.palette.primary.main,
                        },
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {item.text}
                    </Link>
                  </motion.div>
                ))}
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
