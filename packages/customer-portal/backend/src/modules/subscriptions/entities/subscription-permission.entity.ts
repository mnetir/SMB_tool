import { Entity, ManyToOne, JoinColumn, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { Subscription } from './subscription.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity('subscription_permissions')
export class SubscriptionPermission {
  @PrimaryColumn({ name: 'subscription_id', type: 'uuid' })
  subscriptionId: string;

  @PrimaryColumn({ name: 'permission_id', type: 'uuid' })
  permissionId: string;

  @CreateDateColumn({ name: 'granted_at', type: 'timestamp with time zone' })
  grantedAt: Date;

  @ManyToOne(() => Subscription, (sub) => sub.subscriptionPermissions)
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;

  @ManyToOne(() => Permission)
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;
}