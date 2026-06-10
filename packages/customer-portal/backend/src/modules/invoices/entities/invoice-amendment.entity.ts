import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { Invoice } from './invoice.entity';

@Entity('invoice_amendments')
export class InvoiceAmendment extends BaseEntity {
  @Column({ type: 'uuid' })
  subscriptionId: string;

  @Column({ type: 'uuid', nullable: true })
  invoiceId?: string;

  @Column({ type: 'text' })
  type: string; // 'upgrade', 'addon', 'limit_change', 'renewal'

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'date' })
  effectiveDate: Date;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @Column({ type: 'text', default: 'applied' })
  status: string; // 'pending', 'applied', 'rejected'

  @ManyToOne(() => Subscription, (sub) => sub.amendments)
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;

  @ManyToOne(() => Invoice, (inv) => inv.amendments, { nullable: true })
  @JoinColumn({ name: 'invoice_id' })
  invoice?: Invoice;
}