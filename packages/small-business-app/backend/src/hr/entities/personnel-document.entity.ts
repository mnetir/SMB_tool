import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

@Entity('personnel_documents')
export class PersonnelDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  @Index()
  userId: string;

  @Column({ name: 'attachment_id' })
  attachmentId: string;

  @Column({ name: 'document_type' })
  documentType: string;

  @Column({ name: 'document_number', nullable: true })
  documentNumber: string;

  @Column({ name: 'issue_date', type: 'date', nullable: true })
  issueDate: Date;

  @Column({ name: 'expiration_date', type: 'date', nullable: true })
  expirationDate: Date;

  @Column({ nullable: true })
  issuer: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'is_required', default: false })
  isRequired: boolean;

  @Column({ default: 'Active' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}