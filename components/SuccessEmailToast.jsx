import React, { useState } from 'react';

import { Row, Col, Toast } from 'react-bootstrap';

export default function SuccessEmailToast() {
  const [show, setShow] = useState(true);

  const toggleShow = () => setShow(!show);

  return (
    <Row>
      <Col md={6} className="mb-2">
        <Toast show={show} onClose={toggleShow}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Success!</strong>
          </Toast.Header>
          <Toast.Body>Your Message was sent successfully.</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}