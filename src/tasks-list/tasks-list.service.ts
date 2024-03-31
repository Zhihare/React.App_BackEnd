import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskList } from './entities/tasks-list.entity';
import { CreateTasksListDto } from './dto/create-tasks-list.dto';
import { UpdateTasksListDto } from './dto/update-tasks-list.dto';


@Injectable()
export class TasksListService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>,
  ) {}

  async create(createTasksListDto: CreateTasksListDto): Promise<TaskList> {
    const taskList = this.taskListRepository.create(createTasksListDto);
    return this.taskListRepository.save(taskList);
  }

  async findAll(): Promise<TaskList[]> {
    return this.taskListRepository.find({ relations: ['tasklist', 'tasks'] });
  }

  async findOne(id: number): Promise<TaskList> {
    const taskList = await this.taskListRepository.findOne({ where: { id: id },  relations: ['tasklist', 'tasks'] });
    if (!taskList) {
      throw new NotFoundException(`TaskList with ID ${id} not found`);
    }
    return taskList;
  }

  async getNameById(id: number): Promise<string> {
    const taskList = await this.taskListRepository.findOne({ where: { id: id } });
    if (taskList) {
      return taskList.name;
    } else {
      throw new NotFoundException('Task list not found');
    }
  }

  //  async findTasksForList(taskListId: number): Promise<Task[]> {
  //   const taskList = await this.taskListRepository.findOne(taskListId, { relations: ['tasks'] });
  //   if (!taskList) {
  //     throw new NotFoundException(`TaskList with ID ${taskListId} not found`);
  //   }
  //   return taskList.tasks;
  // }


  async update(id: number, updateTasksListDto: UpdateTasksListDto): Promise<TaskList> {
    await this.taskListRepository.update(id, updateTasksListDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.taskListRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`TaskList with ID ${id} not found`);
    }
  }
}
