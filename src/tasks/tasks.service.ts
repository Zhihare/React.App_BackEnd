import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTasksDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: TaskRepository,
  ) { }



  async create(createTasksDto: CreateTasksDto): Promise<Task> {
    const task = this.taskRepository.create(createTasksDto);
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: id } });
    if (!task) {
      throw new NotFoundException(`TaskList with ID ${id} not found`);
    }
    return task;
  }

   async update(id: number, updateTasksDto: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, updateTasksDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`TaskList with ID ${id} not found`);
    }
  }
}

