package utn.estudiantes.servicio;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utn.estudiantes.modelo.Estudiante2024;
import utn.estudiantes.repositorio.EstudianteRepositorio;

import java.util.List;

@Service
public class EstudianteServicio implements IEstudianteServicio {
    @Autowired
    private EstudianteRepositorio estudianteRepositorio;

    @Override
    public List<Estudiante2024> listarEstudiantes() {
        List<Estudiante2024> estudiantes=estudianteRepositorio.findAll();
        return estudiantes;
    }

    @Override
    public Estudiante2024 buscarEstudiantePorId(Integer idestudiante2024) {
        Estudiante2024 estudiante = estudianteRepositorio.findById(idestudiante2024).orElse(null);
        return estudiante;
    }

    @Override
    public void guardarEstudiante(Estudiante2024 estudiante) {
        estudianteRepositorio.save(estudiante);
    }

    @Override
    public void eliminarEstudiante(Estudiante2024 estudiante) {
        estudianteRepositorio.delete(estudiante);
    }
}
