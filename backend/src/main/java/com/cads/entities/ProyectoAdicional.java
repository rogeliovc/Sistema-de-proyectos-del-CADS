package com.cads.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "PROYECTO_ADI")
public class ProyectoAdicional {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "proyecto_adi_seq")
    @SequenceGenerator(name = "proyecto_adi_seq", sequenceName = "SEQ_PROYECTO_ADI", allocationSize = 1)
    @Column(name = "ID")
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PROYECTO_ID", nullable = false)
    private Proyecto proyecto;
    
    @Column(name = "NOTA", length = 500)
    private String nota;
}
