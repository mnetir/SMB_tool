import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

@Entity('contract_amendment_comp_overrides')
export class ContractAmendmentCompensationOverride {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'contract_amendment_id' })
  @Index()
  contractAmendmentId: string;

  @Column({ name: 'payroll_component_def_snapshot_id', nullable: true })
  payrollComponentDefSnapshotId: string;

  @Column({ name: 'component_code' })
  componentCode: string;

  @Column({ name: 'previous_amount', type: 'decimal', precision: 15, scale: 2, nullable: true })
  previousAmount: number;

  @Column({ name: 'new_amount', type: 'decimal', precision: 15, scale: 2 })
  newAmount: number;

  @Column({ name: 'effective_from', type: 'date' })
  effectiveFrom: Date;

  @Column({ name: 'effective_to', type: 'date', nullable: true })
  effectiveTo: Date;

  @Column({ nullable: true })
  reason: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}