// task-list.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksListService } from './tasks-list.service';
import { TaskList } from './entities/tasks-list.entity';
import { CreateTasksListDto } from './dto/create-tasks-list.dto';
import { UpdateTasksListDto } from './dto/update-tasks-list.dto';
import { Task } from 'src/tasks/entities/task.entity';

@Controller('task-lists')
export class TaskListController {
  constructor(private readonly taskListService: TasksListService) {}

  @Get()
  async findAll(): Promise<TaskList[]> {
    return this.taskListService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TaskList> {
    return this.taskListService.findOne(+id);
  }

  @Post()
  async create(@Body() createTasksListDto: CreateTasksListDto): Promise<TaskList> {
    return this.taskListService.create(createTasksListDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTasksListDto: UpdateTasksListDto): Promise<TaskList> {
    return this.taskListService.update(+id, updateTasksListDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.taskListService.remove(+id);
  }

//    @Get(':taskListId/tasks')
//   findTasksForList(@Param('taskListId') taskListId: string): Promise<Task[]> {
//     return this.taskListService.findTasksForList(+taskListId);
//   }
 }
