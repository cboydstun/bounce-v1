import React, { useState, useEffect } from 'react'

export default function LeadForm() {
    const [choices, setChoices] = useState('large')
    const [date, setDate] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        // check all forms are filled out
        if (!name || !email || !phone || !address || !zipCode) {
            alert('Please fill out all fields')
            return
        }

        setSubmitted(true)
        console.log('submitted')
    }

    useEffect(() => {
        if (submitted) {
            fetch('https://www.rockettestserver.xyz/api/v1/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    address: address,
                    zipCode: zipCode,
                    message: message
                })
            })
                .then(response => response.json())
                .then(data => console.log(data))
        }
    }, [submitted])

    return (
        <div className="contact-form-component">
            <div className='contact-form-container' id='contact-form'>
                <h1>Lead Form</h1>
                <form name="contact" onSubmit={e => { handleSubmit(e) }} >
                    <label className='choice-label' htmlFor="choices">Choose your bounce house:</label>
                    <br />
                    <select className='choice-dropdown' name="choices" value={choices} onChange={e => setChoices(e.target.value)}>
                        <option value="large" defaultValue={true}>Large</option>
                        <option value="x-large">X-Large</option>
                        <option value="xxl">XXL with Slide Combo</option>
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

                    <label htmlFor="message">Message
                        <textarea name="message" value={message} aria-labelledby="message" placeholder='Anything else you would like to share? - Optional' onChange={e => setMessage(e.target.value)} />
                    </label>
                    <br />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
