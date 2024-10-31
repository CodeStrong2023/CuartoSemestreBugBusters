package ar.com.utnfrsr.ToDoApp.model.mapper;

import ar.com.utnfrsr.ToDoApp.model.dto.request.TaskRequestDTO;
import ar.com.utnfrsr.ToDoApp.model.dto.response.TaskResponseDTO;
import ar.com.utnfrsr.ToDoApp.model.entity.Task;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class TaskMapper {

    public Task toTask(TaskRequestDTO taskRequestDTO) {
        Task task = new Task();
        task.setTitle(taskRequestDTO.title());
        task.setCreatedDate(LocalDateTime.now());
        task.setDate(taskRequestDTO.date());
        task.setTime(taskRequestDTO.time());
        return task;
    }

    public TaskResponseDTO toDTO(Task task) {
        TaskResponseDTO taskResponseDTO = new TaskResponseDTO(task.getId(), task.getTitle(), task.getDate(), task.getTime(), task.isFinished());
        return taskResponseDTO;
    }

    public List<TaskResponseDTO> toDTOList(List<Task> tasks) {
        return tasks.stream().map(this::toDTO).collect(java.util.stream.Collectors.toList());
    }
}
