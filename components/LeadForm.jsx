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

                    {/* DROPDOWN with options for: large 13x13, X-Large 15x15, XXL w/ Slide 15x25 */}
                    <label htmlFor="choices">Choose your bounce house:</label>
                    <br />

                    <select name="choices" value={choices} onChange={e => setChoices(e.target.value)}>
                        <option value="large" defaultValue={true}>Large</option>
                        <option value="x-large">X-Large</option>
                        <option value="xxl">XXL with Slide Combo</option>
                    </select>
                    <br />

                    {/* DATEPICKER */}
                    <label htmlFor="date">Date</label>
                    <input type="date" name="date" value={date} onChange={e => setDate(e.target.value)} />

                    <br />


                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder='Your Name' value={name} onChange={e => setName(e.target.value)} />
                    <br />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder='Valid Email' value={email} onChange={e => setEmail(e.target.value)} />
                    <br />

                    <label htmlFor="phone">Phone</label>
                    <input type="tel" name="phone" placeholder='Phone Number' value={phone} onChange={e => setPhone(e.target.value)} />
                    <br />

                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" placeholder='Address for delivery' value={address} onChange={e => setAddress(e.target.value)} />
                    <br />

                    <label htmlFor="zipCode">Zip Code</label>
                    <input type="text" name="zipCode" placeholder='Zip Code' value={zipCode} onChange={e => setZipCode(e.target.value)} />
                    <br />

                    <label htmlFor="message">Message</label>
                    <textarea name="message" value={message} placeholder='Anything else you would like to share? - Optional' onChange={e => setMessage(e.target.value)} />
                    <br />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
