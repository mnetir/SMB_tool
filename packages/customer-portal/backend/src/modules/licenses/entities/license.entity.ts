import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { Customer } from '../../customers/entities/customer.entity';

@Entity('licenses')
export class License extends BaseEntity {
  @Column({ type: 'uuid', unique: true })
  subscriptionId: string;

  @Column({ type: 'uuid' })
  customerId: string;

  @Column({ type: 'jsonb' })
  grantedPermissions: Record<string, any>;

  @Column({ type: 'jsonb' })
  grantedLimits: Record<string, any>;

  @Column({ type: 'timestamp with time zone', nullable: true })
  expiresAt?: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  lastPushedAt?: Date;

  @Column({ type: 'text', nullable: true })
  licenseKey?: string;

  @OneToOne(() => Subscription, (sub) => sub.license)
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}