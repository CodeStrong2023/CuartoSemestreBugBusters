package UTN.presentacion;

import UTN.conexion.Conexion;
import UTN.datos.EstudianteDAO;
import UTN.dominio.Estudiante;

import java.util.List;
import java.util.Scanner;


public class SistemaEstudiantesApp {
    public static void main(String[] args) {
        boolean salir = false;
        Scanner sc = new Scanner(System.in);
        EstudianteDAO estudianteDAO = new EstudianteDAO();

        while(!salir){
            try{
                mostrarMenu();
                salir = ejecutarOpciones(sc, estudianteDAO);
            }catch(Exception e){
                System.out.println("Ocurrió un error al ejecutar la operación: " + e.getMessage());
            }
        }
    }// Fin main

    private static void mostrarMenu() {
        System.out.println("""
                ***** Sistema de Estudiantes *****
                1. Listar Estudiantes.
                2. Buscar Estudiantes.
                3. Agregar Estudiante.
                4. Modificar Estudiante.
                5. Eliminar Estudiante.
                6. Salir.
                Elige una opción: 
                """);
    }

    private static boolean ejecutarOpciones(Scanner sc, EstudianteDAO estudianteDAO) {
        int opc = Integer.parseInt(sc.nextLine());
        boolean salir = false;

        switch(opc){
            case 1:
                List<Estudiante> estudiantes = estudianteDAO.listarEstudiantes();
                estudiantes.forEach(System.out::println);
                break;
            case 2:
                System.out.println("Introduce el id del estudiante: ");
                int id = Integer.parseInt(sc.nextLine());

                Estudiante estudiante = new Estudiante(id);
                boolean estudianteEncontrado = estudianteDAO.buscarEstudiantePorId(estudiante);
                if(estudianteEncontrado){
                    System.out.println("Estudiante encontrado: " + estudiante);
                }else{
                    System.out.println("No se encontró el estudiante: " + estudiante);
                }
                break;
            case 3:
                System.out.println("Agregar estudiante: ");
                System.out.println("Nombre: ");
                String nombre = sc.nextLine();
                System.out.println("Apellido: ");
                String apellido = sc.nextLine();
                System.out.println("Telefono: ");
                String telefono = sc.nextLine();
                System.out.println("Email: ");
                String email = sc.nextLine();

                Estudiante nuevoEstudiante = new Estudiante(nombre, apellido, telefono, email);
                boolean agregado = estudianteDAO.agregarEstudiante(nuevoEstudiante);

                if(agregado){
                    System.out.println("Estudiante agregado: " + nuevoEstudiante);
                }else{
                    System.out.println("No se pudo agregar al estudiante: " + nuevoEstudiante);
                }
                break;
            case 4:
                System.out.println("Modificar estudiante: ");
                System.out.println("Ingresa el id del estudiante: ");
                int idEstudiante =Integer.parseInt(sc.nextLine());
                System.out.println("Nombre: ");
                String nombreEstudiante = sc.nextLine();
                System.out.println("Apellido: ");
                String apellidoEstudiante = sc.nextLine();
                System.out.println("Telefono: ");
                String telefonoEstudiante = sc.nextLine();
                System.out.println("Email: ");
                String emailEstudiante = sc.nextLine();

                Estudiante estudianteModificado = new Estudiante(idEstudiante,nombreEstudiante, apellidoEstudiante, telefonoEstudiante, emailEstudiante);
                boolean modificado = estudianteDAO.modificarEstudiante(estudianteModificado);

                if(modificado){
                    System.out.println("Estudiante modificado: " + estudianteModificado);
                }else{
                    System.out.println("No se pudo modificar el estudiante: " + estudianteModificado);
                }

                break;
            case 5:
                System.out.println("Eliminar estudiante: ");
                System.out.println("Ingresa el id del estudiante: ");
                int estudianteId = Integer.parseInt(sc.nextLine());

                Estudiante estudianteEliminar = new Estudiante(estudianteId);
                boolean eliminado = estudianteDAO.eliminarEstudiante(estudianteEliminar);

                if(eliminado){
                    System.out.println("Estudiante eliminado: " + estudianteEliminar);
                }else{
                    System.out.println("No se elimino al estudiante: " + estudianteEliminar);
                }
                break;
            case 6:
                System.out.println("Hasta pronto!");
                salir = true;
                break;
            default:
                System.out.println("Opción incorrecta");
        }
        return salir;
    }

}// Fin clase