package ar.com.utnfrsr.ToDoApp.model.dto.response;

import lombok.Data;

import java.time.LocalTime;
import java.util.Date;

public record TaskResponseDTO(
        Long id,
        String title,
        Date date,
        LocalTime time,
        boolean finished
) {
}
