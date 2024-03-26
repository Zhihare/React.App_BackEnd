import { Module } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { ActivityLogController } from './activity-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLog } from './entities/activity-log.entity';
import { ActivityLogRepository } from './activity-log.repository';
import { Task } from 'src/tasks/entities/task.entity';
import { TaskRepository } from 'src/tasks/tasks.repository';
import { TaskListRepository } from 'src/tasks-list/tasks-list.repository';
import { TaskList } from 'src/tasks-list/entities/tasks-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityLog, ActivityLogRepository]),
    TypeOrmModule.forFeature([Task, TaskRepository]),
    TypeOrmModule.forFeature([TaskList, TaskListRepository])
  ],
  controllers: [ActivityLogController],
  providers: [ActivityLogService],
})
export class ActivityLogModule {}
