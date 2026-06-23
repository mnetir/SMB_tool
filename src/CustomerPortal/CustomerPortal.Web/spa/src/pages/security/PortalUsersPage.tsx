import React, { useEffect, useState } from 'react';
import { PageHeader, DataGrid, StatusBadge, Button, Card, FormSection } from '../../components/common';
import toast from 'react-hot-toast';

export default function PortalUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', displayName: '', passwordHash: 'changeme', roles: '["viewer"]' });

  useEffect(() => {
    fetch('/api/v1/portal-users').then(r => r.json()).then(d => { setUsers(d.data || d || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/portal-users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error('خطا');
      toast.success('کاربر ایجاد شد');
      setShowCreate(false);
      window.location.reload();
    } catch (err: any) { toast.error(err.message); }
  };

  const cols = [
    { key: 'username', label: 'نام کاربری' },
    { key: 'displayName', label: 'نام نمایشی', render: (v: any) => v || '-' },
    { key: 'email', label: 'ایمیل' },
    { key: 'status', label: 'وضعیت', render: (v: any) => <StatusBadge status={v} /> },
    { key: 'lastLoginAt', label: 'آخرین ورود', render: (v: any) => v ? new Date(v).toLocaleDateString('fa-IR') : '-' },
  ];

  return (
    <div>
      <PageHeader title="کاربران پورتال" subtitle="مدیریت دسترسی کاربران داخلی">
        <Button onClick={() => setShowCreate(!showCreate)}>+ کاربر جدید</Button>
      </PageHeader>

      {showCreate && (
        <Card style={{ marginBottom: 'var(--pds-space-4)' }}>
          <form onSubmit={handleCreate}>
            <FormSection title="اطلاعات کاربر جدید">
              <div><label style={{ display: 'block', marginBottom: 6 }}>نام کاربری</label><input value={form.username} onChange={e => setForm({...form, username: e.target.value})} required style={{ width: '100%', padding: 10, border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)' }} /></div>
              <div><label style={{ display: 'block', marginBottom: 6 }}>ایمیل</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required style={{ width: '100%', padding: 10, border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)' }} /></div>
              <div><label style={{ display: 'block', marginBottom: 6 }}>نام نمایشی</label><input value={form.displayName} onChange={e => setForm({...form, displayName: e.target.value})} style={{ width: '100%', padding: 10, border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)' }} /></div>
            </FormSection>
            <Button type="submit" variant="primary">ایجاد کاربر</Button>
          </form>
        </Card>
      )}

      <DataGrid columns={cols} data={users} loading={loading} />
    </div>
  );
}