import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

export default api;
