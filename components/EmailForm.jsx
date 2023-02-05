import React, { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';

import SuccessEmailToast from './SuccessEmailToast';
import FailEmailToast from './FailEmailToast';

const EmailForm = () => {
    const [from, setFrom] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showFailToast, setShowFailToast] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = 'https://www.rockettestserver.xyz/api/v1/emails';
        // const url = 'http://localhost:8080/api/v1/emails';
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
                'Access-Control-Allow-Origin': '*'
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
        <Container style={{ marginTop: "2rem" }}>
            {showSuccessToast && <SuccessEmailToast />}
            {showFailToast && <FailEmailToast />}

            <Form className="contact-form" onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicSubject">
                    <Form.Control
                        type="text"
                        placeholder="Enter subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicText">
                    <Form.Control
                        placeholder='Enter message. Please be nice.'
                        as="textarea"
                        rows={3}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default EmailForm;