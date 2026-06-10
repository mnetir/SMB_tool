import { useState, useEffect } from 'react';
import { contractApi } from '../services/api';

export function ContractsPage() {
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contractApi.list().then((res) => {
      setContracts(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const statusColors: Record<string, string> = {
    Draft: 'var(--pds-neutral)',
    PendingApproval: 'var(--pds-warning)',
    Active: 'var(--pds-success)',
    Expired: 'var(--pds-danger)',
    Terminated: 'var(--pds-danger)',
  };

  return (
    <div>
      <div style={{ marginBottom: 'var(--pds-space-5)' }}>
        <h1 style={{ fontSize: 'var(--pds-text-h1)', fontWeight: 700, color: 'var(--pds-text-primary)' }}>
          قراردادها
        </h1>
        <p style={{ fontSize: 'var(--pds-text-body)', color: 'var(--pds-text-secondary)' }}>
          مدیریت قراردادهای پرسنل
        </p>
      </div>

      <div style={{
        background: 'var(--pds-surface)',
        borderRadius: 'var(--pds-radius-lg)',
        boxShadow: 'var(--pds-shadow-md)',
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--pds-border)' }}>
              <th style={thStyle}>شماره قرارداد</th>
              <th style={thStyle}>نوع</th>
              <th style={thStyle}>تاریخ شروع</th>
              <th style={thStyle}>تاریخ پایان</th>
              <th style={thStyle}>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 'var(--pds-space-6)', color: 'var(--pds-text-muted)' }}>در حال بارگذاری...</td></tr>
            ) : contracts.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 'var(--pds-space-6)', color: 'var(--pds-text-muted)' }}>هیچ قراردادی یافت نشد</td></tr>
            ) : contracts.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid var(--pds-border)' }}>
                <td style={tdStyle}>{c.contractNumber}</td>
                <td style={tdStyle}>{c.contractType}</td>
                <td style={tdStyle}>{c.startDate}</td>
                <td style={tdStyle}>{c.endDate || '—'}</td>
                <td style={tdStyle}>
                  <span style={{
                    padding: '2px 10px',
                    borderRadius: 'var(--pds-radius-full)',
                    fontSize: 'var(--pds-text-badge)',
                    background: 'var(--pds-info-soft)',
                    color: statusColors[c.contractStatus] || 'var(--pds-neutral)',
                  }}>
                    {c.contractStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: 'right',
  padding: '12px var(--pds-space-4)',
  fontSize: 'var(--pds-text-small)',
  fontWeight: 600,
  color: 'var(--pds-text-secondary)',
  background: 'var(--pds-surface-soft)',
};

const tdStyle: React.CSSProperties = {
  textAlign: 'right',
  padding: '12px var(--pds-space-4)',
  fontSize: 'var(--pds-text-body)',
  color: 'var(--pds-text-primary)',
};