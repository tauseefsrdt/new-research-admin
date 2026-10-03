import axios from 'axios';
import { showErrorToast } from '../utils/toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized, clear local storage and redirect to login if not already there
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        showErrorToast('Session expired. Please log in again.', { toastId: 'session-expired' });
        window.location.href = '/login';
      }
    } else if (error.code === 'ERR_NETWORK' || !error.response) {
      showErrorToast('Network error: Unable to connect to backend server.', { toastId: 'network-error' });
    }
    return Promise.reject(error);
  }
);

export default api;
