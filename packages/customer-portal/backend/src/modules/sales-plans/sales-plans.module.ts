import {
  Module, Injectable, Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException,
  Logger
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesPlan } from './entities/sales-plan.entity';
import { PlanPermission } from './entities/plan-permission.entity';
import { PlanLimit } from './entities/plan-limit.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Injectable()
export class SalesPlansService {
  private readonly logger = new Logger(SalesPlansService.name);
  constructor(
    @InjectRepository(SalesPlan) private repo: Repository<SalesPlan>,
    @InjectRepository(PlanPermission) private ppRepo: Repository<PlanPermission>,
    @InjectRepository(PlanLimit) private plRepo: Repository<PlanLimit>,
  ) {}

  async create(dto: Partial<SalesPlan>) { const e = this.repo.create(dto); return this.repo.save(e); }

  async findAll() { return this.repo.find({ relations: ['product', 'planPermissions', 'planLimits'] }); }

  async findById(id: string) {
    const e = await this.repo.findOne({ where: { id }, relations: ['product', 'planPermissions', 'planLimits', 'planPermissions.permission', 'planLimits.limitDef'] });
    if (!e) throw new NotFoundException(`SalesPlan ${id} not found`); return e;
  }

  async update(id: string, dto: Partial<SalesPlan>) { const e = await this.findById(id); Object.assign(e, dto); return this.repo.save(e); }
  async remove(id: string) { const e = await this.findById(id); await this.repo.remove(e); }

  async setLimits(planId: string, limits: { limitId: string; value: number }[]) {
    await this.plRepo.delete({ planId });
    const entities = limits.map(l => this.plRepo.create({ planId, limitId: l.limitId, value: l.value }));
    return this.plRepo.save(entities);
  }

  async setPermissions(planId: string, permissionIds: string[]) {
    await this.ppRepo.delete({ planId });
    const entities = permissionIds.map(pid => this.ppRepo.create({ planId, permissionId: pid }));
    return this.ppRepo.save(entities);
  }
}

@ApiTags('Sales Plans')
@Controller('sales-plans')
export class SalesPlansController {
  constructor(private readonly service: SalesPlansService) {}
  @Post() @ApiOperation({ summary: 'Create sales plan' }) create(@Body() dto: any) { return this.service.create(dto); }
  @Get() @ApiOperation({ summary: 'List sales plans' }) findAll() { return this.service.findAll(); }
  @Get(':id') @ApiOperation({ summary: 'Get sales plan' }) findById(@Param('id') id: string) { return this.service.findById(id); }
  @Patch(':id') @ApiOperation({ summary: 'Update sales plan' }) update(@Param('id') id: string, @Body() dto: any) { return this.service.update(id, dto); }
  @Delete(':id') @ApiOperation({ summary: 'Delete sales plan' }) remove(@Param('id') id: string) { return this.service.remove(id); }
  @Put(':id/limits') @ApiOperation({ summary: 'Configure plan limits' }) setLimits(@Param('id') id: string, @Body() dto: any) { return this.service.setLimits(id, dto.limits); }
  @Put(':id/permissions') @ApiOperation({ summary: 'Configure plan permissions' }) setPermissions(@Param('id') id: string, @Body() dto: any) { return this.service.setPermissions(id, dto.permissionIds); }
}

@Module({
  imports: [TypeOrmModule.forFeature([SalesPlan, PlanPermission, PlanLimit])],
  controllers: [SalesPlansController],
  providers: [SalesPlansService],
  exports: [SalesPlansService],
})
export class SalesPlansModule {}