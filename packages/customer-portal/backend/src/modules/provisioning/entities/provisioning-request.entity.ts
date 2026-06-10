import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

export type ProvisioningStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'failed'
  | 'suspended';

@Entity('provisioning_requests')
export class ProvisioningRequest extends BaseEntity {
  @Column({ type: 'uuid' })
  subscriptionId: string;

  @Column({ type: 'text' })
  action: string; // 'provision', 'suspend', 'resume', 'upgrade', 'deprovision'

  @Column({ type: 'text', default: 'pending' })
  status: ProvisioningStatus;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  result?: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  errorMessage?: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  completedAt?: Date;

  @ManyToOne(() => Subscription)
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;
}