import { PartialType } from '@nestjs/mapped-types';
import { CreateTasksDto } from './create-task.dto';
import { TaskList } from 'src/tasks-list/entities/tasks-list.entity';

export class UpdateTaskDto  {
    readonly name: string;
    readonly description: string;
    readonly priority: string;
    readonly deadline: Date;
    readonly list: number;
}
