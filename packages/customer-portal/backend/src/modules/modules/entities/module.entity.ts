import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Product } from '../../products/entities/product.entity';
import { Permission } from '../../permissions/entities/permission.entity';
import { PermissionLimit } from '../../permission-limits/entities/permission-limit.entity';

@Entity('modules')
export class Module extends BaseEntity {
  @Column({ type: 'uuid' })
  productId: string;

  @Column({ type: 'text', unique: true })
  code: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  isOptional: boolean;

  @ManyToOne(() => Product, (product) => product.modules)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(() => Permission, (permission) => permission.module)
  permissions: Permission[];

  @OneToMany(() => PermissionLimit, (limit) => limit.module)
  limits: PermissionLimit[];
}