import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, DataGrid, StatusBadge, Button, Card } from '../../components/common';

export default function InvoicesPage() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const [newInv, setNewInv] = useState({ customerId: '', totalAmount: 0, currency: 'IRR', items: [{ description: '', amount: 0, type: 'plan_fee' }] });

  useEffect(() => {
    fetch('/api/v1/invoices').then(r => r.json()).then(d => { setInvoices(d.items || d.data || d || []); setLoading(false); }).catch(() => setLoading(false));
    fetch('/api/v1/customers').then(r => r.json()).then(d => setCustomers(d.items || d.data || d || [])).catch(() => {});
  }, []);

  const cols = [
    { key: 'number', label: 'شماره' },
    { key: 'customer', label: 'مشتری', render: (v: any) => v?.name || '-' },
    { key: 'totalAmount', label: 'مبلغ', render: (v: any) => Number(v).toLocaleString() },
    { key: 'currency', label: 'ارز' },
    { key: 'status', label: 'وضعیت', render: (v: any) => <StatusBadge status={v} /> },
    { key: 'dueDate', label: 'سررسید', render: (v: any) => v ? new Date(v).toLocaleDateString('fa-IR') : '-' },
  ];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInv),
      });
      if (!res.ok) throw new Error('خطا');
      setShowCreate(false);
      window.location.reload();
    } catch (err: any) { alert(err.message); }
  };

  return (
    <div>
      <PageHeader title="صورتحساب‌ها" subtitle="مدیریت صورتحساب‌ها و پرداخت‌ها">
        <Button onClick={() => setShowCreate(!showCreate)}>+ صورت‌حساب جدید</Button>
      </PageHeader>

      {showCreate && (
        <Card style={{ marginBottom: 'var(--pds-space-4)' }}>
          <form onSubmit={handleCreate}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div><label style={{ display: 'block', marginBottom: 6, fontSize: 'var(--pds-text-small)' }}>مشتری</label>
                <select value={newInv.customerId} onChange={e => setNewInv({...newInv, customerId: e.target.value})} required style={{ width: '100%', padding: 10, border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)' }}>
                  <option value="">انتخاب مشتری</option>
                  {customers.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div><label style={{ display: 'block', marginBottom: 6, fontSize: 'var(--pds-text-small)' }}>مبلغ کل</label>
                <input type="number" value={newInv.totalAmount} onChange={e => setNewInv({...newInv, totalAmount: Number(e.target.value)})} required style={{ width: '100%', padding: 10, border: '1px solid var(--pds-border)', borderRadius: 'var(--pds-radius-md)' }} />
              </div>
            </div>
            <Button type="submit" variant="primary">ایجاد صورت‌حساب</Button>
          </form>
        </Card>
      )}

      <DataGrid columns={cols} data={invoices} loading={loading} onRowClick={(r) => navigate(`/portal/sales/invoices/${r.id}`)} />
    </div>
  );
}