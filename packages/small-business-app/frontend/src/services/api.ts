import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

// Users
export const userApi = {
  list: () => api.get('/users'),
  create: (data: any) => api.post('/users', data),
  update: (id: string, data: any) => api.patch(`/users/${id}`, data),
  remove: (id: string) => api.delete(`/users/${id}`),
};

// Organization
export const orgApi = {
  listCharts: () => api.get('/org/charts'),
  createNode: (data: any) => api.post('/org/nodes', data),
};

// Projects
export const projectApi = {
  list: () => api.get('/projects'),
  create: (data: any) => api.post('/projects', data),
};

// Positions
export const positionApi = {
  list: () => api.get('/positions'),
  create: (data: any) => api.post('/positions', data),
};

// HR Personnel
export const personnelApi = {
  list: () => api.get('/hr/personnel'),
  getProfile: (id: string) => api.get(`/hr/personnel/${id}/profile`),
  create: (data: any) => api.post('/hr/personnel', data),
};

// HR Contracts
export const contractApi = {
  list: () => api.get('/hr/contracts'),
  create: (data: any) => api.post('/hr/contracts', data),
  amend: (id: string, data: any) => api.post(`/hr/contracts/${id}/amend`, data),
  renew: (id: string, data: any) => api.post(`/hr/contracts/${id}/renew`, data),
};

// Health
export const healthApi = {
  check: () => api.get('/health'),
};

export default api;