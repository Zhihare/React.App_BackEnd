import { EntityRepository, Repository } from 'typeorm';
import {ActivityLog} from './entities/activity-log.entity';


@EntityRepository(ActivityLog)
export class ActivityLogRepository extends Repository<ActivityLog> {
    // Здесь вы можете определить пользовательские методы для работы с TaskList
}