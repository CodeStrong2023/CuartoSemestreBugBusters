package utn.tienda_libros.vista;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import utn.tienda_libros.servicio.LibroServicio;


import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import utn.tienda_libros.modelo.Libro;


@Component
public class LibroFrom extends JFrame {
    LibroServicio libroServicio;
    private JPanel panel;
    private JTable tablaLibros;
    private JLabel l;
    private JTextField libroTexto;
    private JPanel LibroTexto;
    private JTextField autorTextoTextField;
    private JTextField precioTextoTextField;
    private JTextField existenciasTextoTextField;
    private JButton agregarButton;
    private JButton modificarButton;
    private JButton eliminarButton;
    private DefaultTableModel tablaModeloLibros;

    @Autowired
    public LibroFrom(LibroServicio libroServicio){
        this.libroServicio = libroServicio;
        iniciarForma();
        agregarButton.addActionListener(e -> agregarLibro());
    }

    private void iniciarForma() {
        setContentPane(panel);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setVisible(true);
        setSize(900, 700);
        // Para obtener las dimensiones de la ventana
        Toolkit toolkit = Toolkit.getDefaultToolkit();
        Dimension tamanioPantalla = toolkit.getScreenSize();
        int x = (tamanioPantalla.width - getWidth()) / 2;
        int y = (tamanioPantalla.height - getHeight()) / 2;
        setLocation(x, y);
    }

    private void agregarLibro() {
        // Leer los valores del formulario
        if (libroTexto.getText().equals("")) {
            mostrarMensaje("Ingresa el nombre del libro");
            return;
        }

        try {
            var nombreLibro = libroTexto.getText();
            var autor = autorTextoTextField.getText();
            var precio = Double.parseDouble(precioTextoTextField.getText());
            var existencias = Integer.parseInt(existenciasTextoTextField.getText());

            // Creamos el objeto de libro
            var libro = new Libro(null, nombreLibro, autor, precio, existencias);
            this.libroServicio.guardarLibro(libro);
            mostrarMensaje("Se agregó el libro...");
            limpiarFormulario();
            listarLibros();
        } catch (NumberFormatException e) {
            mostrarMensaje("Por favor, ingresa un valor numérico válido para el precio y las existencias.");
        }
    }

    private void mostrarMensaje(String mensaje) {
        JOptionPane.showMessageDialog(this, mensaje);
        libroTexto.requestFocusInWindow();
    }

    private void limpiarFormulario() {
        libroTexto.setText("");
        autorTextoTextField.setText("");
        precioTextoTextField.setText("");
        existenciasTextoTextField.setText("");
    }

    private void createUIComponents() {
        this.tablaModeloLibros = new DefaultTableModel(0, 5);
        String[] cabecera = {"Id", "Libro", "Autor", "Precio", "Existencias"};
        this.tablaModeloLibros.setColumnIdentifiers(cabecera);
        // Instanciar el objeto de JTable
        this.tablaLibros = new JTable(tablaModeloLibros);
        listarLibros();
    }

    private void listarLibros() {
        // Limpiamos la tabla
        tablaModeloLibros.setRowCount(0);
        // Obtenemos los libros de la base de datos
        var libros = libroServicio.listarLibros();
        // Iteramos cada libro
        libros.forEach((libro) -> { // Funcion Lambda
            // Creamos cada registro para agregarlos a la tabla
            Object[] renglonLibro = {
                    libro.getIdLibro(),
                    libro.getNombreLibro(),
                    libro.getAutor(),
                    libro.getPrecio(),
                    libro.getExistencias()
            };
            this.tablaModeloLibros.addRow(renglonLibro);
        });
    }
}

