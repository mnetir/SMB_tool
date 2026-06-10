import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

@Entity('contract_compensation_items')
export class ContractCompensationItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'employment_contract_id' })
  @Index()
  employmentContractId: string;

  @Column({ name: 'payroll_component_def_snapshot_id', nullable: true })
  payrollComponentDefSnapshotId: string;

  @Column({ name: 'component_code' })
  componentCode: string;

  @Column({ name: 'component_title_snapshot', nullable: true })
  componentTitleSnapshot: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  quantity: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  rate: number;

  @Column({ name: 'calculation_type', default: 'Fixed' })
  calculationType: string;

  @Column({ name: 'effective_from', type: 'date' })
  effectiveFrom: Date;

  @Column({ name: 'effective_to', type: 'date', nullable: true })
  effectiveTo: Date;

  @Column({ name: 'is_override', default: false })
  isOverride: boolean;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}