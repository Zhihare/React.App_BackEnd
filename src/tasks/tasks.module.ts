import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskListRepository } from 'src/tasks-list/tasks-list.repository';
import { TaskRepository } from './tasks.repository';
import { ActivityLogService } from 'src/activity-log/activity-log.service';
import { ActivityLogRepository } from 'src/activity-log/activity-log.repository';
import { ActivityLog } from 'src/activity-log/entities/activity-log.entity';
import { TaskList } from 'src/tasks-list/entities/tasks-list.entity';
import { TasksListService } from 'src/tasks-list/tasks-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskRepository]),
  TypeOrmModule.forFeature([ActivityLog, ActivityLogRepository]),
  TypeOrmModule.forFeature([TaskList, TaskListRepository])],
  controllers: [TaskController],
  providers: [TasksService, ActivityLogService, TasksListService],
})
export class TasksModule {}
