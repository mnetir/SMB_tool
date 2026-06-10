import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

@Entity('insurance_profiles')
export class InsuranceProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  @Index()
  userId: string;

  @Column({ name: 'insurance_number', nullable: true })
  insuranceNumber: string;

  @Column({ name: 'insurance_type', nullable: true })
  insuranceType: string;

  @Column({ name: 'insurance_start_date', type: 'date', nullable: true })
  insuranceStartDate: Date;

  @Column({ name: 'insurance_end_date', type: 'date', nullable: true })
  insuranceEndDate: Date;

  @Column({ name: 'insurance_status', default: 'Active' })
  insuranceStatus: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}