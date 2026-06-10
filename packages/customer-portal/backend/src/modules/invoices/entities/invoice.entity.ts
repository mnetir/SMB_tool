import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { InvoiceItem } from './invoice-item.entity';
import { InvoiceAmendment } from './invoice-amendment.entity';

@Entity('invoices')
export class Invoice extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  subscriptionId?: string;

  @Column({ type: 'uuid' })
  customerId: string;

  @Column({ type: 'text', unique: true })
  number: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  totalAmount: number;

  @Column({ type: 'text', default: 'IRR' })
  currency: string;

  @Column({ type: 'text', default: 'unpaid' })
  status: string; // 'unpaid', 'paid', 'void', 'refunded'

  @Column({ type: 'date', nullable: true })
  dueDate?: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  paidAt?: Date;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ManyToOne(() => Customer, (customer) => customer.invoices)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Subscription, (sub) => sub.invoices, { nullable: true })
  @JoinColumn({ name: 'subscription_id' })
  subscription?: Subscription;

  @OneToMany(() => InvoiceItem, (item) => item.invoice, { cascade: true })
  items: InvoiceItem[];

  @OneToMany(() => InvoiceAmendment, (am) => am.invoice)
  amendments: InvoiceAmendment[];
}