import { PartialType } from '@nestjs/mapped-types';
import { CreateTasksListDto } from './create-tasks-list.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateTasksListDto extends PartialType(CreateTasksListDto) {
        @IsNotEmpty()
    readonly name: string;

 }

