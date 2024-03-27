import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';
import { Task } from 'src/tasks/entities/task.entity';
import { ActivityLog } from './entities/activity-log.entity';

@Controller('activity-log')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Post()
  create(@Body() createActivityLogDto: CreateActivityLogDto) {
    return this.activityLogService.create(createActivityLogDto);
  }

  @Get()
  findAll() {
    return this.activityLogService.findAll();
  }

  @Get(':TaskId')
  async findByAction(@Param('TaskId') TaskId: number): Promise<ActivityLog[]> {
    return this.activityLogService.findByTaskId(TaskId);
  }
}

