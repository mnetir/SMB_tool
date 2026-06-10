import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Module } from '../../modules/entities/module.entity';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column({ type: 'uuid' })
  moduleId: string;

  @Column({ type: 'text', unique: true })
  code: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Module, (module) => module.permissions)
  @JoinColumn({ name: 'module_id' })
  module: Module;
}