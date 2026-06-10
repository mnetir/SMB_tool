import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, Index,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { OrganizationChart } from './organization-chart.entity';

@Entity('organization_nodes')
export class OrganizationNode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organization_chart_id' })
  @Index()
  organizationChartId: string;

  @Column({ name: 'parent_organization_node_id', nullable: true })
  parentOrganizationNodeId: string;

  @Column({ name: 'node_type' })
  nodeType: string;

  @Column()
  code: string;

  @Column()
  title: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'sort_order', default: 0 })
  sortOrder: number;

  @ManyToOne(() => OrganizationChart)
  @JoinColumn({ name: 'organization_chart_id' })
  chart: OrganizationChart;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}