import React from 'react'
import ReactGA from "react-ga4";

export default function Navigation(props) {

    const handleClick = (label) => {
        ReactGA.send('event', {
            event_category: 'Navigation',
            event_action: 'Click',
            event_label: label
        });
    }

    return (
        <div className='navigation-component'>
            <div className='navigation-container'>
                <nav>
                    <ul>
                        <li>
                            <a className="navitem" href="/" onClick={() => handleClick('Home - Nav')}>
                                Home
                            </a>
                        </li>
                        <li>
                            <a className="navitem" href="/#about-section" onClick={() => handleClick('About - Nav')}>
                                About
                            </a>
                        </li>
                        <li>
                            <a className="navitem" href="/#contact-form" onClick={() => handleClick('Contact - Nav')}>
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
