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
    const [isCreatingNew, setIsCreatingNew] = useState(false);

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

    const sortedContacts = () => {
        return [...contacts].sort((a, b) => {
            let aKey = a[sortConfig.key];
            let bKey = b[sortConfig.key];

            if (sortConfig.key === 'partyDate') {
                aKey = new Date(aKey);
                bKey = new Date(bKey);
            }

            if (aKey < bKey) return sortConfig.direction === 'desc' ? 1 : -1;
            if (aKey > bKey) return sortConfig.direction === 'desc' ? -1 : 1;
            return 0;
        });
    };

    const handleSort = (key) => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'desc' ? 'asc' : 'desc'
        }));
    };

    const handleEntriesPerPageChange = (event) => {
        setEntriesPerPage(Number(event.target.value));
        setCurrentPage(1);
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
            setIsCreatingNew(false);
            setModalOpen(true);
        } catch (error) {
            console.error('Error fetching contact:', error);
        }
    };

    const handleCreateNewClick = () => {
        setSelectedContact(null);
        setIsCreatingNew(true);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedContact(null);
        setIsCreatingNew(false);
    };

    const handleContactUpdate = (updatedContact) => {
        if (isCreatingNew) {
            setContacts([...contacts, updatedContact]);
        } else {
            setContacts(contacts.map(contact => contact._id === updatedContact._id ? updatedContact : contact));
        }
    };

    const handleDelete = async (contactId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/contacts/${contactId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to delete contact');
            setContacts(contacts.filter(contact => contact._id !== contactId));
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const totalEntries = contacts.length;
    const totalPages = Math.ceil(totalEntries / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const currentContacts = sortedContacts().slice(startIndex, startIndex + entriesPerPage);

    if (loading) return <p>Loading contacts...</p>;
    if (error) return <p>Error loading contacts: {error}</p>;

    return (
        <div className="contact-table-container">
            <h2>Contacts</h2>
            <div className="control-container">
                <button className="create-contact-button" onClick={handleCreateNewClick}>Create New Contact</button>
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
            </div>
            <table className="contact-table">
                <thead>
                    <tr>
                        <th>Delete</th>
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
                        partyDate.setDate(partyDate.getDate() + 1);

                        return (
                            <tr key={contact._id} onClick={() => handleRowClick(contact._id)}>
                                <td>
                                    <button
                                        className="delete-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(contact._id);
                                        }}
                                    >
                                        🗑️
                                    </button>
                                </td>
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

            {/* Contact Modal */}
            {modalOpen && (
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
