package com.cads.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "PROYECTO_RECURSOS")
public class ProyectoRecursos {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "proyecto_recursos_seq")
    @SequenceGenerator(name = "proyecto_recursos_seq", sequenceName = "proyecto_recursos_seq", allocationSize = 1)
    @Column(name = "ID")
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PROYECTO_ID", nullable = false)
    private Proyecto proyecto;
    
    @Column(name = "CORES")
    private Integer cores;
    
    @Column(name = "TIPO", length = 3)
    private String tipo; // CPU o GPU
    
    @Column(name = "MEMORIA")
    private Integer memoria; // En GB
    
    @Column(name = "ALMACENAMIENTO")
    private Integer almacenamiento; // En GB
    
    @Column(name = "HORAS")
    private Integer horas;
}
