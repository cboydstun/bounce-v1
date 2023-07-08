export { Page }

import React, { useState } from 'react';

import './faq.css'

function Page() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'When do you deliver the bounce houses?',
      answer: 'We deliver the bounce houses between 8 am and 10 am, right to your door!'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept cash, CashApp, and credit card payments through PayPal.'
    },
    {
      question: 'Do I need a generator for the bounce houses?',
      answer: 'No, you don\'t need a generator unless your party location is far from an electrical outlet.'
    },
    {
      question: 'Can I keep the bounce houses overnight?',
      answer: 'Yes, we offer overnight rentals for an additional fee. Please let us know in advance if you\'d like to keep them longer.'
    },
    {
      question: 'Are the bounce houses safe?',
      answer: 'Absolutely! Safety is our top priority. However, we do ask that you keep an eye on the bouncers at all times to ensure everyone\'s safety.'
    },
    {
      question: 'Can we wear shoes inside the bounce houses?',
      answer: 'For safety reasons, we kindly request that you jump in with bare or socked feet only. No shoes allowed!'
    },
    {
      question: 'How long can we rent the bounce houses for?',
      answer: 'Our rentals are for the entire day! You can enjoy the bounce houses from the time of delivery until pickup.'
    },
    {
      question: 'What if there\'s bad weather on the day of my party?',
      answer: 'In the event of bad weather, we offer a flexible rescheduling policy. Please contact us as soon as possible to discuss alternate arrangements.'
    },
    {
      question: 'Can I cancel my reservation?',
      answer: 'We understand that plans can change. If you need to cancel, please notify us at least 48 hours before your scheduled delivery time for a full refund.'
    },
    {
      question: 'Is there a minimum age requirement for using the bounce houses?',
      answer: 'While there is no strict minimum age requirement, we recommend that children using the bounce houses are supervised and of appropriate age for safe enjoyment.'
    },
    {
      question: 'Do you offer discounts for multiple rentals?',
      answer: 'Yes, we offer discounts for multiple rentals. Please contact us for more information.'
    },
    {
      question: 'Do you offer discounts for non-profit organizations?',
      answer: 'Yes, we offer discounts for non-profit organizations. Please contact us for more information.'
    },
    {
      question: 'Do you offer discounts for military personnel?',
      answer: 'Yes, we offer discounts for military personnel. Please contact us for more information.'
    },
    {
      question: 'Do you offer discounts for first responders?',
      answer: 'Yes, we offer discounts for first responders. Please contact us for more information.'
    },
    {
      question: 'Do you offer discounts for teachers?',
      answer: 'Yes, we offer discounts for teachers. Please contact us for more information.'
    },
    {
      question: 'Do you offer discounts for healthcare workers?',
      answer: 'Yes, we offer discounts for healthcare workers. Please contact us for more information.'
    },
    {
      question: 'How do I book a bounce house?',
      answer: 'You can book a bounce house by calling us at (512) 210-0194 or by filling out the contact form on our website.'
    },
    {
      question: 'How far in advance should I book a bounce house?',
      answer: 'We recommend booking at least 2 weeks in advance to ensure availability. However, we can sometimes accommodate last-minute requests. Please contact us for more information.'
    },
    {
      question: 'Do you offer gift certificates?',
      answer: 'No, we do not offer gift certificates at this time.'
    },
    {
      question: 'Are there deals on party packages?',
      answer: 'Yes, we offer party packages. Please contact us for more information.'
    },
    {
      question: 'What about party supplies?',
      answer: 'Yes, we have cotton candy machines, popcorn machines, pinatas, and more. Please contact us for more information.'
    },
    {
      question: 'Are tables and chairs available for rental?',
      answer: 'Yes, we offer tables and chairs. Each folding table comes with six folding chairs. Please contact us for more information.'
    },
  ];

  const handleClick = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="faq-container">
      <h1>SATX Bounce FAQ - Frequently Asked Questions</h1>
      <p>Find answers to frequently asked questions about SATX Bounce House and Inflatable Rentals. Learn about delivery timings, payment methods, safety guidelines, rental duration, cancellation policies, and more...</p>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? 'open' : ''}`}
          onClick={() => handleClick(index)}
        >
          <p className='faq-question'>{faq.question}</p>
          <p className='faq-answer'>{faq.answer}</p>
        </div>
      ))}

      <button><a href='/#contact-form'>Contact Now</a></button>


    </div>
  );
}