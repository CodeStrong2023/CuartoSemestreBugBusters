package ar.com.utnfrsr.ToDoApp.service.impl;

import ar.com.utnfrsr.ToDoApp.exceptions.ToDoExceptions;
import ar.com.utnfrsr.ToDoApp.model.dto.request.TaskRequestDTO;
import ar.com.utnfrsr.ToDoApp.model.dto.response.TaskResponseDTO;
import ar.com.utnfrsr.ToDoApp.model.entity.Task;
import ar.com.utnfrsr.ToDoApp.model.mapper.TaskMapper;
import ar.com.utnfrsr.ToDoApp.repository.TaskRepository;
import ar.com.utnfrsr.ToDoApp.service.ITaskService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService implements ITaskService {

    private final TaskRepository repository;
    private final TaskMapper mapper;

    @Override
    public TaskResponseDTO createTask(TaskRequestDTO taskRequestDTO) {
        Task task = mapper.toTask(taskRequestDTO);
        return mapper.toDTO(repository.save(task));
    }

    @Override
    public List<TaskResponseDTO> findAll() {
        return mapper.toDTOList(repository.findAll());
    }

    @Override
    @Transactional
    public void updateTaskAsFinished(Long id, boolean finished) {
        Optional<Task> optionalTask = this.repository.findById(id);
        if (optionalTask.isEmpty()) { //si no hay taréa
            throw new ToDoExceptions("Task not found", HttpStatus.NOT_FOUND);
        }

        this.repository.markTaskAsFinished(id, finished);
    }

    @Override
    public void deleteById(Long id) {
        Optional<Task> optionalTask = this.repository.findById(id);
        if (optionalTask.isEmpty()) {
            throw new ToDoExceptions("Task not found", HttpStatus.NOT_FOUND);
        }
        this.repository.deleteById(id);
    }
}
