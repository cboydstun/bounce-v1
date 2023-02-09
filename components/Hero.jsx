import React from 'react'

export default function Hero(props) {
    return (
        <div className='hero-component'>
            <div className='hero-container'>
                <div className='hero-text'>
                    <h1>Hero Title</h1>
                    <p>Hero Description</p>
                    <a href='#contact-form'><button>Contact</button></a>
                </div>
                <div className='hero-overlay'></div>
            </div>
        </div>
    )
}
