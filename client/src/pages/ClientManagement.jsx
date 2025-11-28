import React, { useState, useEffect } from 'react';
import { register, getUsers, deleteUser } from '../services/authService';

const ClientManagement = () => {
    const [clients, setClients] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        company: '',
        role: 'client'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        try {
            const users = await getUsers();
            const clientUsers = users.filter(u => u.role === 'client');
            setClients(clientUsers);
        } catch (error) {
            console.error('Error loading clients:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await register(formData);
            setFormData({ name: '', email: '', password: '', company: '', role: 'client' });
            setShowForm(false);
            loadClients();
        } catch (error) {
            console.error('Error creating client:', error);
            alert('Failed to create client');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (clientId) => {
        if (confirm('Are you sure you want to delete this client?')) {
            try {
                await deleteUser(clientId);
                loadClients();
            } catch (error) {
                console.error('Error deleting client:', error);
            }
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
                    <p className="text-gray-500 mt-1">Create and manage client accounts</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-md transition"
                >
                    {showForm ? 'Cancel' : '+ New Client'}
                </button>
            </div>

            {/* Create Client Form */}
            {showForm && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Client Account</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Client Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                            <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition disabled:opacity-50"
                            >
                                {loading ? 'Creating...' : 'Create Client Account'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Clients List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Client Name</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Company</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Client ID</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {clients.map((client) => (
                            <tr key={client.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{client.name}</td>
                                <td className="px-6 py-4 text-gray-600">{client.company}</td>
                                <td className="px-6 py-4 text-gray-600">{client.email}</td>
                                <td className="px-6 py-4">
                                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{client.id}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleDelete(client.id)}
                                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {clients.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                    No clients yet. Create your first client account above.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientManagement;
