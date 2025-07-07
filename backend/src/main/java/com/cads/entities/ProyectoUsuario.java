package com.cads.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "PROYECTO_USUARIO")
public class ProyectoUsuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "proyecto_usuario_seq")
    @SequenceGenerator(name = "proyecto_usuario_seq", sequenceName = "SEQ_PROYECTO_USUARIO", allocationSize = 1)
    @Column(name = "ID")
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PROYECTO_ID", nullable = false)
    private Proyecto proyecto;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USUARIOCADS_ID", nullable = false)
    private Usuario usuario;
    
    @Column(name = "TIPO_USUARIO", nullable = false)
    private String tipoUsuario; // RESPONSABLE, COLABORADOR, CONTACTO_TECNICO
    
    @Column(name = "CUENTA_HPC", length = 100)
    private String cuentaHpc;
    
    @Column(name = "FECHA_ALTA")
    private LocalDateTime fechaAlta;
    
    @Column(name = "ESTATUS_USUARIO")
    private String estatusUsuario;
    
    @Column(name = "FECHA_MOV")
    private LocalDateTime fechaMovimiento;
}
