import React from 'react'

export default function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <a className="navitem" href="/">
                        Home
                    </a>
                </li>
                <li>
                    <a className="navitem" href="/about">
                        About
                    </a>
                </li>
                <li>
                    <a className="navitem" href="/contact">
                        Contact
                    </a>
                </li>
            </ul>
        </nav>
    )
}
