import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ActivityLogService } from './activity-log.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';

@Injectable()
export class ActivityLogMiddleware implements NestMiddleware {
    constructor(private readonly activityLogService: ActivityLogService) { }

    use(req: Request, res: Response, next: NextFunction) {
        const { task, taskList,task_Id, listId, action, description, timestamp } = req.body; // Предполагается, что данные приходят в теле запроса
        const createActivityLogDto: CreateActivityLogDto = { task, taskList, task_Id, listId, action, description, timestamp };
        this.activityLogService.create(createActivityLogDto);
        next();
    }
}