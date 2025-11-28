import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Chatbot from './Chatbot';
import AlertNotifications from './AlertNotifications';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();
    let title = 'Dashboard';
    if (location.pathname === '/products') title = 'Products';
    if (location.pathname === '/clients') title = 'Clients';
    if (location.pathname === '/analytics') title = 'Analytics';

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 text-white flex-shrink-0">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title={title} />
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>

            <AlertNotifications />
            <Chatbot />
        </div>
    );
};

export default Layout;
