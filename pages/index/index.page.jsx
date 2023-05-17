export { Page }

import React from 'react'

import Hero from '../../components/Hero'
import IconSection from '../../components/IconSection'
import Inventory from '../../components/Inventory'
import RentalTerms from '../../components/RentalTerms'
import Graphic from '../../components/Graphic'
import LocalComponent from '../../components/LocalComponent'
import ContactForm from '../../components/ContactForm'

function Page(props) {
  return (
    <div className='home-page-component'>
      <div className="home-page-container">
        <Hero props={props} />
        <div className="about-container">
          <section className="about-section" id="about-section">
            <IconSection />
            <Inventory />
          </section>
        </div>
        <div className="info-container">
          <section className="info-section" id="info-section">
            <Graphic />
            <RentalTerms />
          </section>

        </div>
        <div className="contact-container">
          <section className="local-section" id="local-section">
            <LocalComponent />
          </section>
          <section className="contact-section" id="contact-section">
            <ContactForm />
          </section>
        </div>
      </div>
    </div>
  )
}