package com.cads.repositories;

import com.cads.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, String> {
    Usuario findByCodigo(String codigo);
    boolean existsByCodigo(String codigo);
    Usuario findByCorreo(String correo);
    boolean existsByCorreo(String correo);
}
