package ar.com.utnfrsr.ToDoApp.controller;

import ar.com.utnfrsr.ToDoApp.model.dto.request.TaskRequestDTO;
import ar.com.utnfrsr.ToDoApp.model.dto.response.TaskResponseDTO;
import ar.com.utnfrsr.ToDoApp.service.impl.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/create")
    public ResponseEntity<TaskResponseDTO> createTask(@RequestBody TaskRequestDTO taskRequestDTO) {
        TaskResponseDTO task = taskService.createTask(taskRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    @GetMapping("/all")
    public ResponseEntity<List<TaskResponseDTO>> findAll() {
        List<TaskResponseDTO> tasks = taskService.findAll();
        return ResponseEntity.ok(tasks);
    }

    @PatchMapping("/mark_as_finished/{id}/{finished}")
    public ResponseEntity<Void> markAsFinished(@PathVariable("id") Long id, @PathVariable("finished") boolean finished) {
        this.taskService.updateTaskAsFinished(id, finished);
        return ResponseEntity.noContent().build(); //luego de que se ejecute la tarea devuelve un 204 siempre
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        this.taskService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
