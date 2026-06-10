import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, Index,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { PositionChart } from './position-chart.entity';

@Entity('positions')
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'position_chart_id' })
  @Index()
  positionChartId: string;

  @Column({ name: 'parent_position_id', nullable: true })
  parentPositionId: string;

  @Column({ name: 'position_code' })
  positionCode: string;

  @Column({ name: 'position_title' })
  positionTitle: string;

  @Column({ name: 'organization_node_id', nullable: true })
  organizationNodeId: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @ManyToOne(() => PositionChart)
  @JoinColumn({ name: 'position_chart_id' })
  chart: PositionChart;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}