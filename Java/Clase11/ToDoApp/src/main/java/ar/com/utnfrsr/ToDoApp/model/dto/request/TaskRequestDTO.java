package ar.com.utnfrsr.ToDoApp.model.dto.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

public record TaskRequestDTO(
        @NotNull
        String title,

        @NotNull
        LocalDateTime createdDate,

        @NotNull
        Date date,

        @NotNull
        LocalTime time

) {
}
