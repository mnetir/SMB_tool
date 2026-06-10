import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Product } from '../../products/entities/product.entity';
import { PlanPermission } from './plan-permission.entity';
import { PlanLimit } from './plan-limit.entity';

@Entity('sales_plans')
export class SalesPlan extends BaseEntity {
  @Column({ type: 'uuid' })
  productId: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', unique: true })
  code: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text' })
  billingInterval: string; // 'monthly', 'yearly'

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  basePrice: number;

  @Column({ type: 'boolean', default: true })
  isPublic: boolean;

  @Column({ type: 'boolean', default: false })
  isCustom: boolean;

  @Column({ type: 'boolean', default: false })
  isTrial: boolean;

  @Column({ type: 'int', nullable: true })
  trialDays?: number;

  @ManyToOne(() => Product, (product) => product.salesPlans)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(() => PlanPermission, (pp) => pp.plan)
  planPermissions: PlanPermission[];

  @OneToMany(() => PlanLimit, (pl) => pl.plan)
  planLimits: PlanLimit[];
}