import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PageHeader, Button, Card, FormSection, StatusBadge } from '../../components/common';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;
  const [form, setForm] = useState({ name: '', description: '', isActive: true });

  useEffect(() => {
    if (id) fetch(`/api/v1/products/${id}`).then(r => r.json()).then(d => {
      const p = d.data || d;
      setForm({ name: p.name || '', description: p.description || '', isActive: p.isActive ?? true });
    }).catch(() => {});
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(isNew ? '/api/v1/products' : `/api/v1/products/${id}`, {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('خطا در ذخیره');
      toast.success(isNew ? 'محصول ایجاد شد' : 'محصول به‌روز شد');
      navigate('/portal/products');
    } catch (err: any) { toast.error(err.message); }
  };

  return (
    <div>
      <PageHeader title={isNew ? 'محصول جدید' : 'ویرایش محصول'} subtitle={isNew ? 'تعریف محصول جدید' : `شناسه: ${id}`}>
        <Button variant="ghost" onClick={() => navigate('/portal/products')}>بازگشت</Button>
      </PageHeader>
      <Card>
        <form onSubmit={handleSubmit}>
          <FormSection title="اطلاعات محصول">
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 'var(--pds-text-small)', color: 'var(--pds-text-secondary)' }}>نام محصول</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={{ width: '100%', padding: 10, border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)', fontSize: 'var(--pds-text-body)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 'var(--pds-text-small)', color: 'var(--pds-text-secondary)' }}>توضیحات</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} style={{ width: '100%', padding: 10, border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)', fontSize: 'var(--pds-text-body)' }} />
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} />
                <span style={{ fontSize: 'var(--pds-text-body)' }}>فعال</span>
              </label>
            </div>
          </FormSection>
          <div style={{ display: 'flex', gap: 'var(--pds-space-3)' }}>
            <Button type="submit" variant="primary">ذخیره</Button>
            <Button variant="secondary" onClick={() => navigate('/portal/products')}>انصراف</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}