import React from 'react'

export default function Hero(props) {
    return (
        <div className='hero-component'>
            <div className='hero-container'>
                <div className='hero-text'>
                    <div className="animated bounce">
                        <h1>SATX <br /> Bounce</h1>
                    </div>
                    <p>BOUNCE HOUSE <br /> AND <br /> PARTY RENTAL <br /> IN SAN ANTONIO</p>
                    <a href='#contact-form'>
                        <button onClick={() => {
                            gtag('event', 'click', {
                                'event_category': 'button',
                                'event_label': 'hero_contact_button'
                            });
                        }}
                        >
                            Contact
                        </button>

                    </a>
                </div>
            </div>
        </div>
    )
}
