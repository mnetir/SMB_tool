import {
  Module, Injectable, Controller, Get, Post, Body, Param, Query,
  NotFoundException, ConflictException, BadRequestException, Logger
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionPermission } from './entities/subscription-permission.entity';
import { SubscriptionLimit } from './entities/subscription-limit.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Injectable()
export class SubscriptionsService {
  private readonly logger = new Logger(SubscriptionsService.name);
  constructor(
    @InjectRepository(Subscription) private repo: Repository<Subscription>,
    @InjectRepository(SubscriptionPermission) private spRepo: Repository<SubscriptionPermission>,
    @InjectRepository(SubscriptionLimit) private slRepo: Repository<SubscriptionLimit>,
  ) {}

  async create(dto: Partial<Subscription>) {
    if (dto.isTrial && dto.trialEndsAt) {
      dto.status = 'active';
    }
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  async findAll(query?: { customerId?: string; status?: string; page?: number; limit?: number }) {
    const where: any = {};
    if (query?.customerId) where.customerId = query.customerId;
    if (query?.status) where.status = query.status;
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const [items, total] = await this.repo.findAndCount({
      where, relations: ['customer', 'plan'],
      skip: (page - 1) * limit, take: limit,
      order: { createdAtUtc: 'DESC' },
    });
    return { items, total, page, limit };
  }

  async findById(id: string) {
    const e = await this.repo.findOne({
      where: { id },
      relations: ['customer', 'plan', 'subscriptionPermissions', 'subscriptionLimits', 'license', 'invoices', 'amendments'],
    });
    if (!e) throw new NotFoundException(`Subscription ${id} not found`);
    return e;
  }

  async activate(id: string) {
    const e = await this.findById(id);
    e.status = 'active';
    e.startDate = new Date();
    return this.repo.save(e);
  }

  async suspend(id: string) {
    const e = await this.findById(id);
    e.status = 'suspended';
    return this.repo.save(e);
  }

  async resume(id: string) {
    const e = await this.findById(id);
    e.status = 'active';
    return this.repo.save(e);
  }

  async cancel(id: string) {
    const e = await this.findById(id);
    e.status = 'cancelled';
    return this.repo.save(e);
  }
}

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly service: SubscriptionsService) {}
  @Post() @ApiOperation({ summary: 'Create subscription' }) create(@Body() dto: any) { return this.service.create(dto); }
  @Get() @ApiOperation({ summary: 'List subscriptions' }) findAll(@Query() query: any) { return this.service.findAll(query); }
  @Get(':id') @ApiOperation({ summary: 'Get subscription' }) findById(@Param('id') id: string) { return this.service.findById(id); }
  @Post(':id/activate') @ApiOperation({ summary: 'Activate subscription' }) activate(@Param('id') id: string) { return this.service.activate(id); }
  @Post(':id/suspend') @ApiOperation({ summary: 'Suspend subscription' }) suspend(@Param('id') id: string) { return this.service.suspend(id); }
  @Post(':id/resume') @ApiOperation({ summary: 'Resume subscription' }) resume(@Param('id') id: string) { return this.service.resume(id); }
  @Post(':id/cancel') @ApiOperation({ summary: 'Cancel subscription' }) cancel(@Param('id') id: string) { return this.service.cancel(id); }
}

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, SubscriptionPermission, SubscriptionLimit])],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}