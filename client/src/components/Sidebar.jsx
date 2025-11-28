import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isAdmin } from '../services/authService';

const Sidebar = () => {
    const location = useLocation();
    const admin = isAdmin();

    const adminNavItems = [
        { name: 'Dashboard', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Clients', path: '/clients' },
        { name: 'Analytics', path: '/analytics' },
    ];

    const clientNavItems = [
        { name: 'My Stock', path: '/' },
    ];

    const navItems = admin ? adminNavItems : clientNavItems;

    return (
        <div className="h-full flex flex-col bg-slate-900">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-blue-400">TechStock</h1>
                <p className="text-xs text-gray-400 mt-1">
                    {admin ? 'Admin Panel' : 'Client Portal'}
                </p>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`block px-4 py-3 rounded-lg transition font-medium ${location.pathname === item.path
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
