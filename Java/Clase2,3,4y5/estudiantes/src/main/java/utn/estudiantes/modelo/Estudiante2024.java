package utn.estudiantes.modelo;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
//boilerplate - Repetitivo
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "estudiantes2024")
public class Estudiante2024 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_estudiante")
    private Integer idestudiantes2024;
    private String nombre;
    private String apellido;
    private String telefono;
    private String email;
}
