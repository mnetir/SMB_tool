import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Module } from '../../modules/entities/module.entity';

@Entity('permission_limits')
export class PermissionLimit extends BaseEntity {
  @Column({ type: 'uuid' })
  moduleId: string;

  @Column({ type: 'text', unique: true })
  code: string;

  @Column({ type: 'text', nullable: true })
  unit?: string;

  @Column({ type: 'integer', default: 0 })
  defaultValue: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => Module, (module) => module.limits)
  @JoinColumn({ name: 'module_id' })
  module: Module;
}