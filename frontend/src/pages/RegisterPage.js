import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Link,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff, ArrowBack, Person, School, Work, ContactMail, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const RegisterContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#f8f9fa',
  padding: '20px',
});

const RegisterForm = styled(Paper)({
  padding: '32px',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '500px',
  backgroundColor: '#fff',
  position: 'relative',
});

const FormTitle = styled(Typography)({
  color: '#1a237e',
  fontWeight: '600',
  marginBottom: '24px',
  textAlign: 'center',
  fontSize: '1.5rem',
});

const BackButton = styled(IconButton)({
  position: 'absolute',
  top: '20px',
  left: '20px',
  color: '#5f6368',
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Información personal
    codigo: '',
    nombre: '',
    apellido1: '',
    apellido2: '',
    situacionAcademica: '',
    institucion: '',
    departamento: '',
    puesto: '',
    ciudad: '',
    estado: '',
    correo: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    // Campos adicionales
    esUsuario: 'S', // Valor por defecto
    usuarioAnterior: '',
    // Términos y condiciones
    acceptTerms: false
  });

  // Opciones para los select
  const situacionAcademicaOptions = [
    { value: 'Estudiante', label: 'Estudiante' },
    { value: 'Egresado', label: 'Egresado' },
    { value: 'Docente', label: 'Docente' },
    { value: 'Investigador', label: 'Investigador' },
    { value: 'Otro', label: 'Otro' }
  ];

  const estadoOptions = [
    { value: 'Aguascalientes', label: 'Aguascalientes' },
    { value: 'Baja California', label: 'Baja California' }, 
    { value: 'Baja California Sur', label: 'Baja California Sur' },
    { value: 'Campeche', label: 'Campeche' },
    { value: 'Chiapas', label: 'Chiapas' },
    { value: 'Chihuahua', label: 'Chihuahua' },
    { value: 'Coahuila', label: 'Coahuila' },
    { value: 'Colima', label: 'Colima' },
    { value: 'Durango', label: 'Durango' },
    { value: 'Guanajuato', label: 'Guanajuato' },
    { value: 'Guerrero', label: 'Guerrero' },
    { value: 'Hidalgo', label: 'Hidalgo' },
    { value: 'Jalisco', label: 'Jalisco' },
    { value: 'Michoacan', label: 'Michoacan' },
    { value: 'Morelos', label: 'Morelos' },
    { value: 'Nayarit', label: 'Nayarit' },
    { value: 'Nuevo Leon', label: 'Nuevo Leon' },
    { value: 'Oaxaca', label: 'Oaxaca' },
    { value: 'Puebla', label: 'Puebla' },
    { value: 'Queretaro', label: 'Queretaro' },
    { value: 'Quintana Roo', label: 'Quintana Roo' },
    { value: 'San Luis Potosi', label: 'San Luis Potosi' },
    { value: 'Sinaloa', label: 'Sinaloa' },
    { value: 'Sonora', label: 'Sonora' },
    { value: 'Tabasco', label: 'Tabasco' },
    { value: 'Tamaulipas', label: 'Tamaulipas' },
    { value: 'Tlaxcala', label: 'Tlaxcala' },
    { value: 'Veracruz', label: 'Veracruz' },
    { value: 'Yucatan', label: 'Yucatan' },
    { value: 'Zacatecas', label: 'Zacatecas' },
    // Agrega más estados según sea necesario
  ];
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    if (!formData.acceptTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    try {
      // Preparar los datos para enviar al backend
      const userData = {
        codigo: formData.codigo,
        nombre: formData.nombre,
        apellido1: formData.apellido1,
        apellido2: formData.apellido2,
        situacionAcademica: formData.situacionAcademica,
        institucion: formData.institucion,
        departamento: formData.departamento,
        puesto: formData.puesto,
        ciudad: formData.ciudad,
        estado: formData.estado,
        correo: formData.correo,
        telefono: formData.telefono,
        esUsuario: formData.esUsuario,
        usuarioAnterior: formData.usuarioAnterior,
        password: formData.password,
        // El backend se encargará de asignar los roles
      };

      console.log('Enviando datos al servidor:', userData);

      // Llamada a la API de registro
      const response = await fetch('http://localhost:8080/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include' // Importante para manejar cookies de sesión si las usas
      });

      const responseData = await response.text();
      
      if (response.ok) {
        console.log('Registro exitoso:', responseData);
        // Redirigir a la página de inicio de sesión con mensaje de éxito
        navigate('/login', { 
          state: { 
            registrationSuccess: true,
            message: '¡Registro exitoso! Por favor inicia sesión.'
          } 
        });
      } else {
        console.error('Error en el registro:', responseData);
        // Intentar parsear la respuesta como JSON, si falla, mostrar el texto plano
        try {
          const errorData = JSON.parse(responseData);
          alert(errorData.message || 'Error en el registro');
        } catch (e) {
          alert(responseData || 'Error en el registro');
        }
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('Error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <RegisterContainer>
      <RegisterForm elevation={3}>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </BackButton>
        
        <FormTitle variant="h5" component="h1">
          Registro de Usuario
        </FormTitle>
        
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
          Complete el formulario para crear una nueva cuenta
        </Typography>
        
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/* Sección 1: Información Básica */}
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, color: '#1a237e', fontWeight: 'bold' }}>
            Información Personal
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Código"
              name="codigo"
              variant="outlined"
              fullWidth
              required
              size="small"
              value={formData.codigo}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
            <TextField
              label="Nombre(s)"
              name="nombre"
              variant="outlined"
              fullWidth
              required
              size="small"
              value={formData.nombre}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Primer Apellido"
              name="apellido1"
              variant="outlined"
              fullWidth
              required
              size="small"
              value={formData.apellido1}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
            <TextField
              label="Segundo Apellido"
              name="apellido2"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.apellido2}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <TextField
              select
              label="Situación Académica"
              name="situacionAcademica"
              variant="outlined"
              fullWidth
              required
              size="small"
              value={formData.situacionAcademica}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            >
              {situacionAcademicaOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          
          {/* Sección 2: Información Institucional */}
          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, color: '#1a237e', fontWeight: 'bold' }}>
            Información Institucional
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Institución"
              name="institucion"
              variant="outlined"
              fullWidth
              required
              size="small"
              value={formData.institucion}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
            <TextField
              label="Departamento"
              name="departamento"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.departamento}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Puesto"
              name="puesto"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.puesto}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Box>
          
          {/* Sección 3: Información de Contacto */}
          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, color: '#1a237e', fontWeight: 'bold' }}>
            Información de Contacto
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Correo Electrónico"
              name="correo"
              type="email"
              variant="outlined"
              fullWidth
              required
              size="small"
              value={formData.correo}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
            <TextField
              label="Teléfono"
              name="telefono"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.telefono}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Ciudad"
              name="ciudad"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.ciudad}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
            <TextField
              select
              label="Estado"
              name="estado"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.estado}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            >
              {estadoOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          
          {/* Sección 4: Seguridad */}
          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, color: '#1a237e', fontWeight: 'bold' }}>
            Seguridad
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Contraseña"
              name="password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              required
              size="small"
              value={formData.password}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirmar Contraseña"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              required
              size="small"
              value={formData.confirmPassword}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          {/* Sección 5: Términos y Condiciones */}
          <Box sx={{ 
            backgroundColor: '#f5f7fa', 
            p: 2, 
            borderRadius: '8px',
            mb: 2
          }}>
            <FormControlLabel
              control={
                <Checkbox 
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  color="primary"
                  size="small"
                  required
                />
              }
              label={
                <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                  Acepto los términos y condiciones de uso y la política de privacidad
                </Typography>
              }
              sx={{ 
                display: 'flex',
                alignItems: 'flex-start',
                m: 0,
                '& .MuiFormControlLabel-label': {
                  fontSize: '0.875rem',
                }
              }}
            />
          </Box>
          
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ 
              py: 1.25,
              mb: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: '500',
              borderRadius: '8px',
              backgroundColor: '#1a73e8',
              '&:hover': {
                backgroundColor: '#1557b0',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              },
            }}
          >
            Registrarse
          </Button>
          
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              color: '#5f6368',
              fontSize: '0.875rem',
            }}
          >
            ¿Ya tienes una cuenta?{' '}
            <Link 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}
              sx={{ 
                textDecoration: 'none',
                color: '#1a73e8',
                fontWeight: '500',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              Inicia sesión
            </Link>
          </Typography>
        </form>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default RegisterPage;
