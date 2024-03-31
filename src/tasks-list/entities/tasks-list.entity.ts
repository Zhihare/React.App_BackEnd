import { ActivityLog } from "src/activity-log/entities/activity-log.entity";
import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaskList {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 255 })
    name: string;

    @OneToMany(type => ActivityLog, task => task.taskList, { onDelete: 'CASCADE' })
    tasklist: ActivityLog[];

    @OneToMany(type => Task, task => task.list, { onDelete: 'CASCADE' })
    tasks: Task[];


}
