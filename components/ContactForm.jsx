import React, { useState } from 'react';

import './ContactForm.css'

const ContactForm = () => {
    const [from, setFrom] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [agreeToSMS, setAgreeToSMS] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `${import.meta.env.VITE_SERVER_URL}/api/v1/emails`;

        if (!agreeToSMS) {
            alert('Please agree to SMS communication before submitting the form.');
            return;
        }

        const data = {
            from: from,
            subject: subject,
            text: text,
        };
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',

            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);

                setFrom('');
                setSubject('');
                setText('');
                setShowSuccessToast(true);
            })
            .catch((error) => {
                console.error('Error:', error);
                setShowFailToast(true);
            });
    };

    return (
        <div className="contact-form-container">
            <form className="contact-form" id='contact-form' onSubmit={handleSubmit}>
                <h2>📧 Contact Us 📧</h2>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <textarea
                        placeholder='Party Details (Optional)'
                        rows={3}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label style={{display: "flex", alignItems: "center"}}>
                        <input
                            type="checkbox"
                            checked={agreeToSMS}
                            onChange={(e) => setAgreeToSMS(e.target.checked)}
                            style={{marginRight: "5px"}}
                        />
                        {' '}I agree to receive SMS text and Email communication.
                    </label>
                </div>

                <button type="submit" className="submit-button" disabled={!from || !subject}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ContactForm;