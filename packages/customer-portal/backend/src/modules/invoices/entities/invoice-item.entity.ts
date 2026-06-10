import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Invoice } from './invoice.entity';

@Entity('invoice_items')
export class InvoiceItem extends BaseEntity {
  @Column({ type: 'uuid' })
  invoiceId: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column({ type: 'integer', default: 1 })
  quantity: number;

  @Column({ type: 'text' })
  type: string; // 'plan_fee', 'module_addon', 'limit_increase', 'adjustment'

  @Column({ type: 'text', nullable: true })
  referenceId?: string; // e.g., module_id or limit_id

  @ManyToOne(() => Invoice, (invoice) => invoice.items)
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice;
}