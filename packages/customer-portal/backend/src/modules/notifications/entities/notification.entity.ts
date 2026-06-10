import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Customer } from '../../customers/entities/customer.entity';

@Entity('notifications')
export class Notification extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  recipientUserId?: string;

  @Column({ type: 'uuid', nullable: true })
  customerId?: string;

  @Column({ type: 'text' })
  type: string; // 'invoice_created', 'payment_received', 'subscription_activated', 'provisioning_complete'

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  body?: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @Column({ type: 'boolean', default: false })
  isRead: boolean;

  @Column({ type: 'timestamp with time zone', nullable: true })
  readAt?: Date;

  @ManyToOne(() => Customer, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer?: Customer;
}