import { Module, Injectable, Controller, Get, Post, Patch, Delete, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import * as crypto from 'crypto';

@Injectable()
export class CustomersService {
  constructor(@InjectRepository(Customer) private repo: Repository<Customer>) {}

  async create(dto: Partial<Customer>) {
    const existing = await this.repo.findOne({ where: { alias: dto.alias } });
    if (existing) throw new (require('@nestjs/common').ConflictException)('Alias already exists');
    const e = this.repo.create(dto);
    return this.repo.save(e);
  }

  async findAll(query?: { status?: string; search?: string; page?: number; limit?: number }) {
    const qb = this.repo.createQueryBuilder('c');
    if (query?.status) qb.andWhere('c.status = :status', { status: query.status });
    if (query?.search) qb.andWhere('(c.name ILIKE :search OR c.alias ILIKE :search)', { search: `%${query.search}%` });
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const [items, total] = await qb.skip((page - 1) * limit).take(limit).orderBy('c.createdAtUtc', 'DESC').getManyAndCount();
    return { items, total, page, limit };
  }

  async findById(id: string) {
    const e = await this.repo.findOne({ where: { id }, relations: ['subscriptions', 'invoices'] });
    if (!e) throw new NotFoundException(`Customer ${id} not found`); return e;
  }

  async update(id: string, dto: Partial<Customer>) { const e = await this.findById(id); Object.assign(e, dto); return this.repo.save(e); }

  async suspend(id: string, reason?: string) {
    const e = await this.findById(id);
    e.status = 'suspended';
    return this.repo.save(e);
  }

  async remove(id: string) { const e = await this.findById(id); await this.repo.remove(e); }
}

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly service: CustomersService) {}
  @Post() @ApiOperation({ summary: 'Create customer' }) create(@Body() dto: any) { return this.service.create(dto); }
  @Get() @ApiOperation({ summary: 'List customers' }) findAll(@Query() query: any) { return this.service.findAll(query); }
  @Get(':id') @ApiOperation({ summary: 'Get customer' }) findById(@Param('id') id: string) { return this.service.findById(id); }
  @Patch(':id') @ApiOperation({ summary: 'Update customer' }) update(@Param('id') id: string, @Body() dto: any) { return this.service.update(id, dto); }
  @Post(':id/suspend') @ApiOperation({ summary: 'Suspend customer' }) suspend(@Param('id') id: string, @Body() dto: any) { return this.service.suspend(id, dto?.reason); }
}

@Module({ imports: [TypeOrmModule.forFeature([Customer])], controllers: [CustomersController], providers: [CustomersService], exports: [CustomersService] })
export class CustomersModule {}