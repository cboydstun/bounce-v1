import React from 'react';
import './RentalTerms.css';

export default function RentalTerms() {
    return (
        <div className="rental-terms-component">
            <h2>🎉 SATX Bounce Rental Terms 🎉</h2>
            <ul className="rental-terms-list">
                <li>
                    Rent our fantastic bounce houses for the entire day! 📅
                </li>
                <li>
                    We'll deliver between 8 am and 10 am, right to your door. 🚚
                </li>
                <li>
                    We'll pick them up between 6 pm and 8 pm. Hassle-free! 📦
                </li>
                <li>
                    Keep an eye on the bouncers at all times for safety. 👀
                </li>
                <li>
                    No shoes allowed! Jump in with bare or socked feet only. 👟
                </li>
                <li>
                    Pony rides and petting zoo provided by <br /><a className='pony-link' href="https://giddyupponyparties.com/">GIDDY UP PONY PARTIES AND PETTING ZOOS, LLC</a>. 🐴
                </li>
            </ul>

            <div className='faq-link-container'>
                <button className='faq-link'><a href='/faq/'>FAQ Page</a></button>
            </div>

        </div>
    );
}
