import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PageHeader, Button, Card, StatusBadge, DataGrid } from '../../components/common';

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/v1/invoices/${id}`).then(r => r.json()).then(d => { setInvoice(d.data || d); }).catch(() => {});
    fetch(`/api/v1/invoices/${id}/payments`).then(r => r.json()).then(d => setPayments(d.data || d || [])).catch(() => {});
  }, [id]);

  const handleApprove = async () => {
    try {
      await fetch(`/api/v1/invoices/${id}/approve`, { method: 'POST' });
      toast.success('صورتحساب تأیید شد');
      window.location.reload();
    } catch (err: any) { toast.error(err.message); }
  };

  const handleReject = async () => {
    try {
      await fetch(`/api/v1/invoices/${id}/reject`, { method: 'POST' });
      toast.success('صورتحساب رد شد');
      window.location.reload();
    } catch (err: any) { toast.error(err.message); }
  };

  const handleRegisterPayment = async () => {
    const amount = prompt('مبلغ پرداخت:');
    if (!amount) return;
    try {
      const res = await fetch(`/api/v1/invoices/${id}/payments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: Number(amount), method: 'bank_transfer', status: 'pending' }) });
      if (!res.ok) throw new Error('خطا');
      toast.success('پرداخت ثبت شد');
      window.location.reload();
    } catch (err: any) { toast.error(err.message); }
  };

  if (!invoice) return <div>در حال بارگذاری...</div>;

  const payCols = [
    { key: 'amount', label: 'مبلغ', render: (v: any) => Number(v).toLocaleString() },
    { key: 'method', label: 'روش' },
    { key: 'status', label: 'وضعیت', render: (v: any) => <StatusBadge status={v} /> },
    { key: 'paidAt', label: 'تاریخ', render: (v: any) => v ? new Date(v).toLocaleDateString('fa-IR') : '-' },
  ];

  return (
    <div>
      <PageHeader title={`صورتحساب ${invoice.number}`} subtitle={`مشتری: ${invoice.customer?.name || invoice.customerId}`}>
        <div style={{ display: 'flex', gap: 8 }}>
          {invoice.status === 'unpaid' && <><Button variant="primary" onClick={handleApprove}>تأیید</Button><Button variant="danger" onClick={handleReject}>رد</Button><Button onClick={handleRegisterPayment}>ثبت پرداخت</Button></>}
          <Button variant="ghost" onClick={() => navigate('/portal/sales/invoices')}>بازگشت</Button>
        </div>
      </PageHeader>
      <div style={{ marginBottom: 16 }}><StatusBadge status={invoice.status} /></div>
      <Card style={{ marginBottom: 'var(--pds-space-4)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><strong>شماره:</strong> {invoice.number}</div>
          <div><strong>مبلغ:</strong> {Number(invoice.totalAmount).toLocaleString()} {invoice.currency}</div>
          <div><strong>سررسید:</strong> {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString('fa-IR') : '-'}</div>
          {invoice.paidAt && <div><strong>تاریخ پرداخت:</strong> {new Date(invoice.paidAt).toLocaleDateString('fa-IR')}</div>}
        </div>
      </Card>
      <h3 style={{ fontSize: 'var(--pds-text-h3)', fontWeight: 600, marginBottom: 12 }}>پرداخت‌ها</h3>
      <DataGrid columns={payCols} data={payments} />
    </div>
  );
}