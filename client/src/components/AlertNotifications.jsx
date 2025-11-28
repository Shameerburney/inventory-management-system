import React, { useState, useEffect } from 'react';
import { getAlerts, markAlertRead } from '../services/productService';

const AlertNotifications = () => {
    const [alerts, setAlerts] = useState([]);
    const [showAlerts, setShowAlerts] = useState(false);

    useEffect(() => {
        fetchAlerts();
        // Poll for new alerts every 30 seconds
        const interval = setInterval(fetchAlerts, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchAlerts = async () => {
        try {
            const data = await getAlerts();
            setAlerts(data);
        } catch (error) {
            console.error('Error fetching alerts:', error);
        }
    };

    const handleMarkRead = async (alertId) => {
        try {
            await markAlertRead(alertId);
            fetchAlerts();
        } catch (error) {
            console.error('Error marking alert as read:', error);
        }
    };

    if (alerts.length === 0) return null;

    return (
        <div className="fixed top-20 right-6 z-50">
            {/* Alert Bell Icon */}
            <button
                onClick={() => setShowAlerts(!showAlerts)}
                className="relative bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
                {alerts.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {alerts.length}
                    </span>
                )}
            </button>

            {/* Alerts Dropdown */}
            {showAlerts && (
                <div className="absolute top-14 right-0 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-gray-200 bg-red-50">
                        <h3 className="font-bold text-gray-900">Low Stock Alerts</h3>
                        <p className="text-xs text-gray-600">{alerts.length} unread alert{alerts.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {alerts.map((alert) => (
                            <div key={alert.id} className="p-4 hover:bg-gray-50 transition">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            {alert.alert_type === 'out_of_stock' ? (
                                                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded">
                                                    OUT OF STOCK
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">
                                                    LOW STOCK
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-900 font-medium">{alert.message}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(alert.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleMarkRead(alert.id)}
                                        className="ml-2 text-blue-600 hover:text-blue-800 text-xs font-medium"
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlertNotifications;
