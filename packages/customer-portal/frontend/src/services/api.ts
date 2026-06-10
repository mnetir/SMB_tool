import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message?.[0] || error.message || 'خطای سرور';
    return Promise.reject(new Error(message));
  },
);

// Products
export const productsApi = {
  list: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (data: any) => api.post('/products', data),
  update: (id: string, data: any) => api.patch(`/products/${id}`, data),
  remove: (id: string) => api.delete(`/products/${id}`),
};

// Customers
export const customersApi = {
  list: (params?: any) => api.get('/customers', { params }),
  getById: (id: string) => api.get(`/customers/${id}`),
  create: (data: any) => api.post('/customers', data),
  update: (id: string, data: any) => api.patch(`/customers/${id}`, data),
  suspend: (id: string, reason?: string) => api.post(`/customers/${id}/suspend`, { reason }),
};

// Sales Plans
export const salesPlansApi = {
  list: () => api.get('/sales-plans'),
  getById: (id: string) => api.get(`/sales-plans/${id}`),
  create: (data: any) => api.post('/sales-plans', data),
  update: (id: string, data: any) => api.patch(`/sales-plans/${id}`, data),
  setLimits: (id: string, limits: any[]) => api.put(`/sales-plans/${id}/limits`, { limits }),
  setPermissions: (id: string, permissionIds: string[]) => api.put(`/sales-plans/${id}/permissions`, { permissionIds }),
};

// Subscriptions
export const subscriptionsApi = {
  list: (params?: any) => api.get('/subscriptions', { params }),
  getById: (id: string) => api.get(`/subscriptions/${id}`),
  create: (data: any) => api.post('/subscriptions', data),
  activate: (id: string) => api.post(`/subscriptions/${id}/activate`),
  suspend: (id: string) => api.post(`/subscriptions/${id}/suspend`),
  resume: (id: string) => api.post(`/subscriptions/${id}/resume`),
  cancel: (id: string) => api.post(`/subscriptions/${id}/cancel`),
};

// Invoices
export const invoicesApi = {
  list: (params?: any) => api.get('/invoices', { params }),
  getById: (id: string) => api.get(`/invoices/${id}`),
  create: (data: any) => api.post('/invoices', data),
  approve: (id: string) => api.post(`/invoices/${id}/approve`),
  reject: (id: string) => api.post(`/invoices/${id}/reject`),
};

// Payments
export const paymentsApi = {
  register: (invoiceId: string, data: any) => api.post(`/invoices/${invoiceId}/payments`, data),
  approve: (id: string) => api.post(`/payments/${id}/approve`),
};

// Licenses
export const licensesApi = {
  generate: (subscriptionId: string, data: any) => api.post(`/subscriptions/${subscriptionId}/license/generate`, data),
  getBySubscription: (subscriptionId: string) => api.get(`/subscriptions/${subscriptionId}/license`),
};

// Auth
export const authApi = {
  login: (username: string, password: string) => api.post('/auth/login', { username, password }),
};

// Audit Logs
export const auditApi = {
  query: (params?: any) => api.get('/audit-logs', { params }),
};

export default api;