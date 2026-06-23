import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { Button } from '../../components/common';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/portal/dashboard');
    } catch (err: any) {
      setError(err.message || 'خطا در ورود');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--pds-bg)' }}>
      <div style={{ background: 'var(--pds-surface)', borderRadius: 'var(--pds-radius-xl)', padding: 'var(--pds-space-8)', width: 400, boxShadow: 'var(--pds-shadow-xl)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--pds-space-6)' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏢</div>
          <h1 style={{ fontSize: 'var(--pds-text-h2)', fontWeight: 700, margin: 0, color: 'var(--pds-text-primary)' }}>پیشگامان</h1>
          <p style={{ color: 'var(--pds-text-secondary)', margin: '4px 0 0', fontSize: 'var(--pds-text-small)' }}>پورتال مشتریان</p>
        </div>
        {error && <div style={{ background: 'var(--pds-danger-soft)', color: 'var(--pds-danger)', padding: 12, borderRadius: 'var(--pds-radius-sm)', marginBottom: 16, fontSize: 'var(--pds-text-small)' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 'var(--pds-space-4)' }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 'var(--pds-text-small)', color: 'var(--pds-text-secondary)' }}>نام کاربری / ایمیل</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required
              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)', fontSize: 'var(--pds-text-body)', outline: 'none', boxSizing: 'border-box' }}
              placeholder="نام کاربری" />
          </div>
          <div style={{ marginBottom: 'var(--pds-space-4)' }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 'var(--pds-text-small)', color: 'var(--pds-text-secondary)' }}>رمز عبور</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)', fontSize: 'var(--pds-text-body)', outline: 'none', boxSizing: 'border-box' }}
              placeholder="رمز عبور" />
          </div>
          <Button type="submit" variant="primary" disabled={loading} style={{ width: '100%' }}>{loading ? 'در حال ورود...' : 'ورود'}</Button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 'var(--pds-space-4)', fontSize: 'var(--pds-text-caption)', color: 'var(--pds-text-muted)' }}>v1.0.0</p>
      </div>
    </div>
  );
}