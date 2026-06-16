import { Routes, Route, Navigate } from 'react-router-dom';

function Dashboard() {
  return (
    <div style={{ padding: 'var(--pds-space-6)' }}>
      <h1 style={{ fontSize: 'var(--pds-text-h1)', fontWeight: 700 }}>داشبورد</h1>
      <p>به پورتال مشتریان پیشگامان خوش آمدید</p>
    </div>
  );
}

function App() {
  return (
    <div dir="rtl">
      <Routes>
        <Route path="/" element={<Navigate to="/portal/dashboard" replace />} />
        <Route path="/portal/dashboard" element={<Dashboard />} />
        <Route path="/portal/products" element={<div>Products</div>} />
        <Route path="/portal/customers" element={<div>Customers</div>} />
        <Route path="/portal/sales" element={<div>Sales</div>} />
        <Route path="/portal/subscriptions" element={<div>Subscriptions</div>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;