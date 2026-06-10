import { Module, Injectable, Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PortalUser } from './entities/portal-user.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import * as crypto from 'crypto';

@Injectable()
export class PortalUsersService {
  constructor(@InjectRepository(PortalUser) private repo: Repository<PortalUser>) {}
  async create(dto: Partial<PortalUser>) {
    const hash = crypto.createHash('sha256').update(dto.passwordHash || 'changeme').digest('hex');
    const e = this.repo.create({ ...dto, passwordHash: hash });
    return this.repo.save(e);
  }
  async findAll() { return this.repo.find({ order: { displayName: 'ASC' } }); }
  async findById(id: string) { const e = await this.repo.findOne({ where: { id } }); if (!e) throw new NotFoundException(); return e; }
  async update(id: string, dto: Partial<PortalUser>) { const e = await this.findById(id); Object.assign(e, dto); return this.repo.save(e); }
}

@ApiTags('Portal Users')
@Controller('portal-users')
export class PortalUsersController {
  constructor(private readonly service: PortalUsersService) {}
  @Post() @ApiOperation({ summary: 'Create portal user' }) create(@Body() dto: any) { return this.service.create(dto); }
  @Get() @ApiOperation({ summary: 'List portal users' }) findAll() { return this.service.findAll(); }
  @Get(':id') @ApiOperation({ summary: 'Get portal user' }) findById(@Param('id') id: string) { return this.service.findById(id); }
}

@Module({ imports: [TypeOrmModule.forFeature([PortalUser])], controllers: [PortalUsersController], providers: [PortalUsersService], exports: [PortalUsersService] })
export class PortalUsersModule {}