import React, { useState, useEffect } from 'react';
import './ContactModal.css'; // Create and style this CSS file accordingly

const ContactModal = ({ isOpen, onClose, contact, onUpdate }) => {
    const [formData, setFormData] = useState({ ...contact });

    useEffect(() => {
        setFormData({ ...contact });
    }, [contact]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/contacts/${contact._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error('Failed to update contact');
            const updatedContact = await response.json();
            onUpdate(updatedContact);
            onClose();
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    if (!isOpen) return null;

    // Format date to YYYY-MM-DD for input field
    const formattedPartyDate = formData.partyDate ? new Date(formData.partyDate).toISOString().split('T')[0] : '';
    console.log("// ContactModal.jsx date:", formattedPartyDate);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>✖</button>
                <h2>Update Contact</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Bouncer:
                        <input
                            type="text"
                            name="bouncer"
                            value={formData.bouncer || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Party Date:
                        <input
                            type="date"
                            name="partyDate"
                            value={formData.partyDate ? formData.partyDate.slice(0, 10) : ''}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Phone:
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Party Zip Code:
                        <input
                            type="text"
                            name="partyZipCode"
                            value={formData.partyZipCode || ''}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    {/* Checkbox grid */}
                    <div className="checkbox-grid">
                        <label>
                            Tables Chairs:
                            <input
                                type="checkbox"
                                name="tablesChairs"
                                checked={formData.tablesChairs || false}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Generator:
                            <input
                                type="checkbox"
                                name="generator"
                                checked={formData.generator || false}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Popcorn Machine:
                            <input
                                type="checkbox"
                                name="popcornMachine"
                                checked={formData.popcornMachine || false}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Cotton Candy Machine:
                            <input
                                type="checkbox"
                                name="cottonCandyMachine"
                                checked={formData.cottonCandyMachine || false}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Snow Cone Machine:
                            <input
                                type="checkbox"
                                name="snowConeMachine"
                                checked={formData.snowConeMachine || false}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Overnight:
                            <input
                                type="checkbox"
                                name="overnight"
                                checked={formData.overnight || false}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <label>
                        Message:
                        <textarea
                            name="message"
                            value={formData.message || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default ContactModal;
