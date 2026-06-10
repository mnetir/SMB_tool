import { Module, Injectable, Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Injectable()
export class PermissionsService {
  constructor(@InjectRepository(Permission) private repo: Repository<Permission>) {}
  async create(dto: Partial<Permission>) { const e = this.repo.create(dto); return this.repo.save(e); }
  async findByModule(moduleId: string) { return this.repo.find({ where: { moduleId } }); }
  async findById(id: string) { const e = await this.repo.findOne({ where: { id } }); if (!e) throw new (require('@nestjs/common').NotFoundException)(`Permission ${id} not found`); return e; }
  async update(id: string, dto: Partial<Permission>) { const e = await this.findById(id); Object.assign(e, dto); return this.repo.save(e); }
  async remove(id: string) { const e = await this.findById(id); await this.repo.remove(e); }
}

@ApiTags('Permissions')
@Controller('modules/:moduleId/permissions')
export class PermissionsController {
  constructor(private readonly service: PermissionsService) {}
  @Post() @ApiOperation({ summary: 'Create permission' }) create(@Param('moduleId') moduleId: string, @Body() dto: any) { return this.service.create({ ...dto, moduleId }); }
  @Get() @ApiOperation({ summary: 'List permissions for module' }) findAll(@Param('moduleId') moduleId: string) { return this.service.findByModule(moduleId); }
  @Patch(':id') @ApiOperation({ summary: 'Update permission' }) update(@Param('id') id: string, @Body() dto: any) { return this.service.update(id, dto); }
  @Delete(':id') @ApiOperation({ summary: 'Delete permission' }) remove(@Param('id') id: string) { return this.service.remove(id); }
}

@Module({ imports: [TypeOrmModule.forFeature([Permission])], controllers: [PermissionsController], providers: [PermissionsService], exports: [PermissionsService] })
export class PermissionsModule {}