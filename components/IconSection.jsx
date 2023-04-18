import React from 'react'

export default function IconSection() {
    return (
        <div className='icon-component'>
            <div className='icon-section'>
                <h2>Why Choose Us?</h2>
                <div className="icon-container">
                    <div className='icon-section__icon'>
                        <img src='https://cdn-icons-png.flaticon.com/512/66/66163.png' alt='icon1' height={50} width={50} />
                        <h3>Professional and Timely</h3>
                        <p>It is very important to us that you have the best experience. To that end, you can expect nothing but the best including on-time delivery and professional setup.</p>
                    </div>

                    <div className='icon-section__icon'>
                        <img src='https://cdn-icons-png.flaticon.com/512/2946/2946636.png' alt='icon2' height={50} width={50} />
                        <h3>Safe & Clean</h3>

                        <p>Parties are meant for fun; not for worry! You can have a great time knowing that we've done our very best to provide the safest, most enjoyable experience possible.</p>

                    </div>
                    <div className='icon-section__icon'>
                        <img src='https://cdn-icons-png.flaticon.com/512/950/950299.png' alt='icon3' height={50} width={50} />
                        <h3>Great Customer Service</h3>

                        <p>Life happens and we understand. We will be there if the unexpected happens and you can count on us to deliver quality customer service that you would expect from the largest corporations.</p>
                    </div>

                    <div className='icon-section__icon'>
                        <img src='https://cdn-icons-png.flaticon.com/512/3037/3037156.png' alt='icon4' height={50} width={50} />
                        <h3>Daily Pricing</h3>
                        <p>All prices are reflected in daily amounts. Please let us know if you would like for your rental to extend for more than one day.</p>
                    </div>

                    <div className='icon-section__icon'>
                        <img src='https://cdn-icons-png.flaticon.com/512/709/709790.png' alt='icon5' height={50} width={50} />
                        <h3>Free Delivery & Setup</h3>
                        <p>Delivery and setup is included in the price of your rental. We will deliver and setup your rental at your location before 8 am and will return to pick it up after 6 pm.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}