package utn.estudiantes.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import utn.estudiantes.modelo.Estudiante2024;

public interface EstudianteRepositorio extends JpaRepository<Estudiante2024, Integer> {

}
