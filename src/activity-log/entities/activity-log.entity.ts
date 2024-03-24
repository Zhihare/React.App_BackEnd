import { TaskList } from "src/tasks-list/entities/tasks-list.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ActivityLog {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Task, task => task.activityLog)
    task: Task;

   @ManyToOne(type => TaskList, taskList => taskList.tasklist)
    taskList: TaskList; // Добавленный столбец

    @Column({ length: 100 })
    action: string;

    @Column('text', { nullable: true })
    description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;
}
