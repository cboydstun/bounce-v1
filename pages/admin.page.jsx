import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AdminPanel from '../components/AdminPanel';

export { Page };

function Page() {
    return (
        <DashboardLayout>
            <AdminPanel />
        </DashboardLayout>
    );
}

// Add this export to handle authentication on the server-side
export function onBeforeRender(pageContext) {
    const { urlPathname } = pageContext;
    if (urlPathname.startsWith('/admin')) {
        return {
            pageContext: {
                // This ensures that the page will be rendered on the client-side
                // where we can check for authentication
                isClientSideRendered: true
            }
        };
    }
}