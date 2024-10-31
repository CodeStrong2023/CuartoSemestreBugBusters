package ar.com.utnfrsr.ToDoApp.exceptions;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ToDoException extends RuntimeException{
    private String message;
    private HttpStatus httpStatus; //para obtener el estado http

    public ToDoException(String message, HttpStatus httpStatus) { //sobreescribimos el metodo runtimeexeption
        super(message);
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
