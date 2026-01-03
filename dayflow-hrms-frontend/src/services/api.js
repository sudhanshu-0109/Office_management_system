import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a generic request interceptor to attach token if present
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authService = {
    register: async (userData) => {
        const response = await api.post('auth/register/', userData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    login: async (email, password) => {
        const response = await api.post('auth/login/', { email, password });
        if (response.data.access) {
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            // Decode token or user info here if needed, or fetch profile
        }
        return response.data;
    },
    getProfile: async () => {
        const response = await api.get('auth/profile/');
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
};

export const employeeService = {
    getAll: async () => {
        const response = await api.get('employees/list/');
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('employees/list/', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`employees/list/${id}/`, data);
        return response.data;
    },
    delete: async (id) => {
        await api.delete(`employees/list/${id}/`);
        return id;
    }
};

export default api;
