package com.cads.services;

import com.cads.entities.Usuario;
import com.cads.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public Usuario registrarUsuario(Usuario usuario) {
        if (usuarioRepository.existsByCodigo(usuario.getCodigo())) {
            throw new RuntimeException("El código de usuario ya existe");
        }
        if (usuarioRepository.existsByCorreo(usuario.getCorreo())) {
            throw new RuntimeException("El correo ya está registrado");
        }
        
        // No se encripta la contraseña ya que no tenemos Spring Security
        return usuarioRepository.save(usuario);
    }

    public Usuario obtenerUsuarioPorCodigo(String codigo) {
        return usuarioRepository.findByCodigo(codigo);
    }

    public Usuario obtenerUsuarioPorCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }
}
