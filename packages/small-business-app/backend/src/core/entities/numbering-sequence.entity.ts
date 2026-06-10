import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('numbering_sequences')
export class NumberingSequence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'entity_type' })
  entityType: string;

  @Column({ name: 'prefix', nullable: true })
  prefix: string;

  @Column({ name: 'suffix', nullable: true })
  suffix: string;

  @Column({ name: 'next_number', default: 1 })
  nextNumber: number;

  @Column({ name: 'padding_length', default: 5 })
  paddingLength: number;

  @Column({ nullable: true })
  pattern: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}