import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';

const menuItems = [
  { path: '/portal/dashboard', label: 'داشبورد', icon: '📊' },
  { path: '/portal/products', label: 'محصولات', icon: '📦' },
  { path: '/portal/customers', label: 'مشتریان', icon: '👥' },
  { path: '/portal/sales/plans', label: 'پلن‌های فروش', icon: '📋' },
  { path: '/portal/sales/invoices', label: 'صورتحساب‌ها', icon: '💰' },
  { path: '/portal/subscriptions', label: 'اشتراک‌ها', icon: '🔑' },
  { path: '/portal/notifications', label: 'اعلان‌ها', icon: '🔔' },
  { path: '/portal/security/users', label: 'کاربران', icon: '👤' },
  { path: '/portal/reports/audit', label: 'گزارشات', icon: '📈' },
];

export default function PortalLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--pds-bg)' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 240 : 60,
        background: 'var(--pds-sidebar-bg)',
        borderLeft: '1px solid var(--pds-border)',
        display: 'flex', flexDirection: 'column',
        transition: 'width var(--pds-transition-normal)',
        boxShadow: 'var(--pds-shadow-lg)', zIndex: 300,
        position: 'fixed', right: 0, top: 0, bottom: 0,
      }}>
        <div style={{ padding: 'var(--pds-space-4)', borderBottom: '1px solid var(--pds-border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>🏢</span>
          {sidebarOpen && <span style={{ fontWeight: 700, fontSize: 'var(--pds-text-h3)' }}>پیشگامان</span>}
        </div>
        <nav style={{ flex: 1, padding: 'var(--pds-space-2)', overflowY: 'auto' }}>
          {menuItems.map(item => (
            <NavLink key={item.path} to={item.path} end={item.path === '/portal/dashboard'}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                margin: '2px 0', borderRadius: 'var(--pds-radius-sm)',
                textDecoration: 'none', color: isActive ? 'var(--pds-primary)' : 'var(--pds-text-secondary)',
                background: isActive ? 'var(--pds-primary-soft)' : 'transparent',
                fontWeight: isActive ? 600 : 400, fontSize: 'var(--pds-text-body)',
                transition: 'background var(--pds-transition-fast)',
              })}
            >
              <span>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
        <div style={{ padding: 'var(--pds-space-3)', borderTop: '1px solid var(--pds-border)' }}>
          {sidebarOpen && user && (
            <div style={{ fontSize: 'var(--pds-text-small)', color: 'var(--pds-text-muted)', marginBottom: 8 }}>
              {user.displayName || user.username}
            </div>
          )}
          <button onClick={handleLogout} style={{
            width: '100%', padding: '8px 12px', border: 'none', borderRadius: 'var(--pds-radius-sm)',
            background: 'var(--pds-danger-soft)', color: 'var(--pds-danger)', cursor: 'pointer',
            fontSize: 'var(--pds-text-small)', fontWeight: 500,
          }}>خروج</button>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
          position: 'absolute', left: -12, top: '50%', width: 24, height: 24, borderRadius: '50%',
          border: '1px solid var(--pds-border)', background: 'var(--pds-surface)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
        }}>
          {sidebarOpen ? '◀' : '▶'}
        </button>
      </aside>

      {/* Main content */}
      <main style={{
        flex: 1, marginRight: sidebarOpen ? 240 : 60,
        padding: 'var(--pds-space-6)', transition: 'margin-right var(--pds-transition-normal)',
      }}>
        <Outlet />
      </main>
    </div>
  );
}