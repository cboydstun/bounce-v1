import React from 'react'
import ReactGA from "react-ga4";

export default function Hero(props) {

    const handleClick = (label) => {
        ReactGA.send('event', {
            event_category: 'Hero',
            event_action: 'Click',
            event_label: label
        });
    }

    return (
        <div className='hero-component'>
            <div className='hero-container'>
                <div className='hero-text'>
                    <div className="animated bounce">
                        <h1>SATX <br /> Bounce</h1>
                    </div>
                    <p>BOUNCE HOUSE <br /> AND <br /> PARTY RENTAL <br /> IN SAN ANTONIO</p>
                    <a href='#contact-form'>
                        <button onClick={() => handleClick('Contact')}>Contact</button>
                    </a>
                </div>
            </div>
        </div>
    )
}
