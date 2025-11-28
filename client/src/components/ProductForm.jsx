import React, { useState, useEffect } from 'react';
import { isAdmin, getUsers } from '../services/authService';

const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState(product || {
        name: '',
        brand: '',
        model: '',
        base_price: '',
        stock: '',
        image_url: '',
        client_id: ''
    });
    const [clients, setClients] = useState([]);

    const admin = isAdmin();

    useEffect(() => {
        if (admin) {
            loadClients();
        }
    }, [admin]);

    const loadClients = async () => {
        try {
            const users = await getUsers();
            const clientUsers = users.filter(u => u.role === 'client');
            setClients(clientUsers);
        } catch (error) {
            console.error('Error loading clients:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert to numbers
        const dataToSave = {
            ...formData,
            base_price: parseFloat(formData.base_price),
            stock: parseInt(formData.stock),
            client_id: formData.client_id || null
        };
        onSave(dataToSave);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold mb-4">{product ? 'Edit Product' : 'Add New Product'}</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={!admin}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Brand *</label>
                    <input
                        type="text"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={!admin}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Model *</label>
                    <input
                        type="text"
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={!admin}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($) *</label>
                    <input
                        type="number"
                        step="0.01"
                        value={formData.base_price}
                        onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={!admin}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity *</label>
                    <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={!admin}
                    />
                </div>
                {admin && (
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Assign to Client (Optional)
                        </label>
                        <select
                            value={formData.client_id || ''}
                            onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">No Client (Admin Only)</option>
                            {clients.map((client) => (
                                <option key={client.id} value={client.id}>
                                    {client.name} - {client.company || 'No Company'}
                                </option>
                            ))}
                        </select>
                        {clients.length === 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                                No clients available. Create a client first in the Clients menu.
                            </p>
                        )}
                    </div>
                )}
            </div>
            {admin && (
                <div className="flex gap-3 mt-6">
                    <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                        Save Product
                    </button>
                    <button type="button" onClick={onCancel} className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold">
                        Cancel
                    </button>
                </div>
            )}
        </form>
    );
};

export default ProductForm;
