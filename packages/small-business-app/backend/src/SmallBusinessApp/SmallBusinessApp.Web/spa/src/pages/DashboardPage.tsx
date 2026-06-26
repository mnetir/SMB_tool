import React, { useEffect, useState } from 'react';
import { coreApi } from '../services/api';

const DashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    coreApi.getDashboardSummary()
      .then(res => setSummary(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="pds-page-header">
        <div className="pds-page-header-content">
          <h1 className="pds-page-header-title">داشبورد</h1>
          <p className="pds-page-header-description">نمای کلی شرکت</p>
        </div>
      </div>

      {loading ? (
        <div className="pds-loading-container">
          <div className="pds-spinner" />
          <span>در حال بارگذاری...</span>
        </div>
      ) : (
        <div className="pds-dashboard-grid">
          <div className="pds-kpi-card">
            <p className="pds-kpi-card-title">کارکنان فعال</p>
            <p className="pds-kpi-card-value">{summary?.activeEmployees ?? '—'}</p>
          </div>
          <div className="pds-kpi-card">
            <p className="pds-kpi-card-title">درخواست‌های مرخصی</p>
            <p className="pds-kpi-card-value">{summary?.pendingLeaveRequests ?? '—'}</p>
          </div>
          <div className="pds-kpi-card">
            <p className="pds-kpi-card-title">قراردادهای فعال</p>
            <p className="pds-kpi-card-value">{summary?.activeContracts ?? '—'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;