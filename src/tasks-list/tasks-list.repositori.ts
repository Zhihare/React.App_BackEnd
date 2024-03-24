import { EntityRepository, Repository } from 'typeorm';
import { TaskList } from './entities/tasks-list.entity';
import { Task } from 'src/tasks/entities/task.entity';

@EntityRepository(TaskList)
export class TaskListRepository extends Repository<TaskList> {
  // Здесь вы можете определить пользовательские методы для работы с TaskList
}

@EntityRepository(TaskList)
export class TaskRepository extends Repository<Task> {
  // Здесь вы можете определить пользовательские методы для работы с TaskList
}