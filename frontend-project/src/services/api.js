import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear token and redirect to login
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API calls
export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};

// Car API calls
export const getCars = async () => api.get('/cars');
export const createCar = async (data) => api.post('/cars', data);
export const updateCar = async (id, data) => api.put(`/cars/${id}`, data);
export const deleteCar = async (id) => api.delete(`/cars/${id}`);

// Service API calls
export const getServices = async () => api.get('/services');
export const createService = async (data) => api.post('/services', data);
export const updateService = async (id, data) => api.put(`/services/${id}`, data);
export const deleteService = async (id) => api.delete(`/services/${id}`);

// ServiceRecord API calls
export const getServiceRecords = async () => api.get('/servicerecords');
export const createServiceRecord = async (data) => api.post('/servicerecords', data);
export const updateServiceRecord = async (id, data) => api.put(`/servicerecords/${id}`, data);
export const deleteServiceRecord = async (id) => api.delete(`/servicerecords/${id}`);

// Payment API calls
export const getPayments = async () => api.get('/payments');
export const createPayment = async (data) => api.post('/payments', data);
export const updatePayment = async (id, data) => api.put(`/payments/${id}`, data);
export const deletePayment = async (id) => api.delete(`/payments/${id}`);

// Reports API calls
export const getDailyReport = async () => api.get('/reports/daily');

export default api; 