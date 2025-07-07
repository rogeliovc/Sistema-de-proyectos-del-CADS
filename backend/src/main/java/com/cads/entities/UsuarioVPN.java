package com.cads.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "USUARIOVPN")
public class UsuarioVPN {
    
    @Id
    @Column(name = "USUARIOVPN")
    private String usuarioVpn;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USUARIOCADS_ID", nullable = false)
    private Usuario usuario;
    
    @Column(name = "FECHA_ALTA")
    private LocalDateTime fechaAlta;
    
    @Column(name = "ESTATUS")
    private String estatus;
    
    @Column(name = "FECHA_MOV")
    private LocalDateTime fechaMovimiento;
}
