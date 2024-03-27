// task-list.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Header, Res, Req, HttpException } from '@nestjs/common';
import { TasksListService } from './tasks-list.service';
import { TaskList } from './entities/tasks-list.entity';
import { CreateTasksListDto } from './dto/create-tasks-list.dto';
import { UpdateTasksListDto } from './dto/update-tasks-list.dto';
import { CreateActivityLogDto } from 'src/activity-log/dto/create-activity-log.dto';
import { ActivityLogService } from 'src/activity-log/activity-log.service';

@Controller('task-lists')
export class TaskListController {
  constructor(
    private readonly taskListService: TasksListService,
    private readonly activityLogService: ActivityLogService,) { }

  @Get()
  async findAll(): Promise<TaskList[]> {
    return this.taskListService.findAll();
  }




  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TaskList> {
    return this.taskListService.findOne(+id);
  }

@Post()
@HttpCode(HttpStatus.CREATED)
@Header('Content-Type', 'application/json')
async create(@Body() createTasksListDto: CreateTasksListDto): Promise<TaskList> {
  try {
    const taskList = await this.taskListService.create(createTasksListDto);
    
    // Создание и сохранение записи в журнале активности при создании списка задач
    const createActivityLogDto: CreateActivityLogDto = {
      task: null,
      taskList: taskList, // Используем свойство name из createTasksListDto
      action: `Your added ${createTasksListDto.name} to the planed`,
      description: "add a task to the plan",
      timestamp: new Date(),
    };
    
    await this.activityLogService.create(createActivityLogDto); // Вызов метода создания записи в журнале активности
    return taskList;
  } catch (error) {
    // Обработка ошибки
    // Возвращаем HTTP-ответ с сообщением об ошибке
    throw new HttpException('Failed to create task list', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}


  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async update(@Param('id') id: string, @Body() updateTasksListDto: UpdateTasksListDto): Promise<TaskList> {
    try {
    const taskListName = await this.taskListService.getNameById(+id);
    const taskList = await this.taskListService.update(+id, updateTasksListDto);

    const createActivityLogDto: CreateActivityLogDto = {
      task: null,
      taskList: taskList, // Используем свойство name из createTasksListDto
      action: `Your list ${taskListName} has been changed to: ${updateTasksListDto.name}`,
      description: "changed name task list",
      timestamp: new Date(),
    };
    
    await this.activityLogService.create(createActivityLogDto);
    
    return taskList;
  } catch (error) {
    // Обработка ошибки
    // Возвращаем HTTP-ответ с сообщением об ошибке
    throw new HttpException('Failed to update task list', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/json')
  async remove(@Param('id') id: string, @Res() res): Promise<void> {
   try {
     const {name} = await this.taskListService.findOne(+id);
     
      await this.taskListService.remove(+id);

    const createActivityLogDto: CreateActivityLogDto = {
      task: null,
      taskList: null,
      action: `Your list '${name}' has been removed`,
      description: "removed task list",
      timestamp: new Date(),
    };
    
    
    await this.activityLogService.create(createActivityLogDto);
   
   
    res.status(HttpStatus.OK).send({ message: 'Task list removed successfully' });
  } catch (error) {
     console.error('Error while removing task list:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'An error occurred while removing the task list' });
  }
}

//    @Get(':taskListId/tasks')
//   findTasksForList(@Param('taskListId') taskListId: string): Promise<Task[]> {
//     return this.taskListService.findTasksForList(+taskListId);
//   }
 }
