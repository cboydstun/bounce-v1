import React, { useState } from 'react';

import './ContactForm.css';

const DRY_XL = "../satx-bounce-house-rental-san-antonio-dry-xl.jpg"
const DRY_LARGE = "../satx-bounce-house-rental-san-antonio-dry-large.jpg"
const DRY_MED = "../satx-bounce-house-rental-san-antonio-dry-med.jpg"
const WET_LIME = "../satx-bounce-house-rental-san-antonio-wet-xl.jpg"
const JUNIOR_BOUNCE = "../satx-bounce-house-rental-san-antonio-junior-bounce.jpg"
const JUNIOR_WATERSLIDE = "../satx-bounce-house-rental-san-antonio-junior-waterslide.jpg"
const WET_RED_SLIDE = "../satx-bounce-house-rental-san-antonio-wet-xl-red.jpg"
const ARCH_CASTLE = "../satx-bounce-house-rental-san-antonio-arch-castle.jpg"
const PINK_BOUNCE = "../satx-bounce-house-rental-san-antonio-pink-bounce.jpg"
const BALLOON_BOUNCE = "../satx-bounce-house-rental-san-antonio-balloon-bounce.png"
const WHITE_BOUNCE = "../satx-bounce-house-rental-san-antonio-white-bouncer.jpg"
const BALLOON_COMBO = "../satx-bounce-house-rental-san-antonio-balloon-combo.jpg"
const BASKETBALL_SHOOT = "../satx-bounce-house-rental-san-antonio-basketball-shoot.png"
const MINI_BOUNCE = "../satx-bounce-house-rental-san-antonio-mini-bounce.jpg"
const BLUE_WATERSLIDE = "../satx-bounce-house-rental-san-antonio-wet-large-blue.jpg"

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
        snowConeMachine: false,
        pettingZoo: false,
        ponyRides: false,
        dj: false,
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
                    setBouncerImage(DRY_XL);
                    break;
                case 'DRY-Large':
                    setBouncerImage(DRY_LARGE);
                    break;
                case 'DRY-Medium':
                    setBouncerImage(DRY_MED);
                    break;
                case 'DRY-JuniorBounce':
                    setBouncerImage(JUNIOR_BOUNCE);
                    break;
                case 'WET-JuniorWaterslide':
                    setBouncerImage(JUNIOR_WATERSLIDE);
                    break;
                case 'WET-Lime':
                    setBouncerImage(WET_LIME);
                    break;
                case 'WET-Red':
                    setBouncerImage(WET_RED_SLIDE);
                    break;
                case 'WHITE-Bounce':
                    setBouncerImage(WHITE_BOUNCE);
                    break;
                case 'ARCH-Castle':
                    setBouncerImage(ARCH_CASTLE);
                    break;
                case 'PINK-Bounce':
                    setBouncerImage(PINK_BOUNCE);
                    break;
                case 'BALLOON-Bounce':
                    setBouncerImage(BALLOON_BOUNCE);
                    break;
                case 'BALLOON-Combo':
                    setBouncerImage(BALLOON_COMBO);
                    break;
                case 'BASKETBALL-Shoot':
                    setBouncerImage(BASKETBALL_SHOOT);
                    break;
                case 'MINI-Bounce':
                    setBouncerImage(MINI_BOUNCE);
                    break;
                case 'WET-Blue':
                    setBouncerImage(BLUE_WATERSLIDE);
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
                    snowConeMachine: false,
                    pettingZoo: false,
                    ponyRides: false,
                    dj: false,
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
                            <option value="DRY-CastleWSlide">Castle w/ Slide - 25 x 15</option>
                            <option value="DRY-Large">Large Castle - 15 x 15</option>
                            <option value="DRY-Medium">Medium Castle - 13 x 13</option>
                            <option value="DRY-JuniorBounce">Junior Bounce - 19 x 12</option>
                            {/* <option value="WET-JuniorWaterslide">Junior Waterslide - 16 x 8</option> */}
                            <option value="WHITE-Bounce">White Bouncer - 13 x 12</option>
                            <option value="WET-Red">Red Water Slide - 30 x 20</option>
                            <option value="WET-Lime">Lime Water Slide - 25 x 15</option>
                            <option value="WET-Blue">Blue Water Slide - 20 x 10</option>
                            <option value="ARCH-Castle">Arch Castle - 15 x 15</option>
                            <option value="PINK-Bounce">Pink Castle - 15 x 15</option>
                            <option value="BALLOON-Bounce">Balloon Bounce - 15 x 15</option>
                            <option value="BALLOON-Combo">Balloon w/ Slide - 20 x 20</option>
                            <option value="BASKETBALL-Shoot">Basketball Shoot - 8 x 6</option>
                            <option value="MINI-Bounce">Mini Bounce - 6 x 6</option>


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
                            {/* snow cone machine */}
                            <label htmlFor="snowConeMachine">🍧 Snow Cone Machine:</label>
                            <input
                                type="checkbox"
                                id="snowConeMachine"
                                name="snowConeMachine"
                                checked={formData.snowConeMachine}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-control">
                            {/* overnight */}
                            <label htmlFor="overnight">🌙 Overnight Rental:</label>
                            <input
                                type="checkbox"
                                id="overnight"
                                name="overnight"
                                checked={formData.overnight}
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