import { useState, useEffect } from 'react';
import { healthApi } from '../services/api';

export function Dashboard() {
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    healthApi.check().then((res) => setHealth(res.data)).catch(() => setHealth({ status: 'error' }));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 'var(--pds-space-6)' }}>
        <h1 style={{ fontSize: 'var(--pds-text-h1)', fontWeight: 700, color: 'var(--pds-text-primary)' }}>
          داشبورد
        </h1>
        <p style={{ fontSize: 'var(--pds-text-body)', color: 'var(--pds-text-secondary)' }}>
          سامانه مدیریت منابع انسانی پیشگامان
        </p>
      </div>

      <div className="pds-dashboard-grid" style={{
        display: 'grid',
        direction: 'rtl',
        gap: 'var(--pds-space-5)',
        gridTemplateColumns: 'repeat(4, 1fr)',
      }}>
        {/* KPI Cards */}
        {[
          { title: 'کاربران فعال', value: '—', icon: '👥', color: 'var(--pds-primary)' },
          { title: 'پرسنل', value: '—', icon: '👤', color: 'var(--pds-success)' },
          { title: 'قراردادهای فعال', value: '—', icon: '📋', color: 'var(--pds-info)' },
          { title: 'پروژه‌ها', value: '—', icon: '📁', color: 'var(--pds-warning)' },
        ].map((kpi) => (
          <div key={kpi.title} style={{
            background: 'var(--pds-surface)',
            borderRadius: 'var(--pds-radius-lg)',
            boxShadow: 'var(--pds-shadow-md)',
            padding: 'var(--pds-space-5)',
          }}>
            <div style={{ fontSize: 'var(--pds-text-caption)', color: 'var(--pds-text-muted)', marginBottom: 'var(--pds-space-2)' }}>
              {kpi.icon} {kpi.title}
            </div>
            <div style={{
              fontSize: 'var(--pds-text-hero)',
              fontWeight: 700,
              color: kpi.color,
              fontFamily: 'var(--pds-font-secondary)',
            }}>
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 'var(--pds-space-6)',
        background: 'var(--pds-surface)',
        borderRadius: 'var(--pds-radius-lg)',
        boxShadow: 'var(--pds-shadow-md)',
        padding: 'var(--pds-space-5)',
      }}>
        <h3 style={{ fontSize: 'var(--pds-text-h3)', fontWeight: 600, marginBottom: 'var(--pds-space-3)' }}>
          وضعیت سرویس
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--pds-space-3)' }}>
          <span style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: health?.status === 'ok' ? 'var(--pds-success)' : 'var(--pds-danger)',
            display: 'inline-block',
          }} />
          <span style={{ fontSize: 'var(--pds-text-body)', color: 'var(--pds-text-secondary)' }}>
            {health?.status === 'ok' ? 'سرویس فعال' : 'در حال بررسی...'}
          </span>
        </div>
      </div>
    </div>
  );
}