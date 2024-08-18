import React from 'react';
import './success.css';

function SuccessPage() {
    return (
        <div className="success-container">
            <div className="success-content">
                <h1 className="success-title">Success!</h1>
                <div className="success-icon">🎉</div>
                <p className="success-message">Your bounce house party reservation form has been submitted successfully.</p>
                <p className="success-info">Someone will be calling or texting you within the hour to confirm your reservation.</p>
                <div className="success-details">
                    <p>What's next?</p>
                    <ul>
                        <li>All we need is a good delivery address to confirm the reservation.</li>
                        <li>No deposit required - ever!</li>
                        <li>Free delivery inside or very near Loop 1604 in San Antonio, Texas.</li>
                    </ul>
                </div>
                <p className="success-message">Please call or text <strong>(512)-210-0194</strong> during normal working hours for immediate assistance.</p>
            </div>
        </div>
    );
}

export { Page };

function Page() {
    return <SuccessPage />;
}