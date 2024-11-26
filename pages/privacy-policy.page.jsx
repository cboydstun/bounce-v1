import React from 'react';
import './privacy-policy.css';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-container">
            <div className="privacy-content">
                <h1 className="privacy-title">Privacy Policy</h1>

                <h2 className="privacy-heading">1. Introduction</h2>
                <p className="privacy-text">
                    Welcome to SATX Bounce House Rentals. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
                </p>

                <h2 className="privacy-heading">2. Information We Collect</h2>
                <p className="privacy-text">
                    We collect information that you voluntarily provide to us when making reservations or inquiries, including:
                    • Name and contact information
                    • Delivery address and event details
                    • Payment information (processed securely through our payment providers)
                    • Communication preferences
                    • Any additional information you choose to provide
                </p>

                <h2 className="privacy-heading">3. How We Use Your Information</h2>
                <p className="privacy-text">
                    We use your information solely for the purpose of:
                    • Processing your rental requests and reservations
                    • Communicating about your rental (delivery, setup, pickup)
                    • Sending important safety and usage instructions
                    • Responding to your inquiries
                    • Improving our services and website experience
                    We never sell or share your personal information with third parties for marketing purposes.
                </p>

                <h2 className="privacy-heading">4. Website Analytics</h2>
                <p className="privacy-text">
                    We use Google Analytics to understand how visitors interact with our website. This service collects anonymous data about page visits, time spent on site, and navigation patterns. This helps us improve our website and service offerings. No personally identifiable information is collected through analytics.
                </p>

                <h2 className="privacy-heading">5. Data Security</h2>
                <p className="privacy-text">
                    We implement appropriate technical and organizational security measures to protect your information. This includes secure SSL encryption for all data transmission, secure data storage, and regular security assessments. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2 className="privacy-heading">6. Your Rights</h2>
                <p className="privacy-text">
                    You have the right to:
                    • Access your personal information
                    • Request corrections to your data
                    • Request deletion of your information
                    • Opt-out of marketing communications
                    • Request a copy of your data
                    Contact us through our website to exercise any of these rights.
                </p>

                <h2 className="privacy-heading">7. Cookies and Tracking</h2>
                <p className="privacy-text">
                    Our website uses essential cookies necessary for basic functionality. We also use Google Analytics cookies to understand website usage patterns. You can control cookie preferences through your browser settings. Disabling cookies may limit some website functionality.
                </p>

                <h2 className="privacy-heading">8. Children's Privacy</h2>
                <p className="privacy-text">
                    While our services are often used for children's events, our website and services are intended for use by adults. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us for immediate removal.
                </p>

                <h2 className="privacy-heading">9. Changes to Privacy Policy</h2>
                <p className="privacy-text">
                    We may update this Privacy Policy periodically to reflect changes in our practices or for legal requirements. We will post any changes on this page and, for significant changes, provide a more prominent notice or direct notification.
                </p>

                <h2 className="privacy-heading">10. Contact Information</h2>
                <p className="privacy-text">
                    If you have questions about this Privacy Policy or how we handle your information, please contact us through our website's contact form. We aim to respond to all privacy-related inquiries promptly and thoroughly.
                </p>
            </div>
        </div>
    );
};

export { Page };

function Page() {
    return <PrivacyPolicy />;
}
