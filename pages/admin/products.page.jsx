import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

export { Page };

function ProductsManagement() {
    return (
        <div>
            <h1>Products Management</h1>
            {/* Add your products management content here */}
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