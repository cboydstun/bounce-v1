import React from 'react'

import MapComponent from './MapComponent'
import Reviews from './Reviews'

import './LocalComponent.css'

export default function LocalComponent() {
    return (
        <div className='local-component'>
            <div className="local-container">
                <section className="local-section" id="local-section">
                    <MapComponent />
                    <Reviews />
                </section>
            </div>
        </div>
    )
}
