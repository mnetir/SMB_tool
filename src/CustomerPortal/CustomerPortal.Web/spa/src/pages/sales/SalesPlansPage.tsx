import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, DataGrid, StatusBadge, Button } from '../../components/common';

export default function SalesPlansPage() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/sales-plans').then(r => r.json()).then(d => { setPlans(d.data || d || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const cols = [
    { key: 'name', label: 'نام پلن' },
    { key: 'code', label: 'کد' },
    { key: 'billingInterval', label: 'دوره', render: (v: any) => v === 'monthly' ? 'ماهانه' : 'سالانه' },
    { key: 'basePrice', label: 'قیمت پایه' },
    { key: 'isPublic', label: 'عمومی', render: (v: any) => v ? '✅' : '❌' },
  ];

  return (
    <div>
      <PageHeader title="پلن‌های فروش" subtitle="تعریف و مدیریت پلن‌های فروش">
        <Button onClick={() => navigate('/portal/sales/plans/create')}>+ پلن جدید</Button>
      </PageHeader>
      <DataGrid columns={cols} data={plans} loading={loading} onRowClick={(r) => navigate(`/portal/sales/plans/${r.id}`)} />
    </div>
  );
}