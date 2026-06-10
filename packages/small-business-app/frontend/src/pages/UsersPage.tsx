import { useState, useEffect } from 'react';
import { userApi } from '../services/api';

export function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userApi.list().then((res) => {
      setUsers(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="pds-page-header" style={{ marginBottom: 'var(--pds-space-5)' }}>
        <h1 style={{ fontSize: 'var(--pds-text-h1)', fontWeight: 700, color: 'var(--pds-text-primary)' }}>
          کاربران
        </h1>
        <p style={{ fontSize: 'var(--pds-text-body)', color: 'var(--pds-text-secondary)' }}>
          مدیریت کاربران سامانه
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
              <th style={thStyle}>نام نمایشی</th>
              <th style={thStyle}>نام کاربری</th>
              <th style={thStyle}>ایمیل</th>
              <th style={thStyle}>وضعیت</th>
              <th style={thStyle}>کارمند</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 'var(--pds-space-6)', color: 'var(--pds-text-muted)' }}>در حال بارگذاری...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 'var(--pds-space-6)', color: 'var(--pds-text-muted)' }}>هیچ کاربری یافت نشد</td></tr>
            ) : users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--pds-border)' }}>
                <td style={tdStyle}>{user.displayName}</td>
                <td style={tdStyle}>{user.username}</td>
                <td style={tdStyle}>{user.email || '—'}</td>
                <td style={tdStyle}>
                  <span style={{
                    padding: '2px 10px',
                    borderRadius: 'var(--pds-radius-full)',
                    fontSize: 'var(--pds-text-badge)',
                    background: user.isActive ? 'var(--pds-success-soft)' : 'var(--pds-danger-soft)',
                    color: user.isActive ? 'var(--pds-success)' : 'var(--pds-danger)',
                  }}>
                    {user.isActive ? 'فعال' : 'غیرفعال'}
                  </span>
                </td>
                <td style={tdStyle}>
                  {user.isEmployee ? 'بله' : 'خیر'}
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