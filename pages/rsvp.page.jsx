export { Page }

import React, { useState } from 'react';

import './rsvp.css';

const DRY_XL = "../satx-bounce-house-rental-san-antonio-dry-xl.jpg"
const DRY_LARGE = "../satx-bounce-house-rental-san-antonio-dry-large.jpg"
const DRY_MED = "../satx-bounce-house-rental-san-antonio-dry-med.jpg"
const WET_LIME = "../satx-bounce-house-rental-san-antonio-wet-xl.jpg"
const JUNIOR_BOUNCE = "../satx-bounce-house-rental-san-antonio-junior-bounce.jpg"

function Page() {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        adultsAttending: 0,
        childrenAttending: 0
    });

    const [message, setMessage] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        DRY_XL,
        DRY_LARGE,
        DRY_MED,
        WET_LIME,
        JUNIOR_BOUNCE
    ];

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

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
                <h2>Happy Birthday Ben and Austin!</h2>
                <div className="image-slider">
                    <button onClick={prevImage} aria-label="Previous image">&lt;</button>
                    <img src={images[currentImageIndex]} alt={`Event preview ${currentImageIndex + 1}`} />
                    <button onClick={nextImage} aria-label="Next image">&gt;</button>
                </div>

                <div className="event-details">
                    <h3>Event Information</h3>
                    <ul>
                        <li><strong>Where:</strong> Central Park, New York City</li>
                        <li><strong>When:</strong> Saturday, August 15, 2024</li>
                        <li><strong>Time:</strong> 2:00 PM - 6:00 PM</li>
                        <li><strong>What to Bring:</strong> A dish to share, lawn chairs or blankets</li>
                    </ul>
                </div>
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
                    <div className="inline-inputs">
                        <div className="form-control">
                            <label htmlFor="adultsAttending">How many <br /> Adults?</label>
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
                            <label htmlFor="childrenAttending">How many <br /> kids?</label>
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
                    </div>
                    <button type="submit">Submit RSVP</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};