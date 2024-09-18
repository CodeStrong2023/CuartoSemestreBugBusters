package utn.estudiantes.servicio;

import utn.estudiantes.modelo.Estudiante2024;

import java.util.List;

public interface IEstudianteServicio {
    public List<Estudiante2024> listarEstudiantes();
    public Estudiante2024 buscarEstudiantePorId(Integer idestudiantes2024);
    public void guardarEstudiante(Estudiante2024 estudiante);
    public void eliminarEstudiante (Estudiante2024 estudiante);
}
