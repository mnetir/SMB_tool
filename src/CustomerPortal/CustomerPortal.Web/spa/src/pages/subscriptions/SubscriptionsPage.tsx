import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, DataGrid, StatusBadge, Button } from '../../components/common';

export default function SubscriptionsPage() {
  const navigate = useNavigate();
  const [subs, setSubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/subscriptions').then(r => r.json()).then(d => { setSubs(d.items || d.data || d || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const cols = [
    { key: 'customer', label: 'مشتری', render: (v: any) => v?.name || '-' },
    { key: 'plan', label: 'پلن', render: (v: any) => v?.name || '-' },
    { key: 'status', label: 'وضعیت', render: (v: any) => <StatusBadge status={v} /> },
    { key: 'isTrial', label: 'آزمایشی', render: (v: any) => v ? '✅' : '❌' },
    { key: 'startDate', label: 'شروع', render: (v: any) => v ? new Date(v).toLocaleDateString('fa-IR') : '-' },
    { key: 'endDate', label: 'پایان', render: (v: any) => v ? new Date(v).toLocaleDateString('fa-IR') : '-' },
  ];

  return (
    <div>
      <PageHeader title="اشتراک‌ها" subtitle="مدیریت اشتراک مشتریان">
        <Button variant="ghost" onClick={() => navigate('/portal/subscriptions')}>بازخوانی</Button>
      </PageHeader>
      <DataGrid columns={cols} data={subs} loading={loading} onRowClick={(r) => navigate(`/portal/subscriptions/${r.id}`)} />
    </div>
  );
}