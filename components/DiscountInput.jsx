import React, { useState } from 'react';

const DiscountInput = ({ form, handleChange, setTotalPrice, prices }) => {
  const [couponUsed, setCouponUsed] = useState(false);

  const applyDiscount = (value) => {
    if (!couponUsed && (value.toUpperCase() === 'SATXCRAIGSLIST' || value.toUpperCase() === 'SATXOFFERUP' || value.toUpperCase() === 'SATXFACEBOOK')) {
      const discountedPrice = prices[form.choices] * 0.8;
      setTotalPrice(Math.max(0, discountedPrice));
      setCouponUsed(true);
      alert('Coupon has been applied successfully!');
    } else {
      setTotalPrice(prices[form.choices]);
    }
  };

  const handleDiscountChange = (event) => {
    handleChange(event);
    applyDiscount(event.target.value);
  };

  return (
    <>
      <label htmlFor="coupon">Coupon Code:</label>
      <input
        type="text"
        name="coupon"
        id="coupon"
        value={form.coupon}
        onChange={handleDiscountChange}
      />
    </>
  );
};

export default DiscountInput;