import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

@Entity('employment_contracts')
export class EmploymentContract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  @Index()
  userId: string;

  @Column({ name: 'contract_number', unique: true })
  contractNumber: string;

  @Column({ name: 'contract_type' })
  contractType: string;

  @Column({ name: 'employment_category_id', nullable: true })
  employmentCategoryId: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date;

  @Column({ name: 'contract_status', default: 'Draft' })
  contractStatus: string;

  @Column({ name: 'work_location_type', nullable: true })
  workLocationType: string;

  @Column({ name: 'work_organization_node_id', nullable: true })
  workOrganizationNodeId: string;

  @Column({ name: 'work_organization_node_title_snapshot', nullable: true })
  workOrganizationNodeTitleSnapshot: string;

  @Column({ name: 'work_location_text', nullable: true })
  workLocationText: string;

  @Column({ name: 'position_id', nullable: true })
  positionId: string;

  @Column({ name: 'position_title_snapshot', nullable: true })
  positionTitleSnapshot: string;

  @Column({ name: 'job_grade_id', nullable: true })
  jobGradeId: string;

  @Column({ name: 'job_grade_title_snapshot', nullable: true })
  jobGradeTitleSnapshot: string;

  @Column({ name: 'project_id', nullable: true })
  projectId: string;

  @Column({ name: 'project_title_snapshot', nullable: true })
  projectTitleSnapshot: string;

  @Column({ name: 'payment_cycle', default: 'Monthly' })
  paymentCycle: string;

  @Column({ name: 'weekly_hours', nullable: true })
  weeklyHours: number;

  @Column({ name: 'work_days_pattern_json', type: 'jsonb', nullable: true })
  workDaysPatternJson: any;

  @Column({ name: 'contract_text', nullable: true })
  contractText: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}