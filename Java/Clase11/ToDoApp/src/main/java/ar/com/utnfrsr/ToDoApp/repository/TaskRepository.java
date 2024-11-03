package ar.com.utnfrsr.ToDoApp.repository;

import ar.com.utnfrsr.ToDoApp.model.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TaskRepository extends JpaRepository<Task, Long> {

    //    Actualiza el estado de la tarea
    // @param id = recibe el id para pasarlo a native query
    // @param finished recibe el estado para pasarlo a la native query
    @Modifying
    @Query(value = "UPDATE TASK SET FINISHED=:finished WHERE ID=:id", nativeQuery = true)
    public void markTaskAsFinished(@Param("id")Long id, @Param("finished") boolean finished);
}
