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

// Department API calls
export const getDepartments = async () => {
    try {
        const response = await api.get('/departments');
        return response.data;
    } catch (error) {
        console.error('Get departments error:', error);
        throw error;
    }
};

export const createDepartment = async (departmentData) => {
    try {
        const response = await api.post('/departments', departmentData);
        return response.data;
    } catch (error) {
        console.error('Create department error:', error);
        throw error;
    }
};

export const updateDepartment = async (departmentCode, departmentData) => {
    try {
        const response = await api.put(`/departments/${departmentCode}`, departmentData);
        return response.data;
    } catch (error) {
        console.error('Update department error:', error);
        throw error;
    }
};

export const deleteDepartment = async (departmentCode) => {
    try {
        const response = await api.delete(`/departments/${departmentCode}`);
        return response.data;
    } catch (error) {
        console.error('Delete department error:', error);
        throw error;
    }
};

// Employee API calls
export const getEmployees = async () => {
    try {
        const response = await api.get('/employees');
        return response.data;
    } catch (error) {
        console.error('Get employees error:', error);
        throw error;
    }
};

export const createEmployee = async (employeeData) => {
    try {
        const response = await api.post('/employees', employeeData);
        return response.data;
    } catch (error) {
        console.error('Create employee error:', error);
        throw error;
    }
};

export const updateEmployee = async (employeeNumber, employeeData) => {
    try {
        const response = await api.put(`/employees/${employeeNumber}`, employeeData);
        return response.data;
    } catch (error) {
        console.error('Update employee error:', error);
        throw error;
    }
};

export const deleteEmployee = async (employeeNumber) => {
    try {
        const response = await api.delete(`/employees/${employeeNumber}`);
        return response.data;
    } catch (error) {
        console.error('Delete employee error:', error);
        throw error;
    }
};

// Salary API calls
export const getSalaries = async () => {
    try {
        const response = await api.get('/salaries');
        return response.data;
    } catch (error) {
        console.error('Get salaries error:', error);
        throw error;
    }
};

export const createSalary = async (salaryData) => {
    try {
        const response = await api.post('/salaries', salaryData);
        return response.data;
    } catch (error) {
        console.error('Create salary error:', error);
        throw error;
    }
};

export const updateSalary = async (salaryId, salaryData) => {
    try {
        const response = await api.put(`/salaries/${salaryId}`, salaryData);
        return response.data;
    } catch (error) {
        console.error('Update salary error:', error);
        throw error;
    }
};

export const deleteSalary = async (salaryId) => {
    try {
        const response = await api.delete(`/salaries/${salaryId}`);
        return response.data;
    } catch (error) {
        console.error('Delete salary error:', error);
        throw error;
    }
};

// Report API calls
export const getMonthlyReport = async () => {
    try {
        const response = await api.get('/reports/monthly');
        return response.data;
    } catch (error) {
        console.error('Get monthly report error:', error);
        throw error;
    }
};

export default api; 