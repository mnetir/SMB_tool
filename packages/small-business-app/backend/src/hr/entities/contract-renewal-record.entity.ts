import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

@Entity('contract_renewal_records')
export class ContractRenewalRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  @Index()
  userId: string;

  @Column({ name: 'previous_contract_id' })
  previousContractId: string;

  @Column({ name: 'new_contract_id', nullable: true })
  newContractId: string;

  @Column({ name: 'amendment_id', nullable: true })
  amendmentId: string;

  @Column({ name: 'renewal_method' })
  renewalMethod: string;

  @Column({ name: 'renewal_date', type: 'date' })
  renewalDate: Date;

  @Column({ name: 'effective_start_date', type: 'date' })
  effectiveStartDate: Date;

  @Column({ name: 'effective_end_date', type: 'date', nullable: true })
  effectiveEndDate: Date;

  @Column({ nullable: true })
  reason: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}