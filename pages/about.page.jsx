export { Page }

import React from 'react';

import './about.css'

function Page() {
    return (
        <div className='about-container'>
            <h1 className='about-title'>About SATX Bounce House Rentals</h1>

            <div className='about-story-container'>
                <div className='about-story-image'>
                    <img src='/satx-bounce-house-rental-san-antonio-about-us.png' alt='Our Family Photo' />
                </div>
                <div className='about-story-text'>
                    <h2>Our Story</h2>
                    <p>We began our journey with a clear vision: to elevate every San Antonio event with fun and engaging bounce houses and water slide rentals.</p>
                    <p>At SATX Bounce, we quickly became synonymous with unparalleled service and an expansive inventory.</p>
                    <p>As time passed, not only did our collection of bounce house rentals in San Antonio grow, but so did our dedication to our cherished customers.</p>
                    <p>From wet inflatables to dry slides, combo units, and even unique party additions like popcorn makers and petting zoos, SATX Bounce House Rentals always seeks to surpass expectations.</p>
                    <p>Today, we take pride in being the foremost name in bounce house rental San Antonio, TX, and the neighboring regions trust.</p>
                    <button><a href='/#contact-form'>Contact</a></button>
                    <button><a href='/faq/'>FAQ</a></button>
                </div>
            </div>

            <div className='about-promise-container'>
                <h2>Our Promise</h2>
                <ul className='promise-cards'>
                    <li className='promise-card'>
                        <h4>Safety First</h4>
                        <p>Ensuring the well-being of your guests is our utmost priority.</p>
                        <p>At SATX Bounce, we meticulously maintain our equipment, especially our water slide rentals, adhering to stringent safety protocols.</p>
                        <p>This commitment ensures a joyous and carefree experience for everyone.</p>
                    </li>
                    <li className='promise-card'>
                        <h4>Customer Satisfaction</h4>
                        <p>Our customers are the essence of everything we do at San Antonio bounce house rentals.</p>
                        <p>We're unwavering in our mission to offer the peak of service, from the initial booking to the event day.</p>
                        <p>Your confidence and satisfaction are paramount to us.</p>
                    </li>
                    <li className='promise-card'>
                        <h4>Flexibility</h4>
                        <p>Life's unpredictable nature, especially when planning events, is something we fully recognize.</p>
                        <p>That's why our team at SATX Bounce House Rentals emphasizes flexibility, ensuring we're always ready to adapt with you.</p>
                    </li>
                    <li className='promise-card'>
                        <h4>Transparency</h4>
                        <p>Absolutely no hidden fees or unpleasant surprises.</p>
                        <p>Our transparent and affordable inflatable party rental pricing model means you'll always be clear on what you're getting, streamlining your event preparations.</p>
                    </li>
                </ul>
            </div>

            <div className='about-team-container'>
                <h2>Why Choose SATX?</h2>
                <p>Beyond our premier inventory, which includes top-notch water slide rentals San Antonio relies on, and our unwavering service commitment, we believe in nurturing lasting relationships.</p>
                <p>Choosing us means you're not just opting for a bounce house rental; you're partnering with a dedicated team passionate about ensuring your event's triumph.</p>
                <p>Our legacy stands on the countless joyous laughter and memories we've facilitated, and we're excited to be a part of your next memorable event.</p>
            </div>

            <button><a href='/faq/'>Frequently Asked Questions</a></button>

            <div className='about-team-container'>
                <h2>Join Us in Our Journey</h2>
                <p>Whether it's a cozy backyard gathering or a grand festivity, each celebration holds its own charm.</p>
                <p>Let's join forces to make your next event the buzz of San Antonio!</p>
                <p>We cordially invite you to delve into our offerings, pose queries, and get in touch with us.</p>
                <p>At SATX Bounce House Rentals, we're not just about bounce houses or waterslide rentals San Antonio cherishes; we're your comrades in crafting indelible memories.</p>
            </div>

            <button><a href='/#contact-form'>Contact Now</a></button>
        </div>
    );
}