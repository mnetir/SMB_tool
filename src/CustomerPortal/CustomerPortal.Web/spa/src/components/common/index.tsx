import React from 'react';

interface Props { title: string; subtitle?: string; children?: React.ReactNode; }
export function PageHeader({ title, subtitle, children }: Props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--pds-space-6)' }}>
      <div>
        <h1 style={{ fontSize: 'var(--pds-text-h1)', fontWeight: 700, margin: 0, color: 'var(--pds-text-primary)' }}>{title}</h1>
        {subtitle && <p style={{ color: 'var(--pds-text-secondary)', margin: '4px 0 0', fontSize: 'var(--pds-text-body)' }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

interface CardProps { children: React.ReactNode; style?: React.CSSProperties; }
export function Card({ children, style }: CardProps) {
  return <div style={{ background: 'var(--pds-surface)', borderRadius: 'var(--pds-radius-lg)', boxShadow: 'var(--pds-shadow-md)', padding: 'var(--pds-space-5)', ...style }}>{children}</div>;
}

interface KpiCardProps { title: string; value: string | number; icon?: string; trend?: { value: number; isUp: boolean }; color?: string; }
export function KpiCard({ title, value, icon, trend, color }: KpiCardProps) {
  return (
    <Card style={{ minWidth: 200, flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: 'var(--pds-text-small)', color: 'var(--pds-text-muted)', margin: 0 }}>{title}</p>
          <p style={{ fontSize: 'var(--pds-text-hero)', fontWeight: 700, margin: '8px 0', color: color || 'var(--pds-text-primary)' }}>{value}</p>
          {trend && (
            <span style={{ fontSize: 'var(--pds-text-caption)', color: trend.isUp ? 'var(--pds-success)' : 'var(--pds-danger)' }}>
              {trend.isUp ? '↑' : '↓'} {trend.value}%
            </span>
          )}
        </div>
        {icon && <span style={{ fontSize: 32, opacity: 0.3 }}>{icon}</span>}
      </div>
    </Card>
  );
}

interface DataGridProps { columns: { key: string; label: string; render?: (val: any, row: any) => React.ReactNode }[]; data: any[]; onRowClick?: (row: any) => void; loading?: boolean; }
export function DataGrid({ columns, data, onRowClick, loading }: DataGridProps) {
  if (loading) return <div style={{ textAlign: 'center', padding: 'var(--pds-space-10)', color: 'var(--pds-text-muted)' }}>در حال بارگذاری...</div>;
  return (
    <div style={{ background: 'var(--pds-surface)', borderRadius: 'var(--pds-radius-lg)', boxShadow: 'var(--pds-shadow-md)', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--pds-surface-soft)' }}>
            {columns.map(col => <th key={col.key} style={{ padding: '12px 16px', textAlign: 'right', fontSize: 'var(--pds-text-grid-header)', color: 'var(--pds-text-secondary)', fontWeight: 600, borderBottom: '1px solid var(--pds-border)' }}>{col.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr><td colSpan={columns.length} style={{ textAlign: 'center', padding: 'var(--pds-space-10)', color: 'var(--pds-text-muted)' }}>داده‌ای یافت نشد</td></tr>
          )}
          {data.map((row, i) => (
            <tr key={row.id || i} onClick={() => onRowClick?.(row)} style={{ cursor: onRowClick ? 'pointer' : 'default', transition: 'background var(--pds-transition-fast)' }}
              onMouseEnter={e => { if (onRowClick) e.currentTarget.style.background = 'var(--pds-surface-soft)'; }}
              onMouseLeave={e => { if (onRowClick) e.currentTarget.style.background = ''; }}>
              {columns.map(col => <td key={col.key} style={{ padding: '12px 16px', fontSize: 'var(--pds-text-small)', borderBottom: '1px solid var(--pds-border)', color: 'var(--pds-text-primary)' }}>{col.render ? col.render(row[col.key], row) : row[col.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface StatusBadgeProps { status: string; }
export function StatusBadge({ status }: StatusBadgeProps) {
  const colors: Record<string, { bg: string; color: string }> = {
    active: { bg: 'var(--pds-success-soft)', color: 'var(--pds-success)' },
    paid: { bg: 'var(--pds-success-soft)', color: 'var(--pds-success)' },
    completed: { bg: 'var(--pds-success-soft)', color: 'var(--pds-success)' },
    pending: { bg: 'var(--pds-warning-soft)', color: 'var(--pds-warning)' },
    unpaid: { bg: 'var(--pds-warning-soft)', color: 'var(--pds-warning)' },
    suspended: { bg: 'var(--pds-danger-soft)', color: 'var(--pds-danger)' },
    cancelled: { bg: 'var(--pds-danger-soft)', color: 'var(--pds-danger)' },
    draft: { bg: 'var(--pds-neutral)', color: '#fff' },
    in_progress: { bg: 'var(--pds-info-soft)', color: 'var(--pds-info)' },
  };
  const c = colors[status] || { bg: 'var(--pds-surface-soft)', color: 'var(--pds-text-muted)' };
  return <span style={{ background: c.bg, color: c.color, padding: '4px 10px', borderRadius: 'var(--pds-radius-full)', fontSize: 'var(--pds-text-badge)', fontWeight: 500, whiteSpace: 'nowrap' }}>{status}</span>;
}

interface FormSectionProps { title: string; children: React.ReactNode; }
export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div style={{ marginBottom: 'var(--pds-space-6)' }}>
      <h3 style={{ fontSize: 'var(--pds-text-h3)', fontWeight: 600, margin: '0 0 var(--pds-space-4)', color: 'var(--pds-text-primary)', paddingBottom: 'var(--pds-space-2)', borderBottom: '1px solid var(--pds-border)' }}>{title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--pds-space-4)' }}>{children}</div>
    </div>
  );
}

export function Button({ children, variant = 'primary', onClick, disabled, type = 'button', style }: { children: React.ReactNode; variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; onClick?: () => void; disabled?: boolean; type?: 'button' | 'submit'; style?: React.CSSProperties }) {
  const variants = {
    primary: { background: 'var(--pds-primary)', color: '#fff', border: 'none' },
    secondary: { background: 'var(--pds-surface)', color: 'var(--pds-text-primary)', border: '1px solid var(--pds-border)' },
    danger: { background: 'var(--pds-danger)', color: '#fff', border: 'none' },
    ghost: { background: 'transparent', color: 'var(--pds-primary)', border: 'none' },
  };
  return <button type={type} onClick={onClick} disabled={disabled} style={{ padding: '10px 20px', borderRadius: 'var(--pds-radius-md)', fontSize: 'var(--pds-text-body)', fontWeight: 500, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, transition: 'all var(--pds-transition-fast)', ...variants[variant], ...style }}>{children}</button>;
}