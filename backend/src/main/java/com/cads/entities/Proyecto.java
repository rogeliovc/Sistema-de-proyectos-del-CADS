package com.cads.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "PROYECTO")
public class Proyecto {
    
    @Id
    @Column(name = "ID")
    private String id;
    
    @Column(name = "TIPO_PROYECTO")
    private String tipoProyecto;
    
    @Column(name = "PROYECTO_STATUS_ID")
    private String proyectoStatusId;
    
    @Column(name = "FECHA_SOLICITUD")
    private LocalDate fechaSolicitud;
    
    @Column(name = "NOMBRE")
    private String nombre;
    
    @Column(name = "TITULO")
    private String titulo;
    
    @Column(name = "AREA_CONOCIMIENTO")
    private String areaConocimiento;
    
    @Column(name = "DESCRIPCION", length = 3200)
    private String descripcion;
    
    @Column(name = "TIEMPO_USO")
    private Integer tiempoUso;
    
    @Column(name = "FECHA_FIN_APROX")
    private LocalDate fechaFinAprox;
    
    @Column(name = "FECHA_APROBACION")
    private LocalDate fechaAprobacion;
    
    @Column(name = "FECHA_FINALIZACION")
    private LocalDate fechaFinalizacion;
    
    @Column(name = "OBJETIVO", length = 2000)
    private String objetivo;
    
    @Column(name = "LINEA_INV")
    private String lineaInvestigacion;
    
    @Column(name = "PALABRAS_CLV")
    private String palabrasClave;
    
    @Column(name = "DESCRIPCION_TEC", length = 3200)
    private String descripcionTecnica;
    
    @Column(name = "RESULTADOS_ESPERADOS", length = 1500)
    private String resultadosEsperados;
    
    @Column(name = "METODOS_COM", length = 160)
    private String metodosComputacionales;
    
    @Column(name = "CONACYT_SI")
    private String conacytSi;
    
    @Column(name = "CONACYT_NUM")
    private String conacytNum;
    
    @Column(name = "USO_RUP")
    private String usoRup;
    
    @Column(name = "USO_CUAL", length = 200)
    private String usoCual;
    
    @CreationTimestamp
    @Column(name = "FECHA_CREACION", updatable = false)
    private LocalDate fechaCreacion;
    
    @UpdateTimestamp
    @Column(name = "FECHA_ACTUALIZACION")
    private LocalDate fechaActualizacion;
    
    // Relaciones
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USUARIO_APROBACION")
    private Usuario usuarioAprobacion;
    
    @OneToMany(mappedBy = "proyecto", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProyectoRecursos> recursos = new HashSet<>();
    
    @OneToMany(mappedBy = "proyecto", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProyectoSoftware> software = new HashSet<>();
    
    @OneToMany(mappedBy = "proyecto", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProyectoAdicional> informacionAdicional = new HashSet<>();
    
    @OneToMany(mappedBy = "proyecto", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProyectoUsuario> usuarios = new HashSet<>();
    
    // Métodos de utilidad
    public void agregarRecurso(ProyectoRecursos recurso) {
        recursos.add(recurso);
        recurso.setProyecto(this);
    }
    
    public void eliminarRecurso(ProyectoRecursos recurso) {
        recursos.remove(recurso);
        recurso.setProyecto(null);
    }
    
    public void agregarSoftware(ProyectoSoftware soft) {
        software.add(soft);
        soft.setProyecto(this);
    }
    
    public void agregarInformacionAdicional(ProyectoAdicional info) {
        informacionAdicional.add(info);
        info.setProyecto(this);
    }
    
    public void agregarUsuario(ProyectoUsuario usuarioProyecto) {
        usuarios.add(usuarioProyecto);
        usuarioProyecto.setProyecto(this);
    }
}
