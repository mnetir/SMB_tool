import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

@Entity('contract_amendments')
export class ContractAmendment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'employment_contract_id' })
  @Index()
  employmentContractId: string;

  @Column({ name: 'amendment_number' })
  amendmentNumber: string;

  @Column({ name: 'amendment_type' })
  amendmentType: string;

  @Column({ name: 'effective_date', type: 'date' })
  effectiveDate: Date;

  @Column({ name: 'effective_to', type: 'date', nullable: true })
  effectiveTo: Date;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'previous_value_json', type: 'jsonb', nullable: true })
  previousValueJson: any;

  @Column({ name: 'new_value_json', type: 'jsonb', nullable: true })
  newValueJson: any;

  @Column({ default: 'Draft' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}