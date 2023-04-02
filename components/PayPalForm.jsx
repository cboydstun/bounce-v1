import React, { useState, useEffect, useRef } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
} from "@paypal/react-paypal-js";

const BOUNCE13x13 = 'https://www.funasfam.com/wp-content/uploads/2023/02/square_bounce_sqma-min.png'
const BOUNCE15x15 = 'https://www.funasfam.com/wp-content/uploads/2023/02/castle_bounce_sqma-min.png'
const BOUNCE25x15 = 'https://www.funasfam.com/wp-content/uploads/2023/02/big_bounce_sqma-min.png'

const API_URL = `${import.meta.env.VITE_SERVER_URL}/api/v1/leads`

const BounceForm = () => {
    const [form, setForm] = useState({
        choices: "",
        price: 0,
        date: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        zipCode: "",
        message: "",
        agreement: false,
    });

    const [image, setImage] = useState(BOUNCE25x15)

    const [error, setError] = useState("");

    const formRef = useRef();

    useEffect(() => {
        formRef.current = form;
    }, [form]);


    const prices = {
        large: 150,
        xLarge: 200,
        xxl: 250,
    };

    const resetForm = () => {
        setForm({
            choices: "",
            price: 0,
            date: "",
            name: "",
            email: "",
            phone: "",
            address: "",
            zipCode: "",
            message: "",
            agreement: false,
        });
    };

    const handleChoiceChange = (e) => {
        const { value, options, selectedIndex } = e.target;
        const price = options[selectedIndex].getAttribute("data-price");

        // Set the image based on the selected option
        let newImage;
        switch (value) {
            case "large":
                newImage = BOUNCE13x13;
                break;
            case "xLarge":
                newImage = BOUNCE15x15;
                break;
            case "xxl":
                newImage = BOUNCE25x15;
                break;
            default:
                newImage = BOUNCE25x15; // Or you can set a default image here
                break;
        }
        setImage(newImage);

        setForm({
            ...form,
            choices: value,
            price: parseFloat(price) || 0,
            choice: value,
        });
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("handleChange", name, value);
        setForm({ ...form, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setForm({ ...form, [name]: checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Do not handle form submission here; it will be handled in the onApprove callback
    };

    const createOrder = async (data, actions) => {
        // Check if the choice is valid
        if (!form.choices || !prices[form.choice]) {
            setError("Please select a valid choice.");
            return null;
        }

        // Check if the date is valid and in the future
        const selectedDate = new Date(form.date);
        const today = new Date();
        if (selectedDate <= today) {
            alert("Please select a date in the future.");
            return null;
        }

        // Check if the zip code is valid using an array of valid zip codes
        const validSanAntonioZipCodes = [
            78201, 78202, 78203, 78204, 78205, 78206, 78207, 78208, 78209, 78210,
            78211, 78212, 78213, 78214, 78215, 78216, 78217, 78218, 78219, 78220,
            78221, 78222, 78223, 78224, 78225, 78226, 78227, 78228, 78229, 78230,
            78231, 78232, 78233, 78234, 78235, 78236, 78237, 78238, 78239, 78240,
            78241, 78242, 78243, 78244, 78245, 78246, 78247, 78248, 78249, 78250,
            78251, 78252, 78253, 78254, 78255, 78256, 78257, 78258, 78259, 78260,
            78261, 78263, 78264, 78265, 78268, 78269, 78270, 78278, 78279, 78280,
            78283, 78284, 78285, 78288, 78289, 78291, 78292, 78293, 78294, 78295,
            78296, 78297, 78298, 78299
        ];

        const isValidZipCode = validSanAntonioZipCodes.includes(parseInt(form.zipCode, 10));
        if (!isValidZipCode) {
            alert("Please enter a valid San Antonio, TX zip code.");
            resetForm();
            return null;
        }

        // check if bounce house of that size is available on that date
        const response = await fetch(
            `${API_URL}/available/${form.choices}?date=${form.date}`
        )
        const bouncer = await response.json()
        if (bouncer.exists) {
            alert(`Sorry, your ${form.choices.toUpperCase()} bounce house is not available on ${form.date}. Please choose another date or another size.`)
            resetForm();
            return
        }

        // Clear the error message
        setError("");

        // Set up the transaction
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: prices[form.choice],
                    },
                },
            ],
        });
    };

    const onApprove = async (data, actions) => {
        const order = await actions.order.capture();

        const formData = {
            choices: form.choices,
            price: prices[form.choices],
            date: form.date,
            name: order.payer.name.given_name + ' ' + order.payer.name.surname,
            email: order.payer.email_address,
            phone: form.phone,
            address: order.purchase_units[0].shipping.address.address_line_1,
            zipCode: order.purchase_units[0].shipping.address.postal_code,
            message: form.message,
            agreement: form.agreement ? "true" : "false",
        };

        const submitResponse = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (submitResponse.ok) {
            alert("Thank you for your submission! We will contact you shortly to confirm your reservation.");
            resetForm();
        } else {

            const responseText = await submitResponse.text();
            const errorMessage =
                responseText === "already_exists"
                    ? `There is already a reservation for this bounce house on the selected date. Please choose another bounce house or another date.`
                    : `There was an error submitting the form. Please try again later.`;
            alert(errorMessage);
            resetForm();
        }

    };

    const onError = (err) => {
        console.error("Error capturing order: ", err);
    };

    return (
        <div className="contact-form-component">
            <div className='contact-form-section' id='contact-form'>
                <form name="contact" onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    <img className="form-image" src={image} alt="" height={400} width={400} />

                    {/* Add form fields */}
                    <label className='choice-label' htmlFor="choice">Pick a Bounce House:</label>
                    <select
                        name="choice"
                        id="choice"
                        value={form.choices}
                        onChange={handleChoiceChange}
                        className='choice-dropdown'
                    >
                        <option value="">-- Please choose an option --</option>
                        <option value="large" data-price={prices.large}>Large - 13 x 13 - ${prices.large}</option>
                        <option value="xLarge" data-price={prices.xLarge}>Extra Large - 15 x 15 - ${prices.xLarge}</option>
                        <option value="xxl" data-price={prices.xxl}>XXL w/ Slide - 25 x 15 - ${prices.xxl}</option>
                    </select>

                    <label htmlFor="date">Party Date:</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        value={form.date}
                        onChange={handleChange}
                    />

                    <label htmlFor="zipCode">Zip Code of Delivery:</label>
                    <input
                        type="text"
                        name="zipCode"
                        id="zipCode"
                        value={form.zipCode}
                        onChange={handleChange}
                    />

                    <label htmlFor="phone">Phone Number:</label>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={form.phone}
                        onChange={handleChange}
                    />


                    <label htmlFor="message">Message for our Team:</label>
                    <textarea
                        name="message"
                        id="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Please let us know if you have any special requests."
                    />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label htmlFor="agreement" style={{ marginRight: '10px' }}>
                            Agree to SMS Text Messages?
                        </label>
                        <input
                            type="checkbox"
                            name="agreement"
                            id="agreement"
                            checked={form.agreement}
                            onChange={handleCheckboxChange}
                        />
                    </div>




                    {/* Add the PayPal button */}
                    {form.choices && prices[form.choices] && form.date && form.phone && form.zipCode && form.agreement ? (
                        <PayPalButtons createOrder={createOrder} onApprove={onApprove} catchError={onError} />
                    ) : (null)}
                </form>
            </div>
        </div>
    );
};

const PayPalForm = () => {
    return (
        <PayPalScriptProvider
            options={{
                "client-id": `${import.meta.env.VITE_PAYPAL_CLIENT_ID}`,
            }}
        >
            <BounceForm />
        </PayPalScriptProvider>
    );
};

export default PayPalForm;