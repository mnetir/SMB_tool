import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'created_by_user_id', nullable: true, type: 'uuid' })
  createdByUserId?: string;

  @Column({ name: 'created_by_user_name', nullable: true, length: 255 })
  createdByUserName?: string;

  @CreateDateColumn({
    name: 'created_at_utc',
    type: 'timestamp with time zone',
  })
  createdAtUtc: Date;

  @Column({ name: 'modified_by_user_id', nullable: true, type: 'uuid' })
  modifiedByUserId?: string;

  @Column({ name: 'modified_by_user_name', nullable: true, length: 255 })
  modifiedByUserName?: string;

  @UpdateDateColumn({
    name: 'modified_at_utc',
    type: 'timestamp with time zone',
  })
  modifiedAtUtc: Date;
}