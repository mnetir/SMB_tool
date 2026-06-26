import React from 'react';
import { useParams } from 'react-router-dom';

const PersonnelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <div className="pds-page-header">
        <div className="pds-page-header-content">
          <h1 className="pds-page-header-title">جزئیات پرسنل</h1>
        </div>
      </div>
      <div className="pds-kpi-card" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
        <p>اطلاعات پرسنل {id} به زودی</p>
      </div>
    </div>
  );
};

export default PersonnelDetailPage;