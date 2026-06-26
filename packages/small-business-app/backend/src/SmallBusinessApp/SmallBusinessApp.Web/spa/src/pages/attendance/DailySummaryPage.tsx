import React from 'react';

const DailySummaryPage: React.FC = () => (
  <div>
    <div className="pds-page-header">
      <div className="pds-page-header-content">
        <h1 className="pds-page-header-title">خلاصه حضور روزانه</h1>
      </div>
    </div>
    <div className="pds-kpi-card" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}><p>خلاصه روزانه به زودی</p></div>
  </div>
);
export default DailySummaryPage;