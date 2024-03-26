import { EntityRepository, Repository } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    // Здесь вы можете определить пользовательские методы для работы с TaskList
}