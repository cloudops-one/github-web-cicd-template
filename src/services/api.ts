import axios, {type AxiosResponse } from 'axios';
import type {ApiError} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    console.warn('VITE_API_BASE_URL is not set. Using default: http://localhost:8080');
}

const api = axios.create({
    baseURL: API_BASE_URL || 'http://localhost:8080',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message,
            code: error.code,
            status: error.response?.status,
        };
        return Promise.reject(apiError);
    }
);

export const apiService = {
    // Fetch example data
    getExample: async (): Promise<string> => {
        try {
            const response: AxiosResponse<string> = await api.get('/example');
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },

};

export default api;