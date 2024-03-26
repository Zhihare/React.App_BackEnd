import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTasksDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { ActivityLogService } from 'src/activity-log/activity-log.service';
import { CreateActivityLogDto } from 'src/activity-log/dto/create-activity-log.dto';
import { TasksListService } from 'src/tasks-list/tasks-list.service';

@Controller('tasks')
  
export class TaskController {
  constructor(private readonly taskService: TasksService,
    private readonly activityLogService: ActivityLogService,
   private readonly taskListService: TasksListService,) { }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(+id);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTasksDto): Promise<Task> {
    try {
      const task = await this.taskService.create(createTaskDto);
      const taskListName = await this.taskListService.getNameById(createTaskDto.list);
     await console.log(taskListName);
       const createActivityLogDto: CreateActivityLogDto = {
      task: createTaskDto.name,
      taskList: taskListName, // Используем свойство name из createTasksListDto
      action: `Your created this task`,
      description: `Your added ${createTaskDto.name} to the ${taskListName}`,
      timestamp: new Date(),
      };
      await this.activityLogService.create(createActivityLogDto);
      return task;
    } catch (error) { 
      throw new HttpException('Failed to create task', HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
