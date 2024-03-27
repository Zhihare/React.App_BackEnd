import { TaskList } from "src/tasks-list/entities/tasks-list.entity";
import { Task } from "src/tasks/entities/task.entity";

export class CreateActivityLogDto  {
   readonly task: Task;
   readonly taskList: TaskList; 
   readonly action: string;
   readonly description: string;
   readonly timestamp: Date;
    readonly task_Id: number;
    readonly listId: number;
}
