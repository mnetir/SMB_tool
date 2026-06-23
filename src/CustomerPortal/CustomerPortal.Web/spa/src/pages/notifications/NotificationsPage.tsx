import React, { useEffect, useState } from 'react';
import { PageHeader, DataGrid, StatusBadge } from '../../components/common';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/notifications').then(r => r.json()).then(d => setNotifications(d.data || d || [])).catch(() => setLoading(false));
    setLoading(false);
  }, []);

  const cols = [
    { key: 'type', label: 'نوع' },
    { key: 'title', label: 'عنوان' },
    { key: 'body', label: 'متن', render: (v: any) => v?.substring(0, 50) || '-' },
    { key: 'isRead', label: 'خوانده شده', render: (v: any) => v ? '✅' : '❌' },
    { key: 'createdAtUtc', label: 'تاریخ', render: (v: any) => v ? new Date(v).toLocaleDateString('fa-IR') : '-' },
  ];

  return (
    <div>
      <PageHeader title="اعلان‌ها" subtitle="مرکز اعلان‌های سیستمی" />
      <DataGrid columns={cols} data={notifications} loading={loading} />
    </div>
  );
}