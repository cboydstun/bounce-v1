import React, { useState, useEffect, useRef } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
} from "@paypal/react-paypal-js";
import moment from "moment";

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

    const [error, setError] = useState("");

    const formRef = useRef();

    useEffect(() => {
        formRef.current = form;
    }, [form]);


    const prices = {
        large: 120,
        xLarge: 140,
        xxl: 160,
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
        const { name, value, options, selectedIndex } = e.target;
        const price = options[selectedIndex].getAttribute("data-price");
        setForm({
            ...form,
            choices: value,
            price: parseFloat(price) || 0,
            choice: value
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

        // Check if the zip code is valid
        const sanAntonioZipCodeRegex = /^(782((0[1-9])|(1[0-7])|(2[0-9])|(3[0-9])|(4[0-5]))|78(3[0-9]))$/;
        const isValidZipCode = sanAntonioZipCodeRegex.test(form.zipCode);
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
        <form onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}

            {/* Add form fields */}
            <label htmlFor="choice">Choice</label>
            <select
                name="choice"
                id="choice"
                value={form.choices}
                onChange={handleChoiceChange}
            >
                <option value="">-- Please choose an option --</option>
                <option value="large" data-price={prices.large}>Large - 13 x 13 - ${prices.large}</option>
                <option value="xLarge" data-price={prices.xLarge}>Extra Large - 15 x 15 - ${prices.xLarge}</option>
                <option value="xxl" data-price={prices.xxl}>XX Large - 25 x 15 - ${prices.xxl}</option>
            </select>

            <label htmlFor="date">Date</label>
            <input
                type="date"
                name="date"
                id="date"
                value={form.date}
                onChange={handleChange}
            />

            <label htmlFor="phone">Phone</label>
            <input
                type="tel"
                name="phone"
                id="phone"
                value={form.phone}
                onChange={handleChange}
            />

            <label htmlFor="zipCode">Zip Code</label>
            <input
                type="text"
                name="zipCode"
                id="zipCode"
                value={form.zipCode}
                onChange={handleChange}
            />
            <label htmlFor="message">Message</label>
            <textarea
                name="message"
                id="message"
                value={form.message}
                onChange={handleChange}
            />
            <label htmlFor="agreement">Agree to SMS Text Messages?</label>
            <input
                type="checkbox"
                name="agreement"
                id="agreement"
                checked={form.agreement}
                onChange={handleCheckboxChange}
            />

            {/* Add the PayPal button */}
            {form.choices && prices[form.choices] && form.date && form.phone && form.zipCode && form.agreement ? (
                <PayPalButtons createOrder={createOrder} onApprove={onApprove} catchError={onError} />
            ) : (
                <p className="error-message">Please tell us about your party!</p>
            )}
        </form>
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