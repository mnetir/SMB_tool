import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { SalesPlan } from './sales-plan.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity('plan_permissions')
export class PlanPermission {
  @PrimaryColumn({ name: 'plan_id', type: 'uuid' })
  planId: string;

  @PrimaryColumn({ name: 'permission_id', type: 'uuid' })
  permissionId: string;

  @ManyToOne(() => SalesPlan, (plan) => plan.planPermissions)
  @JoinColumn({ name: 'plan_id' })
  plan: SalesPlan;

  @ManyToOne(() => Permission)
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;
}