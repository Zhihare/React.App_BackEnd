import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTasksDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskRepository } from './tasks.repository';
import { TasksListService } from 'src/tasks-list/tasks-list.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: TaskRepository,
    private readonly taskListService: TasksListService,
  ) { }



  async create(createTasksDto: CreateTasksDto): Promise<Task> {
    const { name, description, priority, deadline, list } = createTasksDto;
    
    // Находим список задач по его идентификатору
    const taskList = await this.taskListService.findOne(list);

    // Проверяем, найден ли список задач
    if (!taskList) {
      throw new NotFoundException(`Task list with ID ${list} not found`);
    }

    // Создаем новую задачу, передавая объект списка задач
    const task = this.taskRepository.create({ name, description, priority, deadline, list: taskList });

    // Сохраняем задачу в базе данных
    return this.taskRepository.save(task);
  }


  

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['list'] });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: id }, relations: ['list'] });
    if (!task) {
      throw new NotFoundException(`TaskList with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTasksDto: UpdateTaskDto): Promise<Task> {
    const { name, description, priority, deadline, list } = updateTasksDto;
    const taskList = await this.taskListService.findOne(list);
    
    await this.taskRepository.update(id, { name, description, priority, deadline, list: taskList });
    return this.findOne(id);
  }


  async remove(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`TaskList with ID ${id} not found`);
    }
  }


  async getNameById(id: number): Promise<string> {
    const task = await this.taskRepository.findOne({ where: { id: id } });
    if (task) {
      return task.name;
    } else {
      throw new NotFoundException('Task list not found');
    }
  }
}

