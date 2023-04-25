import React, { useState } from 'react';

import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        bouncer: '',
        email: '',
        partyDate: '',
        phone: '',
        tablesChairs: false,
        generator: false,
        popcornMachine: false,
    });

    const [agreeSMS, setAgreeSMS] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check for important data
        if (!formData.bouncer || !formData.email || !formData.partyDate) {
            alert('Please fill out at least your favorite bouncer, email, and party date. Thanks!');
            return;
        }

        // Check agree to SMS
        if (!agreeSMS) {
            alert('Please agree to receive SMS messages. Thanks!');
            return;
        }

        const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/contacts`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('Form submission successful:', jsonResponse);
                // Handle successful form submission (e.g., show success message or clear form)
                setFormData({
                    bouncer: '',
                    email: '',
                    partyDate: '',
                    phone: '',
                    tablesChairs: false,
                    generator: false,
                    popcornMachine: false,
                });
                setAgreeSMS(false);

                alert('Thank you for your submission!');
            } else {
                const errorResponse = await response.json();
                console.error('Form submission error:', errorResponse);
                // Handle form submission error (e.g., show error message)
                alert('There was an error with your submission. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            // Handle form submission error (e.g., show error message)
            alert('There was an error with your submission. Please try again.');
        }
    };

    return (
        <div className="contact-form-component">
            <div className="contact-form-container" id='contact-form'>
                <h2>☎️Contact Us Now☎️</h2>
                <form onSubmit={handleSubmit}>
                    <div className='bouncer form-control'>
                        <label htmlFor="bouncer">⭐ Favorite Bouncer<em>(required)</em>:</label>
                        <select
                            id="bouncer"
                            name="bouncer"
                            value={formData.bouncer}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a bouncer</option>
                            <option value="Kids Bounce with WET Water Park - $80">WET - 18 x 20 - Kids Bounce with WET Water Park - $80</option>
                            <option value="Medium Bounce Castle - $100">DRY - 13 x 13 - Medium Bounce Castle - $100</option>
                            <option value="Princess Bounce Castle - $100">DRY - 13 x 13 - Princess Bounce Castle - $100</option>
                            <option value="Large Bounce Castle - $150">DRY - 15 x 15 - Large Bounce Castle - $150</option>
                            <option value="Extra Large DRY Castle with Slide - $175">DRY - 25 x 15 - Extra Large Bounce Castle with Slide - $175</option>
                            <option value="Extra Large WET Water Slide - $200">WET - 25 x 15 - Extra Large Water Slide - $200</option>
                        </select>
                    </div>

                    <div className='form-control'>
                        <label htmlFor="email">✉️ Your Email<em>(required)</em>:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="phone">📱 Your Phone:</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='form-control'>
                        <label htmlFor="partyDate">📅 The Party Date<em>(required)</em>:</label>
                        <input
                            type="date"
                            id="partyDate"
                            name="partyDate"
                            value={formData.partyDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="extras-section">
                        <div className='form-control'>
                            <label htmlFor="tablesChairs">🪑 Tables & Chairs:</label>
                            <input
                                type="checkbox"
                                id="tablesChairs"
                                name="tablesChairs"
                                checked={formData.tablesChairs}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor="generator">🔌 Portable Electric Generator:</label>
                            <input
                                type="checkbox"
                                id="generator"
                                name="generator"
                                checked={formData.generator}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-control'>
                            <label htmlFor="popcornMachine">🍿 Popcorn Machine:</label>
                            <input
                                type="checkbox"
                                id="popcornMachine"
                                name="popcornMachine"
                                checked={formData.popcornMachine}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="sms-form-control">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label htmlFor="agreeSMS" style={{ marginRight: '10px' }}>Agree to SMS / Email communication <em>(required)</em>:</label>
                            <input
                                type="checkbox"
                                id="agreeSMS"
                                name="agreeSMS"
                                checked={agreeSMS}
                                onChange={() => setAgreeSMS(!agreeSMS)}
                            />
                        </div>
                    </div>

                    <button type="submit"
                        style={{ backgroundColor: 'white', color: 'black', cursor: 'pointer' }}
                    >
                        Submit
                    </button>

                    <p className='fade-in-out'>Your bouncer is <em>free</em> if a live person in San Antonio, TX doesn't respond in 30 minutes or less!</p>

                </form>
            </div>
        </div>
    );
};

export default ContactForm;