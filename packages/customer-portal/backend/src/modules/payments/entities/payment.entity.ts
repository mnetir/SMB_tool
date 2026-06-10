import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';

@Entity('payments')
export class Payment extends BaseEntity {
  @Column({ type: 'uuid' })
  invoiceId: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column({ type: 'text' })
  method: string; // 'bank_transfer', 'card', 'online', 'cash'

  @Column({ type: 'text', nullable: true })
  reference?: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  paidAt?: Date;

  @Column({ type: 'text', default: 'pending' })
  status: string; // 'pending', 'approved', 'rejected'

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ManyToOne(() => Invoice)
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice;
}