import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy-loaded page components for route-based code splitting
const DashboardPage = React.lazy(() => import('../pages/DashboardPage'));
const PersonnelListPage = React.lazy(() => import('../pages/hr/PersonnelListPage'));
const PersonnelCreatePage = React.lazy(() => import('../pages/hr/PersonnelCreatePage'));
const PersonnelDetailPage = React.lazy(() => import('../pages/hr/PersonnelDetailPage'));
const ContractsListPage = React.lazy(() => import('../pages/hr/ContractsListPage'));
const ContractCreatePage = React.lazy(() => import('../pages/hr/ContractCreatePage'));
const CompensationPage = React.lazy(() => import('../pages/hr/CompensationPage'));
const InsurancePage = React.lazy(() => import('../pages/hr/InsurancePage'));
const DocumentsPage = React.lazy(() => import('../pages/hr/DocumentsPage'));
const DependentsPage = React.lazy(() => import('../pages/hr/DependentsPage'));
const UsersListPage = React.lazy(() => import('../pages/core/UsersListPage'));
const UserCreatePage = React.lazy(() => import('../pages/core/UserCreatePage'));
const OrgChartPage = React.lazy(() => import('../pages/core/OrgChartPage'));
const PositionsPage = React.lazy(() => import('../pages/core/PositionsPage'));
const ProjectsPage = React.lazy(() => import('../pages/core/ProjectsPage'));
const CompanyProfilePage = React.lazy(() => import('../pages/core/CompanyProfilePage'));
const SettingsPage = React.lazy(() => import('../pages/core/SettingsPage'));
const RawTrafficPage = React.lazy(() => import('../pages/attendance/RawTrafficPage'));
const AttendanceTransactionsPage = React.lazy(() => import('../pages/attendance/AttendanceTransactionsPage'));
const DailySummaryPage = React.lazy(() => import('../pages/attendance/DailySummaryPage'));
const MonthlySummaryPage = React.lazy(() => import('../pages/attendance/MonthlySummaryPage'));
const ShiftsPage = React.lazy(() => import('../pages/attendance/ShiftsPage'));
const LeaveRequestsPage = React.lazy(() => import('../pages/attendance/LeaveRequestsPage'));
const MissionRequestsPage = React.lazy(() => import('../pages/attendance/MissionRequestsPage'));
const OvertimeRequestsPage = React.lazy(() => import('../pages/attendance/OvertimeRequestsPage'));
const AttendanceSettingsPage = React.lazy(() => import('../pages/attendance/AttendanceSettingsPage'));
const PayrollPeriodsPage = React.lazy(() => import('../pages/payroll/PayrollPeriodsPage'));
const PayrollPeriodCreatePage = React.lazy(() => import('../pages/payroll/PayrollPeriodCreatePage'));
const PayrollRunDetailPage = React.lazy(() => import('../pages/payroll/PayrollRunDetailPage'));
const PayrollResultsPage = React.lazy(() => import('../pages/payroll/PayrollResultsPage'));
const PayslipsPage = React.lazy(() => import('../pages/payroll/PayslipsPage'));
const PaymentsPage = React.lazy(() => import('../pages/payroll/PaymentsPage'));
const CorrectionsPage = React.lazy(() => import('../pages/payroll/CorrectionsPage'));
const ExportsPage = React.lazy(() => import('../pages/payroll/ExportsPage'));
const ReportCatalogPage = React.lazy(() => import('../pages/reports/ReportCatalogPage'));
const ReportExecutionPage = React.lazy(() => import('../pages/reports/ReportExecutionPage'));
const ReportResultsPage = React.lazy(() => import('../pages/reports/ReportResultsPage'));
const ScheduledReportsPage = React.lazy(() => import('../pages/reports/ScheduledReportsPage'));

const LoadingFallback: React.FC = () => (
  <div className="pds-loading-container">
    <div className="pds-spinner" />
    <span>در حال بارگذاری...</span>
  </div>
);

const AppRouter: React.FC = () => {
  return (
    <React.Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Core */}
        <Route path="/" element={<Navigate to="/core/dashboard" replace />} />
        <Route path="/core/dashboard" element={<DashboardPage />} />
        <Route path="/core/users" element={<UsersListPage />} />
        <Route path="/core/users/create" element={<UserCreatePage />} />
        <Route path="/core/users/:id/edit" element={<UserCreatePage />} />
        <Route path="/core/organization" element={<OrgChartPage />} />
        <Route path="/core/positions" element={<PositionsPage />} />
        <Route path="/core/projects" element={<ProjectsPage />} />
        <Route path="/core/company" element={<CompanyProfilePage />} />
        <Route path="/core/settings" element={<SettingsPage />} />

        {/* HR */}
        <Route path="/hr/personnel" element={<PersonnelListPage />} />
        <Route path="/hr/personnel/create" element={<PersonnelCreatePage />} />
        <Route path="/hr/personnel/:id" element={<PersonnelDetailPage />} />
        <Route path="/hr/personnel/:id/edit" element={<PersonnelDetailPage />} />
        <Route path="/hr/contracts" element={<ContractsListPage />} />
        <Route path="/hr/contracts/create" element={<ContractCreatePage />} />
        <Route path="/hr/contracts/:id/edit" element={<ContractCreatePage />} />
        <Route path="/hr/contracts/:id/amend" element={<ContractCreatePage />} />
        <Route path="/hr/compensation" element={<CompensationPage />} />
        <Route path="/hr/insurance" element={<InsurancePage />} />
        <Route path="/hr/documents" element={<DocumentsPage />} />
        <Route path="/hr/dependents" element={<DependentsPage />} />

        {/* Attendance */}
        <Route path="/attendance/raw-traffic" element={<RawTrafficPage />} />
        <Route path="/attendance/transactions" element={<AttendanceTransactionsPage />} />
        <Route path="/attendance/daily-summary" element={<DailySummaryPage />} />
        <Route path="/attendance/monthly-summary" element={<MonthlySummaryPage />} />
        <Route path="/attendance/shifts" element={<ShiftsPage />} />
        <Route path="/attendance/leaves" element={<LeaveRequestsPage />} />
        <Route path="/attendance/missions" element={<MissionRequestsPage />} />
        <Route path="/attendance/overtime" element={<OvertimeRequestsPage />} />
        <Route path="/attendance/settings" element={<AttendanceSettingsPage />} />

        {/* Payroll */}
        <Route path="/payroll/periods" element={<PayrollPeriodsPage />} />
        <Route path="/payroll/periods/create" element={<PayrollPeriodCreatePage />} />
        <Route path="/payroll/periods/:id/run" element={<PayrollRunDetailPage />} />
        <Route path="/payroll/results" element={<PayrollResultsPage />} />
        <Route path="/payroll/payslips" element={<PayslipsPage />} />
        <Route path="/payroll/payments" element={<PaymentsPage />} />
        <Route path="/payroll/corrections" element={<CorrectionsPage />} />
        <Route path="/payroll/exports" element={<ExportsPage />} />

        {/* Reports */}
        <Route path="/reports/catalog" element={<ReportCatalogPage />} />
        <Route path="/reports/:id/run" element={<ReportExecutionPage />} />
        <Route path="/reports/results/:id" element={<ReportResultsPage />} />
        <Route path="/reports/schedules" element={<ScheduledReportsPage />} />

        {/* 404 */}
        <Route path="*" element={
          <div className="pds-error-state">
            <h2>صفحه مورد نظر یافت نشد</h2>
            <p>مسیر وارد شده معتبر نمی‌باشد.</p>
          </div>
        } />
      </Routes>
    </React.Suspense>
  );
};

export default AppRouter;