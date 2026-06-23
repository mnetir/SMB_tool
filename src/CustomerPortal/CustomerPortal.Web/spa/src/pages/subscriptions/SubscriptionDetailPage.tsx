import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PageHeader, Button, Card, StatusBadge } from '../../components/common';

export default function SubscriptionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sub, setSub] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/v1/subscriptions/${id}`).then(r => r.json()).then(d => { setSub(d.data || d); }).catch(() => {});
  }, [id]);

  const action = async (action: string) => {
    try {
      const res = await fetch(`/api/v1/subscriptions/${id}/${action}`, { method: 'POST' });
      if (!res.ok) throw new Error('خطا');
      toast.success(`اشتراک ${action} شد`);
      window.location.reload();
    } catch (err: any) { toast.error(err.message); }
  };

  if (!sub) return <div style={{ padding: 40, textAlign: 'center' }}>در حال بارگذاری...</div>;

  return (
    <div>
      <PageHeader title={`اشتراک ${sub.customer?.name || sub.customerId}`} subtitle={`شناسه: ${id}`}>
        <div style={{ display: 'flex', gap: 8 }}>
          {sub.status === 'draft' && <Button onClick={() => action('activate')}>فعال‌سازی</Button>}
          {sub.status === 'active' && <><Button variant="danger" onClick={() => action('suspend')}>تعلیق</Button><Button variant="secondary" onClick={() => action('cancel')}>لغو</Button></>}
          {sub.status === 'suspended' && <Button onClick={() => action('resume')}>فعال‌سازی مجدد</Button>}
          {sub.license && <Button variant="ghost" onClick={() => navigate(`/portal/subscriptions/${id}/license`)}>مجوز</Button>}
          <Button variant="ghost" onClick={() => navigate('/portal/subscriptions')}>بازگشت</Button>
        </div>
      </PageHeader>

      <div style={{ marginBottom: 16 }}><StatusBadge status={sub.status} /></div>

      <Card style={{ marginBottom: 'var(--pds-space-4)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><strong>مشتری:</strong> {sub.customer?.name || sub.customerId}</div>
          <div><strong>پلن:</strong> {sub.plan?.name || 'سفارشی'}</div>
          <div><strong>آزمایشی:</strong> {sub.isTrial ? '✅' : '❌'}</div>
          <div><strong>شروع:</strong> {sub.startDate ? new Date(sub.startDate).toLocaleDateString('fa-IR') : '-'}</div>
          <div><strong>پایان:</strong> {sub.endDate ? new Date(sub.endDate).toLocaleDateString('fa-IR') : '-'}</div>
        </div>
      </Card>

      {sub.license && (
        <Card>
          <h3 style={{ fontSize: 'var(--pds-text-h3)', fontWeight: 600, margin: '0 0 var(--pds-space-3)' }}>مجوز</h3>
          <p><strong>کلید:</strong> {sub.license.licenseKey || '-'}</p>
          <p><strong>انقضا:</strong> {sub.license.expiresAt ? new Date(sub.license.expiresAt).toLocaleDateString('fa-IR') : '-'}</p>
        </Card>
      )}
    </div>
  );
}