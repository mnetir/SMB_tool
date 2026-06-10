import { Module, Injectable, Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionLimit } from './entities/permission-limit.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Injectable()
export class PermissionLimitsService {
  constructor(@InjectRepository(PermissionLimit) private repo: Repository<PermissionLimit>) {}
  async create(dto: Partial<PermissionLimit>) { const e = this.repo.create(dto); return this.repo.save(e); }
  async findByModule(moduleId: string) { return this.repo.find({ where: { moduleId } }); }
  async findById(id: string) { const e = await this.repo.findOne({ where: { id } }); if (!e) throw new NotFoundException(`PermissionLimit ${id} not found`); return e; }
  async update(id: string, dto: Partial<PermissionLimit>) { const e = await this.findById(id); Object.assign(e, dto); return this.repo.save(e); }
  async remove(id: string) { const e = await this.findById(id); await this.repo.remove(e); }
}

@ApiTags('Permission Limits')
@Controller('modules/:moduleId/limits')
export class PermissionLimitsController {
  constructor(private readonly service: PermissionLimitsService) {}
  @Post() @ApiOperation({ summary: 'Create permission limit' }) create(@Param('moduleId') moduleId: string, @Body() dto: any) { return this.service.create({ ...dto, moduleId }); }
  @Get() @ApiOperation({ summary: 'List limits for module' }) findAll(@Param('moduleId') moduleId: string) { return this.service.findByModule(moduleId); }
  @Patch(':id') @ApiOperation({ summary: 'Update limit' }) update(@Param('id') id: string, @Body() dto: any) { return this.service.update(id, dto); }
  @Delete(':id') @ApiOperation({ summary: 'Delete limit' }) remove(@Param('id') id: string) { return this.service.remove(id); }
}

@Module({ imports: [TypeOrmModule.forFeature([PermissionLimit])], controllers: [PermissionLimitsController], providers: [PermissionLimitsService], exports: [PermissionLimitsService] })
export class PermissionLimitsModule {}