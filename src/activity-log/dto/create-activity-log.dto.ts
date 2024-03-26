import { TaskList } from "src/tasks-list/entities/tasks-list.entity";

export class CreateActivityLogDto  {
   readonly task: string;
   readonly taskList: string; 
   readonly action: string;
   readonly description: string;
   readonly timestamp: Date;
}
