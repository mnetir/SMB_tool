import React from 'react';

const UsersListPage: React.FC = () => (
  <div>
    <div className="pds-page-header">
      <div className="pds-page-header-content">
        <h1 className="pds-page-header-title">کاربران سیستم</h1>
        <p className="pds-page-header-description">مدیریت کاربران و دسترسی‌ها</p>
      </div>
    </div>
    <div className="pds-kpi-card" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
      <p>لیست کاربران به زودی</p>
    </div>
  </div>
);

export default UsersListPage;