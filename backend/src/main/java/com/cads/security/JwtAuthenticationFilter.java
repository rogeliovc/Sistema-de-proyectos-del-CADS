package com.cads.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    
    private static final String AUTH_HEADER = "Authorization";
    private static final String TOKEN_PREFIX = "Bearer ";

    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                  HttpServletResponse response, 
                                  FilterChain filterChain) throws ServletException, IOException {
        
        // Obtener el token del encabezado de autorización
        String jwt = getJwtFromRequest(request);
        
        try {
            // Validar el token si existe
            if (StringUtils.hasText(jwt)) {
                // Extraer el nombre de usuario del token
                String username = jwtService.extractUsername(jwt);
                
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    // Cargar los detalles del usuario desde la base de datos
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    
                    // Validar el token con los detalles del usuario
                    if (jwtService.validateToken(jwt, userDetails)) {
                        // Crear la autenticación
                        UsernamePasswordAuthenticationToken authentication = 
                            new UsernamePasswordAuthenticationToken(
                                userDetails, 
                                null, 
                                userDetails.getAuthorities()
                            );
                        
                        // Establecer los detalles de la autenticación
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        
                        // Establecer la autenticación en el contexto de seguridad
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        
                        logger.debug("Usuario autenticado: {}", username);
                    }
                }
            }
        } catch (Exception ex) {
            logger.error("Error en el filtro de autenticación JWT: {}", ex.getMessage());
            
            // Limpiar el contexto de seguridad en caso de error
            SecurityContextHolder.clearContext();
            
            // Crear una respuesta de error personalizada
            sendErrorResponse(response, "Error de autenticación: " + ex.getMessage(), 
                            HttpStatus.UNAUTHORIZED);
            return;
        }
        
        // Continuar con la cadena de filtros
        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTH_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(TOKEN_PREFIX)) {
            return bearerToken.substring(TOKEN_PREFIX.length());
        }
        return null;
    }
    
    /**
     * Envía una respuesta de error personalizada en formato JSON
     */
    private void sendErrorResponse(HttpServletResponse response, String message, HttpStatus status) 
            throws IOException {
        
        response.setContentType("application/json");
        response.setStatus(status.value());
        
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("status", status.value());
        errorResponse.put("error", status.getReasonPhrase());
        errorResponse.put("message", message);
        
        // Convertir el mapa a JSON
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(response.getWriter(), errorResponse);
    }
}
