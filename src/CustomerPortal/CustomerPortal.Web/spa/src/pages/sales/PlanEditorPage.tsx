import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PageHeader, Button, Card, FormSection } from '../../components/common';

export default function PlanEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;
  const [form, setForm] = useState({ name: '', code: '', description: '', productId: '', billingInterval: 'monthly', basePrice: 0, isPublic: true, isTrial: false, trialDays: 14 });
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/v1/products').then(r => r.json()).then(d => setProducts(d.data || d || [])).catch(() => {});
    if (id) fetch(`/api/v1/sales-plans/${id}`).then(r => r.json()).then(d => {
      const p = d.data || d;
      setForm({ name: p.name || '', code: p.code || '', description: p.description || '', productId: p.productId || '', billingInterval: p.billingInterval || 'monthly', basePrice: Number(p.basePrice || 0), isPublic: p.isPublic ?? true, isTrial: p.isTrial ?? false, trialDays: p.trialDays || 14 });
    }).catch(() => {});
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(isNew ? '/api/v1/sales-plans' : '', {
        method: isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, basePrice: Number(form.basePrice) }),
      });
      if (!res.ok) throw new Error('خطا در ذخیره');
      toast.success(isNew ? 'پلن ایجاد شد' : 'پلن به‌روز شد');
      navigate('/portal/sales/plans');
    } catch (err: any) { toast.error(err.message); }
  };

  return (
    <div>
      <PageHeader title={isNew ? 'پلن جدید' : 'ویرایش پلن'} subtitle={isNew ? 'تعریف پلن فروش جدید' : `شناسه: ${id}`}>
        <Button variant="ghost" onClick={() => navigate('/portal/sales/plans')}>بازگشت</Button>
      </PageHeader>
      <Card>
        <form onSubmit={handleSubmit}>
          <FormSection title="اطلاعات پلن">
            <div><label style={{ display: 'block', marginBottom: 6, fontSize: 'var(--pds-text-small)', color: 'var(--pds-text-secondary)' }}>نام پلن</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={{ width: '100%', padding: 10, border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)' }} /></div>
            <div><label style={{ display: 'block', marginBottom: 6, fontSize: 'var(--pds-text-small)', color: 'var(--pds-text-secondary)' }}>کد پلن</label><input value={form.code} onChange={e => setForm({...form, code: e.target.value})} required style={{ width: '100%', padding: 10, border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)' }} /></div>
            <div><label style={{ display: 'block', marginBottom: 6, fontSize: 'var(--pds-text-small)', color: 'var(--pds-text-secondary)' }}>محصول</label><select value={form.productId} onChange={e => setForm({...form, productId: e.target.value})} required style={{ width: '100%', padding: 10, border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)' }}>
              <option value="">انتخاب محصول</option>
              {products.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select></div>
            <div><label style={{ display: 'block', marginBottom: 6, fontSize: 'var(--pds-text-small)', color: 'var(--pds-text-secondary)' }}>دوره صورتحساب</label><select value={form.billingInterval} onChange={e => setForm({...form, billingInterval: e.target.value})} style={{ width: '100%', padding: 10, border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)' }}>
              <option value="monthly">ماهانه</option><option value="yearly">سالانه</option>
            </select></div>
            <div><label style={{ display: 'block', marginBottom: 6, fontSize: 'var(--pds-text-small)', color: 'var(--pds-text-secondary)' }}>قیمت پایه</label><input type="number" value={form.basePrice} onChange={e => setForm({...form, basePrice: Number(e.target.value)})} required style={{ width: '100%', padding: 10, border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)' }} /></div>
            <div><label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}><input type="checkbox" checked={form.isPublic} onChange={e => setForm({...form, isPublic: e.target.checked})} /><span>عمومی</span></label></div>
          </FormSection>
          <FormSection title="تنظیمات آزمایشی">
            <div><label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}><input type="checkbox" checked={form.isTrial} onChange={e => setForm({...form, isTrial: e.target.checked})} /><span>پلن آزمایشی</span></label></div>
            {form.isTrial && <div><label style={{ display: 'block', marginBottom: 6, fontSize: 'var(--pds-text-small)', color: 'var(--pds-text-secondary)' }}>مدت آزمایش (روز)</label><input type="number" value={form.trialDays} onChange={e => setForm({...form, trialDays: Number(e.target.value)})} style={{ width: '100%', padding: 10, border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)' }} /></div>}
          </FormSection>
          <div style={{ display: 'flex', gap: 'var(--pds-space-3)' }}><Button type="submit" variant="primary">ذخیره</Button><Button variant="secondary" onClick={() => navigate('/portal/sales/plans')}>انصراف</Button></div>
        </form>
      </Card>
    </div>
  );
}