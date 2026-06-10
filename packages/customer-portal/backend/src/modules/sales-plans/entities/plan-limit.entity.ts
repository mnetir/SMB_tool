import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { SalesPlan } from './sales-plan.entity';
import { PermissionLimit } from '../../permission-limits/entities/permission-limit.entity';

@Entity('plan_limits')
export class PlanLimit {
  @PrimaryColumn({ name: 'plan_id', type: 'uuid' })
  planId: string;

  @PrimaryColumn({ name: 'limit_id', type: 'uuid' })
  limitId: string;

  @Column({ type: 'integer', nullable: false })
  value: number;

  @ManyToOne(() => SalesPlan, (plan) => plan.planLimits)
  @JoinColumn({ name: 'plan_id' })
  plan: SalesPlan;

  @ManyToOne(() => PermissionLimit)
  @JoinColumn({ name: 'limit_id' })
  limitDef: PermissionLimit;
}