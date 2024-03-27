import { TaskList } from "src/tasks-list/entities/tasks-list.entity";
import { Task } from "src/tasks/entities/task.entity";

export class UpdateActivityLogDto  {
     readonly task: Task;
   readonly taskList: TaskList; 
   readonly action: string;
    readonly description: string;
  readonly timestamp: Date;
   readonly taskId: number;
    readonly listId: number;
  
}