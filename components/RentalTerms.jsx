import React from 'react';
import './RentalTerms.css';

export default function RentalTerms() {
    return (
        <div id="rental-terms" className="rental-terms-component">
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
                    No food, drinks, or sharp objects inside the bouncers. 🚫
                </li>
                <li>
                    Free delivery inside Loop 1604 in San Antonio, TX only. 🚀
                </li>
                <li>
                    No deposit in San Antonio, TX inside Loop 1604. <br /> Outside Loop 1604, a delivery fee of $50 will apply if it is an area that we service. 💲
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
