import { Injectable } from '@nestjs/common';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityLog } from './entities/activity-log.entity';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { TaskList } from 'src/tasks-list/entities/tasks-list.entity';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLog)
    private readonly activityLogRepository: Repository<ActivityLog>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>,
  ) {}

  async create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog> {
    const { task, taskList, action, description, timestamp } = createActivityLogDto;
  
    // Находим реальные объекты задачи и списка задач
   
    const realTaskList = await this.taskListRepository.findOne({ where: { name: taskList } });;
     
    // Создаем новую запись в журнале активности
    const activityLog = new ActivityLog();
    activityLog.task = null;
    activityLog.taskList = realTaskList;
    activityLog.action = action;
    activityLog.description = description;
    activityLog.timestamp = timestamp;

    // Сохраняем запись в БД и возвращаем ее
    return this.activityLogRepository.save(activityLog);
  }




 async findAll(): Promise<ActivityLog[]> {
    return this.activityLogRepository.find();
  }

  async findByAction(action: string): Promise<ActivityLog[]> {
    return this.activityLogRepository.find({ where: { action } });
  }
}