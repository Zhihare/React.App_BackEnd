import { Module } from '@nestjs/common';
import { TasksListService } from './tasks-list.service';
import { TaskListController } from './tasks-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskList } from './entities/tasks-list.entity';
import { TaskListRepository } from './tasks-list.repository';
import { ActivityLog } from 'src/activity-log/entities/activity-log.entity';
import { ActivityLogRepository } from 'src/activity-log/activity-log.repository';
import { ActivityLogService } from 'src/activity-log/activity-log.service';
import { Task } from 'src/tasks/entities/task.entity';
import { TaskRepository } from 'src/tasks/tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList, TaskListRepository]),
    TypeOrmModule.forFeature([ActivityLog, ActivityLogRepository]),
    TypeOrmModule.forFeature([Task, TaskRepository])],
  controllers: [TaskListController],
  providers: [TasksListService, ActivityLogService],
})
export class TasksListModule {}
