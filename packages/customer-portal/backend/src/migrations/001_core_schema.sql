-- Pishgaman Customer Portal — Core Database Schema
-- Migration: 001_core_schema
-- Applied via TypeORM migrations or directly for initial setup

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- Core Catalog
-- ============================================

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by_user_id UUID,
    created_by_user_name TEXT,
    modified_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_by_user_id UUID,
    modified_by_user_name TEXT
);

CREATE TABLE IF NOT EXISTS modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    is_optional BOOLEAN DEFAULT TRUE,
    created_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by_user_id UUID,
    created_by_user_name TEXT,
    modified_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_by_user_id UUID,
    modified_by_user_name TEXT
);

CREATE TABLE IF NOT EXISTS permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES modules(id),
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by_user_id UUID,
    created_by_user_name TEXT,
    modified_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_by_user_id UUID,
    modified_by_user_name TEXT
);

CREATE TABLE IF NOT EXISTS permission_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES modules(id),
    code TEXT UNIQUE NOT NULL,
    unit TEXT,
    default_value INTEGER DEFAULT 0,
    description TEXT,
    created_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by_user_id UUID,
    created_by_user_name TEXT,
    modified_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_by_user_id UUID,
    modified_by_user_name TEXT
);

-- ============================================
-- Plans (Blueprints)
-- ============================================

CREATE TABLE IF NOT EXISTS sales_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    billing_interval TEXT NOT NULL,
    base_price NUMERIC(15, 2) NOT NULL,
    is_public BOOLEAN DEFAULT TRUE,
    is_custom BOOLEAN DEFAULT FALSE,
    is_trial BOOLEAN DEFAULT FALSE,
    trial_days INTEGER,
    created_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by_user_id UUID,
    created_by_user_name TEXT,
    modified_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_by_user_id UUID,
    modified_by_user_name TEXT
);

CREATE TABLE IF NOT EXISTS plan_permissions (
    plan_id UUID REFERENCES sales_plans(id),
    permission_id UUID REFERENCES permissions(id),
    PRIMARY KEY (plan_id, permission_id)
);

CREATE TABLE IF NOT EXISTS plan_limits (
    plan_id UUID REFERENCES sales_plans(id),
    limit_id UUID REFERENCES permission_limits(id),
    value INTEGER NOT NULL,
    PRIMARY KEY (plan_id, limit_id)
);

-- ============================================
-- Customers & Subscriptions
-- ============================================

CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    alias TEXT UNIQUE NOT NULL,
    contact_email TEXT,
    contact_phone TEXT,
    status TEXT DEFAULT 'active',
    address TEXT,
    tax_id TEXT,
    national_id TEXT,
    created_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by_user_id UUID,
    created_by_user_name TEXT,
    modified_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_by_user_id UUID,
    modified_by_user_name TEXT
);

CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id),
    plan_id UUID REFERENCES sales_plans(id),
    status TEXT DEFAULT 'draft',
    start_date DATE,
    end_date DATE,
    is_trial BOOLEAN DEFAULT FALSE,
    trial_ends_at DATE,
    created_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by_user_id UUID,
    created_by_user_name TEXT,
    modified_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_by_user_id UUID,
    modified_by_user_name TEXT
);

CREATE TABLE IF NOT EXISTS subscription_permissions (
    subscription_id UUID REFERENCES subscriptions(id),
    permission_id UUID REFERENCES permissions(id),
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (subscription_id, permission_id)
);

CREATE TABLE IF NOT EXISTS subscription_limits (
    subscription_id UUID REFERENCES subscriptions(id),
    limit_id UUID REFERENCES permission_limits(id),
    value INTEGER NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (subscription_id, limit_id)
);

-- ============================================
-- Invoicing & Amendments
-- ============================================

CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id UUID REFERENCES subscriptions(id),
    customer_id UUID REFERENCES customers(id),
    number TEXT UNIQUE NOT NULL,
    total_amount NUMERIC(15, 2) NOT NULL,
    currency TEXT DEFAULT 'IRR',
    status TEXT DEFAULT 'unpaid',
    due_date DATE,
    paid_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by_user_id UUID,
    created_by_user_name TEXT,
    modified_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_by_user_id UUID,
    modified_by_user_name TEXT
);

CREATE TABLE IF NOT EXISTS invoice_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES invoices(id),
    description TEXT NOT NULL,
    amount NUMERIC(15, 2) NOT NULL,
    quantity INTEGER DEFAULT 1,
    type TEXT NOT NULL,
    reference_id TEXT,
    created_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by_user_id UUID,
    created_by_user_name TEXT,
    modified_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_by_user_id UUID,
    modified_by_user_name TEXT
);

CREATE TABLE IF NOT EXISTS invoice_amendments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id UUID REFERENCES subscriptions(id),
    invoice_id UUID REFERENCES invoices(id),
    type TEXT NOT NULL,
    description TEXT,
    effective_date DATE NOT NULL,
    metadata JSONB,
    status TEXT DEFAULT 'applied',
    created_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by_user_id UUID,
    created_by_user_name TEXT,
    modified_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_by_user_id UUID,
    modified_by_user_name TEXT
);

-- ============================================
-- Payments & Licensing
-- ============================================

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES invoices(id),
    amount NUMERIC(15, 2) NOT NULL,
    method TEXT NOT NULL,
    reference TEXT,
    paid_at TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by_user_id UUID,
    created_by_user_name TEXT,
    modified_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_by_user_id UUID,
    modified_by_user_name TEXT
);

CREATE TABLE IF NOT EXISTS licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id UUID REFERENCES subscriptions(id) UNIQUE,
    customer_id UUID REFERENCES customers(id),
    granted_permissions JSONB NOT NULL,
    granted_limits JSONB NOT NULL,
    license_key TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    last_pushed_at TIMESTAMP WITH TIME ZONE,
    created_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by_user_id UUID,
    created_by_user_name TEXT,
    modified_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_by_user_id UUID,
    modified_by_user_name TEXT
);

-- ============================================
-- Provisioning
-- ============================================

CREATE TABLE IF NOT EXISTS provisioning_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id UUID REFERENCES subscriptions(id),
    action TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    metadata JSONB,
    result JSONB,
    error_message TEXT,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by_user_id UUID,
    created_by_user_name TEXT,
    modified_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_by_user_id UUID,
    modified_by_user_name TEXT
);

-- ============================================
-- Portal Users, Notifications & Audit
-- ============================================

CREATE TABLE IF NOT EXISTS portal_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    display_name TEXT,
    password_hash TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    roles JSONB DEFAULT '[]',
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by_user_id UUID,
    created_by_user_name TEXT,
    modified_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_by_user_id UUID,
    modified_by_user_name TEXT
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_user_id UUID,
    customer_id UUID REFERENCES customers(id),
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    metadata JSONB,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by_user_id UUID,
    created_by_user_name TEXT,
    modified_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_by_user_id UUID,
    modified_by_user_name TEXT
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_user_id UUID,
    actor_user_name TEXT,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    changes JSONB,
    ip_address TEXT,
    user_agent TEXT,
    description TEXT,
    created_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by_user_id UUID,
    created_by_user_name TEXT,
    modified_at_utc TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_by_user_id UUID,
    modified_by_user_name TEXT
);

-- ============================================
-- Indexes
-- ============================================
CREATE INDEX IF NOT EXISTS idx_customers_alias ON customers(alias);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_customer ON subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_invoices_customer ON invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_number ON invoices(number);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_user_id);
CREATE INDEX IF NOT EXISTS idx_provisioning_status ON provisioning_requests(status);