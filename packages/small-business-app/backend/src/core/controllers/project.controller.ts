import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProjectService } from '../services/project.service';
import { Project } from '../entities/project.entity';
import { CreateProjectDto } from '../dto/create-org-node.dto';

@ApiTags('Core - Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiOperation({ summary: 'List all projects' })
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a project' })
  async create(@Body() dto: CreateProjectDto): Promise<Project> {
    return this.projectService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a project' })
  async update(@Param('id') id: string, @Body() data: Partial<Project>): Promise<Project> {
    return this.projectService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.projectService.remove(id);
  }
}