import { Module, Injectable, Controller, Get, Post, Patch, Body, Param, Query, NotFoundException, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from './entities/invoice-item.entity';
import { InvoiceAmendment } from './entities/invoice-amendment.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);
  constructor(
    @InjectRepository(Invoice) private repo: Repository<Invoice>,
    @InjectRepository(InvoiceItem) private itemRepo: Repository<InvoiceItem>,
    @InjectRepository(InvoiceAmendment) private amRepo: Repository<InvoiceAmendment>,
  ) {}

  async create(dto: any) {
    const count = await this.repo.count();
    const number = `INV-${String(count + 1).padStart(6, '0')}`;
    const invoice = this.repo.create({ ...dto, number });
    const saved = await this.repo.save(invoice);
    if (dto.items?.length) {
      const items = dto.items.map((item: any) => this.itemRepo.create({ ...item, invoiceId: saved.id }));
      await this.itemRepo.save(items);
    }
    return this.findById(saved.id);
  }

  async findAll(query?: { customerId?: string; status?: string; page?: number; limit?: number }) {
    const where: any = {};
    if (query?.customerId) where.customerId = query.customerId;
    if (query?.status) where.status = query.status;
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const [items, total] = await this.repo.findAndCount({
      where, relations: ['customer', 'items'],
      skip: (page - 1) * limit, take: limit,
      order: { createdAtUtc: 'DESC' },
    });
    return { items, total, page, limit };
  }

  async findById(id: string) {
    const e = await this.repo.findOne({ where: { id }, relations: ['customer', 'subscription', 'items', 'amendments'] });
    if (!e) throw new NotFoundException(`Invoice ${id} not found`);
    return e;
  }

  async approve(id: string) {
    const e = await this.findById(id);
    e.status = 'paid';
    e.paidAt = new Date();
    return this.repo.save(e);
  }

  async reject(id: string) {
    const e = await this.findById(id);
    e.status = 'void';
    return this.repo.save(e);
  }

  async createAmendment(subscriptionId: string, dto: any) {
    const am = this.amRepo.create({ subscriptionId, ...dto });
    return this.amRepo.save(am);
  }
}

@ApiTags('Invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly service: InvoicesService) {}
  @Post() @ApiOperation({ summary: 'Create invoice' }) create(@Body() dto: any) { return this.service.create(dto); }
  @Get() @ApiOperation({ summary: 'List invoices' }) findAll(@Query() query: any) { return this.service.findAll(query); }
  @Get(':id') @ApiOperation({ summary: 'Get invoice' }) findById(@Param('id') id: string) { return this.service.findById(id); }
  @Post(':id/approve') @ApiOperation({ summary: 'Approve invoice' }) approve(@Param('id') id: string) { return this.service.approve(id); }
  @Post(':id/reject') @ApiOperation({ summary: 'Reject invoice' }) reject(@Param('id') id: string) { return this.service.reject(id); }
}

@ApiTags('Invoice Amendments')
@Controller('subscriptions/:subscriptionId/amendments')
export class InvoiceAmendmentsController {
  constructor(private readonly service: InvoicesService) {}
  @Post() @ApiOperation({ summary: 'Create amendment' }) create(@Param('subscriptionId') subId: string, @Body() dto: any) { return this.service.createAmendment(subId, dto); }
}

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, InvoiceItem, InvoiceAmendment])],
  controllers: [InvoicesController, InvoiceAmendmentsController],
  providers: [InvoicesService],
  exports: [InvoicesService],
})
export class InvoicesModule {}