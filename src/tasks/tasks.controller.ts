import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, HttpCode, Header, Res } from '@nestjs/common';
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

      const { name } = await this.taskListService.findOne(createTaskDto.list);

       const createActivityLogDto: CreateActivityLogDto = {
      task: task,
      task_Id: task.id,
      taskList: task.list,
      listId: task.list.id,
      action: `Your created this task`,
      description: `Your added @${task.name} to the @${name}`,
      timestamp: new Date(),
      };

      
      await this.activityLogService.create(createActivityLogDto);
      return task;
    } catch (error) { 
      throw new HttpException('Failed to create task', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTasktDto: UpdateTaskDto): Promise<Task> {
    try {
      const task = await this.taskService.update(+id, updateTasktDto);
      const taskList = await this.taskListService.findOne(updateTasktDto.list);
      
      const createActivityLogDto: CreateActivityLogDto = {
        task: task,
        task_Id: task.id,
        taskList: taskList,
      listId: taskList.id,
      action: `Your update this task`,
      description: `Your update @${updateTasktDto.name} to the @${taskList.name}`,
      timestamp: new Date(),
      };

      await this.activityLogService.create(createActivityLogDto);
      return task;
    } catch {
       throw new HttpException('Failed to update task', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async remove(@Param('id') id: string, @Res() res): Promise<void> {
   try {
    
     const  task = await this.taskService.findOne(+id);
   
    const createActivityLogDto: CreateActivityLogDto = {
      task: null,
      task_Id: 0,
      listId: 0,
      taskList: null,
      action: `Your task @'${task.name}' has been removed`,
      description: "removed task",
      timestamp: new Date(),
    };
    
     await this.activityLogService.create(createActivityLogDto);
     
     await this.taskService.remove(+id);

   
    res.status(HttpStatus.OK).send({ message: 'Task list removed successfully' });
  } catch (error) {
     console.error('Error while removing task list:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'An error occurred while removing the task list' });
  }
}
}
