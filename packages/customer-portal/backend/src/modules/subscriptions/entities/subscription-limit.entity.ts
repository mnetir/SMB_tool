import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subscription } from './subscription.entity';
import { PermissionLimit } from '../../permission-limits/entities/permission-limit.entity';

@Entity('subscription_limits')
export class SubscriptionLimit {
  @PrimaryColumn({ name: 'subscription_id', type: 'uuid' })
  subscriptionId: string;

  @PrimaryColumn({ name: 'limit_id', type: 'uuid' })
  limitId: string;

  @Column({ type: 'integer', nullable: false })
  value: number;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  @ManyToOne(() => Subscription, (sub) => sub.subscriptionLimits)
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;

  @ManyToOne(() => PermissionLimit)
  @JoinColumn({ name: 'limit_id' })
  limitDef: PermissionLimit;
}