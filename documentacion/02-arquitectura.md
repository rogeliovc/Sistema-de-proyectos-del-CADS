# 2. Arquitectura del Sistema

## 2.1 Visión General
El sistema sigue una arquitectura cliente-servidor con las siguientes capas principales:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Frontend      │◄───►│   Backend       │◄───►│   Base de       │
│   (React)       │     │   (Spring Boot) │     │   Datos         │
│                 │     │                 │     │   (PostgreSQL)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## 2.2 Frontend

### 2.2.1 Estructura de Carpetas
```
frontend/
├── public/             # Archivos estáticos
└── src/
    ├── components/     # Componentes reutilizables
    ├── pages/          # Componentes de página
    ├── contexts/       # Manejo de estado global
    ├── services/       # Llamadas a la API
    └── styles/         # Estilos globales
```

### 2.2.2 Tecnologías Clave
- React 18+
- React Router v6
- Axios para peticiones HTTP
- Context API para gestión de estado
- CSS Modules para estilos

## 2.3 Backend

### 2.3.1 Estructura del Proyecto
```
backend/
└── src/main/java/com/cads/
    ├── config/         # Configuraciones
    ├── controllers/    # Controladores REST
    ├── models/         # Entidades
    ├── repositories/   # Acceso a datos
    ├── security/      # Configuración de seguridad
    └── services/      # Lógica de negocio
```

### 2.3.2 Tecnologías Clave
- Spring Boot 2.7.x
- Spring Security
- Spring Data JPA
- JWT para autenticación
- Lombok

## 2.4 Base de Datos

### 2.4.1 Esquema Principal

#### Usuarios
- Almacena información de usuarios y credenciales

#### Proyectos
- Almacena la información de los proyectos

#### Tareas
- Gestiona las tareas asociadas a los proyectos

## 2.5 Seguridad

### 2.5.1 Autenticación
- Basada en JWT (JSON Web Tokens)
- Tokens de refresco
- Expiración configurable

### 2.5.2 Autorización
- Basada en roles (ROLE_ADMIN, ROLE_USER)
- Control de acceso a nivel de método
- Protección CSRF

## 2.6 API REST
- Estilo RESTful
- Formato JSON
- Versionado de API
