import React, { useState, useEffect } from 'react'

const BOUNCE13x13 = 'https://www.funasfam.com/wp-content/uploads/2023/02/square_bounce_sqma-min.png'
const BOUNCE15x15 = 'https://www.funasfam.com/wp-content/uploads/2023/02/castle_bounce_sqma-min.png'
const BOUNCE25x15 = 'https://www.funasfam.com/wp-content/uploads/2023/02/big_bounce_sqma-min.png'

export default function LeadForm() {
    const API_URL = `${import.meta.env.VITE_SERVER_URL}/api/v1/leads`

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
    const [agree, setAgree] = useState(false)

    const formatDate = (date) => {
        const d = new Date(date)
        const month = d.getMonth() + 1
        const day = d.getDate() + 1
        const year = d.getFullYear()
        return `${month}/${day}/${year}`
    }

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

            // check that Date is at least tomorrow
            const today = new Date()
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate())
            const dateArr = date.split('-')
            const dateObj = new Date(dateArr[0], dateArr[1] - 1, dateArr[2])
            if (dateObj < tomorrow) {
                alert('Please select a date at least 1 day in advance')
                return
            }

            // check that has agreed to text messages
            if (!agree) {
                alert('We need to contact you to confirm your reservation. Please check the box to agree to receive text messages.')
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
          // First, check if there is an existing record with the same choices and date
          fetch(`${API_URL}/available/${choices}?date=${date}`)
            .then(res => res.json())
            .then(data => {
                if (data.exists) {
                    alert(`Sorry, your ${choices.toUpperCase()} bounce house is not available on ${formatDate(date)}. Please choose another date or another size.`)
                    setSubmitted(false)
                    return
                } else {
                    // If there is no existing record, create a new one
                    fetch(API_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
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
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            alert(`Thank you for your reservation! We will contact you to confirm your reservation.`)
                            setSubmitted(false)
                            setChoices('xxl')
                            setDate('')
                            setName('')
                            setEmail('')
                            setPhone('')
                            setAddress('')
                            setZipCode('')
                            setMessage('')
                            setAgree(false)
                        })
                }
            })
        }
    }, [submitted])
    


    return (
        <div className="contact-form-component">
            <div className='contact-form-section' id='contact-form'>
                <form name="contact" onSubmit={e => { handleSubmit(e) }} >
                    <label className='choice-label' htmlFor="choices">Choose your bounce house! Daily prices.</label>
                    <br />
                    <img src={image} alt="" height={200} width={200} />
                    <select className='choice-dropdown' name="choices" value={choices} onChange={e => { setChoices(e.target.value); setImage(e.target.value === 'xxl' ? BOUNCE25x15 : e.target.value === 'x-large' ? BOUNCE15x15 : BOUNCE13x13) }}>
                        <option value="large">Large - 13' x 13' - $80</option>
                        <option value="x-large">X-Large - 15' x 15' - $100</option>
                        <option value="xxl">XXL with Slide Combo - 15' x 25' - $120</option>
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

                    <div className='agree-sms'>
                        <table>
                            <tr><td><input type="checkbox" name="text" aria-labelledby="text" className='agree-checkbox' value={agree} onChange={e => setAgree(e.target.value)} /></td><td><label htmlFor="text" className='agree-label'>I agree to receive SMS text messages.</label></td></tr>
                        </table>
                    </div>


                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
