package utn.estudiantes;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import utn.estudiantes.modelo.Estudiante2024;
import utn.estudiantes.servicio.EstudianteServicio;

import java.util.List;
import java.util.Scanner;

@SpringBootApplication
public class EstudiantesApplication implements CommandLineRunner {
	@Autowired
	private EstudianteServicio estudianteServicio;
	private static final Logger logger 	= LoggerFactory.getLogger(EstudiantesApplication.class);

	String nl = System.lineSeparator();
	
	public static void main(String[] args) {
		logger.info("Iniciando la aplicacion...");
		//Levantar la fabrica de spring
		SpringApplication.run(EstudiantesApplication.class, args);
		logger.info("Aplicacion Finalizada!");
	}

	@Override
	public void run(String... args) throws Exception {
		logger.info(nl+"Ejecutando el metodo run de Spring..."+nl);
		var salir = false;
		var consola = new Scanner(System.in);
		while (!salir){
			mostrarMenu();
			salir = ejecutarOpciones(consola);
			logger.info(nl);
		}//Fin ciclo while
	}

	private void mostrarMenu(){
		//logger.info(nl);
		logger.info("""
				*****SISTEMA DE ESTUDIANTES*****
				1. Listar Estudiantes
				2. Buscar Estudiantes
				3. Agregar Estudiantes
				4. Modificar Estudiantes
				5. Eliminar Estudiantes
				6. Salir 
				Ingrese una opcion:""");
	}

	private boolean ejecutarOpciones(Scanner consola){
		var opcion = Integer.parseInt(consola.nextLine());
		var salir = false;
		switch (opcion){
			case 1 ->{ //Listar estudaintes
				logger.info(nl+"Listado de estudiantes: "+nl);
				List<Estudiante2024> estudaintes = estudianteServicio.listarEstudiantes();
				estudaintes.forEach((estudainte -> logger.info(estudainte.toString()+nl)));
			}
			case 2 ->{
				logger.info(nl+"Ingrese el id de un estudiante"+nl);
				var idEstudiante = Integer.parseInt(consola.nextLine());
				Estudiante2024 estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
				if (estudiante != null)
					logger.info("Estudiante encontrado: " + estudiante + nl);
				else
					logger.info("Estudainte no encontrado");
			}
			case 3 ->{//Agregar un estudainte
				logger.info("Agregar estudiante: ");
				logger.info("Nombre: ");
				var nombre = consola.nextLine();
				logger.info("Apellido: ");
				var apellido = consola.nextLine();
				logger.info("Telefono: ");
				var telefono = consola.nextLine();
				logger.info("Email: ");
				var email = consola.nextLine();
				//Crear el objeto estudiante sin el id
				var estudiante = new Estudiante2024();
				estudiante.setNombre(nombre);
				estudiante.setApellido(apellido);
				estudiante.setTelefono(telefono);
				estudiante.setEmail(email);
				estudianteServicio.guardarEstudiante(estudiante);
				logger.info("Estudiante guardado "+estudiante);
			}
			case 4 ->{
				logger.info("Modificar un estudainte"+nl);
				logger.info("Ingrese el id del estudainte a modificar: ");
				var idEstudiante = Integer.parseInt(consola.nextLine());
				//Buscamos el estudiante a modificar
				Estudiante2024 estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
				if (estudiante != null) {
					logger.info("Nombre: ");
					var nombre = consola.nextLine();
					logger.info("Apellido: ");
					var apellido = consola.nextLine();
					logger.info("Telefono: ");
					var telefono = consola.nextLine();
					logger.info("Email: ");
					var email = consola.nextLine();
					estudiante.setNombre(nombre);
					estudiante.setApellido(apellido);
					estudiante.setTelefono(telefono);
					estudiante.setEmail(email);
					estudianteServicio.guardarEstudiante(estudiante);
					logger.info("Estudiante modificado: " + estudiante + nl);
				}else
					logger.info("Estudainte NO encontrado por el ID: "+idEstudiante+nl);
			}
			case 5 ->{//Eñiminar estudiante
				logger.info("Eliminar estudiante: "+nl);
				logger.info("Ingrese el ID del estudainte a eliminar");
				var idEstudainte = Integer.parseInt(consola.nextLine());
				//Buscamos el id del estudiante a eliminar
				var estudiante = estudianteServicio.buscarEstudiantePorId(idEstudainte);
				if (estudiante != null){
					estudianteServicio.eliminarEstudiante(estudiante);
					logger.info("Estudiante eliminado: "+idEstudainte+nl);
				}
				else
					logger.info("Estudiante NO encontrado por ID: "+idEstudainte);
			}
			case 6 ->{
				logger.info("SALIENDO..."+nl+nl);
				salir=true;
			}
		}//Fin switch
		return salir;
	}//Fin metodo ejecutarOpciones

}
