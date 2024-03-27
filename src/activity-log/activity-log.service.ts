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
  ) { }

async create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog> {
    const activityLog = this.activityLogRepository.create(createActivityLogDto);
    return this.activityLogRepository.save(activityLog);
  }


  async findAll(): Promise<ActivityLog[]> {
    return this.activityLogRepository.find();
  }

  async findByTaskId(taskId: number): Promise<ActivityLog[]> {
    return this.activityLogRepository.find({ where: {task_Id:  taskId } });
  }
}