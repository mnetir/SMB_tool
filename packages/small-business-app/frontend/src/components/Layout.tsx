import { Outlet, NavLink } from 'react-router-dom';

const menuItems = [
  { path: '/dashboard', label: 'داشبورد', icon: '📊' },
  { path: '/users', label: 'کاربران', icon: '👥' },
  { path: '/hr/personnel', label: 'پرسنل', icon: '👤' },
  { path: '/hr/contracts', label: 'قراردادها', icon: '📋' },
];

export function Layout() {
  return (
    <div className="pds-portal-layout" style={{
      display: 'grid',
      direction: 'rtl',
      gridTemplateColumns: '280px 1fr',
      gridTemplateRows: '64px 1fr',
      gridTemplateAreas: '"header header" "sidebar content"',
      minHeight: '100vh',
    }}>
      {/* Header */}
      <header style={{
        gridArea: 'header',
        background: 'var(--pds-header-bg)',
        borderBottom: '1px solid var(--pds-border)',
        boxShadow: 'var(--pds-shadow-sm)',
        padding: '0 var(--pds-space-6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 'var(--pds-z-sticky)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--pds-space-3)' }}>
          <span style={{ fontSize: 'var(--pds-text-h3)', fontWeight: 700, color: 'var(--pds-primary)' }}>
            پیشگامان
          </span>
        </div>
        <div style={{ fontSize: 'var(--pds-text-small)', color: 'var(--pds-text-muted)' }}>
          سامانه مدیریت منابع انسانی
        </div>
      </header>

      {/* Sidebar */}
      <aside style={{
        gridArea: 'sidebar',
        background: 'var(--pds-sidebar-bg)',
        borderLeft: '1px solid var(--pds-border)',
        padding: 'var(--pds-space-4) 0',
        position: 'sticky',
        top: '64px',
        height: 'calc(100vh - 64px)',
        overflowY: 'auto',
      }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--pds-space-3)',
                padding: '12px var(--pds-space-5)',
                textDecoration: 'none',
                color: isActive ? 'var(--pds-primary)' : 'var(--pds-text-secondary)',
                background: isActive ? 'var(--pds-primary-soft)' : 'transparent',
                borderRight: isActive ? '3px solid var(--pds-primary)' : '3px solid transparent',
                fontSize: 'var(--pds-text-body)',
                fontWeight: isActive ? 600 : 400,
                transition: 'all var(--pds-transition-fast)',
              })}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main style={{
        gridArea: 'content',
        padding: 'var(--pds-space-6)',
        overflowY: 'auto',
        background: 'var(--pds-bg)',
      }}>
        <Outlet />
      </main>
    </div>
  );
}