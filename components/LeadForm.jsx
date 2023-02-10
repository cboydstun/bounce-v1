import React, { useState, useEffect } from 'react'

const BOUNCE13x13 = 'https://lambertbounceparties.com/wp-content/uploads/2021/09/Screen20Shot202021-09-2620at2012.01.0020PM_1632672367_big.png'
const BOUNCE15x15 = 'https://files.sysers.com/cp/upload/marylandbounce/items/IMG_5204.jpg'
const BOUNCE25x15 = 'https://bouncycastlenetwork-res.cloudinary.com/image/upload/f_auto,q_auto,c_limit,w_900/3cab8dad607f8c19548b603bdbb7f69b'

export default function LeadForm() {
    const API_URL = 'https://www.rockettestserver.xyz/api/v1/leads'
    // const API_URL = 'http://localhost:8080/api/v1/leads'

    const [choices, setChoices] = useState('xxl')
    const [date, setDate] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [image, setImage] = useState(BOUNCE25x15)

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            // check all forms are filled out
            if (!date || !name || !email || !phone || !address || !zipCode) {
                alert('Please fill out all fields')
                return
            }

            // check for valid San Antonio, Tx zip code
            if (zipCode.length !== 5 || zipCode < 78201 || zipCode > 78299) {
                alert('Sorry we only service San Antonio, TX')
                return
            }

            // check that Date is not in the past or less than 3 days from now
            const today = new Date()
            const todayPlus3 = new Date()
            todayPlus3.setDate(todayPlus3.getDate() + 2)
            const dateToCheck = new Date(date)
            if (dateToCheck < today || dateToCheck < todayPlus3) {
                alert('Please choose a date that is at least 3 days from now')
                return
            }

            setSubmitted(true)
            console.log('submitted')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (submitted) {
            fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'

                },
                body: JSON.stringify({
                    choices,
                    date,
                    name,
                    email,
                    phone,
                    address,
                    zipCode,
                    message
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data)
                    alert('Thank you for your submission!')
                    setSubmitted(false)
                    // reset form
                    setChoices('xxl')
                    setDate('')
                    setName('')
                    setEmail('')
                    setPhone('')
                    setAddress('')
                    setZipCode('')
                    setMessage('')

                })
        }
    }, [submitted])

    return (
        <div className="contact-form-component">
            <div className='contact-form-section' id='contact-form'>
                <form name="contact" onSubmit={e => { handleSubmit(e) }} >
                    <label className='choice-label' htmlFor="choices">Choose your bounce house:</label>
                    <br />
                    <img src={image} alt="" height={200} width={200} />
                    <select className='choice-dropdown' name="choices" value={choices} onChange={e => { setChoices(e.target.value), setImage(e.target.value === 'large' ? BOUNCE13x13 : e.target.value === 'x-large' ? BOUNCE15x15 : BOUNCE25x15) }}>
                        <option value="large">Large - 13' x 13' - $40</option>
                        <option value="x-large">X-Large - 15' x 15' - $50</option>
                        <option value="xxl">XXL with Slide Combo - 15' x 25' - $60</option>
                    </select>
                    <br />
                    <br />
                    <label htmlFor="date">Date
                        <input type="date" name="date" aria-labelledby="date" value={date} onChange={e => setDate(e.target.value)} />
                    </label>
                    <br />
                    <label htmlFor="name">Name
                        <input type="text" name="name" aria-labelledby="name" placeholder='Your Name' value={name} onChange={e => setName(e.target.value)} />
                    </label>
                    <br />
                    <label htmlFor="email">Email
                        <input type="email" name="email" aria-labelledby="email" placeholder='Valid Email' value={email} onChange={e => setEmail(e.target.value)} />
                    </label>
                    <br />

                    <label htmlFor="phone">Phone
                        <input type="tel" name="phone" aria-labelledby="phone" placeholder='Phone Number' value={phone} onChange={e => setPhone(e.target.value)} />
                    </label>
                    <br />

                    <label htmlFor="address">Address
                        <input type="text" name="address" aria-labelledby="address" placeholder='Address for delivery' value={address} onChange={e => setAddress(e.target.value)} />
                    </label>
                    <br />

                    <label htmlFor="zipCode">Zip Code
                        <input type="text" name="zipCode" aria-labelledby="zipCode" placeholder='Zip Code' value={zipCode} onChange={e => setZipCode(e.target.value)} />
                    </label>
                    <br />

                    <label htmlFor="message">Message <br />
                        <textarea name="message" value={message} aria-labelledby="message" placeholder='Anything else you would like to share? - Optional' onChange={e => setMessage(e.target.value)} />
                    </label>
                    <br />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
