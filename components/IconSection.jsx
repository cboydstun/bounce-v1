import React from 'react'

import './IconSection.css'

export default function IconSection() {
    return (
        <div className='icon-component'>
            <div className='icon-section'>
                <h2>Why Choose Us?</h2>
                <div className="icon-container">
                    <div className='icon-section__icon'>
                        <i className="fas fa-truck truck-moves"></i>
                        <h3>Professional and Timely Bounce House Rentals</h3>
                        <p>At SATX Bounce House Rentals, we prioritize exceptional customer service and a fantastic inflatable experience. We specialize in providing great bounce houses, wet and dry slides, combo units, and inflatables for parties in San Antonio. Our dedicated team understands that your time is precious, so we ensure prompt delivery and efficient setup for every rental.</p>
                        <p>When you choose our party service, we are committed to offering the highest level of customer satisfaction. From the moment you book with us, you can expect a seamless and enjoyable experience with our water slides, bounce houses, or both! Our goal is to make your event memorable and fun with our wide range of wet inflatables, dry inflatables, and bounce houses.</p>
                    </div>

                    <div className='icon-section__icon'>
                        <i className="fas fa-shield-alt grow-shrink"></i>
                        <h3>Safe & Clean Inflatable Rentals</h3>
                        <p>At SATX Bounce House Rentals, we understand that planning a party can be stressful, with numerous details to consider. To ease your worries, we prioritize the safety of your guests during your event in San Antonio. We take safety seriously with our water slides, dry slides, combo units, and bounce houses.</p>
                        <button><a href='/#contact-form'>Contact Now</a></button>
                        <p>Our commitment to safety includes using high-quality, well-maintained equipment for all our party rentals. We follow strict safety protocols for our wet and dry inflatables ensuring a successful and secure event. With SATX Bounce House Rentals, you can rest easy knowing we've done everything in our power to create a fun and safe environment for your party.</p>
                    </div>

                    <div className='icon-section__icon'>
                        <i className="fas fa-users"></i>
                        <h3>Great Customer Service for Event Rentals</h3>
                        <p>At SATX Bounce House Rentals, we recognize that life can be unpredictable, and plans may change. That's why we emphasize flexibility for our party rentals in San Antonio, including water slides, wet and dry combo units, and great slide options. If you encounter unexpected changes and need to adjust your rental, we will collaborate with you to find the best solution for your needs.</p>
                        <button><a href='/faq/'>Frequently Asked Questions</a></button>
                        <p>Our commitment to exceptional customer service ensures that you can rely on us to be there when you need us. Whether it's a minor issue or a major challenge, we will do everything in our power to make things right. With SATX Bounce House Rentals, you can trust that our wet and dry inflatables, slides, and party rentals will adapt to your changing circumstances.</p>
                    </div>

                    <div className='icon-section__icon'>
                        <i className="fas fa-dollar-sign rotates"></i>
                        <h3>Affordable Daily Pricing</h3>
                        <p>At SATX Bounce House Rentals, we pride ourselves on transparency in pricing for our bounce house rentals, chair rentals, and great combo units near you. We clearly state that all our prices are based on daily rates. If you need your rental for more than one day, we're more than happy to work with you to find a budget-friendly solution.</p>
                        <button><a href='/#contact-form'>Contact Now</a></button>

                        <p>Our goal is to ensure you feel comfortable with your rental agreement and fully understand what you're paying for. If you have any questions about pricing for our wet and dry inflatables, or water slides, please don't hesitate to ask.</p>
                    </div>

                    <div className='icon-section__icon'>
                        <i className="fas fa-gift bounce-wiggles"></i>
                        <h3>Free Delivery & Setup for Party Rentals</h3>
                        <p>At SATX Bounce House Rentals, we believe in providing a hassle-free experience for our customers in San Antonio. That's why we include delivery and setup in the price of your bounce houses and slide rentals. We will collaborate with you to schedule a convenient delivery time, and our team will arrive promptly before 8 am to set up your rental.</p>
                        <button><a href='/faq/'>Frequently Asked Questions</a></button>
                        <p>Once your event has concluded, we will return after 6 pm to pick up the slide or bounce house. With us, you won't have to worry about a thing; we've got you covered from start to finish, ensuring a smooth and enjoyable party rental experience.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}