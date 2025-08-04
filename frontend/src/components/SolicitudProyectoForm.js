import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Divider,
  Tooltip
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AttachFileIcon from '@mui/icons-material/AttachFile';

// Opciones para los selectores
const tiposProyectoList = [
  'Investigación',
  'Desarrollo Tecnológico',
  'Innovación',
  'Vinculación',
  'Otro'
];

const areasConocimientoList = [
  'Ciencias Físico-Matemáticas',
  'Ciencias Biológicas',
  'Ciencias de la Salud',
  'Ciencias Sociales',
  'Humanidades',
  'Ingenierías',
  'Ciencias de la Tierra',
  'Biotecnología',
  'Tecnologías de la Información',
  'Otra'
];

const lineasInvestigacionList = [
  'Energías Renovables',
  'Inteligencia Artificial',
  'Medio Ambiente',
  'Salud Pública',
  'Educación',
  'Desarrollo Sostenible',
  'Otra'
];

const metodosComputacionalesList = [
  'Modelado Matemático',
  'Simulación Numérica',
  'Aprendizaje Automático',
  'Procesamiento de Imágenes',
  'Análisis de Datos',
  'Visualización Científica',
  'Cómputo de Alto Rendimiento',
  'Otro'
];

const SolicitudProyectoForm = ({ onSubmit, initialValues = {} }) => {
  // Estado inicial del formulario basado en la entidad Proyecto
  const [formData, setFormData] = useState({
    // Información básica
    tipoProyecto: initialValues.tipoProyecto || 'Investigación',
    nombre: initialValues.nombre || '',
    titulo: initialValues.titulo || '',
    areaConocimiento: initialValues.areaConocimiento || '',
    descripcion: initialValues.descripcion || '',
    
    // Fechas
    fechaSolicitud: initialValues.fechaSolicitud || null,
    fechaFinAprox: initialValues.fechaFinAprox || null,
    tiempoUso: initialValues.tiempoUso || '',
    
    // Detalles del proyecto
    objetivo: initialValues.objetivo || '',
    objetivosEspecificos: initialValues.objetivosEspecificos || [{ id: 1, descripcion: '' }],
    lineaInvestigacion: initialValues.lineaInvestigacion || '',
    palabrasClave: initialValues.palabrasClave || '',
    descripcionTecnica: initialValues.descripcionTecnica || '',
    resultadosEsperados: initialValues.resultadosEsperados || '',
    metodosComputacionales: initialValues.metodosComputacionales || '',
    
    // Responsables
    responsables: initialValues.responsables || [{
      id: 1,
      nombre: '',
      correo: '',
      telefono: ''
    }],
    
    // Documentos
    documentos: initialValues.documentos || [],
    
    // Información adicional
    conacytSi: initialValues.conacytSi || 'No',
    conacytNum: initialValues.conacytNum || '',
    usoRup: initialValues.usoRup || 'No',
    usoCual: initialValues.usoCual || '',
    
    // Status
    proyectoStatusId: initialValues.proyectoStatusId || '1'
  });

  // Opciones para campos de selección
  const tiposProyecto = ['Investigación', 'Desarrollo', 'Innovación', 'Otro'];
  const areasConocimiento = [
    'Ciencias Exactas y Naturales',
    'Ingeniería y Tecnología',
    'Ciencias de la Salud',
    'Ciencias Sociales',
    'Humanidades',
    'Arte y Diseño',
    'Ciencias Agropecuarias',
    'Ciencias de la Educación',
    'Otra'
  ];
  
  const lineasInvestigacion = [
    'Tecnologías de la Información',
    'Inteligencia Artificial',
    'Ciencias de Datos',
    'Robótica',
    'Biotecnología',
    'Energías Renovables',
    'Medio Ambiente',
    'Otra'
  ];
  
  const metodosComputacionalesList = [
    'Simulación numérica',
    'Aprendizaje automático',
    'Procesamiento de imágenes',
    'Análisis de datos',
    'Modelado matemático',
    'Visualización científica',
    'Computación de alto rendimiento',
    'Otro'
  ];

  // Manejador de cambios para campos simples
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.substring(0, 50)
    }));
  };

  // Manejador para fechas
  const handleDateChange = (name) => (date) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
  };

  // Manejador para checkboxes
  const handleCheckboxChange = (name) => (e) => {
    const value = e.target.checked ? 'Sí' : 'No';
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejador para objetivos específicos
  const handleObjetivoChange = (id, value) => {
    const nuevosObjetivos = formData.objetivosEspecificos.map(objetivo =>
      objetivo.id === id ? { ...objetivo, descripcion: value } : objetivo
    );
    setFormData(prev => ({
      ...prev,
      objetivosEspecificos: nuevosObjetivos
    }));
  };

  // Agregar nuevo objetivo específico
  const agregarObjetivo = () => {
    const nuevoId = formData.objetivosEspecificos.length > 0 
      ? Math.max(...formData.objetivosEspecificos.map(o => o.id)) + 1 
      : 1;
    
    setFormData(prev => ({
      ...prev,
      objetivosEspecificos: [...prev.objetivosEspecificos, { id: nuevoId, descripcion: '' }]
    }));
  };

  // Eliminar objetivo específico
  const eliminarObjetivo = (id) => {
    if (formData.objetivosEspecificos.length > 1) {
      setFormData(prev => ({
        ...prev,
        objetivosEspecificos: prev.objetivosEspecificos.filter(objetivo => objetivo.id !== id)
      }));
    }
  };

  // Manejador para responsables
  const handleResponsableChange = (id, field, value) => {
    const nuevosResponsables = formData.responsables.map(responsable =>
      responsable.id === id ? { ...responsable, [field]: value } : responsable
    );
    setFormData(prev => ({
      ...prev,
      responsables: nuevosResponsables
    }));
  };

  // Agregar nuevo responsable
  const agregarResponsable = () => {
    const nuevoId = formData.responsables.length > 0 
      ? Math.max(...formData.responsables.map(r => r.id)) + 1 
      : 1;
    
    setFormData(prev => ({
      ...prev,
      responsables: [...prev.responsables, { 
        id: nuevoId, 
        nombre: '', 
        correo: '', 
        telefono: '' 
      }]
    }));
  };

  // Eliminar responsable
  const eliminarResponsable = (id) => {
    if (formData.responsables.length > 1) {
      setFormData(prev => ({
        ...prev,
        responsables: prev.responsables.filter(responsable => responsable.id !== id)
      }));
    }
  };

  // Manejador para la carga de documentos
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      documentos: [...prev.documentos, ...files]
    }));
  };

  // Eliminar documento
  const eliminarDocumento = (index) => {
    const nuevosDocumentos = [...formData.documentos];
    nuevosDocumentos.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      documentos: nuevosDocumentos
    }));
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    const newErrors = {};
    
    // Validar campos requeridos
    if (!formData.titulo.trim()) newErrors.titulo = 'El título es requerido';
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre del proyecto es requerido';
    
    if (Object.keys(newErrors).length > 0) {
      // Mostrar errores si los hay
      console.error('Errores de validación:', newErrors);
      alert('Por favor complete todos los campos requeridos correctamente');
      return;
    }
    
    // Preparar datos para enviar
    const datosEnvio = {
      ...formData,
      // Si no es CONACYT, limpiar el número
      conacytNum: formData.conacytSi === 'Sí' ? formData.conacytNum : '',
      // Si no se especificó uso de RUP, limpiar el campo
      usoCual: formData.usoRup === 'Sí' ? formData.usoCual : ''
    };
    
    // Si pasa la validación, enviar el formulario
    if (onSubmit) {
      onSubmit(datosEnvio);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Paper 
        component="form" 
        onSubmit={handleSubmit} 
        elevation={3} 
        sx={{ 
          p: 4, 
          maxWidth: 1200, 
          mx: 'auto', 
          my: 4 
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 4, color: '#2d3436', fontWeight: 600, borderBottom: '2px solid #6c5ce7', pb: 1, display: 'inline-block' }}>
          Solicitud de Proyecto
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="tipo-proyecto-label">Tipo de Proyecto</InputLabel>
              <Select
                labelId="tipo-proyecto-label"
                id="tipoProyecto"
                name="tipoProyecto"
                value={formData.tipoProyecto}
                onChange={handleChange}
                label="Tipo de Proyecto"
              >
                {tiposProyecto.map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nombre del Proyecto"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              variant="outlined"
              margin="normal"
            />
          </Grid>
          
          <Grid xs={12} item>
            <TextField
              fullWidth
              label="Título del Proyecto"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              variant="outlined"
              margin="normal"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="area-conocimiento-label">Área de Conocimiento</InputLabel>
              <Select
                labelId="area-conocimiento-label"
                id="areaConocimiento"
                name="areaConocimiento"
                value={formData.areaConocimiento}
                onChange={handleChange}
                label="Área de Conocimiento"
              >
                {areasConocimiento.map((area) => (
                  <MenuItem key={area} value={area}>
                    {area}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="linea-investigacion-label">Línea de Investigación</InputLabel>
              <Select
                labelId="linea-investigacion-label"
                id="lineaInvestigacion"
                name="lineaInvestigacion"
                value={formData.lineaInvestigacion}
                onChange={handleChange}
                label="Línea de Investigación"
              >
                {lineasInvestigacion.map((linea) => (
                  <MenuItem key={linea} value={linea}>
                    {linea}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid xs={12} item>
            <TextField
              fullWidth
              label="Palabras Clave"
              name="palabrasClave"
              value={formData.palabrasClave}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              helperText="Separe las palabras clave con comas"
            />
          </Grid>
          
          <Grid xs={12} item>
            <TextField
              fullWidth
              label="Descripción del Proyecto"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          
          <Grid xs={12} item>
            <TextField
              fullWidth
              label="Objetivo General"
              name="objetivo"
              value={formData.objetivo}
              onChange={handleChange}
              required
              multiline
              rows={2}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          
          <Grid xs={12} item>
            <TextField
              fullWidth
              label="Descripción Técnica"
              name="descripcionTecnica"
              value={formData.descripcionTecnica}
              onChange={handleChange}
              multiline
              rows={3}
              variant="outlined"
              margin="normal"
              helperText="Describa los aspectos técnicos del proyecto"
            />
          </Grid>
          
          <Grid xs={12} item>
            <TextField
              fullWidth
              label="Resultados Esperados"
              name="resultadosEsperados"
              value={formData.resultadosEsperados}
              onChange={handleChange}
              multiline
              rows={3}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="metodos-computacionales-label">Métodos Computacionales</InputLabel>
              <Select
                labelId="metodos-computacionales-label"
                id="metodosComputacionales"
                name="metodosComputacionales"
                value={formData.metodosComputacionales}
                onChange={handleChange}
                label="Métodos Computacionales"
              >
                {metodosComputacionalesList.map((metodo) => (
                  <MenuItem key={metodo} value={metodo}>
                    {metodo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
              <DatePicker
                label="Fecha de Inicio"
                value={formData.fechaInicio}
                onChange={handleDateChange('fechaInicio')}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    fullWidth 
                    required 
                    margin="normal" 
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
              <DatePicker
                label="Fecha de Término Aprox."
                value={formData.fechaFinAprox}
                onChange={handleDateChange('fechaFinAprox')}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    fullWidth 
                    required 
                    margin="normal" 
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Tiempo de Uso (meses)"
              name="tiempoUso"
              type="number"
              value={formData.tiempoUso}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              inputProps={{ min: 1 }}
            />
          </Grid>
        </Grid>
        
        {/* Sección de Información Adicional */}
        <Box sx={{ mb: 4, p: 3, bgcolor: '#f8f9fa', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, color: '#2d3436' }}>
          Información Adicional
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={formData.conacytSi} 
                    onChange={handleCheckboxChange('conacytSi')} 
                    name="conacytSi"
                    color="primary"
                  />
                }
                label="¿Es un proyecto CONACYT?"
              />
              {formData.conacytSi && (
                <TextField
                  fullWidth
                  label="Número de Proyecto CONACYT"
                  name="conacytNum"
                  value={formData.conacytNum}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  required={formData.conacytSi}
                  error={formData.conacytSi && !formData.conacytNum.trim()}
                  helperText={formData.conacytSi && !formData.conacytNum.trim() ? 'El número de proyecto es requerido' : ''}
                />
              )}
            </FormGroup>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={formData.usoRup} 
                    onChange={handleCheckboxChange('usoRup')} 
                    name="usoRup"
                    color="primary"
                  />
                }
                label="¿Utilizará RUP (Recursos de Uso Público)?"
              />
              {formData.usoRup && (
                <TextField
                  fullWidth
                  label="Especifique qué recursos"
                  name="usoCual"
                  value={formData.usoCual}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  helperText="Describa los recursos de uso público que utilizará"
                />
              )}
            </FormGroup>
          </Grid>
        </Grid>
      </Box>
      
      {/* Sección de Objetivos Específicos */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, color: '#2d3436', borderBottom: '1px solid #dfe6e9', pb: 1 }}>
          Objetivos Específicos
        </Typography>
        
        {formData.objetivosEspecificos.map((objetivo, index) => (
          <Box key={objetivo.id} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
            <TextField
              fullWidth
              label={`Objetivo Específico ${index + 1}`}
              value={objetivo.descripcion}
              onChange={(e) => handleObjetivoChange(objetivo.id, e.target.value)}
              required
              multiline
              rows={2}
              variant="outlined"
              margin="normal"
              sx={{ flexGrow: 1, mr: 2 }}
            />
            <IconButton 
              onClick={() => eliminarObjetivo(objetivo.id)}
              disabled={formData.objetivosEspecificos.length <= 1}
              sx={{ mt: 2 }}
              color="error"
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        ))}
        
        <Button
          startIcon={<AddCircleOutlineIcon />}
          onClick={agregarObjetivo}
          variant="outlined"
          sx={{ mt: 1, mb: 3 }}
        >
          Agregar Objetivo Específico
        </Button>
        
        {formData.objetivosEspecificos.every(obj => !obj.descripcion.trim()) && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            Debe agregar al menos un objetivo específico
          </Typography>
        )}
        </Box>
        
        {/* Sección de Responsables */}
        <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, color: '#2d3436', borderBottom: '1px solid #dfe6e9', pb: 1 }}>
          Responsables del Proyecto
        </Typography>
        
        {formData.responsables.map((responsable, index) => (
          <Box key={responsable.id} sx={{ mb: 3, p: 2, border: '1px solid #dfe6e9', borderRadius: 1, bgcolor: index === 0 ? '#f8f9fa' : 'transparent' }}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: '#2d3436', fontWeight: 600 }}>
              Responsable {index + 1}{index === 0 ? ' (Principal)' : ''}
            </Typography>
            <Grid container spacing={2}>
              <Grid xs={12} md={4} item>
                <TextField
                  fullWidth
                  label="Nombre del Responsable"
                  value={responsable.nombre}
                  onChange={(e) => handleResponsableChange(responsable.id, 'nombre', e.target.value)}
                  required
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  type="email"
                  value={responsable.correo}
                  onChange={(e) => handleResponsableChange(responsable.id, 'correo', e.target.value)}
                  required
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid xs={12} md={3} item>
                <TextField
                  fullWidth
                  label="Teléfono"
                  value={responsable.telefono}
                  onChange={(e) => handleResponsableChange(responsable.id, 'telefono', e.target.value)}
                  required
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid xs={12} md={1} item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton 
                  onClick={() => eliminarResponsable(responsable.id)}
                  disabled={formData.responsables.length <= 1}
                  color="error"
                  sx={{ mt: 1 }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}
        
        <Button
          startIcon={<AddCircleOutlineIcon />}
          onClick={agregarResponsable}
          variant="outlined"
          sx={{ mt: 1 }}
        >
          Agregar Responsable
        </Button>
        
        {!formData.responsables.every(r => r.nombre.trim() && r.correo.trim() && r.telefono.trim()) && (
          <Typography variant="body2" color="error" sx={{ mt: 1, display: 'block' }}>
            Todos los campos de los responsables son obligatorios
          </Typography>
        )}
        </Box>
        
        {/* Sección de Documentos */}
        <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, color: '#2d3436', borderBottom: '1px solid #dfe6e9', pb: 1 }}>
          Documentos Adjuntos
        </Typography>
        
        <input
          accept=".pdf,.doc,.docx"
          style={{ display: 'none' }}
          id="documentos-adjuntos"
          multiple
          type="file"
          onChange={handleFileChange}
        />
        
        <label htmlFor="documentos-adjuntos">
          <Button
            variant="outlined"
            component="span"
            startIcon={<AttachFileIcon />}
            sx={{ mb: 2 }}
          >
            Seleccionar Archivos
          </Button>
        </label>
        
        {formData.documentos.length > 0 ? (
          <List dense sx={{ mt: 1, border: '1px dashed #dfe6e9', borderRadius: 1, p: 1 }}>
            {formData.documentos.map((doc, index) => (
              <ListItem 
                key={index} 
                secondaryAction={
                  <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      eliminarDocumento(index);
                    }}
                    size="small"
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                }
                sx={{
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                  borderRadius: 1,
                  pr: 6
                }}
              >
                <AttachFileIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                <ListItemText
                  primary={doc.name || `Documento ${index + 1}`}
                  primaryTypographyProps={{
                    variant: 'body2',
                    sx: {
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '500px'
                    }
                  }}
                  secondary={`${(doc.size / 1024).toFixed(2)} KB`}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ 
            border: '1px dashed #dfe6e9', 
            borderRadius: 1, 
            p: 3, 
            textAlign: 'center',
            bgcolor: '#f8f9fa'
          }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              No hay documentos adjuntos
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Arrastra archivos aquí o haz clic en "Seleccionar Archivos"
            </Typography>
          </Box>
        )}
        
        <Typography variant="caption" display="block" sx={{ mt: 1, color: '#636e72' }}>
          Formatos aceptados: .pdf, .doc, .docx (Tamaño máximo por archivo: 5MB)
        </Typography>
      </Box>
      
      {/* Botones de acción */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mt: 6,
        pt: 3,
        borderTop: '1px solid #dfe6e9'
      }}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => window.history.back()}
          sx={{ minWidth: 120 }}
        >
          Cancelar
        </Button>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            sx={{ minWidth: 180 }}
          >
            Guardar Borrador
          </Button>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ minWidth: 180, fontWeight: 600 }}
          >
            Enviar Solicitud
          </Button>
        </Box>
      </Box>
    </Paper>
    </LocalizationProvider>
  );
};

export default SolicitudProyectoForm;
