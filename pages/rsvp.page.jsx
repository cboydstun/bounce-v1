export { Page }

import React, { useState, useEffect } from 'react';

import './rsvp.css';

const BEACH = "../beach.jpg"
const SPLASH_PAD = "../splash_pad.jpg"
const HAIRCUTS = "../haircuts.jpg"
const CARRIED = "../carried.jpg"

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
        BEACH,
        SPLASH_PAD,
        HAIRCUTS,
        CARRIED
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [images.length]);

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
                <h2 className='page-title'>Happy Birthday Ben and Austin!</h2>
                <div className="image-slider">
                    <button onClick={prevImage} aria-label="Previous image">&lt;</button>
                    <img src={images[currentImageIndex]} alt={`Event preview ${currentImageIndex + 1}`} />
                    <button onClick={nextImage} aria-label="Next image">&gt;</button>
                </div>

                <div className="event-details">
                    <h3>Event Information</h3>
                    <ul>
                        <li><strong>Where:</strong>Friesenhahn Park, San Antonio, TX</li>
                        <li><strong>Address:</strong><a href='https://maps.app.goo.gl/ETjhEk8HXgrT1Rj6A'>15701 O'Connor Rd, San Antonio, TX 78247</a></li>
                        <li><strong>When:</strong>Sunday, July 14th, 2024</li>
                        <li><strong>Time:</strong>From 3:00 PM to 7:00 PM</li>
                        <li><strong>Provided:</strong> Snacks, drinks, and bounce houses!</li>
                        <li><strong>What to Bring:</strong>Gifts for the boys and extra seating are <em>*optional*</em>.</li>
                    </ul>
                    <div className="wishlists">
                        <p>If you'd like to get a gift, here are the boys' wishlists:</p>
                        <ul>
                            <li><a href="https://www.amazon.com/hz/wishlist/ls/1XHUXIQ5NUQB0?ref=cm_sw_sm_r_un_un_GNk7HzxnHIqT2" target="_blank">Link to Benjamin's Amazon Wishlist</a></li>
                            <li><a href="https://www.amazon.com/hz/wishlist/ls/5J9648DBSHM0?ref=cm_sw_sm_r_un_un_pgK1jDJv3Ucbx" target="_blank">Link to Austin's Amazon Wishlist</a></li>
                        </ul>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <h2>Please RSVP!</h2>
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