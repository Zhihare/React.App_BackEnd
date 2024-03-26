import { TaskList } from "src/tasks-list/entities/tasks-list.entity";

export class UpdateActivityLogDto  {
     readonly task: string;
   readonly taskList: TaskList; 
   readonly action: string;
    readonly description: string;
    readonly timestamp: Date;
}