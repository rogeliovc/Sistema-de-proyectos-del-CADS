package com.cads.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "USUARIOHPC")
public class UsuarioHPC {
    
    @Id
    @Column(name = "USUARIOHPC")
    private String usuarioHpc;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USUARIOCADS_ID", nullable = false)
    private Usuario usuario;
    
    @Column(name = "FECHA_ALTA")
    private LocalDateTime fechaAlta;
    
    @Column(name = "ESTATUS")
    private String estatus;
}
