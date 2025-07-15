package com.cads.services;

import com.cads.entities.Usuario;
import com.cads.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UsuarioService implements UserDetailsService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public Usuario registrarUsuario(Usuario usuario) {
        if (usuarioRepository.existsByCodigo(usuario.getCodigo())) {
            throw new RuntimeException("El código de usuario ya existe");
        }
        if (usuarioRepository.existsByCorreo(usuario.getCorreo())) {
            throw new RuntimeException("El correo ya está registrado");
        }
        
        // Encriptar la contraseña antes de guardar
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        
        // Asignar rol por defecto si no tiene
        if (usuario.getRoles() == null || usuario.getRoles().isEmpty()) {
            Set<String> roles = new HashSet<>();
            roles.add("USER");
            usuario.setRoles(roles);
        }
        
        return usuarioRepository.save(usuario);
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByCorreo(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con el correo: " + username));
    }

    public Optional<Usuario> obtenerUsuarioPorCodigo(String codigo) {
        return usuarioRepository.findByCodigo(codigo);
    }
    
    // Método para compatibilidad con el controlador
    public Optional<Usuario> findByCodigo(String codigo) {
        return usuarioRepository.findByCodigo(codigo);
    }

    public Optional<Usuario> obtenerUsuarioPorCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }
}
