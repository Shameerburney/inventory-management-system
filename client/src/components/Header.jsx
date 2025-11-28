import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../services/authService';

const Header = ({ title }) => {
    const navigate = useNavigate();
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                    {user ? user.name : 'User'}
                </span>
                <button
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
