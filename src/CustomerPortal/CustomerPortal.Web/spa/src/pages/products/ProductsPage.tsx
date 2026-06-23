import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, DataGrid, StatusBadge, Button, Card } from '../../components/common';

export default function ProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/products').then(r => r.json()).then(d => { setProducts(d.data || d || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const cols = [
    { key: 'name', label: 'نام محصول' },
    { key: 'description', label: 'توضیحات', render: (v: any) => v || '-' },
    { key: 'isActive', label: 'وضعیت', render: (v: any) => <StatusBadge status={v ? 'active' : 'draft'} /> },
    { key: 'modules', label: 'ماژول‌ها', render: (v: any) => Array.isArray(v) ? v.length : 0 },
  ];

  return (
    <div>
      <PageHeader title="مدیریت محصولات" subtitle="تعریف و مدیریت محصولات و ماژول‌ها">
        <Button onClick={() => navigate('/portal/products/create')}>+ محصول جدید</Button>
      </PageHeader>
      <DataGrid columns={cols} data={products} loading={loading} onRowClick={(r) => navigate(`/portal/products/${r.id}`)} />
    </div>
  );
}