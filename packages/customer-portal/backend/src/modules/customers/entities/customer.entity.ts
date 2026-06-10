import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';

@Entity('customers')
export class Customer extends BaseEntity {
  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', unique: true })
  alias: string;

  @Column({ type: 'text', nullable: true })
  contactEmail?: string;

  @Column({ type: 'text', nullable: true })
  contactPhone?: string;

  @Column({ type: 'text', default: 'active' })
  status: string; // 'active', 'suspended', 'draft'

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ type: 'text', nullable: true })
  taxId?: string;

  @Column({ type: 'text', nullable: true })
  nationalId?: string;

  @OneToMany(() => Subscription, (sub) => sub.customer)
  subscriptions: Subscription[];

  @OneToMany(() => Invoice, (inv) => inv.customer)
  invoices: Invoice[];
}