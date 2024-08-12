import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

export { Page };

function LeadsManagement() {
    return (
        <div>
            <h1>Leads Management</h1>
            {/* Add your leads management content here */}
        </div>
    );
}

function Page() {
    return (
        <DashboardLayout>
            <LeadsManagement />
        </DashboardLayout>
    );
}