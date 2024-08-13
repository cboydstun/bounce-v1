import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

export { Page };

function ProductsManagement() {
    return (
        <div>
            <h1>Products Management</h1>
            <p>UNDER CONSTRUCTION</p>
        </div>
    );
}

function Page() {
    return (
        <DashboardLayout>
            <ProductsManagement />
        </DashboardLayout>
    );
}