import api from './api';

export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const addProduct = async (product) => {
    const response = await api.post('/products', product);
    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};

export const getDashboardStats = async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
};

export const getTransactions = async () => {
    const response = await api.get('/transactions');
    return response.data;
};

export const createTransaction = async (transaction) => {
    const response = await api.post('/transactions', transaction);
    return response.data;
};

export const getAlerts = async () => {
    const response = await api.get('/alerts');
    return response.data;
};

export const markAlertRead = async (alertId) => {
    const response = await api.put(`/alerts/${alertId}/read`);
    return response.data;
};
