import { IsNotEmpty } from "class-validator";

export class CreateTasksListDto {
    @IsNotEmpty()
    readonly name: string;

 }
