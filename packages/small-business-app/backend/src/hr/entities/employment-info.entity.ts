import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

@Entity('employment_info')
export class EmploymentInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', unique: true })
  @Index()
  userId: string;

  @Column({ name: 'hire_date', type: 'date' })
  hireDate: Date;

  @Column({ name: 'employment_category_id', nullable: true })
  employmentCategoryId: string;

  @Column({ name: 'employment_status', default: 'Active' })
  employmentStatus: string;

  @Column({ name: 'probation_start_date', type: 'date', nullable: true })
  probationStartDate: Date;

  @Column({ name: 'probation_end_date', type: 'date', nullable: true })
  probationEndDate: Date;

  @Column({ name: 'job_grade_id', nullable: true })
  jobGradeId: string;

  @Column({ name: 'insurance_profile_id', nullable: true })
  insuranceProfileId: string;

  @Column({ name: 'bank_name', nullable: true })
  bankName: string;

  @Column({ name: 'bank_account_number', nullable: true })
  bankAccountNumber: string;

  @Column({ name: 'bank_card_number', nullable: true })
  bankCardNumber: string;

  @Column({ name: 'cost_center', nullable: true })
  costCenter: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}