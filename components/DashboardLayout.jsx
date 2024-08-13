import React, { useState, useEffect } from 'react';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                <nav>
                    <ul>
                        <li className={currentPath === '/admin' ? 'active' : ''}>
                            <a href="/admin">Blogs</a>
                        </li>
                        <li className={currentPath === '/admin/products' ? 'active' : ''}>
                            <a href="/admin/products">Products</a>
                        </li>
                        <li className={currentPath === '/admin/contacts' ? 'active' : ''}>
                            <a href="/admin/contacts">Contacts</a>
                        </li>
                    </ul>
                </nav>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </aside>
            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;