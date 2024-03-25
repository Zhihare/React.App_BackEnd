import { EntityRepository, Repository } from 'typeorm';
import { TaskList } from './entities/tasks-list.entity';

@EntityRepository(TaskList)
export class TaskListRepository extends Repository<TaskList> {
  // Здесь вы можете определить пользовательские методы для работы с TaskList
}
