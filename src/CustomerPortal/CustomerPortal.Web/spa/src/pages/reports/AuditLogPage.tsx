import React, { useEffect, useState } from 'react';
import { PageHeader, DataGrid } from '../../components/common';

export default function AuditLogPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/audit-logs').then(r => r.json()).then(d => { setLogs(d.items || d.data || d || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const cols = [
    { key: 'action', label: 'عملیات' },
    { key: 'actorUserName', label: 'کاربر', render: (v: any) => v || '-' },
    { key: 'entityType', label: 'نهاد' },
    { key: 'entityId', label: 'شناسه نهاد', render: (v: any) => v ? v.substring(0, 8) + '...' : '-' },
    { key: 'description', label: 'توضیحات', render: (v: any) => v?.substring(0, 60) || '-' },
    { key: 'createdAtUtc', label: 'تاریخ', render: (v: any) => v ? new Date(v).toLocaleDateString('fa-IR') : '-' },
  ];

  return (
    <div>
      <PageHeader title="گزارش رویدادها" subtitle="لاگ فعالیت‌های سیستمی" />
      <DataGrid columns={cols} data={logs} loading={loading} />
    </div>
  );
}