import React from 'react';
import './tos.css';

const TermsOfService = () => {
    return (
        <div className="tos-container">
            <div className="tos-content">
                <h1 className="tos-title">Terms of Service</h1>

                <h2 className="tos-heading">1. Introduction</h2>
                <p className="tos-text">Welcome to our Bounce House Rental website. By using our services, you agree to these terms and conditions. Please read them carefully.</p>

                <h2 className="tos-heading">2. Privacy Policy</h2>
                <p className="tos-text">
                    We value your privacy. We do not use any third-party cookies or trackers on our website, except for Google Analytics, which helps us understand user interactions for the purpose of improving our services.
                </p>

                <h2 className="tos-heading">3. Google Analytics</h2>
                <p className="tos-text">
                    Our website uses Google Analytics to collect anonymized data about website traffic and usage patterns. This information helps us improve the user experience. Google Analytics does not collect personally identifiable information (PII).
                </p>

                <h2 className="tos-heading">4. Contact Form Data</h2>
                <p className="tos-text">
                    Any information you provide through our contact form is stored securely in a MongoDB Atlas database. We use this information solely for processing your rental requests and communication regarding your rental. We do not sell, share, or use your information for any other purposes.
                </p>

                <h2 className="tos-heading">5. Data Security</h2>
                <p className="tos-text">
                    We take the security of your data seriously. All information you provide is securely stored and protected. However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                </p>

                <h2 className="tos-heading">6. Rental Terms</h2>
                <p className="tos-text">
                    All rentals are subject to availability and must be reserved in advance. Payment must be completed before the rental date. Our rental items are inspected for quality, and you are responsible for the care and condition of the equipment during the rental period. Damages to the equipment may result in additional charges.
                </p>

                <h2 className="tos-heading">7. Cancellation Policy</h2>
                <p className="tos-text">
                    Cancellations must be made any time before the rental date for a full refund. Cancellations made within are not subject to a cancellation fee. No refunds will be provided for no-shows or same-day cancellations.
                </p>

                <h2 className="tos-heading">8. Liability</h2>
                <p className="tos-text">
                    The renter assumes full responsibility for the safety of all participants using the bounce house. Our company is not liable for any injuries, accidents, or damages that occur during the rental period.
                </p>

                <h2 className="tos-heading">9. Modifications to the Terms</h2>
                <p className="tos-text">
                    We reserve the right to modify these terms at any time. Any changes will be posted on this page, and it is your responsibility to review these terms periodically.
                </p>

                <h2 className="tos-heading">10. Contact Us</h2>
                <p className="tos-text">
                    If you have any questions regarding these Terms of Service, please contact us through our website contact form or via email.
                </p>
            </div>
        </div>
    );
};

export { Page };

function Page() {
    return <TermsOfService />;
}