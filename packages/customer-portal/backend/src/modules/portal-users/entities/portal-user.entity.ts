import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('portal_users')
export class PortalUser extends BaseEntity {
  @Column({ type: 'text', unique: true })
  username: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  displayName?: string;

  @Column({ type: 'text', select: false })
  passwordHash: string;

  @Column({ type: 'text', default: 'active' })
  status: string; // 'active', 'inactive'

  @Column({ type: 'jsonb', default: [] })
  roles: string[];

  @Column({ type: 'timestamp with time zone', nullable: true })
  lastLoginAt?: Date;
}