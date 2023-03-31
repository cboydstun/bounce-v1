export { Page }

import React from 'react'

import Hero from '../../components/Hero'
import LeadForm from '../../components/LeadForm'
import IconSection from '../../components/IconSection'
import PaypalForm from '../../components/PayPalForm'

function Page(props) {

  return (

    <div className='home-page-component'>
      <div className="home-page-container">
        <Hero props={props} />

        <div className="about-container">
          <section className="about-section" id="about-section">

            <IconSection />
            {/* <LeadForm /> */}
            <PaypalForm />
          </section>

        </div>
      </div>
    </div>
  )
}