import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PageHeader, Button, Card, FormSection, StatusBadge } from '../../components/common';

export default function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;
  const [form, setForm] = useState({ name: '', alias: '', contactEmail: '', contactPhone: '', status: 'active' });

  useEffect(() => {
    if (id) fetch(`/api/v1/customers/${id}`).then(r => r.json()).then(d => {
      const c = d.data || d;
      setForm({ name: c.name || '', alias: c.alias || '', contactEmail: c.contactEmail || '', contactPhone: c.contactPhone || '', status: c.status || 'active' });
    }).catch(() => {});
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(isNew ? '/api/v1/customers' : `/api/v1/customers/${id}`, {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || 'خطا'); }
      toast.success(isNew ? 'مشتری ایجاد شد' : 'مشتری به‌روز شد');
      navigate('/portal/customers');
    } catch (err: any) { toast.error(err.message); }
  };

  const handleSuspend = async () => {
    if (!confirm('آیا از تعلیق این مشتری اطمینان دارید؟')) return;
    try {
      const res = await fetch(`/api/v1/customers/${id}/suspend`, { method: 'POST' });
      if (!res.ok) throw new Error('خطا');
      toast.success('مشتری تعلیق شد');
      setForm(f => ({...f, status: 'suspended'}));
    } catch (err: any) { toast.error(err.message); }
  };

  return (
    <div>
      <PageHeader title={isNew ? 'مشتری جدید' : 'جزئیات مشتری'} subtitle={isNew ? 'ایجاد مشتری جدید' : `شناسه: ${id}`}>
        <div style={{ display: 'flex', gap: 8 }}>
          {!isNew && form.status === 'active' && <Button variant="danger" onClick={handleSuspend}>تعلیق</Button>}
          <Button variant="ghost" onClick={() => navigate('/portal/customers')}>بازگشت</Button>
        </div>
      </PageHeader>
      {!isNew && <div style={{ marginBottom: 16 }}><StatusBadge status={form.status} /></div>}
      <Card>
        <form onSubmit={handleSubmit}>
          <FormSection title="اطلاعات مشتری">
            <div><label style={{ display: 'block', marginBottom: 6, fontSize: 'var(--pds-text-small)', color: 'var(--pds-text-secondary)' }}>نام</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={{ width: '100%', padding: 10, border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)' }} /></div>
            <div><label style={{ display: 'block', marginBottom: 6, fontSize: 'var(--pds-text-small)', color: 'var(--pds-text-secondary)' }}>نام مستعار (alias)</label><input value={form.alias} onChange={e => setForm({...form, alias: e.target.value})} required disabled={!isNew} style={{ width: '100%', padding: 10, border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)' }} /></div>
            <div><label style={{ display: 'block', marginBottom: 6, fontSize: 'var(--pds-text-small)', color: 'var(--pds-text-secondary)' }}>ایمیل</label><input type="email" value={form.contactEmail} onChange={e => setForm({...form, contactEmail: e.target.value})} style={{ width: '100%', padding: 10, border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)' }} /></div>
            <div><label style={{ display: 'block', marginBottom: 6, fontSize: 'var(--pds-text-small)', color: 'var(--pds-text-secondary)' }}>تلفن</label><input value={form.contactPhone} onChange={e => setForm({...form, contactPhone: e.target.value})} style={{ width: '100%', padding: 10, border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)' }} /></div>
          </FormSection>
          <div style={{ display: 'flex', gap: 'var(--pds-space-3)' }}>
            <Button type="submit" variant="primary">ذخیره</Button>
            <Button variant="secondary" onClick={() => navigate('/portal/customers')}>انصراف</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}