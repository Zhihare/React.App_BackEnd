import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksListModule } from './tasks-list/tasks-list.module';
import { ActivityLogModule } from './activity-log/activity-log.module';
import { ActivityLogService } from './activity-log/activity-log.service';
import { ActivityLogMiddleware } from './activity-log/activity-log.middleware';
import { ActivityLog } from './activity-log/entities/activity-log.entity';
import { ActivityLogRepository } from './activity-log/activity-log.repository';
import { TaskListRepository } from './tasks-list/tasks-list.repository';
import { TaskList } from './tasks-list/entities/tasks-list.entity';
import { Task } from './tasks/entities/task.entity';
import { TaskRepository } from './tasks/tasks.repository';


@Module({
  imports: [TasksModule, ConfigModule.forRoot(), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      type:'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: true,
    }),  
    inject: [ConfigService],
  }), TasksListModule, ActivityLogModule,
    TypeOrmModule.forFeature([ActivityLog, ActivityLogRepository]),
    TypeOrmModule.forFeature([TaskList, TaskListRepository]),
    TypeOrmModule.forFeature([Task, TaskRepository])],
  controllers: [AppController],
  providers: [AppService, ActivityLogService],
})
  
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(ActivityLogMiddleware)
    //   .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
