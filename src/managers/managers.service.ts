import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto.js';
import { UpdateManagerDto } from './dto/update-manager.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from './entities/manager.entity.js';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ){}

 create(createManagerDto: CreateManagerDto) {
    const manager = this.managerRepository.create(createManagerDto as any);
    return this.managerRepository.save(manager);
  }

  findAll() {
    return this.managerRepository.find();
  }

  async findOne(id: string) {
    
    const manager = await this.managerRepository.findOneBy({
      managerId: id
    });
    
    if (!manager) throw new NotFoundException(`Manager with ID ${id} not found`);
    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const managerToUpdate = await this.managerRepository.preload({
      managerId: id,
      ...updateManagerDto as any
    } as any);
    
    if (!managerToUpdate) throw new NotFoundException(`Manager with ID ${id} not found`);
    return this.managerRepository.save(managerToUpdate);
  }

  async remove(id: string) {
    const manager = await this.findOne(id);
    await this.managerRepository.remove(manager);
    return { message: `Manager with ID ${id} was deleted successfully` };
  }
}