import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PageHeader, Button, Card } from '../../components/common';

export default function LicensePage() {
  const { id: subId } = useParams();
  const navigate = useNavigate();
  const [license, setLicense] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/v1/subscriptions/${subId}/license`).then(r => r.ok ? r.json() : null).then(d => setLicense(d?.data || d)).catch(() => {});
  }, [subId]);

  const handleGenerate = async () => {
    try {
      const res = await fetch(`/api/v1/subscriptions/${subId}/license/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grantedPermissions: '{}', grantedLimits: '{}' }),
      });
      if (!res.ok) throw new Error('خطا');
      toast.success('مجوز جدید صادر شد');
      window.location.reload();
    } catch (err: any) { toast.error(err.message); }
  };

  return (
    <div>
      <PageHeader title="مدیریت مجوز" subtitle={`اشتراک: ${subId}`}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button onClick={handleGenerate}>صدور مجوز جدید</Button>
          <Button variant="ghost" onClick={() => navigate(`/portal/subscriptions/${subId}`)}>بازگشت</Button>
        </div>
      </PageHeader>
      {license ? (
        <Card>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div><strong>کلید مجوز:</strong> {license.licenseKey || '-'}</div>
            <div><strong>انقضا:</strong> {license.expiresAt ? new Date(license.expiresAt).toLocaleDateString('fa-IR') : '-'}</div>
            <div><strong>آخرین همگام‌سازی:</strong> {license.lastPushedAt ? new Date(license.lastPushedAt).toLocaleDateString('fa-IR') : '-'}</div>
          </div>
        </Card>
      ) : (
        <Card><p style={{ textAlign: 'center', color: 'var(--pds-text-muted)' }}>مجوزی صادر نشده است. دکمه "صدور مجوز جدید" را بزنید.</p></Card>
      )}
    </div>
  );
}