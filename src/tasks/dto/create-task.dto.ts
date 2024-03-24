import { IsNotEmpty } from "class-validator";

export class CreateTasksDto {
    readonly name: string;
    readonly description: string;
    readonly priority: string;
    readonly deadline: Date;
    

 }
