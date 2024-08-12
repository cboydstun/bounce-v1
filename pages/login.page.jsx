// pages/login.page.jsx
import React from 'react';
import Login from '../components/Login';

export { Page };

function Page() {
    return <Login onLogin={() => window.location.href = '/admin'} />;
}