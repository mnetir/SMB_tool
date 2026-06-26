import React, { useEffect, useState } from 'react';
import { hrApi } from '../../services/api';

const PersonnelListPage: React.FC = () => {
  const [personnel, setPersonnel] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hrApi.getPersonnel().then(res => setPersonnel(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="pds-page-header">
        <div className="pds-page-header-content">
          <h1 className="pds-page-header-title">پرسنل</h1>
          <p className="pds-page-header-description">مدیریت اطلاعات پرسنلی</p>
        </div>
      </div>

      {loading ? (
        <div className="pds-loading-container"><div className="pds-spinner" /><span>در حال بارگذاری...</span></div>
      ) : personnel.length === 0 ? (
        <div className="pds-kpi-card" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
          <p>هنوز پرسنلی ثبت نشده است. برای شروع، یک پرسنل جدید ایجاد کنید.</p>
        </div>
      ) : (
        <div className="pds-kpi-card">
          <p style={{ color: '#64748b' }}>{personnel.length} پرسنل ثبت شده</p>
        </div>
      )}
    </div>
  );
};

export default PersonnelListPage;