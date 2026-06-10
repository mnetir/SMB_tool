// Pishgaman Business Platform — Shared Types & Interfaces
// Version: 1.0.0

// ==========================================
// Enums & Constants
// ==========================================

export enum SubscriptionStatus {
  DRAFT = 'draft',
  PENDING_PAYMENT = 'pending_payment',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

export enum InvoiceStatus {
  UNPAID = 'unpaid',
  PAID = 'paid',
  VOID = 'void',
  REFUNDED = 'refunded',
}

export enum PaymentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum ProvisioningAction {
  PROVISION = 'provision',
  SUSPEND = 'suspend',
  RESUME = 'resume',
  UPGRADE = 'upgrade',
  DEPROVISION = 'deprovision',
}

export enum BillingInterval {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

// ==========================================
// Interfaces
// ==========================================

export interface Product {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  modules?: Module[];
}

export interface Module {
  id: string;
  productId: string;
  code: string;
  name: string;
  description?: string;
  isOptional: boolean;
  permissions?: Permission[];
  limits?: PermissionLimit[];
}

export interface Permission {
  id: string;
  moduleId: string;
  code: string;
  description?: string;
}

export interface PermissionLimit {
  id: string;
  moduleId: string;
  code: string;
  unit?: string;
  defaultValue: number;
}

export interface SalesPlan {
  id: string;
  productId: string;
  name: string;
  code: string;
  billingInterval: string;
  basePrice: number;
  isPublic: boolean;
  isCustom: boolean;
  isTrial: boolean;
}

export interface Customer {
  id: string;
  name: string;
  alias: string;
  contactEmail?: string;
  contactPhone?: string;
  status: string;
  address?: string;
  taxId?: string;
}

export interface Subscription {
  id: string;
  customerId: string;
  planId?: string;
  status: SubscriptionStatus;
  startDate?: string;
  endDate?: string;
  isTrial: boolean;
}

export interface Invoice {
  id: string;
  subscriptionId?: string;
  customerId: string;
  number: string;
  totalAmount: number;
  currency: string;
  status: InvoiceStatus;
  dueDate?: string;
  paidAt?: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  description: string;
  amount: number;
  quantity: number;
  type: string;
}

export interface License {
  id: string;
  subscriptionId: string;
  customerId: string;
  grantedPermissions: Record<string, any>;
  grantedLimits: Record<string, any>;
  expiresAt?: string;
  licenseKey?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}