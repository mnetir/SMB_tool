import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Module } from '../modules/entities/module.entity';
import { SalesPlan } from '../sales-plans/entities/sales-plan.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Module, (module) => module.product)
  modules: Module[];

  @OneToMany(() => SalesPlan, (plan) => plan.product)
  salesPlans: SalesPlan[];
}