import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTasksDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
  
export class TaskController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(+id);
  }

  @Post()
  async create(@Body() createTasksListDto: CreateTasksDto): Promise<Task> {
    return this.taskService.create(createTasksListDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTasksListDto: UpdateTaskDto): Promise<Task> {
    return this.taskService.update(+id, updateTasksListDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.taskService.remove(+id);
  }
}
