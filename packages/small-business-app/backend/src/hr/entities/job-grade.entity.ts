import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('job_grades')
export class JobGrade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'grade_code', unique: true })
  gradeCode: string;

  @Column({ name: 'grade_title' })
  gradeTitle: string;

  @Column({ name: 'grade_level', nullable: true })
  gradeLevel: number;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}