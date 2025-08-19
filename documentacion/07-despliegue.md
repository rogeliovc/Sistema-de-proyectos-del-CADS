# 7. Guía de Despliegue

## 7.1 Requisitos del Servidor

### 7.1.1 Especificaciones Mínimas
- **Sistema Operativo**: Ubuntu 20.04 LTS
- **CPU**: 2 núcleos
- **Memoria RAM**: 4GB
- **Almacenamiento**: 20GB SSD
- **Conexión a Internet**: 10Mbps

### 7.1.2 Puertos Necesarios
- **80/443**: HTTP/HTTPS (Nginx)
- **8080**: Aplicación Spring Boot
- **5432**: PostgreSQL
- **22**: SSH (opcional, recomendado)

## 7.2 Configuración del Servidor

### 7.2.1 Actualización del Sistema
```bash
sudo apt update && sudo apt upgrade -y
```

### 7.2.2 Instalación de Dependencias
```bash
# Instalar Java 11
sudo apt install -y openjdk-11-jdk

# Instalar Node.js 16.x
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar Nginx
sudo apt install -y nginx

# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Instalar Maven
sudo apt install -y maven

# Instalar Git
sudo apt install -y git
```

## 7.3 Configuración de la Base de Datos

### 7.3.1 Crear Usuario y Base de Datos
```bash
sudo -u postgres psql -c "CREATE USER cads_user WITH PASSWORD 'una_contraseña_segura';"
sudo -u postgres psql -c "CREATE DATABASE cads_proyectos OWNER cads_user;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE cads_proyectos TO cads_user;"
```

### 7.3.2 Configuración de PostgreSQL
1. Editar el archivo de configuración:
   ```bash
   sudo nano /etc/postgresql/12/main/postgresql.conf
   ```
   Asegúrate de que tenga estas líneas:
   ```
   listen_addresses = 'localhost'
   ```

2. Configurar el acceso remoto (opcional):
   ```bash
   sudo nano /etc/postgresql/12/main/pg_hba.conf
   ```
   Añadir:
   ```
   host    all             all             0.0.0.0/0               md5
   ```

3. Reiniciar PostgreSQL:
   ```bash
   sudo systemctl restart postgresql
   ```

## 7.4 Despliegue del Backend

### 7.4.1 Clonar el Repositorio
```bash
cd /opt
sudo git clone https://github.com/tu-usuario/Sistema-de-proyectos-del-CADS.git
sudo chown -R $USER:$USER Sistema-de-proyectos-del-CADS/
cd Sistema-de-proyectos-del-CADS/backend
```

### 7.4.2 Configurar la Aplicación
1. Copiar y editar el archivo de configuración:
   ```bash
   cp src/main/resources/application.properties.template src/main/resources/application.properties
   nano src/main/resources/application.properties
   ```

2. Configurar las propiedades de la base de datos:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/cads_proyectos
   spring.datasource.username=cads_user
   spring.datasource.password=una_contraseña_segura
   
   # Configuración de JWT
   app.jwtSecret=secreto_muy_seguro_para_jwt
   app.jwtExpirationMs=86400000
   
   # Configuración del servidor
   server.port=8080
   server.servlet.context-path=/api
   ```

### 7.4.3 Construir la Aplicación
```bash
mvn clean package -DskipTests
```

### 7.4.4 Iniciar la Aplicación
```bash
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

## 7.5 Despliegue del Frontend

### 7.5.1 Instalar Dependencias y Construir
```bash
cd /opt/Sistema-de-proyectos-del-CADS/frontend
npm install
npm run build
```

### 7.5.2 Configurar Nginx
1. Crear un archivo de configuración para Nginx:
   ```bash
   sudo nano /etc/nginx/sites-available/cads
   ```

2. Agregar la siguiente configuración:
   ```nginx
   server {
       listen 80;
       server_name tu-dominio.com www.tu-dominio.com;
       
       # Redireccionar HTTP a HTTPS
       return 301 https://$host$request_uri;
   }
   
   server {
       listen 443 ssl http2;
       server_name tu-dominio.com www.tu-dominio.com;
       
       # Configuración SSL (reemplaza con tus rutas)
       ssl_certificate /etc/letsencrypt/live/tu-dominio.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/tu-dominio.com/privkey.pem;
       
       # Configuración de SSL
       ssl_protocols TLSv1.2 TLSv1.3;
       ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384';
       ssl_prefer_server_ciphers on;
       ssl_session_cache shared:SSL:10m;
       
       # Configuración de seguridad
       add_header X-Frame-Options "SAMEORIGIN";
       add_header X-Content-Type-Options nosniff;
       add_header X-XSS-Protection "1; mode=block";
       
       # Archivos estáticos del frontend
       root /opt/Sistema-de-proyectos-del-CADS/frontend/build;
       index index.html;
       
       # Servir archivos estáticos
       location / {
           try_files $uri /index.html;
       }
       
       # Proxy para la API del backend
       location /api/ {
           proxy_pass http://localhost:8080/api/;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
       
       # Deshabilitar el acceso a archivos ocultos
       location ~ /\. {
           deny all;
       }
   }
   ```

3. Habilitar el sitio y reiniciar Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/cads /etc/nginx/sites-enabled/
   sudo nginx -t  # Verificar la sintaxis
   sudo systemctl restart nginx
   ```

## 7.6 Monitoreo y Mantenimiento

### 7.6.1 Verificar Estado de los Servicios
```bash
sudo systemctl status cads-backend
sudo systemctl status nginx
sudo systemctl status postgresql
```

### 7.6.2 Ver Logs
```bash
# Backend
journalctl -u cads-backend -f

# Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# PostgreSQL
sudo tail -f /var/log/postgresql/postgresql-12-main.log
```

### 7.6.3 Actualización de la Aplicación
1. Detener el servicio:
   ```bash
   sudo systemctl stop cads-backend
   ```

2. Actualizar el código:
   ```bash
   cd /opt/Sistema-de-proyectos-del-CADS
   git pull origin main
   ```

3. Reconstruir y reiniciar:
   ```bash
   cd backend
   mvn clean package -DskipTests
   cd ../frontend
   npm run build
   sudo systemctl start cads-backend
   ```

# Actualizar el sistema regularmente
sudo apt update && sudo apt upgrade -y

# Configurar actualizaciones automáticas de seguridad
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```
