import { PartialType } from '@nestjs/mapped-types';
import { CreateTasksDto } from './create-task.dto';

export class UpdateTaskDto  {
    readonly name: string;
    readonly description: string;
    readonly priority: string;
    readonly deadline: Date;
    readonly listId: number;
}
