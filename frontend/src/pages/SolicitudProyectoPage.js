import React from 'react';
import { Container, Box } from '@mui/material';
import SolicitudProyectoForm from '../components/SolicitudProyectoForm';

const SolicitudProyectoPage = () => {
  const handleSubmit = (formData) => {
    // Aquí manejaremos el envío del formulario
    console.log('Datos del formulario:', formData);
    // Aquí podrías hacer una llamada a tu API para guardar los datos
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <SolicitudProyectoForm onSubmit={handleSubmit} />
      </Box>
    </Container>
  );
};

export default SolicitudProyectoPage;
