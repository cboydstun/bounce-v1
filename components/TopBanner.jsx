import React from 'react'

import './TopBanner.css';

export default function TopBanner({ text }) {
    return (
        <div className="banner">
            <div className="scrolling-text">
                {text}
            </div>
        </div>
    )
}
