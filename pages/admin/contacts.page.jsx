import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import ErrorBoundary from '../../components/ErrorBoundary';
import ContactModal from '../../components/ContactModal';

import './contacts.css';

function ContactManagement() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'partyDate', direction: 'desc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(50);
    const [selectedContact, setSelectedContact] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/contacts`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Failed to fetch contacts');
                const data = await response.json();
                setContacts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    useEffect(() => {
        const sortedContacts = [...contacts].sort((a, b) => {
            if (sortConfig.key === 'partyDate') {
                return sortConfig.direction === 'desc'
                    ? new Date(b.partyDate) - new Date(a.partyDate)
                    : new Date(a.partyDate) - new Date(b.partyDate);
            }
            return 0;
        });
        setContacts(sortedContacts);
    }, [sortConfig]);

    const handleSort = (key) => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'desc' ? 'asc' : 'desc'
        }));
    };

    const handleEntriesPerPageChange = (event) => {
        setEntriesPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to the first page
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowClick = async (contactId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/contacts/${contactId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch contact');
            const data = await response.json();
            setSelectedContact(data);
            setModalOpen(true);
        } catch (error) {
            console.error('Error fetching contact:', error);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedContact(null);
    };

    const handleContactUpdate = (updatedContact) => {
        setContacts(contacts.map(contact => contact._id === updatedContact._id ? updatedContact : contact));
    };

    const totalEntries = contacts.length;
    const totalPages = Math.ceil(totalEntries / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const currentContacts = contacts.slice(startIndex, startIndex + entriesPerPage);

    if (loading) return <p>Loading contacts...</p>;
    if (error) return <p>Error loading contacts: {error}</p>;

    return (
        <div className="contact-table-container">
            <h2>Contacts</h2>
            <div className="pagination-controls">
                <label htmlFor="entriesPerPage">Entries per page:</label>
                <select id="entriesPerPage" value={entriesPerPage} onChange={handleEntriesPerPageChange}>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`page-button ${page === currentPage ? 'active' : ''}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
            <table className="contact-table">
                <thead>
                    <tr>
                        {['partyDate', 'bouncer', 'email', 'partyZipCode', 'phone', 'tablesChairs', 'generator', 'popcornMachine', 'cottonCandyMachine', 'snowConeMachine', 'overnight', 'confirmed', 'message'].map(field => (
                            <th key={field} onClick={() => handleSort(field)}>
                                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                {sortConfig.key === field && (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentContacts.map((contact) => {
                        const partyDate = new Date(contact.partyDate);
                        partyDate.setDate(partyDate.getDate() + 1); // Add one day

                        return (
                            <tr key={contact._id} onClick={() => handleRowClick(contact._id)}>
                                <td>{partyDate.toLocaleDateString()}</td>
                                <td>{contact.bouncer}</td>
                                <td>{contact.email}</td>
                                <td>{contact.partyZipCode}</td>
                                <td>{contact.phone || 'N/A'}</td>
                                <td>{contact.tablesChairs ? '✅' : '❌'}</td>
                                <td>{contact.generator ? '✅' : '❌'}</td>
                                <td>{contact.popcornMachine ? '✅' : '❌'}</td>
                                <td>{contact.cottonCandyMachine ? '✅' : '❌'}</td>
                                <td>{contact.snowConeMachine ? '✅' : '❌'}</td>
                                <td>{contact.overnight ? '✅' : '❌'}</td>
                                <td>{contact.confirmed ? '✅' : '❌'}</td>
                                <td>{contact.message || 'N/A'}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {selectedContact && (
                <ContactModal
                    isOpen={modalOpen}
                    onClose={handleModalClose}
                    contact={selectedContact}
                    onUpdate={handleContactUpdate}
                />
            )}
        </div>
    );
}

function Page() {
    return (
        <DashboardLayout>
            <ErrorBoundary>
                <ContactManagement />
            </ErrorBoundary>
        </DashboardLayout>
    );
}

export { Page };
