import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksListModule } from './tasks-list/tasks-list.module';
import { ActivityLogModule } from './activity-log/activity-log.module';


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
    }),  
    inject: [ConfigService],
  }), TasksListModule, ActivityLogModule],
  controllers: [AppController],
  providers: [AppService],
})
  
export class AppModule {}
