import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskListRepository } from 'src/tasks-list/tasks-list.repositori';

@Module({
   imports: [TypeOrmModule.forFeature([Task, TaskListRepository])],
  controllers: [TaskController],
  providers: [TasksService],
})
export class TasksModule {}
