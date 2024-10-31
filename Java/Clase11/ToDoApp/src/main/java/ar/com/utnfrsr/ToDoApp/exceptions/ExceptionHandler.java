package ar.com.utnfrsr.ToDoApp.exceptions;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ExceptionHandler extends ResponseEntityExceptionHandler {

    //Mecanismo que permite manejar todas las excepciones de nuestra aplicación.
    //Cuando una aplicación lanza una excepción de manera general,
    //antes de que se muestre de manera descontrolada en el controlador,
    //maneja y la renderiza de la manera que la queremos mostrar

    @org.springframework.web.bind.annotation.ExceptionHandler(value = {ToDoException.class})
    protected ResponseEntity<Object> handleConflict(ToDoException ex, WebRequest request) {
        String bodyOfResponse = ex.getMessage();
        return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), ex.getHttpStatus(), request);
    }

}
