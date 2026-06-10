import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

@Entity('company_profiles')
export class CompanyProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'customer_id_from_portal', nullable: true })
  customerIdFromPortal: string;

  @Column({ unique: true })
  @Index()
  alias: string;

  @Column({ name: 'company_code', nullable: true })
  companyCode: string;

  @Column({ name: 'legal_name' })
  legalName: string;

  @Column({ name: 'display_name', nullable: true })
  displayName: string;

  @Column({ name: 'brand_name', nullable: true })
  brandName: string;

  @Column({ name: 'logo_attachment_id', nullable: true })
  logoAttachmentId: string;

  @Column({ name: 'economic_code', nullable: true })
  economicCode: string;

  @Column({ name: 'national_id', nullable: true })
  nationalId: string;

  @Column({ name: 'registration_number', nullable: true })
  registrationNumber: string;

  @Column({ name: 'default_calendar_type', default: 'persian' })
  defaultCalendarType: string;

  @Column({ name: 'default_currency_code', default: 'IRR' })
  defaultCurrencyCode: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}