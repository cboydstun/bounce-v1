import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import './Navigation.css'

export default function Navigation(props) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    return (
        <div className='navigation-component'>
            <div className='navigation-container'>
                <div className='logo-container'>
                    <a href='/'>
                        <span role="img" aria-label="Party Popper Emoji" className='logo'>&#x1F389;</span> SATX Bounce
                    </a>
                </div>

                <nav>
                    <ul className={`nav-menu ${mobileMenuOpen ? 'nav-menu-mobile' : ''}`}>
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
                    <div className='nav-icon' onClick={handleMobileMenuToggle}>
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </nav>
            </div>
        </div>
    )
}
