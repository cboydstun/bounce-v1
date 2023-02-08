import React from 'react'

export default function Hero() {
    return (
        <div className='hero-component'>
            <div className='hero-container'>
                <div className='hero-text'>
                    <h1>Hero Title</h1>
                    <p>Hero Description</p>
                    <button>Button</button>
                </div>
                <div className='hero-overlay'></div>
            </div>
        </div>
    )
}
