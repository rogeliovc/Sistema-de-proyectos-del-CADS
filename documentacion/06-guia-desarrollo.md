# 6. Guía de Desarrollo

## 6.1 Configuración del Entorno

### 6.1.1 Requisitos
- Java JDK 11 o superior
- Node.js 16.x o superior
- Maven 3.6 o superior
- PostgreSQL 13 o superior
- Git
- IDE (IntelliJ IDEA, VS Code, etc.)

### 6.1.2 Configuración del IDE (Puede usar el de su agrado)

#### IntelliJ IDEA (Backend)
1. Abre el proyecto como proyecto Maven
2. Configura el JDK:
   - File > Project Structure > Project Settings > Project > SDK
   - Selecciona JDK 11 o superior
3. Habilita anotaciones de Lombok:
   - Settings > Build, Execution, Deployment > Compiler > Annotation Processors
   - Marca "Enable annotation processing"

#### VS Code (Frontend)
1. Instala las extensiones recomendadas:
   - ESLint
   - Prettier - Code formatter
   - ES7+ React/Redux/React-Native snippets
   - JavaScript (ES6) code snippets

## 6.2 Estándares de Código

### 6.2.1 Backend (Java)
- Sigue las [Java Code Conventions](https://www.oracle.com/java/technologies/javase/codeconventions-introduction.html)
- Usa nombres descriptivos para clases, métodos y variables
- Documenta las clases y métodos públicos con Javadoc
- Mantén las clases pequeñas y con una sola responsabilidad
- Usa inyección de dependencias

**Ejemplo de documentación Javadoc:**
```java
/**
 * Servicio para la gestión de proyectos.
 */
@Service
public class ProyectoService {
    
    /**
     * Crea un nuevo proyecto.
     *
     * @param proyectoDto Datos del proyecto a crear
     * @return Proyecto creado
     * @throws ResourceNotFoundException Si el usuario asignado no existe
     */
    public Proyecto crearProyecto(ProyectoDto proyectoDto) {
        // Implementación
    }
}
```

### 6.2.2 Frontend (JavaScript/React)
- Sigue las [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Usa componentes funcionales con Hooks
- Mantén los componentes pequeños y reutilizables
- Usa PropTypes para validación de props
- Separa la lógica de negocio de los componentes de presentación

**Ejemplo de componente React:**
```jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente para mostrar una tarjeta de proyecto.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.titulo - Título del proyecto
 * @param {string} props.descripcion - Descripción del proyecto
 * @param {string} props.estado - Estado actual del proyecto
 */
const ProyectoCard = ({ titulo, descripcion, estado }) => (
  <div className="proyecto-card">
    <h3>{titulo}</h3>
    <p>{descripcion}</p>
    <span className={`estado-badge estado-${estado.toLowerCase()}`}>
      {estado}
    </span>
  </div>
);

ProyectoCard.propTypes = {
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string,
  estado: PropTypes.oneOf(['PENDIENTE', 'EN_PROGRESO', 'COMPLETADO']).isRequired
};

export default ProyectoCard;
```

## 6.3 Flujo de Trabajo con Git

### 6.3.1 Ramas
- `main` - Rama principal, código estable
- `develop` - Rama de integración
- `feature/*` - Para nuevas características
- `bugfix/*` - Para corrección de errores
- `hotfix/*` - Para correcciones críticas en producción

### 6.3.2 Convención de Commits
Usamos [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` Nueva característica
- `fix:` Corrección de error
- `docs:` Cambios en la documentación
- `style:` Cambios de formato (punto y coma, indentación, etc.)
- `refactor:` Cambios que no corrigen errores ni agregan características
- `perf:` Cambios que mejoran el rendimiento
- `test:` Agregar o corregir pruebas
- `chore:` Cambios en el proceso de construcción o herramientas auxiliares

**Ejemplos:**
```
feat: agregar autenticación con JWT
fix: corregir error al guardar proyectos
chore: actualizar dependencias
docs: actualizar guía de instalación
```

## 6.4 Pruebas

### 6.4.1 Backend (JUnit 5)
- Las pruebas unitarias van en `src/test/java`
- Usa `@SpringBootTest` para pruebas de integración
- Usa Mockito para simular dependencias

**Ejemplo de prueba unitaria:**
```java
@ExtendWith(MockitoExtension.class)
class ProyectoServiceTest {
    
    @Mock
    private ProyectoRepository proyectoRepository;
    
    @InjectMocks
    private ProyectoService proyectoService;
    
    @Test
    void crearProyecto_ConDatosValidos_RetornaProyectoCreado() {
        // Arrange
        ProyectoDto dto = new ProyectoDto("Nuevo Proyecto", "Descripción");
        Proyecto proyectoGuardado = new Proyecto(1L, "Nuevo Proyecto", "Descripción");
        
        when(proyectoRepository.save(any(Proyecto.class))).thenReturn(proyectoGuardado);
        
        // Act
        Proyecto resultado = proyectoService.crearProyecto(dto);
        
        // Assert
        assertNotNull(resultado);
        assertEquals("Nuevo Proyecto", resultado.getNombre());
        verify(proyectoRepository).save(any(Proyecto.class));
    }
}
```

### 6.4.2 Frontend (Jest + React Testing Library)
- Las pruebas van en archivos `*.test.js` junto a los componentes
- Prueba la renderización y el comportamiento de los componentes

**Ejemplo de prueba de componente:**
```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProyectoCard from './ProyectoCard';

describe('ProyectoCard', () => {
  it('debe mostrar el título y descripción del proyecto', () => {
    render(
      <ProyectoCard 
        titulo="Proyecto de Prueba" 
        descripcion="Esta es una descripción de prueba"
        estado="EN_PROGRESO"
      />
    );
    
    expect(screen.getByText('Proyecto de Prueba')).toBeInTheDocument();
    expect(screen.getByText('Esta es una descripción de prueba')).toBeInTheDocument();
    expect(screen.getByText('EN_PROGRESO')).toHaveClass('estado-en_progreso');
  });
});
```

## 6.5 Despliegue

### 6.5.1 Construir para Producción

**Backend:**
```bash
cd backend
mvn clean package -DskipTests
```

**Frontend:**
```bash
cd frontend
npm run build
```

## 6.6 Monitoreo y Logging

### 6.6.1 Backend
- Se usa SLF4J con Logback
- Los logs se guardan en `logs/application.log`
- Configuración en `logback-spring.xml`

### 6.6.2 Frontend
- Usa la consola del navegador para desarrollo
- Para producción, considera integrar un servicio como Sentry

## 6.7 Seguridad

### 6.7.1 Backend
- Todas las peticiones requieren autenticación excepto los endpoints públicos
- Usa CORS configurado para orígenes específicos
- Validación de entrada en todos los endpoints
- Protección contra CSRF

### 6.7.2 Frontend
- Almacenamiento seguro de tokens (httpOnly cookies)
- Validación de formularios del lado del cliente
- Manejo seguro de errores

## 6.8 Rendimiento

### 6.8.1 Backend
- Uso de caché con Spring Cache
- Consultas optimizadas con índices apropiados
- Paginación en consultas que devuelven muchos registros

### 6.8.2 Frontend
- Carga perezosa de rutas
- Optimización de imágenes
- Uso de React.memo para componentes costosos
- Code splitting con React.lazy y Suspense
