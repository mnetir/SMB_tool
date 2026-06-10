import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Module as ModuleEntity } from './entities/module.entity';

@Injectable()
export class PortalModulesService {
  constructor(
    @InjectRepository(ModuleEntity)
    private readonly moduleRepo: Repository<ModuleEntity>,
  ) {}

  async create(dto: Partial<ModuleEntity>): Promise<ModuleEntity> {
    const entity = this.moduleRepo.create(dto);
    return this.moduleRepo.save(entity);
  }

  async findByProduct(productId: string): Promise<ModuleEntity[]> {
    return this.moduleRepo.find({
      where: { productId },
      relations: ['permissions', 'limits'],
      order: { name: 'ASC' },
    });
  }

  async findById(id: string): Promise<ModuleEntity> {
    const entity = await this.moduleRepo.findOne({
      where: { id },
      relations: ['permissions', 'limits'],
    });
    if (!entity) throw new NotFoundException(`Module ${id} not found`);
    return entity;
  }

  async update(id: string, dto: Partial<ModuleEntity>): Promise<ModuleEntity> {
    const entity = await this.findById(id);
    Object.assign(entity, dto);
    return this.moduleRepo.save(entity);
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findById(id);
    await this.moduleRepo.remove(entity);
  }
}