package com.cads.controllers;

import com.cads.entities.Usuario;
import com.cads.services.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Usuario", description = "API para el manejo de usuarios")
public class UsuarioController {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioController.class);

    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/registro")
    @Operation(summary = "Registrar un nuevo usuario", description = "Crea una nueva cuenta de usuario con los datos proporcionados")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario registrado exitosamente", 
                    content = { @Content(mediaType = "application/json", 
                    schema = @Schema(implementation = Usuario.class)) }),
        @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos", 
                    content = @Content),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor", 
                    content = @Content) 
    })
    public ResponseEntity<?> registrarUsuario(@Valid @RequestBody Usuario usuario) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            logger.info("Iniciando registro de usuario con correo: {}", usuario.getCorreo());
            
            // Validar que el correo y la contraseña no estén vacíos
            if (usuario.getCorreo() == null || usuario.getCorreo().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "El correo es obligatorio");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            
            if (usuario.getPassword() == null || usuario.getPassword().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "La contraseña es obligatoria");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            
            // Validar formato de correo electrónico
            if (!usuario.getCorreo().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
                response.put("success", false);
                response.put("message", "El formato del correo electrónico no es válido");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            
            // Validar fortaleza de la contraseña
            if (usuario.getPassword().length() < 8) {
                response.put("success", false);
                response.put("message", "La contraseña debe tener al menos 8 caracteres");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            
            // Verificar si el correo ya está registrado
            if (usuarioService.obtenerUsuarioPorCorreo(usuario.getCorreo()).isPresent()) {
                response.put("success", false);
                response.put("message", "El correo ya está registrado");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            
            // Registrar el usuario
            Usuario usuarioRegistrado = usuarioService.registrarUsuario(usuario);
            
            // No devolver la contraseña en la respuesta
            usuarioRegistrado.setPassword(null);
            
            response.put("success", true);
            response.put("message", "Usuario registrado exitosamente");
            response.put("data", usuarioRegistrado);
            
            logger.info("Usuario registrado exitosamente con ID: {}", usuarioRegistrado.getCodigo());
            return new ResponseEntity<>(response, HttpStatus.CREATED);
            
        } catch (RuntimeException e) {
            logger.error("Error durante el registro de usuario: {}", e.getMessage(), e);
            response.put("success", false);
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            
        } catch (Exception e) {
            logger.error("Error inesperado durante el registro de usuario: {}", e.getMessage(), e);
            response.put("success", false);
            response.put("message", "Error interno del servidor al procesar la solicitud");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/usuarios/{codigo}")
    @Operation(summary = "Obtener usuario por código", description = "Obtiene los detalles de un usuario por su código único")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario encontrado", 
                    content = { @Content(mediaType = "application/json", 
                    schema = @Schema(implementation = Usuario.class)) }),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado", 
                    content = @Content) 
    })
    @PreAuthorize("hasRole('ADMIN') or #codigo == authentication.principal.username")
    public ResponseEntity<?> obtenerUsuarioPorCodigo(@PathVariable String codigo) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            logger.info("Buscando usuario con código: {}", codigo);
            
            return usuarioService.obtenerUsuarioPorCodigo(codigo)
                .map(usuario -> {
                    // No devolver la contraseña en la respuesta
                    usuario.setPassword(null);
                    
                    response.put("success", true);
                    response.put("data", usuario);
                    return new ResponseEntity<>(response, HttpStatus.OK);
                })
                .orElseGet(() -> {
                    response.put("success", false);
                    response.put("message", "No se encontró el usuario con código: " + codigo);
                    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
                });
                
        } catch (Exception e) {
            logger.error("Error al buscar usuario con código {}: {}", codigo, e.getMessage(), e);
            response.put("success", false);
            response.put("message", "Error al buscar el usuario");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
