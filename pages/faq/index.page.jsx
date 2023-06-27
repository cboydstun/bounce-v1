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
    }
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
      <h1>FAQs</h1>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? 'open' : ''}`}
          onClick={() => handleClick(index)}
        >
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
