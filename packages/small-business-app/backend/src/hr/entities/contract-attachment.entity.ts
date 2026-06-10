import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

@Entity('contract_attachments')
export class ContractAttachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'employment_contract_id' })
  @Index()
  employmentContractId: string;

  @Column({ name: 'attachment_id' })
  attachmentId: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'Attachment' })
  type: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}