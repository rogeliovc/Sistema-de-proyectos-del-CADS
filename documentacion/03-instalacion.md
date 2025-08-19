# 3. Guía de Instalación

## 3.1 Requisitos Previos

### 3.1.1 Hardware Mínimo
- CPU: 2 núcleos
- RAM: 4GB
- Almacenamiento: 10GB de espacio libre

### 3.1.2 Software Requerido
- Sistema Operativo: Linux/Windows/macOS
- Java JDK 11 o superior (17 recomendado)
- Node.js 16.x o superior
- PostgreSQL 13 o superior
- Maven 3.6 o superior
- Git

## 3.2 Instalación del Backend

### 3.2.1 Clonar el Repositorio
Primero, clonamos el repositorio del proyecto desde GitHub:

```bash
git clone https://github.com/tu-usuario/Sistema-de-proyectos-del-CADS.git
cd Sistema-de-proyectos-del-CADS/backend
```

### 3.2.2 Configurar Base de Datos
1. **Crear la base de datos**:
   Asegúrate de tener PostgreSQL instalado y en ejecución. Luego crea una nueva base de datos:
   ```bash
   createdb cads_proyectos
   ```

2. **Configurar credenciales**:
   Copia el archivo de configuración de ejemplo y ajusta los valores según tu entorno:
   ```bash
   cp src/main/resources/application.example.properties src/main/resources/application.properties
   ```

   Edita el archivo `application.properties` y configura al menos estas propiedades:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/cads_proyectos
   spring.datasource.username=tu_usuario
   spring.datasource.password=tu_contraseña
   ```

### 3.2.3 Construir y Ejecutar
Compila y ejecuta la aplicación Spring Boot:

```bash
# Limpiar y compilar el proyecto
mvn clean install

# Iniciar la aplicación
mvn spring-boot:run
```

> **Nota:** La primera vez que ejecutes la aplicación, Spring Boot creará automáticamente las tablas necesarias en la base de datos (si no existen).

## 3.3 Instalación del Frontend

### 3.3.1 Instalar Dependencias
El frontend es una aplicación React que requiere Node.js y npm. Navega al directorio del frontend e instala las dependencias:

```bash
cd frontend
npm install
```

### 3.3.2 Iniciar la Aplicación
Inicia el servidor de desarrollo de React:

```bash
npm start
```

Esto abrirá automáticamente tu navegador en http://localhost:3000

## 3.4 Verificación de la Instalación

### 3.4.1 Verificar Backend
1. Abre tu navegador o cliente HTTP favorito (como Postman)
2. Accede a: http://localhost:8080
3. Deberías ver una denegacion de acceso ya que los endpoints estan cifrados y no un error 404

### 3.4.2 Verificar Frontend
1. Abre tu navegador web
2. Navega a: http://localhost:3000
3. Deberías ver una landing page

## 3.5 Configuración de Usuario Inicial

1. una vez en la landing page dirigite a registrar e ingresa los datos necesarios

2. una vez registrado inicia sesión con los datos que acabo de registrar y podras ver el dashboard

## 3.6 Problemas de Base de Datos
- Verificar que PostgreSQL esté en ejecución
- Comprobar las credenciales en application.properties
- Verificar los permisos del usuario de la base de datos

## 3.7 Problemas de Dependencias
```bash
# En el directorio del backend
mvn clean install -U

# En el directorio del frontend
rm -rf node_modules package-lock.json
npm install
```
