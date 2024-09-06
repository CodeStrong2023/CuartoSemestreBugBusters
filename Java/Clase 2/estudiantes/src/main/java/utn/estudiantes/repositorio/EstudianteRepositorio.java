package utn.estudiante.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import utn.estudiantes.modelo.Estudiante;


public interface EstudianteRepositorio extends JpaRepository<Estudiante, Integer> {
}