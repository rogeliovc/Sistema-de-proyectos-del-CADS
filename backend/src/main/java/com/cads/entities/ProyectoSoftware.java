package com.cads.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "PROYECTO_SOFT")
public class ProyectoSoftware {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "proyecto_soft_seq")
    @SequenceGenerator(name = "proyecto_soft_seq", sequenceName = "SEW_PROYECTO_SOFT", allocationSize = 1)
    @Column(name = "ID")
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PROYECTO_ID", nullable = false)
    private Proyecto proyecto;
    
    @Column(name = "SOFTWARE", nullable = false)
    private String nombreSoftware;
    
    @Column(name = "VERSION")
    private String version;
    
    @Column(name = "DESCARGA", length = 200)
    private String urlDescarga;
    
    @Column(name = "PREREQUISITOS", length = 200)
    private String urlPrerequisitos;
    
    @Column(name = "TIPO_NECESIDAD")
    private String tipoNecesidad;
}
