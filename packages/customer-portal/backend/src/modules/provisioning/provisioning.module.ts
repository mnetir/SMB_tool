import { Module, Injectable, Controller, Get, Post, Body, Param, Query, NotFoundException, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProvisioningRequest } from './entities/provisioning-request.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Injectable()
export class ProvisioningService {
  private readonly logger = new Logger(ProvisioningService.name);
  constructor(@InjectRepository(ProvisioningRequest) private repo: Repository<ProvisioningRequest>) {}

  async trigger(subscriptionId: string, action: string, metadata?: any) {
    const e = this.repo.create({ subscriptionId, action, status: 'pending', metadata });
    return this.repo.save(e);
  }

  async findBySubscription(subscriptionId: string) {
    return this.repo.find({ where: { subscriptionId }, order: { createdAtUtc: 'DESC' } });
  }

  async findAll(query?: { status?: string; page?: number; limit?: number }) {
    const where: any = {};
    if (query?.status) where.status = query.status;
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const [items, total] = await this.repo.findAndCount({ where, skip: (page-1)*limit, take: limit, order: { createdAtUtc: 'DESC' } });
    return { items, total, page, limit };
  }

  async updateStatus(id: string, status: string, result?: any, errorMessage?: string) {
    const e = await this.repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException();
    e.status = status as any;
    if (result) e.result = result;
    if (errorMessage) e.errorMessage = errorMessage;
    if (status === 'completed' || status === 'failed') e.completedAt = new Date();
    return this.repo.save(e);
  }
}

@ApiTags('Provisioning')
@Controller('provisioning')
export class ProvisioningController {
  constructor(private readonly service: ProvisioningService) {}
  @Post('trigger') @ApiOperation({ summary: 'Trigger provisioning action' }) trigger(@Body() dto: any) { return this.service.trigger(dto.subscriptionId, dto.action, dto.metadata); }
  @Get() @ApiOperation({ summary: 'List provisioning requests' }) findAll(@Query() query: any) { return this.service.findAll(query); }
}

@Module({ imports: [TypeOrmModule.forFeature([ProvisioningRequest])], controllers: [ProvisioningController], providers: [ProvisioningService], exports: [ProvisioningService] })
export class ProvisioningModule {}