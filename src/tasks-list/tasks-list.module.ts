import { Module } from '@nestjs/common';
import { TasksListService } from './tasks-list.service';
import { TaskListController } from './tasks-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskList } from './entities/tasks-list.entity';
import { TaskListRepository } from './tasks-list.repositori';

@Module({
   imports: [TypeOrmModule.forFeature([TaskList, TaskListRepository])],
  controllers: [TaskListController],
  providers: [TasksListService],
})
export class TasksListModule {}
