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
          <p>We started with a simple mission: to elevate every event with fun and engaging bounce houses and slides.</p>
          <p>With time, our inventory grew, and so did our commitment to offering unparalleled services to our customers.</p>
          <p>From wet inflatables to dry slides, combo units to exciting party additions like popcorn makers and petting zoos, we continuously strive to exceed expectations.</p>
          <p>Today, we're proud to be the leading bounce house rental company in San Antonio, TX, and the surrounding areas.</p>
          <button><a href='/#contact-form'>Contact</a></button>
          <button><a href='/faq/'>FAQ</a></button>
        </div>
      </div>

      <div className='about-promise-container'>
        <h2>Our Promise</h2>
        <ul className='promise-cards'>
          <li className='promise-card'>
            <h4>Safety First</h4>
            <p>The well-being of your guests is our utmost priority. We meticulously maintain our equipment and adhere to stringent safety protocols, ensuring a carefree bouncing experience for everyone.</p>
          </li>
          <li className='promise-card'>
            <h4>Customer Satisfaction</h4>
            <p>Our customers are at the heart of everything we do. We're dedicated to offering you the highest level of service from the initial booking to the day of the event. Your peace of mind and satisfaction are paramount to us.</p>
          </li>
          <li className='promise-card'>
            <h4>Flexibility</h4>
            <p>We recognize the unpredictable nature of life and events. Hence, we emphasize flexibility, ensuring that if plans change, we're here to adapt with you.</p>
          </li>
          <li className='promise-card'>
            <h4>Transparency</h4>
            <p>No hidden fees, no surprises. Our transparent pricing model ensures you know exactly what you're paying for, making your event planning simpler and hassle-free.</p>
          </li>
        </ul>
      </div>

      <div className='about-team-container'>
        <h2>Why Choose SATX?</h2>
        <p>Beyond our state-of-the-art inventory and commitment to service, we believe in forging lasting relationships.</p>
        <p>When you choose SATX Bounce House Rentals, you're not just renting an inflatable; you're partnering with a team that's dedicated to making your event a resounding success.</p>
        <p>Our legacy is built on the joyous laughter and memories we've been a part of, and we're eager to be a part of yours.</p>
      </div>

      <button><a href='/faq/'>Frequently Asked Questions</a></button>


      <div className='about-team-container'>
        <h2>Join Us in Our Journey</h2>
        <p>From small backyard parties to grand events, every celebration is unique.</p>
        <p>Let's work together to make your next event the talk of the town! We invite you to explore our offerings, ask questions, and reach out to us.</p>
        <p>At SATX Bounce House Rentals, we're more than just bounce houses; we're your partners in creating cherished memories.</p>
      </div>

      <button><a href='/#contact-form'>Contact Now</a></button>
    </div>
  );
}