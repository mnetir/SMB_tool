import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { SalesPlan } from '../../sales-plans/entities/sales-plan.entity';
import { SubscriptionPermission } from './subscription-permission.entity';
import { SubscriptionLimit } from './subscription-limit.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';
import { InvoiceAmendment } from '../../invoices/entities/invoice-amendment.entity';
import { License } from '../../licenses/entities/license.entity';

@Entity('subscriptions')
export class Subscription extends BaseEntity {
  @Column({ type: 'uuid' })
  customerId: string;

  @Column({ type: 'uuid', nullable: true })
  planId?: string;

  @Column({ type: 'text', default: 'draft' })
  status: string; // 'draft', 'pending_payment', 'active', 'suspended', 'cancelled', 'expired'

  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @Column({ type: 'boolean', default: false })
  isTrial: boolean;

  @Column({ type: 'date', nullable: true })
  trialEndsAt?: Date;

  @ManyToOne(() => Customer, (customer) => customer.subscriptions)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => SalesPlan, { nullable: true })
  @JoinColumn({ name: 'plan_id' })
  plan?: SalesPlan;

  @OneToMany(() => SubscriptionPermission, (sp) => sp.subscription)
  subscriptionPermissions: SubscriptionPermission[];

  @OneToMany(() => SubscriptionLimit, (sl) => sl.subscription)
  subscriptionLimits: SubscriptionLimit[];

  @OneToMany(() => Invoice, (inv) => inv.subscription)
  invoices: Invoice[];

  @OneToMany(() => InvoiceAmendment, (am) => am.subscription)
  amendments: InvoiceAmendment[];

  @OneToOne(() => License, (lic) => lic.subscription)
  license: License;
}