import { ActivityLog } from "src/activity-log/entities/activity-log.entity";
import { TaskList } from "src/tasks-list/entities/tasks-list.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column('text', { nullable: true })
    description: string;

    @Column({ type: 'timestamp', nullable: true })
    deadline: Date;

    @Column({ length: 50, nullable: true })
    priority: string;

    @ManyToOne(type => TaskList, list => list.tasks, { onDelete: 'CASCADE' })
    list: TaskList;

    @OneToMany(type => ActivityLog, log => log.task)
    activityLog: ActivityLog[];
  
}

