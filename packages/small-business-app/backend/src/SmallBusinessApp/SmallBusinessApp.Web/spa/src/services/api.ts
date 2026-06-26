import axios from 'axios';

const API_BASE = '/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// --- Core API ---
export const coreApi = {
  getDashboardSummary: () => apiClient.get('/core/dashboard/summary'),
  getUsers: () => apiClient.get('/users'),
  createUser: (data: any) => apiClient.post('/users', data),
  updateUser: (id: string, data: any) => apiClient.patch(`/users/${id}`, data),
  deleteUser: (id: string) => apiClient.delete(`/users/${id}`),
  getOrgCharts: () => apiClient.get('/org/charts'),
  getOrgNodes: () => apiClient.get('/org/nodes'),
  createOrgNode: (data: any) => apiClient.post('/org/nodes', data),
  getPositions: () => apiClient.get('/positions'),
  createPosition: (data: any) => apiClient.post('/positions', data),
  getProjects: () => apiClient.get('/projects'),
  createProject: (data: any) => apiClient.post('/projects', data),
  getHealth: () => apiClient.get('/health'),
};

// --- HR API ---
export const hrApi = {
  getPersonnel: () => apiClient.get('/hr/personnel'),
  getPersonnelById: (id: string) => apiClient.get(`/hr/personnel/${id}`),
  createPersonnel: (data: any) => apiClient.post('/hr/personnel', data),
  getContracts: () => apiClient.get('/hr/contracts'),
  getContractById: (id: string) => apiClient.get(`/hr/contracts/${id}`),
  createContract: (data: any) => apiClient.post('/hr/contracts', data),
  createAmendment: (id: string, data: any) => apiClient.post(`/hr/contracts/${id}/amendments`, data),
  getInsurance: () => apiClient.get('/hr/insurance'),
  createInsurance: (data: any) => apiClient.post('/hr/insurance', data),
  getDocuments: () => apiClient.get('/hr/documents'),
  getDependents: () => apiClient.get('/hr/dependents'),
};

// --- Attendance API ---
export const attendanceApi = {
  getRawTraffic: (from?: string, to?: string) => apiClient.get('/attendance/raw-traffic', { params: { from, to } }),
  getTransactions: () => apiClient.get('/attendance/transactions'),
  getDailySummary: (date: string) => apiClient.get('/attendance/daily-summary', { params: { date } }),
  getMonthlySummary: (year: number, month: number) => apiClient.get('/attendance/monthly-summary', { params: { year, month } }),
  getShifts: () => apiClient.get('/attendance/shifts'),
  createShift: (data: any) => apiClient.post('/attendance/shifts', data),
  getLeaves: () => apiClient.get('/attendance/leaves'),
  approveLeave: (id: string) => apiClient.post(`/attendance/leaves/${id}/approve`),
  rejectLeave: (id: string) => apiClient.post(`/attendance/leaves/${id}/reject`),
  getMissions: () => apiClient.get('/attendance/missions'),
  getOvertime: () => apiClient.get('/attendance/overtime'),
};

// --- Payroll API ---
export const payrollApi = {
  getPeriods: () => apiClient.get('/payroll/periods'),
  createPeriod: (data: any) => apiClient.post('/payroll/periods', data),
  getRuns: () => apiClient.get('/payroll/runs'),
  getResults: () => apiClient.get('/payroll/results'),
  getPayslips: () => apiClient.get('/payroll/payslips'),
  publishPayslip: (id: string) => apiClient.post(`/payroll/payslips/${id}/publish`),
};

// --- Reports API ---
export const reportsApi = {
  getCatalog: () => apiClient.get('/reports/catalog'),
  getReport: (id: string) => apiClient.get(`/reports/${id}`),
  runReport: (id: string) => apiClient.post(`/reports/${id}/run`),
  getExecutions: () => apiClient.get('/reports/executions'),
};

export default apiClient;