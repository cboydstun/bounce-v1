export { Page }

import React, { useState } from 'react';

import './rsvp.css';

function Page() {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        adultsAttending: 0,
        childrenAttending: 0
    });
    const [message, setMessage] = useState('');

    const API_URL = `${import.meta.env.VITE_SERVER_URL}/api/v1/rsvp`;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'adultsAttending' || name === 'childrenAttending' ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            await response.json();
            setMessage('RSVP submitted successfully!');
            setFormData({
                name: '',
                phoneNumber: '',
                email: '',
                adultsAttending: 0,
                childrenAttending: 0
            });
        } catch (error) {
            setMessage('Error submitting RSVP. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="rsvp-form-component">
            <div className="rsvp-form-container">
                <h2>RSVP Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="adultsAttending">Number of Adults:</label>
                        <input
                            type="number"
                            id="adultsAttending"
                            name="adultsAttending"
                            value={formData.adultsAttending}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="childrenAttending">Number of Children:</label>
                        <input
                            type="number"
                            id="childrenAttending"
                            name="childrenAttending"
                            value={formData.childrenAttending}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>
                    <button type="submit">Submit RSVP</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};