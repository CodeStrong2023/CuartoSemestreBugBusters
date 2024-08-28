package UTN.datos;

import UTN.dominio.Estudiante;

import static UTN.conexion.Conexion.getConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class EstudianteDAO {
    //Creamos algunos objetos que son necesarios para comunicarnos con la bd
    PreparedStatement ps; //Envia la query a la bd
    ResultSet rs; //Obenemos el resultado de la bd
    String sql; //contiene la query

    //Método listar
    public List<Estudiante> listarEstudiantes(){
        //Creamos un objeto de tipo conexion
        Connection cnx = getConnection();
        List<Estudiante> estudiantes = new ArrayList<>();
        sql = "SELECT * FROM estudiantes ORDER BY id";
        try{
            ps = cnx.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()){
                var estudiante = new Estudiante();
                estudiante.setIdEstudiante(rs.getInt("id"));
                estudiante.setNombre(rs.getString("nombre"));
                estudiante.setApellido(rs.getString("apellido"));
                estudiante.setTelefono(rs.getString("telefono"));
                estudiante.setEmail(rs.getString("email"));

                estudiantes.add(estudiante);
            }
        }catch (Exception e){
            System.out.println("Ocurrión un error al seleccionar datos: " + e.getMessage());
        }finally {
            try{
                cnx.close();
            }catch (Exception e){
                System.out.println("Ocurrió un error al cerrar la conexion: " + e.getMessage());
            }
        }
        return estudiantes;
    }//Fin metodo listarEstudiante

    //Método por id -> findById
    public boolean buscarEstudiantePorId(Estudiante estudiante){
        Connection cnx = getConnection();
        sql = "SELECT * FROM estudiantes WHERE id = ?";
        try{
            ps = cnx.prepareStatement(sql);
            ps.setInt(1, estudiante.getIdEstudiante());
            rs = ps.executeQuery();
            if(rs.next()){
                estudiante.setNombre(rs.getString("nombre"));
                estudiante.setApellido(rs.getString("apellido"));
                estudiante.setTelefono(rs.getString("telefono"));
                estudiante.setEmail(rs.getString("email"));
                return true;
            }
        }catch (Exception e){
            System.out.println("Ocurrió un error al buscar estudiante: " + e.getMessage());
        }finally {
            try{
                cnx.close();
            }catch (Exception e){
                System.out.println("Ocurrió un error al cerrar la conexion: " + e.getMessage());
            }
        }
        return false;
    }//Fin metodo buscarPorID

    //Método agregar estudiante
    public boolean agregarEstudiante(Estudiante estudiante){
        Connection cnx = getConnection();
        sql = "INSERT INTO estudiantes(nombre, apellido, telefono,email) VALUES (?,?,?,?)";
        try{
            ps = cnx.prepareStatement(sql);
            ps.setString(1, estudiante.getNombre());
            ps.setString(2, estudiante.getApellido());
            ps.setString(3, estudiante.getTelefono());
            ps.setString(4, estudiante.getEmail());
            ps.execute();
            return true;
        }catch (Exception e){
            System.out.println("Ocurrió un error al agregar el estudiante: " + e.getMessage());
        }finally {
            try{
                cnx.close();
            }catch (Exception e){
                System.out.println("Ocurrió un error al cerrar la conexion: " + e.getMessage());
            }
        }
        return false;
    }//Fin del metodo agregarEstudiante


    //Método para modificar estudiante
    public boolean modificarEstudiante(Estudiante estudiante){
        Connection cnx = getConnection();
        sql = "UPDATE estudiantes SET nombre = ?, apellido = ?, telefono = ?, email = ? WHERE id = ?";
        try{
            ps = cnx.prepareStatement(sql);
            ps.setString(1, estudiante.getNombre());
            ps.setString(2, estudiante.getApellido());
            ps.setString(3, estudiante.getTelefono());
            ps.setString(4, estudiante.getEmail());
            ps.setInt(5, estudiante.getIdEstudiante());
            ps.executeUpdate();
            return true;
        }catch (Exception e){
            System.out.println("Ocurrió un error al modificar el estudiante: " + e.getMessage());
        }finally {
            try{
                cnx.close();
            }catch (Exception e){
                System.out.println("Ocurrió un error al cerrar la conexion: " + e.getMessage());
            }
        }
        return false;
    }//Fin metodod modificarEstudiante

    public boolean eliminarEstudiante(Estudiante estudiante){
        Connection cnx = getConnection();
        sql = "DELETE FROM estudiantes WHERE id = ?";
        try{
            ps = cnx.prepareStatement(sql);
            ps.setInt(1, estudiante.getIdEstudiante());
            ps.execute();
            return true;
        } catch (SQLException e) {
            System.out.println("Error al eliminar estudiante: " + e.getMessage());;
        }finally {
            try{
                cnx.close();
            } catch (SQLException e) {
                System.out.println("Error al cerrar la conexion: " + e.getMessage());
            }
        }
        return false;
    }
}
