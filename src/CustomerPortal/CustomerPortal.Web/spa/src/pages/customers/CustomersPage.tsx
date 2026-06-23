import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, DataGrid, StatusBadge, Button } from '../../components/common';

export default function CustomersPage() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/customers').then(r => r.json()).then(d => { setCustomers(d.items || d.data || d || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const cols = [
    { key: 'name', label: 'نام مشتری' },
    { key: 'alias', label: 'نام مستعار' },
    { key: 'contactEmail', label: 'ایمیل', render: (v: any) => v || '-' },
    { key: 'status', label: 'وضعیت', render: (v: any) => <StatusBadge status={v} /> },
  ];

  return (
    <div>
      <PageHeader title="مدیریت مشتریان" subtitle="مشاهده و مدیریت مشتریان پلتفرم">
        <Button onClick={() => navigate('/portal/customers/create')}>+ مشتری جدید</Button>
      </PageHeader>
      <DataGrid columns={cols} data={customers} loading={loading} onRowClick={(r) => navigate(`/portal/customers/${r.id}`)} />
    </div>
  );
}