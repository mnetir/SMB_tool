import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, Index,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { OrganizationNode } from './organization-node.entity';

@Entity('user_organization_assignments')
export class UserOrganizationAssignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  @Index()
  userId: string;

  @Column({ name: 'organization_node_id' })
  organizationNodeId: string;

  @Column({ name: 'assignment_type', default: 'Member' })
  assignmentType: string;

  @Column({ name: 'effective_from', type: 'date' })
  effectiveFrom: Date;

  @Column({ name: 'effective_to', type: 'date', nullable: true })
  effectiveTo: Date;

  @Column({ name: 'is_primary', default: false })
  isPrimary: boolean;

  @Column({ name: 'title_snapshot', nullable: true })
  titleSnapshot: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => OrganizationNode)
  @JoinColumn({ name: 'organization_node_id' })
  organizationNode: OrganizationNode;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}