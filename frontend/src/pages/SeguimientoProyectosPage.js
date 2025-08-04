import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  TextField, 
  InputAdornment, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TablePagination, 
  Chip, 
  Avatar, 
  IconButton, 
  Menu, 
  MenuItem, 
  Divider,
  Breadcrumbs,
  Link,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Card,
  CardContent,
  Stack,
  Tooltip,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Search as SearchIcon, 
  FilterList as FilterListIcon, 
  MoreVert as MoreVertIcon,
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Warning as WarningIcon,
  NavigateNext as NavigateNextIcon,
  FileDownload as FileDownloadIcon,
  FilterAlt as FilterAltIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

// Datos de ejemplo para las tarjetas de resumen
const summaryCards = [
  { 
    title: 'Total de Solicitudes', 
    value: '24', 
    change: '+12%', 
    isPositive: true,
    icon: <AssignmentIcon sx={{ color: 'primary.main', fontSize: 40 }} />
  },
  { 
    title: 'Aprobadas', 
    value: '15', 
    change: '+5%', 
    isPositive: true,
    icon: <CheckCircleIcon sx={{ color: 'success.main', fontSize: 40 }} />
  },
  { 
    title: 'Pendientes', 
    value: '6', 
    change: '-2%', 
    isPositive: false,
    icon: <PendingIcon sx={{ color: 'warning.main', fontSize: 40 }} />
  },
  { 
    title: 'Rechazadas', 
    value: '3', 
    change: '0%', 
    isPositive: null,
    icon: <WarningIcon sx={{ color: 'error.main', fontSize: 40 }} />
  },
];

// Datos de ejemplo para la tabla de solicitudes
const solicitudes = [
  {
    id: 1,
    folio: 'SOL-2023-001',
    titulo: 'Análisis de datos climáticos',
    solicitante: 'Juan Pérez',
    fechaSolicitud: '2023-08-01',
    fechaRevision: '2023-08-05',
    estado: 'Aprobado',
    comentarios: 'Proyecto aprobado para su implementación',
    revisadoPor: 'Admin CADS',
    prioridad: 'Alta',
  },
  {
    id: 2,
    folio: 'SOL-2023-002',
    titulo: 'Sistema de monitoreo ambiental',
    solicitante: 'María García',
    fechaSolicitud: '2023-08-02',
    fechaRevision: '2023-08-07',
    estado: 'Rechazado',
    comentarios: 'Falta documentación técnica',
    revisadoPor: 'Admin CADS',
    prioridad: 'Media',
  },
  {
    id: 3,
    folio: 'SOL-2023-003',
    titulo: 'Aplicación móvil para seguimiento',
    solicitante: 'Carlos López',
    fechaSolicitud: '2023-08-03',
    fechaRevision: null,
    estado: 'Pendiente',
    comentarios: '',
    revisadoPor: '',
    prioridad: 'Alta',
  },
  {
    id: 4,
    folio: 'SOL-2023-004',
    titulo: 'Investigación en IA para salud',
    solicitante: 'Ana Martínez',
    fechaSolicitud: '2023-08-04',
    fechaRevision: '2023-08-06',
    estado: 'Aprobado con observaciones',
    comentarios: 'Ajustar presupuesto según observaciones',
    revisadoPor: 'Admin CADS',
    prioridad: 'Alta',
  },
  {
    id: 5,
    folio: 'SOL-2023-005',
    titulo: 'Sistema de inventario',
    solicitante: 'Luis Rodríguez',
    fechaSolicitud: '2023-08-05',
    fechaRevision: null,
    estado: 'Pendiente',
    comentarios: '',
    revisadoPor: '',
    prioridad: 'Media',
  },
];

const SeguimientoProyectosPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroPrioridad, setFiltroPrioridad] = useState('todos');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const menuOpen = Boolean(menuAnchorEl);

  const handleMenuClick = (event, proyecto) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedProject(proyecto);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedProject(null);
  };

  const handleActionClick = (action) => {
    console.log(`${action} proyecto:`, selectedProject);
    // Aquí iría la lógica para cada acción
    handleMenuClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleFiltroEstado = (event) => {
    setFiltroEstado(event.target.value);
    setPage(0);
  };

  // Filtrar solicitudes por término de búsqueda, estado y prioridad
  const filteredSolicitudes = solicitudes.filter((solicitud) => {
    const matchesSearch = 
      solicitud.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.solicitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (solicitud.comentarios && solicitud.comentarios.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesEstado = filtroEstado === 'todos' || 
                         solicitud.estado.toLowerCase().includes(filtroEstado.toLowerCase());
    
    const matchesPrioridad = filtroPrioridad === 'todos' || 
                           (solicitud.prioridad && solicitud.prioridad.toLowerCase() === filtroPrioridad.toLowerCase());
    
    return matchesSearch && matchesEstado && matchesPrioridad;
  });

  // Obtener el color del estado de la solicitud
  const getEstadoColor = (estado) => {
    if (!estado) return 'default';
    
    const estadoLower = estado.toLowerCase();
    
    if (estadoLower.includes('aprobado')) {
      return 'success';
    } else if (estadoLower.includes('rechazado')) {
      return 'error';
    } else if (estadoLower === 'pendiente') {
      return 'warning';
    } else if (estadoLower.includes('observaciones')) {
      return 'info';
    }
    
    return 'default';
  };

  // Obtener el color de la prioridad
  const getPrioridadColor = (prioridad) => {
    if (!prioridad) return 'default';
    
    switch (prioridad.toLowerCase()) {
      case 'alta':
        return 'error';
      case 'media':
        return 'warning';
      case 'baja':
        return 'success';
      default:
        return 'default';
    }
  };
  
  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'Pendiente';
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      {/* Breadcrumbs */}
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href="/"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Inicio
          </Link>
          <Typography color="text.primary">Proyectos</Typography>
          <Typography color="text.primary" fontWeight="bold">Seguimiento</Typography>
        </Breadcrumbs>
      </Box>

      {/* Título y botón */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Seguimiento de Proyectos
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Visualiza y gestiona el estado de todos los proyectos
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          href="/nuevo-proyecto"
          sx={{ height: 'fit-content' }}
        >
          Nuevo Proyecto
        </Button>
      </Box>

      {/* Tarjetas de resumen */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {summaryCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                      {card.value}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      {card.change && (
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: card.isPositive === null ? 'text.primary' : 
                                  card.isPositive ? 'success.main' : 'error.main',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'medium'
                          }}
                        >
                          {card.isPositive === true ? (
                            <ArrowUpwardIcon fontSize="small" sx={{ mr: 0.5 }} />
                          ) : card.isPositive === false ? (
                            <ArrowDownwardIcon fontSize="small" sx={{ mr: 0.5 }} />
                          ) : null}
                          {card.change}
                        </Typography>
                      )}
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        vs mes anterior
                      </Typography>
                    </Box>
                  </Box>
                  <Avatar 
                    variant="rounded"
                    sx={{ 
                      bgcolor: 'action.hover',
                      width: 56, 
                      height: 56,
                      '& .MuiSvgIcon-root': { fontSize: '2rem' }
                    }}
                  >
                    {card.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filtros y búsqueda */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Estado</InputLabel>
              <Select
                value={filtroEstado}
                onChange={handleFiltroEstado}
                label="Estado"
              >
                <MenuItem value="todos">Todos los estados</MenuItem>
                <MenuItem value="en progreso">En progreso</MenuItem>
                <MenuItem value="completado">Completado</MenuItem>
                <MenuItem value="en revisión">En revisión</MenuItem>
                <MenuItem value="atrasado">Atrasado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Prioridad</InputLabel>
              <Select
                value={filtroPrioridad}
                onChange={(e) => setFiltroPrioridad(e.target.value)}
                label="Prioridad"
              >
                <MenuItem value="todos">Todas las prioridades</MenuItem>
                <MenuItem value="alta">Alta</MenuItem>
                <MenuItem value="media">Media</MenuItem>
                <MenuItem value="baja">Baja</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2} sx={{ textAlign: 'right' }}>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Tooltip title="Exportar">
                <IconButton color="primary" size="small" sx={{ border: '1px solid', borderColor: 'divider' }}>
                  <FileDownloadIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Más filtros">
                <IconButton color="primary" size="small" sx={{ border: '1px solid', borderColor: 'divider' }}>
                  <FilterAltIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabla de solicitudes */}
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: 2 }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="tabla de solicitudes" size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>FOLIO</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>TÍTULO</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>SOLICITANTE</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>FECHA SOLICITUD</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>FECHA REVISIÓN</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>ESTADO</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>COMENTARIOS</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>ACCIÓN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSolicitudes.length > 0 ? (
                filteredSolicitudes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((solicitud) => (
                    <TableRow hover key={solicitud.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {solicitud.folio}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium" noWrap sx={{ maxWidth: '250px' }}>
                          {solicitud.titulo}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar 
                            sx={{ 
                              width: 30, 
                              height: 30, 
                              fontSize: '0.7rem',
                              mr: 1,
                              bgcolor: 'primary.main'
                            }}
                          >
                            {solicitud.solicitante.split(' ').map(n => n[0]).join('')}
                          </Avatar>
                          <Typography variant="body2">
                            {solicitud.solicitante}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(solicitud.fechaSolicitud)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color={solicitud.fechaRevision ? 'text.primary' : 'text.secondary'}>
                          {formatDate(solicitud.fechaRevision)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={solicitud.estado} 
                          color={getEstadoColor(solicitud.estado)}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            fontWeight: 'medium',
                            minWidth: 100,
                            '& .MuiChip-label': { px: 1 }
                          }}
                        />
                        <Chip 
                          label={solicitud.prioridad}
                          size="small"
                          color={getPrioridadColor(solicitud.prioridad)}
                          variant="outlined"
                          sx={{ 
                            ml: 1,
                            fontSize: '0.6rem',
                            height: 20,
                            '& .MuiChip-label': { px: 0.5 }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: '200px' }}>
                          {solicitud.comentarios || 'Sin comentarios'}
                        </Typography>
                        {solicitud.revisadoPor && (
                          <Typography variant="caption" color="text.secondary" display="block">
                            Por: {solicitud.revisadoPor}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuClick(e, solicitud)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body1" color="text.secondary">
                        No se encontraron solicitudes que coincidan con los filtros seleccionados.
                      </Typography>
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        size="small" 
                        sx={{ mt: 2 }}
                        onClick={() => {
                          setSearchTerm('');
                          setFiltroEstado('todos');
                          setFiltroPrioridad('todos');
                        }}
                      >
                        Limpiar filtros
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredSolicitudes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
          }
          sx={{ 
            borderTop: '1px solid',
            borderColor: 'divider',
            '& .MuiTablePagination-toolbar': {
              minHeight: '56px',
            }
          }}
        />
      </Paper>

      {/* Menú de acciones */}
      <Menu
        id="menu-actions"
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleActionClick('ver')}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ver detalles</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionClick('editar')}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar proyecto</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleActionClick('eliminar')}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ color: 'error' }}>
            Eliminar proyecto
          </ListItemText>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default SeguimientoProyectosPage;
