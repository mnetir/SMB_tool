import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './store/ThemeContext';
import { AuthProvider } from './store/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProductsPage from './pages/products/ProductsPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import CustomersPage from './pages/customers/CustomersPage';
import CustomerDetailPage from './pages/customers/CustomerDetailPage';
import SalesPlansPage from './pages/sales/SalesPlansPage';
import PlanEditorPage from './pages/sales/PlanEditorPage';
import InvoicesPage from './pages/sales/InvoicesPage';
import InvoiceDetailPage from './pages/sales/InvoiceDetailPage';
import SubscriptionsPage from './pages/subscriptions/SubscriptionsPage';
import SubscriptionDetailPage from './pages/subscriptions/SubscriptionDetailPage';
import LicensePage from './pages/subscriptions/LicensePage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import PortalUsersPage from './pages/security/PortalUsersPage';
import AuditLogPage from './pages/reports/AuditLogPage';
import PortalLayout from './components/layout/PortalLayout';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <div dir="rtl">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/portal" element={<PortalLayout />}>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="products/create" element={<ProductDetailPage />} />
                  <Route path="products/:id" element={<ProductDetailPage />} />
                  <Route path="customers" element={<CustomersPage />} />
                  <Route path="customers/create" element={<CustomerDetailPage />} />
                  <Route path="customers/:id" element={<CustomerDetailPage />} />
                  <Route path="sales/plans" element={<SalesPlansPage />} />
                  <Route path="sales/plans/create" element={<PlanEditorPage />} />
                  <Route path="sales/plans/:id" element={<PlanEditorPage />} />
                  <Route path="sales/invoices" element={<InvoicesPage />} />
                  <Route path="sales/invoices/:id" element={<InvoiceDetailPage />} />
                  <Route path="subscriptions" element={<SubscriptionsPage />} />
                  <Route path="subscriptions/:id" element={<SubscriptionDetailPage />} />
                  <Route path="subscriptions/:id/license" element={<LicensePage />} />
                  <Route path="notifications" element={<NotificationsPage />} />
                  <Route path="security/users" element={<PortalUsersPage />} />
                  <Route path="reports/audit" element={<AuditLogPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/portal/dashboard" replace />} />
              </Routes>
            </div>
            <Toaster position="top-left" toastOptions={{ duration: 4000, style: { fontFamily: 'var(--pds-font-primary)', fontSize: '14px' } }} />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;