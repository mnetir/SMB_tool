import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('license_entitlement_snapshots')
export class LicenseEntitlementSnapshot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'subscription_id', nullable: true })
  subscriptionId: string;

  @Column({ name: 'customer_id_from_portal', nullable: true })
  customerIdFromPortal: string;

  @Column({ name: 'granted_permissions', type: 'jsonb', default: '[]' })
  grantedPermissions: any;

  @Column({ name: 'granted_limits', type: 'jsonb', default: '{}' })
  grantedLimits: any;

  @Column({ name: 'expires_at', nullable: true })
  expiresAt: Date;

  @Column({ name: 'snapshot_version', default: 1 })
  snapshotVersion: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}