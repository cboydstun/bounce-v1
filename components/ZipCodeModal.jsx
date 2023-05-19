import React, { useState, useEffect } from 'react'

import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const API_URL = `${import.meta.env.VITE_SERVER_URL}/api/v1/contacts`

const ZipCodeModal = (props) => {
    const [zipCode, setZipCode] = useState('')
    const [size, setSize] = useState('')
    const [date, setDate] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [hasScrolled, setHasScrolled] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(false)

    const handleZipCodeChange = (e) => {
        setZipCode(e.target.value)
    }

    const handleSizeChange = (e) => {
        setSize(e.target.value)
    }

    const handleDateChange = (e) => {
        setDate(e.target.value)
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            // check if all fields are filled out
            if (!zipCode || !size || !date) {
                alert('Please fill out all fields')
                return
            }

            // check if zip code is valid in San Antonio, Texas
            if (zipCode.length !== 5 || zipCode < 78201 || zipCode > 78299) {
                alert('Sorry we only service San Antonio, TX')
                return
            }

            // check if date is select and valid
            if (!date) {
                alert('Please select a date')
                return
            }

            // check if size is selected
            if (!size) {
                alert('Please select a size')
                return
            }

            // check if bounce house of that size is available on that date
            const response = await fetch(
                `${API_URL}/available/${date}/${size}`
            )
            const data = await response.json()

            // if bounce house is not available, alert user
            if (!data.available) {
                alert('Sorry, that bounce house is not available on that date')
                return
            }

            // if all checks pass, then setSubmitted(true) to show message that bounce house is available
            setSubmitted(true)
        } catch (error) {
            console.log(error)
        }
    }


    // setIsOpen(true) if user scrolls down 100px and it's been 1 second
    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset
            if (position > 200) {
                setHasScrolled(true)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        if (hasScrolled) {
            setTimeout(() => {
                setIsOpen(true)
            }, 1000)
        }
    }, [hasScrolled])

    const closeModal = () => {
        setIsOpen(false)
    }

    const formatDate = (date) => {
        const d = new Date(date)
        const month = d.getMonth() + 1
        const day = d.getDate() + 1
        const year = d.getFullYear()
        return `${month}/${day}/${year}`
    }

    return (
        <Modal
            onRequestClose={props.onRequestClose}
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Availability Check"
            ariaHideApp={false}
        >
            <h2>Check if your house is available right now!</h2>
            <p>For Free! No Obligation!</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="zipCode">
                    <h3>Enter Zip Code</h3>
                    <input
                        type="text"
                        name="zipCode"
                        value={zipCode}
                        onChange={handleZipCodeChange}
                    />
                </label>
                <label htmlFor="">
                    <h3>Enter Date</h3>
                    <input type="date" name="date" value={date} onChange={handleDateChange} />
                </label>
                <label htmlFor="choices">
                    <h3>Select Bounce Castle Size</h3>
                    <select onChange={handleSizeChange}>
                        <option value="">--Please Select--</option>
                        <option value="DRY-CastleWSlide">DRY - XL Castle w/ Slide - 25 x 15</option>
                        <option value="DRY-Large">DRY - Large Castle - 15 x 15</option>
                        <option value="DRY-Medium">DRY - Medium Castle - 13 x 13 </option>
                        <option value="DRY-Princess">DRY - Princess Castle - 13 x 13 </option>
                        <option value="WET-Junior">WET - Junior Bounce - 19 x 12</option>
                        <option value="WET-Lime">WET - XL Lime Water Slide - 30 x 10</option>
                        <option value="WET-Red">WET - XL Red Water Slide - 20 x 15</option>
                        <option value="WET-Obstacle">WET - XL Obstacle Course - 40 x 20 </option>
                    </select>
                </label>

                <div>
                    <button type="submit">✅Check</button>
                    <button onClick={closeModal}>❌Close</button>

                </div>
            </form>

            {submitted && (
                <div>
                    <h2>YES! Your bounce house is available on {formatDate(date)}!</h2>
                    <p className='available-bounce'>
                        <a href="/#contact-form" onClick={closeModal}>Contact us now</a> to book your party!
                    </p>
                </div>
            )}
        </Modal>
    )
}

export default ZipCodeModal 