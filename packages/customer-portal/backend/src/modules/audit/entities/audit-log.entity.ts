import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('audit_logs')
export class AuditLog extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  actorUserId?: string;

  @Column({ type: 'text', nullable: true })
  actorUserName?: string;

  @Column({ type: 'text' })
  action: string;

  @Column({ type: 'text' })
  entityType: string;

  @Column({ type: 'uuid', nullable: true })
  entityId?: string;

  @Column({ type: 'jsonb', nullable: true })
  changes?: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  ipAddress?: string;

  @Column({ type: 'text', nullable: true })
  userAgent?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;
}