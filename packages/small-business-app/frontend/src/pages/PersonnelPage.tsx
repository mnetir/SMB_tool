import { useState, useEffect } from 'react';
import { personnelApi } from '../services/api';

export function PersonnelPage() {
  const [personnel, setPersonnel] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    personnelApi.list().then((res) => {
      setPersonnel(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 'var(--pds-space-5)' }}>
        <h1 style={{ fontSize: 'var(--pds-text-h1)', fontWeight: 700, color: 'var(--pds-text-primary)' }}>
          پرسنل
        </h1>
        <p style={{ fontSize: 'var(--pds-text-body)', color: 'var(--pds-text-secondary)' }}>
          مدیریت پرسنل سازمان
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
              <th style={thStyle}>شماره پرسنلی</th>
              <th style={thStyle}>نام</th>
              <th style={thStyle}>نام خانوادگی</th>
              <th style={thStyle}>کد ملی</th>
              <th style={thStyle}>موبایل</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 'var(--pds-space-6)', color: 'var(--pds-text-muted)' }}>در حال بارگذاری...</td></tr>
            ) : personnel.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 'var(--pds-space-6)', color: 'var(--pds-text-muted)' }}>هیچ پرسنلی یافت نشد</td></tr>
            ) : personnel.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--pds-border)' }}>
                <td style={tdStyle}>{p.personnelNumber}</td>
                <td style={tdStyle}>{p.firstName}</td>
                <td style={tdStyle}>{p.lastName}</td>
                <td style={tdStyle}>{p.nationalCode || '—'}</td>
                <td style={tdStyle}>{p.mobile || '—'}</td>
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