import api from './api';

export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { access_token, user } = response.data;

    const sessionUser = {
        ...user,
        token: access_token
    };

    localStorage.setItem('user', JSON.stringify(sessionUser));
    return sessionUser;
};

export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('user');
};

export const isAdmin = () => {
    const user = getCurrentUser();
    return user && user.role === 'admin';
};

export const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
};
