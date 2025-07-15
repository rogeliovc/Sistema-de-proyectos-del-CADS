package com.cads.repositories;

import com.cads.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String> {
    
    Optional<Usuario> findByCodigo(String codigo);
    
    boolean existsByCodigo(String codigo);
    
    Optional<Usuario> findByCorreo(String correo);
    
    boolean existsByCorreo(String correo);
}
