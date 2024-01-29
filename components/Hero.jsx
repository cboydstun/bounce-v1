import React from 'react'

export default function Hero(props) {
    return (
        <div className='hero-component'>
            <div className='hero-container'>
                <div className='hero-text'>
                    <div className="animated bounce">
                        <h1 className='hero-title'>SATX Bounce <br /><span style={{ fontSize: "x-large" }}><span className='fade-in-out'>Free Delivery! <br /> No Deposit!</span> <br />San Antonio Bounce House Rentals</span></h1>
                    </div>
                    <a href='#contact-form'>
                        <button onClick={() => {
                            gtag('event', 'click', {
                                'event_category': 'button',
                                'event_label': 'hero_contact_button'
                            });
                        }}
                        >
                            Contact Now
                        </button>

                    </a>
                </div>
            </div>
        </div>
    )
}
