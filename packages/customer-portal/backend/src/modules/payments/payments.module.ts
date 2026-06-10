import { Module, Injectable, Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Injectable()
export class PaymentsService {
  constructor(@InjectRepository(Payment) private repo: Repository<Payment>) {}
  async register(invoiceId: string, dto: Partial<Payment>) {
    const e = this.repo.create({ ...dto, invoiceId });
    return this.repo.save(e);
  }
  async approve(id: string) { const e = await this.findById(id); e.status = 'approved'; e.paidAt = new Date(); return this.repo.save(e); }
  async reject(id: string) { const e = await this.findById(id); e.status = 'rejected'; return this.repo.save(e); }
  async findByInvoice(invoiceId: string) { return this.repo.find({ where: { invoiceId } }); }
  private async findById(id: string) { const e = await this.repo.findOne({ where: { id } }); if (!e) throw new NotFoundException(); return e; }
}

@ApiTags('Payments')
@Controller('invoices/:invoiceId/payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}
  @Post() @ApiOperation({ summary: 'Register payment' }) register(@Param('invoiceId') invId: string, @Body() dto: any) { return this.service.register(invId, dto); }
  @Get() @ApiOperation({ summary: 'List payments for invoice' }) findByInvoice(@Param('invoiceId') invId: string) { return this.service.findByInvoice(invId); }
  @Post(':id/approve') @ApiOperation({ summary: 'Approve payment' }) approve(@Param('id') id: string) { return this.service.approve(id); }
  @Post(':id/reject') @ApiOperation({ summary: 'Reject payment' }) reject(@Param('id') id: string) { return this.service.reject(id); }
}

@Module({ imports: [TypeOrmModule.forFeature([Payment])], controllers: [PaymentsController], providers: [PaymentsService], exports: [PaymentsService] })
export class PaymentsModule {}