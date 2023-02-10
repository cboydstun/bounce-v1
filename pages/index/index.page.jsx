export { Page }

import React from 'react'

import Hero from '../../components/Hero'
import LeadForm from '../../components/LeadForm'
import IconSection from '../../components/IconSection'

function Page(props) {

  return (

    <div className='home-page-component'>
      <div className="home-page-container">
        <Hero props={props} />

        <div className="about-container">
          <section className="about-section" id="about-section">
            <IconSection />
            <LeadForm />
          </section>
        </div>
      </div>
    </div>
  )
}
