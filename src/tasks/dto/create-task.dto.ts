import { IsNotEmpty } from "class-validator";
import { TaskList } from "src/tasks-list/entities/tasks-list.entity";

export class CreateTasksDto {   
   readonly name: string;
    readonly description: string;
    readonly priority: string;
    readonly deadline: Date;
    readonly list: number;
 }
