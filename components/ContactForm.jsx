import React, { useState } from 'react';

import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        bouncer: '',
        email: '',
        partyDate: '',
        phone: '',
        partyZipCode: '',
        tablesChairs: false,
        generator: false,
        popcornMachine: false,
        cottonCandyMachine: false,
        overnight: false,
        pinata: false,
        message: ''
    });

    const [bouncerImage, setBouncerImage] = useState('');

    const [agreeSMS, setAgreeSMS] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        if (name === 'bouncer') {
            switch (value) {
                case 'DRY-CastleWSlide':
                    setBouncerImage('./satx-bounce-house-rental-san-antonio-dry-xl.jpg');
                    break;
                case 'DRY-Large':
                    setBouncerImage('./satx-bounce-house-rental-san-antonio-dry-large.jpg');
                    break;
                case 'DRY-Medium':
                    setBouncerImage('./satx-bounce-house-rental-san-antonio-dry-med.jpg');
                    break;
                case 'DRY-Princess':
                    setBouncerImage('./satx-bounce-house-rental-san-antonio-dry-princess.jpg');
                    break;
                case 'WET-Junior':
                    setBouncerImage('./satx-bounce-house-rental-san-antonio-wet-med.jpg');
                    break;
                case 'WET-Lime':
                    setBouncerImage('./satx-bounce-house-rental-san-antonio-wet-xl.jpg');
                    break;
                case 'WET-Red':
                    setBouncerImage('./satx-bounce-house-rental-san-antonio-wet-xl-red.jpg');
                    break;
                case 'WET-Obstacle':
                    setBouncerImage('./satx-bounce-house-rental-san-antonio-obstacle-course.jpg');
                    break;

                default:
                    setBouncerImage('');
                    break;
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check for important data
        if (!formData.bouncer || !formData.email || !formData.partyDate || !formData.partyZipCode) {
            alert('Please fill out at least your favorite bouncer, email, party date, and zip code. Thanks!');
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
                // Handle successful form submission (e.g., show success message or clear form)
                setFormData({
                    bouncer: '',
                    email: '',
                    partyDate: '',
                    phone: '',
                    partyZipCode: '',
                    tablesChairs: false,
                    generator: false,
                    popcornMachine: false,
                    cottonCandyMachine: false,
                    overnight: false,
                    message: ''
                });
                setAgreeSMS(false);
                setBouncerImage('');

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
                <p >Your bouncer is <span className='fade-in-out'><em>FREE</em></span> if a live person in San Antonio, TX doesn't respond in one hour or less during normal business hours!</p>

                <div className="bouncer-image">
                    {bouncerImage && <img src={`/${bouncerImage}`} alt={formData.bouncer} />}
                </div>


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
                            <option value="">--Please Select--</option>
                            <option value="DRY-CastleWSlide">DRY - XL Castle w/ Slide - 25 x 15 - $250</option>
                            <option value="DRY-Large">DRY - Large Castle - 15 x 15 - $200</option>
                            <option value="DRY-Medium">DRY - Medium Castle - 13 x 13 - $150</option>
                            <option value="DRY-Princess">DRY - Princess Castle - 13 x 13 - $150</option>
                            <option value="WET-Junior">WET - Junior Bounce - 19 x 12 - $150</option>
                            <option value="WET-Lime">WET - XL Lime Water Slide - 30 x 10 - $250</option>
                            <option value="WET-Red">WET - XL Red Water Slide - 20 x 15 - $250</option>
                            <option value="WET-Obstacle">WET - XL Obstacle Course - 40 x 20 - $300</option>
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

                    <div className="form-control">
                        <label htmlFor="partyDate">📅Date and Zip Code<em>(required)</em>:</label>
                        <div className="input-row">
                            <input
                                type="date"
                                id="partyDate"
                                name="partyDate"
                                value={formData.partyDate}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                id="partyZipCode"
                                name="partyZipCode"
                                placeholder="Zip Code"
                                value={formData.partyZipCode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <h3 style={{ color: 'white' }}>🎉 Extras:</h3>

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
                            <label htmlFor="generator">🔌 Portable Generator:</label>
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

                        <div className="form-control">
                            {/* cotton candy maker */}
                            <label htmlFor="cottonCandyMachine">🍭 Cotton Candy Machine:</label>
                            <input
                                type="checkbox"
                                id="cottonCandyMachine"
                                name="cottonCandyMachine"
                                checked={formData.cottonCandyMachine}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-control">
                            {/* overnight */}
                            <label htmlFor="overnight">🌙 Overnight:</label>
                            <input
                                type="checkbox"
                                id="overnight"
                                name="overnight"
                                checked={formData.overnight}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-control">
                            {/* pinata */}
                            <label htmlFor="pinata">🐎  Piñata:</label>
                            <input
                                type="checkbox"
                                id="pinata"
                                name="pinata"
                                checked={formData.pinata}
                                onChange={handleChange}
                            />
                        </div>


                    </div>




                    <div className="form-control">
                        <label htmlFor="message">📝 Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder='Anything else we should know?'
                        />
                    </div>

                    <div className="sms-form-control">
                        <div >
                            <label htmlFor="agreeSMS" style={{ marginRight: '10px' }}><strong>Agree to SMS / Email communication</strong> <em>(required)</em>:</label>
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
                </form>
            </div>
        </div>
    );
};

export default ContactForm;