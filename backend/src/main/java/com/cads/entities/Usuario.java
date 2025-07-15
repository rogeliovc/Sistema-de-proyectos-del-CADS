package com.cads.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@Entity
@Table(name = "USUARIOCADS")
public class Usuario implements UserDetails {
    
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "USUARIOCADS_ID", columnDefinition = "VARCHAR(36)")
    private String id;
    
    @Column(name = "CODIGO")
    private String codigo;
    
    @Column(name = "NOMBRE")
    private String nombre;
    
    @Column(name = "APELLIDO1")
    private String apellido1;
    
    @Column(name = "APELLIDO2")
    private String apellido2;
    
    @Column(name = "SIT_ACADEMICA")
    private String situacionAcademica;
    
    @Column(name = "INSTITUCION")
    private String institucion;
    
    @Column(name = "DEPARTAMENTO")
    private String departamento;
    
    @Column(name = "PUESTO")
    private String puesto;
    
    @Column(name = "CIUDAD")
    private String ciudad;
    
    @Column(name = "ESTADO")
    private String estado;
    
    @Column(name = "CORREO", unique = true, nullable = false)
    private String correo;
    
    @Column(name = "TELEFONO")
    private String telefono;
    
    @Column(name = "ES_USUARIO")
    private String esUsuario;
    
    @Column(name = "USUARIO_ANT")
    private String usuarioAnterior;
    
    @Column(name = "PASSWORD")
    private String password;
    
    @Column(name = "ENABLED")
    private boolean enabled = true;
    
    @Column(name = "ACCOUNT_NON_EXPIRED")
    private boolean accountNonExpired = true;
    
    @Column(name = "CREDENTIALS_NON_EXPIRED")
    private boolean credentialsNonExpired = true;
    
    @Column(name = "ACCOUNT_NON_LOCKED")
    private boolean accountNonLocked = true;
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "USUARIO_ROLES", joinColumns = @JoinColumn(name = "usuario_id"))
    @Column(name = "role")
    private Set<String> roles = new HashSet<>();
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("RO_" + role))
                .collect(Collectors.toList());
    }
    
    @Override
    public String getUsername() {
        return this.correo; // Usamos el correo como nombre de usuario
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }
    
    @Override
    public boolean isEnabled() {
        return enabled;
    }
    
    @CreationTimestamp
    @Column(name = "FECHA_CREACION", updatable = false)
    private LocalDateTime fechaCreacion;
    
    @UpdateTimestamp
    @Column(name = "FECHA_ACTUALIZACION")
    private LocalDateTime fechaActualizacion;
    
    // Relaciones
    @OneToMany(mappedBy = "usuarioAprobacion")
    private Set<Proyecto> proyectosAprobados = new HashSet<>();
    
    @OneToMany(mappedBy = "usuario")
    private Set<ProyectoUsuario> proyectosUsuario = new HashSet<>();
    
    @OneToOne(mappedBy = "usuario")
    private UsuarioHPC usuarioHPC;
    
    @OneToOne(mappedBy = "usuario")
    private UsuarioVPN usuarioVPN;
    
    // Métodos de utilidad
    public void agregarRol(String rol) {
        this.roles.add(rol);
    }
    
    public void quitarRol(String rol) {
        this.roles.remove(rol);
    }
}
