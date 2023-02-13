import React from 'react'

export default function Navigation(props) {
    return (
        <div className='navigation-component'>
            <div className='navigation-container'>
                <nav>
                    <ul>
                        <li>
                            <a className="navitem" href="/">
                                Home
                            </a>
                        </li>
                        <li>
                            <a className="navitem" href="/#about-section">
                                About
                            </a>
                        </li>
                        <li>
                            <a className="navitem" href="/#contact-form">
                                Contact
                            </a>
                        </li>

                    </ul>
                </nav>
            </div>
        </div>
    )
}
