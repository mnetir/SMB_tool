import React, { useEffect, useState } from 'react';
import { PageHeader, KpiCard, Card } from '../../components/common';

export default function DashboardPage() {
  const [stats, setStats] = useState({ customers: 0, activeSubs: 0, revenue: 0, invoices: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/v1/customers').then(r => r.json()).then(d => d.items?.length || d.length || 0).catch(() => 0),
      fetch('/api/v1/subscriptions?status=active').then(r => r.json()).then(d => d.items?.length || d.length || 0).catch(() => 0),
      fetch('/api/v1/invoices?status=paid').then(r => r.json()).then(d => {
        const items = d.items || d || [];
        return Array.isArray(items) ? items.reduce((s: number, i: any) => s + Number(i.totalAmount || 0), 0) : 0;
      }).catch(() => 0),
      fetch('/api/v1/invoices').then(r => r.json()).then(d => d.items?.length || d.length || 0).catch(() => 0),
    ]).then(([customers, activeSubs, revenue, invoices]) => setStats({ customers, activeSubs, revenue, invoices }));
  }, []);

  return (
    <div>
      <PageHeader title="داشبورد مدیریت" subtitle="نمای کلی از وضعیت پورتال" />
      <div style={{ display: 'flex', gap: 'var(--pds-space-4)', marginBottom: 'var(--pds-space-6)', flexWrap: 'wrap' }}>
        <KpiCard title="مشتریان فعال" value={stats.customers} icon="👥" color="var(--pds-primary)" />
        <KpiCard title="اشتراک‌های فعال" value={stats.activeSubs} icon="🔑" color="var(--pds-success)" />
        <KpiCard title="درآمد کل" value={`${(stats.revenue / 1000).toFixed(0)}K`} icon="💰" color="var(--pds-warning)" />
        <KpiCard title="صورتحساب‌ها" value={stats.invoices} icon="📄" color="var(--pds-info)" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--pds-space-4)' }}>
        <Card>
          <h3 style={{ fontSize: 'var(--pds-text-h3)', fontWeight: 600, margin: '0 0 var(--pds-space-4)' }}>فعالیت‌های اخیر</h3>
          <p style={{ color: 'var(--pds-text-muted)' }}>به پورتال مشتریان پیشگامان خوش آمدید. از منوی کناری برای مدیریت استفاده کنید.</p>
        </Card>
        <Card>
          <h3 style={{ fontSize: 'var(--pds-text-h3)', fontWeight: 600, margin: '0 0 var(--pds-space-4)' }}>وضعیت سیستم</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--pds-success)', display: 'inline-block' }} />
            <span style={{ color: 'var(--pds-text-secondary)' }}>همه سرویس‌ها فعال</span>
          </div>
        </Card>
      </div>
    </div>
  );
}